import { useEffect, useState } from "react";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { Reveal, MaskedLine } from "@/components/Reveal";
import { API } from "@/lib/site";
import Seo from "@/components/Seo";

const FALLBACK_FAQS = [
  {
    question: "What does the free introduction appointment cover?",
    answer: "The introduction appointment is a no-obligation conversation with Patrick Vachon where we review your current Saskatchewan business situation, evaluate your requirements across bookkeeping, T2 corporate tax filing, and ISC Registry administration, and recommend a clear, customized roadmap before you commit to anything.",
  },
  {
    question: "How much does it cost to incorporate a business in Saskatchewan?",
    answer: "The official statutory fees charged by Information Services Corporation (ISC) are $50 CAD for a Corporate Name Reservation and $255 CAD for filing Articles of Incorporation, totaling $305 CAD in baseline provincial fees. Numbered corporations bypass the name reservation fee and incorporate for $255 CAD.",
  },
  {
    question: "What incorporation documents needed Saskatchewan?",
    answer: "To incorporate through ISC in Saskatchewan, the required documents include: an approved Saskatchewan Corporate Name Reservation (or numbered corporation request), Articles of Incorporation setting out your share classes, a registered office address located in Saskatchewan, initial notice of directors and officers, and director consent forms.",
  },
  {
    question: "How long does incorporation take Saskatchewan?",
    answer: "Online corporate registration and incorporation filings submitted through Information Services Corporation (ISC) Corporate Online are typically reviewed and approved within 1 to 3 business days, provided the name reservation and corporate articles comply with the Business Corporations Act, 2021.",
  },
  {
    question: "What do I need to register a business name Saskatchewan?",
    answer: "To register a business name in Saskatchewan, you need a proposed business name that passes ISC name availability rules, an approved Name Reservation ($50 fee), the legal structure (sole proprietorship, partnership, or trade name), your physical business address in Saskatchewan, and primary business activity description.",
  },
  {
    question: "What is the business name registration process Saskatchewan and business registration cost Saskatchewan?",
    answer: "The business name registration process Saskatchewan begins with submitting a Name Reservation on the ISC portal ($50 statutory fee). Once reserved, you submit the Registration Statement for a Sole Proprietorship or Partnership ($65 statutory fee). The total statutory business registration cost Saskatchewan is $115 CAD.",
  },
  {
    question: "What comes after registering a business Saskatchewan and what to do after incorporation Saskatchewan?",
    answer: "After registration or incorporation, immediately activate your Canada Revenue Agency (CRA) 9-digit Business Number, open a dedicated commercial business bank account, determine when does a Saskatchewan business need a GST number (exceeding $30,000 gross revenue), register for Saskatchewan PST on SETS (mandatory from your first taxable sale), establish WCB employer coverage within 30 days of hiring, and implement monthly bookkeeping.",
  },
  {
    question: "What records should a small business keep Saskatchewan and can I keep business receipts digitally Saskatchewan?",
    answer: "Saskatchewan businesses must maintain complete general ledgers, sales invoices, vendor expense receipts, bank and credit card statements, payroll records, and tax returns for at least six years under CRA rules. Under CRA Information Circular IC78-10R5, you can keep business receipts digitally Saskatchewan provided digital scans and electronic records are clear, complete, and tamper-proof.",
  },
  {
    question: "Do you offer sole proprietorship registration help Saskatchewan and partnership registration help Saskatchewan?",
    answer: "Yes. We provide complete sole proprietorship registration help Saskatchewan and partnership registration help Saskatchewan, assisting Saskatoon and Saskatchewan founders with name searches, ISC registration filings, partnership agreements, and tax setups.",
  },
  {
    question: "Do you provide bookkeeping for new businesses Saskatoon and bookkeeping for self employed Saskatoon?",
    answer: "Yes. We offer specialized bookkeeping for new businesses Saskatoon, bookkeeping for newly incorporated businesses Saskatoon, bookkeeping for self employed Saskatoon, sole proprietor bookkeeping Saskatoon, bookkeeping for freelancers Saskatoon, and bookkeeping for consultants Saskatoon.",
  },
  {
    question: "Do you offer first time business owner support Saskatoon and help starting a business in Saskatoon?",
    answer: "Yes! Starting a business in Saskatchewan can feel overwhelming. We provide comprehensive first time business owner support Saskatoon and help starting a business in Saskatoon, guiding founders through entity structuring, commercial registrations, accounting software setup, and ongoing compliance.",
  },
  {
    question: "Do you offer French speaking bookkeeper Saskatoon, Russian speaking bookkeeper Saskatoon, or Armenian speaking business support Saskatoon?",
    answer: "Yes! We provide multilingual business support and bookkeeping services in French, Russian, and Armenian, alongside English. This ensures newcomer entrepreneurs receive complete business setup help for newcomers Saskatoon and newcomer business registration Saskatchewan in their language of comfort.",
  },
  {
    question: "What is the difference between a sole proprietorship and a corporation in Saskatchewan?",
    answer: "A sole proprietorship is simpler and less expensive to start ($50 name + $65 registration), but the owner carries unlimited personal liability and business profits are taxed at personal progressive income tax rates up to 47.5%. Incorporating creates a separate legal person with limited liability protection and access to the combined 10% active small business tax rate in Saskatchewan.",
  },
  {
    question: "When does a Saskatchewan business need a GST number?",
    answer: "A Saskatchewan business must register for a federal GST/HST account once its worldwide taxable gross sales exceed $30,000 CAD over a single calendar quarter or four consecutive quarters. However, many businesses register voluntarily earlier to claim input tax credits (ITCs) on business startup expenses.",
  },
  {
    question: "How does Saskatchewan PST (6%) differ from federal GST (5%)?",
    answer: "Federal GST (5%) is a value-added tax where you claim Input Tax Credits on purchases. Saskatchewan PST (6%) is a provincial retail sales tax administered by the Ministry of Finance. Unlike GST, Saskatchewan has no $30,000 small supplier threshold for PST on retail sales of taxable goods and services; registration is mandatory from your first dollar of taxable sales.",
  },
  {
    question: "What are the timelines and deadlines for T2 corporate tax filing in Saskatchewan?",
    answer: "A Saskatchewan corporation must file its T2 corporate income tax return with the CRA no later than six months after its fiscal year-end. However, any corporate tax balance owing must be paid within three months (for CCPCs eligible for the small business deduction) or two months after year-end to prevent non-deductible interest penalties.",
  },
  {
    question: "What is annual return filing Saskatchewan corporation and how do I get ISC annual return help Saskatoon?",
    answer: "Every Saskatchewan corporation must file an annual return with Information Services Corporation (ISC) within the statutory window following its incorporation anniversary month. We provide comprehensive ISC annual return help Saskatoon and manage annual return filing Saskatchewan corporation to maintain corporate good standing and prevent administrative strike-offs.",
  },
  {
    question: "What is catch-up and cleanup bookkeeping, and how do you fix overdue tax years?",
    answer: "Catch-up bookkeeping reconstructs incomplete financial records for businesses that are months or years behind on accounting. We audit historical bank and credit card statements, categorize vendor receipts, produce accurate balance sheets, and file overdue GST/PST and T2 returns with the CRA to stop penalty accumulation.",
  },
  {
    question: "Do you prepare Notice to Reader / Compilation financial statements for Saskatoon bank loans?",
    answer: "Yes. We compile formal balance sheets and income statements in compliance with Canadian Standard on Related Services (CSRS 4200) Compilation Engagements, providing the verifiable documentation required by Saskatoon commercial banks, credit unions, and equipment lenders.",
  },
  {
    question: "What is included in the All-in-One Basic Service Package?",
    answer: "Our flagship All-in-One Package brings your entire financial back office under one roof: monthly cloud bookkeeping and bank reconciliations, sales tax filing (GST & PST), annual T2 corporate tax return preparation, and ISC Corporate Registry annual return maintenance.",
  },
];

