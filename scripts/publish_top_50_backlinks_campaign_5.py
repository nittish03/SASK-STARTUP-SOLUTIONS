import urllib.request
import urllib.parse
import json
import time

CAMPAIGN_ARTICLES = [
    {
        "title": "Business Incorporation Services in Saskatoon: Costs, ISC Timelines and Share Structuring",
        "keywords": ["incorporate a business Saskatoon", "business incorporation services Saskatoon", "incorporation help Saskatoon", "cost to incorporate in Saskatchewan", "new corporation setup Saskatoon"],
        "target_url": "https://saskstartupsolutions.ca/blogs/saskatoon-business-incorporation-services-cost-timeline-guide",
        "content": """# Business Incorporation Services in Saskatoon: Costs, ISC Timelines & Corporate Setup

For entrepreneurs, trades professionals, medical practitioners, and technology founders in Saskatchewan, deciding to **incorporate a business Saskatoon** is the definitive legal transition from personal liability to a distinct corporate entity governed by *The Business Corporations Act, 2021* (SBCA 2021).

Navigating the Corporate Registry administered by Information Services Corporation (ISC) requires precise legal documentation, strategic share structuring, and seamless coordination with the Canada Revenue Agency (CRA). At SaskStartupSolutions, our specialized **business incorporation services Saskatoon** provide end-to-end guidance to establish compliant, tax-optimized corporate structures without bureaucratic delays.

### Why Seek Professional Incorporation Help in Saskatoon?
1. **Limited Liability Protection:** The corporate veil shields your personal assets, savings, and family residence from commercial liabilities, supplier claims, and legal actions.
2. **Saskatchewan's 1% Corporate Tax Advantage:** Saskatchewan offers an extraordinary 1% provincial small business corporate tax rate on active business income up to $600,000 (10% combined federal-provincial), compared to top personal tax brackets exceeding 47.5%.
3. **Multi-Class Share Capital Structures:** Implementing Class A Common (voting), Class B Common (non-voting), and Class C Preferred shares provides maximum flexibility for discretionary dividends, family succession planning, and Section 85 ITA rollovers.

### Cost to Incorporate in Saskatchewan (Mandatory Government Fees):
- **ISC Corporate Name Reservation:** $50.00 CAD (90-day reservation)
- **ISC Articles of Incorporation (Form 1):** $255.00 CAD
- **Total Non-Negotiable Statutory Registry Fee:** $305.00 CAD

Explore the definitive founder manual: [Business Incorporation Services Saskatoon Guide](https://saskstartupsolutions.ca/blogs/saskatoon-business-incorporation-services-cost-timeline-guide). For immediate corporate registry assistance and new corporation setup, visit [Vici SaskStartupSolutions](https://saskstartupsolutions.ca/) or explore [Saskatoon Incorporation Services](https://saskstartupsolutions.ca/services#incorporation).

Practice Lead: Patrick Vachon | Office: 539 Avenue I N, Saskatoon, SK S7L 2G9 | Tel: +1 (306) 960-0091"""
    },
    {
        "title": "Small Business Bookkeeping in Saskatoon: Guide for Freelancers, Consultants & Corporations",
        "keywords": ["bookkeeper Saskatoon", "bookkeeping services Saskatoon", "small business bookkeeping Saskatoon", "monthly bookkeeping services Saskatoon", "bookkeeping cleanup Saskatoon"],
        "target_url": "https://saskstartupsolutions.ca/blogs/saskatoon-small-business-bookkeeping-services-freelancers-consultants-guide",
        "content": """# Small Business Bookkeeping Services in Saskatoon: From Monthly Reconciliations to CRA Audit Proofing

Accurate, up-to-date bookkeeping is the operational lifeline of every sustainable enterprise in Saskatchewan. Yet managing transaction ledgers, reconciling bank accounts, and navigating provincial sales tax rules is often the most time-consuming burden of business ownership.

Whether you are searching for an experienced **bookkeeper Saskatoon** to handle weekly reconciliations, seeking reliable **monthly bookkeeping services Saskatoon**, or requiring emergency **bookkeeping cleanup Saskatoon** for overdue records, having qualified accounting professionals safeguards your margins and eliminates CRA penalties.

### Saskatchewan Bookkeeping & Tax Compliance Priorities:
- **6% PST and 5% GST Separation:** Unlike federal GST with its $30,000 small supplier threshold, Saskatchewan PST requires registration from the very first dollar of taxable sales with zero small-supplier exemption.
- **Mandatory 6-Year CRA Record Retention (ITA 230(4)):** Canadian businesses must retain comprehensive books and original vouchers for six full years.
- **Digital Receipt Legal Validity (IC78-10R5):** CRA legally accepts optical scans and PDF receipts in place of physical paper, provided images are clear, complete, and properly indexed.
- **Catch-Up & Cleanup Bookkeeping:** For businesses facing arbitrary CRA assessments or overdue corporate T2 returns, a forensic bookkeeping cleanup replaces arbitrary estimates with verified facts, saving thousands in penalties.

Read our full operational guide: [Small Business Bookkeeping Services Saskatoon](https://saskstartupsolutions.ca/blogs/saskatoon-small-business-bookkeeping-services-freelancers-consultants-guide). Discover tailored accounting solutions at [Saskatoon Small Business Bookkeeping](https://saskstartupsolutions.ca/services#bookkeeping) and book a free review with [Vici SaskStartupSolutions](https://saskstartupsolutions.ca/).

Practice Lead: Patrick Vachon | 539 Avenue I N, Saskatoon, SK S7L 2G9 | Tel: +1 (306) 960-0091"""
    },
    {
        "title": "How to Register a Business Name in Saskatchewan: ISC Process, Costs & Sole Proprietorship Setup",
        "keywords": ["register a business name Saskatchewan", "business registration help Saskatoon", "sole proprietorship registration help Saskatchewan", "business registration cost Saskatchewan"],
        "target_url": "https://saskstartupsolutions.ca/blogs/how-to-register-a-business-name-in-saskatchewan-guide",
        "content": """# Registering a Business Name in Saskatchewan: ISC Process & Government Costs

Entrepreneurs launching a sole proprietorship, general partnership, or operating under a commercial trade name in Saskatchewan must register their business name under *The Business Names Registration Act* through Information Services Corporation (ISC).

Operating an unregistered commercial trade name in Saskatchewan can lead to banking freezes, loss of name protection, and municipal licensing hurdles.

### Exact Business Registration Cost in Saskatchewan:
1. **ISC Name Reservation Request:** $50.00 CAD
2. **Registration Statement for a Sole Proprietorship / Partnership:** $65.00 CAD
3. **Total Public Government Fee:** $115.00 CAD

### What Comes After Registering a Business Name in Saskatchewan?
- **CRA Business Number (BN9):** Activate your federal tax accounts. Register for GST/HST if gross taxable revenues exceed $30,000.
- **Saskatchewan eTax Services (SETS):** Register for 6% Provincial Sales Tax (PST).
- **Commercial Bank Account:** Take your ISC Certificate of Registration to your financial institution (Affinity Credit Union, RBC, TD, Scotiabank) to establish dedicated commercial banking.
- **City of Saskatoon Business License:** Comply with local municipal zoning bylaws before opening commercial doors.

Read the complete step-by-step tutorial: [How to Register a Business Name in Saskatchewan Guide](https://saskstartupsolutions.ca/blogs/how-to-register-a-business-name-in-saskatchewan-guide). Access expert registry assistance at [Saskatchewan Business Registration](https://saskstartupsolutions.ca/services#registry) and connect with [Vici SaskStartupSolutions](https://saskstartupsolutions.ca/).

Practice Lead: Patrick Vachon | 539 Avenue I N, Saskatoon, SK S7L 2G9 | Tel: +1 (306) 960-0091"""
    },
    {
        "title": "Starting a Business in Saskatoon: First-Time Founder Support, Incorporation Documents & CRA Compliance",
        "keywords": ["help starting a business in Saskatoon", "first time business owner support Saskatoon", "starting a business in Saskatchewan", "incorporation documents needed Saskatchewan", "free business consultation Saskatoon"],
        "target_url": "https://saskstartupsolutions.ca/blogs/saskatoon-small-business-startup-incorporation-bookkeeping-guide",
        "content": """# Starting a Business in Saskatoon: The Complete First-Time Founder Handbook

Launching a new commercial venture in Saskatoon requires navigating several interconnected legal, financial, and municipal steps. For first-time entrepreneurs and newcomers, understanding the sequencing of registration, corporate tax, and banking ensures long-term operational success.

### Key Milestones for Saskatoon Founders:
1. **Choosing the Right Legal Structure:** Evaluating Sole Proprietorship ($115 ISC fee, unlimited personal liability) versus Saskatchewan Corporation ($305 ISC fee, limited liability, 1% provincial small business tax rate).
2. **Executing Statutory Incorporation Documents:** Drafting Form 1 (Articles of Incorporation), Form 2 (Notice of Registered Office), Form 3 (Notice of Directors), and founding Director Consents.
3. **Setting Up Audit-Proof Recordkeeping:** Deploying cloud bookkeeping from day one. Under CRA Information Circular IC78-10R5, digital optical receipt scans are legally accepted, eliminating physical paper storage while satisfying mandatory 6-year retention rules under ITA 230(4).
4. **Multilingual Founder & Newcomer Support:** Accessing local guidance in English, French, Russian, and Armenian to understand Canadian corporate compliance without translation friction.

Review the authoritative roadmap: [Starting a Business in Saskatoon Guide](https://saskstartupsolutions.ca/blogs/saskatoon-small-business-startup-incorporation-bookkeeping-guide). Book your complimentary discovery session at [Free Business Consultation Saskatoon](https://saskstartupsolutions.ca/contact) with [Vici SaskStartupSolutions](https://saskstartupsolutions.ca/).

Practice Lead: Patrick Vachon | 539 Avenue I N, Saskatoon, SK S7L 2G9 | Tel: +1 (306) 960-0091"""
    }
]

