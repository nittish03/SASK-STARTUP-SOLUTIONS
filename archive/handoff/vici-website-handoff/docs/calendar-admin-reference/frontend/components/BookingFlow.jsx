import { useEffect, useState } from "react";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, ArrowLeft, ArrowRight, Download } from "lucide-react";
import { API, SERVICES, TIME_SLOTS } from "@/lib/site";

const STEPS = ["Service", "Date & Time", "Your Details", "Confirmed"];

export default function BookingFlow({ externalService = null, externalNonce = 0, idPrefix = "booking" }) {
  const [step, setStep] = useState(0);
  const [service, setService] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [timeValue, setTimeValue] = useState("");
  const [blocked, setBlocked] = useState([]);
  const [checkingSlots, setCheckingSlots] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", notes: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [confirmation, setConfirmation] = useState(null);

  // Saskatoon (America/Regina, CST year-round) — never the visitor's or server's local date
  const today = new Date().toLocaleDateString("en-CA", { timeZone: "America/Regina" });

  useEffect(() => {
    if (!date || !service) { setBlocked([]); return; }
    let alive = true;
    setCheckingSlots(true);
    axios.get(`${API}/bookings/availability`, { params: { date, service } })
      .then((r) => { if (alive) setBlocked(r.data.blocked || []); })
      .catch(() => { if (alive) setBlocked([]); })
      .finally(() => { if (alive) setCheckingSlots(false); });
    return () => { alive = false; };
  }, [date, service]);

  useEffect(() => {
    if (timeValue && blocked.includes(timeValue)) {
      setTime("");
      setTimeValue("");
    }
  }, [blocked, timeValue]);

  useEffect(() => {
    if (externalService) {
      setService(externalService);
      setStep(1);
      setError("");
    }
  }, [externalService, externalNonce]);

  const submit = async () => {
    setSubmitting(true);
    setError("");
    try {
      const { data } = await axios.post(`${API}/bookings`, { service, date, time, ...form });
      setConfirmation(data.booking);
      setStep(3);
    } catch (e) {
      setError(e.response?.data?.detail || "Something went wrong. Please try again or call 1 (306) 960-0091.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div data-testid={`${idPrefix}-flow-widget`}>
      <ol className="flex flex-wrap items-center justify-center gap-2" aria-label="Booking steps">
        {STEPS.map((label, i) => (
          <li key={label} className="flex items-center gap-2">
            <span
              data-testid={`${idPrefix}-step-${i}`}
              aria-current={step === i ? "step" : undefined}
              className={`rounded-full px-4 py-1.5 font-sans text-xs font-semibold uppercase tracking-wider transition-colors duration-300 ${
                step === i ? "bg-spring text-black" : step > i ? "bg-mantis text-black" : "bg-white/15 text-white/70"
              }`}
            >
              {i + 1}. {label}
            </span>
            {i < STEPS.length - 1 && <span className="hidden h-px w-6 bg-white/30 sm:block" aria-hidden="true" />}
          </li>
        ))}
      </ol>

      <div className="mt-10 rounded-3xl bg-praxeti p-6 shadow-2xl sm:p-10">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div key="s0" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.3 }}>
              <h3 className="font-sans text-lg font-semibold text-black">Choose a service</h3>
              <div className="mt-4 grid gap-3">
                {SERVICES.map((svc) => (
                  <button
                    key={svc.slug}
                    type="button"
                    data-testid={`${idPrefix}-flow-service-${svc.slug}`}
                    onClick={() => { setService(svc.slug); setStep(1); }}
                    className={`rounded-xl border-2 px-5 py-4 text-left transition-colors duration-200 ${
                      service === svc.slug ? "border-black bg-black/5" : "border-black/15 hover:border-mantis"
                    }`}
                  >
                    <span className="font-sans text-base font-semibold text-black">{svc.name}</span>
                    <span className="mt-1 block font-sans text-xs font-semibold uppercase tracking-widest text-black/60">{svc.duration}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div key="s1" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.3 }}>
              <h3 className="font-sans text-lg font-semibold text-black">Pick a date & time</h3>
              <p className="mt-1 font-serif text-sm italic text-black/70">Open Monday–Sunday, 8:00 a.m. – 8:00 p.m. All times are Saskatoon time (CST).</p>
              <label htmlFor={`${idPrefix}-date`} className="mt-5 block font-sans text-xs font-semibold uppercase tracking-widest text-black">
                Date
              </label>
              <input
                id={`${idPrefix}-date`}
                data-testid={`${idPrefix}-date-input`}
                type="date"
                min={today}
                value={date}
                onChange={(e) => { setDate(e.target.value); setTime(""); setTimeValue(""); }}
                className="mt-2 w-full rounded-xl border-2 border-black/20 bg-transparent px-4 py-3 font-sans text-base text-black outline-none focus:border-black"
              />
              <p className="mt-5 font-sans text-xs font-semibold uppercase tracking-widest text-black">Time</p>
              <p data-testid={`${idPrefix}-availability-note`} className="mt-1 font-serif text-xs italic text-black/60" aria-live="polite">
                {checkingSlots ? "Checking availability..." : blocked.length ? "Crossed-out times are already booked." : "All times shown are available."}
              </p>
              <div className="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6" role="group" aria-label="Available times">
                {TIME_SLOTS.map((slot) => {
                  const isBlocked = blocked.includes(slot.value);
                  return (
                    <button
                      key={slot.value}
                      type="button"
                      data-testid={`${idPrefix}-time-${slot.value.replace(":", "")}`}
                      disabled={isBlocked}
                      title={isBlocked ? "Already booked" : undefined}
                      onClick={() => { setTime(slot.label); setTimeValue(slot.value); }}
                      aria-pressed={time === slot.label}
                      className={`rounded-lg border-2 px-2 py-2 font-sans text-xs font-semibold transition-colors duration-200 ${
                        isBlocked
                          ? "cursor-not-allowed border-black/10 text-black/30 line-through"
                          : time === slot.label
                            ? "border-black bg-black text-white"
                            : "border-black/15 text-black hover:border-mantis"
                      }`}
                    >
                      {slot.label}
                    </button>
                  );
                })}
              </div>
              <div className="mt-8 flex justify-between">
                <button type="button" data-testid={`${idPrefix}-back-to-service-btn`} onClick={() => setStep(0)} className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-black underline underline-offset-4">
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back
                </button>
                <button
                  type="button"
                  data-testid={`${idPrefix}-continue-btn`}
                  disabled={!date || !time}
                  onClick={() => setStep(2)}
                  className="inline-flex items-center gap-2 rounded-full bg-mantis px-6 py-2.5 font-sans text-sm font-semibold uppercase tracking-wide text-black transition-transform duration-200 hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Continue <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="s2" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.3 }}>
              <h3 className="font-sans text-lg font-semibold text-black">Your details</h3>
              <p className="mt-1 font-serif text-sm italic text-black/70">
                {SERVICES.find((s) => s.slug === service)?.name} · {date} · {time} (Saskatoon time)
              </p>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor={`${idPrefix}-name`} className="font-sans text-xs font-semibold uppercase tracking-widest text-black">Name</label>
                  <input id={`${idPrefix}-name`} data-testid={`${idPrefix}-name-input`} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-2 w-full rounded-xl border-2 border-black/20 bg-transparent px-4 py-3 font-sans text-base text-black outline-none focus:border-black" autoComplete="name" />
                </div>
                <div>
                  <label htmlFor={`${idPrefix}-phone`} className="font-sans text-xs font-semibold uppercase tracking-widest text-black">Phone</label>
                  <input id={`${idPrefix}-phone`} data-testid={`${idPrefix}-phone-input`} type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="mt-2 w-full rounded-xl border-2 border-black/20 bg-transparent px-4 py-3 font-sans text-base text-black outline-none focus:border-black" autoComplete="tel" />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor={`${idPrefix}-email`} className="font-sans text-xs font-semibold uppercase tracking-widest text-black">Email</label>
                  <input id={`${idPrefix}-email`} data-testid={`${idPrefix}-email-input`} type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-2 w-full rounded-xl border-2 border-black/20 bg-transparent px-4 py-3 font-sans text-base text-black outline-none focus:border-black" autoComplete="email" />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor={`${idPrefix}-notes`} className="font-sans text-xs font-semibold uppercase tracking-widest text-black">Anything we should know? (optional)</label>
                  <textarea id={`${idPrefix}-notes`} data-testid={`${idPrefix}-notes-input`} rows={3} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className="mt-2 w-full rounded-xl border-2 border-black/20 bg-transparent px-4 py-3 font-sans text-base text-black outline-none focus:border-black" />
                </div>
              </div>
              {error && <p data-testid={`${idPrefix}-error`} role="alert" className="mt-4 font-sans text-sm font-semibold text-red-700">{error}</p>}
              <div className="mt-8 flex justify-between">
                <button type="button" data-testid={`${idPrefix}-back-to-datetime-btn`} onClick={() => setStep(1)} className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-black underline underline-offset-4">
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back
                </button>
                <button
                  type="button"
                  data-testid={`${idPrefix}-submit-btn`}
                  disabled={submitting || !form.name || !form.email || !form.phone}
                  onClick={submit}
                  className="rounded-full bg-mantis px-8 py-3 font-sans text-sm font-semibold uppercase tracking-wide text-black transition-transform duration-200 hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {submitting ? "Booking..." : "Confirm Booking"}
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && confirmation && (
            <motion.div key="s3" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }} className="text-center">
              <CheckCircle2 className="mx-auto h-14 w-14 text-mantis" aria-hidden="true" />
              <h3 data-testid={`${idPrefix}-confirmation-heading`} className="mt-4 font-serif text-3xl uppercase text-black">You're booked in</h3>
              <p data-testid={`${idPrefix}-confirmation-details`} className="mx-auto mt-4 max-w-md font-serif text-base leading-relaxed text-black/85">
                {confirmation.name}, we've received your request for <strong>{confirmation.service_title}</strong> on <strong>{confirmation.date}</strong> at <strong>{confirmation.time} (Saskatoon time)</strong>. Reference: <span className="font-mono text-sm">{confirmation.id.slice(0, 8).toUpperCase()}</span>
              </p>
              <p className="mx-auto mt-3 max-w-md font-serif text-sm italic text-black/70">
                A confirmation email is on its way to {confirmation.email} (demo mode: emails are recorded, not actually sent). Don't forget to email your completed intake form to saskstartupsolutions@viciconsulting.ca.
              </p>
              <a
                data-testid={`${idPrefix}-confirmation-intake-btn`}
                href={`${API}/intake-forms/${confirmation.service}`}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-mantis px-6 py-3 font-sans text-sm font-semibold uppercase tracking-wide text-black transition-transform duration-200 hover:scale-105"
              >
                <Download className="h-4 w-4" aria-hidden="true" /> Download Intake Form
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
