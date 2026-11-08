import urllib.request
import urllib.parse
import json
import time

access_token = '380ce3d77312f3a31949a4bbfb04d049dc199f0a97b82f7ce11c903442b4'
author_name = 'Patrick Vachon'
author_url = 'https://saskstartupsolutions.ca/'

articles = [
    {
        'title': 'Saskatchewan PST Audit Preparedness: Sales Tax Compliance for Saskatoon SMBs',
        'content': [
            {'tag': 'p', 'children': [
                'In Saskatchewan, businesses operating across retail, hospitality, tech, and contracting must navigate provincial sales tax (PST) at 6% alongside federal GST at 5%. Unlike provinces with harmonized sales tax (HST), Saskatchewan enforces separate provincial audits through the Ministry of Finance.'
            ]},
            {'tag': 'p', 'children': [
                'At ',
                {'tag': 'a', 'attrs': {'href': 'https://saskstartupsolutions.ca/'}, 'children': ['Vici SaskStartupSolutions']},
                ', we help local operators avoid catastrophic audit re-assessments by structuring clean, auditable financial records from day one.'
            ]},
            {'tag': 'h3', 'children': ['Common PST Pitfalls in Saskatchewan']},
            {'tag': 'ul', 'children': [
                {'tag': 'li', 'children': ['Failing to collect PST on taxable services or digital goods delivered to Saskatchewan residents.']},
                {'tag': 'li', 'children': ['Improperly claiming PST exemptions without holding valid exemption certificates on file.']},
                {'tag': 'li', 'children': ['Mischaracterizing production equipment vs non-exempt operational supplies.']}
            ]},
            {'tag': 'p', 'children': [
                'Maintaining accurate ',
                {'tag': 'a', 'attrs': {'href': 'https://saskstartupsolutions.ca/blog/small-business-bookkeeping-saskatoon'}, 'children': ['small business bookkeeping in Saskatoon']},
                ' ensures that every sales invoice, expense receipt, and provincial tax remittance matches your monthly general ledger.'
            ]},
            {'tag': 'h3', 'children': ['Aligning Sales Tax with Annual Corporate Returns']},
            {'tag': 'p', 'children': [
                'Discrepancies between reported revenue on your PST returns and reported gross income on your ',
                {'tag': 'a', 'attrs': {'href': 'https://saskstartupsolutions.ca/blog/t2-corporate-tax-filing-saskatchewan'}, 'children': ['T2 corporate tax filing in Saskatchewan']},
                ' are the primary trigger for provincial compliance reviews.'
            ]},
            {'tag': 'p', 'children': [
                'Protect your bottom line today: explore our full-service ',
                {'tag': 'a', 'attrs': {'href': 'https://saskstartupsolutions.ca/services'}, 'children': ['Saskatoon bookkeeping and startup solutions']},
                ' or ',
                {'tag': 'a', 'attrs': {'href': 'https://saskstartupsolutions.ca/booking'}, 'children': ['schedule a consultation with Patrick Vachon']},
                ' to review your tax accounting setup.'
            ]},
            {'tag': 'hr'},
            {'tag': 'p', 'children': ['Vici SaskStartupSolutions | 539 Avenue I N, Saskatoon, SK S7L 2G9 | Tel: 1 (306) 960-0091 | https://saskstartupsolutions.ca/']}
        ]
    },
    {
        'title': 'Saskatoon Construction & Trades Bookkeeping: Job Costing and Cash Flow Mastery',
        'content': [
            {'tag': 'p', 'children': [
                'Saskatoon trades contractors, electricians, plumbers, and general builders face distinct cash-flow hurdles: holdbacks, progressive billings, fluctuating raw material costs, and subcontractor WCB compliance.'
            ]},
            {'tag': 'p', 'children': [
                'Without rigorous job-costing, contractors frequently win bids that lose money on execution. Partnering with ',
                {'tag': 'a', 'attrs': {'href': 'https://saskstartupsolutions.ca/'}, 'children': ['Vici SaskStartupSolutions']},
                ' provides real-time financial transparency for trades businesses.'
            ]},
            {'tag': 'h3', 'children': ['Best Practices for Construction Bookkeeping']},
            {'tag': 'ul', 'children': [
                {'tag': 'li', 'children': ['Segregate project direct costs from general administrative overhead.']},
                {'tag': 'li', 'children': ['Track provincial PST paid on construction materials vs collected on taxable repair labor.']},
                {'tag': 'li', 'children': ['Reconcile sub-trade invoices against subcontractor clearance certificates.']}
            ]},
            {'tag': 'p', 'children': [
                'Professional ',
                {'tag': 'a', 'attrs': {'href': 'https://saskstartupsolutions.ca/services'}, 'children': ['Saskatoon bookkeeping services']},
                ' keep trades business books audit-ready year-round.'
            ]},
            {'tag': 'p', 'children': [
                'Ensure your trade business is also compliant with provincial corporate regulations through regular ',
                {'tag': 'a', 'attrs': {'href': 'https://saskstartupsolutions.ca/blog/saskatchewan-business-registration-isc-annual-returns'}, 'children': ['Saskatchewan ISC corporate annual return filings']},
                '.'
            ]},
            {'tag': 'p', 'children': [
                'Ready to get your contractor books organized? ',
                {'tag': 'a', 'attrs': {'href': 'https://saskstartupsolutions.ca/booking'}, 'children': ['Book a free diagnostic meeting with Patrick Vachon']},
                ' today.'
            ]},
            {'tag': 'hr'},
            {'tag': 'p', 'children': ['Vici SaskStartupSolutions | 539 Avenue I N, Saskatoon, SK S7L 2G9 | Phone: 1 (306) 960-0091']}
        ]
    },
    {
        'title': 'Saskatchewan Agri-Tech and Farming Bookkeeping: Agri-Stability & Capital Asset Accounting',
        'content': [
            {'tag': 'p', 'children': [
                'Saskatchewan remains the agricultural heartland of Canada. As ag-tech startups, machinery suppliers, and modern farming corporations expand across the Saskatoon region, accounting complexity increases exponentially.'
            ]},
            {'tag': 'p', 'children': [
                'From navigating AgriStability program data to managing Capital Cost Allowance (CCA) schedules on expensive farm machinery, specialized administrative acumen is required.'
            ]},
            {'tag': 'h3', 'children': ['Critical Agri-Business Financial Tracking']},
            {'tag': 'p', 'children': [
                'Farming and agri-business corporations must accurately categorize operational seed, fertilizer, and fuel costs while distinguishing depreciable assets. Solid ',
                {'tag': 'a', 'attrs': {'href': 'https://saskstartupsolutions.ca/blog/small-business-bookkeeping-saskatoon'}, 'children': ['small business bookkeeping in Saskatoon']},
                ' prevents year-end tax surprises.'
            ]},
            {'tag': 'p', 'children': [
                'Furthermore, accurate depreciation calculations on machinery directly feed into Schedule 8 of your ',
                {'tag': 'a', 'attrs': {'href': 'https://saskstartupsolutions.ca/blog/t2-corporate-tax-filing-saskatchewan'}, 'children': ['T2 corporate tax filing in Saskatchewan']},
                ', minimizing net corporate taxes payable.'
            ]},
            {'tag': 'p', 'children': [
                'Discover how ',
                {'tag': 'a', 'attrs': {'href': 'https://saskstartupsolutions.ca/'}, 'children': ['Vici SaskStartupSolutions']},
                ' supports local agricultural ventures with turnkey ',
                {'tag': 'a', 'attrs': {'href': 'https://saskstartupsolutions.ca/services'}, 'children': ['Saskatoon bookkeeping and startup solutions']},
                '.'
            ]},
            {'tag': 'p', 'children': [
                'Take the hassle out of farm and ag-tech paperwork: ',
                {'tag': 'a', 'attrs': {'href': 'https://saskstartupsolutions.ca/booking'}, 'children': ['Schedule an introductory appointment with Patrick Vachon']},
                '.'
            ]},
            {'tag': 'hr'},
            {'tag': 'p', 'children': ['Vici SaskStartupSolutions | 539 Avenue I N, Saskatoon, SK S7L 2G9 | Tel: 1 (306) 960-0091']}
        ]
    },
    {
        'title': 'Incorporation in Saskatchewan: Sole Proprietorship vs Business Corporation (CCPC)',
        'content': [
            {'tag': 'p', 'children': [
                'One of the first questions emerging entrepreneurs in Saskatoon ask is whether to register a sole proprietorship or incorporate a Saskatchewan business corporation. Each entity model carries distinct legal, tax, and administrative implications.'
            ]},
            {'tag': 'h3', 'children': ['Key Differences Every Founder Should Know']},
            {'tag': 'ul', 'children': [
                {'tag': 'li', 'children': [{'tag': 'strong', 'children': ['Tax Rates:']}, ' Sole proprietors pay personal income tax rates (up to 47.5% in SK), whereas Canadian-Controlled Private Corporations (CCPCs) benefit from the small business tax rate of 9% federally and preferential provincial rates.']},
                {'tag': 'li', 'children': [{'tag': 'strong', 'children': ['Limited Liability:']}, ' A corporation is a distinct legal entity, safeguarding personal assets from business liabilities.']},
                {'tag': 'li', 'children': [{'tag': 'strong', 'children': ['Administrative Compliance:']}, ' Corporations require annual corporate tax filings and registry maintenance.']}
            ]},
            {'tag': 'p', 'children': [
                'Learn step-by-step how to manage corporate incorporation and statutory compliance in our guide: ',
                {'tag': 'a', 'attrs': {'href': 'https://saskstartupsolutions.ca/blog/saskatchewan-business-registration-isc-annual-returns'}, 'children': ['Saskatchewan business registration and ISC annual returns']},
                '.'
            ]},
            {'tag': 'p', 'children': [
                'Once incorporated, establishing reliable ',
                {'tag': 'a', 'attrs': {'href': 'https://saskstartupsolutions.ca/services'}, 'children': ['bookkeeping services in Saskatoon']},
                ' and planning for annual ',
                {'tag': 'a', 'attrs': {'href': 'https://saskstartupsolutions.ca/blog/t2-corporate-tax-filing-saskatchewan'}, 'children': ['T2 corporate tax filing in Saskatchewan']},
                ' is paramount.'
            ]},
            {'tag': 'p', 'children': [
                'Let ',
                {'tag': 'a', 'attrs': {'href': 'https://saskstartupsolutions.ca/'}, 'children': ['Vici SaskStartupSolutions']},
                ' manage your transition to incorporation: ',
                {'tag': 'a', 'attrs': {'href': 'https://saskstartupsolutions.ca/booking'}, 'children': ['Book a diagnostic consultation with Patrick Vachon']},
                '.'
            ]},
            {'tag': 'hr'},
            {'tag': 'p', 'children': ['Vici SaskStartupSolutions | 539 Avenue I N, Saskatoon, SK S7L 2G9 | Tel: 1 (306) 960-0091']}
        ]
    },
    {
        'title': 'CRA GST/HST Remittance in Saskatchewan: Filing Frequencies, Penalties, and ITC Optimization',
        'content': [
            {'tag': 'p', 'children': [
                'Any Saskatchewan business with worldwide taxable sales exceeding $30,000 across four consecutive calendar quarters must register for a CRA GST/HST account. For incorporated businesses, mastering the GST remittance cycle is critical to preserving operating capital.'
            ]},
            {'tag': 'h3', 'children': ['Filing Frequency Options']},
            {'tag': 'p', 'children': [
                'Depending on annual taxable revenue, your CRA assigned filing frequency will be annual (under $1.5M revenue), quarterly ($1.5M to $6M), or monthly (over $6M). Even annual filers may be required to make quarterly instalment payments.'
            ]},
            {'tag': 'p', 'children': [
                'Maximizing Input Tax Credits (ITCs) requires meticulous documentation. Maintaining organized ',
                {'tag': 'a', 'attrs': {'href': 'https://saskstartupsolutions.ca/blog/small-business-bookkeeping-saskatoon'}, 'children': ['small business bookkeeping in Saskatoon']},
                ' guarantees every eligible tax credit is recovered on your GST34 return.'
            ]},
            {'tag': 'p', 'children': [
                'GST reporting must reconcile directly with your annual ',
                {'tag': 'a', 'attrs': {'href': 'https://saskstartupsolutions.ca/blog/t2-corporate-tax-filing-saskatchewan'}, 'children': ['T2 corporate tax filing in Saskatchewan']},
                ' to prevent automated CRA audit flags.'
            ]},
            {'tag': 'p', 'children': [
                'Discover how ',
                {'tag': 'a', 'attrs': {'href': 'https://saskstartupsolutions.ca/'}, 'children': ['Vici SaskStartupSolutions']},
                ' handles your end-to-end sales tax and monthly ledgers with our specialized ',
                {'tag': 'a', 'attrs': {'href': 'https://saskstartupsolutions.ca/services'}, 'children': ['Saskatoon bookkeeping and startup solutions']},
                '.'
            ]},
            {'tag': 'p', 'children': [
                'Avoid CRA penalties: ',
                {'tag': 'a', 'attrs': {'href': 'https://saskstartupsolutions.ca/booking'}, 'children': ['Schedule a free sales tax consultation with Patrick Vachon']},
                '.'
            ]},
            {'tag': 'hr'},
            {'tag': 'p', 'children': ['Vici SaskStartupSolutions | 539 Avenue I N, Saskatoon, SK S7L 2G9 | Tel: 1 (306) 960-0091']}
        ]
    },
    {
        'title': 'Director Liabilities & Corporate Registry Obligations Under The Saskatchewan Business Corporations Act',
        'content': [
            {'tag': 'p', 'children': [
                'Incorporating a business in Saskatchewan provides strong liability shielding, but directors remain personally liable for specific statutory corporate obligations under provincial and federal law—notably unpaid employee wages, unremitted payroll source deductions, unremitted GST/PST, and environmental damages.'
            ]},
            {'tag': 'h3', 'children': ['Maintaining Active Standing with ISC']},
            {'tag': 'p', 'children': [
                'Corporate protection collapses if the corporation is dissolved or struck off by Information Services Corporation (ISC). Learn how to safeguard your corporate status in our guide: ',
                {'tag': 'a', 'attrs': {'href': 'https://saskstartupsolutions.ca/blog/saskatchewan-business-registration-isc-annual-returns'}, 'children': ['Saskatchewan business registration and ISC annual returns']},
                '.'
            ]},
            {'tag': 'p', 'children': [
                'Coupled with annual ',
                {'tag': 'a', 'attrs': {'href': 'https://saskstartupsolutions.ca/blog/t2-corporate-tax-filing-saskatchewan'}, 'children': ['T2 corporate tax filing in Saskatchewan']},
                ', proactive compliance protects corporate officers from personal exposure.'
            ]},
            {'tag': 'p', 'children': [
                'At ',
                {'tag': 'a', 'attrs': {'href': 'https://saskstartupsolutions.ca/'}, 'children': ['Vici SaskStartupSolutions']},
                ', we deliver total peace of mind for business owners through integrated ',
                {'tag': 'a', 'attrs': {'href': 'https://saskstartupsolutions.ca/services'}, 'children': ['Saskatoon bookkeeping services']},
                ' and corporate compliance management.'
            ]},
            {'tag': 'p', 'children': [
                'Speak with our principal administrator today: ',
                {'tag': 'a', 'attrs': {'href': 'https://saskstartupsolutions.ca/booking'}, 'children': ['Book a meeting with Patrick Vachon']},
                '.'
            ]},
            {'tag': 'hr'},
            {'tag': 'p', 'children': ['Vici SaskStartupSolutions | 539 Avenue I N, Saskatoon, SK S7L 2G9 | Phone: 1 (306) 960-0091']}
        ]
    }
]

results = []
for art in articles:
    payload = {
        'access_token': access_token,
        'title': art['title'],
        'author_name': author_name,
        'author_url': author_url,
        'content': json.dumps(art['content'])
    }
    encoded = urllib.parse.urlencode(payload).encode('utf-8')
    req = urllib.request.Request('https://api.telegra.ph/createPage', data=encoded, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            if data.get('ok'):
                url = data['result']['url']
                results.append({'title': art['title'], 'url': url, 'status': 'LIVE 200 OK'})
                print(f"Published: {art['title']} -> {url}")
            else:
                print(f"Error publishing {art['title']}: {data}")
    except Exception as e:
        print(f"Exception on {art['title']}: {e}")
    time.sleep(1)

with open('/tmp/telegraph_batch_results.json', 'w') as f:
    json.dump(results, f, indent=2)

print(f"Batch completed! Total published: {len(results)}")
