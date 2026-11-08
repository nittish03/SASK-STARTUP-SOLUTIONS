import os
import sys
import json
import urllib.request
import urllib.error

API = "https://vici-registry-admin.preview.emergentagent.com/api"
DEFAULT_UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"

def make_request(url, method="GET", data=None, headers=None):
    if headers is None:
        headers = {}
    headers["User-Agent"] = DEFAULT_UA
    req_data = None
    if data is not None:
        req_data = json.dumps(data).encode("utf-8")
        headers["Content-Type"] = "application/json"
    
    req = urllib.request.Request(url, data=req_data, headers=headers, method=method)
    try:
        with urllib.request.urlopen(req) as response:
            res_body = response.read().decode("utf-8")
            if res_body:
                return json.loads(res_body)
            return {}
    except urllib.error.HTTPError as e:
        err_msg = e.read().decode("utf-8")
        print(f"HTTP Error {e.code} on {method} {url}: {err_msg}")
        raise

print("Authenticating with admin credentials...")
login_payload = {
    "email": "Saskstartupsolutions@viciconsulting.ca",
    "password": "ViciAdmin2026!",
}
login_res = make_request(f"{API}/auth/login", method="POST", data=login_payload)
token = login_res["access_token"]
H = {"Authorization": f"Bearer {token}"}
print("Authenticated successfully.")

POSTS = [
    {
        "file": "blog1.md",
        "title": "Small Business Bookkeeping in Saskatoon: A Practical Guide for Saskatchewan Business Owners",
        "slug": "small-business-bookkeeping-saskatoon",
        "seo_title": "Saskatoon Small Business Bookkeeping Guide | Vici SaskStartupSolutions",
        "seo_description": "Expert guide to small business bookkeeping in Saskatoon. Learn CRA recordkeeping rules, monthly reconciliations, payroll tracking, and tax-ready workflows.",
        "featured_image": "https://images.pexels.com/photos/8296948/pexels-photo-8296948.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "featured_alt": "Organized bookkeeping documents and financial records on a small business owner's desk in Saskatoon.",
    },
    {
        "file": "blog2.md",
        "title": "T2 Corporate Tax Filing in Saskatchewan: What Saskatoon Business Owners Need to Know",
        "slug": "t2-corporate-tax-filing-saskatchewan",
        "seo_title": "T2 Corporate Tax Filing in Saskatchewan | Deadlines & CRA Guide | Vici",
        "seo_description": "Complete guide to T2 corporate tax filing in Saskatchewan. Learn CRA corporate filing deadlines, payment due dates, required schedules, and Saskatoon tax administration.",
        "featured_image": "https://images.pexels.com/photos/8962448/pexels-photo-8962448.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "featured_alt": "Corporate tax documents, financial statements, and a calculator arranged on a business office desk.",
    },
    {
        "file": "blog3.md",
        "title": "Saskatchewan Business Registration: A Guide to Incorporation, Registry Updates and Annual Returns",
        "slug": "saskatchewan-business-registration-isc-annual-returns",
        "seo_title": "Saskatchewan Business Registration & ISC Returns Guide | Vici",
        "seo_description": "Step-by-step guide to Saskatchewan business registration, incorporation, and ISC annual returns. Learn registry costs, name reservation, deadlines, and Saskatoon support.",
        "featured_image": "https://images.pexels.com/photos/7731374/pexels-photo-7731374.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "featured_alt": "Business registration paperwork and organized corporate documents on a professional office desk.",
    },
]

HERE = os.path.dirname(os.path.abspath(__file__))

existing = make_request(f"{API}/admin/blog", method="GET", headers=H)
print(f"Found {len(existing)} existing posts on backend.")

for p in POSTS:
    filepath = os.path.join(HERE, p["file"])
    with open(filepath, encoding="utf-8") as f:
        content = f.read()

    match = next((x for x in existing if x["slug"] == p["slug"]), None)
    payload = {
        "title": p["title"],
        "slug": p["slug"],
        "content": content,
        "seo_title": p["seo_title"],
        "seo_description": p["seo_description"],
        "featured_image": p["featured_image"],
        "featured_alt": p["featured_alt"],
        "author": "Patrick Vachon",
    }

    if match:
        pid = match["id"]
        print(f"Updating post '{p['slug']}' (id: {pid})...")
        make_request(f"{API}/admin/blog/{pid}", method="PUT", data=payload, headers=H)
    else:
        print(f"Creating new post '{p['slug']}'...")
        r = make_request(f"{API}/admin/blog", method="POST", data=payload, headers=H)
        pid = r["id"]

    print(f"  Saved {p['slug']}. Publishing...")
    pub = make_request(f"{API}/admin/blog/{pid}/publish", method="POST", headers=H)
    print(f"  {p['slug']} -> {pub.get('message', 'Published')}")

print("\nAll 3 posts successfully updated and published on live preview backend!")
