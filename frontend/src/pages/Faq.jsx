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
    answer: "The introduction appointment is a no-obligation conversation where we review your current situation, understand your needs across bookkeeping, T2 filing, and ISC Registry administration, and show you exactly how we can help before you commit to anything.",
  },
  {
    question: "What documents should I bring to my first appointment?",
    answer: "Bring whatever you have: your CRA business number, recent bank statements, prior tax filings, and any ISC Registry correspondence. If you're not sure, just bring yourself — we'll help you figure out what's missing.",
  },
  {
    question: "How do quotes work?",
    answer: "Every engagement starts with the free introduction appointment. Once we understand the scope of your bookkeeping, tax filing, or registry needs, we provide a clear, accurate quote. No pricing is listed online because every business is different.",
  },
  {
    question: "What are the timelines for T2 corporate filing?",
    answer: "T2 corporate returns are generally due within six months of your corporation's year-end, with any balance owing due earlier. In your introduction appointment, we'll walk you through our filing timeline for your specific year-end so there are no surprises.",
  },
  {
    question: "What does ISC Registry administration include?",
    answer: "We handle the administration of your Saskatchewan ISC Registry requirements: incorporation documents, annual returns, and keeping your corporate information current with Information Services Corporation (ISC) — no missed deadlines, no penalties.",
  },
  {
    question: "What's included in the All in one Basic Service Package?",
    answer: "The Basic Package includes all three parts: Bookkeeping, T2 Corporate Filing Administration, and ISC Registry Administration. One team, one relationship, all your compliance handled.",
  },
  {
    question: "What is the difference between a sole proprietorship and a corporation in Saskatchewan?",
    answer: "A sole proprietorship is simpler and less expensive to start, but the business owner carries unlimited personal liability for debts and legal obligations. A Saskatchewan corporation (incorporated via ISC) creates a distinct legal entity that provides limited liability protection and access to the small business corporate tax rate, but requires annual ISC returns and T2 corporate tax filings.",
  },
  {
    question: "When does a Saskatchewan small business need a CRA GST number?",
    answer: "A Saskatchewan business must register for a federal GST/HST account once its worldwide taxable gross sales exceed $30,000 CAD over a single calendar quarter or four consecutive quarters. Many businesses also choose to register voluntarily earlier to claim input tax credits (ITCs) on business startup expenses.",
  },
  {
    question: "How long does incorporation take in Saskatchewan?",
    answer: "Standard business corporation filings submitted online through the Information Services Corporation (ISC) Corporate Registry portal typically take between 1 and 3 business days for approval once the mandatory Nuans name reservation has been cleared.",
  },
  {
    question: "Can I keep my business receipts digitally in Saskatchewan?",
    answer: "Yes. The Canada Revenue Agency (CRA) explicitly permits businesses to keep digital copies of receipts, invoices, and bank statements, provided electronic scans are clear, legible, and retained for at least six years from the end of the tax year.",
  },
  {
    question: "Do you offer consultations for newcomers to Saskatchewan in other languages?",
    answer: "Yes. In addition to English, our team provides introductory consultations and administrative assistance in French, Russian, and Armenian to help newcomers and immigrant entrepreneurs navigate Saskatchewan business setup and bookkeeping requirements.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState(0);
  const [faqs, setFaqs] = useState(FALLBACK_FAQS);

  useEffect(() => {
    axios.get(`${API}/faqs`)
      .then((r) => { if (Array.isArray(r.data) && r.data.length) setFaqs(r.data); })
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
                      <span className="font-serif text-lg font-bold text-black sm:text-xl">{item.question}</span>
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
