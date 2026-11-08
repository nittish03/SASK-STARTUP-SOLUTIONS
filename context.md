# Vici SaskStartupSolutions — Master Project & Continuity Dossier

> **File:** `context.md`  
> **Entity:** Vici SaskStartupSolutions (`https://saskstartupsolutions.ca/`)  
> **Local Workspace:** `/Users/eshway/Desktop/NIPUN1`  
> **GitHub Remote:** `https://github.com/nittish03/SASK-STARTUP-SOLUTIONS.git` (Branch: `main`)  
> **Local Server:** `http://localhost:3000` (Active & Serving Frontend Build)  
> **Emergent Project:** "Vici Registry Admin" (`bf42bf06-08c2-40be-9c97-5ecd988db1ef`) under Org "Vici Sask"  
> **Baseline Checkpoint Tag:** `seo-baseline` | **Backup Branch:** `baseline-backup`  
> **Current Campaign Focus:** On-Page, Technical & Local SEO Overhaul (Starting from Scratch)  
> **Last Synchronized:** 2026-11-09  

---

## 1. Executive Entity & Client Information

* **Brand / Company Name:** Vici SaskStartupSolutions (also branded as SaskStartupSolutions)
* **Official Production URL:** `https://saskstartupsolutions.ca/`
* **Practice Lead & Principal:** Patrick Vachon
* **Physical Office Address:** `539 Avenue I N, Saskatoon, SK S7L 2G9`
* **Direct Telephone:** `1 (306) 960-0091`
* **Contact Email:** `Saskstartupsolutions@viciconsulting.ca`
* **Operating Hours:** Monday–Sunday, 8:00 AM – 8:00 PM CST
* **Target Geographic Area:** Saskatoon, Regina, Prince Albert, and Saskatchewan province, Canada.
* **Core Business Offerings:**
  1. Small business monthly bookkeeping & payroll management in Saskatoon.
  2. Saskatchewan T2 corporate income tax return preparation and CRA filing.
  3. Saskatchewan ISC (Information Services Corporation) corporate registry annual returns and business registrations.
  4. Notice to Reader / Compilation financial statements and startup financial structuring.
* **Client Credentials & Accounts:**
  - Client Corporate Account: `Access@clinkora.in` / `moneyinthebank12345` (Google Workspace / Emergent account).
  - Emergent Org: **Vici Sask** (`org_0f360b63-f4c5-4dad-b24c-142ffd034473`, Owner: Nipun Mehta).

---

## 2. Hard Governance & Account Isolation Rules (MANDATORY)

Any AI agent working in this workspace **MUST** uphold these rules without exception:

1. **Strict Personal Account Isolation (Zero Personal Linkage):**
   - The user's personal GitHub account (`nittish03`) is connected **ONLY** as a Git remote on this local machine.
   - **NEVER** link, authenticate, or connect user personal accounts (`nittish03`, personal Google, etc.) to Emergent, client Google Workspace, or client third-party services.
2. **Strict Client Account Exclusivity (`Access@clinkora.in`):**
   - All client dashboard, Google Cloud, and platform actions must use `Access@clinkora.in`.
   - Author profile names must always be **Patrick Vachon** or **Vici SaskStartupSolutions**.
3. **Zero Brand Contamination:**
   - The client Google account previously had a legacy site for an agency client called "Turf Professors" (Richmond, VA).
   - Ensure **ZERO** references to Turf Professors appear in any title, body, author byline, or URL.
4. **Safety & Moderation Boundaries:**
   - Never attempt to bypass CAPTCHAs, bot detectors, or Cloudflare WAF. Log any barrier encountered and proceed safely.

---

## 3. Technology Stack Breakdown

* **Frontend:**
  - **Framework:** React 19 (`19.0.0`) Single Page Application.
  - **Build Tool:** CRACO (`@craco/craco` 7.1.0) with Webpack 5.
  - **Styling:** Tailwind CSS (`3.4.17`) + `tailwindcss-animate` + Radix UI Primitives (shadcn/ui style).
  - **Routing:** React Router v7 (`react-router-dom` 7.15.0).
  - **Animations & Scrolling:** Framer Motion (`11.18.0`) + Lenis (`1.3.26`) smooth scrolling.
  - **Forms & Validation:** React Hook Form (`7.56.2`) + Zod (`3.24.4`).
  - **Data Fetching:** TanStack React Query (`5.56.2`) + Axios (`1.18.0`) + SWR (`2.3.8`).
  - **Icons & UI:** Lucide React (`0.516.0`), Sonner (toasts), Embla Carousel, Recharts.
  - **SEO:** `react-helmet-async` for route-level metadata + `generate-sitemap.js` prebuild script.
