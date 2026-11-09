import json
import xml.etree.ElementTree as ET

# 1. Read current blogPosts.js
with open("frontend/src/data/blogPosts.js", "r", encoding="utf-8") as f:
    code = f.read()

post_25 = {
    "id": "post-25",
    "slug": "saskatchewan-small-business-grants-funding-tax-incentives-guide",
    "title": "Saskatchewan Small Business Grants & Funding: STSI 45% Tax Credit, PrairiesCan & Provincial Incentives Guide",
    "seo_title": "Saskatchewan Small Business Grants & Funding | STSI Guide | Vici",
    "seo_description": "Definitive guide to small business grants and funding in Saskatchewan. Discover the 45% STSI tax credit, SCII Patent Box, PrairiesCan BSP, and SR&ED R&D incentives.",
    "published_at": "2026-11-09T11:00:00Z",
    "updated_at": "2026-11-09T11:00:00Z",
    "author": "Patrick Vachon",
    "featured_image": "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "featured_alt": "Entrepreneurs and financial advisor reviewing Saskatchewan government grant opportunities and tax incentives in Saskatoon",
    "content": """Securing non-dilutive capital is the holy grail for Saskatchewan entrepreneurs, tech innovators, agricultural value-add processors, and scaling commercial enterprises. While traditional commercial term loans from chartered banks or credit unions require personal guarantees and monthly debt service, government grants, refundable tax credits, and investor tax incentives infuse vital working capital into your enterprise without sacrificing equity control or burdening cash flow.

Saskatchewan has cultivated one of North America\u2019s most attractive business tax environments, anchored by a provincial small business corporate tax rate of **just 1% on active income up to $600,000**. Beyond low baseline corporate income tax rates, the Government of Saskatchewan and federal agencies offer specialized funding vehicles designed to incentivize research and development, angel investment, commercial intellectual property (IP), and regional productivity enhancements.

In this definitive funding and tax planning guide, Practice Lead Patrick Vachon and the corporate advisory team at [Vici SaskStartupSolutions](/) break down the entire landscape of small business grants and incentives in Saskatchewan. We examine the **Saskatchewan Technology Startup Incentive (STSI) 45% investor tax credit**, the **Saskatchewan Commercial Innovation Incentive (SCII) Patent Box**, **PrairiesCan Business Scale-Up and Productivity (BSP)** financing, the recently doubled **$2,000,000 SR&ED R&D tax credit expenditure limit**, and the rigorous bookkeeping and general ledger tracking required to secure grant approvals.

---

## 1. Executive Summary: Non-Dilutive Capital in Saskatchewan

Unlike consumer or general business loans, non-dilutive government funding falls into four distinct structural categories:

### Funding Vehicles Compared:

| Funding Structure | Repayment Terms | Primary Government Agency | Key Strategic Advantage |
| :--- | :--- | :--- | :--- |
| **Direct Grants / Subsidies** | Non-repayable (100% grant) | PrairiesCan, SCIC, Agri-Food | Direct cash injection for hiring, market expansion, or equipment |
| **Refundable Tax Credits** | Cash refund from CRA/Finance | Canada Revenue Agency & SK Finance | Paid out in cash even if corporation has $0 taxable income (e.g., SR&ED) |
| **Non-Refundable Investor Credits** | Reduces investor personal/corp tax | Innovation Saskatchewan (STSI) | Attracts local angel and venture capital by slashing investor risk by 45% |
| **Repayable Contributions** | Interest-free, multi-year payback | PrairiesCan (BSP) | Patient, interest-free capital ($500K\u2013$5M) for major capital expansions |

---

## 2. The Saskatchewan Technology Startup Incentive (STSI): 45% Investor Tax Credit

The Saskatchewan Technology Startup Incentive (STSI), administered by **Innovation Saskatchewan**, is widely recognized as one of the most generous angel investor tax credits in Western Canada.

### How the STSI Program Works:
The STSI provides a **non-refundable 45% provincial tax credit** to individual and corporate Saskatchewan investors who inject early-stage equity capital into certified **Eligible Startup Businesses (ESBs)**.

For example, if an accredited Saskatchewan angel investor invests $100,000 into an approved Saskatoon or Regina tech startup, the investor immediately receives a **$45,000 provincial tax credit certificate**. This credit directly offsets their Saskatchewan personal or corporate income tax liability. Any unused credit can be carried forward for up to four consecutive taxation years.

### Startup Eligibility Criteria for ESB Certification:
To qualify as an Eligible Startup Business (ESB) under Innovation Saskatchewan regulations, the enterprise must:
1. Be a Canadian-Controlled Private Corporation (CCPC) registered and in good standing with the [Information Services Corporation (ISC)](/services#registry).
2. Maintain its head office and at least **50% of its full-time workforce in Saskatchewan**.
3. Employ fewer than 50 full-time employees at the time of initial application.
4. Focus primarily on the creation, commercialization, or proprietary deployment of digital technology, software-as-a-service (SaaS), clean tech, or innovative IP.
5. Have raised less than $2,000,000 in prior equity rounds (lifetime cap on STSI-eligible equity is $2,000,000 per ESB).

### Crucial Founder Caution on Equity Share Structure:
Investors can only claim STSI credits on **fully paid, newly issued equity shares** (common or preferred shares). Convertible promissory notes, SAFE instruments (Simple Agreements for Future Equity), and debt instruments do NOT qualify for STSI certificates until they are officially converted into qualifying corporate shares.

---

## 3. The Saskatchewan Commercial Innovation Incentive (SCII - Patent Box)

The Saskatchewan Commercial Innovation Incentive (SCII) is North America\u2019s premier \u201cpatent box\u201d regime. It provides a massive corporate tax rate reduction to companies commercializing new, qualifying intellectual property within Saskatchewan borders.

### The Tax Benefit:
Under the SCII, eligible corporations enjoy a reduced provincial corporate income tax rate of **just 6%** (down from the standard 12% general corporate rate) on all taxable income directly derived from the commercialization of qualifying IP.

### Duration of Relief:
- **Standard Period:** 10 consecutive taxation years.
- **Enhanced Period (15 Years):** If at least 50% of the underlying scientific research or development expenditures were physically incurred inside Saskatchewan, the preferential 6% tax rate is extended to a full **15 consecutive years**.

### Qualifying Intellectual Property:
To qualify for SCII tax certification through Innovation Saskatchewan, the commercialized product or service must be anchored by:
- Patents granted under the Canadian *Patent Act* or international equivalents (USPTO, EPO).
- Plant Breeders\u2019 Rights (critical for agricultural biotech ventures).
- Licensed or copyrighted software source code with documented technological innovation.
- Proprietary trade secrets that meet statutory definitions under the *Saskatchewan Commercial Innovation Incentive Act*.

---

## 4. PrairiesCan: Business Scale-Up and Productivity (BSP) Program

Administered by **Prairies Economic Development Canada (PrairiesCan)**, the Business Scale-Up and Productivity (BSP) program provides interest-free, repayable funding to high-growth small and medium-sized enterprises (SMEs) operating in Saskatchewan, Alberta, and Manitoba.

### Key Financial Parameters:
- **Contribution Amount:** Typically ranges from **$500,000 up to $5,000,000** per project.
- **Matching Requirement:** PrairiesCan funds up to **50% of eligible project costs**; the applicant must secure the remaining 50% through equity, commercial credit, or operating cash flows.
- **Interest-Free Repayment:** Repayments are structured over 5 years (60 equal monthly installments) beginning one full year after project completion, with **0% interest**.

### Targeted Strategic Priorities:
PrairiesCan prioritizes Saskatchewan businesses expanding in high-growth sectors:
1. **Advanced Manufacturing & Value-Added Agriculture:** Grain fractionation, pulse processing, bio-fertilizers, and automated food packaging facilities.
2. **Clean Technology & Resource Innovation:** Lithium extraction, helium purification, uranium processing technologies, and renewable power infrastructure.
3. **Digital Adoption & Market Expansion:** Scaling commercial software platforms and entering international export markets.

---

## 5. Scientific Research & Experimental Development (SR&ED) and SK R&D Tax Credits

For technology developers, engineers, and agricultural innovators, the combined federal and provincial Scientific Research and Experimental Development (SR&ED) program represents the largest single source of government funding in Canada.

### Doubling the CCPC Expenditure Limit to $2,000,000:
In the recent provincial budget, the Government of Saskatchewan made a historic commitment to local innovation by **doubling the annual expenditure cap** for its **10% refundable provincial R&D Tax Credit** from $1,000,000 to **$2,000,000** for Canadian-Controlled Private Corporations (CCPCs).

### Combined Federal-Provincial Tax Refund Power:
When a Saskatchewan small business CCPC conducts qualifying scientific research or technological advancement:
- **Federal SR&ED Credit:** 35% refundable tax credit on eligible salaries, Canadian contractor costs, and materials (up to $3,000,000 annual limit).
- **Saskatchewan R&D Credit:** 10% refundable tax credit on eligible expenditures up to the new **$2,000,000 limit**.
- **Net Cash Impact:** An innovative Saskatchewan company can recover up to **45% of eligible technical payroll in cash refunds directly from the CRA**, even if the business generated zero revenue and paid zero corporate tax.

### Non-CCPC and Overflow Expenditures:
Expenditures incurred by non-CCPCs or expenditures exceeding the $2,000,000 annual ceiling earn a 10% non-refundable provincial credit that can be carried back 3 years or carried forward 20 years to offset future Saskatchewan corporate taxes.

---

## 6. Manufacturing & Processing (M&P) Tax Credits in Saskatchewan

Saskatchewan manufactures and value-added fabricators benefit from two powerful provincial industrial incentives:

### 1. Saskatchewan M&P Profits Tax Reduction
Corporations that earn income from manufacturing or processing goods in Saskatchewan are eligible for a profits tax reduction that lowers the provincial general corporate income tax rate from 12% down to **as low as 10%**, based on the proportion of total corporate wages and capital deployed in manufacturing activities.

### 2. Saskatchewan M&P Investment Tax Credit
Small and medium-sized manufacturers investing in plant equipment, specialized CNC machinery, or automated processing systems can claim a **10% non-refundable investment tax credit** on eligible capital property (CCA Class 53 or Class 43). This credit directly offsets provincial corporate taxes payable and can be carried forward up to 10 years.

---

## 7. Why Grant Applications Get Rejected: Bookkeeping & Audit Prerequisites

Government funding bodies and tax auditors operate under strict compliance mandates. Over 65% of unsuccessful grant applications in Saskatchewan are rejected not because the business idea lacked merit, but because the applicant failed basic financial and accounting compliance audits.

### The 4 Lethal Accounting Flaws That Disqualify Startups:

1. **Commingled Bank Accounts:** Operating business finances through personal chequing accounts or failing to maintain a dedicated corporate commercial bank account.
2. **Missing Compilation Engagement Financial Statements:** Major programs like PrairiesCan BSP and provincial development agencies require formal, notice-to-reader or Compilation Engagement financial statements prepared in accordance with **CPA Canada CSRS 4200 standards**.
3. **Inadequate Project-Based Job Costing:** To claim SR&ED, STSI, or PrairiesCan funding, your general ledger must track expenses by project code. If developer salaries or raw material costs cannot be tied to specific technical milestones, CRA auditors will disallow 100% of the claimed expenditure.
4. **Delinquent Corporate Filings:** If your corporation is in default on [Information Services Corporation (ISC) annual returns](/services#registry), behind on Saskatchewan PST remittances, or has unfiled T2 corporate returns, all provincial and federal grant applications are immediately frozen.

---

## 8. Strategic Action Plan: How to Prepare Your Books for Funding

To maximize your eligibility for Saskatchewan small business grants and investor tax incentives:

1. **Establish Multi-Tier General Ledger Accounts:** Configure QuickBooks or Xero to track grant-funded expenditures in isolated tracking categories, matching CRA T661 (SR&ED) schedule lines.
2. **Enforce Contemporaneous Time Tracking:** Require all technical developers, engineers, and project leads to log daily hours against specific technological uncertainties.
3. **Execute Clean Monthly Reconciliations:** Ensure all bank statements, merchant accounts, and provincial PST returns are reconciled every 30 days.
4. **Schedule Pre-Application Financial Audits:** Consult with a Saskatchewan small business tax advisor to review financial metrics (Current Ratio, Debt-to-Equity, Gross Margin) prior to submitting grant applications.

### Professional Financial Structuring & Grant Preparation in Saskatoon
At [Vici SaskStartupSolutions](/), Practice Lead Patrick Vachon works hands-on with Saskatchewan founders, tech startups, and expanding manufacturers to structure corporate books, manage monthly accounting ledgers, and maintain strict CRA and provincial compliance.

Ready to position your enterprise for non-dilutive government capital and tax credits? [Schedule a free 30-minute discovery consultation](/booking) with Patrick Vachon or [contact our Saskatoon office](/contact) at **539 Avenue I N, Saskatoon, SK S7L 2G9** or call **+1 (306) 960-0091**.
""",
    "faqs": [
        {
            "q": "What is the Saskatchewan Technology Startup Incentive (STSI)?",
            "a": "The STSI is an angel investor tax incentive administered by Innovation Saskatchewan that provides a non-refundable 45% provincial tax credit to individual and corporate investors who purchase newly issued equity shares in certified Eligible Startup Businesses (ESBs) focusing on digital or clean tech."
        },
        {
            "q": "What is the small business corporate income tax rate in Saskatchewan?",
            "a": "In Saskatchewan, the provincial small business corporate tax rate is 1% on active business income up to $600,000. When combined with the federal 9% small business tax rate, Saskatchewan small corporations pay a combined rate of 10% on their first $500,000 of profit, and 11% between $500,000 and $600,000."
        },
        {
            "q": "How does the Saskatchewan SR&ED R&D Tax Credit work?",
            "a": "Saskatchewan offers a 10% refundable provincial R&D Tax Credit for Canadian-Controlled Private Corporations (CCPCs) on eligible scientific research expenditures up to an annual limit of $2,000,000. Combined with the 35% federal refundable SR&ED tax credit, eligible CCPCs can recover up to 45% of qualifying research payroll in cash."
        },
        {
            "q": "What is the Saskatchewan Commercial Innovation Incentive (SCII)?",
            "a": "The SCII (known as the Patent Box) reduces the provincial corporate income tax rate to just 6% for 10 consecutive years (extended to 15 years if at least 50% of R&D was conducted in-province) on commercial revenue derived from qualifying patents, plant breeders' rights, or proprietary trade secrets."
        },
        {
            "q": "What financial records do I need to qualify for PrairiesCan or provincial business grants?",
            "a": "Government grant agencies require up-to-date monthly bookkeeping, project-based general ledger tracking, corporate registration in good standing with ISC, and annual Compilation Engagement financial statements prepared under CPA Canada CSRS 4200 standards."
        }
    ]
}

