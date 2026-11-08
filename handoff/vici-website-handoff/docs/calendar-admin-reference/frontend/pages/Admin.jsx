import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { Lock, LogOut, CalendarDays, Mail, HelpCircle, Plus, Pencil, Trash2, X, Check, Search, Newspaper, FileText, Palette, CalendarPlus, Download, UserCog, ShieldCheck } from "lucide-react";
import { API } from "@/lib/site";
import BlogTab from "@/components/admin/BlogTab";
import ContentTab from "@/components/admin/ContentTab";
import DesignTab from "@/components/admin/DesignTab";

function apiError(err) {
  const detail = err.response?.data?.detail;
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail)) return detail.map((e) => e?.msg || "").filter(Boolean).join(" ");
  return "Something went wrong. Please try again.";
}

const STATUS_META = {
  pending: { label: "Pending", badge: "bg-spring text-black" },
  approved: { label: "Approved", badge: "bg-mantis text-black" },
  declined: { label: "Declined", badge: "bg-red-100 text-red-800 border border-red-300" },
  completed: { label: "Completed", badge: "bg-black text-white" },
};
const FILTERS = ["all", "pending", "approved", "declined", "completed"];

function StatusBadge({ status }) {
  const meta = STATUS_META[status] || STATUS_META.pending;
  return (
    <span data-testid={`status-badge-${status}`} className={`rounded-full px-3 py-1 font-sans text-[0.65rem] font-semibold uppercase tracking-widest ${meta.badge}`}>
      {meta.label}
    </span>
  );
}