* **Backend:**
  - **Framework:** FastAPI (`0.110.1`) Python async web server.
  - **Database:** MongoDB via `motor` (`3.3.1` async driver) & `pymongo`.
  - **Validation:** Pydantic v2 (`2.13.5`).
  - **Security & Auth:** `PyJWT` (`2.14.0`) + `passlib` / `bcrypt`.
  - **PDF Generation:** ReportLab (`5.0.1`) for generating client intake and compliance PDFs.
  - **Email Service:** Emergent Email Delivery API (`EMERGENT_EMAIL_KEY`).

---

## 4. Environment & Secrets Configuration

All configuration files are present in the workspace:
1. `frontend/.env`:
   ```
   REACT_APP_BACKEND_URL=https://vici-registry-admin.preview.emergentagent.com
   WDS_SOCKET_PORT=443
   ENABLE_HEALTH_CHECK=false
   ```
2. `backend/.env`: Configured for local development (`MONGO_URL=mongodb://localhost:27017`, `DB_NAME=test_database`).
3. `.env.example`: Root template committed to Git for developer reference.
4. `.env.live`: Secured locally (ignored by `.gitignore`), containing live Emergent secrets:
   - Live MongoDB Atlas Cluster: `mongodb+srv://vici-registry-admin:dbba5ja4hkhs739fmujg@customer-apps.0caamy.mongodb.net/?retryWrites=true&w=majority&appName=vici-registry-admin&maxPoolSize=5`
   - Live DB Name: `vici-registry-admin-test_database`
   - Emergent Email Key: `ek_4e3fd078f9e5db108972c3d64e24fd42`
   - Integration Proxy: `https://integrations.emergentagent.com`

---

## 5. Local Server & Deployment State

* **Frontend Build Server:** Running in background via `serve -s frontend/build -l 3000`.
* **Verified URL:** `http://localhost:3000` (**HTTP 200 OK**).
* **Commands Reference:**
  ```bash
  # Check server response
  curl -I http://localhost:3000

  # Rebuild frontend after making code edits
  cd /Users/eshway/Desktop/NIPUN1/frontend
  yarn build

  # Run frontend in interactive development mode (hot-reloading)
  cd /Users/eshway/Desktop/NIPUN1/frontend
  yarn start

  # Run backend locally (optional - default frontend connects to live preview backend)
  cd /Users/eshway/Desktop/NIPUN1/backend
  python3 -m venv venv && ./venv/bin/pip install -r requirements.txt
  ./venv/bin/uvicorn server:app --host 0.0.0.0 --port 8000 --reload
  ```

---

## 6. GitHub Repository & Restore Checkpoint

* **Remote:** `https://github.com/nittish03/SASK-STARTUP-SOLUTIONS.git`
* **Active Working Branch:** `main`
* **Permanent Restore Tag:** `seo-baseline` (Annotated tag pushed to GitHub)
* **Permanent Backup Branch:** `baseline-backup` (Pushed to GitHub)

### 🚨 Emergency Rollback Instructions
If any SEO changes or code edits ever break the website or need to be discarded:
```bash
# Option 1: Hard reset working tree to the untouched baseline
git reset --hard seo-baseline

# Option 2: Switch to the backup branch
git checkout baseline-backup
```

---

## 7. Backlink Campaign Summary (COMPLETED)

* **Status:** 100% Complete. No further backlinking required.
* **Total Assets:** 16 High-DA Root Domains (DA 82–100), 59 Live Published Assets, 61 Verified Links.
* **Capping Rule:** Maximum 5 links per platform.
* **Deliverable PDF:** `/Users/eshway/Desktop/NIPUN1/campaigns/Vici_SaskStartupSolutions_Exact_Backlinks_Directory.pdf`
* **PDF Generator:** `/Users/eshway/Desktop/NIPUN1/scripts/generate_exact_backlinks_pdf.py`

---

## 8. Current Mission: Website SEO from Scratch

We are now executing the **full on-page, technical, and local SEO campaign** from scratch based on the agency's official strategy document: [`SaskStartupSolutions_Top_50_Keywords.pdf`](file:///Users/eshway/Desktop/NIPUN1/SaskStartupSolutions_Top_50_Keywords.pdf).