const EXTRA_2026_FAQS = [
  {
    q: "What is the SBCA 2021 Beneficial Ownership / ISC Register requirement in Saskatchewan?",
    a: "Under The Business Corporations Act, 2021 (SBCA 2021), provincial Saskatchewan corporations must maintain an accurate register of individuals with significant control (25% or more voting shares or fair market equity value) and keep beneficial ownership details updated with corporate records and ISC reporting rules."
  },
  {
    q: "What are the key 2026 CRA payroll ceilings and mileage rates for Saskatchewan employers?",
    a: "For 2026, base CPP applies at 5.95% up to the $74,600 YMPE (max $4,230.45 employee and employer each), second-tier CPP2 applies at 4.0% from $74,600 to $85,000 YAMPE (max $416), EI applies at 1.63% up to $68,900 MIE (max $1,123.07 employee / $1,572.30 employer), and the CRA tax-exempt automobile allowance is $0.73/km for the first 5,000 km ($0.67/km thereafter)."
  },
  {
    q: "Does Ownr support provincial Saskatchewan incorporation or do I need a Saskatoon administrator?",
    a: "Ownr primarily serves federal CBCA corporations and select provincial registries (Ontario, BC, Alberta) and does not handle provincial Saskatchewan incorporation under SBCA 2021. Vici SaskStartupSolutions handles complete provincial Saskatchewan incorporations ($255 numbered / $305 named ISC statutory fees), City of Saskatoon Business Licences ($135 new), and SETS 6% PST registration."
  }
];

function mergeFaqs(apiFaqs, fallbackFaqs) {
  const merged = [];
  const seen = new Set();
  for (const item of [...(fallbackFaqs || []), ...EXTRA_2026_FAQS, ...(Array.isArray(apiFaqs) ? apiFaqs : [])]) {
    const key = (item?.q || "").trim().toLowerCase();
    if (key && !seen.has(key)) {
      seen.add(key);
      merged.push(item);
    }
  }
  return merged;
}

