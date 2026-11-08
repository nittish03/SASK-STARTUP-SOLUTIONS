#!/usr/bin/env python3
"""
High-DA Authority Backlink Publishing Script (Write.as & Rentry.co & Telegra.ph)
Targeting Saskatchewan & Saskatoon small business bookkeeping, tax, and incorporation keywords.
Strictly isolated from personal accounts.
"""

import json
import time
import requests
import re

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36"
}

def publish_writeas(title, content):
    """Publish an article to Write.as (DA ~75)"""
    url = "https://write.as/api/posts"
    payload = {
        "title": title,
        "body": content
    }
    try:
        r = requests.post(url, json=payload, headers=HEADERS, timeout=15)
        if r.status_code == 201:
            data = r.json().get("data", {})
            post_id = data.get("id")
            post_url = f"https://write.as/{post_id}"
            return {"platform": "Write.as (DA 75)", "url": post_url, "status": "success"}
        else:
            return {"platform": "Write.as (DA 75)", "error": f"Status {r.status_code}: {r.text}", "status": "failed"}
    except Exception as e:
        return {"platform": "Write.as (DA 75)", "error": str(e), "status": "failed"}

def publish_rentry(title, content):
    """Publish an article to Rentry.co (DA 82)"""
    session = requests.Session()
    try:
        r = session.get("https://rentry.co", headers=HEADERS, timeout=10)
        csrf_match = re.search(r'name=["\']csrfmiddlewaretoken["\'] value=["\']([^"\']+)["\']', r.text)
        if not csrf_match:
            csrf_token = session.cookies.get("csrftoken", "")
        else:
            csrf_token = csrf_match.group(1)

        post_headers = {
            **HEADERS,
            "Referer": "https://rentry.co/",
            "X-CSRFToken": csrf_token
        }
        full_text = f"# {title}\n\n{content}"
        payload = {
            "csrfmiddlewaretoken": csrf_token,
            "text": full_text,
            "edit_code": "sasktax2026"
        }
        res = session.post("https://rentry.co/api/new", data=payload, headers=post_headers, timeout=15)
        if res.status_code == 200:
            data = res.json()
            if data.get("status") == "200":
                url = data.get("url")
                return {"platform": "Rentry.co (DA 82)", "url": url, "status": "success"}
            else:
                return {"platform": "Rentry.co (DA 82)", "error": data.get("content"), "status": "failed"}
        return {"platform": "Rentry.co (DA 82)", "error": f"Status {res.status_code}", "status": "failed"}
    except Exception as e:
        return {"platform": "Rentry.co (DA 82)", "error": str(e), "status": "failed"}