### The Top 50 Target Keywords Blueprint (Agency Official)

The campaign follows an acquisition-to-retention funnel:
1. **Acquisition (Business Formation):** Searchers look for incorporation and name registration.
2. **Recurring LTV (Bookkeeping & Compliance):** Convert new entities into monthly bookkeeping and T2 tax clients.
3. **Geo-Anchored:** Every single keyword targets either **Saskatoon** or **Saskatchewan**.

| Group & Target URL | Key Target Search Queries |
| :--- | :--- |
| **Group 1: Incorporation** (1–10)<br/>*Target: `/services`, `/blog/...`* | 1. `incorporate a business Saskatoon`<br/>2. `business incorporation services Saskatoon`<br/>3. `incorporation help Saskatoon`<br/>4. `how to incorporate in Saskatchewan`<br/>5. `incorporate a small business Saskatchewan`<br/>6. `new corporation setup Saskatoon`<br/>7. `incorporating a sole proprietorship Saskatchewan`<br/>8. `incorporation documents needed Saskatchewan`<br/>9. `how long does incorporation take Saskatchewan`<br/>10. `cost to incorporate in Saskatchewan` |
| **Group 2: Registration** (11–19)<br/>*Target: `/services`* | 11. `register a business name Saskatchewan`<br/>12. `business registration help Saskatoon`<br/>13. `business registration services Saskatoon`<br/>14. `register a small business Saskatoon`<br/>15. `sole proprietorship registration help Saskatchewan`<br/>16. `partnership registration help Saskatchewan`<br/>17. `business name registration process Saskatchewan`<br/>18. `what do I need to register a business name Saskatchewan`<br/>19. `business registration cost Saskatchewan` |
| **Group 3: Bookkeeping** (20–31)<br/>*Target: `/` (Home), `/services`* | 20. `bookkeeper Saskatoon`<br/>21. `bookkeeping services Saskatoon`<br/>22. `small business bookkeeping Saskatoon`<br/>23. `monthly bookkeeping services Saskatoon`<br/>24. `bookkeeping for new businesses Saskatoon`<br/>25. `bookkeeping for newly incorporated businesses Saskatoon`<br/>26. `bookkeeping for self employed Saskatoon`<br/>27. `sole proprietor bookkeeping Saskatoon`<br/>28. `bookkeeping for freelancers Saskatoon`<br/>29. `bookkeeping for consultants Saskatoon`<br/>30. `remote bookkeeping Saskatchewan`<br/>31. `bookkeeping cleanup Saskatoon` |
| **Group 4: Startup Guidance** (32–39)<br/>*Target: `/faq`, `/blog`* | 32. `help starting a business in Saskatoon`<br/>33. `starting a business in Saskatchewan`<br/>34. `first time business owner support Saskatoon`<br/>35. `sole proprietorship vs corporation Saskatchewan`<br/>36. `moving from self employed to incorporated Saskatchewan`<br/>37. `what comes after registering a business Saskatchewan`<br/>38. `what to do after incorporation Saskatchewan`<br/>39. `when does a Saskatchewan business need a GST number` |
| **Group 5: Ongoing Filings** (40–43)<br/>*Target: `/services`, `/faq`* | 40. `annual return filing Saskatchewan corporation`<br/>41. `ISC annual return help Saskatoon`<br/>42. `what records should a small business keep Saskatchewan`<br/>43. `can I keep business receipts digitally Saskatchewan` |
| **Group 6: Differentiators & Brand** (44–50)<br/>*Target: `/staff`, `/booking`, `/contact`* | 44. `free business consultation Saskatoon`<br/>45. `business setup help for newcomers Saskatoon`<br/>46. `newcomer business registration Saskatchewan`<br/>47. `French speaking bookkeeper Saskatoon`<br/>48. `Russian speaking bookkeeper Saskatoon`<br/>49. `Armenian speaking business support Saskatoon`<br/>50. `SaskStartupSolutions Saskatoon` |

#### Editorial Guardrails from Strategy PDF:
* **No "Near Me" Keyword Stuffing:** Managed strictly through Schema geo-coordinates (`52.1388, -106.6853`), not spammy body copy.
* **Exclude Government Terms:** Do not target "business registration office Saskatoon" to avoid visitors seeking the government desk.
* **Pricing Mentions:** Cite statutory ISC government registry fees; SaskStartupSolutions custom pricing is quoted during free discovery calls.
* **Timeline Cautions:** Never guarantee fixed turnaround times for government ISC registry approvals.


