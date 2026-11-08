import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, ArrowRight } from "lucide-react";
import { Reveal, MaskedLine } from "@/components/Reveal";
import { useContent } from "@/lib/content";
import Seo from "@/components/Seo";

const SERVICE_DETAILS = [
  {
    slug: "bookkeeping",
    title: "Part 1 - Bookkeeping Services",
    badge: "Part of Basic Service Package",
    duration: "30 mins",
    button: "Book Now",
    img: "https://images.pexels.com/photos/4476378/pexels-photo-4476378.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "Bookkeeper recording figures on paper while using a calculator",
    paragraphs: [
      "Accurate bookkeeping is the foundation of every healthy startup. Our Saskatoon bookkeeping service covers monthly transaction recording, bank and credit card reconciliation, expense categorization, and financial statement preparation — all kept audit-ready and fully compliant with CRA bookkeeping standards. Whether you're currently tracking expenses in a spreadsheet, a shoebox of receipts, or an outdated system that no longer fits your growing business, we'll build a bookkeeping solution that scales with you.",
      "If you're a Saskatchewan startup founder who's falling behind on reconciling transactions, unsure whether your books are CRA-ready, or simply don't have time to manage finances yourself, this service is built for you. Our small business bookkeeping services give Saskatchewan startups an accurate, up-to-date financial picture every month, so you always know where your business stands.",
    ],
    faqs: [
      { q: "How often will my books be updated?", a: "Monthly, or on a schedule that matches your business activity and filing needs." },
      { q: "Do I need to switch accounting software?", a: "No, we can typically work within your existing system or recommend one that fits your business." },
    ],
  },
  {
    slug: "t2-corporate-filing",
    title: "Part 2 - T2 Corporate Filing Administration",
    badge: "Part of Basic Service Package",
    duration: "30 mins",
    button: "Book Now",
    img: "https://images.pexels.com/photos/7821934/pexels-photo-7821934.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "A person completing a corporate form with a pen",
    paragraphs: [
      "Corporate tax filing doesn't have to be stressful. Our T2 corporate tax filing administration service manages the entire process for your Saskatchewan corporation — from gathering financial documents and preparing your corporate tax return, to coordinating submission to the Canada Revenue Agency (CRA) on your behalf. We help startups and growing companies stay ahead of T2 filing deadlines, avoid late-filing penalties, and maintain clean, compliant corporate tax records year after year.",
      "If you've recently incorporated in Saskatchewan and have never filed a T2 return, or you're unsure what CRA requires of your corporation each year, this service removes the guesswork. For founders who've been searching for reliable T2 filing help in Saskatoon, this is where startups get it handled correctly and on time.",
    ],
    faqs: [
      { q: "When is my T2 return due?", a: "Generally six months after your corporation's fiscal year-end; we'll confirm your exact deadline during your intro appointment." },
      { q: "What documents do I need to get started?", a: "Your incorporation documents, prior-year financials (if any), and current bookkeeping records." },
    ],
  },
  {
    slug: "isc-registry",
    title: "Part 3 - ISC Registry Administration",
    badge: "Part of Basic Service Package",
    duration: "30 mins",
    button: "Book Now",
    img: "https://images.pexels.com/photos/11482790/pexels-photo-11482790.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "Facade of an official registry building with stone columns",
    paragraphs: [
      "Staying compliant with Saskatchewan's Information Services Corporation (ISC) Registry is easy to overlook — and costly to miss. Our ISC Registry administration service manages your corporate registry filings from incorporation through ongoing annual reports, so your business stays in good standing with the Saskatchewan corporate registry at all times. We track your filing deadlines, prepare the required registry documents, and handle submissions so you avoid missed deadlines, late fees, and compliance penalties.",
      "If you're a Saskatchewan corporation unsure when your annual return is due, or you've received a registry compliance notice and don't know how to respond, this service keeps your corporate filings current without the administrative burden.",
    ],
    faqs: [
      { q: "What is the ISC Registry?", a: "Saskatchewan's Information Services Corporation maintains the official corporate registry; every active corporation must file annual returns to stay in good standing." },
      { q: "What happens if I miss a filing?", a: "Your corporation can face penalties or be struck from the registry; we help you catch up and stay on schedule going forward." },
    ],
  },
  {
    slug: "basic-package",
    title: "All in One Basic Service Package",
    badge: "Best Value",
    duration: "1 hr 30 mins",
    button: "Book Now",
    img: "https://images.pexels.com/photos/7718714/pexels-photo-7718714.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "An organized desk flat lay with notebooks, laptop and office tools",
    paragraphs: [
      "Running a startup means wearing every hat — founder, operator, and accountant all at once. Our All in One Basic Service Package takes the full compliance workload off your plate in a single engagement, combining Bookkeeping, T2 Corporate Filing Administration, and Saskatchewan ISC Registry Administration into one streamlined service. It's the most efficient way for Saskatoon startups and growing Saskatchewan businesses to stay financially organized, tax-compliant, and registry-current — without juggling multiple providers or deadlines.",
      "This package is built for founders who want one point of contact handling all their compliance needs, rather than coordinating separately with a bookkeeper, tax preparer, and registry administrator.",
    ],
    faqs: [
      { q: "Can I upgrade from a single service to the full package later?", a: "Yes, we can roll your existing service into the Basic Package at any time." },
    ],
  },
  {
    slug: "introduction",
    title: "Introduction and Intake Appointment - No Obligations",
    badge: null,
    duration: "30 mins (Free)",
    button: "Book Your Free Introduction",
    img: "https://images.pexels.com/photos/3874033/pexels-photo-3874033.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "Two people shaking hands across a cafe table over coffee and a notebook",
    paragraphs: [
      "Every client relationship starts with a conversation, not a contract. Book a free, no-obligation 30-minute introduction appointment with our Saskatoon team to walk through your current bookkeeping, corporate tax, and registry situation. We'll review where things stand, identify any gaps or upcoming deadlines, and show you exactly how our bookkeeping, T2 filing, and ISC Registry administration services can support your startup's growth — with zero pressure and zero commitment.",
    ],
    faqs: [],
  },
];

