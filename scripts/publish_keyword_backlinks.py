import os
import urllib.request
import urllib.parse
import json
import time

TELEGRAPH_TOKEN = os.environ.get('TELEGRAPH_TOKEN', '')
AUTHOR_NAME = 'Patrick Vachon'
AUTHOR_URL = 'https://saskstartupsolutions.ca/'

def publish_telegraph(title, paragraphs):
    content = []
    for p in paragraphs:
        if isinstance(p, dict):
            content.append(p)
        elif isinstance(p, str):
            content.append({'tag': 'p', 'children': [p]})
    
    url = 'https://api.telegra.ph/createPage'
    payload = {
        'access_token': TELEGRAPH_TOKEN,
        'title': title,
        'author_name': AUTHOR_NAME,
        'author_url': AUTHOR_URL,
        'content': json.dumps(content),
        'return_content': False
    }
    data = urllib.parse.urlencode(payload).encode('utf-8')
    req = urllib.request.Request(url, data=data)
    with urllib.request.urlopen(req) as resp:
        res = json.loads(resp.read().decode('utf-8'))
        if res.get('ok'):
            return res['result']['url']
        raise Exception(f"Telegra.ph error: {res}")

def publish_rentry(text):
    url = 'https://rentry.co/api/new'
    data = urllib.parse.urlencode({'text': text, 'csrfmiddlewaretoken': ''}).encode('utf-8')
    req = urllib.request.Request(url, data=data, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req) as resp:
        res = json.loads(resp.read().decode('utf-8'))
        if res.get('status') == '200':
            return res.get('url')
        raise Exception(f"Rentry error: {res}")

