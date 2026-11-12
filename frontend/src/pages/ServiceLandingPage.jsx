import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, ChevronRight, HelpCircle, Phone } from "lucide-react";
import Seo from "@/components/Seo";
import { Reveal, MaskedLine } from "@/components/Reveal";
import { SERVICE_LANDING_PAGES } from "@/data/landingPages";
import { BLOG_POSTS_BY_SLUG } from "@/data/blogPosts";

export default function ServiceLandingPage({ slug }) {
  const page = SERVICE_LANDING_PAGES[slug];
  if (!page) return null;

  const pageUrl = `https://saskstartupsolutions.ca/${page.slug}`;
  const relatedPosts = (page.relatedBlogSlugs || [])
    .map((s) => BLOG_POSTS_BY_SLUG[s])
    .filter(Boolean);
  const relatedServices = (page.relatedServiceSlugs || [])
    .map((s) => SERVICE_LANDING_PAGES[s])
    .filter(Boolean);

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        "name": page.h1,
        "description": page.seoDescription,
        "url": pageUrl,
        "serviceType": page.shortTitle,
        "areaServed": [
          { "@type": "City", "name": "Saskatoon" },
          { "@type": "AdministrativeArea", "name": "Saskatchewan" }
        ],
        "provider": {
          "@type": "AccountingService",
          "@id": "https://saskstartupsolutions.ca/#business",
          "name": "Vici SaskStartupSolutions",
          "telephone": "+1-306-960-0091",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "539 Avenue I N",
            "addressLocality": "Saskatoon",
            "addressRegion": "SK",
            "postalCode": "S7L 2G9",
            "addressCountry": "CA"
          }
        }
      },
      {
        "@type": "HowTo",
        "@id": `${pageUrl}#howto`,
        "name": page.stepsTitle,
        "step": page.steps.map((step, i) => ({
          "@type": "HowToStep",
          "position": i + 1,
          "name": step.name,
          "text": step.text
        }))
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://saskstartupsolutions.ca/" },
          { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://saskstartupsolutions.ca/services" },
          { "@type": "ListItem", "position": 3, "name": page.shortTitle, "item": pageUrl }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        "mainEntity": page.faqs.map((f) => ({
          "@type": "Question",
          "name": f.q,
          "acceptedAnswer": { "@type": "Answer", "text": f.a }
        }))
      }
    ]
  };

  return (
    <div data-testid={`landing-page-${page.slug}`}>
      <Seo
        title={page.seoTitle}
        description={page.seoDescription}
        path={`/${page.slug}`}
        schema={schema}
      />

      {/* Hero Section */}
      <section className="bg-bookgreen py-16 sm:py-24" aria-labelledby="landing-heading">
        <div className="mx-auto max-w-[1000px] px-4 sm:px-6">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-1.5 font-sans text-xs font-semibold uppercase tracking-widest text-white/80">
              <li><Link to="/" className="hover:text-spring">Home</Link></li>
              <li aria-hidden="true"><ChevronRight className="h-3.5 w-3.5" /></li>
              <li><Link to="/services" className="hover:text-spring">Services</Link></li>
              <li aria-hidden="true"><ChevronRight className="h-3.5 w-3.5" /></li>
              <li aria-current="page" className="text-spring">{page.shortTitle}</li>
            </ol>
          </nav>

          <p className="font-sans text-xs font-semibold uppercase tracking-[0.28em] text-canary">
            {page.badge}
          </p>
          <h1
            id="landing-heading"
            data-testid="landing-heading"
            className="mt-3 font-serif text-3xl font-bold uppercase leading-[1.08] tracking-tight text-white sm:text-5xl"
          >
            <MaskedLine delay={0.08}>{page.h1}</MaskedLine>
          </h1>

          {/* Direct-Answer AEO Summary Box */}
          <div className="mt-8 rounded-2xl border border-white/25 bg-white/10 p-6 backdrop-blur-sm">
            <p className="font-sans text-xs font-semibold uppercase tracking-widest text-canary">
              Direct Answer — {page.quickAnswerQuestion}
            </p>
            <p className="mt-2 font-serif text-base leading-relaxed text-white/95 sm:text-lg">
              {page.quickAnswer}
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/booking"
              data-testid="landing-hero-book-btn"
              className="rounded-full bg-mantis px-7 py-3.5 font-sans text-sm font-semibold uppercase tracking-wide text-black transition-transform duration-300 hover:scale-105"
            >
              Book Free 30-Min Consultation
            </Link>
            <a
              href="tel:+13069600091"
              className="inline-flex items-center gap-2 rounded-full border-2 border-white px-6 py-3.5 font-sans text-sm font-semibold uppercase tracking-wide text-white transition-colors duration-200 hover:bg-white hover:text-black"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              1 (306) 960-0091
            </a>
          </div>
        </div>
      </section>

      {/* Overview & Fee Comparison Table */}
      <section className="bg-praxeti py-16 sm:py-20" aria-labelledby="comparison-heading">
        <div className="mx-auto max-w-[1000px] px-4 sm:px-6">
          <div className="space-y-4 font-serif text-lg leading-relaxed text-black/85">
            {page.introParagraphs.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>

          <Reveal>
            <div className="mt-12 rounded-3xl border-2 border-black/15 bg-white p-6 shadow-sm sm:p-8">
              <h2 id="comparison-heading" className="font-serif text-2xl font-bold uppercase tracking-tight text-black sm:text-3xl">
                {page.comparisonTitle}
              </h2>
              <div className="mt-6 overflow-x-auto">
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr className="bg-bookgreen text-white">
                      {page.comparisonHeaders.map((h) => (
                        <th key={h} className="p-3 font-sans text-xs font-semibold uppercase tracking-wider sm:text-sm">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {page.comparisonRows.map((row, idx) => (
                      <tr key={idx} className={idx % 2 === 1 ? "bg-black/[0.03]" : ""}>
                        {row.map((cell, cIdx) => (
                          <td
                            key={cIdx}
                            className={`border border-black/15 p-3 align-top font-serif text-sm sm:text-base ${
                              cIdx === 0 ? "font-bold text-black" : "text-black/80"
                            }`}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Step-by-Step HowTo Section */}
      <section className="bg-white py-16 sm:py-20" aria-labelledby="steps-heading">
        <div className="mx-auto max-w-[1000px] px-4 sm:px-6">
          <h2 id="steps-heading" className="font-serif text-2xl font-bold uppercase tracking-tight text-black sm:text-3xl">
            {page.stepsTitle}
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {page.steps.map((step, idx) => (
              <Reveal key={idx} delay={idx * 0.06}>
                <div className="h-full rounded-2xl border-2 border-black/10 bg-praxeti/60 p-6">
                  <h3 className="font-serif text-lg font-bold text-black">{step.name}</h3>
                  <p className="mt-2 font-serif text-base leading-relaxed text-black/80">{step.text}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border-2 border-bookgreen/25 bg-bookgreen/[0.05] p-6 sm:p-8">
            <h2 className="font-serif text-xl font-bold uppercase tracking-tight text-black sm:text-2xl">
              {page.highlightsTitle}
            </h2>
            <ul className="mt-4 space-y-3">
              {page.highlights.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 font-serif text-base leading-relaxed text-black/85">
                  <CheckCircle className="mt-1 h-5 w-5 shrink-0 text-bookgreen" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-praxeti py-16 sm:py-20" aria-labelledby="landing-faq-heading">
        <div className="mx-auto max-w-[1000px] px-4 sm:px-6">
          <div className="rounded-3xl border-2 border-black/15 bg-white p-6 shadow-sm sm:p-10">
            <div className="flex items-center gap-3">
              <HelpCircle className="h-6 w-6 text-bookgreen" aria-hidden="true" />
              <h2 id="landing-faq-heading" className="font-serif text-2xl font-bold uppercase tracking-tight text-black sm:text-3xl">
                Frequently Asked Questions
              </h2>
            </div>
            <div className="mt-6 space-y-6 divide-y divide-black/10">
              {page.faqs.map((faq, idx) => (
                <div key={idx} className={idx > 0 ? "pt-6" : ""}>
                  <h3 className="font-serif text-lg font-bold text-black">{faq.q}</h3>
                  <p className="mt-2 font-serif text-base leading-relaxed text-black/80">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Related Practical Guides & Specialized Services */}
          {relatedPosts.length > 0 && (
            <div className="mt-14">
              <h2 className="font-serif text-2xl font-bold uppercase tracking-tight text-black">
                Related Saskatchewan Business Guides
              </h2>
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                {relatedPosts.map((post) => (
                  <Link
                    key={post.slug}
                    to={`/blogs/${post.slug}`}
                    className="group rounded-2xl border-2 border-black/15 bg-white p-5 transition-all hover:-translate-y-0.5 hover:shadow-lg"
                  >
                    <h3 className="font-serif text-lg font-bold leading-snug text-black group-hover:text-bookgreen">
                      {post.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 font-serif text-sm text-black/75">
                      {post.seo_description}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1 font-sans text-xs font-semibold uppercase tracking-wide text-bookgreen">
                      Read Guide <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {relatedServices.length > 0 && (
            <div className="mt-12">
              <h2 className="font-serif text-xl font-bold uppercase tracking-tight text-black">
                Related Saskatoon Services
              </h2>
              <div className="mt-4 flex flex-wrap gap-3">
                {relatedServices.map((svc) => (
                  <Link
                    key={svc.slug}
                    to={`/${svc.slug}`}
                    className="rounded-full border-2 border-black/20 bg-white px-5 py-2.5 font-sans text-xs font-semibold uppercase tracking-wide text-black transition-colors hover:border-bookgreen hover:bg-bookgreen hover:text-white"
                  >
                    {svc.shortTitle}
                  </Link>
                ))}
                <Link
                  to="/services"
                  className="rounded-full border-2 border-black/20 bg-white px-5 py-2.5 font-sans text-xs font-semibold uppercase tracking-wide text-black transition-colors hover:border-bookgreen hover:bg-bookgreen hover:text-white"
                >
                  All Core Services
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
