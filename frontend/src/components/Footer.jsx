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
  { to: "/sitemap", label: "Sitemap" },
];

const SPECIALIZED = [
  { to: "/incorporate-saskatoon", label: "Incorporate in Saskatoon" },
  { to: "/business-registration-saskatchewan", label: "Business Registration Saskatchewan" },
  { to: "/bookkeeping-saskatoon", label: "Bookkeeper Saskatoon" },
  { to: "/bookkeeping-cleanup-saskatoon", label: "Bookkeeping Cleanup Services" },
  { to: "/starting-a-business-saskatoon", label: "Starting a Business in Saskatoon" },
  { to: "/corporate-tax-t2-saskatoon", label: "Corporate Tax & T2 Filing" },
  { to: "/minute-book-share-structure-saskatchewan", label: "Minute Books & Share Structure" },
  { to: "/isc-annual-returns-saskatoon", label: "ISC Annual Returns & Registry" },
  { to: "/multilingual-newcomer-business-saskatoon", label: "Newcomer & Multilingual Setup" },
];

export default function Footer() {
  const fc = useContent("footer");
  return (
    <footer data-testid="site-footer" className="bg-black text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        {/* Brand Info */}
        <div className="md:col-span-1">
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
          <p className="mt-4 font-serif text-sm text-white/80">
            {fc.footerBlurb || "Professional small business bookkeeping, T2 corporate tax filing administration, and Saskatchewan ISC Registry administration for Saskatoon startups and growing companies."}
          </p>
        </div>

        {/* Core Pages */}
        <nav aria-label="Footer Navigation">
          <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-white/70">Pages</h2>
          <ul className="mt-4 space-y-2">
            {NAV.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  data-testid={`footer-link-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                  className="font-sans text-sm font-semibold text-white/90 transition-all hover:text-spring hover:underline hover:underline-offset-4"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Specialized Solutions */}
        <nav aria-label="Specialized Services">
          <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-white/70">Specialized Solutions</h2>
          <ul className="mt-4 space-y-2">
            {SPECIALIZED.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  data-testid={`footer-specialized-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                  className="font-sans text-sm font-semibold text-white/90 transition-all hover:text-spring hover:underline hover:underline-offset-4"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Physical Office NAP */}
        <div>
          <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-white/70">Visit Our Saskatoon Office</h2>
          <address className="mt-4 font-serif text-sm not-italic leading-relaxed text-white/80">
            <strong>Vici SaskStartupSolutions</strong><br />
            539 Avenue I N<br />
            Saskatoon, Saskatchewan S7L 2G9<br />
            <span className="text-white/60 text-xs">Mon–Sun: 8:00 AM – 8:00 PM CST</span><br />
            <a href="tel:+13069600091" data-testid="footer-phone-link" onClick={() => trackEvent("contact_click", { method: "phone" })} className="text-spring underline decoration-spring/50 underline-offset-4 hover:decoration-spring font-sans text-sm mt-2 inline-block font-semibold">
              1 (306) 960-0091
            </a>
            <br />
            <a href="mailto:Saskstartupsolutions@viciconsulting.ca" data-testid="footer-email-link" onClick={() => trackEvent("contact_click", { method: "email" })} className="text-white underline decoration-white/50 underline-offset-4 hover:decoration-white text-xs break-all">
              Saskstartupsolutions@viciconsulting.ca
            </a>
          </address>
        </div>
      </div>
      <div className="border-t border-white/15">
        <p data-testid="footer-copyright" className="mx-auto max-w-7xl px-4 py-5 text-center font-sans text-xs uppercase tracking-widest text-white/70 sm:px-6">
          © 2026 Vici SaskStartupSolutions · Patrick Vachon · Saskatoon, SK
        </p>
      </div>
    </footer>
  );
}
