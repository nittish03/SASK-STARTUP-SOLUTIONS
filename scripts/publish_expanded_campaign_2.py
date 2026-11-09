import urllib.request
import urllib.parse
import json
import time

ARTICLES = [
    {
        "title": "Transitioning from Sole Proprietorship to a Corporation in Saskatchewan: Section 85 Rollovers and ISC Filings",
        "keywords": ["transition sole proprietorship to corporation saskatchewan", "section 85 rollover saskatchewan", "incorporate sole proprietorship saskatoon"],
        "target_url": "https://saskstartupsolutions.ca/blogs/sole-proprietorship-vs-incorporation-saskatchewan",
        "content": """# Transitioning from Sole Proprietorship to a Corporation in Saskatchewan

When a Saskatchewan small business crosses $70,000 to $100,000 in net annual profits, operating as an unincorporated sole proprietor becomes tax-inefficient. Profits are taxed directly at personal graduated marginal tax rates reaching up to 47.5%. By transitioning into a Canadian-Controlled Private Corporation (CCPC), founders can access Saskatchewan's combined 10% small business tax rate (9% federal + 1% Saskatchewan).

### Section 85 Tax-Deferred Asset Rollovers
Transitioning ongoing business assets (inventory, accounts receivable, equipment, client goodwill) into a new corporation without tax consequences requires utilizing a Section 85 rollover under the federal Income Tax Act. Without this election, CRA deems the transfer as a fair market value disposition, triggering immediate capital gains and recaptured depreciation.

### Saskatchewan ISC Corporate Registry Setup
Executing the legal transfer involves:
1. Reserving your corporate trade name or selecting a numbered entity through ISC Corporate Registry.
2. Drafting Articles of Incorporation with multi-class share structures.
3. Establishing the corporate minute book, director resolutions, and share certificates.
4. Closing the legacy sole proprietorship CRA GST/PST accounts and opening new corporate business numbers.

For comprehensive step-by-step guidance, review [Sole Proprietorship vs. Corporation in Saskatchewan](https://saskstartupsolutions.ca/blogs/sole-proprietorship-vs-incorporation-saskatchewan) or explore end-to-end [Saskatchewan business incorporation services](https://saskstartupsolutions.ca/services) with [Vici SaskStartupSolutions](https://saskstartupsolutions.ca/).

Practice Lead: Patrick Vachon | 539 Avenue I N, Saskatoon, SK S7L 2G9 | Tel: +1 (306) 960-0091"""
    },
    {
        "title": "Saskatchewan ISC Corporate Annual Returns: Deadlines, Fees, and Preventing Strike-Off Dissolution",
        "keywords": ["saskatchewan isc annual returns", "isc corporate annual return deadline", "corporate registry annual return saskatchewan"],
        "target_url": "https://saskstartupsolutions.ca/blogs/saskatchewan-corporate-registry-isc-annual-returns",
        "content": """# Saskatchewan ISC Corporate Annual Returns: Deadlines, Fees, and Strike-Off Prevention

Every incorporated entity registered under The Business Corporations Act in Saskatchewan is legally required to file an Annual Return with the Information Services Corporation (ISC) Corporate Registry. Failure to complete this annual filing results in financial penalties and administrative dissolution ("strike-off") by the Registrar.

### ISC Filing Deadlines and Fee Schedules
- **Annual Filing Window:** Due each year on the anniversary month of the company's incorporation date.
- **On-Time Government Fee:** $60.00.
- **Late Filing Penalty Fee:** $110.00 if filed beyond the statutory deadline.
- **Consequences of Non-Filing:** After consecutive missed filings, ISC strikes the corporation off the register. Once struck off, the corporation legally ceases to exist, commercial bank accounts are frozen, and business contracts become voidable.

### Reinstating a Struck-Off Saskatchewan Corporation
Reinstating a dissolved company requires filing an application for revival, paying outstanding historical annual return fees plus late penalties, and submitting a fresh certificate of status.

Read our complete breakdown: [Saskatchewan ISC Corporate Annual Returns Guide](https://saskstartupsolutions.ca/blogs/saskatchewan-corporate-registry-isc-annual-returns). Need hands-off corporate maintenance? Discover how [Vici SaskStartupSolutions](https://saskstartupsolutions.ca/) manages ISC corporate registry compliance and [annual returns for Saskatoon businesses](https://saskstartupsolutions.ca/services).

Contact: Practice Lead Patrick Vachon | 539 Avenue I N, Saskatoon, SK | Tel: +1 (306) 960-0091"""
    },
    {
        "title": "Multilingual Business Setup in Saskatoon: Starting a Company for Newcomers in French, Russian, and Armenian",
        "keywords": ["newcomer business setup saskatoon", "multilingual business incorporation saskatchewan", "immigrant entrepreneur saskatoon"],
        "target_url": "https://saskstartupsolutions.ca/blogs/business-setup-newcomers-saskatoon-multilingual-guide",
        "content": """# Multilingual Business Setup in Saskatoon: Dedicated Support for Newcomers

Starting a commercial enterprise in Saskatchewan as a newcomer or immigrant entrepreneur brings unique legal and procedural hurdles—from establishing Canadian credit and opening commercial banking facilities to navigating bilingual ISC regulatory frameworks and CRA compliance.

### Language-Accessible Advisory Services
At [Vici SaskStartupSolutions](https://saskstartupsolutions.ca/), we provide full advisory and business setup services in **English, French, Russian, and Armenian**, ensuring that non-native English speakers fully comprehend legal responsibilities, tax liabilities, and corporate ownership rights.

### Essential Setup Checklist for Newcomer Entrepreneurs:
1. **ISC Corporate Registration:** Choosing between federal and Saskatchewan provincial incorporation; addressing residency requirements for directors.
2. **CRA Business Identification:** Registering GST/HST accounts, corporate payroll deduction numbers, and import/export identifiers.
3. **Provincial PST Licensing:** Setting up tax compliance with Saskatchewan Ministry of Finance.
4. **Local Saskatoon Licensing:** Obtaining municipal commercial zoning approvals and business licenses.

Review our full roadmap: [Business Setup for Newcomers in Saskatoon: Multilingual Guide](https://saskstartupsolutions.ca/blogs/business-setup-newcomers-saskatoon-multilingual-guide). To consult directly with multilingual specialists, visit [Vici SaskStartupSolutions Services](https://saskstartupsolutions.ca/services) or [book a free consultation](https://saskstartupsolutions.ca/booking).

Office: 539 Avenue I N, Saskatoon, SK S7L 2G9 | Tel: +1 (306) 960-0091"""
    },
    {
        "title": "QuickBooks Online vs Xero for Saskatchewan Small Businesses: Setup, PST Integration, and Cloud Bookkeeping",
        "keywords": ["quickbooks online saskatoon", "xero bookkeeping saskatchewan", "cloud accounting saskatoon"],
        "target_url": "https://saskstartupsolutions.ca/blogs/small-business-bookkeeping-saskatoon",
        "content": """# QuickBooks Online vs. Xero for Saskatchewan Small Businesses

Modern cloud accounting platforms eliminate manual paperwork, automate receipt capture, and streamline tax compliance. However, configuring cloud software for Saskatchewan businesses requires specific handling of Saskatchewan Provincial Sales Tax (PST at 6%) and federal GST (5%).

### Feature & Tax Compliance Comparison
- **QuickBooks Online (QBO):** The market standard across Canadian accounting firms. QBO natively handles Saskatchewan PST rate configurations, electronic CRA remittances, and direct accountant portal synchronization.
- **Xero:** Highly praised for intuitive bank reconciliation workflows, unlimited user access on standard tiers, and clean fixed asset depreciation registers. Requires custom tax rate mapping for Saskatchewan PST.

### Avoiding Saskatchewan PST Mapping Errors
A frequent error in cloud setups is treating PST as an Input Tax Credit (ITC). In Saskatchewan, businesses generally cannot claim ITCs on PST paid for operational overhead (unlike federal GST). Setting up proper tax agency accounts prevents costly audit reassessments.

Need help migrating or setting up your cloud software? Learn more at [Small Business Bookkeeping in Saskatoon](https://saskstartupsolutions.ca/blogs/small-business-bookkeeping-saskatoon) and explore expert onboarding packages at [Vici SaskStartupSolutions](https://saskstartupsolutions.ca/).

Lead Advisor: Patrick Vachon | Saskatoon, SK | Tel: +1 (306) 960-0091"""
    },
    {
        "title": "Agri-Business & Farm Bookkeeping in Saskatchewan: AgriStability, PST Exemptions, and Inventory Accounting",
        "keywords": ["farm bookkeeping saskatchewan", "agribusiness accounting saskatoon", "agristability bookkeeping saskatchewan"],
        "target_url": "https://saskstartupsolutions.ca/blogs/small-business-bookkeeping-saskatoon",
        "content": """# Agri-Business and Farm Bookkeeping in Saskatchewan

Operating an agricultural enterprise in Saskatchewan involves distinct financial complexities not found in traditional retail or service corporations. From grain and livestock inventory valuations to AgriStability program reporting and provincial PST farm exemptions, accurate farm bookkeeping is critical.

### Key Saskatchewan Farm Accounting Pillars:
1. **Saskatchewan PST Farm Exemption Certificates:** Legally qualifying primary producers can purchase specific agricultural machinery, feed, seed, and fertilizer exempt from 6% PST using Certificate of Exemption forms.
2. **AgriStability and AgriInvest Tracking:** Maintaining detailed enterprise records of allowable income, eligible production expenses, and productive units ensures maximum risk-management program funding.
3. **Cash Accounting vs Accrual Adjustments:** While farming corporations can report income on a cash basis for tax purposes, compiling accrual financial statements is vital for agricultural lenders and chartered banks.

For professional agricultural ledger management and compliance advisory, visit [Vici SaskStartupSolutions](https://saskstartupsolutions.ca/) or consult our guide on [Small Business Bookkeeping in Saskatoon](https://saskstartupsolutions.ca/blogs/small-business-bookkeeping-saskatoon).

Patrick Vachon | 539 Avenue I N, Saskatoon, SK S7L 2G9 | Tel: +1 (306) 960-0091"""
    },
    {
        "title": "Saskatoon Commercial Business Licensing and Municipal Zoning: A Startup Compliance Guide",
        "keywords": ["saskatoon business license", "business license cost saskatoon", "zoning bylaws saskatoon small business"],
        "target_url": "https://saskstartupsolutions.ca/blogs/how-to-incorporate-in-saskatchewan-step-by-step-guide",
        "content": """# Saskatoon Commercial Business Licensing and Municipal Zoning Guide

Before opening commercial doors or commencing commercial operations in Saskatoon, every business must obtain a valid City of Saskatoon Business License and ensure zoning bylaw compliance.

### Municipal Licensing Process & Fees
- **Home-Based Businesses:** Requires an approved Home Occupation Permit ensuring no disturbance to residential neighborhoods.
- **Commercial / Retail Locations:** Must receive a Building and Development Permit confirming the property's authorized commercial zoning use.
- **License Fees:** Standard City of Saskatoon initial commercial license application fees generally range between $125 and $250 depending on classification, with annual renewals.

Integrating municipal licensing with your provincial ISC incorporation and CRA tax registrations ensures full legal operating status from day one. Learn the complete framework: [How to Incorporate in Saskatchewan: Step-by-Step Guide](https://saskstartupsolutions.ca/blogs/how-to-incorporate-in-saskatchewan-step-by-step-guide) with [Vici SaskStartupSolutions](https://saskstartupsolutions.ca/).

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
    # Alternate between platforms or try Rentry first
    published_url = None
    platform_used = None
    
    # Try Rentry
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
    time.sleep(4) # gentle pause to respect rate limits

with open("campaigns/expanded_keyword_backlinks_batch2.json", "w") as f:
    json.dump(results, f, indent=2)

print("\nBatch 2 publication completed. Total new live backlinks:", len(results))