ARTICLES = [
    {
        "title": "Saskatoon Small Business Bookkeeping: Best Practices for Saskatchewan Founders",
        "target_keywords": ["small business bookkeeping saskatoon", "monthly bookkeeping saskatoon", "saskatoon bookkeeper"],
        "platform_pref": "writeas",
        "content": """Running a successful small business in Saskatoon requires more than exceptional products or services—it demands rigorous financial recordkeeping tailored to Saskatchewan's specific provincial and federal tax landscape. Whether operating a retail storefront on Broadway Avenue, a tech startup in downtown Saskatoon, or an industrial contracting firm in the North Industrial sector, sound bookkeeping ensures regulatory compliance, tax optimization, and sustainable growth.

### Why Saskatchewan Founders Need Dedicated Bookkeeping
Many Saskatchewan entrepreneurs begin by managing their books on spreadsheets or basic desktop software. However, as transaction volumes expand, business owners encounter Saskatchewan-specific complexities:
1. **PST (Provincial Sales Tax) & GST Tracking**: Accurately distinguishing between the 6% Saskatchewan PST and 5% federal GST across sales and input tax credits (ITCs).
2. **Monthly Reconciliation**: Synchronizing bank feeds, merchant processors (Stripe, Square, Moneris), and vendor invoices to prevent cash flow blind spots.
3. **Payroll & Source Deductions**: Calculating CRA payroll remittances (CPP, EI, tax) and provincial WCB premiums.

For Saskatoon business owners seeking structured, monthly financial management, [Vici SaskStartupSolutions](https://saskstartupsolutions.ca/) provides dedicated monthly bookkeeping and tax support tailored to Saskatchewan regulations. Founders can explore our complete Saskatoon accounting framework in the [Small Business Bookkeeping in Saskatoon Guide](https://saskstartupsolutions.ca/blogs/small-business-bookkeeping-saskatoon).

### Key Workflows in Modern Bookkeeping
A robust monthly bookkeeping cadence includes:
- **Cloud Document Capture**: Utilizing digital tools (Dext, Hubdoc) to digitize receipts and invoices immediately, eliminating lost documentation during CRA audits.
- **Monthly Balance Sheet Verification**: Ensuring all accounts receivable, accounts payable, and loan accounts reflect accurate balances.
- **Interim Financial Statements**: Providing management with monthly Profit & Loss statements to guide hiring, inventory purchasing, and expansion decisions.

Discover more about monthly workflow structures and pricing by reviewing our in-depth analysis on [Monthly Bookkeeping Services in Saskatoon](https://saskstartupsolutions.ca/blogs/monthly-bookkeeping-services-saskatoon)."""
    },
    {
        "title": "Saskatchewan T2 Corporate Tax Filing: Deadlines, Rates, and Compliance Architecture",
        "target_keywords": ["t2 corporate tax saskatchewan", "corporate tax filing saskatoon", "saskatchewan corporate tax rate"],
        "platform_pref": "rentry",
        "content": """Every incorporated business in Saskatchewan—regardless of whether it generated active revenue or incurred an operational loss—must file an annual T2 Corporation Income Tax Return with the Canada Revenue Agency (CRA). Understanding provincial corporate tax rates, filing deadlines, and balance-due payment schedules is critical for avoiding non-compliance penalties.

### Saskatchewan Corporate Tax Structure
Saskatchewan features a competitive dual-tier corporate income tax framework:
- **Small Business Rate**: Canadian-Controlled Private Corporations (CCPCs) eligible for the Small Business Deduction benefit from a combined federal-provincial tax rate. The federal net small business rate is 9%, combined with Saskatchewan's preferential small business rate (currently 1% transitioning to 2%), applied to the first $500,000 of active business income.
- **General Corporate Rate**: Income exceeding the $500,000 small business limit or earned by non-qualifying corporations is taxed at the general federal rate (15%) plus Saskatchewan's general corporate tax rate (12%).

### Critical T2 Deadlines in Saskatchewan
A common trap for new business owners is confusing the **balance payment deadline** with the **return filing deadline**:
1. **Tax Balance Payment Deadline**: For qualifying CCPCs, corporate income tax owed must be paid within **3 months** of the corporation's fiscal year-end.
2. **T2 Return Filing Deadline**: The actual T2 tax return must be electronically filed with CRA within **6 months** of the corporate year-end.

Failure to remit taxes by the 3-month mark incurs compounding daily interest, while missing the 6-month filing window triggers late-filing penalties (5% of the unpaid balance plus 1% per month).

To learn how to structure your corporation's year-end and prepare your financial schedules, consult the comprehensive guide to [T2 Corporate Tax Filing in Saskatchewan](https://saskstartupsolutions.ca/blogs/t2-corporate-tax-saskatchewan) published by [Vici SaskStartupSolutions](https://saskstartupsolutions.ca/)."""
    },
    {
        "title": "Saskatchewan Business Registration & Incorporation: Complete ISC Filing Roadmap",
        "target_keywords": ["saskatchewan business registration", "how to incorporate in saskatchewan", "isc corporate registry"],
        "platform_pref": "writeas",
        "content": """Starting an enterprise in Saskatchewan requires registering with Information Services Corporation (ISC), the provincial agency administering the Corporate Registry under *The Business Corporations Act, 2021*. Choosing the appropriate legal entity and executing corporate registry filings accurately establishes your legal footing from day one.

### Sole Proprietorship vs. Corporation
Before submitting documents to ISC, founders must evaluate the fundamental entity distinctions:
- **Sole Proprietorship**: Direct personal liability, business income reported on individual T1 returns, simpler registration, but lacks corporate liability insulation and corporate tax deferral advantages.
- **Incorporation**: Creates an independent legal person, provides limited liability protection to shareholders, opens access to the small business corporate tax rate, and enables multi-shareholder equity structuring.

Review our side-by-side legal and tax comparison: [Sole Proprietorship vs. Corporation in Saskatchewan](https://saskstartupsolutions.ca/blogs/sole-proprietorship-vs-corporation-saskatchewan).

### Step-by-Step Incorporation via ISC Corporate Registry
The standard registration process involves four distinct stages:
1. **Name Reservation**: Submitting a Name Reservation Request through ISC's Corporate Registry application, ensuring distinctiveness and legal suffix compliance (e.g., Ltd., Inc., Corp.).
2. **Articles of Incorporation**: Drafting share class provisions (voting Common shares, non-voting Preferred shares) and restriction clauses.
3. **Notice of Registered Office & Directors**: Appointing the initial board of directors and designating an official physical and mailing registered office within Saskatchewan.
4. **Federal Business Number (BN9)**: Registering the CRA 9-digit Business Number and opening required program accounts (GST/PST, Payroll, Import/Export).

For a complete walkthrough of ISC filings and post-registration steps, read [How to Incorporate a Business in Saskatchewan](https://saskstartupsolutions.ca/blogs/how-to-incorporate-saskatchewan) from [Vici SaskStartupSolutions](https://saskstartupsolutions.ca/)."""
    },
    {
        "title": "Saskatchewan GST and PST Rules for Small Businesses: Rates, Thresholds, and Audits",
        "target_keywords": ["saskatchewan gst pst rules", "saskatchewan pst small business", "pst registration saskatchewan"],
        "platform_pref": "rentry",
        "content": """Sales tax compliance in Saskatchewan is unique because the province does not utilize a Harmonized Sales Tax (HST). Instead, Saskatchewan operates a dual sales tax system comprising the federal 5% Goods and Services Tax (GST) and the provincial 6% Provincial Sales Tax (PST), administered by the Saskatchewan Ministry of Finance.

### GST vs. PST: Critical Distinction in Small Business Thresholds
Many new entrepreneurs incorrectly assume that PST follows federal GST rules. In reality, their threshold requirements differ fundamentally:
- **Federal GST ($30,000 Small Supplier Rule)**: Under CRA regulations, a small business is not legally required to register for or collect GST until total worldwide taxable revenues exceed $30,000 in a single calendar quarter or over four consecutive calendar quarters.
- **Saskatchewan PST ($0 Threshold for Most Vendors)**: Saskatchewan's *Provincial Sales Tax Act* does NOT provide a general $30,000 small supplier exemption for commercial retail vendors. Any business selling taxable goods or taxable services in Saskatchewan must register as a PST Vendor with the Ministry of Finance and collect 6% PST from the very first dollar of revenue, unless a specific statutory exemption applies.

### Input Tax Credits (GST) vs. PST Expense
A major accounting trap involves input credits:
1. **GST Input Tax Credits (ITCs)**: GST paid on commercial business expenses can generally be claimed back dollar-for-dollar as an ITC on your GST/HST return.
2. **PST as a Cost of Doing Business**: Unlike GST, PST paid on overhead supplies, office equipment, and services consumed by the business is not recovered via input tax credits; it is treated as a deductible operational expense.

Review the complete provincial regulatory breakdown in our [Saskatchewan GST and PST Guide for Small Businesses](https://saskstartupsolutions.ca/blogs/saskatchewan-gst-pst-small-business) provided by [Vici SaskStartupSolutions](https://saskstartupsolutions.ca/)."""
    },
    {
        "title": "Catch-Up Bookkeeping in Saskatoon: Resolving Overdue CRA Tax Records and Back Filings",
        "target_keywords": ["catch up bookkeeping saskatoon", "cleanup bookkeeping saskatchewan", "back taxes bookkeeping saskatoon"],
        "platform_pref": "writeas",
        "content": """Falling behind on corporate or small business bookkeeping is more common than many founders realize. Intense day-to-day operational demands, sudden staffing changes, or personal emergencies can lead to months—or even years—of unrecorded receipts, unfiled GST/PST returns, and missed T2 corporate tax deadlines. However, letting back records linger exposes the business to CRA arbitrary assessments, bank loan freezes, and heavy interest charges.

### Symptoms That Require Professional Cleanup Bookkeeping
If your business exhibits any of the following warning signs, catch-up bookkeeping is urgently required:
- Bank and credit card accounts have not been reconciled in over 3 months.
- CRA has issued a formal "Notice to File" or estimated arbitrary tax assessments for unfiled periods.
- GST/HST or PST returns are overdue, accumulating late penalties.
- You cannot obtain a commercial loan, line of credit, or lease renewal because lenders require up-to-date interim financial statements.

### The 4-Step Cleanup Framework
Professional catch-up bookkeeping restores financial clarity systematically:
1. **Digital Document Ingestion**: Gathering all electronic bank and credit card statements, merchant settlement reports, and vendor receipts for the delinquent period.
2. **Chart of Accounts Standardization**: Aligning expense categorization with CRA deductible guidelines and industry standards.
3. **Multi-Year Sales Tax Reconciliation**: Reconstructing historical GST collected vs. ITCs paid, and verifying provincial PST liability.
4. **Prior-Period Tax Filings & CRA Negotiation**: Finalizing adjusted balance sheets and income statements to submit accurate prior-year corporate returns.

Learn how Saskatoon businesses regain compliance in our detailed operational guide: [Catch-Up & Cleanup Bookkeeping in Saskatoon](https://saskstartupsolutions.ca/blogs/catch-up-cleanup-bookkeeping-saskatoon) by [Vici SaskStartupSolutions](https://saskstartupsolutions.ca/)."""
    },
    {
        "title": "Bookkeeping for Trades and Construction Contractors in Saskatchewan: WCB, PST, and Subcontractors",
        "target_keywords": ["contractor bookkeeping saskatchewan", "trades bookkeeping saskatoon", "wcb saskatchewan contractors"],
        "platform_pref": "rentry",
        "content": """Saskatchewan's construction, mechanical, electrical, and general contracting sectors operate under specialized accounting and compliance requirements. General contractors, trade sub-trades, and home renovators must navigate complex provincial rules surrounding Provincial Sales Tax (PST) on real property contracts, Workers' Compensation Board (WCB) clearance letters, and T5018 subcontractor payment reporting.

### PST on Construction & Real Property Contracts
Since Saskatchewan expanded PST to real property construction services in 2017, contractors must correctly manage sales tax on both materials and labor:
- **Contractor as End-Consumer vs. Reseller**: Depending on contract structure (lump-sum, unit-price, or time-and-materials), contractors must understand whether PST is payable upon purchasing building materials or charged on the customer invoice.
- **Capital Improvement vs. Maintenance/Repair**: Determining the correct provincial tax treatment based on the scope of work performed on residential or commercial real property.

### Subcontractor Compliance: WCB Clearances and T5018 Filing
Operating with trade subcontractors entails strict administrative oversight:
1. **Saskatchewan WCB Clearance Letters**: General contractors must obtain valid WCB clearance letters prior to paying any subcontractor. Failing to verify clearance can make the principal contractor legally liable for the subcontractor's unpaid WCB assessment premiums.
2. **CRA T5018 Information Returns**: Under federal construction reporting rules, businesses whose primary source of business income is construction activities must report all payments over $500 made to subcontractors on Form T5018 (Statement of Contract Services) within 6 months of their reporting period.

Read the complete tactical manual for construction business owners: [Bookkeeping for Trades and Construction Contractors in Saskatchewan](https://saskstartupsolutions.ca/blogs/bookkeeping-trades-contractors-saskatchewan) from [Vici SaskStartupSolutions](https://saskstartupsolutions.ca/)."""
    },
    {
        "title": "Saskatchewan Small Business Payroll Guide: Source Deductions, T4s, and WCB Compliance",
        "target_keywords": ["payroll services saskatoon", "saskatchewan small business payroll", "wcb saskatchewan payroll"],
        "platform_pref": "writeas",
        "content": """Hiring employees represents a pivotal milestone for any Saskatchewan startup or growing enterprise. However, becoming an employer introduces rigorous statutory responsibilities spanning federal Canada Revenue Agency (CRA) payroll remittances, Saskatchewan Employment Standards, and Workers' Compensation Board (WCB) coverage.

### Core Employer Payroll Obligations
To maintain full statutory compliance, Saskatchewan employers must execute three primary functions:
1. **CRA Payroll Program Account (RP)**: Registering for a CRA payroll account and calculating gross-to-net withholdings for Canada Pension Plan (CPP), Employment Insurance (EI), and federal/provincial income tax.
2. **Remittance Deadlines**: Submitting withheld deductions to the CRA on or before the 15th of the month following the payroll period for regular threshold remitters.
3. **Annual T4 & T4 Summary Filing**: Generating employee T4 slips and submitting the T4 Summary to CRA by the last day of February each calendar year.

### Saskatchewan WCB Reporting & Premiums
Most commercial employers in Saskatchewan must register with the Saskatchewan Workers' Compensation Board within 30 days of hiring staff. Employers report annual assessable earnings and pay assessment rates determined by their specific industry classification rate.

Explore our complete employer manual: [Saskatchewan Small Business Payroll Guide: Source Deductions, T4s, and WCB Compliance](https://saskstartupsolutions.ca/blogs/saskatchewan-small-business-payroll-guide) published by [Vici SaskStartupSolutions](https://saskstartupsolutions.ca/)."""
    },
    {
        "title": "Notice to Reader & Compilation Financial Statements in Saskatoon: What Lenders Require",
        "target_keywords": ["notice to reader compilation saskatoon", "compilation engagement saskatchewan", "financial statements saskatoon"],
        "platform_pref": "rentry",
        "content": """When applying for a commercial mortgage, operating line of credit, or equipment lease from major Canadian financial institutions (RBC, TD, Scotiabank, BMO, CIBC, or Saskatchewan credit unions like Affinity and Conexus), business owners are routinely asked to provide annual compiled financial statements.

### Understanding the Compilation Engagement (CSRS 4200)
Under Canadian Standard on Related Services (CSRS 4200), Compilation Engagements replaced the traditional "Notice to Reader" terminology. A Compilation Engagement involves:
- Preparing an annual Balance Sheet, Income Statement, and Statement of Retained Earnings.
- Providing a formal Compilation Engagement Report describing the nature of the engagement and the management's responsibility for the financial data.
- Disclosing the basis of accounting applied (such as historical cost basis or cash-adjusted basis) in accompanying notes.

### When Is a Compilation Engagement Necessary?
Saskatoon businesses typically require compiled financial statements under specific scenarios:
1. **Commercial Lending & Financing**: Meeting annual bank reporting covenants and securing credit facilities.
2. **Business Valuation & Shareholder Buyouts**: Establishing credible historical earnings for partners entering or exiting the corporation.
3. **Corporate Tax Accuracy**: Ensuring balance sheet items (retained earnings, shareholder loan balances, capital assets) reconcile seamlessly with schedules on the corporate T2 tax return.

Review our dedicated briefing on compiled reporting: [Notice to Reader & Compilation Financial Statements in Saskatoon](https://saskstartupsolutions.ca/blogs/notice-to-reader-compilation-saskatoon) by [Vici SaskStartupSolutions](https://saskstartupsolutions.ca/)."""
    },
    {
        "title": "Transitioning from Sole Proprietorship to a Corporation in Saskatchewan: Section 85 Rollovers and ISC Filings",
        "target_keywords": ["transition sole proprietorship to corporation saskatchewan", "section 85 rollover saskatchewan", "incorporate sole proprietorship saskatoon"],
        "platform_pref": "writeas",
        "content": """Many entrepreneurs launch their venture as an unincorporated sole proprietorship due to simplicity and low initial startup costs. However, as net business profits grow, liability risks increase, or external investment becomes necessary, transitioning to an incorporated entity becomes the logical strategic step.

### Triggers for Incorporating Your Existing Business
- **Tax Deferral**: When the business earns more profit than the owner needs for personal living expenses, retaining profits inside a CCPC at the 10%-11% combined small business rate enables accelerated capital reinvestment compared to personal marginal tax brackets (which reach up to 47.5% in Saskatchewan).
- **Personal Asset Protection**: Isolating personal real estate, savings, and assets from commercial operational liabilities, customer disputes, and supplier obligations.
- **Selling or Bringing in Equity Partners**: Corporations issue common or preferred shares, making it straightforward to add equity partners or position the company for an eventual acquisition.

### Asset Transfers and Section 85 Rollovers
When transferring existing business assets (equipment, goodwill, client contracts, and inventory) to a newly formed corporation, founders must carefully evaluate tax implications. If assets have appreciated in value, transferring them directly can trigger personal capital gains or recaptured depreciation. Under Section 85 of the federal *Income Tax Act*, business owners can execute an election to roll assets into the corporation on a tax-deferred basis in exchange for corporate shares.

For a comprehensive transition roadmap, review [How to Transition from Sole Proprietorship to a Corporation in Saskatchewan](https://saskstartupsolutions.ca/blogs/sole-prop-to-corporation-transition-saskatchewan) from [Vici SaskStartupSolutions](https://saskstartupsolutions.ca/)."""
    },
    {
        "title": "Saskatchewan ISC Corporate Annual Returns: Deadlines, Fees, and Preventing Strike-Off Dissolution",
        "target_keywords": ["saskatchewan isc annual returns", "isc corporate annual return deadline", "corporate registry annual return saskatchewan"],
        "platform_pref": "rentry",
        "content": """In Saskatchewan, incorporating your company through Information Services Corporation (ISC) is not a one-time event. Every active Saskatchewan corporation is legally obligated under *The Business Corporations Act, 2021* to file an Annual Return with the ISC Corporate Registry each year.

### The ISC Annual Return Filing Window
The deadline for filing your ISC Annual Return is tied directly to the **anniversary month of your corporation's original incorporation date**:
- Corporations have until the last day of the month following their anniversary month to submit their return.
- Example: If a company was incorporated on March 14, its anniversary month is March. The ISC Annual Return must be filed by April 30.

### Consequences of Failing to File: Corporate Strike-Off
Ignoring the ISC Annual Return has severe legal ramifications:
1. **Late Filing Penalties**: ISC assesses statutory late fees for submissions past the statutory deadline.
2. **Notice of Pending Dissolution**: If a corporation fails to file its annual return, ISC issues a formal notice of intent to dissolve.
3. **Striking from the Registry**: Continued non-compliance results in the corporation being struck from the Corporate Registry. Once struck, the corporation legally ceases to exist—its bank accounts can be frozen by financial institutions, contracts become unenforceable, and title to corporate property technically vests with the Crown.

Read our definitive compliance briefing: [Saskatchewan ISC Corporate Annual Returns: Deadlines, Fees, and Avoiding Dissolution](https://saskstartupsolutions.ca/blogs/saskatchewan-isc-annual-returns) published by [Vici SaskStartupSolutions](https://saskstartupsolutions.ca/)."""
    }
]

