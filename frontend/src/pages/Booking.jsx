import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Clock, Download } from "lucide-react";
import { Reveal, MaskedLine } from "@/components/Reveal";
import ParallaxImage from "@/components/ParallaxImage";
import BookingFlow from "@/components/BookingFlow";
import { API, SERVICES, DEFAULT_PAGE_IMAGES } from "@/lib/site";
import { useContent } from "@/lib/content";
import Seo from "@/components/Seo";

export default function Booking() {
  const [tab, setTab] = useState("services");
  const design = useContent("design");
  const imgs = { ...DEFAULT_PAGE_IMAGES, ...(design.images || {}) };
  const [menuService, setMenuService] = useState(null);
  const [nonce, setNonce] = useState(0);

  const pickService = (slug) => {
    setMenuService(slug);
    setNonce((n) => n + 1);
    document.getElementById("booking-flow")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div data-testid="booking-page">
      <Seo
        title="Book a Free Introduction | Vici SaskStartupSolutions, Saskatoon"
        description="Book a free, no-obligation introduction appointment — bookkeeping, T2 filing administration and ISC Registry services in Saskatoon. Open daily 8:00 a.m.–8:00 p.m."
        path="/booking"
      />
      <section className="bg-bookgreen" aria-labelledby="booking-heading">
        <div className="mx-auto max-w-[900px] px-4 py-20 sm:px-6 sm:py-28">
          <h1
            id="booking-heading"
            data-testid="booking-heading"
            className="text-center font-serif text-4xl font-bold uppercase leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            <MaskedLine delay={0.1}>Our Services</MaskedLine>
          </h1>
          <Reveal delay={0.3}>
            <p data-testid="booking-intro" className="mx-auto mt-8 max-w-2xl text-center font-serif text-base leading-relaxed text-white sm:text-lg">
              Bookkeeping, corporate tax filing, and registry administration—built for Saskatchewan startups and growing businesses. Choose a single service or the all-in-one Basic Package. Every engagement starts with a free introduction appointment so we can understand your needs and provide an accurate quote.
            </p>
          </Reveal>
          <Reveal delay={0.4}>
            <div data-testid="booking-banner" className="mt-10 rounded-2xl bg-spring px-6 py-5 text-center">
              <p className="font-serif text-lg font-bold uppercase tracking-tight text-black sm:text-xl">
                Book Your Free Introduction Appointment Today And Email Us The Intake Form Below
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.5}>
            <div className="mt-8 flex flex-col items-center justify-between gap-5 sm:flex-row">
              <p data-testid="booking-hours" className="inline-flex items-center gap-2 font-sans text-sm font-semibold uppercase tracking-wider text-white">
                <Clock className="h-4 w-4 text-spring" aria-hidden="true" />
                Open until 8:00 p.m.
              </p>
              <div className="inline-flex rounded-full border-2 border-white/40 p-1" role="tablist" aria-label="Services or staff">
                {["services", "staff"].map((t) => (
                  <button
                    key={t}
                    type="button"
                    role="tab"
                    aria-selected={tab === t}
                    data-testid={`booking-tab-${t}`}
                    onClick={() => setTab(t)}
                    className={`rounded-full px-6 py-2 font-sans text-sm font-semibold uppercase tracking-wide transition-colors duration-300 ${
                      tab === t ? "bg-white text-black" : "text-white hover:text-spring"
                    }`}
                  >
                    {t === "services" ? "Services" : "Staff"}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section aria-label="Saskatoon scenery" className="relative bg-bookgreen">
        <ParallaxImage
          src={imgs.bookingBand}
          alt={imgs.bookingBandAlt || "A Saskatoon bridge over the South Saskatchewan River"}
          testId="booking-image-band"
          className="h-64 w-full sm:h-96"
        />
        <div className="pointer-events-none absolute inset-0 flex items-end bg-[linear-gradient(180deg,transparent_40%,rgba(0,0,0,0.65)_100%)]" aria-hidden="true">
          <p className="px-6 pb-6 font-sans text-xs font-semibold uppercase tracking-[0.3em] text-white sm:px-10">
            Bookkeeping · T2 Filing · ISC Registry — Saskatoon, SK
          </p>
        </div>
      </section>

      <section className="bg-praxeti" aria-label="Service menu">
        <div className="mx-auto max-w-[900px] px-4 py-16 sm:px-6">
          <AnimatePresence mode="wait">
            {tab === "services" ? (
              <motion.div key="services" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.35 }}>
                {SERVICES.map((svc, i) => (
                  <Reveal key={svc.slug} delay={i * 0.06}>
                    <article
                      data-testid={`service-card-${svc.slug}`}
                      className="border-t-2 border-black/15 py-8 last:border-b-2"
                    >
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <h2 className="font-sans text-xl font-semibold text-black">{svc.name}</h2>
                          <p className="mt-1 font-sans text-xs font-semibold uppercase tracking-widest text-black/60">
                            {svc.badge ? `${svc.badge} · ` : ""}{svc.duration}
                          </p>
                          <p className="mt-3 max-w-2xl font-serif text-base leading-relaxed text-black/85">{svc.blurb}</p>
                        </div>
                        <button
                          type="button"
                          data-testid={`service-book-btn-${svc.slug}`}
                          onClick={() => pickService(svc.slug)}
                          className="shrink-0 rounded-full bg-mantis px-6 py-2.5 font-sans text-sm font-semibold uppercase tracking-wide text-black transition-transform duration-300 hover:scale-105"
                        >
                          Book
                        </button>
                      </div>
                      {svc.parts && (
                        <div className="mt-6 space-y-5 rounded-2xl bg-bookgreen/5 p-6">
                          {svc.parts.map((part) => (
                            <div key={part.title}>
                              <h3 className="font-sans text-sm font-semibold uppercase tracking-wider text-black/70">{part.title}</h3>
                              <p className="mt-2 font-serif text-base leading-relaxed text-black/85">{part.text}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </article>
                  </Reveal>
                ))}
              </motion.div>
            ) : (
              <motion.div key="staff" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.35 }}>
                <div data-testid="booking-staff-panel" className="rounded-2xl border-2 border-black/15 p-8 text-center">
                  <img
                    src="/media/patrick-vachon.jpg"
                    alt="Portrait of Patrick Vachon"
                    className="mx-auto h-28 w-28 rounded-full border-2 border-black/15 object-cover object-[50%_20%]"
                    loading="lazy"
                  />
                  <h2 className="mt-4 font-serif text-2xl uppercase text-black">Patrick Vachon</h2>
                  <p className="mt-1 font-sans text-xs font-semibold uppercase tracking-widest text-black/60">Founder</p>
                  <p className="mx-auto mt-3 max-w-md font-serif text-base text-black/80">
                    Patrick personally leads every introduction appointment. Select any service above and you'll meet with him directly.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <section id="booking-flow" className="border-t-4 border-black bg-bookgreen" aria-label="Booking flow">
        <div className="mx-auto max-w-[900px] px-4 py-16 sm:px-6 sm:py-20">
          <Reveal>
            <h2 data-testid="booking-flow-heading" className="mb-8 text-center font-serif text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl">
              Book Your Appointment
            </h2>
            <BookingFlow externalService={menuService} externalNonce={nonce} idPrefix="booking" />
          </Reveal>
        </div>
      </section>

      <section id="intake" className="bg-praxeti" aria-labelledby="intake-heading">
        <div className="mx-auto max-w-[900px] px-4 py-16 sm:px-6 sm:py-24">
          <Reveal>
            <h2 id="intake-heading" data-testid="intake-heading" className="text-center font-serif text-3xl font-bold uppercase tracking-tight text-black sm:text-4xl">
              Intake Forms
            </h2>
            <p data-testid="intake-instructions" className="mx-auto mt-6 max-w-2xl text-center font-serif text-base leading-relaxed text-black/85 sm:text-lg">
              Book Your Free Introduction Appointment Today And Email Us The Intake Form. Email the completed intake form to{" "}
              <a href="mailto:saskstartupsolutions@viciconsulting.ca" data-testid="intake-email-link" className="font-semibold text-black underline underline-offset-4 hover:text-black/70">
                saskstartupsolutions@viciconsulting.ca
              </a>
            </p>
          </Reveal>
          <div className="mt-12 grid gap-10 lg:grid-cols-5">
            <Reveal className="lg:col-span-2">
              <ParallaxImage
                src={imgs.bookingIntake}
                alt={imgs.bookingIntakeAlt || "A Saskatoon office building"}
                testId="intake-image"
                className="h-64 w-full rounded-3xl border-2 border-black/15 lg:h-full lg:min-h-[26rem]"
              />
              <p className="mt-3 font-sans text-xs font-semibold uppercase tracking-widest text-black/60">
                Our office — 539 Avenue I N, Saskatoon
              </p>
            </Reveal>
            <div className="grid content-start gap-4 sm:grid-cols-2 lg:col-span-3">
            {SERVICES.map((svc, i) => (
              <Reveal key={svc.slug} delay={i * 0.05}>
                <a
                  href={`${API}/intake-forms/${svc.slug}`}
                  data-testid={`intake-download-${svc.slug}`}
                  className="group flex items-center justify-between gap-4 rounded-2xl border-2 border-black/15 bg-white px-6 py-5 transition-all duration-300 hover:border-mantis hover:shadow-lg"
                >
                  <span>
                    <span className="block font-sans text-base font-semibold text-black">{svc.name}</span>
                    <span className="mt-1 block font-sans text-xs font-semibold uppercase tracking-widest text-black/60">PDF intake form</span>
                  </span>
                  <Download className="h-5 w-5 shrink-0 text-black transition-transform duration-300 group-hover:translate-y-1" aria-hidden="true" />
                </a>
              </Reveal>
            ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