### SEO Action Plan & Roadmap:

#### Phase 1: Technical SEO & Rich Schema Markup
1. **Robots.txt & Sitemap Synchronization:**
   - Update `robots.txt` to reference `/sitemap.xml` directly alongside `/api/sitemap.xml`.
   - Update `frontend/public/sitemap.xml` with `<changefreq>`, `<priority>`, and exact current `<lastmod>`.
2. **Schema.org Upgrade:**
   - In `frontend/public/index.html` and `frontend/src/components/Seo.jsx`:
     - Upgrade `@type: "LocalBusiness"` to `@type: "AccountingService"` and `"FinancialService"`.
     - Inject precise Saskatoon geo-coordinates: `latitude: 52.1388`, `longitude: -106.6853`.
     - Add `hasOfferCatalog` with Bookkeeping, T2 Tax Filing, and ISC Corporate Registry services.
     - Add `OpeningHoursSpecification` (8 AM - 8 PM daily).
     - Link `sameAs` schema with Google Maps, LinkedIn, OpenStreetMap, and social bio hubs.
3. **SPA Prerendering / Meta Fallbacks:**
   - Ensure clean title, description, and canonical fallbacks for search engine bots that do not execute client-side JavaScript.
4. **Image SEO & Core Web Vitals:**
   - Ensure all `<img>` tags in `Home.jsx`, `Services.jsx`, `Staff.jsx` have explicit width, height, and keyword-rich `alt` attributes.

#### Phase 2: On-Page Optimization & Content Hierarchy
1. **Title & Meta Tag Matrix:**
   - **Home (`/`):** *"Vici SaskStartupSolutions | Saskatoon Bookkeeping, T2 Tax & ISC Registry"*
   - **Services (`/services`):** *"Accounting & Bookkeeping Services Saskatoon | T2 Corporate Tax & ISC"*
   - **Booking (`/booking`):** *"Book Small Business Accounting Consultation | Saskatoon, SK"*
   - **Staff (`/staff`):** *"Patrick Vachon | Principal Practice Lead | Vici SaskStartupSolutions"*
   - **FAQ (`/faq`):** *"Saskatchewan Business Accounting & Tax FAQ | Vici SaskStartupSolutions"*
   - **Contact (`/contact`):** *"Contact Vici SaskStartupSolutions | Saskatoon Office & Support"*
2. **Heading Tag Structure (`H1` &rarr; `H2` &rarr; `H3`):**
   - Audit and enforce exactly one semantic `<h1>` per page containing primary target keywords.
   - Refactor visual subheadings to semantic `<h2>` and `<h3>`.
3. **Internal Linking Mesh:**
   - Contextually link the 3 blog posts to `/services` and `/booking` with descriptive anchor text.

#### Phase 3: Local Saskatoon & Saskatchewan SEO
1. **Local NAP Consistency:** Enforce exact string match across footer, contact page, and structured data:
   `539 Avenue I N, Saskatoon, SK S7L 2G9` | `1 (306) 960-0091`.
2. **Local Geo-Targeting Signals:** Geo meta tags (`geo.region: CA-SK`, `geo.placename: Saskatoon`, `geo.position`).

#### Phase 4: AEO / AI Search Engine Optimization (LLM Discovery)
1. **`llms.txt` Enhancement:** Ensure `frontend/public/llms.txt` clearly outlines company services, pricing policy, and contact info for Perplexity, ChatGPT, and Claude bots.
2. **FAQ Schema:** Inject `FAQPage` JSON-LD schema into `Faq.jsx` so Google and AI search engines can render rich snippet answers.

---

## 9. Directives for Successor AI Agent

If you are a new AI agent resuming this session:
1. **Read this file thoroughly** — all necessary context is right here.
2. **Check git status:** `git status` (should be on `main`).
3. **Do not repeat backlinking** — off-page backlinking is finished.
4. **Current Next Step:** Proceed with **Phase 1: Technical SEO & Rich Schema Markup** as outlined in Section 8 above.
5. **After making code edits:**
   - Recompile the frontend: `cd frontend && yarn build`.
   - Verify the server: `curl -I http://localhost:3000`.
   - Commit and push to GitHub: `git add . && git commit -m "..." && git push origin main`.
   - Update this `context.md` file with the completed changes.
