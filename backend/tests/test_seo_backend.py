"""SEO backend tests: sitemap.xml, robots.txt, blog listing."""
import os
import re
import pytest
import requests
import xml.etree.ElementTree as ET

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://vici-registry-admin.preview.emergentagent.com").rstrip("/")
EXPECTED_HOST = "https://saskstartupsolutions.ca"


@pytest.fixture(scope="module")
def sitemap_response():
    return requests.get(f"{BASE_URL}/api/sitemap.xml", timeout=15)


@pytest.fixture(scope="module")
def robots_response():
    # robots.txt is served by frontend static (CRA public) at root path
    return requests.get(f"{BASE_URL}/robots.txt", timeout=15)


@pytest.fixture(scope="module")
def blog_posts():
    r = requests.get(f"{BASE_URL}/api/blog", timeout=15)
    assert r.status_code == 200
    data = r.json()
    return data if isinstance(data, list) else data.get("posts", [])


class TestSitemap:
    def test_status_and_content_type(self, sitemap_response):
        assert sitemap_response.status_code == 200
        assert "xml" in sitemap_response.headers.get("content-type", "").lower()

    def test_valid_xml(self, sitemap_response):
        root = ET.fromstring(sitemap_response.text)
        assert root.tag.endswith("urlset")

    def test_urls_use_preferred_host(self, sitemap_response):
        root = ET.fromstring(sitemap_response.text)
        ns = {"s": "http://www.sitemaps.org/schemas/sitemap/0.9"}
        locs = [u.text for u in root.findall(".//s:loc", ns)]
        assert len(locs) > 0
        for loc in locs:
            assert loc.startswith(EXPECTED_HOST), f"Bad host in {loc}"

    def test_includes_sitemap_page(self, sitemap_response):
        assert f"{EXPECTED_HOST}/sitemap" in sitemap_response.text

    def test_includes_three_blog_posts(self, sitemap_response, blog_posts):
        for p in blog_posts:
            slug = p.get("slug")
            assert f"/blog/{slug}" in sitemap_response.text, f"Missing blog slug {slug}"

    def test_excludes_admin_and_portal(self, sitemap_response):
        txt = sitemap_response.text
        assert "/admin" not in txt
        assert "/portal" not in txt

    def test_blog_urls_have_lastmod(self, sitemap_response):
        root = ET.fromstring(sitemap_response.text)
        ns = {"s": "http://www.sitemaps.org/schemas/sitemap/0.9"}
        found_blog_with_lastmod = False
        for url in root.findall(".//s:url", ns):
            loc = url.find("s:loc", ns)
            lastmod = url.find("s:lastmod", ns)
            if loc is not None and "/blog/" in loc.text:
                assert lastmod is not None and lastmod.text, f"No lastmod for {loc.text}"
                found_blog_with_lastmod = True
        assert found_blog_with_lastmod


class TestRobots:
    def test_status_and_content_type(self, robots_response):
        assert robots_response.status_code == 200
        assert "text/plain" in robots_response.headers.get("content-type", "").lower()

    def test_disallow_rules(self, robots_response):
        text = robots_response.text
        for rule in ["Disallow: /admin", "Disallow: /portal", "Disallow: /api/admin/", "Disallow: /api/auth/"]:
            assert rule in text, f"Missing rule: {rule}"

    def test_no_blanket_api_disallow(self, robots_response):
        # Should not have a bare "Disallow: /api/" or "Disallow: /api" line
        lines = [l.strip() for l in robots_response.text.splitlines()]
        for l in lines:
            assert l not in ("Disallow: /api/", "Disallow: /api"), "Blanket /api disallow present"

    def test_sitemap_line(self, robots_response):
        assert f"Sitemap: {EXPECTED_HOST}/api/sitemap.xml" in robots_response.text


class TestBlogAPI:
    def test_blog_returns_three_published(self, blog_posts):
        assert len(blog_posts) >= 3

    def test_blog_post_detail(self, blog_posts):
        slug = blog_posts[0]["slug"]
        r = requests.get(f"{BASE_URL}/api/blog/{slug}", timeout=15)
        assert r.status_code == 200
        assert r.json().get("slug") == slug

    def test_blog_missing_slug_404(self):
        r = requests.get(f"{BASE_URL}/api/blog/does-not-exist-xyz", timeout=15)
        assert r.status_code == 404


class TestFAQ:
    def test_faq_no_placeholder(self):
        r = requests.get(f"{BASE_URL}/api/faq", timeout=15)
        if r.status_code != 200:
            pytest.skip("No /api/faq endpoint")
        data = r.json()
        items = data if isinstance(data, list) else data.get("items", data.get("faqs", []))
        for item in items:
            answer = item.get("answer", "")
            assert "Placeholder answer" not in answer, f"Placeholder found in: {answer[:80]}"
