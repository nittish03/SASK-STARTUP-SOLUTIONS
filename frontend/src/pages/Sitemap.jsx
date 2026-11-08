import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Seo from "@/components/Seo";
import { API } from "@/lib/site";

const PAGES = [
  { to: "/", label: "Home", desc: "Bookkeeping, business setup and registry administration for Saskatchewan businesses" },
  { to: "/services", label: "Services", desc: "Bookkeeping, T2 filing administration and ISC Registry administration" },
  { to: "/booking", label: "Booking", desc: "Book a free, no-obligation introduction appointment" },
  { to: "/staff", label: "Meet the Team", desc: "Patrick Vachon, Founder & Lead Administrator" },
  { to: "/contact", label: "Contact Us", desc: "Phone, email, address, hours and contact form" },
  { to: "/faq", label: "FAQ", desc: "Common questions about our services and process" },
  { to: "/blogs", label: "Blogs & Practical Guides", desc: "Guides for Saskatchewan small businesses" },
];

export default function Sitemap() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get(`${API}/blog`).then((r) => setPosts(Array.isArray(r.data) ? r.data : [])).catch(() => {});
  }, []);

  return (
    <div data-testid="sitemap-page" className="bg-praxeti">
      <Seo title="Sitemap | Vici SaskStartupSolutions" description="Every public page and article on the Vici SaskStartupSolutions website." path="/sitemap" />
      <section className="mx-auto max-w-[900px] px-4 py-20 sm:px-6 sm:py-24">
        <h1 data-testid="sitemap-heading" className="font-serif text-4xl font-bold uppercase tracking-tight text-black sm:text-5xl">
          Sitemap
        </h1>
        <p className="mt-4 max-w-2xl font-serif text-base leading-relaxed text-black/80 sm:text-lg">
          Every page and published article on the Vici SaskStartupSolutions website, organised in one place for easy navigation. This directory helps you find exactly what you need — whether you're looking for information about our bookkeeping services, want to book a free introduction appointment, need to contact our Saskatoon office, or want to read our latest guides for Saskatchewan small businesses.
        </p>
        <p className="mt-4 max-w-2xl font-serif text-base leading-relaxed text-black/80 sm:text-lg">
          Vici SaskStartupSolutions provides professional bookkeeping, T2 corporate tax filing administration, and Saskatchewan ISC Registry administration for startups and growing companies across Saskatoon and Saskatchewan. We help entrepreneurs focus on building their business while we handle the paperwork, compliance deadlines, and financial record-keeping that keeps your company running smoothly.
        </p>
        <p className="mt-4 max-w-2xl font-serif text-base leading-relaxed text-black/80 sm:text-lg">
          If you're not sure where to start, our Services page explains each of our three core offerings in detail. For a personal conversation about your business needs, our Booking page lets you schedule a free, no-obligation introduction appointment at a time that works for you. And if you have questions about how we work, our FAQ page answers the most common queries we receive from Saskatchewan business owners.
        </p>

        <h2 className="mt-10 font-sans text-sm font-semibold uppercase tracking-widest text-black/60">Pages</h2>
        <ul className="mt-4 divide-y divide-black/10 border-y-2 border-black/15">
          {PAGES.map((p) => (
            <li key={p.to} className="py-4">
              <Link to={p.to} data-testid={`sitemap-link-${p.to === "/" ? "home" : p.to.slice(1)}`} className="font-serif text-lg font-semibold text-bookgreen underline-offset-4 hover:underline">
                {p.label}
              </Link>
              <p className="mt-1 font-serif text-sm text-black/70">{p.desc}</p>
            </li>
          ))}
        </ul>

        {posts.length > 0 && (
          <>
            <h2 className="mt-10 font-sans text-sm font-semibold uppercase tracking-widest text-black/60">Articles</h2>
            <ul className="mt-4 divide-y divide-black/10 border-y-2 border-black/15">
              {posts.map((p) => (
                <li key={p.slug} className="py-4">
                  <Link to={`/blogs/${p.slug}`} data-testid={`sitemap-post-${p.slug}`} className="font-serif text-lg font-semibold text-bookgreen underline-offset-4 hover:underline">
                    {p.title}
                  </Link>
                  {p.published_at && (
                    <p className="mt-1 font-sans text-xs uppercase tracking-widest text-black/50">
                      Published {new Date(p.published_at).toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" })}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </>
        )}
      </section>
    </div>
  );
}
