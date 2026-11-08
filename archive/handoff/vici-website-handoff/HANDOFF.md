# Vici SaskStartupSolutions — Website Handoff Guide

**Prepared:** October 2026
**For:** Business owner (Patrick Vachon)
**Live domain:** https://viciconsulting.ca (Cloudflare DNS)
**Stack:** React frontend + FastAPI backend + MongoDB, hosted on Emergent

---

## 1. What you're getting

A complete business website with:

| Area | Details |
|---|---|
| Public pages | Home, Services, Staff, Booking, Contact Us, FAQ, Blog |
| Booking system | 4-step flow, Saskatoon time (CST year-round), double-booking protection, intake form PDFs |
| Calendar | Approved bookings get an "Add to Google Calendar" link + .ics download (works with Apple/Outlook too). No Google API keys needed |
| Emails | Real customer confirmations, approval emails (with calendar link), and new-booking alerts to saskstartupsolutions@viciconsulting.ca |
| Admin dashboard | Bookings manager, contact messages, FAQ editor, blog publisher, full content/design editor (CMS), account security |
| Blog | 3 published SEO articles, draft/publish workflow, sitemap + structured data |
| Security | JWT login, brute-force lockout, OTP email verification for credential changes |

---

## 2. Admin access

- **Admin panel:** https://viciconsulting.ca/admin
- **Email:** saskstartupsolutions@viciconsulting.ca
- **Password:** REDACTED_PASSWORD
- **Change either anytime:** Admin → Account tab → a 6-digit verification code is emailed to your current sign-in email before any change applies.

There is exactly ONE admin account by design. Do not create staff accounts.

---

## 3. Everyday tasks (no coding needed)

| Task | Where |
|---|---|
| Approve / decline / complete bookings | Admin → Bookings → click a booking |
| Get calendar file for an approved booking | Same modal → "Add to Google Calendar" or "Download .ics" |
| Read contact form messages | Admin → Messages |
| Edit any page text or image | Admin → Content (edit → Save Draft → Publish) |
| Change colors, fonts, hero slides, section order | Admin → Design |
| Write/publish blog posts | Admin → Blog (markdown supported: headings, lists, tables, links, images) |
| Edit FAQs | Admin → FAQs |
| Change login email/password | Admin → Account |

Uploaded images are stored in `backend/uploads/` and served at `/api/uploads/...`.

---

## 4. Email setup (how notifications work)

Emails send through Emergent's managed email service. They show the sender
name **"Vici SaskStartupSolutions"** and replies go to
**saskstartupsolutions@viciconsulting.ca** (Google Workspace inbox).

- The technical "From" address is `hey@email.emergentmails.com` — this is fixed
  by the platform and cannot be changed on the managed plan. Customer replies
  still reach you because Reply-To is set to your address.
- Real sends: booking confirmations, approval emails, new-booking alerts, and
  admin OTP security codes.
- Still demo: the contact form's reCAPTCHA is a demo checkbox (swap in real
  Google reCAPTCHA keys when ready). Contact form messages currently appear in
  the dashboard only.

---

## 5. Domain & DNS (Cloudflare)

- `viciconsulting.ca` and `www.viciconsulting.ca` → CNAME to the Emergent host
  (Proxied / orange cloud), SSL mode: **Full**.
- **Never touch the MX records** (Google Workspace: ASPMX.L.GOOGLE.COM etc.) or
  SPF TXT record — they keep your email working.
- HTTPS is automatic and free via Cloudflare + Emergent.

---

## 6. Running the code yourself (developers)

```bash
# Backend
cd backend
cp .env.example .env   # fill in the values
pip install -r requirements.txt
uvicorn server:app --host 0.0.0.0 --port 8001

# Frontend
cd frontend
cp .env.example .env   # set REACT_APP_BACKEND_URL
yarn install
yarn start             # port 3000
```

Notes:
- All backend routes are prefixed `/api`.
- On Emergent, supervisor runs both services; restart with
  `sudo supervisorctl restart backend frontend`.
- First run seeds the admin account only if the users collection is empty —
  in-app credential changes are never overwritten.

---

## 7. Files in this handoff

```
backend/        FastAPI server (server.py), requirements, uploads, blog source scripts
frontend/       React app source (src/, public/, configs)
memory/         PRD.md (full feature history + backlog), test_credentials.md
docs/           calendar-admin-reference bundle (standalone calendar/admin code)
```

---

## 8. Known items / backlog (optional future work)

- Contact form: real reCAPTCHA keys; deliver contact messages as real emails
- Admin dashboard: day-at-a-glance schedule view
- Blog: author card with Patrick's photo/bio
- Google Business Profile links live on the Contact page
  (https://maps.app.goo.gl/131Hpy68DZoQbHv18)

**Support:** the site is managed through the Emergent platform — use Re-publish
to push updates live. Keep this document private (it contains credentials).
