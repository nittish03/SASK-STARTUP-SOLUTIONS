import urllib.request
import urllib.parse
import json
import time

ARTICLES = [
    {
        "title": "Saskatoon Small Business Bookkeeping Pricing and Packages: Transparent Cost Benchmarks",
        "keywords": ["small business bookkeeping cost saskatoon", "bookkeeper rates saskatoon", "monthly bookkeeping packages saskatchewan"],
        "target_url": "https://saskstartupsolutions.ca/blogs/small-business-bookkeeping-saskatoon",
        "content": """# Saskatoon Small Business Bookkeeping Pricing & Package Benchmarks

Understanding the market benchmarks for small business bookkeeping in Saskatoon helps business owners budget effectively while maintaining impeccable CRA and provincial tax compliance.

### Saskatchewan Bookkeeping Pricing Tiers
- **Starter / Micro-Business ($300 – $500 / month):** Tailored for sole proprietors or micro-corporations with 10–35 monthly transactions. Covers monthly bank reconciliations, expense categorization, and quarterly GST/PST preparation.
- **Growth / Full-Service ($500 – $1,000 / month):** Ideal for active retail, trades, or professional services with 50–150 transactions. Includes bi-weekly payroll processing, direct CRA remittances, WCB reporting, and monthly profit & loss reviews.
- **Ad-Hoc & Cleanup Bookkeeping ($50 – $95 / hour):** For businesses behind on corporate returns or facing CRA audit reviews.

Review full details at [Small Business Bookkeeping in Saskatoon](https://saskstartupsolutions.ca/blogs/small-business-bookkeeping-saskatoon) or schedule a transparent quote with [Vici SaskStartupSolutions](https://saskstartupsolutions.ca/).

Practice Lead: Patrick Vachon | 539 Avenue I N, Saskatoon, SK | Tel: +1 (306) 960-0091"""
    },
    {
        "title": "WCB Saskatchewan Employer Registration: WorkSafe Rules and Payroll Assessments for Small Businesses",
        "keywords": ["wcb saskatchewan employer registration", "worksafesask small business", "wcb payroll assessment saskatoon"],
        "target_url": "https://saskstartupsolutions.ca/blogs/saskatchewan-small-business-payroll-guide",
        "content": """# WCB Saskatchewan Employer Registration & WorkSafe Compliance

Hiring employees in Saskatchewan triggers mandatory registration with the Saskatchewan Workers' Compensation Board (WCB) under The Workers' Compensation Act, 1979.

### Key WCB Deadlines & Reporting Rules
- **Mandatory 30-Day Window:** Employers in covered industries must register with WCB within 30 days of commencing operations or hiring their first employee.
- **Annual Employer Payroll Statement (EPS):** Due by February 28th annually, reporting actual assessable gross earnings from the prior calendar year and estimated earnings for the upcoming year.
- **Subcontractor Clearance Letters:** Before releasing payments to independent contractors, Saskatchewan business owners must obtain a valid WCB clearance letter; otherwise, liability for the contractor's unpaid WCB premiums transfers directly to the hiring principal.

Learn the full compliance system in our [Saskatchewan Small Business Payroll Guide](https://saskstartupsolutions.ca/blogs/saskatchewan-small-business-payroll-guide) with [Vici SaskStartupSolutions](https://saskstartupsolutions.ca/).

Patrick Vachon | 539 Avenue I N, Saskatoon, SK | Tel: +1 (306) 960-0091"""
    },
    {
        "title": "Holding Company and Operating Company Corporate Structures in Saskatchewan: Asset Protection & Tax Deferral",
        "keywords": ["holding company saskatchewan", "holdco opco structure saskatoon", "corporate tax deferral saskatchewan"],
        "target_url": "https://saskstartupsolutions.ca/blogs/how-to-incorporate-in-saskatchewan-step-by-step-guide",
        "content": """# Holding Company vs Operating Company Structures in Saskatchewan

For growing Saskatchewan enterprises, separating commercial operating risks from accumulated retained earnings is critical. Implementing a two-tier Holdco-Opco corporate structure safeguards accumulated wealth while optimizing corporate tax planning.

### Strategic Advantages:
1. **Creditor & Liability Insulation:** By transferring surplus retained profits as tax-free intercorporate dividends from Opco to Holdco, liquid capital is shielded from commercial operational liabilities, customer slip-and-falls, or contract litigation.
2. **Lifetime Capital Gains Exemption (LCGE) Purification:** To qualify for the $1.25M+ federal LCGE upon exit, at least 90% of Opco's assets must be active business assets. Holdco allows periodic 'purification' of non-active surplus cash.
3. **ISC Holding Company Registration:** Both entities are registered through the ISC Corporate Registry with coordinated share structures.

Read the founder guide: [How to Incorporate in Saskatchewan](https://saskstartupsolutions.ca/blogs/how-to-incorporate-in-saskatchewan-step-by-step-guide). Discover tailored corporate structuring at [Vici SaskStartupSolutions](https://saskstartupsolutions.ca/).

Patrick Vachon | 539 Avenue I N, Saskatoon, SK S7L 2G9 | Tel: +1 (306) 960-0091"""
    },
    {
        "title": "Saskatoon Catch-Up Bookkeeping: Clearing Multiple Years of Overdue CRA Taxes and Unfiled T2 Returns",
        "keywords": ["catch up bookkeeping saskatoon", "unfiled t2 return saskatchewan", "cra audit bookkeeping saskatoon"],
        "target_url": "https://saskstartupsolutions.ca/blogs/catch-up-bookkeeping-saskatoon",
        "content": """# Saskatoon Catch-Up Bookkeeping: Clearing Years of Overdue CRA Tax Records

Falling behind on business bookkeeping is common when founders are busy servicing clients. However, neglected records trigger CRA arbitrary assessments, frozen bank accounts, loss of GST input tax credits, and punitive interest penalties.

### The 4-Phase Catch-Up Methodology:
1. **Source Document Marshalling:** Retrieving electronic bank/credit card PDF statements and digital receipt repositories for all missing fiscal periods.
2. **Ledger Reconstruction:** Establishing accurate historical general ledgers, tracking depreciable assets, and identifying unclaimed GST ITC tax credits.
3. **PST & GST Reconciliation:** Computing net tax liabilities across multi-year statutory windows.
4. **CRA Voluntary Disclosures Program (VDP):** Filing valid relief applications to waive severe non-filing penalties before CRA issues formal enforcement action.

Read our complete breakdown: [Catch-Up Bookkeeping in Saskatoon](https://saskstartupsolutions.ca/blogs/catch-up-bookkeeping-saskatoon). Request immediate confidential ledger remediation at [Vici SaskStartupSolutions](https://saskstartupsolutions.ca/).

Patrick Vachon | 539 Avenue I N, Saskatoon, SK | Tel: +1 (306) 960-0091"""
    }
]