post_26 = {
    "id": "post-26",
    "slug": "dissolve-corporation-saskatchewan-isc-cra-clearance-guide",
    "title": "How to Dissolve a Corporation in Saskatchewan: ISC Articles of Dissolution & CRA Clearance Certificate (TX19) Guide",
    "seo_title": "How to Dissolve a Corporation in Saskatchewan | ISC & CRA Guide | Vici",
    "seo_description": "Complete legal & tax guide to dissolving a Saskatchewan corporation. Learn how to pass special resolutions, obtain CRA Clearance Form TX19, and file ISC Articles of Dissolution.",
    "published_at": "2026-11-09T11:30:00Z",
    "updated_at": "2026-11-09T11:30:00Z",
    "author": "Patrick Vachon",
    "featured_image": "https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "featured_alt": "Corporate directors reviewing legal dissolution papers and CRA tax clearance documents in Saskatoon",
    "content": """Every business venture experiences a lifecycle. Whether you are retiring, transitioning into a new enterprise, restructuring multiple corporate entities, or winding down operations following the sale of business assets, formally closing your corporation in Saskatchewan requires strict adherence to statutory corporate and tax laws.

Many small business owners mistakenly believe that when a corporation stops trading, they can simply \u201cwalk away\u201d and allow the company to become inactive. **This is a dangerous and costly misconception.** Under *The Business Corporations Act, 2021* (SBCA 2021) and the federal *Income Tax Act*, an abandoned corporation continues to accrue statutory filing obligations, corporate registry penalties, and arbitrary tax assessments. Most critically, corporate directors remain **personally liable** for unremitted GST, provincial sales tax (PST), employee source deductions, and corporate income taxes.

In this comprehensive operational and legal guide, Practice Lead Patrick Vachon and the corporate compliance team at [Vici SaskStartupSolutions](/) provide a complete, step-by-step roadmap to formally dissolving a Saskatchewan corporation. We explain how to pass statutory shareholder dissolution resolutions, settle creditor liabilities, file final corporate tax returns, secure a **CRA Corporate Clearance Certificate (Form TX19)** under Section 159(2), cancel provincial tax and workers\u2019 compensation accounts, and file **Articles of Dissolution (Form 17)** with the [Information Services Corporation (ISC)](/services#registry).

---

## 1. Statutory Dissolution vs. Administrative Strike-Off: The Hidden Danger

When a Saskatchewan corporation stops filing its mandatory annual returns, the Information Services Corporation (ISC) Corporate Registry will eventually initiate an administrative strike-off, removing the company from the active registry.

### Why You Must Never Settle for an Administrative Strike-Off:
1. **Unresolved Director Personal Liability:** Under Section 227.1 of the federal *Income Tax Act*, directors are jointly and severally liable for unpaid GST/HST, employee payroll withholdings (CPP and EI), and associated penalties and interest. An administrative strike-off does NOT terminate director liability.
2. **Frozen Corporate Assets & Land Titles:** If the corporation holds titled real estate, commercial vehicles, intellectual property, or bank balances when it is struck from the registry, legal ownership of those assets escheats to the Crown (Government of Saskatchewan) under *The Escheats Act*. Restoring a struck corporation later to recover stranded assets requires costly legal court applications.
3. **Ongoing CRA Arbitrary Assessments:** The Canada Revenue Agency does not stop expecting corporate T2 returns simply because ISC marked a company as struck. CRA will eventually issue arbitrary \u201cNotional Assessments\u201d based on estimated revenues, freezing personal director bank accounts to satisfy phantom tax debts.
4. **Statutory Requirement to Dissolve:** Formal, voluntary dissolution provides complete legal and financial finality, releasing directors from ongoing corporate governance obligations.

---

## 2. Step 1: Corporate Governance & Shareholder Dissolution Authorizations

Before any tax accounts are closed or registry forms submitted, the corporation must formally authorize its own dissolution in accordance with *The Business Corporations Act, 2021* (Saskatchewan).

### Scenario A: Corporation Has Never Issued Shares or Has Zero Liabilities
If the corporation has never issued any shares, the initial directors named in the Articles of Incorporation can authorize dissolution by unanimous board resolution. If shares were issued but the company has no debts, liabilities, or remaining property, dissolution can be authorized by a special resolution of shareholders.

### Scenario B: Active Operating Corporation (Standard Dissolution)
For active businesses with assets, commercial contracts, or trading history, dissolution is governed by **Section 210 of the SBCA 2021**:
1. **Notice of Shareholder Meeting:** Written notice detailing the proposed liquidation and dissolution must be delivered to all shareholders, regardless of whether their share class carries voting rights.
2. **Special Resolution Approval:** Dissolution must be approved by a **Special Resolution**, requiring a super-majority vote of at least **two-thirds (66.7%) of the votes cast** by shareholders present at the meeting (or by a unanimous written resolution signed by 100% of voting shareholders).
3. **Corporate Minute Book Documentation:** The resolution, directors\u2019 meeting minutes, and certified statement of intent to dissolve must be bound into the corporate minute book.

---

## 3. Step 2: Liquidating Assets & Satisfying Creditor Obligations

Under Saskatchewan corporate law, a corporation cannot be formally dissolved until it has fully discharged all debts and liabilities or made adequate statutory provision for their payment.

### The Order of Liquidation Priority:
1. **Statutory Crown Debts:** Unremitted CRA payroll deductions, GST, PST, and municipal commercial property taxes hold primary claim over all corporate assets.
2. **Secured Creditors:** Commercial bank mortgages, equipment leases, and PPSA (Personal Property Security Act) registered liens.
3. **Unsecured Trade Creditors:** Outstanding accounts payable to suppliers, subcontractors, utilities, and commercial landlords.
4. **Distribution to Shareholders:** Only AFTER every creditor is paid in full may remaining liquid funds and physical property be distributed to shareholders as return of stated capital or taxable/capital dividends.

---

## 4. Step 3: Final Corporate Tax Filings & CRA Clearance Certificate (Form TX19)

The single most critical step in closing a Saskatchewan corporation is obtaining formal tax clearance from the Canada Revenue Agency.

### Filing the Final T2 Corporate Income Tax Return:
The corporation must prepare a final T2 return covering the period from the beginning of its current fiscal year up to the exact date of corporate wind-up:
- Check the box on Page 1 of the T2: **\u201cIs this the corporation\u2019s final return up to dissolution?\u201d**
- Enter the exact effective date of dissolution.
- Submit a complete balance sheet (Schedule 100) showing **zero assets, zero liabilities, and zero equity balances** following final liquidating distributions.

### Submitting CRA Form TX19: Asking for a Clearance Certificate
Under **Subsection 159(2) of the federal *Income Tax Act***, before distributing corporate property to shareholders, the legal representative (director or liquidator) must apply to the CRA for a formal **Certificate of Clearance** using **Form TX19**.

> [!WARNING] The Director Personal Liability Trap (Subsection 159(3))
> If corporate directors distribute money or property to shareholders without first receiving a certified Form TX19 from the CRA, the directors become **personally liable** for any unpaid taxes, interest, or penalties owed by the corporation, up to the total market value of the distributed assets. Never pay out final corporate liquidation dividends until Form TX19 is safely in hand!

### Supporting Documents Required for Form TX19:
- Copy of the certified Shareholder Resolution authorizing dissolution.
- Final T2 Notice of Assessment showing zero balance owing.
- Detailed statement of all property distributions made to each shareholder.
- Copy of the corporate minute book records and legal documentation.

---

## 5. Step 4: Closing Saskatchewan Provincial Compliance Accounts

In addition to federal CRA corporate income tax clearance, a Saskatchewan business must formally close all provincial regulatory accounts:

### 1. Saskatchewan Provincial Sales Tax (PST) Account Closure
- Access your [Saskatchewan eTax Services (SETS)](/services#tax) online account.
- File a final PST return reporting all sales up to the final business day, accounting for PST on any commercial equipment retained or transferred to shareholders.
- Request cancellation of your **Saskatchewan PST Vendor\u2019s Licence**.
- Request a formal Ministry of Finance clearance letter confirming zero provincial tax arrears.

### 2. Workers\u2019 Compensation Board (WCB Saskatchewan)
- Notify WCB Saskatchewan that your business has ceased operations.
- Submit a final **Employer Payroll Statement (EPS)** reporting actual gross payroll paid to employees up to the final date of operations.
- Pay any remaining assessment premiums and receive written confirmation of WCB account closure.

### 3. City of Saskatoon / Municipal Business Licence
- Notify the municipal business licence division that commercial operations have ceased to cancel annual commercial licencing fees and avoid municipal renewal invoicing.

---

## 6. Step 5: Submitting Articles of Dissolution (Form 17) to ISC

Once all corporate debts are settled, assets liquidated, and preliminary clearances initiated, the corporation officially files its dissolution papers with the provincial registrar.

### Preparing Information Services Corporation (ISC) Form 17:
Under *The Business Corporations Act, 2021*, the legal representative submits **Articles of Dissolution (Form 17)** via the ISC Corporate Online registry portal.

### Information Required on Form 17:
1. Exact registered corporate name and 9-digit ISC entity number.
2. Date the special resolution authorizing dissolution was passed by shareholders.
3. Statutory declaration affirming that:
   - The corporation has no debts, liabilities, or ongoing legal obligations.
   - All remaining corporate property has been lawfully distributed to shareholders according to their respective share rights.
   - There are no outstanding legal actions, claims, or lawsuits against the corporation in any Canadian jurisdiction.
4. Statutory filing fee (typically **$50 to $65** paid through ISC online deposit or credit card).

### Issuance of the Certificate of Dissolution:
Upon review and approval by the Director of Corporations, ISC issues a formal **Certificate of Dissolution**. On the date printed on this certificate, the corporation ceases to exist as a separate legal person, providing complete statutory finality.

---

## 7. Mandatory Corporate Record Retention (The 6-Year Rule)

Even though your Saskatchewan corporation is legally dissolved, directors\u2019 recordkeeping duties do NOT end on the dissolution date.

### Statutory Retention Mandate:
Under Subsection 230(4) of the federal *Income Tax Act* and CRA Information Circular IC78-10R5, all books of account, vendor invoices, bank statements, client contracts, and corporate minute books must be retained for at least **six full years** from the end of the last taxation year to which they relate.

Store physical and digital minute books in a secure, accessible repository in the event of future CRA desk audits or third-party indemnification inquiries.

---

## 8. Step-by-Step Corporate Dissolution Checklist

To ensure a seamless, liability-free wind-down in Saskatchewan:

1. [ ] Convene board of directors and draft dissolution resolution.
2. [ ] Pass Special Resolution with two-thirds shareholder approval.
3. [ ] Terminate commercial premises lease and obtain landlord release.
4. [ ] Collect outstanding trade receivables and deposit to corporate account.
5. [ ] Settle 100% of supplier payables and bank credit facilities.
6. [ ] Process final employee payroll, issue ROEs, and file T4/T4A summaries with CRA.
7. [ ] File final SETS return and cancel Saskatchewan PST Vendor\u2019s Licence.
8. [ ] Reconcile final payroll with WCB Saskatchewan and close account.
9. [ ] File final T2 Corporate Income Tax return marked \u201cFinal return up to dissolution\u201d.
10. [ ] Submit Form TX19 to CRA and await Certificate of Clearance.
11. [ ] Distribute remaining net capital to shareholders as dividends.
12. [ ] Close commercial bank accounts.
13. [ ] Submit Form 17 Articles of Dissolution to ISC and receive Certificate of Dissolution.
14. [ ] Archive corporate minute books and financial records for 6-year retention period.

### Professional Corporate Registry & Tax Wind-Down in Saskatoon
At [Vici SaskStartupSolutions](/), Practice Lead Patrick Vachon works closely with Saskatchewan business owners and corporate directors to manage orderly, liability-free corporate dissolutions, catch-up bookkeeping, and final CRA tax reconciliations.

Protect your personal assets and ensure complete legal compliance when closing your business. [Schedule a free 30-minute consultation](/booking) with Patrick Vachon or [contact our Saskatoon office](/contact) at **539 Avenue I N, Saskatoon, SK S7L 2G9** or call **+1 (306) 960-0091**.
""",
    "faqs": [
        {
            "q": "What happens if I just abandon my Saskatchewan corporation without dissolving it?",
            "a": "Abandoning a corporation leads to administrative strike-off by ISC, but leaves directors personally liable for unpaid GST, PST, and payroll source deductions. CRA will continue issuing arbitrary assessments, and corporate property (bank balances, land) may legally escheat to the provincial Crown."
        },
        {
            "q": "What is a CRA Clearance Certificate (Form TX19) and why is it mandatory?",
            "a": "Under Section 159(2) of the Income Tax Act, Form TX19 certifies that a corporation has paid all taxes, penalties, and interest owed to the CRA. If directors distribute corporate funds to shareholders without this certificate, Subsection 159(3) makes directors personally liable for any unpaid corporate tax debts."
        },
        {
            "q": "What shareholder vote is required to dissolve a corporation in Saskatchewan?",
            "a": "Under Section 210 of The Business Corporations Act, 2021 (Saskatchewan), voluntary dissolution of an operating corporation requires approval by a Special Resolution, passed by at least a two-thirds majority (66.7%) of shareholder votes cast at a meeting, or by unanimous written resolution."
        },
        {
            "q": "What government forms must be filed to close a corporation in Saskatchewan?",
            "a": "Dissolving a Saskatchewan corporation requires filing Form 17 (Articles of Dissolution) with ISC Corporate Registry, filing a final T2 Corporate Income Tax Return and Form TX19 with CRA, cancelling your PST Vendor's Licence on SETS, and submitting a final WCB Employer Payroll Statement."
        },
        {
            "q": "How long must I keep business records after dissolving a corporation in Saskatchewan?",
            "a": "Under Subsection 230(4) of the Income Tax Act, directors must retain all financial records, corporate minute books, tax returns, bank statements, and supporting receipts for at least six full years following the dissolution date."
        }
    ]
}

