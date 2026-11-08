import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ChevronRight, HelpCircle, CheckCircle } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import Markdown from "@/components/Markdown";
import { API } from "@/lib/site";
import Seo from "@/components/Seo";
import { STATIC_BLOG_POSTS, BLOG_POSTS_BY_SLUG } from "@/data/blogPosts";
import { BLOG_FAQS } from "@/data/blogFaqs";

export default function BlogPost() {
  const { slug } = useParams();
  const staticMatch = BLOG_POSTS_BY_SLUG[slug] || null;
  const [post, setPost] = useState(staticMatch);
  const [related, setRelated] = useState(
    STATIC_BLOG_POSTS.filter((p) => p.slug !== slug).slice(0, 3)
  );
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    const localPost = BLOG_POSTS_BY_SLUG[slug] || null;
    if (localPost) {
      setPost(localPost);
      setRelated(STATIC_BLOG_POSTS.filter((p) => p.slug !== slug).slice(0, 3));
      setMissing(false);
    } else {
      setPost(null);
      setMissing(false);
    }

    axios
      .get(`${API}/blog/${slug}`)
      .then((r) => {
        if (r.data) {
          setPost(r.data);
        }
      })
      .catch((e) => {
        if (!localPost && e.response?.status === 404) {
          setMissing(true);
        }
      });

    axios
      .get(`${API}/blog`)
      .then((r) => {
        if (Array.isArray(r.data) && r.data.length > 1) {
          setRelated(r.data.filter((p) => p.slug !== slug).slice(0, 3));
        }
      })
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
        author: {
          "@type": "Person",
          name: post.author || "Patrick Vachon",
          jobTitle: "Practice Lead",
          worksFor: {
            "@type": "Organization",
            name: "Vici SaskStartupSolutions",
            url: "https://saskstartupsolutions.ca/"
          }
        },
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

    const faqs = BLOG_FAQS[post.slug] || post.faqs;
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

  const activeFaqs = post ? (BLOG_FAQS[post.slug] || post.faqs || []) : [];

  return (
    <div data-testid="blog-post-page">
      {post && (
        <Seo
          title={post.seo_title || `${post.title} | Vici SaskStartupSolutions`}
          description={
            post.seo_description ||
            `Read "${post.title}" from Vici SaskStartupSolutions — practical guidance for Saskatchewan small businesses.`
          }
          path={`/blogs/${post.slug}`}
          type="article"
        />
      )}
      {missing && (
        <Seo
          title="Post Not Found | Vici SaskStartupSolutions"
          description="This article may have been unpublished or removed."
          path={`/blogs/${slug}`}
          noindex
        />
      )}
      <section className="bg-bookgreen">
        <div className="mx-auto max-w-[850px] px-4 py-16 sm:px-6 sm:py-20">
          <nav aria-label="Breadcrumb" data-testid="post-breadcrumb">
            <ol className="flex flex-wrap items-center gap-1.5 font-sans text-xs font-semibold uppercase tracking-widest text-white/80">
              <li>
                <Link to="/" className="hover:text-spring">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="h-3.5 w-3.5" />
              </li>
              <li>
                <Link to="/blogs" className="hover:text-spring">
                  Blogs
                </Link>
              </li>
              {post && (
                <>
                  <li aria-hidden="true">
                    <ChevronRight className="h-3.5 w-3.5" />
                  </li>
                  <li aria-current="page" className="text-spring">
                    {post.title.length > 40 ? `${post.title.slice(0, 40)}…` : post.title}
                  </li>
                </>
              )}
            </ol>
          </nav>
          {post && (
            <>
              <h1
                data-testid="post-title"
                className="mt-6 font-serif text-3xl font-bold uppercase leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl"
              >
                {post.title}
              </h1>
              <div className="mt-4 flex flex-wrap items-center gap-3 font-sans text-xs font-semibold uppercase tracking-widest text-white/80">
                <span>By {post.author || "Patrick Vachon"}</span>
                <span>•</span>
                <span>
                  {post.published_at
                    ? new Date(post.published_at).toLocaleDateString("en-CA", {
                        year: "numeric",
                        month: "long",
                        day: "numeric"
                      })
                    : "November 2026"}
                </span>
                <span>•</span>
                <span className="rounded bg-white/20 px-2 py-0.5 text-[11px] text-white">
                  Saskatchewan Business Guide
                </span>
              </div>
            </>
          )}
        </div>
      </section>

      <section className="bg-praxeti">
        <div className="mx-auto max-w-[850px] px-4 py-14 sm:px-6 sm:py-20">
          {missing ? (
            <div data-testid="post-not-found" className="text-center">
              <p className="font-serif text-2xl text-black">Post not found</p>
              <p className="mt-2 font-serif text-base text-black/70">
                It may have been unpublished or removed.
              </p>
              <Link
                to="/blogs"
                className="mt-4 inline-flex items-center gap-2 font-sans text-sm font-semibold uppercase tracking-wide text-black underline underline-offset-4"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" /> All posts
              </Link>
            </div>
          ) : !post ? (
            <p className="font-serif text-black/70">Loading guide...</p>
          ) : (
            <Reveal>
              {post.featured_image && (
                <img
                  src={post.featured_image}
                  alt={post.featured_alt || post.title}
                  data-testid="post-featured-image"
                  width={1200}
                  height={630}
                  loading="lazy"
                  decoding="async"
                  className="mb-10 w-full rounded-3xl border-2 border-black/15 object-cover shadow-sm"
                />
              )}
              <Markdown
                text={post.content}
                data-testid="post-content"
                className="font-serif text-lg leading-relaxed text-black/85 [&_a]:font-semibold [&_a]:text-bookgreen [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-black [&_h2]:mt-10 [&_h2]:font-sans [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-black [&_h3]:mt-8 [&_h3]:font-sans [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-black [&_img]:my-6 [&_img]:rounded-2xl [&_p]:mt-5 [&_ul]:mt-5 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:mt-5 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:mt-2 [&_table]:my-8 [&_table]:w-full [&_table]:border-collapse [&_table]:overflow-hidden [&_table]:rounded-xl [&_th]:bg-bookgreen [&_th]:p-3 [&_th]:text-left [&_th]:font-sans [&_th]:text-sm [&_th]:font-semibold [&_th]:text-white [&_td]:border [&_td]:border-black/15 [&_td]:p-3 [&_td]:align-top [&_td]:text-base [&_tbody_tr:nth-child(even)]:bg-black/[0.03]"
              />

              {/* On-Page Visual FAQ Section for Answer Engines & Searchers */}
              {activeFaqs.length > 0 && (
                <section
                  className="mt-14 rounded-3xl border-2 border-black/15 bg-white p-6 sm:p-10 shadow-sm"
                  aria-labelledby="faq-section-heading"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className="h-6 w-6 text-bookgreen" />
                    <h2
                      id="faq-section-heading"
                      className="font-serif text-2xl font-bold uppercase tracking-tight text-black sm:text-3xl"
                    >
                      Frequently Asked Questions
                    </h2>
                  </div>
                  <p className="mt-2 font-serif text-sm text-black/70">
                    Key answers and statutory guidelines for Saskatchewan entrepreneurs regarding {post.title.toLowerCase()}.
                  </p>
                  <div className="mt-6 space-y-6 divide-y divide-black/10">
                    {activeFaqs.map((faq, idx) => (
                      <div key={idx} className={idx > 0 ? "pt-6" : ""}>
                        <h3 className="font-serif text-lg font-bold text-black flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-mantis shrink-0 mt-0.5" />
                          <span>{faq.q}</span>
                        </h3>
                        <p className="mt-2 pl-7 font-serif text-base leading-relaxed text-black/80">
                          {faq.a}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Author Attribution Box */}
              <div className="mt-10 rounded-2xl border border-black/10 bg-white/70 p-6 flex flex-col sm:flex-row items-center gap-5">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-bookgreen text-2xl font-bold text-white">
                  PV
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="font-serif text-lg font-bold text-black">
                    Written by Patrick Vachon
                  </h3>
                  <p className="font-sans text-xs uppercase tracking-wider text-black/60">
                    Practice Lead · Vici SaskStartupSolutions · Saskatoon, SK
                  </p>
                  <p className="mt-1 font-serif text-sm text-black/75">
                    Advising Saskatchewan startups, sole proprietors, and corporations on bookkeeping systems, CRA sales tax compliance, and ISC Corporate Registry administration.
                  </p>
                </div>
              </div>

              {/* Call to Action Card */}
              <div
                data-testid="post-cta"
                className="mt-14 rounded-3xl bg-bookgreen p-8 text-center sm:p-10 shadow-lg"
              >
                <h2 className="font-serif text-2xl font-bold uppercase tracking-tight text-white sm:text-3xl">
                  Ready to get organized in Saskatoon?
                </h2>
                <p className="mx-auto mt-3 max-w-lg font-serif text-base leading-relaxed text-white/90">
                  Book a free introductory appointment with Patrick Vachon. We’ll review your Saskatchewan business setup, bookkeeping, sales tax, or registry requirements with zero obligation.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <Link
                    to="/booking"
                    data-testid="post-cta-booking"
                    className="rounded-full bg-mantis px-7 py-3 font-sans text-sm font-semibold uppercase tracking-wide text-black transition-transform duration-300 hover:scale-105 shadow-md"
                  >
                    Book Free Consultation
                  </Link>
                  <Link
                    to="/contact"
                    data-testid="post-cta-contact"
                    className="rounded-full border-2 border-white bg-transparent px-7 py-3 font-sans text-sm font-semibold uppercase tracking-wide text-white transition-colors duration-300 hover:bg-white hover:text-black"
                  >
                    Contact Us Directly
                  </Link>
                </div>
              </div>
            </Reveal>
          )}

          {related.length > 0 && (
            <div className="mt-16" data-testid="related-posts">
              <h2 className="font-serif text-2xl font-bold uppercase tracking-tight text-black">
                Related Saskatchewan Business Guides
              </h2>
              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((p) => (
                  <Link
                    key={p.id || p.slug}
                    to={`/blogs/${p.slug}`}
                    data-testid={`related-${p.slug}`}
                    className="group flex flex-col overflow-hidden rounded-3xl border-2 border-black/15 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    {p.featured_image ? (
                      <img
                        src={p.featured_image}
                        alt={p.featured_alt || p.title}
                        width={800}
                        height={450}
                        loading="lazy"
                        decoding="async"
                        className="aspect-[16/9] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex aspect-[16/9] w-full items-center justify-center bg-bookgreen">
                        <span className="font-serif text-xl font-bold uppercase text-white">Vici</span>
                      </div>
                    )}
                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="font-serif text-base font-bold leading-snug text-black group-hover:text-bookgreen transition-colors">
                        {p.title}
                      </h3>
                      <div className="mt-auto pt-3">
                        <span className="inline-block font-sans text-xs font-semibold uppercase tracking-wide text-black underline underline-offset-4 group-hover:text-mantis transition-colors">
                          Read post →
                        </span>
                      </div>
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