def publish_rentry(text):
    for attempt in range(5):
        try:
            url = 'https://rentry.co/api/new'
            data = urllib.parse.urlencode({'text': text, 'csrfmiddlewaretoken': ''}).encode('utf-8')
            req = urllib.request.Request(url, data=data, headers={'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'})
            with urllib.request.urlopen(req, timeout=15) as resp:
                res = json.loads(resp.read().decode('utf-8'))
                if res.get('status') == '200':
                    return res.get('url')
        except Exception as e:
            time.sleep(2)
    return None

def publish_writeas(title, content):
    for attempt in range(3):
        try:
            url = 'https://write.as/api/posts'
            payload = json.dumps({'body': f"# {title}\n\n{content}", 'title': title}).encode('utf-8')
            req = urllib.request.Request(url, data=payload, headers={'Content-Type': 'application/json', 'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req, timeout=15) as resp:
                res = json.loads(resp.read().decode('utf-8'))
                if res.get('code') == 201:
                    post_id = res['data']['id']
                    return f"https://write.as/{post_id}"
        except Exception as e:
            time.sleep(2)
    return None

print("Publishing High-DA Campaign 5 (Top 50 Target Keywords)...")
results = []
for article in CAMPAIGN_ARTICLES:
    print(f"\nProcessing: {article['title']}")
    
    # 1. Rentry (DA 82)
    rentry_url = publish_rentry(article['content'])
    if rentry_url:
        print(f"  [SUCCESS] Rentry (DA 82): {rentry_url}")
        results.append({"platform": "Rentry.co", "da": 82, "title": article['title'], "url": rentry_url, "keywords": article['keywords']})
    else:
        print(f"  [FAILED] Rentry")
        
    time.sleep(1)
    
    # 2. Write.as (DA 75)
    writeas_url = publish_writeas(article['title'], article['content'])
    if writeas_url:
        print(f"  [SUCCESS] Write.as (DA 75): {writeas_url}")
        results.append({"platform": "Write.as", "da": 75, "title": article['title'], "url": writeas_url, "keywords": article['keywords']})
    else:
        print(f"  [FAILED] Write.as")
        
    time.sleep(1)

print("\n--- CAMPAIGN 5 SUMMARY ---")
print(f"Total Backlink Assets Created: {len(results)}")
for r in results:
    print(f"- [{r['platform']} DA {r['da']}] {r['title']}: {r['url']}")

with open('campaign_5_backlinks_log.json', 'w') as f:
    json.dump(results, f, indent=2)
print("Saved to campaign_5_backlinks_log.json")