def publish_rentry(text):
    url = 'https://rentry.co/api/new'
    data = urllib.parse.urlencode({'text': text, 'csrfmiddlewaretoken': ''}).encode('utf-8')
    req = urllib.request.Request(url, data=data, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req) as resp:
        res = json.loads(resp.read().decode('utf-8'))
        if res.get('status') == '200':
            return res.get('url')
        raise Exception(f"Rentry error: {res}")

def publish_writeas(title, body):
    url = 'https://write.as/api/posts'
    data = json.dumps({'title': title, 'body': body}).encode('utf-8')
    req = urllib.request.Request(url, data=data, headers={'Content-Type': 'application/json', 'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req) as resp:
        res = json.loads(resp.read().decode('utf-8'))
        if res.get('code') in (200, 201):
            return res['data'].get('url', f"https://write.as/{res['data']['id']}")
        raise Exception(f"Write.as error: {res}")

results = []
for idx, art in enumerate(ARTICLES):
    print(f"[{idx+1}/{len(ARTICLES)}] Publishing: {art['title']}")
    published_url = None
    platform_used = None
    
    try:
        url = publish_rentry(art['content'])
        platform_used = "Rentry.co (DA 82)"
        published_url = url
        print(f"  -> Success on Rentry: {url}")
    except Exception as e:
        print(f"  -> Rentry failed: {e}. Trying Write.as...")
        try:
            time.sleep(3)
            url = publish_writeas(art['title'], art['content'])
            platform_used = "Write.as (DA 75)"
            published_url = url
            print(f"  -> Success on Write.as: {url}")
        except Exception as e2:
            print(f"  -> Write.as also failed: {e2}")

    if published_url:
        results.append({
            "title": art['title'],
            "platform": platform_used,
            "url": published_url,
            "keywords": art['keywords'],
            "target_url": art['target_url'],
            "status": "success"
        })
    time.sleep(4)

with open("campaigns/expanded_keyword_backlinks_batch3.json", "w") as f:
    json.dump(results, f, indent=2)

print("\nBatch 3 publication completed. Total new live backlinks:", len(results))
