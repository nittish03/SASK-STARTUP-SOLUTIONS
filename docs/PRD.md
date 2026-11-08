# Vici SaskStartupSolutions — PRD

## Original Problem Statement
Multi-page marketing + booking website for Vici SaskStartupSolutions (Saskatoon, SK): bookkeeping, T2 corporate tax filing administration, and Saskatchewan ISC Registry administration for startups. Exact 6-colour palette (#F6F7ED, #DBE64C, #001F3F, #74C365, #00804C, #1E488F), serif editorial typography (uppercase section headings), sans-serif nav/buttons, sticky #DBE64C header with stacked serif wordmark, #001F3F footer, 5 pages (Home, Booking, Staff, Contact Us, FAQ), working booking flow with email notifications, contact form with reCAPTCHA, downloadable intake forms, LocalBusiness SEO schema, WCAG AA, no pricing displayed. User chose DEMO mode for emails, reCAPTCHA, and booking (no real availability blocking).

## Architecture
- Frontend: React 19 + react-router-dom 7, Tailwind (brand tokens: praxeti=#FFFFFF white, spring=#FDD401 Saskatchewan flag yellow, midnight=#000000 black, mantis=#74C365 button green, bookgreen=#076A21 Saskatchewan flag green, nuit=#000000), Newsreader serif + Instrument Sans, framer-motion (masked line reveals, scroll reveals), lenis smooth scroll.

## Brand update (Patrick's email, applied 2026-10)
- Colours switched to Saskatchewan flag green #076A21 and flag yellow #FDD401 site-wide; ALL text is pure white or black.
- Homepage hero rebuilt: text left + rotating 3-image carousel right (HeroCarousel). Slides: 1) A real conversation first — let's review your business and know where you stand; 2) Every filing on time — without fear of deadlines; 3) Up-to-date bookkeeping — for an accurate pulse of your business. Auto-rotates 5s, arrows, dots, pauses on hover.
- Copy change: headline "...We'll Handle the Paperwork." and "We take the paperwork off your plate" (was "compliance"/"compliance work").
- Footer is now black with white text.
- Backend: FastAPI + Motor/MongoDB. Endpoints: GET /api/health, GET /api/services, POST/GET /api/bookings, POST/GET /api/contact, GET /api/notifications, GET /api/intake-forms/{slug} (reportlab-generated branded PDF per service, 5 slugs).
- Emails: MOCKED — booking confirmations and contact notifications stored in `notifications` collection with status `mocked_not_sent`.
- reCAPTCHA: MOCKED — demo checkbox; backend rejects contact submissions with recaptcha=false.

## User Personas
- Saskatchewan startup founder needing compliance help (bookkeeping/T2/ISC).
- Growing company owner wanting the all-in-one Basic Package.

## Implemented (2026-07 / build 1)
- 5 pages with exact copy and palette; sticky header (wordmark, nav, Book Now pill, search modal, account modal, mobile hamburger); footer with links + © 2026.
- Home: kinetic masked-line hero on #00804C with parallax gradient blobs, editorial marquee, 5 featured service rows with Submit Intake Form buttons, numbered manifesto brand story.
- Booking: intro, banner, "Open until 8:00 p.m.", Services/Staff toggle, full service menu with exact copy, 4-step booking flow (service → date/time → details → confirmation with reference), intake form PDF downloads, intake email instructions.
- Staff: Patrick Vachon profile card (founder, title/bio placeholders).
- Contact: info card, Get Directions button, embedded Google map, hours, contact form with demo reCAPTCHA + Google Privacy/Terms notice.
- FAQ: 6-item accordion with placeholder Q&As.
- Services page (/services): full detailed service descriptions (Bookkeeping, T2 Filing, ISC Registry, Basic Package "Best Value", free Introduction) with per-service FAQ accordions, durations, alternating image blocks (5 fresh Pexels photos, verified not used elsewhere on site: 4476378, 7821934, 11482790, 7718714, 3874033), and Book Now buttons linking to /booking; closing CTA section. Nav order now Home | Services | Staff | Booking | Contact Us | FAQ (header + footer + search index).
- Photography: curated Saskatoon photos with parallax treatment — Home has a "Proudly local" editorial gallery (skyline, bridge, riverfront); Booking has a full-width bridge image band above the service menu and an office photo beside the intake form downloads.
- Media carousel (Home, "The work behind your growth"): 6-slide Embla carousel mixing 3 verified Pexels videos (bookkeeping desk work, business meeting, calculator close-up — local poster images in /public/media) with 3 Saskatoon photos; arrows, dots, counter, 6s auto-advance with hover pause, reduced-motion aware.
- SEO: meta title/description, OG tags, LocalBusiness JSON-LD.
- Admin dashboard (/admin, 2026-10): JWT auth (bcrypt, httpOnly cookies + Bearer, 15-min access / 7-day refresh, brute-force lockout 5 attempts/15 min). Seeded admin (see test_credentials.md; password reconciles from backend/.env). Tabs: Bookings (all submissions), Messages (contact form), FAQs (add/edit/delete — public FAQ page reads live from DB via GET /api/faqs with static fallback). Header account icon now routes to /admin. Bookings/contacts/notifications GET endpoints are now auth-protected (401 public).
- Booking portal (/portal, 2026-10): shareable link, BOOKING-ONLY (staff tab removed per user's single-admin decision). Shares the BookingFlow component with /booking.
- Booking management + statuses (2026-10): bookings have status (pending default; startup migration set existing rows to pending). Admin dashboard Bookings tab: search (name/email/service/phone), status filter pills (All/Pending/Approved/Declined/Completed), click row → detail modal (name, email, phone, service, date/time, reference, notes) with status buttons. PATCH /api/bookings/{id}/status (admin-only, validates status). Google Calendar: server-side service-account sync (google-api-python-client) — creates event on approve (duplicate-safe via google_event_id), removes event on decline/complete, timezone America/Regina. Requires GOOGLE_SERVICE_ACCOUNT_JSON + GOOGLE_CALENDAR_ID in backend/.env — NOT configured yet; admin UI shows a setup banner and approve reports "not_configured" honestly. GET /api/calendar/status (admin). Staff account deleted; users collection = single admin only.
- Delete + cleanup (2026-10): DELETE /api/bookings/{id} and /api/contacts/{id} (admin-only; booking delete also removes its calendar event). Admin UI: "Delete Booking" button in the booking detail modal, per-message trash button in Messages tab, both with confirm dialogs. All test data purged 2026-10 (6 bookings, 2 contacts, 8 mock notifications deleted — dashboard starts clean).

## CMS + Blog upgrade (2026-10)
- Content editor (Admin → Content tab): editable text/images for Home, Services (incl. per-service description/image/optional price label), Staff, Contact, Footer. Draft → Preview (?preview=1 while logged in) → Publish flow; last 5 published revisions with restore. Public GET /api/content/{key} serves published only; draft endpoint is admin-only. Pages fall back to hardcoded default copy.
- Design tab: theme colors (spring/bookgreen/mantis as CSS vars), 3 font presets, 3 button styles, hero carousel slides (image+alt+captions), homepage section visibility + reorder.
- Blog: /blog + /blog/:slug public pages; admin Blog tab with title, slug, markdown content (headings/bold/italic/links/images via components/Markdown.jsx), featured image, SEO title/description, author, draft/publish/unpublish/delete. Drafts are 404 publicly. Dynamic /api/sitemap.xml (forwarded-host aware) lists static pages + published posts only. robots.txt + llms.txt in public/. Canonical removed per SEO skill (no confirmed production domain yet).
- Uploads: POST /api/uploads (admin, JPG/PNG/WEBP/GIF ≤5MB) → /app/backend/uploads (persistent), served at /api/uploads/{filename}.
- Post published during testing: "T2 Filing Deadlines Explained" (real content, live).
- Blog content launch (2026-10): 3 SEO posts published (small-business-bookkeeping-saskatoon, t2-corporate-tax-filing-saskatchewan, saskatchewan-business-registration-isc-annual-returns) with exact titles/slugs/SEO meta/featured images+alt from user's brief. Markdown renderer now supports pipe tables, bullet + numbered lists, internal vs external links (components/Markdown.jsx). BlogPost page has breadcrumbs, author/date, CTA box (Contact + Book Now), related articles, BlogPosting + BreadcrumbList JSON-LD. Test posts deleted. CRA links are canonical but unreachable from pod network (000) — flagged to user; ISC link verified 200. Source markdown kept in /app/backend/scripts/ + publish_blogs.py (idempotent republish script).

## Backlog
- P0: Real email delivery (Resend managed integration) for booking confirmations + contact notifications.
- P1: Real Google reCAPTCHA keys; admin view of bookings/messages.
- P2: Client accounts (account icon currently shows "coming soon" modal).

## Slot availability (2026-10)
- GET /api/bookings/availability?date&service (public): returns blocked 24h slot values for the date — interval-overlap aware (30 vs 90 min durations) and blocks slots ending past 8:00 p.m. close. Only APPROVED bookings block; pending does not. Helpers time_to_minutes/duration_minutes/booked_intervals/overlaps at top of Public endpoints section.
- POST /api/bookings rejects with 409 on overlap with any approved booking, 400 for invalid time or end past close.
- BookingFlow.jsx: fetches availability per date+service, disables/crosses out booked slot buttons (title "Already booked"), aria-live availability note, resets time on date change, clears selection if it becomes blocked. Portal shares the component.
- Verified via curl (overlap 409, adjacent OK, pending not blocking, per-service differences, invalid date 400) and UI screenshots (desktop+mobile). Test bookings purged.

## Booking calendar overhaul (2026-10)
- REMOVED Google Calendar API sync entirely (service-account client, /api/calendar/status, google_event_id writes, admin setup banner). google-api-python-client + google-auth-httplib2 dropped from requirements.txt. Existing booking records untouched (legacy google_event_id field harmless).
- Timezone: America/Regina (CST, UTC-6 year-round) enforced via zoneinfo in booking_start_end; "Saskatoon time" labels added to customer booking flow (BookingFlow: min date uses America/Regina, step 1/2/3 labels), admin booking detail, and all mocked email notifications.
- Business email for booking notifications/calendar: saskstartupsolutions@viciconsulting.ca (BUSINESS_EMAIL const; new-booking admin notification + approval email). Contact form notification stays on saskstartupsolutions@gmail.com (preserved).
- New admin-only endpoints: GET /api/bookings/{id}/calendar (google_url + ics_url + start/end/duration, approved-only else 400) and GET /api/bookings/{id}/calendar.ics (RFC 5545 file with explicit VTIMEZONE America/Regina fixed CST, UID booking-{id}@viciconsulting.ca, ORGANIZER mailto business email, LOCATION business address, attachment download).
- Approve flow: status update only (no external calls) + queues mocked approval email to customer with Google Calendar template link (ctz=America/Regina). Admin dashboard booking modal shows "Calendar" box (Add to Google Calendar + Download .ics) only when status === approved.
- Verified: 90-min basic-package booking 2:00–3:30 p.m. parsed by icalendar lib at -06:00 (no shift); endpoints 400 pre-approval, 401 unauthenticated; re-approve idempotent; old /calendar/status 404; test data purged.

## Patrick bio + title (2026-10)
- Replaced Staff page "Meet The Team" placeholders with the real title "Founder & Lead Administrator" and Patrick's full bio (customer service focus, U of S graduate, St. Louis → Saskatoon 9 years, avid reader, Lord of the Rings enthusiast). Updated in Staff.jsx fallback + CONTENT_DEFAULTS (staff.staffTitle/staffBio). No DB content saved for staff/home keys, so defaults render live and remain editable via Admin → Content tab.
- Home "Meet the Founder" blurb (patrickText) rewritten to match the new bio's tone (user-approved). Updated in defaults.js + Home.jsx fallback.

## Our Story section expansion (2026-10)
- Home Brand Story now renders N numbered points from CMS text: one per line, "Title | Text" format (parseStoryPoints in Home.jsx). Default = 4 user-supplied points (Our Purpose / Our Services / Our Approach / Our Commitment) + numbered closing row with story2Text ("Based in Saskatoon, built for Saskatchewan businesses.") and story2Btn. Numbers auto-generate (01..N+1). ContentTab label updated to explain the format. Verified 1366/768/375.

## Logo + business email rollout (2026-10)
- User-supplied logo processed into: /public/media/logo-icon.png (512 circular transparent emblem — header badge), /public/media/logo-full.png (trimmed full lockup — footer), /public/favicon.png (64) + apple-touch-icon.png (180), linked in index.html.
- Header Wordmark: emblem badge beside 3-line wordmark (blends on yellow header, verified 1366/768/375). Footer first column: full logo card replaces text wordmark.
- Email changed site-wide to Saskstartupsolutions@viciconsulting.ca: Footer mailto+text, Contact page fallback + defaults.js contact.email, index.html JSON-LD, llms.txt, contact-form notification recipient (now BUSINESS_EMAIL), publish_blogs.py author email. DB content/posts/faqs checked — no gmail references.
- NOTE: admin LOGIN email intentionally unchanged (saskstartupsolutions@gmail.com — it's the .env ADMIN_EMAIL credential, not a display address).

## Admin login email + OTP credential change (2026-10)
- Admin login email moved to saskstartupsolutions@viciconsulting.ca (.env ADMIN_EMAIL + users collection updated; old gmail login rejected).
- Managed Resend email live: EMERGENT_EMAIL_KEY + EMAIL_FROM_NAME + EMAIL_REPLY_TO in backend/.env; send_email() + _assert_safe_email gate in server.py (playbook-compliant).
- OTP credential change: POST /api/auth/request-change (new_email/new_password optional, 1/min rate limit) emails 6-digit OTP (sha256-hashed, 10-min expiry, 5 attempts) to CURRENT admin email; POST /api/auth/confirm-change applies it. Failed sends delete the pending request.
- Startup seed now seeds only when users collection is EMPTY (no password/email reconciliation — in-app changes survive restarts).
- Admin dashboard new "Account" tab (Sign-in & Security card: current email, optional new email/password, OTP confirm).
- Verified end-to-end: password change cycle, email change cycle (temp→back), wrong-code 400, rate-limit 429, restart persistence, UI on desktop+mobile. NOTE: OTP emails are REALLY sent to saskstartupsolutions@viciconsulting.ca (3 test sends delivered 2026-10).

## Patrick photo replaced (2026-10)
- User-supplied "Professional Portrait by the Window" (941×1672) converted to JPG and written over /public/media/patrick-vachon.jpg — single shared file feeds Home Meet-the-Founder, Staff card, Booking staff tab, and Contact card (all four verified rendering with correct face framing, object-cover/object-top).

## Real booking emails live (2026-10)
- All 3 booking emails now send for real via managed Resend (send_booking_email helper: sends, then records status+provider_id in notifications collection; kinds: booking_received, booking_admin_notice, booking_approved). Branded email_shell template (bookgreen header, escaped interpolation, business footer, reply-to = business email).
- Customer gets: booking-received confirmation (with reference + intake-form instruction) and approval email (with Add to Google Calendar button link). Business gets new-booking notice at BUSINESS_EMAIL.
- Email failures never block bookings/approvals — recorded as failed_<code> in notifications; PATCH status response includes email status; admin notice tells the admin if the confirmation email failed.
- BookingFlow confirmation copy de-mocked; Admin approve notice mentions the sent email. Contact form emails remain MOCKED (demo reCAPTCHA unchanged).
- Verified: 3 real sends (202 + provider ids) incl. one to the real business inbox; undeliverable customer address → booking still created, failure logged; full UI booking flow. Test data purged; a real customer booking (Adrian, 2026-10-19) was left untouched.

## Deployment health check (2026-10)
- Ran deployment readiness scan: 1 BLOCKER found + fixed (legacy startup line deleted all staff users on every restart — removed; startup is now fully idempotent). Re-scan PASSED: env usage, CORS, ports, secrets in .env only, supervisor config, compilation all green. App is ready to Deploy.

## Production Deployment & Custom Domain (2026-10)
- Dispatched deployment to Emergent deployer with 50 ECU charge acknowledged.
- Target custom domain: `viciconsulting.ca` via client's existing Cloudflare account.
- Cloudflare DNS mapping: CNAME/A records for `@` and `www` to point to the deployed app, while preserving all existing MX (Google Workspace) and TXT email records.
- In-app admin login on production: `saskstartupsolutions@viciconsulting.ca` / `REDACTED_PASSWORD`.

## Email Sender Domain Decision (2026-10)
- User requested changing "From" address from `hey@email.emergentmails.com` to `saskstartupsolutions@viciconsulting.ca`.
- Platform constraint confirmed via playbook: managed Resend proxy locks sender address to shared domain for anti-phishing; custom sender domains not supported via managed integration.
- Current config confirmed sufficient: Display name = "Vici SaskStartupSolutions", Reply-To = `saskstartupsolutions@viciconsulting.ca` (routes replies to Google Workspace), no DNS changes needed, no extra cost.
- User advised to keep existing setup. No code changes made.

## Google Business Profile link (2026-10)
- Contact page: added "Google Business Profile" button (star icon, outline style) beside Get Directions in the contact card, plus a black bar pinned under the map iframe ("Open in Maps — Google Business Profile", testid map-google-business-link) right above the contact form. Both use GOOGLE_BUSINESS_URL const in Contact.jsx = https://maps.app.goo.gl/131Hpy68DZoQbHv18 (updated 2026-10-27 — user-supplied link that opens the business listing directly). Verified desktop + mobile.

## Domain change to saskstartupsolutions.ca (2026-10)
- User requested custom domain change from viciconsulting.ca → saskstartupsolutions.ca. No code URL references needed changing (sitemap is forwarded-host aware; all viciconsulting.ca strings in code are EMAIL addresses, which stay — business mailbox remains saskstartupsolutions@viciconsulting.ca on Google Workspace).
- Deployer confirmed: current prod has viciconsulting.ca + www attached (SSL active). Domain attach is user-side: Deployment Panel → Domains → "Link your Domain".
- Authoritative DNS records (deployer): CNAME www → vici-registry-admin.emergent.host and CNAME @ → vici-registry-admin.emergent.host, both Proxy = DNS only (gray cloud — NOT proxied; SSL http-validation needs direct resolution). SSL auto: pending → active within minutes. Apex works via Cloudflare CNAME flattening.
- After HTTPS verifies, user decides whether to keep viciconsulting.ca as alias or detach it in the Domains tab.

## SEO overhaul (2026-10, preview only — AWAITING user approval before deploy)
- Preferred host: https://www.saskstartupsolutions.ca (matches GA4 stream URL). backend/.env SITE_URL set; sitemap pins preferred host.
- Per-route meta via react-helmet-async + components/Seo.jsx on all pages (unique title/description/canonical per route; /admin + /portal noindex; BlogPost dynamic + BlogPosting/Breadcrumb JSON-LD with absolute URLs). CONSTRAINT: never add meta description/robots/canonical/og:title/og:description/og:url/og:image/twitter:title/description/image back into public/index.html — helmet v3 does not adopt static tags, duplicates break per-route SEO (verified iteration_1-3). Static head keeps only title/og:type/og:site_name/og:image dims/locale/twitter:card/GA4/JSON-LD/noscript.
- robots.txt: narrow disallows (/admin, /portal, /api/admin/, /api/auth/), AI crawler group, Sitemap: https://www.saskstartupsolutions.ca/api/sitemap.xml. NOTE: sitemap must stay at /api/sitemap.xml — platform ingress routes non-/api paths to the static frontend, so a root /sitemap.xml can only be a static file (would go stale). robots no longer blanket-disallows /api/ (that blocked the sitemap — reproduced issue, fixed).
- New pages: /sitemap (visitor directory, footer-linked, lists published posts), catch-all NotFound (helpful nav, noindex). True HTTP 404 status for unknown SPA routes is a PLATFORM limitation (SPA fallback serves 200 shell) — flagged, needs platform-level change if ever required.
- GA4 G-03VN7HB92G: gtag in index.html (send_page_view:false, anonymize_ip), SPA page_view via AnalyticsTracker with useRef guard (no StrictMode dupes). Events: book_intro_click (header CTA), booking_request (on successful booking, service slug only), contact_request (contact form success), contact_click (phone/email links). No PII sent.
- FAQ: 'Placeholder answer —' prefixes removed (DB + fallback), capitalization fixed, FAQPage JSON-LD renders from visible FAQs.
- og-image.jpg (1200x630 branded share card) generated from owned logo.
- Testing: archive/test-reports/iteration_1-3.json — final round ALL PASS (11 routes single-tag canonicals/descriptions/robots, noindex on admin/portal, GA4 events, booking+contact regression, 14/14 backend pytest).
- PENDING (need user approval/production access): deploy + enable bot-prerender toggle; Search Console: verify property saskstartupsolutions.ca, submit https://www.saskstartupsolutions.ca/api/sitemap.xml; GA4 realtime verification on live; approval batch for services-page copy emphasis (incorporation → registration → monthly bookkeeping order) — NOT yet changed per 'batch substantial copy for approval' rule.

## SEO audit fixes — thin content + compression (2026-11, preview only — awaiting deploy)
- **Thin content**: Added substantial meaningful copy to flagged pages — Sitemap (3 intro paragraphs explaining services/navigation), Blog (expanded hero + 'Why We Write These Guides' bottom section), Contact (hero intro + 'Why Businesses Choose Us' bottom section), FAQ ('About Our Services' bottom section). Word counts now 350-390 per page (well above 200 threshold). Home already had ~1014 words (not thin in preview; live serves old build).
- **JS compression**: Platform limitation — build is already minified (699KB → ~200KB gzipped) but the static server doesn't send Content-Encoding: gzip. Cannot be fixed in code; requires platform-level compression config. Documented for user.
- **Mobile overflow fix**: Added break-all class to email link on Contact page (pre-existing issue with long email string at 375px).
- Testing: iteration_6.json — ALL PASS (all pages render with new content, no console errors, mobile overflow fixed).
- Live site still serves old build (main.23722ef6.js) — will update on deploy.

## Host alignment fix (2026-11, preview only — awaiting deploy approval)
- User confirmed preferred host: www.saskstartupsolutions.ca → HTTP 308 redirect to saskstartupsolutions.ca (non-www). Fixed ALL references from www to non-www: Seo.jsx SITE_URL, backend/.env SITE_URL, robots.txt Sitemap line, index.html JSON-LD url/image, BlogPost.jsx JSON-LD URLs, backend/tests/test_seo_backend.py EXPECTED_HOST.
- Verified: preview sitemap (11 URLs, 0 www), canonical/og:url on all 11 routes, JSON-LD non-www, client-side 404 renders, content preserved, mobile no-overflow. iteration_5.json — ALL PASS (14/14 pytest).
- Platform limitations documented: (1) unknown routes return HTTP 200 with NotFound component (client-side routing limitation, cannot fix without platform-level change); (2) root /sitemap.xml returns HTML SPA shell (dynamic sitemap at /api/sitemap.xml by design); (3) sitemap content-type shows application/json at edge (body is valid XML, GSC accepts).
- Live site still serves old www build — will align on next deploy.

## Non-meta on-page fixes (2026-10, preview only — awaiting deploy approval)
- Converted 9 navigation-only onClick buttons to real react-router Links (Home x5, Services x2, Staff x2, Faq x1); removed unused useNavigate imports; styling/wording/testids preserved (content freeze verified).
- Fixed sitemap.xml serving at /api/sitemap.xml (dynamic, pinned to https://www.saskstartupsolutions.ca via SITE_URL env). Root /sitemap.xml cannot be dynamic on this platform (SPA fallback serves static file which goes stale) — documented blocker.
- robots.txt: narrowed disallows to /admin /portal /api/admin/ /api/auth/, added Sitemap line. Removed blanket /api/ disallow that blocked the sitemap.
- Added /sitemap visitor directory page (footer-linked) and NotFound catch-all with helpful nav.
- GA4 G-03VN7HB92G confirmed in static head with send_page_view:false; SPA page_view tracking with useRef guard (no duplicates).
- Testing: iteration_4.json — ALL 9 PASS. Anchor conversion verified, booking flow regression green, /booking#intake clearance confirmed (186px vs 108px header), sitemap/robots valid, content freeze intact, mobile no-overflow, per-route canonical single. Minor known issue: /api/sitemap.xml edge returns Content-Type: application/json despite backend setting application/xml — body is valid XML, GSC accepts; platform-layer rewrite, low priority.

## Next Tasks
1. Complete Cloudflare DNS record configuration for `viciconsulting.ca`.
2. Swap demo reCAPTCHA for real production keys if desired.
3. Test live site and custom domain SSL once DNS propagates.
