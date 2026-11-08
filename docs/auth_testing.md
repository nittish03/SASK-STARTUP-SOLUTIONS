# Auth Testing Playbook — Vici SaskStartupSolutions

## Credentials
See /app/memory/test_credentials.md for the current admin email/password.

## Step 1: MongoDB verification
```
mongosh
use test_database
db.users.find({role: "admin"}).pretty()
```
Verify: bcrypt hash starts with `$2b$`; indexes on users.email (unique), login_attempts.identifier.

## Step 2: API testing
```
API=$(grep REACT_APP_BACKEND_URL /app/frontend/.env | cut -d '=' -f2)
curl -c /tmp/cookies.txt -X POST "$API/api/auth/login" -H "Content-Type: application/json" -d '{"email":"<ADMIN_EMAIL>","password":"<ADMIN_PASSWORD>"}'
curl -b /tmp/cookies.txt "$API/api/auth/me"
```
Login returns the user object and sets `access_token` + `refresh_token` httpOnly cookies (token also in body for Bearer testing). `/me` returns the same user.

Protected endpoints (401 without auth): GET /api/bookings, GET /api/contacts, GET /api/notifications, POST/PUT/DELETE /api/faqs.
Public endpoints: GET /api/faqs, POST /api/bookings, POST /api/contact, GET /api/intake-forms/{slug}.

Brute force: 5 failed logins on same ip+email = 15 min lockout (429).
