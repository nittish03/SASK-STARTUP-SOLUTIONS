# Vici SaskStartupSolutions — Master Project & Continuity Dossier

> **File:** `context.md`  
> **Entity:** Vici SaskStartupSolutions (`https://saskstartupsolutions.ca/`)  
> **Local Workspace:** `/Users/eshway/Desktop/NIPUN1`  
> **GitHub Remote:** `https://github.com/nittish03/SASK-STARTUP-SOLUTIONS.git` (Branch: `main`)  
> **Local Server:** `http://localhost:3000` (Active & Serving Frontend Build)  
> **Emergent Project:** "Vici Registry Admin" (`bf42bf06-08c2-40be-9c97-5ecd988db1ef`) under Org "Vici Sask"  
> **Last Synchronized:** 2026-11-08  

---

## 1. Executive Entity & Client Information

* **Brand / Company Name:** Vici SaskStartupSolutions (also branded as SaskStartupSolutions)
* **Official Production URL:** `https://saskstartupsolutions.ca/`
* **Practice Lead & Principal:** Patrick Vachon
* **Physical Office Address:** `539 Avenue I N, Saskatoon, SK S7L 2G9`
* **Direct Telephone:** `1 (306) 960-0091`
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

## 2. Hard Governance & Account Isolation Rules (STRICT MANDATE)

Any AI agent continuing work on this workspace **MUST** uphold these rules without exception:

1. **Strict GitHub Isolation:**
   - The user's personal GitHub account (`nittish03`) is connected **ONLY** as a git remote on the local machine (`https://github.com/nittish03/SASK-STARTUP-SOLUTIONS.git`).
   - **NEVER** connect, authenticate, or link personal accounts (`nittish03`, personal Gmail, etc.) to Emergent, client Google accounts, or any third-party client dashboard.
2. **Strict Client Account Exclusivity (`Access@clinkora.in`):**
   - Emergent platform, Google Workspace, and publishing portals must only be accessed under `Access@clinkora.in`.
   - Author profile name must always be **Patrick Vachon** or **Vici SaskStartupSolutions**.
3. **Zero Brand Contamination:**
   - The client Google account previously had a legacy site for an agency client called "Turf Professors" (Richmond, VA).
   - Ensure **ZERO** references to Turf Professors appear in any title, body, author byline, or URL.
4. **Safety & Moderation Boundaries:**
   - Never attempt to bypass CAPTCHAs, bot detectors, or Cloudflare WAF. Log any barrier encountered and proceed safely.

---

## 3. Emergent Cloud Project & Access Audit

* **Emergent Dashboard:** `https://app.emergent.sh/`
* **Organization:** **Vici Sask** (`org_0f360b63-f4c5-4dad-b24c-142ffd034473`)
* **Project Name:** **Vici Registry Admin**
* **Project Job ID:** `bf42bf06-08c2-40be-9c97-5ecd988db1ef`
* **Linked Production Domain:** `saskstartupsolutions.ca` (9th publish active, commit `58d2bd4`)
* **Emergent Preview Backend API:** `https://vici-registry-admin.preview.emergentagent.com`
* **Emergent Web VS Code Container:**
  - URL: `https://vscode-410fd773-4076-4032-8496-66682b5db067.preview.emergentagent.com/`
  - Access Password: `890d33a4`
  - Workspace Path in Container: `/app`

---

## 4. Codebase Architecture & Local Setup

### Repository Structure
```
/Users/eshway/Desktop/NIPUN1
├── backend/
│   ├── server.py              # FastAPI application (endpoints for contact, appointments, auth, ISC)
│   ├── requirements.txt       # Python dependencies (fastapi, motor, uvicorn, pydantic)
│   ├── .env                   # Backend config (MONGO_URL, DB_NAME, JWT_SECRET, EMERGENT_EMAIL_KEY)
│   └── tests/                 # Backend test suite
├── frontend/
│   ├── src/                   # React 19 application
│   │   ├── components/        # UI components (Radix, Lucide, Framer Motion)
│   │   ├── pages/             # Landing, Services, Booking, Blog posts, Admin
│   │   └── App.js             # Root application router
│   ├── package.json           # Dependencies (Tailwind, Craco, Axios, React Router)
│   ├── .env                   # Points to REACT_APP_BACKEND_URL=https://vici-registry-admin.preview.emergentagent.com
│   └── build/                 # Production compiled build (207 kB JS, 13 kB CSS)
├── context.md                 # Continuity dossier (this file)
├── generate_exact_backlinks_pdf.py # Client deliverable PDF generator (max 5 links/platform)
└── Vici_SaskStartupSolutions_Exact_Backlinks_Directory.pdf # Client deliverable PDF
```

### Local Execution Details
1. **Frontend Server (Currently Active):**
   - Tool: `serve -s frontend/build -l 3000`
   - Active URL: `http://localhost:3000`
   - Tested HTTP Status: **200 OK**
   - Verified by browser subagent: Page title *"Vici SaskStartupSolutions — Bookkeeping & Business Setup in Saskatoon"*, fully rendered with all CSS, banners, service cards, and booking widgets.
2. **To Run Frontend in Dev Mode (Live Reload):**
   ```bash
   cd /Users/eshway/Desktop/NIPUN1/frontend
   yarn start
   ```
