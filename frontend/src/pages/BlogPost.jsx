import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import Markdown from "@/components/Markdown";
import { API } from "@/lib/site";
import Seo from "@/components/Seo";

const BLOG_FAQS = {
  "small-business-bookkeeping-saskatoon": [
    {
      q: "Do I need a professional bookkeeper for my small business in Saskatoon?",
      a: "While not legally mandatory, engaging professional bookkeeping services in Saskatoon ensures your financial transactions are organized accurately, Saskatchewan PST (6%) and federal GST are tracked correctly, and your business remains compliant with CRA recordkeeping standards."
    },
    {
      q: "How long must a Saskatchewan business keep bookkeeping records?",
      a: "The Canada Revenue Agency (CRA) mandates that Canadian businesses retain all receipts, invoices, bank reconciliations, payroll records, and tax filings for a minimum of six years from the end of the relevant taxation year."
    },
    {
      q: "What is the difference between bookkeeping and accounting in Saskatchewan?",
      a: "Bookkeeping involves the daily and monthly recording, reconciling, and categorizing of financial transactions. Accounting involves synthesizing those records, preparing compilation financial statements, and completing annual T2 corporate tax filings."
    }
  ],
  "t2-corporate-tax-filing-saskatchewan": [
    {
      q: "When is the T2 corporate tax return due in Saskatchewan?",
      a: "A Saskatchewan corporation must file its T2 corporate income tax return with the CRA no later than six months after the close of its fiscal year. However, any corporate tax balance owing must be paid within two or three months after year-end to prevent interest penalties."
    },
    {
      q: "What documents are required to file a T2 corporate tax return in Saskatchewan?",
      a: "Key documents include year-end financial statements (balance sheet and income statement), general ledger, bank and credit card reconciliations, asset receipts, previous year's Notice of Assessment, and the federal Business Number (BN)."
    },
    {
      q: "Does an inactive corporation in Saskatchewan need to file a T2 return?",
      a: "Yes. Every incorporated entity in Saskatchewan must file a T2 corporate tax return with the CRA every year, even if there was zero revenue, no expenses, and no active business operations."
    }
  ],
  "saskatchewan-business-registration-isc-annual-returns": [
    {
      q: "How much does it cost to incorporate a business in Saskatchewan?",
      a: "The official statutory filing fee charged by Information Services Corporation (ISC) is approximately $255 CAD for the incorporation application, plus $50 CAD for the Nuans name reservation."
    },
    {
      q: "When is an ISC annual return due in Saskatchewan?",
      a: "An ISC annual return must be submitted each year during the month immediately following the corporation's incorporation anniversary month."
    },
    {
      q: "What happens if a corporation does not file its ISC annual return in Saskatchewan?",
      a: "Neglecting an ISC annual return leads to financial penalties and, if unresolved, ISC will strike the corporation from the Corporate Registry, legally dissolving the company and freezing corporate bank accounts."
    }
  ]
};

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [related, setRelated] = useState([]);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    setPost(null);
    setMissing(false);
    axios.get(`${API}/blog/${slug}`)
      .then((r) => setPost(r.data))
      .catch(() => setMissing(true));
    axios.get(`${API}/blog`)
      .then((r) => setRelated(r.data.filter((p) => p.slug !== slug).slice(0, 2)))
      .catch(() => {});
  }, [slug]);

  useEffect(() => {
    if (!post) return;
    const schemas = [
      {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.seo_description || undefined,
        image: post.featured_image || undefined,
        datePublished: post.published_at || undefined,
        dateModified: post.updated_at || undefined,
        author: { "@type": "Person", name: post.author },
        publisher: { 
          "@type": "Organization", 
          name: "Vici SaskStartupSolutions",
          url: "https://saskstartupsolutions.ca/",
          logo: {
            "@type": "ImageObject",
            url: "https://saskstartupsolutions.ca/media/logo-full.png"
          }
        },
        mainEntityOfPage: `https://saskstartupsolutions.ca/blogs/${post.slug}`,
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://saskstartupsolutions.ca/" },
          { "@type": "ListItem", position: 2, name: "Blogs", item: "https://saskstartupsolutions.ca/blogs" },
          { "@type": "ListItem", position: 3, name: post.title },
        ],
      },
    ];

    const faqs = BLOG_FAQS[post.slug];
    if (faqs && faqs.length > 0) {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: f.a,
          },
        })),
      });
    }

    const ld = document.createElement("script");
    ld.type = "application/ld+json";
    ld.dataset.blogSchema = "true";
    ld.text = JSON.stringify(schemas);
    document.head.appendChild(ld);

    return () => {
      ld.remove();
    };
  }, [post]);

  return (
    <div data-testid="blog-post-page">
      {post && (
        <Seo
          title={post.seo_title || `${post.title} | Vici SaskStartupSolutions`}
          description={post.seo_description || `Read "${post.title}" from Vici SaskStartupSolutions — practical guidance for Saskatchewan small businesses.`}
          path={`/blogs/${post.slug}`}
          type="article"
        />
      )}
      {missing && (
        <Seo title="Post Not Found | Vici SaskStartupSolutions" description="This article may have been unpublished or removed." path={`/blogs/${slug}`} noindex />
      )}
      <section className="bg-bookgreen">
        <div className="mx-auto max-w-[800px] px-4 py-16 sm:px-6 sm:py-20">
          <nav aria-label="Breadcrumb" data-testid="post-breadcrumb">
            <ol className="flex flex-wrap items-center gap-1.5 font-sans text-xs font-semibold uppercase tracking-widest text-white/80">
              <li><Link to="/" className="hover:text-spring">Home</Link></li>
              <li aria-hidden="true"><ChevronRight className="h-3.5 w-3.5" /></li>
              <li><Link to="/blogs" className="hover:text-spring">Blogs</Link></li>
              {post && (
                <>
                  <li aria-hidden="true"><ChevronRight className="h-3.5 w-3.5" /></li>
                  <li aria-current="page" className="text-spring">{post.title.length > 40 ? `${post.title.slice(0, 40)}…` : post.title}</li>
                </>
              )}
            </ol>
          </nav>
          {post && (
            <>
              <h1 data-testid="post-title" className="mt-6 font-serif text-3xl font-bold uppercase leading-tight tracking-tight text-white sm:text-5xl">
                {post.title}
              </h1>
              <p className="mt-4 font-sans text-xs font-semibold uppercase tracking-widest text-white/80">
                By {post.author}{post.published_at ? ` · ${new Date(post.published_at).toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" })}` : ""}
              </p>
            </>
          )}
        </div>
      </section>

      <section className="bg-praxeti">
        <div className="mx-auto max-w-[800px] px-4 py-14 sm:px-6 sm:py-20">
          {missing ? (
            <div data-testid="post-not-found" className="text-center">
              <p className="font-serif text-2xl text-black">Post not found</p>
              <p className="mt-2 font-serif text-base text-black/70">It may have been unpublished or removed.</p>
              <Link to="/blogs" className="mt-4 inline-flex items-center gap-2 font-sans text-sm font-semibold uppercase tracking-wide text-black underline underline-offset-4">
                <ArrowLeft className="h-4 w-4" aria-hidden="true" /> All posts
              </Link>
            </div>
          ) : !post ? (
            <p className="font-serif text-black/70">Loading...</p>
          ) : (
            <Reveal>
              {post.featured_image && (
                <img src={post.featured_image} alt={post.featured_alt || post.title} data-testid="post-featured-image"
                  className="mb-10 w-full rounded-3xl border-2 border-black/15 object-cover" />
              )}
              <Markdown text={post.content} data-testid="post-content"
                className="font-serif text-lg leading-relaxed text-black/85 [&_a]:font-semibold [&_a]:underline [&_a]:underline-offset-4 [&_h2]:mt-10 [&_h2]:font-sans [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-black [&_h3]:mt-8 [&_h3]:font-sans [&_h3]:text-lg [&_h3]:font-bold [&_img]:my-6 [&_img]:rounded-2xl [&_p]:mt-5 [&_ul]:mt-5 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:mt-5 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:mt-2 [&_table]:my-8 [&_table]:w-full [&_table]:border-collapse [&_table]:overflow-hidden [&_table]:rounded-xl [&_th]:bg-bookgreen [&_th]:p-3 [&_th]:text-left [&_th]:font-sans [&_th]:text-sm [&_th]:font-semibold [&_th]:text-white [&_td]:border [&_td]:border-black/15 [&_td]:p-3 [&_td]:align-top [&_td]:text-base [&_tbody_tr:nth-child(even)]:bg-black/[0.03]" />
              <div data-testid="post-cta" className="mt-14 rounded-3xl bg-bookgreen p-8 text-center sm:p-10">
                <h2 className="font-serif text-2xl font-bold uppercase tracking-tight text-white">Ready to get organized?</h2>
                <p className="mx-auto mt-3 max-w-md font-serif text-base text-white/85">
                  Book a free introduction appointment or reach out with any questions — no obligation.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <Link to="/contact" data-testid="post-cta-contact"
                    className="rounded-full bg-mantis px-7 py-3 font-sans text-sm font-semibold uppercase tracking-wide text-black transition-transform duration-300 hover:scale-105">
                    Contact Vici SaskStartupSolutions
                  </Link>
                  <Link to="/booking" data-testid="post-cta-booking"
                    className="rounded-full border-2 border-white bg-transparent px-7 py-3 font-sans text-sm font-semibold uppercase tracking-wide text-white transition-colors duration-300 hover:bg-white hover:text-black">
                    Book Now
                  </Link>
                </div>
              </div>
            </Reveal>
          )}

          {related.length > 0 && (
            <div className="mt-16" data-testid="related-posts">
              <h2 className="font-serif text-2xl font-bold uppercase tracking-tight text-black">Related articles</h2>
              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                {related.map((p) => (
                  <Link key={p.id} to={`/blogs/${p.slug}`} data-testid={`related-${p.slug}`}
                    className="group block overflow-hidden rounded-3xl border-2 border-black/15 bg-white transition-shadow hover:shadow-xl">
                    {p.featured_image ? (
                      <img src={p.featured_image} alt={p.featured_alt || p.title} loading="lazy"
                        className="aspect-[16/9] w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    ) : (
                      <div className="flex aspect-[16/9] w-full items-center justify-center bg-bookgreen">
                        <span className="font-serif text-xl font-bold uppercase text-white">Vici</span>
                      </div>
                    )}
                    <div className="p-5">
                      <h3 className="font-serif text-lg font-bold text-black">{p.title}</h3>
                      <span className="mt-2 inline-block font-sans text-xs font-semibold uppercase tracking-wide text-black underline underline-offset-4">
                        Read post
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
