import json
import time
import urllib.parse
import urllib.request
from datetime import datetime, timezone

AUTHOR_NAME = "Patrick Vachon (Vici SaskStartupSolutions)"
AUTHOR_URL = "https://saskstartupsolutions.ca/"

ARTICLES = [
    {
        "topic": "Ownr Alternatives & Provincial Incorporation in Saskatchewan (2026)",
        "dest_urls": [
            "https://saskstartupsolutions.ca/incorporate-saskatoon",
            "https://saskstartupsolutions.ca/blogs/ownr-saskatchewan-alternative-how-to-incorporate",
            "https://saskstartupsolutions.ca/",
        ],
        "markdown": """Many entrepreneurs looking to incorporate a business in Saskatoon initially test national incorporation portals such as Ownr, only to learn that Ownr focuses on federal CBCA corporations and select provinces (Ontario, BC, Alberta) rather than provincial Saskatchewan incorporations under *The Business Corporations Act, 2021* (SBCA 2021).

### Key Differences for Saskatchewan Founders (2026)
- **Provincial ISC Statutory Fees:** Incorporating a Saskatchewan provincial corporation directly via Information Services Corporation (ISC) carries statutory fees of **$255 CAD** for a numbered corporation or **$305 CAD** ($50 name reservation + $255 Articles of Incorporation) for a named corporation.
- **No Canadian Residency Requirement:** Under SBCA 2021, Saskatchewan does not impose a 25% Canadian-resident director rule on provincial corporations, making provincial setup far more accessible than federal incorporation for international founders and newcomers.
- **Single-Tier Annual Registry Compliance:** Rather than maintaining two annual filings (Corporations Canada plus Saskatchewan extra-provincial registration), a provincial corporation files one annual return per year with ISC ($60 statutory fee when filed on time).

Explore the complete comparison and statutory documents checklist (Form 1, Form 2, Form 3, and the SBCA 2021 Beneficial Ownership Register) on [Vici SaskStartupSolutions Incorporation Services Saskatoon](https://saskstartupsolutions.ca/incorporate-saskatoon) and our 2026 walkthrough on [Ownr Alternatives in Saskatchewan](https://saskstartupsolutions.ca/blogs/ownr-saskatchewan-alternative-how-to-incorporate).

*Practice Office:* [Vici SaskStartupSolutions](https://saskstartupsolutions.ca/) — 539 Avenue I N, Saskatoon, SK S7L 2G9 | Tel: +1 (306) 960-0091""",
        "telegraph_nodes": [
            {"tag": "p", "children": [
                "Entrepreneurs planning to incorporate in Saskatoon frequently research national platforms like Ownr before discovering that Ownr does not file provincial Saskatchewan incorporations under ",
                {"tag": "em", "children": ["The Business Corporations Act, 2021"]},
                " (SBCA 2021). Incorporating federally in Saskatchewan still requires extra-provincial ISC registration and dual annual filings."
            ]},
            {"tag": "h3", "children": ["2026 Saskatchewan Provincial Incorporation Costs & Advantages"]},
            {"tag": "ul", "children": [
                {"tag": "li", "children": ["Numbered Saskatchewan Corporation: $255 CAD statutory ISC fee (Articles Form 1)."]},
                {"tag": "li", "children": ["Named Saskatchewan Corporation: $305 CAD ($50 name reservation + $255 Form 1)."]},
                {"tag": "li", "children": ["Zero Canadian Director Residency Barrier under SBCA 2021."]},
                {"tag": "li", "children": ["Single annual corporate return with ISC ($60 statutory fee on time), separate from CRA T2 corporate income tax."]}
            ]},
            {"tag": "p", "children": [
                "Review complete Form 1-3 preparation steps at ",
                {"tag": "a", "attrs": {"href": "https://saskstartupsolutions.ca/incorporate-saskatoon"}, "children": ["Incorporate a Business in Saskatoon"]},
                " or read the full breakdown: ",
                {"tag": "a", "attrs": {"href": "https://saskstartupsolutions.ca/blogs/ownr-saskatchewan-alternative-how-to-incorporate"}, "children": ["Ownr Alternatives in Saskatchewan (2026)"]},
                ". Visit ",
                {"tag": "a", "attrs": {"href": "https://saskstartupsolutions.ca/"}, "children": ["Vici SaskStartupSolutions"]},
                " (539 Avenue I N, Saskatoon, SK S7L 2G9)."
            ]}
        ]
    },
    {
        "topic": "2026 Saskatchewan Payroll Ceilings (CPP2, EI) & CRA Mileage Guide",
        "dest_urls": [
            "https://saskstartupsolutions.ca/bookkeeping-saskatoon",
            "https://saskstartupsolutions.ca/blogs/saskatchewan-2026-payroll-cpp2-ei-mileage-rates-guide",
            "https://saskstartupsolutions.ca/bookkeeping-cleanup-saskatoon",
        ],
        "markdown": """Keeping payroll ledgers current for 2026 federal ceilings prevents source-deduction under-remittances on CRA `RP0001` accounts and T4 balancing errors every February.

### Verified 2026 CRA Payroll & Vehicle Benchmarks for Saskatchewan Employers
1. **Base CPP (5.95%):** 2026 Year's Maximum Pensionable Earnings (YMPE) is **$74,600** (max **$4,230.45** employee and **$4,230.45** employer match above the $3,500 exemption).
2. **Second Additional CPP (CPP2 — 4.0%):** Applies between $74,600 and the 2026 YAMPE of **$85,000** (maximum **$416.00** each for employee and employer, reported in T4 Box 16A).
3. **Employment Insurance (EI — 1.63%):** 2026 Maximum Insurable Earnings (MIE) is **$68,900** (max **$1,123.07** employee deduction; 1.4x employer match **$1,572.30**).
4. **2026 CRA Reasonable Mileage Allowance:** **$0.73/km** for the first 5,000 business kilometers driven and **$0.67/km** thereafter.

See how local cloud workflows track GST (5%), non-refundable Saskatchewan PST (6% via SETS), and 2026 payroll on [Small Business Bookkeeping Services Saskatoon](https://saskstartupsolutions.ca/bookkeeping-saskatoon) and [2026 Saskatchewan Payroll & Mileage Rates Guide](https://saskstartupsolutions.ca/blogs/saskatchewan-2026-payroll-cpp2-ei-mileage-rates-guide). Behind on prior periods? Explore [Bookkeeping Cleanup Saskatoon](https://saskstartupsolutions.ca/bookkeeping-cleanup-saskatoon).""",
        "telegraph_nodes": [
            {"tag": "p", "children": [
                "Small business employers and incorporated owner-operators in Saskatoon must configure updated 2026 Canada Revenue Agency (CRA) payroll ceilings in QuickBooks Online and Xero to avoid RP0001 remittance shortfalls."
            ]},
            {"tag": "h3", "children": ["2026 Verified Statutory Thresholds"]},
            {"tag": "ul", "children": [
                {"tag": "li", "children": ["Base CPP: $74,600 YMPE (5.95%, max $4,230.45 employee & employer each)."]},
                {"tag": "li", "children": ["CPP2 Tier 2: $85,000 YAMPE ($74,600 to $85,000 at 4.0%, max $416.00 each)."]},
                {"tag": "li", "children": ["EI Premiums: $68,900 MIE (1.63% employee max $1,123.07 / 1.4x employer max $1,572.30)."]},
                {"tag": "li", "children": ["CRA Tax-Exempt Mileage: $0.73/km first 5,000 km and $0.67/km thereafter."]}
            ]},
            {"tag": "p", "children": [
                "Learn more at ",
                {"tag": "a", "attrs": {"href": "https://saskstartupsolutions.ca/bookkeeping-saskatoon"}, "children": ["Bookkeeping Services Saskatoon"]},
                ", ",
                {"tag": "a", "attrs": {"href": "https://saskstartupsolutions.ca/blogs/saskatchewan-2026-payroll-cpp2-ei-mileage-rates-guide"}, "children": ["2026 Saskatchewan Payroll & Mileage Guide"]},
                ", and ",
                {"tag": "a", "attrs": {"href": "https://saskstartupsolutions.ca/bookkeeping-cleanup-saskatoon"}, "children": ["Bookkeeping Cleanup Saskatoon"]},
                "."
            ]}
        ]
    },
    {
        "topic": "SBCA 2021 Beneficial Ownership (ISC Register) & Annual Returns in Saskatchewan",
        "dest_urls": [
            "https://saskstartupsolutions.ca/isc-annual-returns-saskatoon",
            "https://saskstartupsolutions.ca/blogs/beneficial-ownership-isc-register-saskatchewan-sbca-2021",
        ],
        "markdown": """Under Saskatchewan's *The Business Corporations Act, 2021* (SBCA 2021), maintaining active corporate standing requires more than filing federal CRA T2 corporate income tax returns.

### Three Pillars of Ongoing Saskatchewan Corporate Standing
1. **ISC Annual Return ($60 Statutory Fee On Time):** Filed annually with Information Services Corporation (ISC) before the corporation's anniversary strike deadline to confirm directors and registered office addresses.
2. **SBCA 2021 Beneficial Ownership / ISC Register:** Private Saskatchewan corporations must maintain a current Register of Individuals with Significant Control identifying anyone owning or controlling **25% or more** of voting shares or fair market equity value (essential for FINTRAC bank Know-Your-Customer onboarding as well).
3. **15-Day Director & Address Filings (Forms 2 & 3):** Prompt updates whenever corporate directors, officers, or civic registered offices change.

Review the full compliance checklist at [ISC Annual Returns & Corporate Registry Administration](https://saskstartupsolutions.ca/isc-annual-returns-saskatoon) and read [Beneficial Ownership & ISC Register Compliance under SBCA 2021](https://saskstartupsolutions.ca/blogs/beneficial-ownership-isc-register-saskatchewan-sbca-2021).""",
        "telegraph_nodes": [
            {"tag": "p", "children": [
                "Filing a federal T2 corporate tax return with the CRA does not satisfy provincial corporate registry maintenance with Information Services Corporation (ISC) in Saskatchewan."
            ]},
            {"tag": "h3", "children": ["Beneficial Ownership (25% Rule) & Annual Registry Standing"]},
            {"tag": "p", "children": [
                "Under ",
                {"tag": "em", "children": ["The Business Corporations Act, 2021"]},
                ", Saskatchewan corporations must maintain a Register of Individuals with Significant Control (ISC Register) recording every individual holding 25% or more voting rights or equity value, alongside filing yearly ISC Corporate Annual Returns ($60 statutory fee when filed on time)."
            ]},
            {"tag": "p", "children": [
                "Explore practical registry support at ",
                {"tag": "a", "attrs": {"href": "https://saskstartupsolutions.ca/isc-annual-returns-saskatoon"}, "children": ["ISC Annual Returns Saskatoon"]},
                " and ",
                {"tag": "a", "attrs": {"href": "https://saskstartupsolutions.ca/blogs/beneficial-ownership-isc-register-saskatchewan-sbca-2021"}, "children": ["SBCA 2021 Beneficial Ownership & ISC Register Guide"]},
                "."
            ]}
        ]
    },
    {
        "topic": "Saskatchewan Business Registration ($115), Saskatoon Licence ($135) & Multilingual Setup",
        "dest_urls": [
            "https://saskstartupsolutions.ca/business-registration-saskatchewan",
            "https://saskstartupsolutions.ca/multilingual-newcomer-business-saskatoon",
            "https://saskstartupsolutions.ca/blogs/saskatoon-business-licence-home-based-commercial-guide",
        ],
        "markdown": """First-time founders and newcomers launching in Saskatoon often encounter four connected registration layers before sending their first invoice:

- **ISC Trade Name Registration ($115 Total):** $50 name reservation + $65 sole proprietorship or partnership registration (renewed every 3 years for $60).
- **City of Saskatoon Business Licence ($135 New / $95 Renewal):** Required for both commercial bays and home-based businesses inside city limits.
- **Federal GST ($30,000 Rule) vs. Saskatchewan PST (6%, Zero Threshold):** Saskatchewan eTax Services (SETS) requires PST registration from the first taxable sale if selling PST-taxable goods or services.
- **Multilingual Founder Support:** Guided administrative onboarding in **English, French, Russian, and Armenian**.

Explore step-by-step checklists at [Saskatchewan Business Registration](https://saskstartupsolutions.ca/business-registration-saskatchewan), [Multilingual Newcomer Business Setup Saskatoon](https://saskstartupsolutions.ca/multilingual-newcomer-business-saskatoon), and [City of Saskatoon Business Licence Guide (2026)](https://saskstartupsolutions.ca/blogs/saskatoon-business-licence-home-based-commercial-guide).""",
        "telegraph_nodes": [
            {"tag": "p", "children": [
                "Starting a small business in Saskatoon involves coordinating provincial ISC registration ($115 for sole proprietorships/partnerships), municipal City of Saskatoon Business Licences ($135 initial / $95 annual renewal), federal CRA Business Numbers, and 6% Saskatchewan PST via SETS."
            ]},
            {"tag": "h3", "children": ["Multilingual Support for Saskatoon Newcomers"]},
            {"tag": "p", "children": [
                "University of Saskatchewan alumnus Patrick Vachon and the team at Vici SaskStartupSolutions provide business setup administration and bookkeeping support in English, French, Russian, and Armenian."
            ]},
            {"tag": "p", "children": [
                "Full details: ",
                {"tag": "a", "attrs": {"href": "https://saskstartupsolutions.ca/business-registration-saskatchewan"}, "children": ["Saskatchewan Business Registration"]},
                " | ",
                {"tag": "a", "attrs": {"href": "https://saskstartupsolutions.ca/multilingual-newcomer-business-saskatoon"}, "children": ["Newcomer Business Setup Saskatoon"]},
                " | ",
                {"tag": "a", "attrs": {"href": "https://saskstartupsolutions.ca/blogs/saskatoon-business-licence-home-based-commercial-guide"}, "children": ["City of Saskatoon Business Licence Guide (2026)"]},
                "."
            ]}
        ]
    }
]