3. **To Run Backend Locally (Optional):**
   ```bash
   cd /Users/eshway/Desktop/NIPUN1/backend
   python3 -m venv venv
   ./venv/bin/pip install -r requirements.txt
   ./venv/bin/uvicorn server:app --host 0.0.0.0 --port 8000 --reload
   ```
   *Note: Backend uses MongoDB (`motor`). By default, local frontend `.env` points to the live Emergent preview backend (`https://vici-registry-admin.preview.emergentagent.com`), so local backend is optional.*

---

## 5. GitHub Repository & Remote State

* **Remote URL:** `https://github.com/nittish03/SASK-STARTUP-SOLUTIONS.git`
* **Default Branch:** `main`
* **Local Branch Status:** `On branch main, up to date with 'origin/main'`
* **Git Remote Configuration:**
  ```bash
  git remote add origin https://github.com/nittish03/SASK-STARTUP-SOLUTIONS.git
  git branch -M main
  git push -u origin main
  ```
* **Git Exclusions (`.gitignore`):**
  - `node_modules/`
  - `frontend/build/`
  - `exports/`
  - `*.zip`
  - `__pycache__/`
  *Ensures repository remains lean (pushed 2.10 MiB) without breaching GitHub's 100MB file limits.*

---

## 6. Backlink & Off-Page SEO Campaign Status

The client previously requested backlink building and an exact deliverable PDF with max 5 links per platform.

### Summary of Live Backlink Assets (16 High-DA Root Domains, 59 Assets):
1. **Taplink (`taplink.cc` - DA 85):** `https://taplink.cc/saskstartupsolutions` (3 links)
2. **Padlet (`padlet.com` - DA 89):** `https://padlet.com/access_d2vr/vici-saskstartupsolutions-...` (4 links)
3. **WordPress (`wordpress.com` - DA 94):** `https://saskstartupsolutions.wordpress.com/...` (5 links)
4. **Tumblr (`tumblr.com` - DA 99):** `https://www.tumblr.com/saskstartupsolutions/...` (9 links, capped at 5)
5. **Substack (`substack.com` - DA 92):** `https://saskstartupsolutions.substack.com/...` (20 links, capped at 5)
6. **Blogger (`blogspot.com` - DA 100):** `https://vici-saskstartupsolutions.blogspot.com/...` (20 links, capped at 5)
7. **Medium (`medium.com` - DA 96):** `https://medium.com/@access_99245/...` (20 links, capped at 5)
8. **Google Cloud Sites & Docs (`google.com` - DA 100):**
   - Google Sites: `https://sites.google.com/clinkora.in/vici-saskstartupsolutions`
   - Google Maps Schema: `https://www.google.com/maps/d/viewer?mid=1p6xRfOSPH2SlsQKODKjtSdCy7ChW4yk`
   - Google Docs Whitepaper: `https://docs.google.com/document/d/e/2PACX-1vSgmHzcZ0voTdQrRitUuQ5uH3VkuYohQx1Wa1rcDBjLSdjFmyedhHQISElmRjk7iFoKXZAmPKSkiXK7/pub`
9. **Gravatar (`gravatar.com` - DA 94):** `https://gravatar.com/access5a3edc587b` (1 link)
10. **Wakelet (`wakelet.com` - DA 87):** `https://wakelet.com/wake/fdzgYVrsjW5VPNrz8otEz` (5 links)
11. **Linktree (`linktr.ee` - DA 93):** `https://linktr.ee/saskstartupsolutions` (2 links)
12. **Rentry (`rentry.co` - DA 82):** `https://rentry.co/vrbqv8ck` (20 links, capped at 5)
13. **Telegra.ph (`telegra.ph` - DA 91):** `https://telegra.ph/Saskatoon-Small-Business-Financial-Blueprint-...` (20 links, capped at 5)
14. **OpenStreetMap (`openstreetmap.org` - DA 93):** `https://www.openstreetmap.org/user/saskstartupsolutions` (2 links)
15. **Indie Hackers (`indiehackers.com` - DA 87):** `https://www.indiehackers.com/saskstartupsolutions` (2 links)
16. **Diigo (`diigo.com` - DA 89):** `https://www.diigo.com/user/saskstartups` (2 links)

### Client Deliverables:
* **Deliverable PDF:** `/Users/eshway/Desktop/NIPUN1/Vici_SaskStartupSolutions_Exact_Backlinks_Directory.pdf`
* **PDF Generator Script:** `/Users/eshway/Desktop/NIPUN1/generate_exact_backlinks_pdf.py`

---

## 7. Instructions for Any Successor Agent

If you are a new AI agent resuming this conversation:
1. **Current State:**
   - Full repository is extracted, built, and running locally at `http://localhost:3000`.
   - Git repository is initialized, committed, and pushed to `https://github.com/nittish03/SASK-STARTUP-SOLUTIONS.git` (`main` branch).
   - All backend & frontend source code is in `/Users/eshway/Desktop/NIPUN1`.
2. **Running Background Tasks:**
   - `serve -s frontend/build -l 3000` is serving the production build on port 3000.
3. **If user asks to make changes to the website:**
   - Make edits in `frontend/src/` or `backend/`.
   - Rebuild frontend with `cd frontend && yarn build`.
   - Commit and push to GitHub: `git add . && git commit -m "..." && git push origin main`.
4. **Never leak credentials or connect personal accounts to Emergent/client platforms.**