TELEGRAPH_ARTICLES = [
    {
        'title': 'How to Incorporate a Business in Saskatoon: Saskatchewan Founder Roadmap',
        'content': [
            {'tag': 'p', 'children': [
                'Establishing a new company in Saskatchewan requires navigating the Information Services Corporation (ISC) Corporate Registry, drafting customized share classes, and securing your CRA business number. At ',
                {'tag': 'a', 'attrs': {'href': 'https://saskstartupsolutions.ca/'}, 'children': ['Vici SaskStartupSolutions']},
                ', we provide specialized corporate setup assistance for entrepreneurs across the province.'
            ]},
            {'tag': 'h3', 'children': ['ISC Name Reservation & Articles of Incorporation']},
            {'tag': 'p', 'children': [
                'Whether setting up a numbered corporation or reserving a distinct commercial trade name, choosing the right corporate structure protects founders from personal liability while enabling Saskatchewan’s combined small business tax rate of 10% (9% federal + 1% Saskatchewan). Learn more in our comprehensive guide: ',
                {'tag': 'a', 'attrs': {'href': 'https://saskstartupsolutions.ca/blogs/how-to-incorporate-in-saskatchewan-step-by-step-guide'}, 'children': ['how to incorporate in Saskatchewan']},
                '.'
            ]},
            {'tag': 'h3', 'children': ['Saskatoon Business Registration & Ongoing Compliance']},
            {'tag': 'p', 'children': [
                'Beyond initial incorporation, maintaining your legal corporate status requires annual ISC returns, registered office maintenance, and organized bookkeeping records. Discover our end-to-end ',
                {'tag': 'a', 'attrs': {'href': 'https://saskstartupsolutions.ca/services'}, 'children': ['business incorporation services Saskatoon']},
                ' or ',
                {'tag': 'a', 'attrs': {'href': 'https://saskstartupsolutions.ca/booking'}, 'children': ['schedule a free business consultation in Saskatoon']},
                ' with Practice Lead Patrick Vachon.'
            ]},
            {'tag': 'hr'},
            {'tag': 'p', 'children': ['Vici SaskStartupSolutions | 539 Avenue I N, Saskatoon, SK S7L 2G9 | Tel: 1 (306) 960-0091 | https://saskstartupsolutions.ca/']}
        ]
    },
    {
        'title': 'Sole Proprietorship vs. Corporation in Saskatchewan: Strategic Tax & Liability Guide',
        'content': [
            {'tag': 'p', 'children': [
                'One of the first critical crossroads facing Saskatchewan entrepreneurs is choosing between a sole proprietorship and an incorporated entity. Operating as a sole proprietor provides initial simplicity, but profits are taxed directly at progressive personal rates reaching up to 47.5%.'
            ]},
            {'tag': 'h3', 'children': ['Tax Deferral & Corporate Asset Protection']},
            {'tag': 'p', 'children': [
                'By comparison, incorporated Canadian-Controlled Private Corporations (CCPCs) in Saskatchewan benefit from the small business deduction. Read our detailed comparison: ',
                {'tag': 'a', 'attrs': {'href': 'https://saskstartupsolutions.ca/blogs/sole-proprietorship-vs-incorporation-saskatchewan'}, 'children': ['sole proprietorship vs corporation Saskatchewan']},
                '.'
            ]},
            {'tag': 'h3', 'children': ['Transitioning Your Existing Business Structure']},
            {'tag': 'p', 'children': [
                'If your self-employed revenues have exceeded $75,000 annually, moving from a proprietorship into a corporation allows you to retain surplus capital at the 10% small business tax rate. Review our ',
                {'tag': 'a', 'attrs': {'href': 'https://saskstartupsolutions.ca/services'}, 'children': ['small business bookkeeping Saskatoon']},
                ' packages or ',
                {'tag': 'a', 'attrs': {'href': 'https://saskstartupsolutions.ca/booking'}, 'children': ['book an introductory consultation']},
                ' to plan your corporate transition.'
            ]},
            {'tag': 'hr'},
            {'tag': 'p', 'children': ['Vici SaskStartupSolutions | 539 Avenue I N, Saskatoon, SK S7L 2G9 | Tel: 1 (306) 960-0091 | https://saskstartupsolutions.ca/']}
        ]
    },
    {
        'title': 'Saskatchewan GST and PST Compliance: Small Business Registration Thresholds',
        'content': [
            {'tag': 'p', 'children': [
                'Navigating multi-tier sales tax in Saskatchewan requires tracking both federal 5% GST via the CRA and provincial 6% PST via the Ministry of Finance SETS portal. While CRA applies a $30,000 gross revenue threshold for GST, Saskatchewan enforces strict PST registration requirements from dollar one on taxable goods and services.'
            ]},
            {'tag': 'h3', 'children': ['Input Tax Credits & Provincial Audit Preparedness']},
            {'tag': 'p', 'children': [
                'Claiming Input Tax Credits (ITCs) on business expenses requires holding valid vendor receipts showing GST numbers and purchase breakdowns. Review our operational guide: ',
                {'tag': 'a', 'attrs': {'href': 'https://saskstartupsolutions.ca/blogs/saskatchewan-gst-pst-rules-for-small-business'}, 'children': ['when does a Saskatchewan business need a GST number']},
                '.'
            ]},
            {'tag': 'h3', 'children': ['Professional Monthly Accounting Support in Saskatoon']},
            {'tag': 'p', 'children': [
                'Avoid penalties and late remittance interest by pairing your sales tax filings with accurate ',
                {'tag': 'a', 'attrs': {'href': 'https://saskstartupsolutions.ca/services'}, 'children': ['monthly bookkeeping services Saskatoon']},
                '. Contact ',
                {'tag': 'a', 'attrs': {'href': 'https://saskstartupsolutions.ca/'}, 'children': ['Vici SaskStartupSolutions']},
                ' or ',
                {'tag': 'a', 'attrs': {'href': 'https://saskstartupsolutions.ca/contact'}, 'children': ['visit our Saskatoon office']},
                ' to keep your CRA records bulletproof.'
            ]},
            {'tag': 'hr'},
            {'tag': 'p', 'children': ['Vici SaskStartupSolutions | 539 Avenue I N, Saskatoon, SK S7L 2G9 | Tel: 1 (306) 960-0091 | https://saskstartupsolutions.ca/']}
        ]
    },
    {
        'title': 'Catch-Up & Cleanup Bookkeeping in Saskatoon: Resolving Overdue CRA Tax Records',
        'content': [
            {'tag': 'p', 'children': [
                'Running behind on bookkeeping is one of the most common hurdles faced by busy Saskatchewan business owners. Whether you are facing a backlog of unfiled T2 returns or shoeboxes of paper receipts, catching up protects your company from CRA arbitrary assessments and costly gross negligence penalties.'
            ]},
            {'tag': 'h3', 'children': ['Digital Receipt Organization & General Ledger Reconciliation']},
            {'tag': 'p', 'children': [
                'Our structured cleanup protocol transforms messy financial records into digital, audit-ready balance sheets and general ledgers. Learn the exact process in our guide: ',
                {'tag': 'a', 'attrs': {'href': 'https://saskstartupsolutions.ca/blogs/bookkeeping-cleanup-overdue-tax-records-saskatoon'}, 'children': ['bookkeeping cleanup Saskatoon']},
                '.'
            ]},
            {'tag': 'h3', 'children': ['Getting Back on Track with Patrick Vachon']},
            {'tag': 'p', 'children': [
                'Regain peace of mind and prepare your books for current T2 filing. Connect with a trusted ',
                {'tag': 'a', 'attrs': {'href': 'https://saskstartupsolutions.ca/'}, 'children': ['bookkeeper Saskatoon']},
                ' at Vici SaskStartupSolutions or ',
                {'tag': 'a', 'attrs': {'href': 'https://saskstartupsolutions.ca/booking'}, 'children': ['schedule a confidential discovery meeting']},
                '.'
            ]},
            {'tag': 'hr'},
            {'tag': 'p', 'children': ['Vici SaskStartupSolutions | 539 Avenue I N, Saskatoon, SK S7L 2G9 | Tel: 1 (306) 960-0091 | https://saskstartupsolutions.ca/']}
        ]
    },
    {
        'title': 'Newcomer Business Setup in Saskatchewan: Multilingual Corporate & Tax Support',
        'content': [
            {'tag': 'p', 'children': [
                'Saskatchewan is an outstanding province for international entrepreneurs and newcomer business owners. However, navigating the provincial ISC corporate registry, CRA program accounts, and provincial employment standards in a second language can feel overwhelming.'
            ]},
            {'tag': 'h3', 'children': ['Multilingual Advisory in English, French, Russian & Armenian']},
            {'tag': 'p', 'children': [
                'At Vici SaskStartupSolutions, Practice Lead Patrick Vachon provides personalized corporate and bookkeeping consultations in English, French, Russian, and Armenian. Read our newcomer roadmap: ',
                {'tag': 'a', 'attrs': {'href': 'https://saskstartupsolutions.ca/blogs/newcomer-business-setup-guide-saskatchewan-multilingual'}, 'children': ['business setup help for newcomers Saskatoon']},
                '.'
            ]},
            {'tag': 'h3', 'children': ['Free Business Consultations for Immigrant Founders']},
            {'tag': 'p', 'children': [
                'Whether applying through the SINP entrepreneur stream or establishing an independent service business, access our dedicated ',
                {'tag': 'a', 'attrs': {'href': 'https://saskstartupsolutions.ca/services'}, 'children': ['incorporation and bookkeeping services']},
                ' or ',
                {'tag': 'a', 'attrs': {'href': 'https://saskstartupsolutions.ca/booking'}, 'children': ['book a free newcomer discovery call']},
                ' today.'
            ]},
            {'tag': 'hr'},
            {'tag': 'p', 'children': ['Vici SaskStartupSolutions | 539 Avenue I N, Saskatoon, SK S7L 2G9 | Tel: 1 (306) 960-0091 | https://saskstartupsolutions.ca/']}
        ]
    }
]