function BookingsTab() {
  const [bookings, setBookings] = useState(null);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState(null);
  const [calOpts, setCalOpts] = useState(null);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState("");

  const load = useCallback(() => {
    axios.get(`${API}/bookings`, { withCredentials: true }).then((r) => setBookings(r.data)).catch(() => setBookings([]));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    setCalOpts(null);
    if (selected && (selected.status || "pending") === "approved") {
      axios.get(`${API}/bookings/${selected.id}/calendar`, { withCredentials: true })
        .then((r) => setCalOpts(r.data))
        .catch(() => setCalOpts(null));
    }
  }, [selected?.id, selected?.status]);

  const setStatus = async (id, status) => {
    setSaving(true);
    setNotice("");
    try {
      await axios.patch(`${API}/bookings/${id}/status`, { status }, { withCredentials: true });
      if (status === "approved") {
        setNotice("Booking approved — calendar options are now available below.");
      } else {
        setNotice("Booking status updated.");
      }
      await load();
      setSelected((s) => (s && s.id === id ? { ...s, status } : s));
      setBookings((bs) => bs.map((b) => (b.id === id ? { ...b, status } : b)));
    } catch (e) {
      setNotice(apiError(e));
    } finally {
      setSaving(false);
    }
  };

  const removeBooking = async (id) => {
    if (!window.confirm("Delete this booking permanently? This cannot be undone.")) return;
    try {
      await axios.delete(`${API}/bookings/${id}`, { withCredentials: true });
      setSelected(null);
      setNotice("Booking deleted.");
      load();
    } catch (e) {
      setNotice(apiError(e));
    }
  };

  if (bookings === null) return <p className="font-serif text-black/70">Loading bookings...</p>;

  const q = query.trim().toLowerCase();
  const filtered = bookings.filter((b) => {
    const matchesStatus = filter === "all" || (b.status || "pending") === filter;
    const matchesQuery = !q || `${b.name} ${b.email} ${b.service_title} ${b.phone}`.toLowerCase().includes(q);
    return matchesStatus && matchesQuery;
  });

  return (
    <div>
      {notice && <p data-testid="booking-action-notice" role="status" className="mb-4 rounded-xl bg-mantis/30 px-4 py-3 font-sans text-sm font-semibold text-black">{notice}</p>}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 sm:max-w-sm">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-black/50" aria-hidden="true" />
          <input
            data-testid="booking-search-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name, email, service, phone..."
            aria-label="Search bookings"
            className="w-full rounded-full border-2 border-black/20 bg-white py-2.5 pl-11 pr-4 font-sans text-sm text-black outline-none focus:border-black"
          />
        </div>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by status">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              data-testid={`booking-filter-${f}`}
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className={`rounded-full border-2 px-4 py-1.5 font-sans text-xs font-semibold uppercase tracking-wide transition-colors ${
                filter === f ? "border-black bg-black text-white" : "border-black/20 bg-white text-black hover:border-black"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {!filtered.length ? (
        <p data-testid="bookings-empty" className="mt-6 font-serif text-black/70">
          {bookings.length ? "No bookings match your search or filter." : "No bookings yet."}
        </p>
      ) : (
        <div className="mt-6 space-y-3" data-testid="bookings-list">
          {filtered.slice().reverse().map((b) => (
            <button
              key={b.id}
              type="button"
              data-testid={`booking-row-${b.id.slice(0, 8)}`}
              onClick={() => { setSelected(b); setNotice(""); }}
              className="flex w-full flex-wrap items-center justify-between gap-3 rounded-2xl border-2 border-black/15 bg-white p-5 text-left transition-colors hover:border-black"
            >
              <span>
                <span className="block font-sans text-base font-semibold text-black">{b.name}</span>
                <span className="mt-0.5 block font-sans text-sm text-black/70">{b.service_title}</span>
              </span>
              <span className="flex items-center gap-3">
                <span className="font-sans text-xs font-semibold uppercase tracking-widest text-black/60">{b.date} · {b.time}</span>
                <StatusBadge status={b.status || "pending"} />
              </span>
            </button>
          ))}
        </div>
      )}

      <AnimatePresence>
        {selected && (
          <motion.div
            key="booking-detail"
            data-testid="booking-detail-modal"
            role="dialog"
            aria-modal="true"
            aria-label={`Booking details for ${selected.name}`}
            className="fixed inset-0 z-[70] flex items-end justify-center bg-black/60 p-0 sm:items-center sm:p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-white p-7 shadow-2xl sm:rounded-3xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-serif text-2xl uppercase text-black">{selected.name}</h3>
                  <p className="mt-1 font-mono text-xs text-black/60">Ref: {selected.id.slice(0, 8).toUpperCase()}</p>
                </div>
                <div className="flex items-center gap-2">
                  <StatusBadge status={selected.status || "pending"} />
                  <button type="button" data-testid="booking-detail-close-btn" aria-label="Close details" onClick={() => setSelected(null)} className="rounded-full p-1.5 hover:bg-black/5">
                    <X className="h-5 w-5 text-black" />
                  </button>
                </div>
              </div>

              <dl className="mt-6 space-y-3 font-serif text-base text-black/85">
                <div><dt className="font-sans text-xs font-semibold uppercase tracking-widest text-black/50">Service</dt><dd data-testid="detail-service">{selected.service_title}</dd></div>
                <div><dt className="font-sans text-xs font-semibold uppercase tracking-widest text-black/50">Appointment</dt><dd data-testid="detail-datetime">{selected.date} at {selected.time} (Saskatoon time)</dd></div>
                <div><dt className="font-sans text-xs font-semibold uppercase tracking-widest text-black/50">Email</dt><dd data-testid="detail-email"><a className="underline" href={`mailto:${selected.email}`}>{selected.email}</a></dd></div>
                <div><dt className="font-sans text-xs font-semibold uppercase tracking-widest text-black/50">Phone</dt><dd data-testid="detail-phone"><a className="underline" href={`tel:${selected.phone}`}>{selected.phone}</a></dd></div>
                <div><dt className="font-sans text-xs font-semibold uppercase tracking-widest text-black/50">Notes</dt><dd data-testid="detail-notes">{selected.notes || "—"}</dd></div>
              </dl>

              {(selected.status || "pending") === "approved" && (
                <div data-testid="calendar-options" className="mt-6 rounded-2xl border-2 border-black/15 bg-spring/30 p-4">
                  <p className="font-sans text-xs font-semibold uppercase tracking-widest text-black/60">Calendar — Saskatoon time (CST, UTC−6 year-round)</p>
                  {calOpts ? (
                    <>
                      <p data-testid="calendar-options-window" className="mt-1 font-serif text-sm text-black/85">
                        {calOpts.date} · {calOpts.start_time} – {calOpts.end_time} ({calOpts.duration_minutes} min)
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <a
                          data-testid="add-to-google-calendar-link"
                          href={calOpts.google_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-full bg-mantis px-4 py-2 font-sans text-xs font-semibold uppercase tracking-wide text-black transition-transform duration-200 hover:scale-105"
                        >
                          <CalendarPlus className="h-4 w-4" aria-hidden="true" /> Add to Google Calendar
                        </a>
                        <a
                          data-testid="download-ics-link"
                          href={`${API}/bookings/${selected.id}/calendar.ics`}
                          download
                          className="inline-flex items-center gap-2 rounded-full border-2 border-black bg-transparent px-4 py-2 font-sans text-xs font-semibold uppercase tracking-wide text-black transition-colors duration-200 hover:bg-black hover:text-white"
                        >
                          <Download className="h-4 w-4" aria-hidden="true" /> Download .ics
                        </a>
                      </div>
                      <p className="mt-2 font-serif text-xs italic text-black/60">The .ics file works with Google Calendar, Apple Calendar, and Outlook — the event imports at the correct Saskatoon time.</p>
                    </>
                  ) : (
                    <p className="mt-1 font-serif text-sm text-black/70">Loading calendar options...</p>
                  )}
                </div>
              )}

              <p className="mt-7 font-sans text-xs font-semibold uppercase tracking-widest text-black/50">Set status</p>
              <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {[
                  { s: "pending", label: "Pending" },
                  { s: "approved", label: "Approve (Yes)" },
                  { s: "declined", label: "Decline (No)" },
                  { s: "completed", label: "Completed" },
                ].map(({ s, label }) => (
                  <button
                    key={s}
                    type="button"
                    data-testid={`booking-status-btn-${s}`}
                    disabled={saving || (selected.status || "pending") === s}
                    onClick={() => setStatus(selected.id, s)}
                    className={`rounded-full border-2 px-3 py-2 font-sans text-xs font-semibold uppercase tracking-wide transition-colors disabled:cursor-default ${
                      (selected.status || "pending") === s
                        ? "border-black bg-black text-white"
                        : "border-black/25 text-black hover:border-black disabled:opacity-100"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <button
                type="button"
                data-testid="booking-delete-btn"
                onClick={() => removeBooking(selected.id)}
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-red-700 px-5 py-2.5 font-sans text-xs font-semibold uppercase tracking-wide text-red-700 transition-colors hover:bg-red-700 hover:text-white"
              >
                <Trash2 className="h-4 w-4" aria-hidden="true" /> Delete Booking
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MessagesTab() {
  const [messages, setMessages] = useState(null);
  const load = useCallback(() => {
    axios.get(`${API}/contacts`, { withCredentials: true }).then((r) => setMessages(r.data)).catch(() => setMessages([]));
  }, []);
  useEffect(load, [load]);

  const removeMessage = async (id) => {
    if (!window.confirm("Delete this message permanently?")) return;
    await axios.delete(`${API}/contacts/${id}`, { withCredentials: true }).catch(() => {});
    load();
  };

  if (messages === null) return <p className="font-serif text-black/70">Loading messages...</p>;
  if (!messages.length) return <p data-testid="messages-empty" className="font-serif text-black/70">No messages yet.</p>;
  return (
    <div className="space-y-4" data-testid="messages-list">
      {messages.slice().reverse().map((m) => (
        <div key={m.id} data-testid={`message-row-${m.id.slice(0, 8)}`} className="rounded-2xl border-2 border-black/15 bg-white p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="font-sans text-base font-semibold text-black">{m.name}</p>
            <span className="flex items-center gap-3">
              <span className="font-sans text-xs uppercase tracking-widest text-black/60">{new Date(m.created_at).toLocaleDateString()}</span>
              <button
                type="button"
                data-testid={`message-delete-btn-${m.id.slice(0, 8)}`}
                aria-label={`Delete message from ${m.name}`}
                onClick={() => removeMessage(m.id)}
                className="rounded-full border-2 border-red-700 p-1.5 text-red-700 transition-colors hover:bg-red-700 hover:text-white"
              >
                <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </span>
          </div>
          <p className="mt-1 font-serif text-sm text-black/70">{m.email}{m.phone ? ` · ${m.phone}` : ""}</p>
          <p className="mt-2 font-serif text-base text-black/85">{m.message}</p>
        </div>
      ))}
    </div>
  );
}

function FaqsTab() {
  const [faqs, setFaqs] = useState(null);
  const [editing, setEditing] = useState(null);
  const [draft, setDraft] = useState({ question: "", answer: "" });
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState("");

  const load = useCallback(() => {
    axios.get(`${API}/faqs`, { withCredentials: true }).then((r) => setFaqs(r.data)).catch(() => setFaqs([]));
  }, []);
  useEffect(load, [load]);

  const save = async () => {
    setError("");
    try {
      if (adding) {
        await axios.post(`${API}/faqs`, draft, { withCredentials: true });
        setAdding(false);
      } else {
        await axios.put(`${API}/faqs/${editing}`, draft, { withCredentials: true });
        setEditing(null);
      }
      setDraft({ question: "", answer: "" });
      load();
    } catch (e) {
      setError(apiError(e));
    }
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this FAQ?")) return;
    await axios.delete(`${API}/faqs/${id}`, { withCredentials: true });
    load();
  };

  if (faqs === null) return <p className="font-serif text-black/70">Loading FAQs...</p>;

  const form = (
    <div className="rounded-2xl border-2 border-black bg-white p-5">
      <label className="font-sans text-xs font-semibold uppercase tracking-widest text-black" htmlFor="faq-edit-question">Question</label>
      <input
        id="faq-edit-question"
        data-testid="faq-edit-question"
        value={draft.question}
        onChange={(e) => setDraft({ ...draft, question: e.target.value })}
        className="mt-1 w-full rounded-xl border-2 border-black/20 bg-transparent px-4 py-2.5 font-sans text-sm text-black outline-none focus:border-black"
      />
      <label className="mt-4 block font-sans text-xs font-semibold uppercase tracking-widest text-black" htmlFor="faq-edit-answer">Answer</label>
      <textarea
        id="faq-edit-answer"
        data-testid="faq-edit-answer"
        rows={4}
        value={draft.answer}
        onChange={(e) => setDraft({ ...draft, answer: e.target.value })}
        className="mt-1 w-full rounded-xl border-2 border-black/20 bg-transparent px-4 py-2.5 font-serif text-sm text-black outline-none focus:border-black"
      />
      {error && <p data-testid="faq-edit-error" role="alert" className="mt-2 font-sans text-sm font-semibold text-red-700">{error}</p>}
      <div className="mt-4 flex gap-2">
        <button
          type="button"
          data-testid="faq-save-btn"
          onClick={save}
          disabled={!draft.question || !draft.answer}
          className="inline-flex items-center gap-2 rounded-full bg-mantis px-5 py-2 font-sans text-xs font-semibold uppercase tracking-wide text-black disabled:opacity-40"
        >
          <Check className="h-4 w-4" aria-hidden="true" /> Save
        </button>
        <button
          type="button"
          data-testid="faq-cancel-btn"
          onClick={() => { setEditing(null); setAdding(false); setDraft({ question: "", answer: "" }); }}
          className="inline-flex items-center gap-2 rounded-full border-2 border-black px-5 py-2 font-sans text-xs font-semibold uppercase tracking-wide text-black"
        >
          <X className="h-4 w-4" aria-hidden="true" /> Cancel
        </button>
      </div>
    </div>
  );

  return (
    <div data-testid="faqs-admin">
      <button
        type="button"
        data-testid="faq-add-btn"
        onClick={() => { setAdding(true); setEditing(null); setDraft({ question: "", answer: "" }); }}
        className="mb-5 inline-flex items-center gap-2 rounded-full bg-mantis px-5 py-2.5 font-sans text-xs font-semibold uppercase tracking-wide text-black transition-transform hover:scale-105"
      >
        <Plus className="h-4 w-4" aria-hidden="true" /> Add FAQ
      </button>
      {adding && <div className="mb-5">{form}</div>}
      <div className="space-y-4">
        {faqs.map((f) => (
          <div key={f.id} data-testid={`faq-admin-row-${f.id.slice(0, 8)}`} className="rounded-2xl border-2 border-black/15 bg-white p-5">
            {editing === f.id ? (
              form
            ) : (
              <>
                <p className="font-sans text-base font-semibold text-black">{f.question}</p>
                <p className="mt-2 font-serif text-sm leading-relaxed text-black/75">{f.answer}</p>
                <div className="mt-3 flex gap-2">
                  <button
                    type="button"
                    data-testid={`faq-edit-btn-${f.id.slice(0, 8)}`}
                    onClick={() => { setEditing(f.id); setAdding(false); setDraft({ question: f.question, answer: f.answer }); }}
                    className="inline-flex items-center gap-1.5 rounded-full border-2 border-black px-4 py-1.5 font-sans text-xs font-semibold uppercase tracking-wide text-black hover:bg-black hover:text-white"
                  >
                    <Pencil className="h-3.5 w-3.5" aria-hidden="true" /> Edit
                  </button>
                  <button
                    type="button"
                    data-testid={`faq-delete-btn-${f.id.slice(0, 8)}`}
                    onClick={() => remove(f.id)}
                    className="inline-flex items-center gap-1.5 rounded-full border-2 border-red-700 px-4 py-1.5 font-sans text-xs font-semibold uppercase tracking-wide text-red-700 hover:bg-red-700 hover:text-white"
                  >
                    <Trash2 className="h-3.5 w-3.5" aria-hidden="true" /> Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function AccountTab() {
  const [me, setMe] = useState(null);
  const [form, setForm] = useState({ new_email: "", new_password: "" });
  const [stage, setStage] = useState("edit");
  const [otp, setOtp] = useState("");
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get(`${API}/auth/me`, { withCredentials: true }).then((r) => setMe(r.data)).catch(() => {});
  }, []);

  const requestChange = async (e) => {
    e.preventDefault();
    setBusy(true); setError(""); setNotice("");
    try {
      const payload = {};
      if (form.new_email.trim()) payload.new_email = form.new_email.trim();
      if (form.new_password) payload.new_password = form.new_password;
      const { data } = await axios.post(`${API}/auth/request-change`, payload, { withCredentials: true });
      setNotice(data.message);
      setStage("confirm");
    } catch (err) { setError(apiError(err)); } finally { setBusy(false); }
  };

  const confirmChange = async (e) => {
    e.preventDefault();
    setBusy(true); setError("");
    try {
      const { data } = await axios.post(`${API}/auth/confirm-change`, { otp }, { withCredentials: true });
      setNotice(`Sign-in details updated — use ${data.email} to sign in from now on.`);
      setStage("edit"); setOtp(""); setForm({ new_email: "", new_password: "" });
      const r = await axios.get(`${API}/auth/me`, { withCredentials: true }).catch(() => null);
      if (r) setMe(r.data);
    } catch (err) { setError(apiError(err)); } finally { setBusy(false); }
  };

  return (
    <div className="mx-auto max-w-md rounded-3xl border-2 border-black/15 bg-white p-8 shadow-xl" data-testid="account-tab">
      <ShieldCheck className="mx-auto h-10 w-10 text-black" aria-hidden="true" />
      <h2 className="mt-4 text-center font-serif text-2xl uppercase text-black">Sign-in & Security</h2>
      <p className="mt-2 text-center font-serif text-sm text-black/70">
        Current sign-in email: <strong data-testid="account-current-email">{me?.email || "..."}</strong>
      </p>

      {stage === "edit" ? (
        <form onSubmit={requestChange} className="mt-6 space-y-4" data-testid="account-change-form">
          <div>
            <label htmlFor="account-new-email" className="font-sans text-xs font-semibold uppercase tracking-widest text-black">New email (optional)</label>
            <input id="account-new-email" data-testid="account-new-email-input" type="email" value={form.new_email} onChange={(e) => setForm({ ...form, new_email: e.target.value })} placeholder="Leave blank to keep current" className="mt-2 w-full rounded-xl border-2 border-black/20 bg-transparent px-4 py-3 font-sans text-base text-black outline-none focus:border-black" autoComplete="off" />
          </div>
          <div>
            <label htmlFor="account-new-password" className="font-sans text-xs font-semibold uppercase tracking-widest text-black">New password (optional)</label>
            <input id="account-new-password" data-testid="account-new-password-input" type="password" value={form.new_password} onChange={(e) => setForm({ ...form, new_password: e.target.value })} placeholder="Min. 8 characters" className="mt-2 w-full rounded-xl border-2 border-black/20 bg-transparent px-4 py-3 font-sans text-base text-black outline-none focus:border-black" autoComplete="new-password" />
          </div>
          <p className="font-serif text-xs italic text-black/60">A one-time verification code will be emailed to your current sign-in email before anything changes.</p>
          <button type="submit" data-testid="account-send-code-btn" disabled={busy || (!form.new_email.trim() && !form.new_password)} className="w-full rounded-full bg-mantis px-6 py-3 font-sans text-sm font-semibold uppercase tracking-wide text-black transition-transform hover:scale-[1.02] disabled:opacity-40">
            {busy ? "Sending..." : "Email Me a Verification Code"}
          </button>
        </form>
      ) : (
        <form onSubmit={confirmChange} className="mt-6 space-y-4" data-testid="account-otp-form">
          <div>
            <label htmlFor="account-otp" className="font-sans text-xs font-semibold uppercase tracking-widest text-black">6-digit verification code</label>
            <input id="account-otp" data-testid="account-otp-input" type="text" inputMode="numeric" pattern="[0-9]{6}" maxLength={6} required value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))} className="mt-2 w-full rounded-xl border-2 border-black/20 bg-transparent px-4 py-3 text-center font-mono text-2xl tracking-[0.5em] text-black outline-none focus:border-black" autoComplete="one-time-code" />
          </div>
          <button type="submit" data-testid="account-confirm-btn" disabled={busy || otp.length !== 6} className="w-full rounded-full bg-mantis px-6 py-3 font-sans text-sm font-semibold uppercase tracking-wide text-black transition-transform hover:scale-[1.02] disabled:opacity-40">
            {busy ? "Confirming..." : "Confirm Change"}
          </button>
          <button type="button" data-testid="account-cancel-btn" onClick={() => { setStage("edit"); setOtp(""); setError(""); }} className="w-full font-sans text-sm font-semibold text-black underline underline-offset-4">
            Cancel
          </button>
        </form>
      )}
      {notice && <p data-testid="account-notice" role="status" className="mt-4 rounded-xl bg-mantis/30 px-4 py-3 font-sans text-sm font-semibold text-black">{notice}</p>}
      {error && <p data-testid="account-error" role="alert" className="mt-4 font-sans text-sm font-semibold text-red-700">{error}</p>}
    </div>
  );
}

const TABS = [
  { id: "bookings", label: "Bookings", icon: CalendarDays },
  { id: "messages", label: "Messages", icon: Mail },
  { id: "faqs", label: "FAQs", icon: HelpCircle },
  { id: "blog", label: "Blog", icon: Newspaper },
  { id: "content", label: "Content", icon: FileText },
  { id: "design", label: "Design", icon: Palette },
  { id: "account", label: "Account", icon: UserCog },
];

export default function Admin() {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);
  const [tab, setTab] = useState("bookings");
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  useEffect(() => {
    axios.get(`${API}/auth/me`, { withCredentials: true })
      .then((r) => setUser(r.data))
      .catch(() => setUser(false))
      .finally(() => setChecking(false));
  }, []);

  const login = async (e) => {
    e.preventDefault();
    setLoggingIn(true);
    setLoginError("");
    try {
      const { data } = await axios.post(`${API}/auth/login`, loginForm, { withCredentials: true });
      setUser(data);
    } catch (err) {
      setLoginError(apiError(err));
    } finally {
      setLoggingIn(false);
    }
  };

  const logout = async () => {
    await axios.post(`${API}/auth/logout`, {}, { withCredentials: true }).catch(() => {});
    setUser(false);
  };

  return (
    <div data-testid="admin-page" className="bg-praxeti">
      <section className="bg-bookgreen">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h1 data-testid="admin-heading" className="font-serif text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl">
            Admin Dashboard
          </h1>
          {user && (
            <p className="mt-2 font-serif text-sm text-white/80">
              Signed in as {user.email}
            </p>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        {checking ? (
          <p className="font-serif text-black/70">Checking your session...</p>
        ) : !user ? (
          <div className="mx-auto max-w-md rounded-3xl border-2 border-black/15 bg-white p-8 shadow-xl">
            <Lock className="mx-auto h-10 w-10 text-black" aria-hidden="true" />
            <h2 className="mt-4 text-center font-serif text-2xl uppercase text-black">Admin Login</h2>
            <form onSubmit={login} data-testid="admin-login-form" className="mt-6 space-y-4">
              <div>
                <label htmlFor="admin-email" className="font-sans text-xs font-semibold uppercase tracking-widest text-black">Email</label>
                <input
                  id="admin-email"
                  data-testid="admin-email-input"
                  type="email"
                  required
                  autoComplete="email"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                  className="mt-2 w-full rounded-xl border-2 border-black/20 bg-transparent px-4 py-3 font-sans text-base text-black outline-none focus:border-black"
                />
              </div>
              <div>
                <label htmlFor="admin-password" className="font-sans text-xs font-semibold uppercase tracking-widest text-black">Password</label>
                <input
                  id="admin-password"
                  data-testid="admin-password-input"
                  type="password"
                  required
                  autoComplete="current-password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  className="mt-2 w-full rounded-xl border-2 border-black/20 bg-transparent px-4 py-3 font-sans text-base text-black outline-none focus:border-black"
                />
              </div>
              {loginError && <p data-testid="admin-login-error" role="alert" className="font-sans text-sm font-semibold text-red-700">{loginError}</p>}
              <button
                type="submit"
                data-testid="admin-login-btn"
                disabled={loggingIn}
                className="w-full rounded-full bg-mantis px-6 py-3 font-sans text-sm font-semibold uppercase tracking-wide text-black transition-transform hover:scale-[1.02] disabled:opacity-40"
              >
                {loggingIn ? "Signing in..." : "Sign In"}
              </button>
            </form>
          </div>
        ) : (
          <>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="inline-flex rounded-full border-2 border-black/20 p-1" role="tablist" aria-label="Admin sections">
                {TABS.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    role="tab"
                    aria-selected={tab === t.id}
                    data-testid={`admin-tab-${t.id}`}
                    onClick={() => setTab(t.id)}
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-2 font-sans text-xs font-semibold uppercase tracking-wide transition-colors sm:px-5 ${
                      tab === t.id ? "bg-black text-white" : "text-black hover:bg-black/5"
                    }`}
                  >
                    <t.icon className="h-4 w-4" aria-hidden="true" />
                    {t.label}
                  </button>
                ))}
              </div>
              <button
                type="button"
                data-testid="admin-logout-btn"
                onClick={logout}
                className="inline-flex items-center gap-2 rounded-full border-2 border-black px-5 py-2 font-sans text-xs font-semibold uppercase tracking-wide text-black hover:bg-black hover:text-white"
              >
                <LogOut className="h-4 w-4" aria-hidden="true" /> Log Out
              </button>
            </div>
            <div className="mt-8">
              <AnimatePresence mode="wait">
                <motion.div key={tab} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }}>
                  {tab === "bookings" && <BookingsTab />}
                  {tab === "messages" && <MessagesTab />}
                  {tab === "faqs" && <FaqsTab />}
                  {tab === "blog" && <BlogTab />}
                  {tab === "content" && <ContentTab />}
                  {tab === "design" && <DesignTab />}
                  {tab === "account" && <AccountTab />}
                </motion.div>
              </AnimatePresence>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
