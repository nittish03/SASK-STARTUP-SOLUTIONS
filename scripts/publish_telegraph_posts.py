import urllib.request
import urllib.parse
import json
import time

# Create a fresh Telegra.ph account
acc_url = 'https://api.telegra.ph/createAccount'
acc_data = urllib.parse.urlencode({
    'short_name': 'PatrickV',
    'author_name': 'Patrick Vachon | Vici SaskStartupSolutions',
    'author_url': 'https://saskstartupsolutions.ca/'
}).encode('utf-8')

req = urllib.request.Request(acc_url, data=acc_data, headers={'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'})
with urllib.request.urlopen(req, timeout=15) as resp:
    acc_res = json.loads(resp.read().decode('utf-8'))
    token = acc_res['result']['access_token']
    print("Created Telegra.ph token:", token[:10] + "...")

articles = [
    {
        'title': 'Saskatchewan Farm Corporation Tax Planning: Section 85 ITA Rollovers & $1.25M LCGE Exemption',
        'content': [
            {'tag': 'p', 'children': [
                'Agricultural producers across Saskatchewan face unique taxation challenges when transitioning from an unincorporated sole proprietorship or partnership to a formal farm corporation. With personal top-bracket tax rates reaching 47.5%, active farming operations benefit immensely from the 10%–11% combined provincial and federal small business corporate rate.'
            ]},
            {'tag': 'h3', 'children': ['Section 85 Rollover Mechanics in Saskatchewan']},
            {'tag': 'p', 'children': [
                'Under Section 85(1) of the federal Income Tax Act, Saskatchewan producers can transfer qualifying farm assets—including grain inventory, breeding livestock, machinery, and agricultural land—into a newly incorporated family farm business without triggering immediate capital gains or recapture.'
            ]},
            {'tag': 'h3', 'children': ['Preserving the $1,250,000+ LCGE']},
            {'tag': 'ul', 'children': [
                {'tag': 'li', 'children': ['Qualified Farm Property (QFP): Saskatchewan farmland and qualifying farm corporation shares qualify for the federal Lifetime Capital Gains Exemption (LCGE), indexed to over $1,250,000 per individual.']},
                {'tag': 'li', 'children': ['Bill C-208 Intergenerational Transfers: Legitimate transfers of family farm corporations to children or grandchildren receive identical capital gains treatment as arm\'s-length sales.']},
                {'tag': 'li', 'children': ['Cash-Method Accounting: Retaining Section 28 cash accounting allows farmers to manage annual taxable income through strategic input pre-purchases.']}
            ]},
            {'tag': 'p', 'children': [
                'Read our authoritative guide: ',
                {'tag': 'a', 'attrs': {'href': 'https://saskstartupsolutions.ca/blogs/saskatchewan-agri-business-incorporation-farm-rollover-guide'}, 'children': ['Saskatchewan Agri-Business Incorporation Guide']},
                '. For full agricultural corporate structuring and T2 tax support, consult ',
                {'tag': 'a', 'attrs': {'href': 'https://saskstartupsolutions.ca/'}, 'children': ['Vici SaskStartupSolutions']},
                '.'
            ]},
            {'tag': 'hr'},
            {'tag': 'p', 'children': ['Patrick Vachon | 539 Avenue I N, Saskatoon, SK S7L 2G9 | Tel: +1 (306) 960-0091']}
        ]
    },
    {
        'title': 'Saskatchewan Small Business Grants & Funding: STSI 45% Tax Credit and Innovation Incentives',
        'content': [
            {'tag': 'p', 'children': [
                'Entrepreneurs establishing technology, clean tech, or value-added ventures in Saskatchewan can leverage world-class provincial tax credits and regional growth funding to accelerate development.'
            ]},
            {'tag': 'h3', 'children': ['Core Provincial Funding Vehicles in Saskatchewan']},
            {'tag': 'ul', 'children': [
                {'tag': 'li', 'children': ['Saskatchewan Technology Startup Incentive (STSI): Offers a non-refundable 45% provincial tax credit to individual and corporate angel investors investing in eligible technology startups (ESBs).']},
                {'tag': 'li', 'children': ['Saskatchewan Commercial Innovation Incentive (SCII): Known as the Patent Box, reducing corporate income tax to 6% for 10 to 15 years on revenues derived from qualifying commercialized intellectual property.']},
                {'tag': 'li', 'children': ['R&D Tax Credit CCPC Expansion: Saskatchewan doubled its 10% refundable provincial scientific research credit cap to $2,000,000 in qualifying annual expenditures.']},
                {'tag': 'li', 'children': ['PrairiesCan Business Scale-Up (BSP): Direct federal interest-free repayable financing for commercializing innovative technologies.']}
            ]},
            {'tag': 'p', 'children': [
                'Explore corporate tax filing and SR&ED accounting solutions at ',
                {'tag': 'a', 'attrs': {'href': 'https://saskstartupsolutions.ca/services#tax'}, 'children': ['Saskatchewan Corporate Tax Services']},
                ' and connect with ',
                {'tag': 'a', 'attrs': {'href': 'https://saskstartupsolutions.ca/'}, 'children': ['Vici SaskStartupSolutions']},
                '.'
            ]},
            {'tag': 'hr'},
            {'tag': 'p', 'children': ['Patrick Vachon | 539 Avenue I N, Saskatoon, SK S7L 2G9 | Tel: +1 (306) 960-0091']}
        ]
    },
    {
        'title': 'How to Dissolve a Corporation in Saskatchewan: ISC Articles of Dissolution & CRA Clearance (TX19)',
        'content': [
            {'tag': 'p', 'children': [
                'When a business reaches the end of its lifecycle, simply abandoning the entity is dangerous. Inactive corporations that fail to formally dissolve face administrative strike-offs, accumulating penalty fees, and personal director liability for unpaid corporate liabilities.'
            ]},
            {'tag': 'h3', 'children': ['The Formal Statutory Dissolution Roadmap in Saskatchewan']},
            {'tag': 'ul', 'children': [
                {'tag': 'li', 'children': ['Shareholder Authorization: Passing a Special Resolution under Section 210 of The Business Corporations Act, 2021 (SBCA 2021) authorizing corporate dissolution.']},
                {'tag': 'li', 'children': ['Corporate Tax Clearance (CRA Form TX19): Before final assets and capital dividends are distributed to shareholders, directors must obtain a Certificate of Clearance from CRA under Subsection 159(2) of the Income Tax Act.']},
                {'tag': 'li', 'children': ['Closing Provincial Accounts: Cancelling Saskatchewan eTax Services (SETS) PST accounts and submitting final WCB payroll reconciliation statements.']},
                {'tag': 'li', 'children': ['ISC Articles of Dissolution: Filing Form 17 with the Information Services Corporation (ISC) Corporate Registry to officially receive a Certificate of Dissolution.']}
            ]},
            {'tag': 'p', 'children': [
                'Access professional registry filings: ',
                {'tag': 'a', 'attrs': {'href': 'https://saskstartupsolutions.ca/services#registry'}, 'children': ['Saskatchewan Corporate Registry Services']},
                ' with ',
                {'tag': 'a', 'attrs': {'href': 'https://saskstartupsolutions.ca/'}, 'children': ['Vici SaskStartupSolutions']},
                '.'
            ]},
            {'tag': 'hr'},
            {'tag': 'p', 'children': ['Patrick Vachon | 539 Avenue I N, Saskatoon, SK S7L 2G9 | Tel: +1 (306) 960-0091']}
        ]
    }
]

for art in articles:
    page_url = 'https://api.telegra.ph/createPage'
    page_data = urllib.parse.urlencode({
        'access_token': token,
        'title': art['title'][:60],
        'author_name': 'Patrick Vachon',
        'author_url': 'https://saskstartupsolutions.ca/',
        'content': json.dumps(art['content']),
        'return_content': 'false'
    }).encode('utf-8')
    req2 = urllib.request.Request(page_url, data=page_data, headers={'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'})
    with urllib.request.urlopen(req2, timeout=15) as resp2:
        res2 = json.loads(resp2.read().decode('utf-8'))
        if res2.get('ok'):
            print(f"Published Telegra.ph: {res2['result']['url']}")
        else:
            print(f"Error publishing {art['title']}: {res2}")
    time.sleep(1)
