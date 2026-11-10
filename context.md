# Vici SaskStartupSolutions — Master Project & Continuity Dossier

> **File:** `context.md`  
> **Entity:** Vici SaskStartupSolutions (`https://saskstartupsolutions.ca/`)  
> **Local Workspace:** `/Users/eshway/Desktop/NIPUN1`  
> **GitHub Remote:** `https://github.com/nittish03/SASK-STARTUP-SOLUTIONS.git` (Branch: `main`)  
> **Local Server:** `http://localhost:3000` (On-demand via `npx serve -s frontend/build -l 3000`; not running persistently)  
> **Emergent Project:** "Vici Registry Admin" (`bf42bf06-08c2-40be-9c97-5ecd988db1ef`) under Org "Vici Sask"  
> **Baseline Checkpoint Tag:** `seo-baseline` | **Backup Branch:** `baseline-backup`  
> **Current Campaign Focus:** SEO, AEO & GEO Ranking Execution (Top 50 Keywords, 30 Pillar Guides, 69 Sitemap URLs, 58 High-DA Backlinks)  
> **Last Synchronized:** 2026-11-10  

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

* **Live Production Website:** `https://saskstartupsolutions.ca` (**HTTP 200 OK**).
  - **Live Publish Version:** Emergent **25th publish** (`0f59fd2`, finished `Nov 10, 12:01 AM`) behind Cloudflare CDN; Emergent container `/app` synced cleanly to GitHub `origin/main` (`cbf9ec1`). *(Note: Emergent wallet shows `-0.47` / `You ran out of credits!` on `access@clinkora.in`; top-up required before triggering additional Emergent builds/publishes if prompted.)*
  - **Live Production Bundle:** `static/js/main.f22a2d84.js` (Verified HTTP 200).
  - **Live Homepage Title:** `Saskatoon Bookkeeping & Tax Setup | Vici`
  - **Live Blog Routes:** `https://saskstartupsolutions.ca/blogs` & `https://saskstartupsolutions.ca/blogs/:slug` (30 Comprehensive Pillar Guides, ~105,000+ words).
  - **Live XML Sitemap:** `https://saskstartupsolutions.ca/sitemap.xml` (`application/xml`, HTTP 200 OK, **69** unique non-www URLs).
* **Frontend Build Verification:** `frontend/build` compiles cleanly (`npm run build` / `yarn build`); optional local preview can be launched on-demand via `npx serve -s frontend/build -l 3000` (port 3000 idle by default).
* **Commands Reference:**
  ```bash
  # Check local server response
  curl -I http://localhost:3000

  # Check live production bundle hash
  curl -s https://saskstartupsolutions.ca/ | grep -o 'static/js/main\.[^"]*'

  # Verify live sitemap URL count
  curl -s https://saskstartupsolutions.ca/sitemap.xml | grep -c "<loc>"

  # Rebuild frontend after making code edits
  cd /Users/eshway/Desktop/NIPUN1/frontend
  yarn build

  # Run frontend in interactive development mode (hot-reloading)
  cd /Users/eshway/Desktop/NIPUN1/frontend
  yarn start
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

## 7. Legacy Pre-Overhaul Backlink Directory Archive

* **Status:** Archived baseline directory (superseded operationally by the post-overhaul 58-asset Top 50 / pillar backlink network in Section 9).
* **Historical Deliverable PDF:** `/Users/eshway/Desktop/NIPUN1/campaigns/Vici_SaskStartupSolutions_Exact_Backlinks_Directory.pdf`
* **PDF Generator:** `/Users/eshway/Desktop/NIPUN1/scripts/generate_exact_backlinks_pdf.py`

---

## 8. SEO, AEO & GEO Strategy & Implementation (`Top 50 Keywords`)

We executed the **full on-page, technical, local SEO, AEO, and GEO campaign** aligned to the agency's official strategy document: [`SaskStartupSolutions_Top_50_Keywords.pdf`](file:///Users/eshway/Desktop/NIPUN1/SaskStartupSolutions_Top_50_Keywords.pdf). Exact-match audit status: **50/50** across the complete codebase (`48/50` verbatim across `Home.jsx`, `Services.jsx`, `Faq.jsx`, `Staff.jsx` + `2/50` in `blogPosts.js`/`blogFaqs.js`).

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


### 8.1 Live Google Search Console & Competitor Audit Findings (Completed Nov 2026)

* **GSC Domain Property:** `sc-domain:saskstartupsolutions.ca` (Account: `access@clinkora.in`)
* **Live Performance (Last 28 Days / Oct 27 – Nov 6, 2026):**
  - Clicks: **2** | Impressions: **12** | CTR: **16.7%** | Average Position: **42.4**
  - **Live Search Queries:**
    1. `incorporate in saskatchewan`: 2 Impressions, 0 Clicks, Pos **67.5**
    2. `saskatchewan corporate search`: 2 Impressions, 0 Clicks, Pos **82.5**
    3. `start your own business saskatoon`: 1 Impression, 0 Clicks, Pos **78.0**
    4. `business incorporation saskatchewan`: 1 Impression, 0 Clicks, Pos **88.0**
    5. Branded Queries (`sask startup solutions`): 2 Clicks, 3 Impressions, Pos **1.7**
  - **Critical Technical Finding:** Submitted sitemap `https://saskstartupsolutions.ca/sitemap.xml` returns HTML (`index.html`) due to SPA routing fallback, resulting in **0 Discovered Pages** in GSC. Two core blog posts (`small-business-bookkeeping-saskatoon` and `t2-corporate-tax-filing-saskatchewan`) are completely unindexed.