# 2. Append Posts 25 and 26 to frontend/src/data/blogPosts.js
insert_point = code.rfind("export const BLOG_POSTS_BY_SLUG =")
if insert_point == -1:
    raise Exception("Could not find insert point in blogPosts.js")

snippet = f"""
STATIC_BLOG_POSTS.push({json.dumps(post_25, indent=2)});

STATIC_BLOG_POSTS.push({json.dumps(post_26, indent=2)});

"""

new_code = code[:insert_point] + snippet + code[insert_point:]
with open("frontend/src/data/blogPosts.js", "w", encoding="utf-8") as f:
    f.write(new_code)
print("Updated frontend/src/data/blogPosts.js with Posts 25 and 26.")

# 3. Append to frontend/src/data/blogFaqs.js
with open("frontend/src/data/blogFaqs.js", "r", encoding="utf-8") as f:
    faq_code = f.read()

faq_insert_point = faq_code.rfind("};")
if faq_insert_point == -1:
    raise Exception("Could not find insert point in blogFaqs.js")

faq_snippet = f"""  "{post_25['slug']}": {json.dumps(post_25['faqs'], indent=4)},
  "{post_26['slug']}": {json.dumps(post_26['faqs'], indent=4)},
"""

new_faq_code = faq_code[:faq_insert_point] + faq_snippet + faq_code[faq_insert_point:]
with open("frontend/src/data/blogFaqs.js", "w", encoding="utf-8") as f:
    f.write(new_faq_code)
