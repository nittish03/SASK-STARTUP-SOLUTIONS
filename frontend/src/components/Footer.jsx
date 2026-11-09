import { Link } from "react-router-dom";
import { useContent } from "@/lib/content";
import { trackEvent } from "@/lib/analytics";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/staff", label: "Staff" },
  { to: "/booking", label: "Booking" },
  { to: "/contact", label: "Contact Us" },
  { to: "/faq", label: "FAQ" },
  { to: "/blogs", label: "Blogs" },
];

export default function Footer() {
  const fc = useContent("footer");
  return (
    <footer data-testid="site-footer" className="bg-black text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <img
            src="/media/logo-full.webp"
            alt="Vici Sask Startup Solutions — Bookkeeping, Tax, Registry"
            width="352"
            height="318"
            loading="lazy"
            decoding="async"
            data-testid="footer-logo"
            className="w-44 rounded-2xl border border-white/10"
          />
          <p className="mt-4 max-w-xs font-serif text-sm text-white/80">
            {fc.footerBlurb || "Bookkeeping, T2 corporate tax filing administration, and Saskatchewan ISC Registry administration for startups and growing companies."}
          </p>
        </div>
        <nav aria-label="Footer">
          <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-white/70">Pages</h2>
          <ul className="mt-4 space-y-2">
            {NAV.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  data-testid={`footer-link-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                  className="font-sans text-sm font-semibold text-white transition-all hover:underline hover:underline-offset-4"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                to="/sitemap"
                data-testid="footer-link-sitemap"
                className="font-sans text-sm font-semibold text-white transition-all hover:underline hover:underline-offset-4"
              >
                Sitemap
              </Link>
            </li>
          </ul>
        </nav>
        <div>
          <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-white/70">Visit Us</h2>
          <address className="mt-4 font-serif text-sm not-italic leading-relaxed text-white/80">
            Vici SaskStartupSolutions<br />
            539 Avenue I N<br />
            Saskatoon, Saskatchewan S7L 2G9<br />
            <a href="tel:+13069600091" data-testid="footer-phone-link" onClick={() => trackEvent("contact_click", { method: "phone" })} className="text-white underline decoration-white/50 underline-offset-4 hover:decoration-white">
              1 (306) 960-0091
            </a>
            <br />
            <a href="mailto:Saskstartupsolutions@viciconsulting.ca" data-testid="footer-email-link" onClick={() => trackEvent("contact_click", { method: "email" })} className="text-white underline decoration-white/50 underline-offset-4 hover:decoration-white">
              Saskstartupsolutions@viciconsulting.ca
            </a>
          </address>
        </div>
      </div>
      <div className="border-t border-white/15">
        <p data-testid="footer-copyright" className="mx-auto max-w-7xl px-4 py-5 text-center font-sans text-xs uppercase tracking-widest text-white/70 sm:px-6">
          © 2026 Vici SaskStartupSolutions
        </p>
      </div>
    </footer>
  );
}
