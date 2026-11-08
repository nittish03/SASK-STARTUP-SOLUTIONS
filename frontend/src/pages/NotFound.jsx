import { Link } from "react-router-dom";
import Seo from "@/components/Seo";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/booking", label: "Book a Free Introduction" },
  { to: "/staff", label: "Meet the Team" },
  { to: "/contact", label: "Contact Us" },
  { to: "/faq", label: "FAQ" },
  { to: "/blog", label: "Blog" },
];

export default function NotFound() {
  return (
    <div data-testid="not-found-page" className="bg-praxeti">
      <Seo title="Page Not Found | Vici SaskStartupSolutions" description="The page you were looking for could not be found." path="/404" noindex />
      <section className="mx-auto max-w-[700px] px-4 py-24 text-center sm:px-6 sm:py-32">
        <p className="font-serif text-7xl font-bold text-bookgreen" aria-hidden="true">404</p>
        <h1 className="mt-4 font-serif text-3xl font-bold uppercase tracking-tight text-black sm:text-4xl">
          This page isn't here
        </h1>
        <p className="mx-auto mt-4 max-w-md font-serif text-base leading-relaxed text-black/80 sm:text-lg">
          The link may be old or the page may have moved. Here's where you can go instead:
        </p>
        <nav aria-label="Helpful links">
          <ul className="mt-8 flex flex-wrap justify-center gap-3">
            {LINKS.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  data-testid={`notfound-link-${l.to === "/" ? "home" : l.to.slice(1)}`}
                  className="inline-block rounded-full border-2 border-black px-5 py-2 font-sans text-sm font-semibold uppercase tracking-wide text-black transition-colors duration-200 hover:bg-black hover:text-white"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </section>
    </div>
  );
}
