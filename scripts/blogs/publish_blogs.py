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

print("Authenticating with admin credentials from environment...")
login_payload = {
    "email": os.environ.get("ADMIN_EMAIL", "Saskstartupsolutions@viciconsulting.ca"),
    "password": os.environ.get("ADMIN_PASSWORD", ""),
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
    {
        "file": "blog4.md",
        "title": "How to Incorporate a Business in Saskatchewan: Step-by-Step Guide (2026)",
        "slug": "how-to-incorporate-in-saskatchewan-step-by-step-guide",
        "seo_title": "How to Incorporate in Saskatchewan | Step-by-Step Guide | Vici",
        "seo_description": "Step-by-step guide to incorporating a business in Saskatchewan. Learn ISC name reservations, articles of incorporation, costs, CRA business numbers, and timelines.",
        "featured_image": "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "featured_alt": "Business founders reviewing Saskatchewan incorporation documents in a Saskatoon office.",
    },
    {
        "file": "blog5.md",
        "title": "Sole Proprietorship vs. Corporation in Saskatchewan: Which Is Right for You?",
        "slug": "sole-proprietorship-vs-incorporation-saskatchewan",
        "seo_title": "Sole Proprietorship vs Corporation in Saskatchewan | Vici",
        "seo_description": "Comparing sole proprietorship vs incorporation in Saskatchewan. Evaluate tax rates, legal liability, startup costs, ISC filing requirements, and when to incorporate.",
        "featured_image": "https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "featured_alt": "Comparison analysis of sole proprietorship and incorporation structures for a Saskatchewan business.",
    },
    {
        "file": "blog6.md",
        "title": "Saskatchewan GST and PST Guide for Small Businesses: Rules, Rates, and Deadlines",
        "slug": "saskatchewan-gst-pst-rules-for-small-business",
        "seo_title": "Saskatchewan GST & PST Small Business Guide | Rates & Deadlines",
        "seo_description": "Essential guide to GST (5%) and Saskatchewan PST (6%) for small businesses. Learn CRA registration thresholds ($30,000 rule), filing frequencies, and exemptions.",
        "featured_image": "https://images.pexels.com/photos/6863177/pexels-photo-6863177.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "featured_alt": "Financial ledger and tax forms displaying Canadian GST and Saskatchewan PST calculations.",
    },
    {
        "file": "blog7.md",
        "title": "Catch-Up & Cleanup Bookkeeping in Saskatoon: How to Fix Overdue CRA Records",
        "slug": "bookkeeping-cleanup-overdue-tax-records-saskatoon",
        "seo_title": "Bookkeeping Cleanup & Catch-Up in Saskatoon | CRA Tax Prep | Vici",
        "seo_description": "Behind on bookkeeping in Saskatoon? Learn how catch-up bookkeeping organizes messy receipts, reconciles bank accounts, files overdue CRA returns, and reduces penalties.",
        "featured_image": "https://images.pexels.com/photos/7681097/pexels-photo-7681097.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "featured_alt": "Stacks of paper receipts being sorted and categorized into digital cloud accounting software.",
    },
    {
        "file": "blog8.md",
        "title": "Monthly Bookkeeping Services in Saskatoon: What to Expect, Pricing, and Workflows",
        "slug": "monthly-bookkeeping-services-saskatoon-what-to-expect",
        "seo_title": "Monthly Bookkeeping Services Saskatoon | Workflows & Pricing",
        "seo_description": "What to expect from monthly bookkeeping services in Saskatoon. Discover standard workflows, bank reconciliations, monthly reporting, pricing models, and time savings.",
        "featured_image": "https://images.pexels.com/photos/6863246/pexels-photo-6863246.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "featured_alt": "Professional bookkeeper reviewing monthly financial balance sheet reports in a Saskatoon office.",
    },
    {
        "file": "blog9.md",
        "title": "Bookkeeping for Trades and Construction Contractors in Saskatchewan: PST, WCB, and Subcontractors",
        "slug": "bookkeeping-for-contractors-trades-saskatchewan",
        "seo_title": "Contractor & Trades Bookkeeping in Saskatchewan | PST & WCB",
        "seo_description": "Specialized bookkeeping guide for Saskatchewan trades and construction contractors. Master PST on supply-and-install contracts, WCB clearance letters, and T5018 reporting.",
        "featured_image": "https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "featured_alt": "Construction contractor reviewing project invoices and blueprints on a job site in Saskatchewan.",
    },
    {
        "file": "blog10.md",
        "title": "Saskatchewan Small Business Payroll Guide: Source Deductions, T4s, and WCB Compliance",
        "slug": "saskatchewan-payroll-management-t4-wcb-deductions",
        "seo_title": "Saskatchewan Small Business Payroll Guide | CRA Deductions & T4s",
        "seo_description": "Complete guide to managing small business payroll in Saskatchewan. Learn CRA source deductions (CPP, EI, income tax), provincial employment standards, T4 filing, and WCB.",
        "featured_image": "https://images.pexels.com/photos/7821685/pexels-photo-7821685.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "featured_alt": "Small business payroll spreadsheet showing employee gross pay and statutory deductions.",
    },
    {
        "file": "blog11.md",
        "title": "Notice to Reader & Compilation Financial Statements in Saskatoon: What Lenders Require",
        "slug": "notice-to-reader-compilation-financial-statements-saskatoon",
        "seo_title": "Notice to Reader & Compilation Statements Saskatoon | Vici",
        "seo_description": "Understand Notice to Reader and Compilation Engagement financial statements in Saskatchewan. Learn why banks, commercial landlords, and CRA require balance sheets.",
        "featured_image": "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "featured_alt": "Formal compiled financial statements and balance sheet binder presented for a business loan review.",
    },
    {
        "file": "blog12.md",
        "title": "How to Transition from Sole Proprietorship to a Corporation in Saskatchewan",
        "slug": "moving-from-sole-proprietor-to-corporation-saskatchewan",
        "seo_title": "Transition from Sole Proprietor to Corporation Saskatchewan",
        "seo_description": "Comprehensive roadmap for moving from self-employed sole proprietor to an incorporated business in Saskatchewan. Covers asset transfers, CRA roll-overs, and ISC setup.",
        "featured_image": "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "featured_alt": "Business partners discussing corporate transition and growth milestones in Saskatoon.",
    },
    {
        "file": "blog13.md",
        "title": "What to Do After Incorporating in Saskatchewan: The Post-Incorporation Checklist",
        "slug": "what-to-do-after-incorporating-in-saskatchewan",
        "seo_title": "Post-Incorporation Checklist Saskatchewan | CRA, Banking & Minute Book",
        "seo_description": "Just incorporated in Saskatchewan? Follow our essential post-incorporation checklist: organizing your minute book, setting up CRA program accounts, and business banking.",
        "featured_image": "https://images.pexels.com/photos/7681092/pexels-photo-7681092.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "featured_alt": "Corporate minute book, official certificate of incorporation, and company seal on a polished desk.",
    },
    {
        "file": "blog14.md",
        "title": "Saskatchewan ISC Corporate Annual Returns: Deadlines, Fees, and Avoiding Dissolution",
        "slug": "isc-annual-returns-corporate-registry-saskatchewan",
        "seo_title": "Saskatchewan ISC Annual Returns Guide | Deadlines & Fees",
        "seo_description": "Essential guide to Saskatchewan Information Services Corporation (ISC) annual returns. Avoid corporate strike-off, penalties, and loss of name protection.",
        "featured_image": "https://images.pexels.com/photos/6863183/pexels-photo-6863183.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "featured_alt": "Official Saskatchewan Corporate Registry annual return filing confirmation and compliance documents.",
    },
    {
        "file": "blog15.md",
        "title": "Bookkeeping and Tax Guide for Saskatoon Freelancers and Independent Consultants",
        "slug": "bookkeeping-tax-guide-freelancers-consultants-saskatoon",
        "seo_title": "Freelancer & Consultant Bookkeeping Guide Saskatoon | Vici",
        "seo_description": "Tax deductions, expense tracking, and bookkeeping strategies for Saskatoon freelancers, digital creatives, and self-employed consultants. Stay CRA compliant without stress.",
        "featured_image": "https://images.pexels.com/photos/4065876/pexels-photo-4065876.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "featured_alt": "Freelance consultant tracking billable hours and business expenses on a laptop in a Saskatoon coffee shop.",
    },
    {
        "file": "blog16.md",
        "title": "Starting a Business as a Newcomer in Saskatchewan: Legal, Tax, and Multilingual Support Guide",
        "slug": "newcomer-business-setup-guide-saskatchewan-multilingual",
        "seo_title": "Newcomer Business Setup Guide Saskatchewan | Multilingual Support",
        "seo_description": "Starting a business in Saskatchewan as a newcomer? Complete guide to ISC registry, CRA tax accounts, SINP entrepreneur requirements, and multilingual bookkeeping (EN, FR, RU, HY).",
        "featured_image": "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "featured_alt": "Multilingual business advisory meeting with newcomer entrepreneurs in Saskatoon, Saskatchewan.",
    },
]

HERE = os.path.dirname(os.path.abspath(__file__))

existing = make_request(f"{API}/admin/blog", method="GET", headers=H)
print(f"Found {len(existing)} existing posts on backend.")

for p in POSTS:
    filepath = os.path.join(HERE, p["file"])
    if not os.path.exists(filepath):
        print(f"Skipping {p['slug']} ({p['file']} not yet drafted)...")
        continue

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

print("\nBlog sync cycle finished successfully!")