def http_json(url, payload):
    data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(
        url,
        data=data,
        headers={"Content-Type": "application/json", "User-Agent": "Mozilla/5.0"},
    )
    with urllib.request.urlopen(req, timeout=20) as resp:
        return json.loads(resp.read().decode("utf-8"))


def create_telegraph_token():
    params = urllib.parse.urlencode({
        "short_name": "ViciSask",
        "author_name": AUTHOR_NAME,
        "author_url": AUTHOR_URL,
    }).encode("utf-8")
    req = urllib.request.Request("https://api.telegra.ph/createAccount", data=params)
    with urllib.request.urlopen(req, timeout=20) as resp:
        res = json.loads(resp.read().decode("utf-8"))
        if res.get("ok"):
            return res["result"]["access_token"]
        raise RuntimeError(f"Telegraph createAccount failed: {res}")


def publish_telegraph(token, title, nodes):
    params = urllib.parse.urlencode({
        "access_token": token,
        "title": title,
        "author_name": AUTHOR_NAME,
        "author_url": AUTHOR_URL,
        "content": json.dumps(nodes),
        "return_content": "false",
    }).encode("utf-8")
    req = urllib.request.Request("https://api.telegra.ph/createPage", data=params)
    with urllib.request.urlopen(req, timeout=20) as resp:
        res = json.loads(resp.read().decode("utf-8"))
        if res.get("ok"):
            return res["result"]["url"]
        raise RuntimeError(f"Telegraph createPage failed: {res}")


