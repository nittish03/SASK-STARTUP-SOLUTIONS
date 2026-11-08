import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Reveal, MaskedLine } from "@/components/Reveal";
import { API } from "@/lib/site";

export default function Blog() {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    document.title = "Blog | Vici SaskStartupSolutions";
    axios.get(`${API}/blog`).then((r) => setPosts(r.data)).catch(() => setPosts([]));
  }, []);

  return (
    <div data-testid="blog-page">
      <section className="bg-bookgreen" aria-labelledby="blog-heading">
        <div className="mx-auto max-w-[900px] px-4 py-20 sm:px-6 sm:py-28">
          <h1
            id="blog-heading"
            data-testid="blog-heading"
            className="text-center font-serif text-4xl font-bold uppercase leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            <MaskedLine delay={0.1}>Blog</MaskedLine>
          </h1>
          <Reveal delay={0.3}>
            <p className="mx-auto mt-6 max-w-2xl text-center font-serif text-base leading-relaxed text-white sm:text-lg">
              Notes on bookkeeping, T2 filing, and ISC Registry for Saskatchewan startups.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-praxeti" aria-label="Blog posts">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          {posts === null ? (
            <p className="font-serif text-black/70">Loading posts...</p>
          ) : !posts.length ? (
            <p data-testid="blog-empty" className="text-center font-serif text-lg text-black/70">
              No posts yet — check back soon.
            </p>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3" data-testid="blog-list">
              {posts.map((p, i) => (
                <Reveal key={p.id} delay={i * 0.06}>
                  <Link
                    to={`/blog/${p.slug}`}
                    data-testid={`blog-card-${p.slug}`}
                    className="group block overflow-hidden rounded-3xl border-2 border-black/15 bg-white transition-shadow hover:shadow-xl"
                  >
                    {p.featured_image ? (
                      <img src={p.featured_image} alt={p.featured_alt || p.title} loading="lazy"
                        className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    ) : (
                      <div className="flex aspect-[16/10] w-full items-center justify-center bg-bookgreen">
                        <span className="font-serif text-2xl font-bold uppercase text-white">Vici</span>
                      </div>
                    )}
                    <div className="p-6">
                      <p className="font-sans text-xs font-semibold uppercase tracking-widest text-black/60">
                        {p.author}{p.published_at ? ` · ${new Date(p.published_at).toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" })}` : ""}
                      </p>
                      <h2 className="mt-2 font-serif text-xl font-bold text-black">{p.title}</h2>
                      {p.seo_description && (
                        <p className="mt-2 line-clamp-2 font-serif text-sm text-black/75">{p.seo_description}</p>
                      )}
                      <span className="mt-4 inline-block font-sans text-xs font-semibold uppercase tracking-wide text-black underline underline-offset-4 group-hover:text-black/60">
                        Read post
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
