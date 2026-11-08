from fastapi import FastAPI, APIRouter, HTTPException, Request, Response, Depends, UploadFile, File, Body
from fastapi.responses import StreamingResponse, FileResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import io
import re
import hashlib
import secrets
import ipaddress
import logging
import uuid
import httpx
from html import escape
from html.parser import HTMLParser
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
from datetime import datetime, timezone, timedelta
from zoneinfo import ZoneInfo
from urllib.parse import urlencode, urlparse
from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.pdfgen import canvas
import bcrypt
import jwt

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")

JWT_ALGORITHM = "HS256"

SERVICES = {
    "bookkeeping": {
        "title": "Part 1 - Bookkeeping",
        "duration": "30 mins",
        "questions": [
            "Legal business name", "CRA business number (BN)",
            "Current bookkeeping system (software / spreadsheet / shoebox)",
            "Number of monthly transactions (approx.)",
            "Bank accounts used for the business",
            "Do you have employees / payroll?",
            "GST/PST registration status",
            "What is your biggest bookkeeping challenge right now?",
        ],
    },
    "t2-corporate-filing": {
        "title": "Part 2 - T2 Corporate Filing Administration",
        "duration": "30 mins",
        "questions": [
            "Corporation legal name", "CRA business number (BN)",
            "Corporate tax year-end date",
            "Date of last filed T2 return (if any)",
            "Do you have prior-year financial statements?",
            "Any outstanding CRA correspondence or balances?",
            "Who is the current signing authority?",
            "What concerns you most about your T2 filing?",
        ],
    },
    "isc-registry": {
        "title": "Part 3 - ISC Registry Administration",
        "duration": "30 mins",
        "questions": [
            "Corporation name as registered with ISC",
            "Saskatchewan corporation number (if incorporated)",
            "Date of last annual return filed",
            "Registered office address",
            "Names of current directors",
            "Any pending amendments (name, address, directors)?",
            "Do you need help with a new incorporation?",
            "What registry tasks take the most of your time?",
        ],
    },
    "basic-package": {
        "title": "All in one Basic Service Package",
        "duration": "1 hr 30 mins",
        "questions": [
            "Legal business / corporation name", "CRA business number (BN)",
            "Saskatchewan corporation number (if incorporated)",
            "Current bookkeeping setup",
            "Corporate tax year-end date",
            "Date of last ISC annual return",
            "Which of the three services is most urgent for you?",
            "What would success look like 6 months from now?",
        ],
    },
    "introduction": {
        "title": "Introduction and Intake Appointment - No Obligations",
        "duration": "30 mins",
        "questions": [
            "Your name and role in the business",
            "Business name and what it does",
            "How long have you been operating?",
            "Which services are you interested in? (Bookkeeping / T2 / ISC / All)",
            "How do you currently handle compliance work?",
            "What deadlines are coming up for you?",
            "What would you like to walk away with from this appointment?",
        ],
    },
}

DEFAULT_FAQS = [
    {
        "question": "What does the free introduction appointment cover?",
        "answer": "Placeholder answer — the introduction appointment is a no-obligation conversation where we review your current situation, understand your needs across bookkeeping, T2 filing, and ISC Registry administration, and show you exactly how we can help before you commit to anything.",
    },
    {
        "question": "What documents should I bring to my first appointment?",
        "answer": "Placeholder answer — bring whatever you have: your CRA business number, recent bank statements, prior tax filings, and any ISC Registry correspondence. If you're not sure, just bring yourself — we'll help you figure out what's missing.",
    },
    {
        "question": "How do quotes work?",
        "answer": "Placeholder answer — every engagement starts with the free introduction appointment. Once we understand the scope of your bookkeeping, tax filing, or registry needs, we provide a clear, accurate quote. No pricing is listed online because every business is different.",
    },
    {
        "question": "What are the timelines for T2 corporate filing?",
        "answer": "Placeholder answer — T2 corporate returns are generally due within six months of your corporation's year-end, with any balance owing due earlier. In your introduction appointment, we'll walk you through our filing timeline for your specific year-end so there are no surprises.",
    },
    {
        "question": "What does ISC Registry administration include?",
        "answer": "Placeholder answer — we handle the administration of your Saskatchewan ISC Registry requirements: incorporation documents, annual returns, and keeping your corporate information current with Information Services Corporation (ISC) — no missed deadlines, no penalties.",
    },
    {
        "question": "What's included in the All in one Basic Service Package?",
        "answer": "Placeholder answer — the Basic Package includes all three parts: Bookkeeping, T2 Corporate Filing Administration, and ISC Registry Administration. One team, one relationship, all your compliance handled.",
    },
]


# ---------- Auth helpers ----------

def get_jwt_secret() -> str:
    return os.environ["JWT_SECRET"]


def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")


def verify_password(plain: str, hashed: str) -> bool:
    return bcrypt.checkpw(plain.encode("utf-8"), hashed.encode("utf-8"))


def create_access_token(user_id: str, email: str) -> str:
    payload = {"sub": user_id, "email": email, "exp": datetime.now(timezone.utc) + timedelta(minutes=15), "type": "access"}
    return jwt.encode(payload, get_jwt_secret(), algorithm=JWT_ALGORITHM)


def create_refresh_token(user_id: str) -> str:
    payload = {"sub": user_id, "exp": datetime.now(timezone.utc) + timedelta(days=7), "type": "refresh"}
    return jwt.encode(payload, get_jwt_secret(), algorithm=JWT_ALGORITHM)


async def get_current_user(request: Request) -> dict:
    token = request.cookies.get("access_token")
    if not token:
        auth_header = request.headers.get("Authorization", "")
        if auth_header.startswith("Bearer "):
            token = auth_header[7:]
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    try:
        payload = jwt.decode(token, get_jwt_secret(), algorithms=[JWT_ALGORITHM])
        if payload.get("type") != "access":
            raise HTTPException(status_code=401, detail="Invalid token type")
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")
    user = await db.users.find_one({"id": payload["sub"]}, {"_id": 0, "password_hash": 0})
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    return user


# ---------- Models ----------

class BookingCreate(BaseModel):
    service: str
    date: str
    time: str
    name: str
    email: EmailStr
    phone: str
    notes: Optional[str] = ""


