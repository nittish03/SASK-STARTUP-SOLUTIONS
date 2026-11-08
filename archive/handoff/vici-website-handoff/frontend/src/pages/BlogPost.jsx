import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import Markdown from "@/components/Markdown";
import { API } from "@/lib/site";

const BASE_TITLE = "Vici SaskStartupSolutions | Bookkeeping, T2 Filing & ISC Registry — Saskatoon, SK";

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
    document.title = post.seo_title || `${post.title} | Vici SaskStartupSolutions`;
    const meta = document.querySelector('meta[name="description"]');
    const prevDesc = meta?.getAttribute("content");
    if (meta && post.seo_description) meta.setAttribute("content", post.seo_description);

    const ld = document.createElement("script");
    ld.type = "application/ld+json";
    ld.dataset.blogSchema = "true";
    ld.text = JSON.stringify([
      {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.seo_description || undefined,
        image: post.featured_image || undefined,
        datePublished: post.published_at || undefined,
        dateModified: post.updated_at || undefined,
        author: { "@type": "Person", name: post.author },
        publisher: { "@type": "Organization", name: "Vici SaskStartupSolutions" },
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home" },
          { "@type": "ListItem", position: 2, name: "Blog" },
          { "@type": "ListItem", position: 3, name: post.title },
        ],
      },
    ]);
    document.head.appendChild(ld);

    return () => {
      document.title = BASE_TITLE;
      if (meta && prevDesc) meta.setAttribute("content", prevDesc);
      ld.remove();
    };
  }, [post]);

  return (
    <div data-testid="blog-post-page">
      <section className="bg-bookgreen">
        <div className="mx-auto max-w-[800px] px-4 py-16 sm:px-6 sm:py-20">
          <nav aria-label="Breadcrumb" data-testid="post-breadcrumb">
            <ol className="flex flex-wrap items-center gap-1.5 font-sans text-xs font-semibold uppercase tracking-widest text-white/80">
              <li><Link to="/" className="hover:text-spring">Home</Link></li>
              <li aria-hidden="true"><ChevronRight className="h-3.5 w-3.5" /></li>
              <li><Link to="/blog" className="hover:text-spring">Blog</Link></li>
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
              <Link to="/blog" className="mt-4 inline-flex items-center gap-2 font-sans text-sm font-semibold uppercase tracking-wide text-black underline underline-offset-4">
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
                  <Link key={p.id} to={`/blog/${p.slug}`} data-testid={`related-${p.slug}`}
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
