import { useState } from "react";
import axios from "axios";
import { MapPin, Phone, Mail, Clock, ExternalLink, CheckCircle2, Star } from "lucide-react";
import { Reveal, MaskedLine } from "@/components/Reveal";
import { API } from "@/lib/site";
import { useContent } from "@/lib/content";

const DIRECTIONS_URL = "https://www.google.com/maps/dir/?api=1&destination=539+Avenue+I+N+Saskatoon+SK+S7L+2G9";
const MAP_EMBED = "https://www.google.com/maps?q=539+Avenue+I+N+Saskatoon+SK+S7L+2G9&output=embed";
const GOOGLE_BUSINESS_URL = "https://maps.app.goo.gl/r2yZLY7ypZrpV58Y9";

export default function Contact() {
  const cc = useContent("contact");
  const phone = cc.phone || "1 (306) 960-0091";
  const email = cc.email || "Saskstartupsolutions@viciconsulting.ca";
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [captcha, setCaptcha] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!captcha) {
      setError("Please confirm you are not a robot.");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      await axios.post(`${API}/contact`, { ...form, recaptcha: captcha });
      setSent(true);
    } catch (err) {
      setError(err.response?.data?.detail || "Something went wrong. Please try again or call 1 (306) 960-0091.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div data-testid="contact-page">
      <section className="bg-bookgreen" aria-labelledby="contact-heading">
        <div className="mx-auto max-w-[900px] px-4 py-20 sm:px-6 sm:py-28">
          <h1
            id="contact-heading"
            data-testid="contact-heading"
            className="text-center font-serif text-4xl font-bold uppercase leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            <MaskedLine delay={0.1}>Contact Us</MaskedLine>
          </h1>
        </div>
      </section>

      <section className="bg-praxeti" aria-label="Contact details">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-2">
          <Reveal>
            <div data-testid="contact-info-card" className="rounded-3xl bg-black p-8 text-white sm:p-10">
              <div className="flex items-center gap-4">
                <img
                  src="/media/patrick-vachon.jpg"
                  alt="Portrait of Patrick Vachon"
                  data-testid="contact-patrick-photo"
                  className="h-16 w-16 shrink-0 rounded-full border-2 border-white/30 object-cover object-[50%_20%]"
                  loading="lazy"
                />
                <h2 className="font-serif text-2xl font-bold uppercase tracking-tight text-white">Patrick Vachon</h2>
              </div>
              <ul className="mt-6 space-y-4">
                <li className="flex items-center gap-3">
                  <Phone className="h-5 w-5 shrink-0 text-mantis" aria-hidden="true" />
                  <a href={`tel:${phone.replace(/[^+\d]/g, "")}`} data-testid="contact-phone-link" className="font-sans text-base font-semibold hover:text-spring">
                    {phone}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="h-5 w-5 shrink-0 text-mantis" aria-hidden="true" />
                  <a href={`mailto:${email}`} data-testid="contact-email-link" className="font-sans text-base font-semibold hover:text-spring">
                    {email}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="mt-1 h-5 w-5 shrink-0 text-mantis" aria-hidden="true" />
                  <address className="font-serif text-base not-italic leading-relaxed">
                    {cc.address1 || "Vici SaskStartupSolutions"}<br />
                    {cc.address2 || "539 Avenue I N"}<br />
                    {cc.address3 || "Saskatoon, Saskatchewan S7L 2G9"}
                  </address>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="mt-1 h-5 w-5 shrink-0 text-mantis" aria-hidden="true" />
                  <p data-testid="contact-hours" className="font-serif text-base leading-relaxed">
                    {cc.hoursLabel || "Monday–Sunday"}<br />{cc.hoursTime || "8:00 a.m. – 8:00 p.m."}
                  </p>
                </li>
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={DIRECTIONS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="get-directions-btn"
                  className="inline-flex items-center gap-2 rounded-full bg-mantis px-6 py-3 font-sans text-sm font-semibold uppercase tracking-wide text-black transition-transform duration-300 hover:scale-105"
                >
                  Get Directions <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
                <a
                  href={GOOGLE_BUSINESS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="google-business-btn"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-white/60 bg-transparent px-6 py-3 font-sans text-sm font-semibold uppercase tracking-wide text-white transition-colors duration-300 hover:bg-white hover:text-black"
                >
                  <Star className="h-4 w-4" aria-hidden="true" /> Google Business Profile
                </a>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="flex h-full min-h-[320px] flex-col overflow-hidden rounded-3xl border-2 border-black/15">
              <iframe
                title="Map to Vici SaskStartupSolutions, 539 Avenue I N, Saskatoon"
                data-testid="contact-map"
                src={MAP_EMBED}
                className="min-h-[320px] w-full flex-1"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              <a
                href={GOOGLE_BUSINESS_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="map-google-business-link"
                className="flex items-center justify-center gap-2 bg-black px-4 py-3.5 font-sans text-xs font-semibold uppercase tracking-widest text-white transition-colors duration-300 hover:bg-bookgreen"
              >
                <Star className="h-4 w-4 text-spring" aria-hidden="true" /> Open in Maps — Google Business Profile
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-bookgreen" aria-labelledby="contact-form-heading">
        <div className="mx-auto max-w-[720px] px-4 py-16 sm:px-6 sm:py-24">
          <Reveal>
            <h2 id="contact-form-heading" data-testid="contact-form-heading" className="text-center font-serif text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl">
              {cc.formHeading || "Contact us"}
            </h2>
            <p className="mt-4 text-center font-serif text-base leading-relaxed text-white sm:text-lg">
              {cc.formIntro || "Reach out to us and let us know if there is anything we can do for you"}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            {sent ? (
              <div data-testid="contact-success" className="mt-10 rounded-3xl bg-white p-10 text-center">
                <CheckCircle2 className="mx-auto h-12 w-12 text-mantis" aria-hidden="true" />
                <h3 className="mt-4 font-serif text-2xl uppercase text-black">Message received</h3>
                <p className="mt-3 font-serif text-base text-black/80">
                  Thanks, {form.name}. We'll get back to you shortly (demo mode: your message is recorded, no email is actually sent).
                </p>
              </div>
            ) : (
              <form onSubmit={submit} data-testid="contact-form" className="mt-10 rounded-3xl bg-white p-6 shadow-2xl sm:p-10" noValidate={false}>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="contact-name" className="font-sans text-xs font-semibold uppercase tracking-widest text-black">Name</label>
                    <input id="contact-name" data-testid="contact-name-input" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-2 w-full rounded-xl border-2 border-black/20 bg-transparent px-4 py-3 font-sans text-base text-black outline-none focus:border-black" autoComplete="name" />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="font-sans text-xs font-semibold uppercase tracking-widest text-black">Email</label>
                    <input id="contact-email" data-testid="contact-email-input" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-2 w-full rounded-xl border-2 border-black/20 bg-transparent px-4 py-3 font-sans text-base text-black outline-none focus:border-black" autoComplete="email" />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="contact-phone" className="font-sans text-xs font-semibold uppercase tracking-widest text-black">Phone</label>
                    <input id="contact-phone" data-testid="contact-phone-input" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="mt-2 w-full rounded-xl border-2 border-black/20 bg-transparent px-4 py-3 font-sans text-base text-black outline-none focus:border-black" autoComplete="tel" />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="contact-message" className="font-sans text-xs font-semibold uppercase tracking-widest text-black">Message</label>
                    <textarea id="contact-message" data-testid="contact-message-input" rows={5} required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="mt-2 w-full rounded-xl border-2 border-black/20 bg-transparent px-4 py-3 font-sans text-base text-black outline-none focus:border-black" />
                  </div>
                </div>

                <div data-testid="recaptcha-mock" className="mt-6 flex items-center gap-3 rounded-xl border-2 border-black/20 bg-white px-4 py-3">
                  <input
                    id="recaptcha-checkbox"
                    data-testid="recaptcha-checkbox"
                    type="checkbox"
                    checked={captcha}
                    onChange={(e) => setCaptcha(e.target.checked)}
                    className="h-6 w-6 accent-black"
                  />
                  <label htmlFor="recaptcha-checkbox" className="font-sans text-sm font-semibold text-black">
                    I'm not a robot <span className="ml-1 font-normal italic text-black/60">(demo reCAPTCHA)</span>
                  </label>
                </div>
                <p className="mt-3 font-sans text-xs leading-relaxed text-black/60">
                  This site is protected by reCAPTCHA and the Google{" "}
                  <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" data-testid="recaptcha-privacy-link" className="text-black underline">Privacy Policy</a> and{" "}
                  <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" data-testid="recaptcha-terms-link" className="text-black underline">Terms of Service</a> apply.
                </p>

                {error && <p data-testid="contact-error" role="alert" className="mt-4 font-sans text-sm font-semibold text-red-700">{error}</p>}
                <button
                  type="submit"
                  data-testid="contact-submit-btn"
                  disabled={submitting}
                  className="mt-6 w-full rounded-full bg-mantis px-8 py-3.5 font-sans text-sm font-semibold uppercase tracking-wide text-black transition-transform duration-200 hover:scale-[1.02] disabled:opacity-40 sm:w-auto"
                >
                  {submitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </section>
    </div>
  );
}