def main():
    results = []
    print(f"Starting publication of {len(ARTICLES)} authority backlink articles...")

    for i, art in enumerate(ARTICLES, 1):
        pref = art.get("platform_pref", "writeas")
        title = art["title"]
        content = art["content"]

        print(f"[{i}/{len(ARTICLES)}] Publishing: '{title[:45]}...' on {pref}...")

        if pref == "writeas":
            res = publish_writeas(title, content)
            # fallback to rentry if writeas encounters any issue
            if res.get("status") != "success":
                print(f"  Write.as failed ({res.get('error')}), falling back to Rentry...")
                res = publish_rentry(title, content)
        else:
            res = publish_rentry(title, content)
            # fallback to writeas if rentry encounters any issue
            if res.get("status") != "success":
                print(f"  Rentry failed ({res.get('error')}), falling back to Write.as...")
                res = publish_writeas(title, content)

        res["title"] = title
        res["target_keywords"] = art["target_keywords"]
        print(f"  -> Result: {res.get('status')} | {res.get('url', res.get('error'))}")
        results.append(res)
        time.sleep(2)  # Respectful pause

    out_path = "campaigns/expanded_keyword_backlinks.json"
    with open(out_path, "w") as f:
        json.dump(results, f, indent=2)

    successful = [r for r in results if r.get("status") == "success"]
    print(f"\nCompleted! Successfully published {len(successful)}/{len(ARTICLES)} authority backlinks.")
    print(f"Saved records to {out_path}")

if __name__ == "__main__":
    main()