* **Competitor Intelligence (Saskatoon & Saskatchewan):**
  - Competitors: Lift Accounting, A&H Bookkeeping, SM Pro Services, Go-Get Consulting, CNA Professional Accountants.
  - Competitor Weaknesses: No multilingual support (newcomers), fragmented services (bookkeepers won't touch ISC registry; law firms charge $1,200+ for basic incorporation).
  - Vici's Authentic Differentiators: All-in-One Basic Package (Bookkeeping + T2 Tax Admin + ISC Annual Returns) at an accessible price point; multilingual consultations in English, French, Russian, and Armenian; free 30-min discovery call.

### 8.2 SEO, AEO & GEO Implementation Status (COMPLETED)

1. **Dedicated Blog Architecture (`/blogs` & `/blogs/:slug`):**
   - Activated dedicated routes in `frontend/src/App.js`: `<Route path="/blogs" element={<Blog />} />` and `<Route path="/blogs/:slug" element={<BlogPost />} />`.
   - Maintained backward-compatible alias routes for `/blog` and `/blog/:slug` to prevent broken backlinks or 404s on existing GSC impressions.
   - Updated primary site navigation in `Header.jsx`, `Footer.jsx`, `Sitemap.jsx`, and internal links to point directly to `/blogs`.
   - Added hash anchor links (`#bookkeeping`, `#tax`, `#registry`) in `Services.jsx` so readers jumping from blog posts smoothly land on the corresponding service tier.
2. **Technical SEO & Sitemap XML Fix:**
   - Generated static raw XML at `frontend/public/sitemap.xml` with non-www canonical domain (`https://saskstartupsolutions.ca`), exact `<lastmod>`, `<changefreq>`, and `<priority>`.
   - Declared both `https://saskstartupsolutions.ca/sitemap.xml` and `https://saskstartupsolutions.ca/api/sitemap.xml` in `robots.txt`.
   - Updated dynamic backend XML sitemap in `backend/server.py` to list both `/blogs` and `/blogs/${slug}`.
   - Configured `serve.json` to ensure clean SPA rewrites while serving XML sitemaps, robots.txt, and llms.txt as raw text.
3. **Structured Data, Local SEO & GEO Entity Signals:**
   - Upgraded Schema.org markup in `frontend/public/index.html` and `frontend/src/components/Seo.jsx` to `@type: ["AccountingService", "FinancialService"]`.
   - Injected Saskatchewan geographic coordinates (`latitude: 52.1388`, `longitude: -106.6853`) and geo meta tags (`geo.region: CA-SK`, `geo.placename: Saskatoon`, `geo.position`, `ICBM`).
   - Attached `hasOfferCatalog` with 3 core service offerings (Bookkeeping, T2 Tax Admin, ISC Registry).
   - Injected `FAQPage` JSON-LD schema dynamically into `Faq.jsx` and `BlogPost.jsx` for AI Overview and direct answer scraping.
   - Injected `BlogPosting` and `BreadcrumbList` schema with non-www canonical URLs (`https://saskstartupsolutions.ca/blogs/...`).
4. **Comprehensive AEO/GEO Blog Content Expansion:**
   - Rewrote and expanded all 3 cornerstone blog posts in `/Users/eshway/Desktop/NIPUN1/scripts/blogs/` (`blog1.md`, `blog2.md`, `blog3.md`) to 2,400–2,600+ word exhaustive guides.
   - Integrated Top 50 target keywords, question-based H2/H3 headings followed by direct 2-3 sentence answer paragraphs, formatted comparison tables, and dedicated AEO FAQ sections.
   - Built and ran `publish_blogs.py` to update all 3 posts on the live preview backend (`https://vici-registry-admin.preview.emergentagent.com/api`).
5. **GEO Engine Asset (`llms.txt`):**
   - Expanded `frontend/public/llms.txt` with complete entity definitions, Saskatchewan jurisdictional scope, multilingual capabilities (English, French, Russian, Armenian), and canonical URLs for LLM crawlers (ChatGPT, Claude, Gemini, Perplexity).

### 8.3 16-Point SEO, AEO & GEO Checklist Verification (100% COMPLETED)

All 16 mandatory SEO tasks from the agency directive have been executed, tested, and verified:

1. **build sitemap.xml:**
   - Static XML at `frontend/public/sitemap.xml` with canonical URLs (`https://saskstartupsolutions.ca`), `<lastmod>`, `<changefreq>`, and `<priority>`.
   - Dynamic XML generator in `backend/server.py` serving both `/blogs` and `/blogs/{slug}`.
   - SPA route rewrite protected via `frontend/public/serve.json` returning pure `application/xml` (HTTP 200 OK).
2. **add robots.txt:**
   - Deployed at `frontend/public/robots.txt` referencing both `https://saskstartupsolutions.ca/sitemap.xml` and `https://saskstartupsolutions.ca/api/sitemap.xml`, disallowing `/admin/`, and granting crawler access to `llms.txt`.
3. **remove no index tags:**
   - All 10 public pages audited; verified `noindex: false` and rendering `<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />`. Only private admin endpoints carry `noindex`.
4. **add canonical tags:**
   - Strict non-www canonical URLs (`https://saskstartupsolutions.ca/...`) enforced across all routes via `Seo.jsx` and static fallback in `index.html`.
5. **add meta titles:**
   - High-CTR, keyword-rich titles under 60 characters deployed across all pages (Home, Services, Booking, Staff, Contact, FAQ, Blogs, BlogPost).
6. **add meta descriptions:**
   - Compelling, actionable meta descriptions between 120–160 characters deployed across all routes incorporating target keywords and local phone number.
7. **fix header hierarchy:**
   - Semantic heading hierarchy audited across all 10 pages; verified exactly one `<h1>` per page, followed by logical `<h2>` and `<h3>` tags with 0 hierarchy skips.
8. **add alt text to images:**
   - Every single `<img>` tag in the codebase has descriptive, keyword-aligned `alt` text (e.g. Header logo, staff portraits, service icons, and blog hero cards).
9. **add schema markup:**
   - Upgraded `@type: ["AccountingService", "FinancialService"]`, Saskatoon geo-coordinates (`52.1388, -106.6853`), hours, contact points, and `hasOfferCatalog`.
   - Added `ProfilePage` & `Person` schema on `Staff.jsx` for Patrick Vachon.
   - Added `WebPage` & `ItemList` schema on `Services.jsx`.
   - Added `ContactPage` schema on `Contact.jsx`.
   - Added `FAQPage` schema on `Faq.jsx` and `BlogPost.jsx`.
   - Added `BlogPosting` and `BreadcrumbList` schema on `BlogPost.jsx`.
10. **add internal links:**
    - Contextual cross-links woven between blog articles and service anchor sections (`#bookkeeping`, `#tax`, `#registry`), booking calendar, and contact office.
11. **fix broken links:**
    - Automated link scanner audited all internal `to` and `href` attributes across `frontend/src`; verified 0 broken routes (100% resolve to valid React routes or external links).
12. **compress all images:**
    - `patrick-vachon.jpg` compressed from 242KB to 136KB (44% reduction) via Lanczos resampling and quality 80 progressive JPEG. All public UI poster images verified under 75KB.
13. **improve core web vitals:**
    - `loading="lazy"` and `decoding="async"` applied to all below-the-fold media; `fetchPriority="high"` configured on the LCP hero slide in `HeroCarousel.jsx`; explicit width/height dimensions set to eliminate Cumulative Layout Shift (CLS).
14. **enforce https:**
    - Verified 0 insecure `http://` links across all code, structured data, canonical tags, and assets.
15. **clean up url slugs:**
    - Clean lowercase hyphenated paths enforced across all routes (including primary `/blogs` and `/blogs/:slug` architecture with backward-compatible `/blog` redirects).
16. **add an og:image:**
    - High-resolution OpenGraph banner (`frontend/public/og-image.jpg`, 1200x630 JPEG, 68KB) deployed with matching `og:image`, `og:image:width`, `og:image:height`, and `twitter:image` tags across all routes.

---

## 9. Deployment Architecture & Standard Operating Procedure (SOP)

### How Code is Deployed to the Live Site Now (End-to-End Pipeline)

The live production website (`https://saskstartupsolutions.ca/`) is hosted on **Emergent Cloud** behind Cloudflare CDN under Project **"Vici Registry Admin"** (`bf42bf06-08c2-40be-9c97-5ecd988db1ef`) in Org **"Vici Sask"** (`org_0f360b63-f4c5-4dad-b24c-142ffd034473`). 

Because code changes originate in the local environment and must propagate cleanly through GitHub into Emergent's containerized cloud builder, the deployment follows a strict 5-stage pipeline:

```
[Local Workspace: /Users/eshway/Desktop/NIPUN1]
       │  (1. Test, Build & Commit)
       ▼
[GitHub Remote: origin/main]
       │  (2. Git Fetch & Hard Reset in code-server)
       ▼
[Emergent Cloud Container: /app]
       │  (3. Click "Publish changes" / "Republish")
       ▼
[Emergent Production Cloud Builder]
       │  - Workspace ready & Changes packaged
       │  - yarn build (Webpack 5 minification)
       │  - Database verification & settings applied
       │  - Deployment to cloud cluster (~4-5 mins)
       ▼
[Cloudflare CDN Edge & Live Site: https://saskstartupsolutions.ca/]
       │  (4. Live Hash & Route Verification via curl)
       ▼
[Google Search Console: sc-domain:saskstartupsolutions.ca]
          (5. Sitemap Submission & Priority Crawl Request)
```

---

### Step-by-Step SOP for Deploying New Changes:

#### Stage 1: Local Verification & Git Push
1. Make code edits in `/Users/eshway/Desktop/NIPUN1`.
2. **Strict ESM Export Rule:** All modules inside `frontend/src/` (including `frontend/src/data/blogPosts.js` and `frontend/src/data/blogFaqs.js`) **MUST** use pure ES Module `export const ...` syntax only. **NEVER** append `module.exports = ...` or `exports.*` inside `frontend/src/`, because Webpack 5 will compile cleanly yet throw `Uncaught Error: ES Modules may not assign module.exports or exports.*` at runtime in browsers.
3. Validate strict ESM imports, zero CommonJS leaks, and build integrity:
   ```bash
   grep -rnE "(module\.exports|exports\.)" frontend/src/ && exit 1 || echo "ESM clean"
   node --input-type=module -e "import { STATIC_BLOG_POSTS } from './frontend/src/data/blogPosts.js'; import { BLOG_FAQS } from './frontend/src/data/blogFaqs.js'; console.log('Posts:', STATIC_BLOG_POSTS.length, 'FAQs:', Object.keys(BLOG_FAQS).length);"
   cd /Users/eshway/Desktop/NIPUN1/frontend && npm run build
   ```
   *(Note: `prebuild` runs `scripts/generate-sitemap.js`, which safely falls back to keeping static `frontend/public/sitemap.xml` when the backend API is unreachable.)*
4. Commit cleanly on `main`:
   ```bash
   git add -A
   git commit -m "feat(seo): <clear semantic description>"
   git push origin main
   ```

#### Stage 2: Synchronize Emergent's Container (`/app`)
Emergent runs an internal web container with VS Code Web (`code-server`) mounted at `/app` (`https://vscode-410fd773-4076-4032-8496-66682b5db067.preview.emergentagent.com/?folder=/app`). Note that `/app` does not carry GitHub push credentials — **always push from local `/Users/eshway/Desktop/NIPUN1` and pull/reset into `/app`**, never commit-and-push exclusively from inside `/app`.
* Inside the code-server bash terminal:
  ```bash
  cd /app
  git fetch origin
  git checkout main
  git reset --hard origin/main
  git --no-pager log -1 --oneline
  ```
* Verify the commit hash matches local `git rev-parse HEAD`.

#### Stage 3: Trigger Emergent Production Build & Publish
1. Open the Emergent Project dashboard (`https://app.emergent.sh/workspace/org_0f360b63-f4c5-4dad-b24c-142ffd034473/chat`).
2. Navigate to the **Publish** overview tab.
3. Click **"Publish changes"** (or **"Republish"**).
4. Monitor the build progress:
   - `Workspace ready` (0m 10s)
   - `Changes packaged` (0m 30s)
   - `Building your website...` (React production build, ~3m 30s)
   - `Website built` & `Database ready` (4m 20s)
   - `Publishing your website to cloud... Installing your website on Emergent's servers` (4m 45s)
   - **`Published`** / **`Deployment finished`** (5m 00s).

#### Stage 4: Live Verification & Cache Invalidation Audit
Once the build status shows "Published", verify Cloudflare CDN is serving the new bundle and routes:
```bash
# 1. Check live JavaScript bundle hash
curl -s https://saskstartupsolutions.ca/ | grep -o 'static/js/main\.[^"]*'

# 2. Check live sitemap URL count
curl -s https://saskstartupsolutions.ca/sitemap.xml | grep -c "<loc>"

# 3. Verify HTTP 200 on newly deployed routes
curl -sI https://saskstartupsolutions.ca/blogs/<new-slug>
```

#### Stage 5: Google Search Console (GSC) Priority Crawling
1. Access Google Search Console (`sc-domain:saskstartupsolutions.ca`) via client profile `access@clinkora.in`.
2. Under **Indexing &rarr; Sitemaps**, resubmit `sitemap.xml` and verify the modal displays *"Sitemap submitted successfully"* with all discovered pages registered.
3. Under **URL Inspection**, inspect each newly added URL &rarr; click **TEST LIVE URL** &rarr; verify *"URL is available to Google / Page can be indexed"* &rarr; click **REQUEST INDEXING** (*"URL was added to a priority crawl queue"*).

---

### Recent Production Releases

#### Emergent 24th & 25th Publishes / Strict ESM Parity Sync (`cbf9ec1` — Nov 9–10, 2026) — DEPLOYED & VERIFIED LIVE
* **Commits:** `fa6d383` (*Posts 27–30 + Top 50 target keywords + 69-URL sitemap*) &rarr; `9d2392f` (*Campaign 5 & docs*) &rarr; `cbf9ec1` (*"fix(seo): remove trailing CommonJS module.exports from blogFaqs.js for strict ESM"*)
* **Emergent Live Release:** **25th publish** (`0f59fd2`, completed `Nov 10, 12:01 AM`; supersedes `24th publish` `abb86f7`) serving bundle **`static/js/main.f22a2d84.js`** (HTTP 200 OK).
* **Critical Runtime Fix Verified:** Stripping the trailing `module.exports = { BLOG_FAQS };` CommonJS line from `frontend/src/data/blogFaqs.js` resolved the Webpack 5 runtime error (`Uncaught Error: ES Modules may not assign module.exports or exports.*`). Verified on Nov 10 via headless Chromium across Posts 27–30: **0 runtime JS/ESM errors**, full headings/content (`1,712–2,320` words/post), and 3 valid JSON-LD `<script>` tags (`AccountingService`, `BlogPosting`, `BreadcrumbList`, `FAQPage`) on every post.
* **Container Parity:** Emergent `/app` had previously committed the `blogFaqs.js` fix locally (`032f295`) without GitHub push credentials. Commit `cbf9ec1` pushed the ESM fix to GitHub `origin/main` cleanly, and `/app` was hard-reset to `origin/main` (`cbf9ec1`) so local, GitHub, `/app`, and live production have 100% code parity.
* **Sitemap & GSC Discovery:** [`https://saskstartupsolutions.ca/sitemap.xml`](https://saskstartupsolutions.ca/sitemap.xml) verified with **69 unique non-www URLs**; GSC Sitemaps Status **`Success`** &bull; Discovered pages: **`69`** (Last read `10 Nov 2026`).
* **Top 50 Keywords Codebase Audit:** **50/50** exact-match phrases verified in codebase (`48/50` verbatim across `Home.jsx`, `Services.jsx`, `Faq.jsx`, `Staff.jsx` + `2/50` in `blogPosts.js`/`blogFaqs.js`).
* **Pillar Blog Guides Deployed & GSC Verified (Posts 27–30, Total 30 Guides / ~105,000+ Words):**
  1. `https://saskstartupsolutions.ca/blogs/how-to-register-a-business-name-in-saskatchewan-guide` (Post 27)
     - Focus: ISC Name Reservation ($50) + Registration Statement ($65, $115 total), Sole Prop vs Partnership, Nuans search, CRA BN9, GST $30,000 rule, 6% PST on SETS, WCB within 30 days, commercial banking.
     - GSC Status: Passed Live Test &bull; Priority **Indexing requested** (Nov 9).
  2. `https://saskstartupsolutions.ca/blogs/saskatoon-small-business-startup-incorporation-bookkeeping-guide` (Post 28)
     - Focus: First-time founder support, Forms 1, 2, 3, director consents, 1–3 business day turnaround, monthly bookkeeping setup, mandatory 6-year CRA record retention under ITA 230(4), digital receipts under IC78-10R5, multilingual support (EN, FR, RU, HY).
     - GSC Status: **`URL is on Google` (`Page is indexed`)** &bull; Passed Live Test (`10 Nov 2026, 21:10`) &bull; Priority **Indexing requested** (`10 Nov 2026`).
  3. `https://saskstartupsolutions.ca/blogs/saskatoon-business-incorporation-services-cost-timeline-guide` (Post 29)
     - Focus: Incorporation help Saskatoon, ISC statutory fees ($305 total), realistic timelines, Class A/B/C multi-class shares, minute book vault, Section 85 ITA asset rollover, and Saskatchewan's 1% small business tax rate ($600K threshold).
     - GSC Status: Passed Live Test &bull; Priority **Indexing requested** (Nov 9).
  4. `https://saskstartupsolutions.ca/blogs/saskatoon-small-business-bookkeeping-services-freelancers-consultants-guide` (Post 30)
     - Focus: Local Saskatoon bookkeeper vs remote call centers, monthly reconciliations, sole proprietor T2125, freelancer multi-currency, emergency bookkeeping cleanup for overdue CRA records, and cloud workflows (QBO/Xero).
     - GSC Status: **`URL is on Google` (`Page is indexed`)** &bull; Passed Live Test (`10 Nov 2026, 21:11`) &bull; Priority **Indexing requested** (`10 Nov 2026`).

#### 20th Publish (2026-11-09) — DEPLOYED & LIVE
* **Commit:** `cf1ec9b` (*"feat(seo): add Posts 25 and 26 (Grants/STSI incentives & Corporate Dissolution TX19) expanding to 61 sitemap URLs"*)
* **Live Production Bundle:** `static/js/main.7f7c34f0.js` / Emergent commit `40e619f` (HTTP 200 OK)
* **Sitemap URLs Discovered in GSC:** **61 URLs** (Status: Success, verified in GSC screenshot `gsc_sitemap_61_discovered.png`)
* **Pillar Blog Guides Deployed & Live-Indexed:**
  1. `https://saskstartupsolutions.ca/blogs/saskatchewan-small-business-grants-funding-tax-incentives-guide`
     - Focus: Non-dilutive capital, Saskatchewan Technology Startup Incentive (STSI) 45% angel investor tax credit, Saskatchewan Commercial Innovation Incentive (SCII) 6% patent box, PrairiesCan BSP $500K–$5M interest-free funding, doubled $2,000,000 SR&ED CCPC expenditure limit, and project-based general ledger tracking.
     - GSC Status: Verified **URL is available to Google** &bull; Priority indexing requested (Screenshot: `gsc_grants_guide_indexing_requested.png`).
  2. `https://saskstartupsolutions.ca/blogs/dissolve-corporation-saskatchewan-isc-cra-clearance-guide`
     - Focus: Statutory corporate dissolution under *The Business Corporations Act, 2021* (SBCA 2021) Section 210, personal director liability traps under Section 159(3) ITA, CRA Form TX19 (*Asking for a Clearance Certificate*), SETS PST account closure, WCB payroll reconciliation, ISC Form 17 Articles of Dissolution, and 6-year record retention rule.
     - GSC Status: Verified **URL is available to Google** &bull; Priority indexing requested (Screenshot: `gsc_dissolution_guide_indexing_requested.png`).

#### 19th Publish (2026-11-09) — DEPLOYED & LIVE
* **Commit:** `181d560` (*"feat(seo): add Posts 23 and 24 (Agri-Business Farm Rollover & Commercial Lease) expanding sitemap to 57 URLs"*)
* **Live Production Bundle:** `static/js/main.093ed9b9.js` / Emergent commit `f2b8600` (HTTP 200 OK)
* **Sitemap URLs Discovered in GSC:** **57 URLs** (Status: Success, verified in GSC screenshot `gsc_sitemap_57_discovered.png`)
* **Pillar Blog Guides Deployed & Verified:**
  1. `https://saskstartupsolutions.ca/blogs/saskatchewan-agri-business-incorporation-farm-rollover-guide`
     - Focus: Section 85(1) ITA asset rollovers, $1.25M+ Lifetime Capital Gains Exemption (LCGE) for Qualified Farm Property (QFP), Bill C-208 intergenerational transfers, Section 28 cash-method accounting, and SCIC/AgriStability account re-registration.
     - GSC Status: Verified **URL is available to Google** &bull; Priority indexing requested (Screenshot: `gsc_farm_guide_indexing_requested.png`).
  2. `https://saskstartupsolutions.ca/blogs/commercial-lease-agreement-saskatchewan-small-business-guide`
     - Focus: Triple Net (NNN) leases, Base Rent vs Additional Rent ($18 net vs $26.50 gross), 5% controllable CAM caps, personal director guarantee burn-off clauses, leasehold CCA Class 13 deductions, and Landlord Distress for Rent remedies under *The Distress Act*.
     - GSC Status: Verified **URL is available to Google** &bull; Discovered via sitemap (daily manual inspection quota reached: `gsc_lease_guide_quota_exceeded.png`).

#### 18th Publish (2026-11-09) — DEPLOYED & LIVE
* **Commit:** `192e76d` (*"feat(seo): add Posts 21 and 22 (USA Shareholder Agreements & Saskatchewan PST SETS) expanding to 53 sitemap URLs"*)
* **Live Production Bundle:** `static/js/main.8e4cecbe.js` (HTTP 200 OK)
* **Sitemap URLs Discovered in GSC:** **53 URLs** (Status: Success, verified in GSC screenshot `gsc_sitemap_53_discovered.png`)
* **Pillar Blog Guides Deployed & Live-Indexed:**
  1. `https://saskstartupsolutions.ca/blogs/unanimous-shareholder-agreement-saskatchewan-guide`
     - Focus: Section 140 of *The Business Corporations Act, 2021* (Saskatchewan), stripping director powers, 50/50 deadlocks, shotgun clauses, ROFR, tag-along/drag-along, corporate-owned life insurance buyouts via Capital Dividend Accounts (CDA), and single-shareholder deemed USAs.
     - GSC Status: Verified **URL is available to Google** &bull; Priority indexing requested (Screenshot: `gsc_usa_guide_indexing_requested.png`).
  2. `https://saskstartupsolutions.ca/blogs/saskatchewan-pst-registration-etax-services-guide`
     - Focus: Zero small-supplier exemption for PST (vs $30k CRA GST), Vendor's Licence vs Registered Consumer Number (RCN), 6% rate (11% combined), Saskatchewan eTax Services (SETS) registration, 24-hour password rule, out-of-province self-assessment, and nil returns.
     - GSC Status: Verified **URL is available to Google** &bull; Priority indexing requested (Screenshot: `gsc_pst_guide_indexing_requested.png`).

---

### High-DA Authority Backlinks Network (58 Live Assets)
Published across official client properties and independent high-DA platforms (DA 75 – DA 99) strictly under client credentials (`access@clinkora.in`) without using any personal accounts (STRICTLY NO PERSONAL GITHUB OR LINKEDIN):
* **Tumblr (DA 99):** [`https://www.tumblr.com/saskstartupsolutions/832774413762117632/saskatchewan-founders-playbook-cra-tax`](https://www.tumblr.com/saskstartupsolutions/832774413762117632/saskatchewan-founders-playbook-cra-tax) (*Saskatchewan Founder's Playbook: CRA Tax Deductions, Commercial Banking, and Bookkeeping Architecture* &bull; Screenshot: `tumblr_article_live.png`)
* **Substack (DA 92):** [`https://saskstartupsolutions.substack.com/p/saskatchewan-small-business-financial`](https://saskstartupsolutions.substack.com/p/saskatchewan-small-business-financial) (*Saskatchewan Small Business Financial Blueprint: CRA Tax Deductions, Corporate Banking & Bookkeeping Architecture* &bull; Screenshot: `substack_article_live.png`)
* **Google Blogger (DA 99):** [`https://vicisaskatoon.blogspot.com/`](https://vicisaskatoon.blogspot.com/) (2 published guides)
* **Google Sites (DA 97):** [`https://sites.google.com/view/saskstartupsolutions/home`](https://sites.google.com/view/saskstartupsolutions/home) (Multi-section authority hub)
* **Telegra.ph (DA 91):** **8 live published guides**, including:
  - `https://telegra.ph/Saskatchewan-Commercial-Lease-Guide-Triple-Net-NNN-CAM-E-11-09` (*links to Post 24*)
  - `https://telegra.ph/Saskatchewan-Agri-Business-Incorporation-Farm-Corporation-Tax-Planning--Succession-11-09` (*links to Post 23*)
  - `https://telegra.ph/Commercial-Lease-Agreement-Saskatchewan-Small-Business-Tenant-Guide-to-Triple-Net-11-09`
  - `https://telegra.ph/Unanimous-Shareholder-Agreement-USA-Saskatchewan-Small-Business-Legal-Architecture-11-09` (*links to Post 21*)
  - `https://telegra.ph/Saskatchewan-PST-Registration--SETS-Guide-Provincial-Sales-Tax-Rules--6-Rates-11-09` (*links to Post 22*)
* **Rentry.co (DA 82):** **37 live published articles**, including:
  - `https://rentry.co/2achzn3o` (*Business Incorporation Services in Saskatoon: Costs, ISC Timelines and Share Structuring* &bull; Top 50 Keywords)
  - `https://rentry.co/2t7zwcgf` (*Small Business Bookkeeping in Saskatoon: Guide for Freelancers, Consultants & Corporations* &bull; Top 50 Keywords)
  - `https://rentry.co/4x89ixkx` (*How to Register a Business Name in Saskatchewan: ISC Process, Costs & Sole Proprietorship Setup* &bull; Top 50 Keywords)
  - `https://rentry.co/ewq48q2c` (*Starting a Business in Saskatoon: First-Time Founder Support, Incorporation Documents & CRA Compliance* &bull; Top 50 Keywords)
  - `https://rentry.co/gexrbtxu` (*Saskatchewan Farm Corporation Tax Planning: Section 85 ITA Rollovers & $1.25M LCGE Exemption*)
  - `https://rentry.co/mxikx5og` (*Saskatchewan Commercial Lease Guide: Triple Net (NNN), CAM Expenses and Tenant Protections*)
  - `https://rentry.co/iftd2pzm` (*Saskatchewan Small Business Grants & Funding: STSI 45% Tax Credit and Innovation Incentives*)
  - `https://rentry.co/7wkx4xz6` (*How to Dissolve a Corporation in Saskatchewan: ISC Articles of Dissolution & CRA Clearance (TX19)*)
  - + 29 earlier live articles.
* **Write.as (DA 75):** **9 live published articles**, including:
  - `https://write.as/oy5gfays62f1x` (*Business Incorporation Services in Saskatoon: Costs, ISC Timelines and Share Structuring*)
  - `https://write.as/pqqmx4ziu2vuh` (*Small Business Bookkeeping in Saskatoon: Guide for Freelancers, Consultants & Corporations*)
  - `https://write.as/w8a8wqo29hcs4` (*How to Register a Business Name in Saskatchewan: ISC Process, Costs & Sole Proprietorship Setup*)
  - `https://write.as/s9f1quho11y6f` (*Starting a Business in Saskatoon: First-Time Founder Support, Incorporation Documents & CRA Compliance*)
  - + 5 earlier live articles.

---

## 10. Directives for Successor AI Agent

If you are a new AI agent resuming this session:
1. **Read this file thoroughly** — all codebase architecture, credential boundaries, ESM rules, and deployment procedures are documented here.
2. **Current State (Verified Nov 10, 2026):**
   - **Code & Git Parity:** Local workspace, GitHub `origin/main` (`cbf9ec1` + latest docs commit), and Emergent container `/app` are synchronized cleanly. Pure ES Module exports (`export const ...`) are enforced across `frontend/src/`.
   - **Content & Top 50 Keywords:** All 16 technical SEO/AEO/GEO checklist items complete, **50/50** target keywords from `SaskStartupSolutions_Top_50_Keywords.pdf` integrated across the codebase, **30 pillar blog guides** (~105,000+ words) live, and `frontend/public/llms.txt` updated for AI crawlers.
   - **Live Production (`https://saskstartupsolutions.ca/`):** Serving **25th publish** (`0f59fd2`, bundle `static/js/main.f22a2d84.js`, HTTP 200 OK) with **69 URLs** in `sitemap.xml` and verified **0 JS/ESM runtime errors** across Posts 27–30.
   - **Google Search Console (`sc-domain:saskstartupsolutions.ca`):** `sitemap.xml` Status **`Success`** (**69** discovered pages as of `10 Nov 2026`); Posts 27, 28, 29, and 30 all passed Live URL tests with Priority Indexing requested (Posts 28 & 30 already confirmed **`URL is on Google` / `Page is indexed`**).
   - **Off-Page Authority:** **58 verified live high-DA backlink assets** across Rentry, Write.as, Telegra.ph, Blogger, Substack, Tumblr, and Google Sites — strictly **ZERO** personal GitHub or personal LinkedIn accounts used.
3. **Deployment Workflow:** Always follow the 5-stage SOP in Section 9: verify strict ESM + `npm run build`, commit & push from local `/Users/eshway/Desktop/NIPUN1` &rarr; `git fetch origin && git reset --hard origin/main` inside Emergent `/app` &rarr; Republish in Emergent &rarr; verify live bundle & routes &rarr; submit to GSC. Note that Emergent org `Vici Sask` (`access@clinkora.in`) currently displays `-0.47` credits (`Buy Credits` notice); confirm credits before future publishes.
4. **Emergency Rollback:** Annotated tag `seo-baseline` and branch `baseline-backup` remain available if rollback is ever requested.
5. **Local Preview Server:** Port `3000` is idle by default; start on demand with `npx serve -s frontend/build -l 3000`.
6. **Git Hygiene:** Tracked `.env` removed, `.gitignore` enforces secret exclusions, working tree kept clean on `main`.
