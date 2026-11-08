# Vici Admin Dashboard + Calendar Integration — Export Bundle

Copy-paste bundle for rebuilding the same booking system, calendar integration,
and admin dashboard in another Emergent project (FastAPI + React + MongoDB stack).

## What's inside

```
backend/
  server.py          Complete FastAPI backend: auth (JWT + bcrypt + OTP),
                     bookings, calendar (.ics + Google link), availability,
                     CMS content, blog, uploads, FAQs, contact
  requirements.txt   Python dependencies
frontend/
  pages/Admin.jsx              Full admin dashboard (Bookings, Messages, FAQs,
                               Blog, Content, Design, Account tabs)
  components/BookingFlow.jsx   4-step customer booking flow with blocked slots
  components/admin/            BlogTab, ContentTab, DesignTab (CMS)
  lib/site.js                  API base, services list, time slots
  lib/defaults.js              CMS default content
  lib/content.js               useContent() hook for CMS-driven pages
```

## backend/.env required keys

```
MONGO_URL="mongodb://localhost:27017"
DB_NAME="your_db_name"
CORS_ORIGINS="*"
JWT_SECRET="<64-char hex>"
ADMIN_EMAIL="you@example.com"
ADMIN_PASSWORD="<initial password — change in the Account tab after first login>"
EMERGENT_EMAIL_KEY="<from integration_playbook_expert_v2 — managed Resend>"
EMAIL_FROM_NAME="Your Business Name"
EMAIL_REPLY_TO="you@example.com"
```

No Google Cloud project, OAuth, or service account is needed anywhere.

## Frontend env

```
REACT_APP_BACKEND_URL=<your preview/backend URL>
```

## Key API endpoints

Public:
- POST /api/bookings — create booking (409 if the slot overlaps an approved one)
- GET  /api/bookings/availability?date=YYYY-MM-DD&service=slug — blocked slots
- POST /api/contact, GET /api/services, GET /api/faqs, GET /api/content/{key}

Auth:
- POST /api/auth/login — JWT, httpOnly cookies + Bearer, 5-attempt lockout
- POST /api/auth/request-change — emails 6-digit OTP to the CURRENT admin email
- POST /api/auth/confirm-change — applies email/password change with the OTP

Admin (cookie/Bearer):
- GET /api/bookings, PATCH /api/bookings/{id}/status, DELETE /api/bookings/{id}
- GET /api/bookings/{id}/calendar — Google Calendar template URL + .ics URL
- GET /api/bookings/{id}/calendar.ics — downloadable ICS (Google/Apple/Outlook)
- CMS: PUT /api/admin/content/{key}/draft, POST /api/admin/content/{key}/publish
- Blog CRUD: /api/blog/*, uploads: POST /api/uploads

## Calendar design notes (the important part)

- ALL booking times are Saskatoon local: IANA zone America/Regina (CST, UTC-6
  year-round, no DST). Never convert to server or visitor time.
- Google Calendar link: floating local times + `ctz=America/Regina` so the event
  lands at the right wall-clock time:
  https://calendar.google.com/calendar/render?action=TEMPLATE&text=...&dates=YYYYMMDDTHHMMSS/YYYYMMDDTHHMMSS&ctz=America/Regina&details=...&location=...
- The .ics carries its own VTIMEZONE block with a fixed -0600 offset, so Apple
  Calendar and Outlook import without any time shift. UID is stable per booking
  (booking-{id}@yourdomain) so re-imports dedupe instead of duplicating.
- Calendar options are only exposed for APPROVED bookings (400 otherwise) and
  require admin auth (401 otherwise).
- Availability uses interval overlap with per-service durations (30/90 min) and
  blocks anything ending past closing (8:00 p.m.).

## Wiring into a fresh Emergent app

1. Copy backend/server.py over the new app's backend (or merge the marked
   sections: "Auth helpers", "Managed email", "Public endpoints",
   "Auth endpoints", "Booking status + calendar").
2. pip install -r requirements.txt (httpx, bcrypt, PyJWT, motor, reportlab...).
3. Copy the frontend files into the new app's src/, keeping the folder layout.
4. Add the env keys above, restart: sudo supervisorctl restart backend frontend.
5. Log in at /admin with ADMIN_EMAIL/ADMIN_PASSWORD, then change both from the
   Account tab (OTP goes to your email).

Frontend deps used: axios, framer-motion, lucide-react, react-router-dom,
tailwindcss (emer*. default CRA template already has them).
