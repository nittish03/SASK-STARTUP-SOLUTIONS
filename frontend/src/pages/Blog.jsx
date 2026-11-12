import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Reveal, MaskedLine } from "@/components/Reveal";
import { API } from "@/lib/site";
import Seo from "@/components/Seo";
import { STATIC_BLOG_POSTS } from "@/data/blogPosts";

const CATEGORIES = [
  { label: "All Guides", filter: "all" },
  { label: "Incorporation & Setup", filter: "incorporation" },
  { label: "Small Business Bookkeeping", filter: "bookkeeping" },
  { label: "CRA Tax & Filing", filter: "tax" },
  { label: "ISC Registry & Compliance", filter: "compliance" },
  { label: "Newcomers & Multilingual", filter: "newcomer" }
];

export default function Blog() {
  const [posts, setPosts] = useState(STATIC_BLOG_POSTS);
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    axios
      .get(`${API}/blog`)
      .then((r) => {
        if (Array.isArray(r.data) && r.data.length >= STATIC_BLOG_POSTS.length) {
          setPosts(r.data);
        }
      })
      .catch(() => {});
  }, []);

  const filteredPosts = useMemo(() => {
    if (activeCategory === "all") return posts;
    return posts.filter((p) => {
      const slug = (p.slug || "").toLowerCase();
      if (activeCategory === "incorporation") {
        return slug.includes("incorporat") || slug.includes("sole-proprietor") || slug.includes("shareholder") || slug.includes("agri-business") || slug.includes("ownr") || slug.includes("startup");
      }
      if (activeCategory === "bookkeeping") {
        return slug.includes("bookkeeping") || slug.includes("freelancer") || slug.includes("contractor") || slug.includes("notice-to-reader") || slug.includes("bank-account");
      }
      if (activeCategory === "tax") {
        return slug.includes("tax") || slug.includes("gst") || slug.includes("pst") || slug.includes("payroll") || slug.includes("cpp2") || slug.includes("grants");
      }
      if (activeCategory === "compliance") {
        return slug.includes("isc") || slug.includes("annual-return") || slug.includes("registration") || slug.includes("register") || slug.includes("wcb") || slug.includes("lease") || slug.includes("dissolve") || slug.includes("beneficial-ownership") || slug.includes("licence");
      }
      if (activeCategory === "newcomer") {
        return slug.includes("newcomer") || slug.includes("multilingual") || slug.includes("startup");
      }
      return true;
    });
  }, [posts, activeCategory]);

  const blogSchema = {
    "@type": "CollectionPage",
    "@id": "https://saskstartupsolutions.ca/blogs#collection",
    "name": "Small Business & Startup Blog Saskatoon",
    "url": "https://saskstartupsolutions.ca/blogs",
    "description": "Comprehensive guides on small business bookkeeping, Saskatchewan incorporation, ISC business registration, T2 corporate tax filing, and CRA compliance.",
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": posts.map((p, idx) => ({
        "@type": "ListItem",
        "position": idx + 1,
        "url": `https://saskstartupsolutions.ca/blogs/${p.slug}`,
        "name": p.title,
      })),
    },
  };

  return (
    <div data-testid="blog-page">
      <Seo
        title={`Small Business & Startup Blog Saskatoon | ${posts.length} Bookkeeping & Tax Guides | Vici`}
        description="Comprehensive guides on small business bookkeeping, Saskatchewan incorporation, ISC business registration, T2 corporate tax filing, and CRA compliance for Saskatoon entrepreneurs."
        path="/blogs"
        schema={blogSchema}
      />
      <section className="bg-bookgreen" aria-labelledby="blog-heading">
        <div className="mx-auto max-w-[950px] px-4 py-20 sm:px-6 sm:py-28">
          <div className="inline-block rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-mantis mb-6 text-center w-full sm:w-auto">
            {posts.length} Comprehensive Saskatchewan Founder &amp; Accounting Guides
          </div>
          <h1
            id="blog-heading"
            data-testid="blog-heading"
            className="text-center font-serif text-4xl font-bold uppercase leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            <MaskedLine delay={0.1}>Saskatchewan Business & Startup Guides</MaskedLine>
          </h1>
          <Reveal delay={0.3}>
            <p className="mx-auto mt-6 max-w-2xl text-center font-serif text-base leading-relaxed text-white sm:text-lg">
              Practical guides on bookkeeping, T2 corporate tax filing, and Information Services Corporation (ISC) Registry administration for Saskatchewan startups and small businesses. Our articles cover the essential compliance topics every Saskatoon entrepreneur needs to master — from setting up your first corporation and registering your business name, to keeping compliant with annual returns and maintaining audit-ready financial records.
            </p>
          </Reveal>

          {/* Category Filter Pills */}
          <div className="mt-10 flex flex-wrap justify-center gap-2 sm:gap-3">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.filter}
                onClick={() => setActiveCategory(cat.filter)}
                className={`rounded-full px-4 py-2 text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  activeCategory === cat.filter
                    ? "bg-mantis text-black shadow-md scale-105"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-praxeti" aria-label="Blog posts">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          {!filteredPosts.length ? (
            <p data-testid="blog-empty" className="text-center font-serif text-lg text-black/70">
              No posts found in this category.
            </p>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3" data-testid="blog-list">
              {filteredPosts.map((p, i) => (
                <Reveal key={p.id || p.slug} delay={i * 0.04}>
                  <Link
                    to={`/blogs/${p.slug}`}
                    data-testid={`blog-card-${p.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-3xl border-2 border-black/15 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    {p.featured_image ? (
                      <img
                        src={p.featured_image}
                        alt={p.featured_alt || p.title}
                        width={800}
                        height={500}
                        loading="lazy"
                        decoding="async"
                        className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex aspect-[16/10] w-full items-center justify-center bg-bookgreen">
                        <span className="font-serif text-2xl font-bold uppercase text-white">Vici</span>
                      </div>
                    )}
                    <div className="flex flex-1 flex-col p-6">
                      <p className="font-sans text-xs font-semibold uppercase tracking-widest text-black/60">
                        {p.author}
                        {p.published_at
                          ? ` · ${new Date(p.published_at).toLocaleDateString("en-CA", {
                              year: "numeric",
                              month: "long",
                              day: "numeric"
                            })}`
                          : ""}
                      </p>
                      <h2 className="mt-2 font-serif text-xl font-bold leading-snug text-black group-hover:text-bookgreen transition-colors">
                        {p.title}
                      </h2>
                      {p.seo_description && (
                        <p className="mt-2 line-clamp-3 font-serif text-sm leading-relaxed text-black/75">
                          {p.seo_description}
                        </p>
                      )}
                      <div className="mt-auto pt-4">
                        <span className="inline-block font-sans text-xs font-semibold uppercase tracking-wide text-black underline underline-offset-4 group-hover:text-mantis transition-colors">
                          Read full guide →
                        </span>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="bg-white border-t border-black/10" aria-labelledby="blog-about-heading">
        <div className="mx-auto max-w-[800px] px-4 py-16 sm:px-6 sm:py-20">
          <Reveal>
            <h2 id="blog-about-heading" className="text-center font-serif text-3xl font-bold uppercase tracking-tight text-black sm:text-4xl">
              Why We Write These Guides
            </h2>
            <p className="mt-6 text-center font-serif text-base leading-relaxed text-black/85 sm:text-lg">
              Starting and running a business in Saskatchewan comes with specific provincial requirements that many entrepreneurs discover the hard way. Our blog exists to help you avoid common mistakes — whether that's missing an ISC annual return deadline, misunderstanding the difference between a sole proprietorship and a corporation, or falling behind on bookkeeping because you're focused on serving your customers.
            </p>
            <p className="mt-4 text-center font-serif text-base leading-relaxed text-black/85 sm:text-lg">
              Every article is written from real experience helping Saskatoon businesses with their bookkeeping, corporate tax filing administration, and registry compliance. We cover the topics our clients ask about most often, with practical steps you can take immediately. If you have a question we haven't covered yet, our free introduction appointment is the perfect place to ask it.
            </p>
            <div className="mt-8 text-center">
              <Link
                to="/booking"
                data-testid="blog-book-btn"
                className="inline-block rounded-full bg-mantis px-7 py-3 font-sans text-sm font-semibold uppercase tracking-wide text-black transition-transform duration-300 hover:scale-105 shadow-sm hover:shadow-md"
              >
                Book a Free Introduction
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