print("Updated frontend/src/data/blogFaqs.js with FAQ keys for Posts 25 and 26.")

# 4. Expand sitemap.xml to include Posts 25 and 26 (canonical and alias routes)
sitemap_path = "frontend/public/sitemap.xml"
tree = ET.parse(sitemap_path)
root = tree.getroot()
ns = {"ns": "http://www.sitemaps.org/schemas/sitemap/0.9"}

new_routes = [
    ("https://saskstartupsolutions.ca/blogs/saskatchewan-small-business-grants-funding-tax-incentives-guide", "0.85"),
    ("https://saskstartupsolutions.ca/blog/saskatchewan-small-business-grants-funding-tax-incentives-guide", "0.70"),
    ("https://saskstartupsolutions.ca/blogs/dissolve-corporation-saskatchewan-isc-cra-clearance-guide", "0.85"),
    ("https://saskstartupsolutions.ca/blog/dissolve-corporation-saskatchewan-isc-cra-clearance-guide", "0.70"),
]

for url_loc, priority in new_routes:
    url_elem = ET.SubElement(root, "url")
    loc_elem = ET.SubElement(url_elem, "loc")
    loc_elem.text = url_loc
    lastmod_elem = ET.SubElement(url_elem, "lastmod")
    lastmod_elem.text = "2026-11-09"
    changefreq_elem = ET.SubElement(url_elem, "changefreq")
    changefreq_elem.text = "weekly" if priority == "0.85" else "monthly"
    priority_elem = ET.SubElement(url_elem, "priority")
    priority_elem.text = priority

ET.indent(tree, space="  ", level=0)
tree.write(sitemap_path, encoding="utf-8", xml_declaration=True)
print(f"Updated {sitemap_path}. New total URLs: {len(root)}")