export default function Faq() {
  const [open, setOpen] = useState(0);
  const [faqs, setFaqs] = useState(() => mergeFaqs([], FALLBACK_FAQS));

  useEffect(() => {
    axios.get(`${API}/faqs`)
      .then((r) => {
        if (Array.isArray(r.data) && r.data.length) {
          setFaqs(mergeFaqs(r.data, FALLBACK_FAQS));
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div data-testid="faq-page">
      <Seo
        title="Saskatchewan Small Business Accounting & Tax FAQ | Vici Saskatoon"
        description="Frequently asked questions about bookkeeping, T2 corporate tax deadlines, ISC corporate registry annual returns, GST registration, and business setup in Saskatoon, SK."
        path="/faq"
      >
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.question,
              acceptedAnswer: { "@type": "Answer", text: f.answer },
            })),
          })}
        </script>
      </Seo>
      <section className="bg-bookgreen" aria-labelledby="faq-heading">
        <div className="mx-auto max-w-[900px] px-4 py-20 sm:px-6 sm:py-28">
          <h1
            id="faq-heading"
            data-testid="faq-heading"
            className="text-center font-serif text-4xl font-bold uppercase leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            <MaskedLine delay={0.1}>Frequently Asked</MaskedLine>
            <MaskedLine delay={0.28}>Questions</MaskedLine>
          </h1>
        </div>
      </section>

      <section className="bg-praxeti" aria-label="Questions and answers">
        <div className="mx-auto max-w-[800px] px-4 py-16 sm:px-6 sm:py-24">
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={item.id || item.question} delay={i * 0.05}>
                <div data-testid={`faq-item-${i + 1}`} className="border-t-2 border-black/15 last:border-b-2">
                  <button
                    type="button"
                    data-testid={`faq-question-${i + 1}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${i + 1}`}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="flex w-full items-center justify-between gap-4 py-6 text-left"
                  >
                    <span className="flex items-baseline gap-4">
                      <span className="font-sans text-xs font-semibold uppercase tracking-widest text-black/60" aria-hidden="true">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="font-serif text-lg font-bold text-black sm:text-xl inline m-0 p-0">{item.question}</h3>
                    </span>
                    <motion.span animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.25 }} className="shrink-0">
                      <Plus className="h-6 w-6 text-black" aria-hidden="true" />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-answer-${i + 1}`}
                        data-testid={`faq-answer-${i + 1}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-2xl pb-7 pl-9 font-serif text-base leading-relaxed text-black/85">{item.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}

          <Reveal delay={0.2}>
            <div data-testid="faq-help-callout" className="mt-14 rounded-3xl bg-black p-8 text-center sm:p-10">
              <h2 className="font-serif text-2xl font-bold uppercase tracking-tight text-white">Still have questions?</h2>
              <p className="mx-auto mt-3 max-w-md font-serif text-base text-white/85">
                Book a free introduction appointment — no obligation. We'll review your situation and show you exactly how we can help.
              </p>
              <Link
                to="/booking"
                data-testid="faq-book-btn"
                className="mt-6 inline-block rounded-full bg-mantis px-7 py-3 font-sans text-sm font-semibold uppercase tracking-wide text-black transition-transform duration-300 hover:scale-105"
              >
                Book Now
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-praxeti" aria-labelledby="faq-about-heading">
        <div className="mx-auto max-w-[800px] px-4 py-16 sm:px-6 sm:py-20">
          <Reveal>
            <h2 id="faq-about-heading" className="text-center font-serif text-3xl font-bold uppercase tracking-tight text-black sm:text-4xl">
              About Our Services
            </h2>
            <p className="mt-6 text-center font-serif text-base leading-relaxed text-black/85 sm:text-lg">
              Vici SaskStartupSolutions provides three core services for Saskatchewan businesses: monthly bookkeeping, T2 corporate tax filing administration, and ISC Registry administration. Each service is designed to take the administrative burden off your shoulders so you can focus on what you do best — running and growing your business.
            </p>
            <p className="mt-4 text-center font-serif text-base leading-relaxed text-black/85 sm:text-lg">
              Our bookkeeping service covers transaction recording, bank reconciliation, expense categorization, and financial statement preparation. For corporations, we handle the preparation and filing of your T2 corporate tax return, ensuring compliance with CRA requirements and deadlines. And for Saskatchewan-registered businesses, we manage your ISC Registry obligations including annual returns, corporate updates, and maintaining your good standing with Information Services Corporation.
            </p>
            <p className="mt-4 text-center font-serif text-base leading-relaxed text-black/85 sm:text-lg">
              Every client relationship starts with a free, no-obligation introduction appointment. This conversation lets us understand your current situation, explain how we work, and give you a clear picture of what ongoing support would look like for your business. There's no pressure and no commitment — just practical advice from someone who's been in your shoes.
            </p>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
