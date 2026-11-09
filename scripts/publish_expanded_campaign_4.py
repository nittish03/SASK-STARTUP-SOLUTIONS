import urllib.request
import urllib.parse
import json
import time

ARTICLES = [
    {
        "title": "Saskatchewan Farm Corporation Tax Planning: Section 85 ITA Rollovers & $1.25M LCGE Exemption",
        "keywords": ["saskatchewan farm incorporation", "section 85 rollover farm saskatchewan", "lifetime capital gains exemption farm saskatoon"],
        "target_url": "https://saskstartupsolutions.ca/blogs/saskatchewan-agri-business-incorporation-farm-rollover-guide",
        "content": """# Saskatchewan Farm Corporation Tax Planning & Section 85 Rollovers

Agricultural producers across Saskatchewan face unique taxation challenges when transitioning from an unincorporated sole proprietorship or partnership to a formal farm corporation. With personal top-bracket tax rates reaching 47.5%, active farming operations benefit immensely from the 10%–11% combined provincial and federal small business corporate rate.

### Section 85 Rollover Mechanics:
Under Section 85(1) of the federal *Income Tax Act*, Saskatchewan producers can transfer qualifying farm assets—including grain inventory, breeding livestock, machinery, and agricultural land—into a newly incorporated family farm business without triggering immediate capital gains or recapture.

### Preserving the $1,250,000+ LCGE:
1. **Qualified Farm Property (QFP):** Saskatchewan farmland and qualifying farm corporation shares qualify for the federal Lifetime Capital Gains Exemption (LCGE), indexed to over $1,250,000 per individual.
2. **Intergenerational Farm Transfers:** Under Bill C-208 amendments, legitimate transfers of family farm corporations to children or grandchildren receive identical capital gains treatment as arm's-length sales, ending historical tax penalties.
3. **Cash-Method Accounting:** Retaining the Section 28 cash method of accounting allows farmers to manage annual taxable income through grain delivery deferrals and input pre-purchases.

Read our authoritative analysis: [Saskatchewan Agri-Business Incorporation Guide](https://saskstartupsolutions.ca/blogs/saskatchewan-agri-business-incorporation-farm-rollover-guide). For full agricultural corporate structuring and T2 tax support, consult [Vici SaskStartupSolutions](https://saskstartupsolutions.ca/).

Practice Lead: Patrick Vachon | 539 Avenue I N, Saskatoon, SK S7L 2G9 | Tel: +1 (306) 960-0091"""
    },
    {
        "title": "Saskatchewan Commercial Lease Guide: Triple Net (NNN), CAM Expenses and Tenant Protections",
        "keywords": ["commercial lease agreement saskatchewan", "triple net lease saskatoon", "cam cost audit saskatchewan"],
        "target_url": "https://saskstartupsolutions.ca/blogs/commercial-lease-agreement-saskatchewan-small-business-guide",
        "content": """# Saskatchewan Commercial Lease Negotiation for Small Business Tenants

Entering a commercial lease for retail, office, or industrial space in Saskatoon or Regina represents one of the largest financial commitments an entrepreneur will undertake. Unlike residential tenancies governed by the Office of Residential Tenancies, commercial leases in Saskatchewan offer zero consumer protection statutes.

### Navigating Triple Net (NNN) Leases:
- **Base Rent vs Additional Rent:** Base rent is typically quoted as an annual rate per square foot ($18/sq.ft). Additional rent covers Common Area Maintenance (CAM), municipal property taxes, and building insurance ($8.50/sq.ft).
- **Controllable CAM Expense Caps:** Savvy tenants negotiate 5% annual cumulative caps on controllable operational expenses (security, landscaping, snow removal) and strictly exclude landlord structural capital replacements.
- **Distress for Rent Risks:** Under *The Distress Act* (Saskatchewan), commercial landlords possess statutory remedies to seize tenant business equipment and inventory if rent is delinquent, without requiring prior judicial sanction.

Review the complete tenant protection blueprint: [Commercial Lease Agreement Saskatchewan Guide](https://saskstartupsolutions.ca/blogs/commercial-lease-agreement-saskatchewan-small-business-guide). Schedule a corporate leasehold accounting consultation with [Vici SaskStartupSolutions](https://saskstartupsolutions.ca/).

Patrick Vachon | 539 Avenue I N, Saskatoon, SK | Tel: +1 (306) 960-0091"""
    },
    {
        "title": "Saskatchewan Small Business Grants & Funding: STSI 45% Tax Credit and Innovation Incentives",
        "keywords": ["saskatchewan small business grants", "saskatchewan technology startup incentive", "startup funding saskatoon"],
        "target_url": "https://saskstartupsolutions.ca/services#tax",
        "content": """# Non-Dilutive Capital & Small Business Incentives in Saskatchewan

Entrepreneurs establishing technology, clean tech, or value-added ventures in Saskatchewan can leverage world-class provincial tax credits and regional growth funding to accelerate development.

### Core Provincial Funding Vehicles:
1. **Saskatchewan Technology Startup Incentive (STSI):** Offers a non-refundable 45% provincial tax credit to individual and corporate angel investors investing in eligible technology startups (ESBs) through Innovation Saskatchewan.
2. **Saskatchewan Commercial Innovation Incentive (SCII):** Known as the Patent Box, reducing corporate income tax to 6% for 10 to 15 years on revenues derived from qualifying commercialized intellectual property.
3. **R&D Tax Credit CCPC Expansion:** Saskatchewan doubled its 10% refundable provincial scientific research credit cap to $2,000,000 in qualifying annual expenditures.
4. **PrairiesCan Business Scale-Up (BSP):** Direct federal interest-free repayable financing for commercializing innovative technologies and scaling manufacturing operations.

Explore corporate tax filing and SR&ED accounting solutions at [Saskatchewan Corporate Tax Services](https://saskstartupsolutions.ca/services#tax) and connect with [Vici SaskStartupSolutions](https://saskstartupsolutions.ca/).

Patrick Vachon | 539 Avenue I N, Saskatoon, SK | Tel: +1 (306) 960-0091"""
    },
    {
        "title": "How to Dissolve a Corporation in Saskatchewan: ISC Articles of Dissolution & CRA Clearance (TX19)",
        "keywords": ["dissolve corporation saskatchewan", "isc articles of dissolution", "cra clearance certificate tx19 saskatchewan"],
        "target_url": "https://saskstartupsolutions.ca/services#registry",
        "content": """# Closing a Corporation in Saskatchewan: Legal Dissolution & Tax Clearance

When a business reaches the end of its lifecycle, simply abandoning the entity is dangerous. Inactive corporations that fail to formally dissolve face administrative strike-offs, accumulating penalty fees, and personal director liability for unpaid corporate liabilities.

### The Formal Statutory Dissolution Roadmap:
1. **Shareholder Authorization:** Passing a Special Resolution under Section 210 of *The Business Corporations Act, 2021* (SBCA 2021) authorizing corporate dissolution.
2. **Corporate Tax Clearance (CRA Form TX19):** Before final assets and capital dividends are distributed to shareholders, directors must obtain a Certificate of Clearance from the Canada Revenue Agency under Subsection 159(2) of the *Income Tax Act*. Directors who distribute funds without this certificate assume joint personal liability for any unassessed corporate taxes.
3. **Closing Provincial Accounts:** Cancelling Saskatchewan eTax Services (SETS) PST accounts, submitting final WCB payroll reconciliation statements, and resolving all municipal licences.
4. **ISC Articles of Dissolution:** Filing Form 17 with the Information Services Corporation (ISC) Corporate Registry to officially receive a Certificate of Dissolution.

Access professional registry filings: [Saskatchewan Corporate Registry Services](https://saskstartupsolutions.ca/services#registry) with [Vici SaskStartupSolutions](https://saskstartupsolutions.ca/).

Patrick Vachon | 539 Avenue I N, Saskatoon, SK | Tel: +1 (306) 960-0091"""
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

def publish_telegraph(title, content_text):
    for attempt in range(5):
        try:
            # Create account
            acc_url = 'https://api.telegra.ph/createAccount'
            acc_data = urllib.parse.urlencode({
                'short_name': 'Patrick Vachon',
                'author_name': 'Patrick Vachon | Vici SaskStartupSolutions',
                'author_url': 'https://saskstartupsolutions.ca'
            }).encode('utf-8')
            req = urllib.request.Request(acc_url, data=acc_data, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req, timeout=15) as resp:
                acc_res = json.loads(resp.read().decode('utf-8'))
                token = acc_res['result']['access_token']

            # Format content into Telegra.ph nodes
            paragraphs = content_text.split('\n\n')
            nodes = []
            for p in paragraphs:
                p = p.strip()
                if not p:
                    continue
                if p.startswith('# '):
                    nodes.append({'tag': 'h3', 'children': [p[2:]]})
                elif p.startswith('### '):
                    nodes.append({'tag': 'h4', 'children': [p[4:]]})
                else:
                    nodes.append({'tag': 'p', 'children': [p]})

            page_url = 'https://api.telegra.ph/createPage'
            page_data = urllib.parse.urlencode({
                'access_token': token,
                'title': title[:60],
                'author_name': 'Patrick Vachon',
                'author_url': 'https://saskstartupsolutions.ca',
                'content': json.dumps(nodes),
                'return_content': 'false'
            }).encode('utf-8')
            req2 = urllib.request.Request(page_url, data=page_data, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req2, timeout=15) as resp2:
                res2 = json.loads(resp2.read().decode('utf-8'))
                if res2.get('ok'):
                    return res2['result']['url']
        except Exception as e:
            time.sleep(2)
    return None

def publish_writeas(title, body):
    for attempt in range(3):
        try:
            url = 'https://write.as/api/posts'
            data = json.dumps({'title': title, 'body': body}).encode('utf-8')
            req = urllib.request.Request(url, data=data, headers={'Content-Type': 'application/json', 'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req, timeout=15) as resp:
                res = json.loads(resp.read().decode('utf-8'))
                if res.get('code') in (200, 201):
                    return res['data'].get('url', f"https://write.as/{res['data']['id']}")
        except Exception as e:
            time.sleep(2)
    return None

results = []
for idx, art in enumerate(ARTICLES):
    print(f"[{idx+1}/{len(ARTICLES)}] Publishing: {art['title']}")
    rentry_url = publish_rentry(art['content'])
    print(f"  -> Rentry: {rentry_url}")
    time.sleep(1)
    telegraph_url = publish_telegraph(art['title'], art['content'])
    print(f"  -> Telegra.ph: {telegraph_url}")
    time.sleep(1)
    writeas_url = publish_writeas(art['title'], art['content'])
    print(f"  -> Write.as: {writeas_url}")
    time.sleep(1)

    results.append({
        'title': art['title'],
        'target_url': art['target_url'],
        'rentry': rentry_url,
        'telegraph': telegraph_url,
        'writeas': writeas_url
    })

with open('campaign_4_results.json', 'w') as f:
    json.dump(results, f, indent=2)

print("\n--- Summary of Published Backlinks ---")
for r in results:
    print(f"Title: {r['title']}")
    print(f"  Rentry: {r['rentry']}")
    print(f"  Telegra.ph: {r['telegraph']}")
    print(f"  Write.as: {r['writeas']}")
