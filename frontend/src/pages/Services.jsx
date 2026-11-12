import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, ArrowRight } from "lucide-react";
import { Reveal, MaskedLine } from "@/components/Reveal";
import { useContent } from "@/lib/content";
import Seo from "@/components/Seo";

const SERVICE_DETAILS = [
  {
    slug: "incorporation-setup",
    title: "Saskatchewan Business Incorporation & Startup Registration",
    badge: "Startup Essential",
    duration: "45 mins",
    button: "Book Incorporation Setup",
    img: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "Founders reviewing Saskatchewan incorporation documents in Saskatoon",
    paragraphs: [
      "Looking to incorporate a business Saskatoon or searching for trusted business incorporation services Saskatoon? Our incorporation help Saskatoon covers everything required for a seamless new corporation setup Saskatoon and incorporating a sole proprietorship Saskatchewan. We handle your official Information Services Corporation (ISC) Corporate Name Reservation, draft Articles of Incorporation, design multi-class share structures (Class A voting, Class B non-voting, and Class C preferred), registered office setup, and issue your official Certificate of Incorporation.",
      "If you are evaluating what incorporation documents needed Saskatchewan, how long does incorporation take Saskatchewan, or the baseline cost to incorporate in Saskatchewan, we provide transparent guidance. We immediately activate your federal Canada Revenue Agency (CRA) 9-digit Business Number, corporate income tax (RC) account, GST/HST (RT) registration, provincial Saskatchewan PST licensing, and corporate minute book registers. Avoid expensive $1,500+ legal retainer fees while getting hands-on advisory tailored to Saskatchewan tax rules.",
    ],
    faqs: [
      { q: "How much does it cost to incorporate in Saskatchewan?", a: "Statutory ISC fees are $50 for Name Reservation and $255 for Articles of Incorporation ($305 total). Numbered corporations bypass name reservation for $255." },
      { q: "How long does incorporation take?", a: "Online filings are typically processed and approved by ISC within 1 to 3 business days." },
    ],
  },
  {
    slug: "bookkeeping",
    title: "Part 1 - Bookkeeping Services",
    badge: "Part of Basic Service Package",
    duration: "30 mins",
    button: "Book Now",
    img: "https://images.pexels.com/photos/4476378/pexels-photo-4476378.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "Bookkeeper recording figures on paper while using a calculator",
    paragraphs: [
      "Searching for a dedicated bookkeeper Saskatoon or experienced bookkeeping services Saskatoon? Our small business bookkeeping Saskatoon and monthly bookkeeping services Saskatoon provide transaction recording, bank and credit card reconciliations, expense categorization, and financial statement preparation kept audit-ready under CRA standards. Whether you're tracking expenses in a spreadsheet, a shoebox of receipts, or an outdated system, we build a scalable bookkeeping system.",
      "We provide tailored bookkeeping for new businesses Saskatoon, bookkeeping for newly incorporated businesses Saskatoon, bookkeeping for self employed Saskatoon, sole proprietor bookkeeping Saskatoon, bookkeeping for freelancers Saskatoon, and bookkeeping for consultants Saskatoon. If you have unfiled tax years or messy receipts, our bookkeeping cleanup Saskatoon and remote bookkeeping Saskatchewan restore complete financial order.",
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
      "Need to register a business name Saskatchewan or looking for business registration help Saskatoon? Our business registration services Saskatoon assist founders who want to register a small business Saskatoon, sole proprietorship registration help Saskatchewan, or partnership registration help Saskatchewan. Staying compliant with Saskatchewan's Information Services Corporation (ISC) Registry is easy to overlook — and costly to miss.",
      "We walk you through the business name registration process Saskatchewan, explain exactly what do I need to register a business name Saskatchewan, and detail the statutory business registration cost Saskatchewan. In addition, we manage mandatory annual return filing Saskatchewan corporation and provide dedicated ISC annual return help Saskatoon so you avoid missed deadlines, late fees, and corporate strike-offs.",
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
    slug: "multilingual-startup",
    title: "Multilingual Business Setup & Advisory (French, Russian, Armenian)",
    badge: "Multilingual Support",
    duration: "45 mins",
    button: "Book Multilingual Consultation",
    img: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "Multilingual business advisory meeting with newcomer entrepreneurs in Saskatoon",
    paragraphs: [
      "Starting a business in Saskatchewan is much easier with clear local guidance. We provide dedicated support for first-time business owners and practical business setup help for newcomers in Saskatoon, including newcomer business registration in Saskatchewan, CRA account activation, commercial banking preparation, and ongoing bookkeeping.",
      "Work directly with a French-speaking bookkeeper in Saskatoon, alongside bilingual support in Russian and Armenian. We walk through sole proprietorship ($115 ISC fee) versus incorporation ($255 numbered / $305 named), transitioning from self-employed to incorporated under SBCA 2021, and your post-incorporation checklist so every step feels clear from day one.",
    ],
    faqs: [
      { q: "Can work permit holders incorporate a business in Saskatchewan?", a: "Yes. Saskatchewan allows foreign nationals and temporary residents to incorporate. There are no Canadian citizenship requirements for corporate directors under provincial law." },
      { q: "Which languages are supported?", a: "We provide consultation and accounting workflows in English, French (Français), Russian (Русский), and Armenian (Հայերեն)." },
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
          "name": "Saskatchewan Business Incorporation & Startup Registration",
          "serviceType": "Incorporation & Corporate Setup",
          "provider": { "@type": "AccountingService", "name": "Vici SaskStartupSolutions" },
          "areaServed": "Saskatoon, Saskatchewan",
          "description": "Information Services Corporation (ISC) name reservations, Articles of Incorporation, share structure design, CRA Business Number setup, and corporate minute books."
        },
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
          "name": "Multilingual Business Setup & Advisory (French, Russian, Armenian)",
          "serviceType": "Multilingual Startup Advisory",
          "provider": { "@type": "AccountingService", "name": "Vici SaskStartupSolutions" },
          "areaServed": "Saskatoon, Saskatchewan",
          "description": "Comprehensive corporate setup, registration, and bookkeeping guidance for newcomers in English, French, Russian, and Armenian."
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

  const allServiceFaqs = SERVICE_DETAILS.flatMap((s) => s.faqs || []);

  return (
    <div data-testid="services-page">
      <Seo
        title="Business Incorporation, Bookkeeping & T2 Tax Services Saskatoon | Vici"
        description="Comprehensive small business bookkeeping, Saskatchewan ISC business incorporation, T2 corporate tax filing administration, and annual returns in Saskatoon, SK."
        path="/services"
        schema={servicesSchema}
      >
        {allServiceFaqs.length > 0 && (
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": allServiceFaqs.map((f) => ({
                "@type": "Question",
                "name": f.q,
                "acceptedAnswer": { "@type": "Answer", "text": f.a },
              })),
            })}
          </script>
        )}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": "How to Register or Incorporate and Set Up Compliance in Saskatchewan",
            "step": [
              { "@type": "HowToStep", "position": 1, "name": "Choose Structure & Name Clearance", "text": "Decide between sole proprietorship ($115 total ISC fee) or SBCA 2021 incorporation ($255 numbered / $305 named ISC fee)." },
              { "@type": "HowToStep", "position": 2, "name": "Prepare ISC Forms 1-3 & Beneficial Ownership Register", "text": "File Articles of Incorporation, Registered Office, and Notice of Directors, plus maintain an SBCA 2021 Beneficial Ownership / ISC Register." },
              { "@type": "HowToStep", "position": 3, "name": "Activate CRA BN9, GST, 6% SK PST & Municipal Licence", "text": "Register federal CRA accounts (RC0001, RT0001 over $30,000, RP0001), Saskatchewan SETS (6% PST, no small-supplier cap), and City of Saskatoon Business Licence ($135 new)." },
              { "@type": "HowToStep", "position": 4, "name": "Run Monthly Cloud Bookkeeping & Annual Filings", "text": "Maintain monthly QuickBooks Online or Xero reconciliations, track 2026 CPP/CPP2/EI/mileage rules, and file ISC Annual Returns ($60 on-time) and T2 returns." }
            ]
          })}
        </script>
      </Seo>
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
                        decoding="async"
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

          {/* 2026 Saskatchewan Statutory Fee Comparison & Dedicated Landing Pages */}
          <Reveal delay={0.05}>
            <div className="mt-10 rounded-3xl border-2 border-black/15 bg-white p-6 shadow-sm sm:p-10">
              <h2 className="font-serif text-2xl font-bold uppercase tracking-tight text-black sm:text-3xl">
                2026 Saskatchewan Statutory Registry &amp; Tax Fee Schedule
              </h2>
              <p className="mt-2 font-serif text-base text-black/75">
                Transparent government statutory fees paid directly to ISC, City of Saskatoon, and CRA/Saskatchewan Finance:
              </p>
              <div className="mt-6 overflow-x-auto">
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr className="bg-bookgreen text-white">
                      <th className="p-3 font-sans text-xs font-semibold uppercase tracking-wider sm:text-sm">Filing / Registration</th>
                      <th className="p-3 font-sans text-xs font-semibold uppercase tracking-wider sm:text-sm">2026 Statutory Fee</th>
                      <th className="p-3 font-sans text-xs font-semibold uppercase tracking-wider sm:text-sm">Key Compliance Rule</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-black/15 p-3 font-serif font-bold text-black">Named Saskatchewan Corporation</td>
                      <td className="border border-black/15 p-3 font-serif text-black/80">$305 CAD ($50 name + $255 Articles)</td>
                      <td className="border border-black/15 p-3 font-serif text-black/80">SBCA 2021 Form 1-3 + Beneficial Ownership Register</td>
                    </tr>
                    <tr className="bg-black/[0.03]">
                      <td className="border border-black/15 p-3 font-serif font-bold text-black">Numbered Saskatchewan Corporation</td>
                      <td className="border border-black/15 p-3 font-serif text-black/80">$255 CAD (Articles only)</td>
                      <td className="border border-black/15 p-3 font-serif text-black/80">No name reservation needed; full limited liability</td>
                    </tr>
                    <tr>
                      <td className="border border-black/15 p-3 font-serif font-bold text-black">Sole Proprietorship / Partnership</td>
                      <td className="border border-black/15 p-3 font-serif text-black/80">$115 CAD ($50 name + $65 reg.)</td>
                      <td className="border border-black/15 p-3 font-serif text-black/80">3-year trade name renewal ($60 statutory fee)</td>
                    </tr>
                    <tr className="bg-black/[0.03]">
                      <td className="border border-black/15 p-3 font-serif font-bold text-black">ISC Corporate Annual Return</td>
                      <td className="border border-black/15 p-3 font-serif text-black/80">$60 CAD (on time)</td>
                      <td className="border border-black/15 p-3 font-serif text-black/80">Due annually; separate from CRA T2 corporate taxes</td>
                    </tr>
                    <tr>
                      <td className="border border-black/15 p-3 font-serif font-bold text-black">City of Saskatoon Business Licence</td>
                      <td className="border border-black/15 p-3 font-serif text-black/80">$135 new / $95 annual renewal</td>
                      <td className="border border-black/15 p-3 font-serif text-black/80">Applies to commercial and home-based Saskatoon businesses</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="mt-8 font-serif text-xl font-bold uppercase tracking-tight text-black">
                Dedicated Service Guides by Need
              </h3>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link to="/incorporate-saskatoon" className="rounded-full border-2 border-bookgreen px-5 py-2 font-sans text-xs font-semibold uppercase tracking-wide text-bookgreen transition-colors hover:bg-bookgreen hover:text-white">
                  Incorporate a Business in Saskatoon
                </Link>
                <Link to="/business-registration-saskatchewan" className="rounded-full border-2 border-bookgreen px-5 py-2 font-sans text-xs font-semibold uppercase tracking-wide text-bookgreen transition-colors hover:bg-bookgreen hover:text-white">
                  Saskatchewan Business Registration
                </Link>
                <Link to="/bookkeeping-saskatoon" className="rounded-full border-2 border-bookgreen px-5 py-2 font-sans text-xs font-semibold uppercase tracking-wide text-bookgreen transition-colors hover:bg-bookgreen hover:text-white">
                  Bookkeeping Services Saskatoon
                </Link>
                <Link to="/bookkeeping-cleanup-saskatoon" className="rounded-full border-2 border-bookgreen px-5 py-2 font-sans text-xs font-semibold uppercase tracking-wide text-bookgreen transition-colors hover:bg-bookgreen hover:text-white">
                  Bookkeeping Cleanup Saskatoon
                </Link>
                <Link to="/isc-annual-returns-saskatoon" className="rounded-full border-2 border-bookgreen px-5 py-2 font-sans text-xs font-semibold uppercase tracking-wide text-bookgreen transition-colors hover:bg-bookgreen hover:text-white">
                  ISC Annual Returns &amp; Registry
                </Link>
                <Link to="/multilingual-newcomer-business-saskatoon" className="rounded-full border-2 border-bookgreen px-5 py-2 font-sans text-xs font-semibold uppercase tracking-wide text-bookgreen transition-colors hover:bg-bookgreen hover:text-white">
                  Multilingual Newcomer Setup
                </Link>
              </div>
            </div>
          </Reveal>
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
