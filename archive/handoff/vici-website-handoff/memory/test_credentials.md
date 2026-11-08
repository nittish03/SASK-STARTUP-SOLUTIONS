# Test Credentials
# Agent writes here when creating/modifying auth credentials (admin accounts, test users).
# Testing agent reads this before auth tests. Fork/continuation agents read on startup.

## Vici SaskStartupSolutions — ONE admin account only (no staff accounts)

### Admin Dashboard (/admin, header account icon)
- Admin email: saskstartupsolutions@viciconsulting.ca (changed from gmail 2026-10)
- Admin password: REDACTED_PASSWORD
- Role: admin — bookings (view/search/filter/details, set status Pending/Approved/Declined/Completed), messages, FAQ editing, blog, CMS content/design, account

### In-app credential change (Admin → Account tab)
- POST /api/auth/request-change {new_email?, new_password?} → emails a 6-digit OTP (10-min expiry, 1/min rate limit, 5 attempts) to the CURRENT admin email via Emergent managed Resend (EMERGENT_EMAIL_KEY in backend/.env; EMAIL_FROM_NAME="Vici SaskStartupSolutions"; reply-to = business email)
- POST /api/auth/confirm-change {otp} → applies email/password change
- Startup seed: seeds admin ONLY when users collection is empty; never reconciles password/email from env (in-app changes survive restarts)

### Booking Portal (/portal)
- Public booking-only page (no login, no staff tab). Shares the same booking system as /booking.

### Notes
- Auth endpoints: POST /api/auth/login, POST /api/auth/logout, GET /api/auth/me (httpOnly cookies; login response also includes access_token for Bearer use)
- Protected: GET /api/bookings, PATCH /api/bookings/{id}/status, GET /api/contacts, GET /api/notifications, POST/PUT/DELETE /api/faqs, GET /api/bookings/{id}/calendar(.ics), POST /api/auth/request-change, POST /api/auth/confirm-change
- The old staff account (patrick@viciconsulting.ca) was removed 2026-10 — do not use it.
- reCAPTCHA is a demo checkbox; CONTACT form notification emails are still MOCKED. All BOOKING emails (customer confirmation, admin notice, approval w/ calendar link) + OTP security codes send for real via managed Resend; outcomes recorded in `notifications` with provider_id.
- Google Calendar API sync was REMOVED 2026-10 — approved bookings offer an "Add to Google Calendar" link + .ics download instead (America/Regina times).