class ContactCreate(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = ""
    message: str
    recaptcha: bool = False


class LoginPayload(BaseModel):
    email: EmailStr
    password: str


class FaqPayload(BaseModel):
    question: str
    answer: str


def now_iso():
    return datetime.now(timezone.utc).isoformat()


def queue_mock_email(to: str, subject: str, body: str):
    return {
        "id": str(uuid.uuid4()),
        "to": to,
        "subject": subject,
        "body": body,
        "status": "mocked_not_sent",
        "created_at": now_iso(),
    }


# ---------- Managed email (Emergent integration proxy) ----------
# EMAIL_BASE_URL is a constant on purpose — it must survive deployment.
EMAIL_BASE_URL = "https://integrations.emergentagent.com"
EMAIL_KEY = os.environ.get("EMERGENT_EMAIL_KEY")
EMAIL_FROM_NAME = os.environ.get("EMAIL_FROM_NAME", "Vici SaskStartupSolutions")
EMAIL_REPLY_TO = os.environ.get("EMAIL_REPLY_TO")

_SHORTENERS = ("bit.ly", "tinyurl.com", "t.co", "is.gd", "cutt.ly", "goo.gl", "rebrand.ly")
_CRED_ASK = ("reply with your password", "reply with the code", "send your password", "cvv",
             "send us your password", "enter your password below", "confirm your card number",
             "your full card number", "seed phrase", "recovery phrase", "verify your card",
             "social security number", "confirm your bank details")
_HOSTISH = re.compile(r"\b(?:https?://)?((?:[a-z0-9-]+\.)+[a-z]{2,})", re.I)


def _host_ok(host: str) -> bool:
    if not host or "xn--" in host:
        return False
    try:
        ipaddress.ip_address(host)
        return False
    except ValueError:
        pass
    return not any(host == s or host.endswith("." + s) for s in _SHORTENERS)


def _same_site(shown: str, real: str) -> bool:
    return shown == real or real.endswith("." + shown) or shown.endswith("." + real)


class _EmailScan(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tags, self.urls, self.anchors = set(), [], []
        self._href, self._text = None, []

    def handle_starttag(self, tag, attrs):
        self.tags.add(tag.lower())
        self.urls += [v for k, v in attrs if k.lower() in ("href", "src") and v]
        if tag.lower() == "a":
            self._href = dict((k.lower(), v) for k, v in attrs).get("href")
            self._text = []

    def handle_data(self, data):
        if self._href is not None:
            self._text.append(data)

    def handle_endtag(self, tag):
        if tag.lower() == "a" and self._href is not None:
            self.anchors.append((self._href, "".join(self._text)))
            self._href, self._text = None, []


def _assert_safe_email(subject: str, html: str) -> None:
    scan = _EmailScan()
    scan.feed(html)
    if scan.tags & {"form", "input", "textarea", "select"}:
        raise ValueError("No forms or input fields in email (G2)")
    body = f"{subject}\n{html}".lower()
    for p in _CRED_ASK:
        if p in body:
            raise ValueError(f"Email asks the recipient for credentials: {p!r} (G2)")
    for url in scan.urls:
        low = url.strip().lower()
        if low.startswith(("mailto:", "tel:", "cid:", "#")):
            continue
        if not low.startswith("https://"):
            raise ValueError(f"Email links/assets must be absolute https: {url!r} (G3)")
        host = urlparse(low).hostname or ""
        if not _host_ok(host) or urlparse(low).username is not None:
            raise ValueError(f"Shortened, numeric-host or credential-bearing URL: {url!r} (G3)")
    for href, text in scan.anchors:
        real = urlparse(href.strip().lower()).hostname or ""
        if not real:
            continue
        for m in _HOSTISH.finditer(text):
            if not _same_site(m.group(1).lower(), real):
                raise ValueError(f"Anchor text {m.group(1)!r} != real link host {real!r} (G3)")


async def send_email(*, to: str, subject: str, html: str, reply_to: str | None = None) -> str | None:
    """Send a transactional email via the Emergent managed proxy. Templates are server-side only."""
    _assert_safe_email(subject, html)
    payload = {"to": [to], "subject": subject, "html": html, "from_name": EMAIL_FROM_NAME}
    if reply_to or EMAIL_REPLY_TO:
        payload["contact_email"] = reply_to or EMAIL_REPLY_TO
    try:
        async with httpx.AsyncClient(timeout=30) as client:
            resp = await client.post(
                f"{EMAIL_BASE_URL}/api/v1/email/send",
                headers={"X-Email-Key": EMAIL_KEY},
                json=payload,
            )
        resp.raise_for_status()
        return resp.json().get("id")
    except httpx.HTTPStatusError as e:
        try:
            code = e.response.json().get("code", "")
        except ValueError:
            code = ""
        if code in ("insufficient_credits", "integration_disabled", "daily_limit_reached"):
            logger.warning(f"Email paused: {code} ({e.response.status_code})")
            raise HTTPException(status_code=503, detail="Email is temporarily unavailable")
        logger.error(f"Email send failed: {e.response.status_code} {e.response.text}")
        raise HTTPException(status_code=502, detail="Failed to send email")
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Email send error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to send email")


def email_shell(title: str, body_html: str) -> str:
    """Branded wrapper. All dynamic content must be escape()d by callers (G4)."""
    return (
        '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4ef;padding:24px">'
        '<tr><td align="center">'
        '<table role="presentation" width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden">'
        '<tr><td style="background:#076A21;padding:20px 28px">'
        f'<span style="font-family:Georgia,serif;font-size:20px;font-weight:bold;color:#ffffff;letter-spacing:1px">{escape(EMAIL_FROM_NAME)}</span>'
        "</td></tr>"
        '<tr><td style="padding:28px;font-family:Arial,sans-serif;font-size:15px;line-height:1.6;color:#222222">'
        f'<h1 style="font-family:Georgia,serif;font-size:22px;margin:0 0 16px;color:#076A21">{escape(title)}</h1>'
        f"{body_html}"
        '<p style="font-size:12px;color:#888888;margin-top:28px;border-top:1px solid #eeeeee;padding-top:14px">'
        f"{escape(BUSINESS_NAME)} · 539 Avenue I N, Saskatoon, SK · 1 (306) 960-0091 · "
        f'<a href="mailto:{BUSINESS_EMAIL}" style="color:#076A21">{BUSINESS_EMAIL}</a>'
        "</p></td></tr></table></td></tr></table>"
    )


def booking_rows_html(rows) -> str:
    return "".join(f'<p style="margin:6px 0"><strong>{escape(k)}:</strong> {escape(v)}</p>' for k, v in rows)


async def send_booking_email(*, to: str, subject: str, html: str, kind: str, booking_id: str = None) -> str:
    """Send a real transactional email and record the outcome in notifications."""
    try:
        email_id = await send_email(to=to, subject=subject, html=html)
        status = "sent"
    except HTTPException as e:
        email_id = None
        status = f"failed_{e.status_code}"
        logger.warning(f"Booking email not sent ({kind} -> {to}): HTTP {e.status_code}")
    except Exception as e:
        email_id = None
        status = "failed"
        logger.warning(f"Booking email not sent ({kind} -> {to}): {e}")
    await db.notifications.insert_one({
        "id": str(uuid.uuid4()),
        "to": to,
        "subject": subject,
        "status": status,
        "provider_id": email_id,
        "kind": kind,
        "booking_id": booking_id,
        "created_at": now_iso(),
    })
    return status


# ---------- Public endpoints ----------

def time_to_minutes(t):
    """'2:00 p.m.' -> minutes since midnight (Saskatoon local time, America/Regina)."""
    dt = datetime.strptime(t.lower().replace(".", "").strip(), "%I:%M %p")
    return dt.hour * 60 + dt.minute


def duration_minutes(service_slug):
    return 90 if "hr" in SERVICES[service_slug]["duration"] else 30


CLOSE_MINUTES = 20 * 60  # 8:00 p.m. Saskatoon time


def booked_intervals(bookings):
    return [(time_to_minutes(b["time"]), time_to_minutes(b["time"]) + duration_minutes(b["service"])) for b in bookings]


def overlaps(start, end, intervals):
    return any(start < e and end > s for s, e in intervals)


@api_router.get("/")
async def root():
    return {"message": "Vici SaskStartupSolutions API"}


@api_router.get("/health")
async def health():
    return {"status": "ok"}


@api_router.get("/services")
async def list_services():
    return [{"slug": k, **v} for k, v in SERVICES.items()]


@api_router.get("/faqs")
async def list_faqs():
    return await db.faqs.find({}, {"_id": 0}).sort("order", 1).to_list(100)


@api_router.get("/bookings/availability")
async def booking_availability(date: str, service: str):
    """Public: which time slots are blocked on a date for a service (approved bookings + closing time)."""
    try:
        datetime.strptime(date, "%Y-%m-%d")
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid date")
    if service not in SERVICES:
        raise HTTPException(status_code=400, detail="Unknown service")
    dur = duration_minutes(service)
    approved = await db.bookings.find({"date": date, "status": "approved"}, {"_id": 0, "time": 1, "service": 1}).to_list(100)
    intervals = booked_intervals(approved)
    blocked = []
    for h in range(8, 20):
        for m in (0, 30):
            start = h * 60 + m
            if start + dur > CLOSE_MINUTES or overlaps(start, start + dur, intervals):
                blocked.append(f"{h:02d}:{m:02d}")
    return {"date": date, "timezone": SK_TZ, "blocked": blocked}


@api_router.post("/bookings")
async def create_booking(payload: BookingCreate):
    if payload.service not in SERVICES:
        raise HTTPException(status_code=400, detail="Unknown service")
    svc = SERVICES[payload.service]
    try:
        new_start = time_to_minutes(payload.time)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid time")
    if new_start + duration_minutes(payload.service) > CLOSE_MINUTES:
        raise HTTPException(status_code=400, detail="That time is outside our 8:00 a.m. – 8:00 p.m. hours")
    approved_same_day = await db.bookings.find({"date": payload.date, "status": "approved"}, {"_id": 0, "time": 1, "service": 1}).to_list(100)
    if overlaps(new_start, new_start + duration_minutes(payload.service), booked_intervals(approved_same_day)):
        raise HTTPException(status_code=409, detail="That time slot has just been booked. Please choose another time.")
    booking = {
        "id": str(uuid.uuid4()),
        "service": payload.service,
        "service_title": svc["title"],
        "date": payload.date,
        "time": payload.time,
        "name": payload.name,
        "email": payload.email,
        "phone": payload.phone,
        "notes": payload.notes or "",
        "status": "pending",
        "created_at": now_iso(),
    }
    await db.bookings.insert_one(booking)
    ref = booking["id"][:8].upper()
    customer_status = await send_booking_email(
        to=payload.email,
        subject=f"Booking request received: {svc['title']}",
        html=email_shell(
            "We've received your booking request",
            f"<p>Hi {escape(payload.name)},</p>"
            f"<p>Thanks for booking with {escape(BUSINESS_NAME)} — your request is in and we will confirm shortly.</p>"
            + booking_rows_html([
                ("Service", svc["title"]),
                ("Date", payload.date),
                ("Time", f"{payload.time} (Saskatoon time, CST)"),
                ("Reference", ref),
            ])
            + f'<p>Please email your completed intake form to <a href="mailto:{BUSINESS_EMAIL}" style="color:#076A21">{BUSINESS_EMAIL}</a> before your appointment.</p>',
        ),
        kind="booking_received",
        booking_id=booking["id"],
    )
    await send_booking_email(
        to=BUSINESS_EMAIL,
        subject=f"New booking request: {svc['title']} — {payload.date} at {payload.time} (Saskatoon time)",
        html=email_shell(
            "New booking request",
            booking_rows_html([
                ("Client", payload.name),
                ("Email", payload.email),
                ("Phone", payload.phone),
                ("Service", svc["title"]),
                ("When", f"{payload.date} at {payload.time} (Saskatoon time, CST)"),
                ("Notes", payload.notes or "—"),
                ("Reference", ref),
            ])
            + "<p>Review and approve it in your admin dashboard.</p>",
        ),
        kind="booking_admin_notice",
        booking_id=booking["id"],
    )
    booking.pop("_id", None)
    return {"booking": booking, "email_status": customer_status}


@api_router.post("/contact")
async def create_contact(payload: ContactCreate):
    if not payload.recaptcha:
        raise HTTPException(status_code=400, detail="Please confirm you are not a robot")
    doc = {
        "id": str(uuid.uuid4()),
        "name": payload.name,
        "email": payload.email,
        "phone": payload.phone or "",
        "message": payload.message,
        "created_at": now_iso(),
    }
    await db.contacts.insert_one(doc)
    email = queue_mock_email(
        BUSINESS_EMAIL,
        f"Contact form: {payload.name}",
        f"From: {payload.name} <{payload.email}> Phone: {payload.phone}\n\n{payload.message}",
    )
    await db.notifications.insert_one(email)
    doc.pop("_id", None)
    return {"contact": doc, "email_status": "mocked_not_sent"}


# ---------- Auth endpoints ----------

@api_router.post("/auth/login")
async def login(payload: LoginPayload, request: Request, response: Response):
    email = payload.email.lower()
    identifier = f"{request.client.host}:{email}"
    cutoff = datetime.now(timezone.utc) - timedelta(minutes=15)
    recent_failures = await db.login_attempts.count_documents({"identifier": identifier, "timestamp": {"$gte": cutoff}})
    if recent_failures >= 5:
        raise HTTPException(status_code=429, detail="Too many failed attempts. Try again in 15 minutes.")

    user = await db.users.find_one({"email": email})
    if not user or not verify_password(payload.password, user["password_hash"]):
        await db.login_attempts.insert_one({"identifier": identifier, "timestamp": datetime.now(timezone.utc)})
        raise HTTPException(status_code=401, detail="Invalid email or password")

    await db.login_attempts.delete_many({"identifier": identifier})
    access = create_access_token(user["id"], email)
    refresh = create_refresh_token(user["id"])
    response.set_cookie(key="access_token", value=access, httponly=True, secure=True, samesite="none", max_age=900, path="/")
    response.set_cookie(key="refresh_token", value=refresh, httponly=True, secure=True, samesite="none", max_age=604800, path="/")
    return {"id": user["id"], "email": email, "name": user.get("name", ""), "role": user.get("role", "admin"), "access_token": access}


@api_router.post("/auth/logout")
async def logout(response: Response):
    response.delete_cookie("access_token", path="/")
    response.delete_cookie("refresh_token", path="/")
    return {"message": "Logged out"}


@api_router.get("/auth/me")
async def me(user: dict = Depends(get_current_user)):
    return user


# ---------- Admin credential change (OTP verified via email) ----------

class ChangeRequestPayload(BaseModel):
    new_email: Optional[EmailStr] = None
    new_password: Optional[str] = None


class ChangeConfirmPayload(BaseModel):
    otp: str


def hash_otp(otp: str) -> str:
    return hashlib.sha256(otp.encode("utf-8")).hexdigest()


@api_router.post("/auth/request-change")
async def request_credential_change(payload: ChangeRequestPayload, user: dict = Depends(get_current_user)):
    new_email = payload.new_email.lower() if payload.new_email else None
    new_password = payload.new_password or None
    if not new_email and not new_password:
        raise HTTPException(status_code=400, detail="Provide a new email, a new password, or both")
    if new_password and len(new_password) < 8:
        raise HTTPException(status_code=400, detail="Password must be at least 8 characters")
    existing = await db.otp_requests.find_one({"user_id": user["id"]})
    if existing and datetime.now(timezone.utc) - datetime.fromisoformat(existing["created_at"]) < timedelta(minutes=1):
        raise HTTPException(status_code=429, detail="A code was just sent. Please wait a minute before requesting another.")
    otp = f"{secrets.randbelow(1000000):06d}"
    doc = {
        "id": str(uuid.uuid4()),
        "user_id": user["id"],
        "otp_hash": hash_otp(otp),
        "new_email": new_email,
        "new_password_hash": hash_password(new_password) if new_password else None,
        "attempts": 0,
        "created_at": now_iso(),
        "expires_at": (datetime.now(timezone.utc) + timedelta(minutes=10)).isoformat(),
    }
    await db.otp_requests.replace_one({"user_id": user["id"]}, doc, upsert=True)
    subject = f"Your {EMAIL_FROM_NAME} security code"
    html = (
        '<table role="presentation" width="100%"><tr><td style="padding:24px;font-family:Arial,sans-serif">'
        f"<p>Hi {escape(user.get('name') or 'there')},</p>"
        "<p>Use this one-time code to confirm the sign-in change requested from your admin dashboard:</p>"
        f'<p style="font-size:28px;font-weight:bold;letter-spacing:6px">{otp}</p>'
        "<p>The code expires in 10 minutes. If you did not request this change, you can ignore this email — your sign-in details stay the same.</p>"
        f'<p style="font-size:12px;color:#888">Sent by {escape(EMAIL_FROM_NAME)} — Saskatoon, Saskatchewan.</p>'
        "</td></tr></table>"
    )
    try:
        await send_email(to=user["email"], subject=subject, html=html)
    except HTTPException:
        # never leave a pending change whose code was never delivered
        await db.otp_requests.delete_one({"user_id": user["id"]})
        raise
    return {"message": f"Verification code sent to {user['email']}", "expires_minutes": 10}


@api_router.post("/auth/confirm-change")
async def confirm_credential_change(payload: ChangeConfirmPayload, user: dict = Depends(get_current_user)):
    doc = await db.otp_requests.find_one({"user_id": user["id"]})
    if not doc:
        raise HTTPException(status_code=400, detail="No change request found. Please request a new code.")
    if datetime.now(timezone.utc) > datetime.fromisoformat(doc["expires_at"]):
        await db.otp_requests.delete_one({"user_id": user["id"]})
        raise HTTPException(status_code=400, detail="That code has expired. Please request a new one.")
    if doc.get("attempts", 0) >= 5:
        await db.otp_requests.delete_one({"user_id": user["id"]})
        raise HTTPException(status_code=429, detail="Too many wrong codes. Please request a new one.")
    if hash_otp(payload.otp.strip()) != doc["otp_hash"]:
        await db.otp_requests.update_one({"user_id": user["id"]}, {"$inc": {"attempts": 1}})
        raise HTTPException(status_code=400, detail="Incorrect code")
    updates = {}
    if doc.get("new_email"):
        updates["email"] = doc["new_email"]
    if doc.get("new_password_hash"):
        updates["password_hash"] = doc["new_password_hash"]
    if updates:
        await db.users.update_one({"id": user["id"]}, {"$set": updates})
    await db.otp_requests.delete_one({"user_id": user["id"]})
    return {"message": "Sign-in details updated", "email": updates.get("email", user["email"])}


# ---------- Protected admin endpoints ----------

@api_router.get("/bookings")
async def list_bookings(user: dict = Depends(get_current_user)):
    return await db.bookings.find({}, {"_id": 0}).to_list(500)


@api_router.get("/contacts")
async def list_contacts(user: dict = Depends(get_current_user)):
    return await db.contacts.find({}, {"_id": 0}).to_list(500)


@api_router.get("/notifications")
async def list_notifications(user: dict = Depends(get_current_user)):
    return await db.notifications.find({}, {"_id": 0}).to_list(500)


@api_router.post("/faqs")
async def create_faq(payload: FaqPayload, user: dict = Depends(get_current_user)):
    top = await db.faqs.find({}, {"_id": 0, "order": 1}).sort("order", -1).limit(1).to_list(1)
    order = (top[0]["order"] + 1) if top else 1
    doc = {"id": str(uuid.uuid4()), "question": payload.question, "answer": payload.answer, "order": order}
    await db.faqs.insert_one(doc)
    doc.pop("_id", None)
    return doc


@api_router.put("/faqs/{faq_id}")
async def update_faq(faq_id: str, payload: FaqPayload, user: dict = Depends(get_current_user)):
    result = await db.faqs.update_one({"id": faq_id}, {"$set": {"question": payload.question, "answer": payload.answer}})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="FAQ not found")
    return await db.faqs.find_one({"id": faq_id}, {"_id": 0})


@api_router.delete("/faqs/{faq_id}")
async def delete_faq(faq_id: str, user: dict = Depends(get_current_user)):
    result = await db.faqs.delete_one({"id": faq_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="FAQ not found")
    return {"message": "Deleted"}


# ---------- Booking status + calendar links/files (no Google API required) ----------

VALID_STATUSES = {"pending", "approved", "declined", "completed"}
SK_TZ = "America/Regina"  # Saskatoon, Saskatchewan — CST (UTC-6) year-round, no DST
BUSINESS_NAME = "Vici SaskStartupSolutions"
BUSINESS_EMAIL = "saskstartupsolutions@viciconsulting.ca"
BUSINESS_PHONE = "1 (306) 960-0091"
BUSINESS_ADDRESS = "539 Avenue I N, Saskatoon, Saskatchewan S7L 2G9"


class StatusPayload(BaseModel):
    status: str


def booking_start_end(booking):
    """Interpret the booking's date + time strictly as Saskatoon local time (America/Regina)."""
    t = booking["time"].lower().replace(".", "").strip()
    naive = datetime.strptime(f"{booking['date']} {t}", "%Y-%m-%d %I:%M %p")
    start = naive.replace(tzinfo=ZoneInfo(SK_TZ))
    minutes = 90 if "hr" in SERVICES[booking["service"]]["duration"] else 30
    return start, start + timedelta(minutes=minutes)


def sk_time_label(dt):
    return dt.strftime("%I:%M %p").lstrip("0").replace("AM", "a.m.").replace("PM", "p.m.")


def event_summary(booking):
    return f"{booking['service_title']} — {booking['name']}"


def event_details(booking):
    return (
        f"Client: {booking['name']}\nEmail: {booking['email']}\nPhone: {booking['phone']}\n"
        f"Reference: {booking['id'][:8].upper()}\nNotes: {booking.get('notes') or '—'}\n"
        "Time zone: Saskatoon, Saskatchewan (America/Regina — CST, UTC-6 year-round)\n"
        f"Contact: {BUSINESS_NAME} · {BUSINESS_EMAIL} · {BUSINESS_PHONE}"
    )


def google_calendar_url(booking):
    """Calendar template link; ctz=America/Regina keeps the event at the correct Saskatoon time."""
    start, end = booking_start_end(booking)
    params = {
        "action": "TEMPLATE",
        "text": event_summary(booking),
        "dates": f"{start.strftime('%Y%m%dT%H%M%S')}/{end.strftime('%Y%m%dT%H%M%S')}",
        "ctz": SK_TZ,
        "details": event_details(booking),
        "location": BUSINESS_ADDRESS,
    }
    return "https://calendar.google.com/calendar/render?" + urlencode(params)


def ics_escape(text):
    return text.replace("\\", "\\\\").replace(";", "\\;").replace(",", "\\,").replace("\n", "\\n")


def build_ics(booking):
    """RFC 5545 file with an explicit America/Regina VTIMEZONE (fixed CST) so imports never shift."""
    start, end = booking_start_end(booking)
    lines = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//Vici SaskStartupSolutions//Booking//EN",
        "CALSCALE:GREGORIAN",
        "METHOD:PUBLISH",
        "BEGIN:VTIMEZONE",
        f"TZID:{SK_TZ}",
        "BEGIN:STANDARD",
        "TZOFFSETFROM:-0600",
        "TZOFFSETTO:-0600",
        "TZNAME:CST",
        "DTSTART:19700101T000000",
        "END:STANDARD",
        "END:VTIMEZONE",
        "BEGIN:VEVENT",
        f"UID:booking-{booking['id']}@viciconsulting.ca",
        f"DTSTAMP:{datetime.now(timezone.utc).strftime('%Y%m%dT%H%M%SZ')}",
        f"DTSTART;TZID={SK_TZ}:{start.strftime('%Y%m%dT%H%M%S')}",
        f"DTEND;TZID={SK_TZ}:{end.strftime('%Y%m%dT%H%M%S')}",
        f"SUMMARY:{ics_escape(event_summary(booking))}",
        f"DESCRIPTION:{ics_escape(event_details(booking))}",
        f"LOCATION:{ics_escape(BUSINESS_ADDRESS)}",
        f"ORGANIZER;CN={ics_escape(BUSINESS_NAME)}:mailto:{BUSINESS_EMAIL}",
        "STATUS:CONFIRMED",
        "END:VEVENT",
        "END:VCALENDAR",
    ]
    return "\r\n".join(lines) + "\r\n"


@api_router.get("/bookings/{booking_id}/calendar")
async def booking_calendar_options(booking_id: str, user: dict = Depends(get_current_user)):
    booking = await db.bookings.find_one({"id": booking_id}, {"_id": 0})
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    if booking.get("status") != "approved":
        raise HTTPException(status_code=400, detail="Calendar options are available once the booking is approved")
    start, end = booking_start_end(booking)
    return {
        "timezone": SK_TZ,
        "timezone_label": "Saskatoon time (CST, UTC-6 year-round)",
        "date": booking["date"],
        "start_time": booking["time"],
        "end_time": sk_time_label(end),
        "duration_minutes": int((end - start).total_seconds() // 60),
        "google_url": google_calendar_url(booking),
        "ics_url": f"/api/bookings/{booking_id}/calendar.ics",
    }


@api_router.get("/bookings/{booking_id}/calendar.ics")
async def booking_calendar_ics(booking_id: str, user: dict = Depends(get_current_user)):
    booking = await db.bookings.find_one({"id": booking_id}, {"_id": 0})
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    if booking.get("status") != "approved":
        raise HTTPException(status_code=400, detail="Calendar options are available once the booking is approved")
    ref = booking["id"][:8].upper()
    return Response(
        content=build_ics(booking),
        media_type="text/calendar",
        headers={"Content-Disposition": f'attachment; filename="vici-booking-{ref}.ics"'},
    )


@api_router.patch("/bookings/{booking_id}/status")
async def set_booking_status(booking_id: str, payload: StatusPayload, user: dict = Depends(get_current_user)):
    if payload.status not in VALID_STATUSES:
        raise HTTPException(status_code=400, detail="Invalid status")
    booking = await db.bookings.find_one({"id": booking_id})
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    await db.bookings.update_one({"id": booking_id}, {"$set": {"status": payload.status}})
    email_status = None
    if payload.status == "approved":
        _, end = booking_start_end(booking)
        gcal = google_calendar_url(booking)
        email_status = await send_booking_email(
            to=booking["email"],
            subject=f"Booking approved: {booking['service_title']} — {booking['date']} at {booking['time']} (Saskatoon time)",
            html=email_shell(
                "Your booking is approved",
                f"<p>Hi {escape(booking['name'])},</p>"
                "<p>Great news — your appointment is confirmed.</p>"
                + booking_rows_html([
                    ("Service", booking["service_title"]),
                    ("Date", booking["date"]),
                    ("Time", f"{booking['time']} – {sk_time_label(end)} (Saskatoon time, CST)"),
                    ("Reference", booking["id"][:8].upper()),
                ])
                + f'<p style="margin:22px 0"><a href="{escape(gcal, quote=True)}" style="background:#74C365;color:#000000;padding:12px 22px;border-radius:999px;text-decoration:none;font-weight:bold">Add to Google Calendar</a></p>'
                + "<p>If anything changes, just reply to this email or call 1 (306) 960-0091.</p>",
            ),
            kind="booking_approved",
            booking_id=booking_id,
        )
    return {"id": booking_id, "status": payload.status, "email": email_status}


@api_router.delete("/bookings/{booking_id}")
async def delete_booking(booking_id: str, user: dict = Depends(get_current_user)):
    result = await db.bookings.delete_one({"id": booking_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Booking not found")
    return {"message": "Deleted"}


@api_router.delete("/contacts/{contact_id}")
async def delete_contact(contact_id: str, user: dict = Depends(get_current_user)):
    result = await db.contacts.delete_one({"id": contact_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Message not found")
    return {"message": "Deleted"}


# ---------- Website content, Blog, Uploads & Sitemap ----------

CONTENT_KEYS = {"home", "services", "staff", "contact", "footer", "design"}
UPLOAD_DIR = Path("/app/backend/uploads")
UPLOAD_DIR.mkdir(exist_ok=True)
ALLOWED_IMAGE_TYPES = {"image/jpeg": ".jpg", "image/png": ".png", "image/webp": ".webp", "image/gif": ".gif"}
MAX_UPLOAD_BYTES = 5 * 1024 * 1024


def slugify(text: str) -> str:
    slug = re.sub(r"[^a-z0-9]+", "-", (text or "").lower()).strip("-")
    return slug or uuid.uuid4().hex[:8]


@api_router.get("/content/{key}")
async def get_published_content(key: str):
    if key not in CONTENT_KEYS:
        raise HTTPException(status_code=404, detail="Unknown content key")
    doc = await db.site_content.find_one({"key": key}, {"_id": 0})
    return {"data": (doc or {}).get("published") or {}}


@api_router.get("/content/{key}/draft")
async def get_draft_content(key: str, user: dict = Depends(get_current_user)):
    if key not in CONTENT_KEYS:
        raise HTTPException(status_code=404, detail="Unknown content key")
    doc = await db.site_content.find_one({"key": key}, {"_id": 0}) or {}
    return {"data": doc.get("draft") or doc.get("published") or {}}


@api_router.get("/admin/content/{key}")
async def admin_get_content(key: str, user: dict = Depends(get_current_user)):
    if key not in CONTENT_KEYS:
        raise HTTPException(status_code=404, detail="Unknown content key")
    doc = await db.site_content.find_one({"key": key}, {"_id": 0})
    return doc or {"key": key, "draft": None, "published": None, "revisions": []}


@api_router.put("/admin/content/{key}/draft")
async def admin_save_draft(key: str, payload: dict = Body(...), user: dict = Depends(get_current_user)):
    if key not in CONTENT_KEYS:
        raise HTTPException(status_code=404, detail="Unknown content key")
    await db.site_content.update_one(
        {"key": key},
        {"$set": {"key": key, "draft": payload, "updated_at": now_iso()}},
        upsert=True,
    )
    return {"message": "Draft saved"}


@api_router.post("/admin/content/{key}/publish")
async def admin_publish_content(key: str, user: dict = Depends(get_current_user)):
    if key not in CONTENT_KEYS:
        raise HTTPException(status_code=404, detail="Unknown content key")
    doc = await db.site_content.find_one({"key": key})
    if not doc or doc.get("draft") is None:
        raise HTTPException(status_code=400, detail="No draft to publish")
    revisions = doc.get("revisions") or []
    if doc.get("published") is not None:
        revisions.insert(0, {"data": doc["published"], "saved_at": doc.get("published_at") or now_iso()})
        revisions = revisions[:5]
    await db.site_content.update_one(
        {"key": key},
        {"$set": {"published": doc["draft"], "revisions": revisions, "published_at": now_iso()}},
    )
    return {"message": "Published"}


@api_router.post("/admin/content/{key}/restore/{index}")
async def admin_restore_content(key: str, index: int, user: dict = Depends(get_current_user)):
    if key not in CONTENT_KEYS:
        raise HTTPException(status_code=404, detail="Unknown content key")
    doc = await db.site_content.find_one({"key": key})
    revs = (doc or {}).get("revisions") or []
    if index < 0 or index >= len(revs):
        raise HTTPException(status_code=404, detail="Revision not found")
    await db.site_content.update_one({"key": key}, {"$set": {"draft": revs[index]["data"], "updated_at": now_iso()}})
    return {"message": "Revision restored to draft"}


class PostPayload(BaseModel):
    title: str
    slug: Optional[str] = ""
    content: str = ""
    seo_title: Optional[str] = ""
    seo_description: Optional[str] = ""
    featured_image: Optional[str] = ""
    featured_alt: Optional[str] = ""
    author: Optional[str] = "Patrick Vachon"


def post_public(post: dict) -> dict:
    post.pop("_id", None)
    return post


@api_router.get("/blog")
async def list_published_posts():
    return await db.posts.find({"status": "published"}, {"_id": 0, "content": 0}).sort("published_at", -1).to_list(200)


@api_router.get("/blog/{slug}")
async def get_published_post(slug: str):
    post = await db.posts.find_one({"slug": slug, "status": "published"}, {"_id": 0})
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    return post


@api_router.get("/admin/blog")
async def admin_list_posts(user: dict = Depends(get_current_user)):
    return await db.posts.find({}, {"_id": 0}).sort("updated_at", -1).to_list(500)


@api_router.post("/admin/blog")
async def admin_create_post(payload: PostPayload, user: dict = Depends(get_current_user)):
    slug = slugify(payload.slug or payload.title)
    if await db.posts.find_one({"slug": slug}):
        raise HTTPException(status_code=400, detail="That URL slug is already in use")
    doc = {
        "id": str(uuid.uuid4()),
        "slug": slug,
        "title": payload.title,
        "content": payload.content,
        "seo_title": payload.seo_title or "",
        "seo_description": payload.seo_description or "",
        "featured_image": payload.featured_image or "",
        "featured_alt": payload.featured_alt or "",
        "author": payload.author or "Patrick Vachon",
        "status": "draft",
        "created_at": now_iso(),
        "updated_at": now_iso(),
        "published_at": None,
    }
    await db.posts.insert_one(doc)
    return post_public(doc)


@api_router.put("/admin/blog/{post_id}")
async def admin_update_post(post_id: str, payload: PostPayload, user: dict = Depends(get_current_user)):
    post = await db.posts.find_one({"id": post_id})
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    slug = slugify(payload.slug or payload.title)
    clash = await db.posts.find_one({"slug": slug, "id": {"$ne": post_id}})
    if clash:
        raise HTTPException(status_code=400, detail="That URL slug is already in use")
    await db.posts.update_one({"id": post_id}, {"$set": {
        "slug": slug, "title": payload.title, "content": payload.content,
        "seo_title": payload.seo_title or "", "seo_description": payload.seo_description or "",
        "featured_image": payload.featured_image or "", "featured_alt": payload.featured_alt or "",
        "author": payload.author or "Patrick Vachon", "updated_at": now_iso(),
    }})
    return post_public(await db.posts.find_one({"id": post_id}))


@api_router.post("/admin/blog/{post_id}/publish")
async def admin_publish_post(post_id: str, user: dict = Depends(get_current_user)):
    post = await db.posts.find_one({"id": post_id})
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    await db.posts.update_one({"id": post_id}, {"$set": {
        "status": "published",
        "published_at": post.get("published_at") or now_iso(),
        "updated_at": now_iso(),
    }})
    return {"message": "Published"}


@api_router.post("/admin/blog/{post_id}/unpublish")
async def admin_unpublish_post(post_id: str, user: dict = Depends(get_current_user)):
    result = await db.posts.update_one({"id": post_id}, {"$set": {"status": "draft", "updated_at": now_iso()}})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Post not found")
    return {"message": "Unpublished"}


@api_router.delete("/admin/blog/{post_id}")
async def admin_delete_post(post_id: str, user: dict = Depends(get_current_user)):
    result = await db.posts.delete_one({"id": post_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Post not found")
    return {"message": "Deleted"}


@api_router.post("/uploads")
async def upload_image(file: UploadFile = File(...), user: dict = Depends(get_current_user)):
    ext = ALLOWED_IMAGE_TYPES.get(file.content_type or "")
    if not ext:
        raise HTTPException(status_code=400, detail="Only JPG, PNG, WEBP or GIF images are allowed")
    data = await file.read(MAX_UPLOAD_BYTES + 1)
    if len(data) > MAX_UPLOAD_BYTES:
        raise HTTPException(status_code=400, detail="Image must be under 5 MB")
    filename = f"{uuid.uuid4().hex}{ext}"
    (UPLOAD_DIR / filename).write_bytes(data)
    return {"url": f"/api/uploads/{filename}"}


@api_router.get("/uploads/{filename}")
async def get_upload(filename: str):
    path = UPLOAD_DIR / Path(filename).name
    if not path.is_file():
        raise HTTPException(status_code=404, detail="File not found")
    return FileResponse(path)


@api_router.get("/sitemap.xml")
async def sitemap(request: Request):
    # Preferred host keeps canonical/sitemap consistent regardless of which alias serves the request
    base = os.environ.get("SITE_URL")
    if not base:
        host = request.headers.get("x-forwarded-host") or request.headers.get("host") or request.url.hostname
        proto = request.headers.get("x-forwarded-proto") or request.url.scheme
        base = f"{proto}://{host}"
    pages = ["", "/services", "/booking", "/staff", "/contact", "/faq", "/blog", "/sitemap"]
    posts = await db.posts.find({"status": "published"}, {"_id": 0, "slug": 1, "published_at": 1}).to_list(500)
    urls = "".join(f"<url><loc>{base}{p}</loc></url>" for p in pages)
    urls += "".join(
        f"<url><loc>{base}/blog/{p['slug']}</loc><lastmod>{(p.get('published_at') or '')[:10]}</lastmod></url>"
        for p in posts
    )
    xml = f'<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">{urls}</urlset>'
    return Response(content=xml, media_type="application/xml")


# ---------- Intake form PDFs ----------

def wrap_text(text, max_chars):
    words, lines, cur = text.split(), [], ""
    for w in words:
        if len(cur) + len(w) + 1 > max_chars:
            lines.append(cur)
            cur = w
        else:
            cur = f"{cur} {w}".strip()
    if cur:
        lines.append(cur)
    return lines


@api_router.get("/intake-forms/{slug}")
async def intake_form(slug: str):
    svc = SERVICES.get(slug)
    if not svc:
        raise HTTPException(status_code=404, detail="Unknown intake form")
    buf = io.BytesIO()
    c = canvas.Canvas(buf, pagesize=letter)
    w, h = letter

    c.setFillColorRGB(0x07 / 255, 0x6A / 255, 0x21 / 255)
    c.rect(0, h - 1.1 * inch, w, 1.1 * inch, stroke=0, fill=1)
    c.setFillColorRGB(0xFD / 255, 0xD4 / 255, 0x01 / 255)
    c.setFont("Helvetica-Bold", 16)
    c.drawString(0.75 * inch, h - 0.65 * inch, "Vici SaskStartupSolutions")
    c.setFillColorRGB(1, 1, 1)
    c.setFont("Helvetica", 10)
    c.drawString(0.75 * inch, h - 0.9 * inch, "Bookkeeping - T2 Corporate Filing - ISC Registry Administration - Saskatoon, SK")

    c.setFillColorRGB(0, 0, 0)
    c.setFont("Helvetica-Bold", 14)
    c.drawString(0.75 * inch, h - 1.6 * inch, f"Client Intake Form: {svc['title']}")
    c.setFont("Helvetica", 9)
    c.drawString(0.75 * inch, h - 1.85 * inch,
                 "Complete this form and email it to saskstartupsolutions@viciconsulting.ca")

    y = h - 2.35 * inch
    c.setFont("Helvetica-Bold", 10)
    c.drawString(0.75 * inch, y, "Contact information")
    y -= 0.32 * inch
    c.setFont("Helvetica", 10)
    for label in ["Full name", "Email", "Phone", "Preferred contact method"]:
        c.drawString(0.75 * inch, y, f"{label}:")
        c.line(2.4 * inch, y - 2, w - 0.75 * inch, y - 2)
        y -= 0.34 * inch

    y -= 0.15 * inch
    c.setFont("Helvetica-Bold", 10)
    c.drawString(0.75 * inch, y, "Service questions")
    y -= 0.32 * inch
    c.setFont("Helvetica", 10)
    for i, q in enumerate(svc["questions"], 1):
        for line in wrap_text(f"{i}. {q}", 88):
            c.drawString(0.75 * inch, y, line)
            y -= 0.24 * inch
        c.line(1.1 * inch, y - 2, w - 0.75 * inch, y - 2)
        y -= 0.3 * inch
        if y < 1.2 * inch:
            c.showPage()
            c.setFont("Helvetica", 10)
            y = h - 1 * inch

    y -= 0.1 * inch
    c.setFont("Helvetica-Bold", 10)
    c.drawString(0.75 * inch, y, "Additional notes")
    y -= 0.3 * inch
    for _ in range(4):
        c.line(0.75 * inch, y, w - 0.75 * inch, y)
        y -= 0.3 * inch

    c.setFont("Helvetica", 8)
    c.setFillColorRGB(0.2, 0.2, 0.2)
    c.drawString(0.75 * inch, 0.6 * inch,
                 "Vici SaskStartupSolutions - 539 Avenue I N, Saskatoon, SK S7L 2G9 - 1 (306) 960-0091")
    c.showPage()
    c.save()
    buf.seek(0)
    filename = f"vici-intake-form-{slug}.pdf"
    return StreamingResponse(
        buf, media_type="application/pdf",
        headers={"Content-Disposition": f'attachment; filename="{filename}"'},
    )


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


@app.on_event("startup")
async def startup_seed():
    await db.users.create_index("email", unique=True)
    await db.login_attempts.create_index("identifier")

    admin_email = os.environ.get("ADMIN_EMAIL", "admin@example.com").lower()
    admin_password = os.environ.get("ADMIN_PASSWORD", "admin123")
    # Seed only when no users exist — in-app credential changes (OTP-verified) must
    # survive restarts, so the stored hash/email is never reconciled against env.
    if await db.users.count_documents({}) == 0:
        await db.users.insert_one({
            "id": str(uuid.uuid4()),
            "email": admin_email,
            "password_hash": hash_password(admin_password),
            "name": "Patrick Vachon",
            "role": "admin",
            "created_at": now_iso(),
        })
        logger.info("Admin user seeded")

    # Staff accounts were removed manually 2026-10 — startup never deletes data.
    await db.bookings.update_many({"status": {"$exists": False}}, {"$set": {"status": "pending"}})

    if await db.faqs.count_documents({}) == 0:
        await db.faqs.insert_many([
            {"id": str(uuid.uuid4()), "order": i + 1, **faq} for i, faq in enumerate(DEFAULT_FAQS)
        ])
        logger.info("FAQs seeded")


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