RENTRY_ARTICLES = [
    """# Saskatoon Business Incorporation & Entity Architecture (2026 Guide)

Incorporating a commercial enterprise in Saskatchewan is administered by the Information Services Corporation (ISC) under *The Business Corporations Act, 2021*. 

### Key Incorporation Steps & Requirements:
1. **ISC Name Reservation:** Securing a distinctive corporate name or electing a numbered corporation.
2. **Articles of Incorporation:** Establishing Class A voting and Class B non-voting share structures.
3. **CRA Business Registration:** Acquiring the 9-digit Business Number (BN9) and corporate tax account (RC0001).
4. **Corporate Minute Book Maintenance:** Maintaining director resolutions, shareholder registries, and annual returns.

Explore the complete roadmap: [How to Incorporate in Saskatchewan](https://saskstartupsolutions.ca/blogs/how-to-incorporate-in-saskatchewan-step-by-step-guide).

For full-service registration, visit [Vici SaskStartupSolutions](https://saskstartupsolutions.ca/) or review our [Business Incorporation Services Saskatoon](https://saskstartupsolutions.ca/services).

Schedule a discovery meeting: [Book a Free Consultation in Saskatoon](https://saskstartupsolutions.ca/booking).

---
*Vici SaskStartupSolutions | 539 Avenue I N, Saskatoon, SK S7L 2G9 | 1 (306) 960-0091*
""",
    """# Saskatchewan Small Business Bookkeeping & Sales Tax Protocol

Accurate monthly financial records are the foundation of any thriving Saskatchewan company. Between federal 5% GST and provincial 6% PST, small businesses must maintain auditable general ledgers.

### Core Bookkeeping Pillars:
- **Monthly Bank & Credit Card Reconciliations:** Matching electronic bank feeds with general ledger postings.
- **Input Tax Credit (ITC) Documentation:** Preserving compliant vendor receipts under CRA Information Circular IC78-10R5.
- **T2 Corporate Tax Preparation:** Compiling year-end Notice to Reader financial statements for annual tax filing.

Read the guide: [Small Business Bookkeeping in Saskatoon](https://saskstartupsolutions.ca/blogs/small-business-bookkeeping-saskatoon).

Discover our monthly packages: [Monthly Bookkeeping Services Saskatoon](https://saskstartupsolutions.ca/services).

Get in touch with Patrick Vachon: [Schedule an Initial Consultation](https://saskstartupsolutions.ca/booking).

---
*Vici SaskStartupSolutions | 539 Avenue I N, Saskatoon, SK S7L 2G9 | 1 (306) 960-0091*
""",
    """# Saskatchewan ISC Corporate Annual Returns: Compliance Protocol

Every active corporation in Saskatchewan must submit an annual return to the Information Services Corporation (ISC) during its incorporation anniversary month.

### The Dangers of Missing an ISC Annual Return:
- **Intent to Strike Notice:** ISC issues a formal notice of corporate default.
- **Administrative Dissolution:** After 90 days, the corporation is struck from the registry.
- **Frozen Accounts & Loss of Name:** Struck corporations cannot defend lawsuits, freeze banking operations, and forfeit exclusive rights to their corporate name.

Learn how to stay compliant: [Saskatchewan ISC Annual Returns Guide](https://saskstartupsolutions.ca/blogs/isc-annual-returns-corporate-registry-saskatchewan).

Need immediate assistance? Visit [Vici SaskStartupSolutions](https://saskstartupsolutions.ca/) or [Contact our Saskatoon Team](https://saskstartupsolutions.ca/contact).

---
*Vici SaskStartupSolutions | 539 Avenue I N, Saskatoon, SK S7L 2G9 | 1 (306) 960-0091*
""",
    """# Saskatoon Bookkeeping Cleanup & CRA Catch-Up Accounting

Falling behind on tax filings and bookkeeping creates massive stress and financial risk for Saskatchewan small businesses. Unfiled T2 returns trigger CRA arbitrary assessments and hefty interest charges.

### The 4-Step Cleanup Method:
1. **Bank Statement Retrieval:** Pulling historical digital bank and credit card statements.
2. **Receipt Sorting & Digitization:** Categorizing expenses according to CRA deduction rules.
3. **General Ledger Catch-Up:** Reconciling past financial periods month by month.
4. **Notice to Reader & T2 Filing:** Presenting compiled balance sheets and filing delinquent corporate returns.

Read the in-depth article: [Catch-Up Bookkeeping in Saskatoon](https://saskstartupsolutions.ca/blogs/bookkeeping-cleanup-overdue-tax-records-saskatoon).

Connect with a top-rated [Bookkeeper Saskatoon](https://saskstartupsolutions.ca/) or [Schedule a Private Consultation](https://saskstartupsolutions.ca/booking).

---
*Vici SaskStartupSolutions | 539 Avenue I N, Saskatoon, SK S7L 2G9 | 1 (306) 960-0091*
""",
    """# Multilingual Business Setup for Newcomers in Saskatchewan

Starting a business as a newcomer in Saskatchewan offers incredible economic opportunities, but legal and tax compliance can be challenging in a new country.

### Essential Setup Checklist for Immigrant Founders:
- **Entity Structure:** Sole proprietorship vs. Canadian-controlled private corporation.
- **ISC Registration:** Name approval and Articles of Incorporation through the provincial registry.
- **CRA Accounts:** Business numbers, GST/HST, and payroll source deductions.
- **Multilingual Support:** Consultations available in English, French (Français), Russian (Русский), and Armenian (Հայերեն).

Read the newcomer guide: [Newcomer Business Setup in Saskatchewan](https://saskstartupsolutions.ca/blogs/newcomer-business-setup-guide-saskatchewan-multilingual).

Learn about Patrick Vachon's multilingual practice: [Vici SaskStartupSolutions Staff](https://saskstartupsolutions.ca/staff).

Book your initial discussion: [Free Business Consultation Saskatoon](https://saskstartupsolutions.ca/booking).

---
*Vici SaskStartupSolutions | 539 Avenue I N, Saskatoon, SK S7L 2G9 | 1 (306) 960-0091*
"""
]

results = []

print("Publishing new targeted articles to Telegra.ph (DA 91)...")
for art in TELEGRAPH_ARTICLES:
    try:
        url = publish_telegraph(art['title'], art['content'])
        print(f"Telegra.ph live: {url} -> {art['title']}")
        results.append({'platform': 'Telegra.ph', 'da': 91, 'title': art['title'], 'url': url})
        time.sleep(1)
    except Exception as e:
        print(f"Failed {art['title']}: {e}")

print("\nPublishing new targeted articles to Rentry (DA 82)...")
for text in RENTRY_ARTICLES:
    title = text.split('\n')[0].replace('# ', '')
    try:
        url = publish_rentry(text)
        print(f"Rentry live: {url} -> {title}")
        results.append({'platform': 'Rentry', 'da': 82, 'title': title, 'url': url})
        time.sleep(1)
    except Exception as e:
        print(f"Failed {title}: {e}")

with open('campaigns/new_keyword_backlinks.json', 'w') as f:
    json.dump(results, f, indent=2)

print(f"\nPublished {len(results)} new keyword-targeted authority assets!")