def verify_url(url, expected_dest):
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=20) as resp:
        html = resp.read().decode("utf-8", errors="ignore")
        return resp.status, (expected_dest in html or "saskstartupsolutions.ca" in html)


def main():
    results = {
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "items": [],
        "errors": [],
    }
    try:
        tg_token = create_telegraph_token()
    except Exception as exc:
        tg_token = None
        results["errors"].append(f"Telegraph account init error: {exc}")

    for item in ARTICLES:
        # 1. Write.as
        try:
            res = http_json("https://write.as/api/posts", {
                "title": item["topic"],
                "body": f"# {item['topic']}\n\n{item['markdown']}",
            })
            if res.get("code") == 201:
                w_url = f"https://write.as/{res['data']['id']}"
                status, has_link = verify_url(w_url, item["dest_urls"][0])
                results["items"].append({
                    "platform": "write.as",
                    "source_url": w_url,
                    "destination_urls": item["dest_urls"],
                    "http_status": status,
                    "link_verified": has_link,
                    "title": item["topic"],
                })
                print("WRITE.AS OK:", w_url, status, has_link)
            else:
                results["errors"].append(f"write.as unexpected: {res}")
        except Exception as exc:
            results["errors"].append(f"write.as {item['topic']}: {exc}")

        time.sleep(1.5)

        # 2. Telegra.ph
        if tg_token:
            try:
                t_url = publish_telegraph(tg_token, item["topic"], item["telegraph_nodes"])
                status, has_link = verify_url(t_url, item["dest_urls"][0])
                results["items"].append({
                    "platform": "telegra.ph",
                    "source_url": t_url,
                    "destination_urls": item["dest_urls"],
                    "http_status": status,
                    "link_verified": has_link,
                    "title": item["topic"],
                })
                print("TELEGRAPH OK:", t_url, status, has_link)
            except Exception as exc:
                results["errors"].append(f"telegra.ph {item['topic']}: {exc}")

        time.sleep(1.5)

    with open("campaign_6_backlinks_log.json", "w", encoding="utf-8") as f:
        json.dump(results, f, indent=2)
    print("DONE! Verified items:", len(results["items"]), "Errors:", len(results["errors"]))


if __name__ == "__main__":
    main()
