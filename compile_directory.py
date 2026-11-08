import json

data = [
    {
        "platform": "Substack",
        "domain": "substack.com",
        "da": 92,
        "category": "Editorial Newsletter & Authority Publication",
        "assets_count": "9 Articles",
        "links_count": "20 links (capped from 74)",
        "items": [
            {
                "title": "Saskatchewan Startup Compliance: Navigating Bookkeeping, T2 Tax, and ISC Filings",
                "url": "https://saskstartupsolutions.substack.com/p/saskatchewan-startup-compliance-navigating",
                "links": [
                    ("Vici SaskStartupSolutions", "https://saskstartupsolutions.ca/"),
                    ("bookkeeping services in Saskatoon", "https://saskstartupsolutions.ca/services"),
                    ("Saskatchewan business registration and ISC annual returns", "https://saskstartupsolutions.ca/blog/saskatchewan-business-registration-isc-annual-returns"),
                    ("T2 corporate tax filing in Saskatchewan", "https://saskstartupsolutions.ca/blog/t2-corporate-tax-filing-saskatchewan"),
                    ("Introductory Consultation", "https://saskstartupsolutions.ca/booking")
                ]
            },
            {
                "title": "The Saskatchewan Founder's Guide to Corporate Tax Deadlines and CRA Compliance",
                "url": "https://saskstartupsolutions.substack.com/p/the-saskatchewan-founders-guide-to",
                "links": [
                    ("Vici SaskStartupSolutions", "https://saskstartupsolutions.ca/"),
                    ("Saskatoon bookkeeping and accounting", "https://saskstartupsolutions.ca/services"),
                    ("Schedule discovery consultation", "https://saskstartupsolutions.ca/booking")
                ]
            },
            {
                "title": "How to Avoid Involuntary Strike-Off in Saskatchewan: ISC Annual Returns Guide",
                "url": "https://saskstartupsolutions.substack.com/p/how-to-avoid-involuntary-strike-off",
                "links": [
                    ("ISC Corporate Registry Guidance", "https://saskstartupsolutions.ca/blog/saskatchewan-business-registration-isc-annual-returns"),
                    ("Vici SaskStartupSolutions portal", "https://saskstartupsolutions.ca/"),
                    ("Book consultation", "https://saskstartupsolutions.ca/booking")
                ]
            },
            {
                "title": "Saskatchewan Corporate Accounting: Managing PST, GST, and Payroll in Saskatoon",
                "url": "https://saskstartupsolutions.substack.com/p/saskatchewan-corporate-accounting",
                "links": [
                    ("Vici SaskStartupSolutions", "https://saskstartupsolutions.ca/"),
                    ("Corporate bookkeeping services", "https://saskstartupsolutions.ca/services"),
                    ("ISC Annual Returns", "https://saskstartupsolutions.ca/blog/saskatchewan-business-registration-isc-annual-returns"),
                    ("Schedule meeting", "https://saskstartupsolutions.ca/booking")
                ]
            },
            {
                "title": "Saskatoon Small Business Cash Flow & Cloud Bookkeeping Infrastructure",
                "url": "https://saskstartupsolutions.substack.com/p/saskatoon-small-business-cash-flow",
                "links": [
                    ("Cloud bookkeeping solutions", "https://saskstartupsolutions.ca/services"),
                    ("Vici SaskStartupSolutions", "https://saskstartupsolutions.ca/"),
                    ("Book consultation", "https://saskstartupsolutions.ca/booking")
                ]
            },
            {
                "title": "The Saskatchewan Director's Guide to Corporate Transparency and Compliance",
                "url": "https://saskstartupsolutions.substack.com/p/the-saskatchewan-directors-guide",
                "links": [
                    ("Saskatchewan business registration & ISC guide", "https://saskstartupsolutions.ca/blog/saskatchewan-business-registration-isc-annual-returns"),
                    ("Official website", "https://saskstartupsolutions.ca/"),
                    ("Appointment booking", "https://saskstartupsolutions.ca/booking")
                ]
            },
            {
                "title": "Saskatchewan Payroll & Source Deductions: CRA Compliance for Small Businesses",
                "url": "https://saskstartupsolutions.substack.com/p/saskatchewan-payroll-source-deductions",
                "links": [
                    ("Payroll bookkeeping services", "https://saskstartupsolutions.ca/services"),
                    ("Vici SaskStartupSolutions", "https://saskstartupsolutions.ca/"),
                    ("Book intro call", "https://saskstartupsolutions.ca/booking")
                ]
            },
            {
                "title": "Saskatchewan Corporate Minute Books & Annual Resolution Maintenance",
                "url": "https://saskstartupsolutions.substack.com/p/saskatchewan-corporate-minute-books",
                "links": [
                    ("Corporate compliance & ISC filings", "https://saskstartupsolutions.ca/blog/saskatchewan-business-registration-isc-annual-returns"),
                    ("Official website", "https://saskstartupsolutions.ca/"),
                    ("Schedule appointment", "https://saskstartupsolutions.ca/booking")
                ]
            },
            {
                "title": "Maximizing the Saskatchewan Small Business Deduction: CCPC Tax Strategies",
                "url": "https://saskstartupsolutions.substack.com/p/maximizing-the-saskatchewan-small",
                "links": [
                    ("T2 corporate tax filing in Saskatchewan", "https://saskstartupsolutions.ca/blog/t2-corporate-tax-filing-saskatchewan"),
                    ("Corporate accounting services", "https://saskstartupsolutions.ca/services"),
                    ("Vici SaskStartupSolutions", "https://saskstartupsolutions.ca/"),
                    ("Consultation booking", "https://saskstartupsolutions.ca/booking")
                ]
            }
        ]
    },
    {
        "platform": "Rentry",
        "domain": "rentry.co",
        "da": 82,
        "category": "Decentralized Markdown Knowledge Base",
        "assets_count": "13 Guides",
        "links_count": "20 links (capped from 63)",
        "items": [
            {"title": "Saskatoon Small Business Bookkeeping & Financial Architecture", "url": "https://rentry.co/vrbqv8ck", "links": [("Vici SaskStartupSolutions", "https://saskstartupsolutions.ca/"), ("Saskatoon Bookkeeping Services", "https://saskstartupsolutions.ca/services"), ("T2 Tax Guide", "https://saskstartupsolutions.ca/blog/t2-corporate-tax-filing-saskatchewan")]},
            {"title": "Saskatchewan Corporate Registry & Annual Returns Guide", "url": "https://rentry.co/zp5hdrea", "links": [("Official Website", "https://saskstartupsolutions.ca/"), ("ISC Compliance Guide", "https://saskstartupsolutions.ca/blog/saskatchewan-business-registration-isc-annual-returns")]},
            {"title": "Saskatoon CCPC Corporate Tax Planning & CRA Compliance", "url": "https://rentry.co/zcocm2bb", "links": [("Vici SaskStartupSolutions", "https://saskstartupsolutions.ca/"), ("T2 Corporate Tax Filing", "https://saskstartupsolutions.ca/blog/t2-corporate-tax-filing-saskatchewan")]},
            {"title": "Saskatchewan Cloud Accounting & Financial Recordkeeping", "url": "https://rentry.co/ix2dsmng", "links": [("Services Matrix", "https://saskstartupsolutions.ca/services"), ("Book Consultation", "https://saskstartupsolutions.ca/booking")]},
            {"title": "ISC Corporate Maintenance & Strike-Off Prevention Protocol", "url": "https://rentry.co/2hr7nmeg", "links": [("Official Portal", "https://saskstartupsolutions.ca/"), ("ISC Compliance Guide", "https://saskstartupsolutions.ca/blog/saskatchewan-business-registration-isc-annual-returns")]},
            {"title": "Saskatchewan Small Business Deduction & T2 Optimization", "url": "https://rentry.co/2xeaauc9", "links": [("Vici SaskStartupSolutions", "https://saskstartupsolutions.ca/"), ("T2 Tax Guide", "https://saskstartupsolutions.ca/blog/t2-corporate-tax-filing-saskatchewan")]},
            {"title": "Saskatoon Startup Financial Foundations & General Ledger", "url": "https://rentry.co/n6vg4w4i", "links": [("Bookkeeping Services", "https://saskstartupsolutions.ca/services"), ("Book Consultation", "https://saskstartupsolutions.ca/booking")]},
            {"title": "CRA Corporate Tax Compliance & Audit Trail Preservation", "url": "https://rentry.co/92uspc86", "links": [("T2 Corporate Tax", "https://saskstartupsolutions.ca/blog/t2-corporate-tax-filing-saskatchewan"), ("Official Website", "https://saskstartupsolutions.ca/")]},
            {"title": "Saskatchewan Business Entity Selection & Registration Guide", "url": "https://rentry.co/qiqoyhue", "links": [("Official Portal", "https://saskstartupsolutions.ca/"), ("Schedule Consultation", "https://saskstartupsolutions.ca/booking")]},
            {"title": "Saskatchewan Corporate Transparency Register Requirements", "url": "https://rentry.co/g5pq6o7c", "links": [("ISC Annual Returns Guide", "https://saskstartupsolutions.ca/blog/saskatchewan-business-registration-isc-annual-returns"), ("Services", "https://saskstartupsolutions.ca/services")]},
            {"title": "Saskatoon Bookkeeping Automation with QuickBooks & Xero", "url": "https://rentry.co/6irivhyu", "links": [("Official Website", "https://saskstartupsolutions.ca/"), ("Services", "https://saskstartupsolutions.ca/services")]},
            {"title": "Saskatchewan PST & GST Filing Deadlines for Small Business", "url": "https://rentry.co/x82t7g22", "links": [("Vici SaskStartupSolutions", "https://saskstartupsolutions.ca/"), ("Services", "https://saskstartupsolutions.ca/services")]},
            {"title": "Saskatchewan Corporate Dissolution & Reinstatement Guide", "url": "https://rentry.co/i2cin4pq", "links": [("Official Website", "https://saskstartupsolutions.ca/"), ("Services", "https://saskstartupsolutions.ca/services")]}
        ]
    },
    {
        "platform": "Blogger",
        "domain": "blogspot.com",
        "da": 100,
        "category": "Google Authority Editorial Blog",
        "assets_count": "7 Posts",
        "links_count": "20 links (capped from 28)",
        "items": [
            {"title": "Saskatchewan Corporate Registry: Navigating ISC Annual Returns & Compliance", "url": "https://vici-saskstartupsolutions.blogspot.com/2026/11/saskatchewan-corporate-registry.html", "links": [("Vici SaskStartupSolutions", "https://saskstartupsolutions.ca/"), ("T2 Corporate Tax", "https://saskstartupsolutions.ca/blog/t2-corporate-tax-filing-saskatchewan"), ("ISC Annual Returns", "https://saskstartupsolutions.ca/blog/saskatchewan-business-registration-isc-annual-returns")]},
            {"title": "Navigating Startup Back-Office: Bookkeeping & Tax Services in Saskatoon", "url": "https://vici-saskstartupsolutions.blogspot.com/2026/11/navigating-startup-back-office.html", "links": [("Vici SaskStartupSolutions", "https://saskstartupsolutions.ca/"), ("Bookkeeping Services", "https://saskstartupsolutions.ca/services"), ("Book Consultation", "https://saskstartupsolutions.ca/booking")]},
            {"title": "Saskatchewan PST Rules for Service and Digital Businesses", "url": "https://vici-saskstartupsolutions.blogspot.com/2026/11/saskatchewan-pst-rules-for-service-and.html", "links": [("Official Website", "https://saskstartupsolutions.ca/"), ("T2 Corporate Tax Filing", "https://saskstartupsolutions.ca/blog/t2-corporate-tax-filing-saskatchewan"), ("Book Consultation", "https://saskstartupsolutions.ca/booking")]},
            {"title": "Comprehensive Saskatchewan Corporate Tax & Filing Blueprint", "url": "https://vici-saskstartupsolutions.blogspot.com/2026/11/comprehensive-saskatchewan-corporate.html", "links": [("Vici SaskStartupSolutions", "https://saskstartupsolutions.ca/"), ("T2 Tax Guide", "https://saskstartupsolutions.ca/blog/t2-corporate-tax-filing-saskatchewan"), ("ISC Compliance", "https://saskstartupsolutions.ca/blog/saskatchewan-business-registration-isc-annual-returns")]},
            {"title": "Saskatchewan Small Business Deduction & Corporate Tax Rates", "url": "https://vici-saskstartupsolutions.blogspot.com/2026/11/saskatchewan-small-business-deduction.html", "links": [("Official Website", "https://saskstartupsolutions.ca/"), ("T2 Tax Filing", "https://saskstartupsolutions.ca/blog/t2-corporate-tax-filing-saskatchewan"), ("Book Appointment", "https://saskstartupsolutions.ca/booking")]},
            {"title": "Saskatoon Small Business Compliance Essentials 2026", "url": "https://vici-saskstartupsolutions.blogspot.com/2026/11/blog-post_06.html", "links": [("Official Website", "https://saskstartupsolutions.ca/"), ("ISC Guide", "https://saskstartupsolutions.ca/blog/saskatchewan-business-registration-isc-annual-returns"), ("Book Consultation", "https://saskstartupsolutions.ca/booking")]},
            {"title": "Saskatchewan Employee vs Contractor: Payroll & CRA Guidelines", "url": "https://vici-saskstartupsolutions.blogspot.com/2026/11/saskatchewan-employee-vs-contractor.html", "links": [("Official Website", "https://saskstartupsolutions.ca/"), ("T2 Corporate Tax", "https://saskstartupsolutions.ca/blog/t2-corporate-tax-filing-saskatchewan"), ("Book Appointment", "https://saskstartupsolutions.ca/booking")]}
        ]
    },
    {
        "platform": "Google Cloud & Workspace",
        "domain": "google.com",
        "da": 100,
        "category": "Google Native Infrastructure (Sites, Maps, Docs)",
        "assets_count": "3 Hubs",
        "links_count": "20 links (capped from 28)",
        "items": [
            {
                "title": "Google Docs Whitepaper: Saskatchewan Corporate Compliance & Tax Handbook",
                "url": "https://docs.google.com/document/d/e/2PACX-1vSgmHzcZ0voTdQrRitUuQ5uH3VkuYohQx1Wa1rcDBjLSdjFmyedhHQISElmRjk7iFoKXZAmPKSkiXK7/pub",
                "links": [
                    ("Vici SaskStartupSolutions Homepage", "https://saskstartupsolutions.ca/"),
                    ("Corporate Bookkeeping Services", "https://saskstartupsolutions.ca/services"),
                    ("ISC Corporate Registry Guide", "https://saskstartupsolutions.ca/blog/saskatchewan-business-registration-isc-annual-returns"),
                    ("T2 Corporate Tax Filing Guide", "https://saskstartupsolutions.ca/blog/t2-corporate-tax-filing-saskatchewan"),
                    ("Book Discovery Consultation", "https://saskstartupsolutions.ca/booking")
                ]
            },
            {
                "title": "Google My Maps: Vici SaskStartupSolutions Geocoded Authority Hub",
                "url": "https://www.google.com/maps/d/viewer?mid=1p6xRfOSPH2SlsQKODKjtSdCy7ChW4yk",
                "links": [
                    ("Physical Office Geocoded Marker (539 Ave I N)", "https://saskstartupsolutions.ca/"),
                    ("Saskatoon Bookkeeping Services", "https://saskstartupsolutions.ca/services"),
                    ("T2 Tax Compliance Guide", "https://saskstartupsolutions.ca/blog/t2-corporate-tax-filing-saskatchewan"),
                    ("Consultation Booking Interface", "https://saskstartupsolutions.ca/booking")
                ]
            },
            {
                "title": "Google Sites: Official Branded Saskatchewan Business Entity Portal",
                "url": "https://sites.google.com/clinkora.in/vici-saskstartupsolutions",
                "links": [
                    ("Corporate Home & Local Schema", "https://saskstartupsolutions.ca/"),
                    ("Saskatoon Bookkeeping Services", "https://saskstartupsolutions.ca/services"),
                    ("ISC Corporate Registry Guide", "https://saskstartupsolutions.ca/blog/saskatchewan-business-registration-isc-annual-returns"),
                    ("Direct Consultation Scheduler", "https://saskstartupsolutions.ca/booking")
                ]
            }
        ]
    },
    {
        "platform": "Medium",
        "domain": "medium.com",
        "da": 96,
        "category": "Global Editorial Publication Network",
        "assets_count": "5 Stories",
        "links_count": "20 links (capped from 21)",
        "items": [
            {"title": "The Saskatchewan Founder's Guide to GST/PST & CRA Audit-Ready Bookkeeping", "url": "https://medium.com/@access_99245/the-saskatchewan-founders-guide-to-gst-pst-and-cra-audit-ready-bookkeeping-f110294f5269", "links": [("Vici SaskStartupSolutions", "https://saskstartupsolutions.ca/"), ("bookkeeping services in Saskatoon", "https://saskstartupsolutions.ca/services"), ("T2 corporate tax guide", "https://saskstartupsolutions.ca/blog/t2-corporate-tax-filing-saskatchewan"), ("schedule consultation", "https://saskstartupsolutions.ca/booking")]},
            {"title": "Navigating the Back-Office Maze: Why Saskatoon Startups Outsource Bookkeeping", "url": "https://medium.com/@access_99245/navigating-the-back-office-maze-why-saskatoon-startups-are-outsourcing-bookkeeping-t2-tax-and-0476698d2e7e", "links": [("Vici SaskStartupSolutions", "https://saskstartupsolutions.ca/"), ("professional bookkeeping services", "https://saskstartupsolutions.ca/services"), ("book free intro call", "https://saskstartupsolutions.ca/booking")]},
            {"title": "Mastering T2 Corporate Tax Deadlines for Saskatchewan Small Businesses", "url": "https://medium.com/@access_99245/mastering-t2-corporate-tax-deadlines-for-saskatchewan-small-businesses-590770b47c44", "links": [("Official Website", "https://saskstartupsolutions.ca/"), ("T2 corporate tax filing in Saskatchewan", "https://saskstartupsolutions.ca/blog/t2-corporate-tax-filing-saskatchewan"), ("book consultation", "https://saskstartupsolutions.ca/booking")]},
            {"title": "Saskatoon Small Business Bookkeeping: Cloud Systems & CRA Compliance", "url": "https://medium.com/@access_99245/saskatoon-small-business-bookkeeping-cloud-systems-quickbooks-vs-xero-and-cra-compliance-15bdb1a5e2a1", "links": [("Vici SaskStartupSolutions", "https://saskstartupsolutions.ca/"), ("Bookkeeping Services", "https://saskstartupsolutions.ca/services"), ("Book appointment", "https://saskstartupsolutions.ca/booking")]},
            {"title": "The Saskatoon Founder's Guide to Corporate Transparency and ISC Registers", "url": "https://medium.com/@access_99245/the-saskatoon-founders-guide-to-corporate-transparency-and-isc-registers-3a8edeeb94f0", "links": [("Official Portal", "https://saskstartupsolutions.ca/"), ("ISC corporate registry guide", "https://saskstartupsolutions.ca/blog/saskatchewan-business-registration-isc-annual-returns"), ("Book consultation", "https://saskstartupsolutions.ca/booking")]}
        ]
    },
    {
        "platform": "Telegra.ph",
        "domain": "telegra.ph",
        "da": 91,
        "category": "Instant Publishing Authority Network",
        "assets_count": "10 Pillars",
        "links_count": "20 links",
        "items": [
            {"title": "Saskatoon Small Business Financial Blueprint: Bookkeeping, Tax & ISC", "url": "https://telegra.ph/Saskatoon-Small-Business-Financial-Blueprint-Bookkeeping-Corporate-Tax--ISC-Compliance-11-06", "links": [("Vici SaskStartupSolutions", "https://saskstartupsolutions.ca/"), ("small business bookkeeping in Saskatoon", "https://saskstartupsolutions.ca/services"), ("T2 corporate tax", "https://saskstartupsolutions.ca/blog/t2-corporate-tax-filing-saskatchewan"), ("ISC returns", "https://saskstartupsolutions.ca/blog/saskatchewan-business-registration-isc-annual-returns")]},
            {"title": "Saskatchewan PST Audit Preparedness: Sales Tax Compliance for SMBs", "url": "https://telegra.ph/Saskatchewan-PST-Audit-Preparedness-Sales-Tax-Compliance-for-Saskatoon-SMBs-11-06", "links": [("Vici SaskStartupSolutions", "https://saskstartupsolutions.ca/"), ("bookkeeping services", "https://saskstartupsolutions.ca/services"), ("small business bookkeeping guide", "https://saskstartupsolutions.ca/blog/small-business-bookkeeping-saskatoon")]},
            {"title": "Saskatchewan Corporate Reinstatement Guide: Resolving ISC Strike-Offs", "url": "https://telegra.ph/Saskatchewan-Corporate-Reinstatement-Guide-Resolving-ISC-Strike-Offs-11-06", "links": [("Official Portal", "https://saskstartupsolutions.ca/"), ("ISC annual returns", "https://saskstartupsolutions.ca/blog/saskatchewan-business-registration-isc-annual-returns"), ("T2 corporate tax filing", "https://saskstartupsolutions.ca/blog/t2-corporate-tax-filing-saskatchewan")]},
            {"title": "Saskatoon Small Business Tax Optimization: SBD Rules & CCA Planning", "url": "https://telegra.ph/Saskatoon-Small-Business-Tax-Optimization-SBD-Rules--CCA-Planning-for-CCPCs-11-06", "links": [("Vici SaskStartupSolutions", "https://saskstartupsolutions.ca/"), ("Corporate tax filing", "https://saskstartupsolutions.ca/blog/t2-corporate-tax-filing-saskatchewan"), ("Book consultation", "https://saskstartupsolutions.ca/booking")]},
            {"title": "Director Liabilities & Corporate Registry Obligations Under The SBCA", "url": "https://telegra.ph/Director-Liabilities--Corporate-Registry-Obligations-Under-The-Saskatchewan-Business-Corporations-Act-11-06", "links": [("Vici SaskStartupSolutions", "https://saskstartupsolutions.ca/"), ("ISC compliance guide", "https://saskstartupsolutions.ca/blog/saskatchewan-business-registration-isc-annual-returns")]},
            {"title": "Saskatchewan Agri-Tech & Farming Bookkeeping: Agri-Stability Accounting", "url": "https://telegra.ph/Saskatchewan-Agri-Tech-and-Farming-Bookkeeping-Agri-Stability--Capital-Asset-Accounting-11-06", "links": [("Vici SaskStartupSolutions", "https://saskstartupsolutions.ca/"), ("Bookkeeping services", "https://saskstartupsolutions.ca/services")]},
            {"title": "Saskatoon Construction & Trades Bookkeeping: Job Costing Mastery", "url": "https://telegra.ph/Saskatoon-Construction--Trades-Bookkeeping-Job-Costing-and-Cash-Flow-Mastery-11-06", "links": [("Vici SaskStartupSolutions", "https://saskstartupsolutions.ca/"), ("Accounting services", "https://saskstartupsolutions.ca/services")]},
            {"title": "Saskatchewan T2 Corporate Tax Filing & CRA Compliance Checklist for CCPCs", "url": "https://telegra.ph/Saskatchewan-T2-Corporate-Tax-Filing--CRA-Compliance-Checklist-for-CCPCs-11-06", "links": [("Vici SaskStartupSolutions", "https://saskstartupsolutions.ca/"), ("T2 Corporate Tax Filing Guide", "https://saskstartupsolutions.ca/blog/t2-corporate-tax-filing-saskatchewan")]},
            {"title": "Incorporation in Saskatchewan: Sole Proprietorship vs Business Corporation", "url": "https://telegra.ph/Incorporation-in-Saskatchewan-Sole-Proprietorship-vs-Business-Corporation-11-06", "links": [("Vici SaskStartupSolutions", "https://saskstartupsolutions.ca/"), ("Corporate Registration & ISC", "https://saskstartupsolutions.ca/blog/saskatchewan-business-registration-isc-annual-returns")]},
            {"title": "CRA GST Remittance in Saskatchewan: Filing Rules and ITC Recovery", "url": "https://telegra.ph/CRA-GST-Remittance-in-Saskatchewan-Filing-Rules-and-ITC-Recovery-11-06", "links": [("Vici SaskStartupSolutions", "https://saskstartupsolutions.ca/"), ("Bookkeeping Services", "https://saskstartupsolutions.ca/services")]}
        ]
    },
    {
        "platform": "Tumblr",
        "domain": "tumblr.com",
        "da": 99,
        "category": "Editorial Microblog & Publishing Network",
        "assets_count": "3 Posts",
        "links_count": "9 links",
        "items": [
            {
                "title": "Saskatchewan Small Business Corporate Compliance & Back-Office Protocols",
                "url": "https://www.tumblr.com/saskstartupsolutions/832531514395901952/saskatchewan-small-business-corporate-compliance",
                "links": [
                    ("Vici SaskStartupSolutions", "https://saskstartupsolutions.ca/"),
                    ("Saskatoon small business bookkeeping", "https://saskstartupsolutions.ca/services"),
                    ("T2 corporate tax filing in Saskatchewan", "https://saskstartupsolutions.ca/blog/t2-corporate-tax-filing-saskatchewan"),
                    ("Saskatchewan business registration", "https://saskstartupsolutions.ca/blog/saskatchewan-business-registration-isc-annual-returns"),
                    ("Book a consultation", "https://saskstartupsolutions.ca/booking")
                ]
            },
            {
                "title": "The Saskatchewan Founder's Quick Guide to T2 Corporate Tax Deadlines",
                "url": "https://turfprofessors.tumblr.com/post/832488969103114240/the-saskatchewan-founders-quick-guide-to-t2",
                "links": [
                    ("Vici SaskStartupSolutions", "https://saskstartupsolutions.ca/"),
                    ("Corporate bookkeeping services", "https://saskstartupsolutions.ca/services"),
                    ("T2 corporate tax filing", "https://saskstartupsolutions.ca/blog/t2-corporate-tax-filing-saskatchewan"),
                    ("Book consultation", "https://saskstartupsolutions.ca/booking")
                ]
            },
            {
                "title": "Saskatchewan Corporate Annual Returns: How to Protect from Strike-Off",
                "url": "https://turfprofessors.tumblr.com/post/832490559000231936/saskatchewan-corporate-annual-returns-how-to",
                "links": [
                    ("Official Website", "https://saskstartupsolutions.ca/"),
                    ("Saskatchewan corporate returns", "https://saskstartupsolutions.ca/blog/saskatchewan-business-registration-isc-annual-returns"),
                    ("Corporate tax solutions", "https://saskstartupsolutions.ca/services")
                ]
            }
        ]
    },
    {
        "platform": "WordPress.com",
        "domain": "wordpress.com",
        "da": 94,
        "category": "Automattic Enterprise Publishing CMS",
        "assets_count": "1 Authority Post",
        "links_count": "5 links",
        "items": [
            {
                "title": "Saskatchewan Corporate Accounting, ISC Compliance, and T2 Tax Protocol 2026",
                "url": "https://saskstartupsolutions.wordpress.com/2026/11/06/saskatchewan-corporate-accounting-isc-compliance-protocol-2026/",
                "links": [
                    ("Vici SaskStartupSolutions", "https://saskstartupsolutions.ca/"),
                    ("Saskatoon small business bookkeeping", "https://saskstartupsolutions.ca/services"),
                    ("T2 corporate tax filing in Saskatchewan", "https://saskstartupsolutions.ca/blog/t2-corporate-tax-filing-saskatchewan"),
                    ("Saskatchewan business registration and ISC annual returns", "https://saskstartupsolutions.ca/blog/saskatchewan-business-registration-isc-annual-returns"),
                    ("Schedule a consultation", "https://saskstartupsolutions.ca/booking")
                ]
            }
        ]
    },
    {
        "platform": "Wakelet",
        "domain": "wakelet.com",
        "da": 87,
        "category": "Curated Digital Asset & Resource Hub",
        "assets_count": "1 Curated Hub",
        "links_count": "5 links",
        "items": [
            {
                "title": "Vici SaskStartupSolutions — Saskatchewan Corporate Knowledge Hub",
                "url": "https://wakelet.com/wake/fdzgYVrsjW5VPNrz8otEz",
                "links": [
                    ("Primary Portal Citation", "https://saskstartupsolutions.ca/"),
                    ("Bookkeeping & Financial Statements", "https://saskstartupsolutions.ca/services"),
                    ("T2 Corporate Tax Filing Guide", "https://saskstartupsolutions.ca/blog/t2-corporate-tax-filing-saskatchewan"),
                    ("ISC Corporate Registry & Compliance", "https://saskstartupsolutions.ca/blog/saskatchewan-business-registration-isc-annual-returns"),
                    ("Consultation Booking Interface", "https://saskstartupsolutions.ca/booking")
                ]
            }
        ]
    },
    {
        "platform": "Padlet",
        "domain": "padlet.com",
        "da": 89,
        "category": "Interactive Business Resource Board",
        "assets_count": "1 Resource Board",
        "links_count": "4 links",
        "items": [
            {
                "title": "Vici SaskStartupSolutions: Saskatchewan Corporate Accounting Board",
                "url": "https://padlet.com/access_d2vr/vici-saskstartupsolutions-saskatchewan-corporate-resources-s0257fg1mehgzp4y87pf",
                "links": [
                    ("Official Corporate Website", "https://saskstartupsolutions.ca/"),
                    ("Small Business Bookkeeping", "https://saskstartupsolutions.ca/services"),
                    ("T2 Corporate Tax Compliance Guide", "https://saskstartupsolutions.ca/blog/t2-corporate-tax-filing-saskatchewan"),
                    ("ISC Corporate Registry Guide", "https://saskstartupsolutions.ca/blog/saskatchewan-business-registration-isc-annual-returns")
                ]
            }
        ]
    },
    {
        "platform": "Taplink",
        "domain": "taplink.cc",
        "da": 85,
        "category": "High-DA Business Link Hub & Bio",
        "assets_count": "1 Business Hub",
        "links_count": "3 links",
        "items": [
            {
                "title": "Vici SaskStartupSolutions — Official Fast-Action Bio Hub",
                "url": "https://taplink.cc/saskstartupsolutions",
                "links": [
                    ("Official Website", "https://saskstartupsolutions.ca/"),
                    ("Corporate & Tax Solutions", "https://saskstartupsolutions.ca/services"),
                    ("Book a Free Consultation", "https://saskstartupsolutions.ca/booking")
                ]
            }
        ]
    },
    {
        "platform": "OpenStreetMap",
        "domain": "openstreetmap.org",
        "da": 93,
        "category": "Global Geo Citation & Mapping Entity",
        "assets_count": "1 Geo-Profile",
        "links_count": "2 links",
        "items": [
            {
                "title": "Vici SaskStartupSolutions — Verified Geo Entity Profile",
                "url": "https://www.openstreetmap.org/user/saskstartupsolutions",
                "links": [
                    ("Official Website", "https://saskstartupsolutions.ca/"),
                    ("Saskatoon Bookkeeping & Tax Services", "https://saskstartupsolutions.ca/services")
                ]
            }
        ]
    },
    {
        "platform": "Indie Hackers",
        "domain": "indiehackers.com",
        "da": 87,
        "category": "Founder Network & Business Directory",
        "assets_count": "1 Company Profile",
        "links_count": "2 links",
        "items": [
            {
                "title": "Patrick Vachon | Vici SaskStartupSolutions (@saskstartupsolutions)",
                "url": "https://www.indiehackers.com/saskstartupsolutions",
                "links": [
                    ("Official Website", "https://saskstartupsolutions.ca/"),
                    ("Saskatchewan Small Business Accounting", "https://saskstartupsolutions.ca/services")
                ]
            }
        ]
    },
    {
        "platform": "Diigo",
        "domain": "diigo.com",
        "da": 89,
        "category": "Social Bookmarking Authority Hub",
        "assets_count": "1 Bookmarking Hub",
        "links_count": "2 links",
        "items": [
            {
                "title": "Vici SaskStartupSolutions — Public Bookmarking Library",
                "url": "https://www.diigo.com/user/saskstartups",
                "links": [
                    ("Vici SaskStartupSolutions Official Website", "https://saskstartupsolutions.ca/"),
                    ("Corporate Accounting & Bookkeeping Services", "https://saskstartupsolutions.ca/services")
                ]
            }
        ]
    },
    {
        "platform": "Linktree",
        "domain": "linktr.ee",
        "da": 93,
        "category": "Verified Bio & Navigation Hub",
        "assets_count": "1 Bio Hub",
        "links_count": "2 links",
        "items": [
            {
                "title": "Vici SaskStartupSolutions (@saskstartupsolutions)",
                "url": "https://linktr.ee/saskstartupsolutions",
                "links": [
                    ("Official Website", "https://saskstartupsolutions.ca/"),
                    ("Accounting & Compliance Services", "https://saskstartupsolutions.ca/services")
                ]
            }
        ]
    },
    {
        "platform": "Gravatar",
        "domain": "gravatar.com",
        "da": 94,
        "category": "Automattic Global Author & Identity Hub",
        "assets_count": "1 Author Identity",
        "links_count": "1 link",
        "items": [
            {
                "title": "Patrick Vachon — Vici SaskStartupSolutions Verified Persona",
                "url": "https://gravatar.com/access5a3edc587b",
                "links": [
                    ("Verified Website", "https://saskstartupsolutions.ca/")
                ]
            }
        ]
    }
]

print("Total platforms compiled:", len(data))
total_assets = sum(len(p["items"]) for p in data)
print("Total assets compiled:", total_assets)