const DEFAULT_INTRO = "Bookkeeping, T2 corporate tax filing, and ISC Registry administration — built for startups and growing businesses across Saskatoon, Saskatchewan. Whether you need ongoing bookkeeping services, help with your corporate tax return filing, or support managing your Saskatchewan ISC Registry filings, our team handles the paperwork so you can focus on running your business. Choose a single service below, or save with our all-in-one Basic Service Package — every engagement starts with a free, no-obligation introduction appointment.";
const DEFAULT_CLOSING_HEADING = "Ready to get organized?";
const DEFAULT_CLOSING_TEXT = "Book your free introduction appointment today and email us your completed intake form. Let Vici SaskStartupSolutions handle your bookkeeping, T2 corporate filing, and ISC Registry administration — so you can focus on growing your Saskatchewan business.";

function ServiceFaq({ faqs, slug }) {
  const [open, setOpen] = useState(-1);
  if (!faqs.length) return null;
  return (
    <div className="mt-7">
      <p className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-black/60">FAQ</p>
      <div className="mt-2">
        {faqs.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={item.q} data-testid={`service-faq-${slug}-${i + 1}`} className="border-t border-black/10 last:border-b">
              <button
                type="button"
                data-testid={`service-faq-${slug}-q${i + 1}`}
                aria-expanded={isOpen}
                aria-controls={`service-faq-${slug}-a${i + 1}`}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="flex w-full items-center justify-between gap-4 py-3.5 text-left"
              >
                <span className="font-sans text-sm font-semibold text-black">{item.q}</span>
                <motion.span animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.25 }} className="shrink-0">
                  <Plus className="h-4 w-4 text-black" aria-hidden="true" />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`service-faq-${slug}-a${i + 1}`}
                    data-testid={`service-faq-${slug}-a${i + 1}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="pb-4 font-serif text-sm leading-relaxed text-black/80">{item.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Services() {
  const c = useContent("services");

  const items = SERVICE_DETAILS.map((s) => {
    const o = (c.items || {})[s.slug] || {};
    return {
      ...s,
      paragraphs: typeof o.paragraphs === "string" && o.paragraphs.trim() ? o.paragraphs.split(/\n\s*\n/) : s.paragraphs,
      img: o.img || s.img,
      price: (o.price || "").trim(),
    };
  });

  const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Small Business Accounting, Bookkeeping & Corporate Registry Services in Saskatoon",
    "url": "https://saskstartupsolutions.ca/services",
    "description": "Comprehensive small business bookkeeping, Saskatchewan ISC business registration and incorporation, T2 corporate tax filing administration, and annual returns.",
    "provider": {
      "@type": "AccountingService",
      "name": "Vici SaskStartupSolutions",
      "url": "https://saskstartupsolutions.ca/"
    },
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": [
        {
          "@type": "Service",
          "name": "Small Business Bookkeeping & Payroll Services Saskatoon",
          "serviceType": "Bookkeeping",
          "provider": { "@type": "AccountingService", "name": "Vici SaskStartupSolutions" },
          "areaServed": "Saskatoon, Saskatchewan",
          "description": "Monthly transaction recording, bank reconciliations, expense tracking, Saskatchewan PST (6%) and federal GST compliance."
        },
        {
          "@type": "Service",
          "name": "Saskatchewan T2 Corporate Tax Filing Administration",
          "serviceType": "Corporate Tax Administration",
          "provider": { "@type": "AccountingService", "name": "Vici SaskStartupSolutions" },
          "areaServed": "Saskatchewan",
          "description": "Year-end financial compilation schedules, T2 corporate income tax return preparation, and CRA filing administration."
        },
        {
          "@type": "Service",
          "name": "Saskatchewan ISC Corporate Registry Administration",
          "serviceType": "Corporate Registry Services",
          "provider": { "@type": "AccountingService", "name": "Vici SaskStartupSolutions" },
          "areaServed": "Saskatchewan",
          "description": "Information Services Corporation (ISC) business incorporation, Nuans name reservation, and annual return filings."
        },
        {
          "@type": "Service",
          "name": "All-in-One Basic Service Package",
          "serviceType": "Bundled Startup Administration",
          "provider": { "@type": "AccountingService", "name": "Vici SaskStartupSolutions" },
          "areaServed": "Saskatchewan",
          "description": "Comprehensive startup compliance bundle combining monthly bookkeeping, T2 corporate tax filing administration, and ISC annual returns."
        }
      ]
    }
  };

  return (
    <div data-testid="services-page">
      <Seo
        title="Business Incorporation, Bookkeeping & T2 Tax Services Saskatoon | Vici"
        description="Comprehensive small business bookkeeping, Saskatchewan ISC business incorporation, T2 corporate tax filing administration, and annual returns in Saskatoon, SK."
        path="/services"
        schema={servicesSchema}
      />
      <section className="bg-bookgreen" aria-labelledby="services-heading">
        <div className="mx-auto max-w-[900px] px-4 py-20 sm:px-6 sm:py-28">
          <h1
            id="services-heading"
            data-testid="services-heading"
            className="text-center font-serif text-4xl font-bold uppercase leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            <MaskedLine delay={0.1}>Our Services</MaskedLine>
          </h1>
          <Reveal delay={0.3}>
            <p data-testid="services-intro" className="mx-auto mt-8 max-w-3xl text-center font-serif text-base leading-relaxed text-white sm:text-lg">
              {c.intro || DEFAULT_INTRO}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-praxeti" aria-label="Service details">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          {items.map((svc, i) => (
            <Reveal key={svc.slug} delay={0.05}>
              <article
                id={svc.slug}
                data-testid={`service-block-${svc.slug}`}
                className={`scroll-mt-24 border-black/15 py-12 sm:py-16 ${i > 0 ? "border-t-2" : ""}`}
              >
                {svc.slug === "t2-corporate-filing" && <span id="tax" className="scroll-mt-24" aria-hidden="true" />}
                {svc.slug === "isc-registry" && <span id="registry" className="scroll-mt-24" aria-hidden="true" />}
                <div className="grid items-start gap-10 lg:grid-cols-5 lg:gap-14">
                  <div className={`lg:col-span-2 ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                    <div className="relative">
                      <div
                        className={`absolute -bottom-3 h-full w-full rounded-3xl border-2 border-spring ${i % 2 === 1 ? "-right-3" : "-left-3"}`}
                        aria-hidden="true"
                      />
                      <img
                        src={svc.img}
                        alt={svc.alt}
                        width={800}
                        height={600}
                        data-testid={`service-image-${svc.slug}`}
                        className="relative aspect-[4/3] w-full rounded-3xl border-2 border-black/15 object-cover shadow-lg"
                        loading="lazy"
                      />
                    </div>
                    <p className="mt-6 hidden font-sans text-xs font-semibold uppercase tracking-[0.25em] text-black/60 lg:block">
                      {svc.badge ? `${svc.badge} · ` : ""}{svc.duration}{svc.price ? ` · ${svc.price}` : ""}
                    </p>
                  </div>
                  <div className={`lg:col-span-3 ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                    <p className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-black/60 lg:hidden">
                      {svc.badge ? `${svc.badge} · ` : ""}{svc.duration}{svc.price ? ` · ${svc.price}` : ""}
                    </p>
                    <h2 className="mt-2 font-sans text-2xl font-semibold text-black sm:text-3xl">{svc.title}</h2>
                    {svc.paragraphs.map((p, j) => (
                      <p key={j} className="mt-4 font-serif text-base leading-relaxed text-black/85 sm:text-lg">
                        {p}
                      </p>
                    ))}
                    <ServiceFaq faqs={svc.faqs} slug={svc.slug} />
                    <Link
                      to="/booking"
                      data-testid={`service-book-btn-${svc.slug}`}
                      className="group mt-7 inline-flex items-center gap-2 rounded-full bg-mantis px-6 py-3 font-sans text-sm font-semibold uppercase tracking-wide text-black transition-transform duration-300 hover:scale-105"
                    >
                      {svc.button}
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-bookgreen" aria-labelledby="services-closing-heading">
        <div className="mx-auto max-w-[900px] px-4 py-20 text-center sm:px-6 sm:py-24">
          <Reveal>
            <h2
              id="services-closing-heading"
              data-testid="services-closing-heading"
              className="font-serif text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl"
            >
              {c.closingHeading || DEFAULT_CLOSING_HEADING}
            </h2>
            <p className="mx-auto mt-5 max-w-2xl font-serif text-base leading-relaxed text-white sm:text-lg">
              {c.closingText || DEFAULT_CLOSING_TEXT}
            </p>
            <Link
              to="/booking"
              data-testid="services-closing-book-btn"
              className="group mt-8 inline-flex items-center gap-2 rounded-full bg-mantis px-8 py-3.5 font-sans text-sm font-semibold uppercase tracking-wide text-black transition-transform duration-300 hover:scale-105"
            >
              Book Now
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
