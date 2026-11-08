import os
import requests

API = "https://vici-registry-admin.preview.emergentagent.com/api"

token = requests.post(f"{API}/auth/login", json={
    "email": "Saskstartupsolutions@viciconsulting.ca",
    "password": "ViciAdmin2026!",
}).json()["access_token"]
H = {"Authorization": f"Bearer {token}"}

POSTS = [
    {
        "file": "blog1.md",
        "title": "Small Business Bookkeeping in Saskatoon: A Practical Guide for Saskatchewan Business Owners",
        "slug": "small-business-bookkeeping-saskatoon",
        "seo_title": "Saskatoon Small Business Bookkeeping Guide | Vici",
        "seo_description": "Learn how bookkeeping helps Saskatoon small businesses track income, manage expenses, organize financial records, and prepare for tax season.",
        "featured_image": "https://images.pexels.com/photos/8296948/pexels-photo-8296948.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "featured_alt": "Organized bookkeeping documents and financial records on a small business owner's desk in Saskatoon.",
    },
    {
        "file": "blog2.md",
        "title": "T2 Corporate Tax Filing in Saskatchewan: What Saskatoon Business Owners Need to Know",
        "slug": "t2-corporate-tax-filing-saskatchewan",
        "seo_title": "T2 Corporate Tax Filing in Saskatchewan | Vici",
        "seo_description": "Learn about T2 corporate tax filing in Saskatchewan, filing deadlines, required documents, and corporate tax filing administration support in Saskatoon.",
        "featured_image": "https://images.pexels.com/photos/8962448/pexels-photo-8962448.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "featured_alt": "Corporate tax documents, financial statements, and a calculator arranged on a business office desk.",
    },
    {
        "file": "blog3.md",
        "title": "Saskatchewan Business Registration: A Guide to Incorporation, Registry Updates and Annual Returns",
        "slug": "saskatchewan-business-registration-isc-annual-returns",
        "seo_title": "Saskatchewan Business Registration & ISC Returns | Vici",
        "seo_description": "Learn about Saskatchewan business registration, incorporation, ISC annual returns, corporate registry updates, and registry administration support in Saskatoon.",
        "featured_image": "https://images.pexels.com/photos/7731374/pexels-photo-7731374.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "featured_alt": "Business registration paperwork and organized corporate documents on a professional office desk.",
    },
]

HERE = os.path.dirname(os.path.abspath(__file__))

for p in POSTS:
    with open(os.path.join(HERE, p["file"]), encoding="utf-8") as f:
        content = f.read()
    existing = requests.get(f"{API}/admin/blog", headers=H).json()
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
        r = requests.put(f"{API}/admin/blog/{match['id']}", json=payload, headers=H)
        pid = match["id"]
    else:
        r = requests.post(f"{API}/admin/blog", json=payload, headers=H)
        pid = r.json()["id"]
    r.raise_for_status()
    pub = requests.post(f"{API}/admin/blog/{pid}/publish", headers=H)
    print(p["slug"], "->", pub.json()["message"])
