import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Search, User, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
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

const SEARCH_INDEX = [
  { label: "Our Services overview", to: "/services", keywords: "services overview bookkeeping t2 isc registry package" },
  { label: "Part 1 - Bookkeeping", to: "/booking", keywords: "bookkeeping records cra" },
  { label: "Part 2 - T2 Corporate Filing Administration", to: "/booking", keywords: "t2 corporate tax filing cra" },
  { label: "Part 3 - ISC Registry Administration", to: "/booking", keywords: "isc registry incorporation annual report" },
  { label: "All in one Basic Service Package", to: "/booking", keywords: "package bundle all" },
  { label: "Introduction and Intake Appointment", to: "/booking", keywords: "intro free appointment intake" },
  { label: "Contact us", to: "/contact", keywords: "phone email address hours map" },
  { label: "FAQ", to: "/faq", keywords: "questions quote documents timeline" },
  { label: "Our staff", to: "/staff", keywords: "patrick vachon founder team" },
  { label: "Blogs & Business Guides", to: "/blogs", keywords: "blogs articles bookkeeping saskatoon t2 tax isc annual return registration" },
];

function Wordmark() {
  return (
    <Link to="/" data-testid="wordmark-link" className="flex items-center gap-2.5 leading-none shrink-0">
      <img src="/media/logo-icon.png" alt="Vici SaskStartupSolutions — Bookkeeping and Startup Administration in Saskatoon" width="132" height="132" data-testid="header-logo" className="h-10 w-10 rounded-full shadow-[0_1px_0_rgba(0,31,63,0.25)] sm:h-11 sm:w-11" />
      <span>
        <span className="block font-serif font-bold uppercase tracking-tight text-midnight text-base sm:text-lg leading-[1.05]">Vici</span>
        <span className="block font-serif font-bold uppercase tracking-tight text-midnight text-base sm:text-lg leading-[1.05]">SaskStartup</span>
        <span className="block font-serif font-bold uppercase tracking-tight text-midnight text-base sm:text-lg leading-[1.05]">Solutions</span>
      </span>
    </Link>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const results = query.trim()
    ? SEARCH_INDEX.filter((r) => `${r.label} ${r.keywords}`.toLowerCase().includes(query.toLowerCase()))
    : SEARCH_INDEX;

  return (
    <header data-testid="site-header" className="sticky top-0 z-50 bg-spring text-midnight shadow-[0_2px_0_rgba(0,31,63,0.15)]">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6">
        <Wordmark />
        <nav aria-label="Primary" className="mx-auto hidden items-center gap-7 lg:flex">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              data-testid={`nav-link-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
              className={({ isActive }) =>
                `font-sans text-sm font-semibold uppercase tracking-wider transition-all duration-200 hover:underline hover:underline-offset-8 hover:decoration-2 ${
                  isActive ? "underline underline-offset-8 decoration-2" : ""
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2 sm:gap-3 lg:ml-0">
          <button
            type="button"
            data-testid="header-book-now-btn"
            onClick={() => { trackEvent("book_intro_click", { location: "header" }); navigate("/booking"); }}
            className="rounded-full border-2 border-midnight bg-transparent px-4 py-2 font-sans text-sm font-semibold uppercase tracking-wide text-midnight transition-colors duration-300 hover:bg-midnight hover:text-praxeti"
          >
            Book Now
          </button>
          <button
            type="button"
            data-testid="header-search-btn"
            aria-label="Search"
            onClick={() => setSearchOpen(true)}
            className="rounded-full p-2 transition-colors duration-200 hover:bg-midnight hover:text-praxeti"
          >
            <Search className="h-5 w-5" />
          </button>
          <button
            type="button"
            data-testid="header-account-btn"
            aria-label="Staff login"
            onClick={() => navigate("/admin")}
            className="hidden rounded-full p-2 transition-colors duration-200 hover:bg-midnight hover:text-praxeti sm:block"
          >
            <User className="h-5 w-5" />
          </button>
          <button
            type="button"
            data-testid="header-menu-btn"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="rounded-full p-2 transition-colors duration-200 hover:bg-midnight hover:text-praxeti lg:hidden"
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            key="mobile-menu"
            data-testid="mobile-menu"
            aria-label="Mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden border-t-2 border-midnight/20 bg-spring lg:hidden"
          >
            <div className="flex flex-col px-6 py-4">
              {NAV.map((item, i) => (
                <motion.div
                  key={item.to}
                  initial={{ x: -16, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <NavLink
                    to={item.to}
                    data-testid={`mobile-nav-link-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      `block border-b border-black/15 py-4 font-sans text-base font-semibold uppercase tracking-wider text-black ${
                        isActive ? "underline underline-offset-8 decoration-2" : ""
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                </motion.div>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {searchOpen && (
          <motion.div
            key="search-modal"
            data-testid="search-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Site search"
            className="fixed inset-0 z-[70] flex items-start justify-center bg-midnight/70 p-4 pt-24"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSearchOpen(false)}
          >
            <motion.div
              initial={{ y: -24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -24, opacity: 0 }}
              className="w-full max-w-xl rounded-2xl bg-praxeti p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3">
                <Search className="h-5 w-5 text-nuit" aria-hidden="true" />
                <input
                  autoFocus
                  data-testid="search-input"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search services, pages..."
                  className="w-full border-b-2 border-midnight/20 bg-transparent py-2 font-sans text-base text-midnight outline-none focus:border-nuit"
                />
                <button type="button" data-testid="search-close-btn" aria-label="Close search" onClick={() => setSearchOpen(false)}>
                  <X className="h-5 w-5 text-midnight" />
                </button>
              </div>
              <ul className="mt-4 max-h-80 overflow-auto">
                {results.map((r) => (
                  <li key={r.label}>
                    <button
                      type="button"
                      data-testid={`search-result-${r.label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                      className="w-full rounded-lg px-3 py-3 text-left font-sans text-sm font-semibold text-midnight transition-colors hover:bg-spring/60"
                      onClick={() => {
                        setSearchOpen(false);
                        setQuery("");
                        navigate(r.to);
                      }}
                    >
                      {r.label}
                    </button>
                  </li>
                ))}
                {results.length === 0 && (
                  <li data-testid="search-no-results" className="px-3 py-4 font-sans text-sm text-midnight/70">
                    No results found.
                  </li>
                )}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {accountOpen && (
          <motion.div
            key="account-modal"
            data-testid="account-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Client account"
            className="fixed inset-0 z-[70] flex items-center justify-center bg-midnight/70 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setAccountOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-md rounded-2xl bg-praxeti p-8 text-center shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <User className="mx-auto h-10 w-10 text-nuit" aria-hidden="true" />
              <h2 className="mt-4 font-serif text-2xl uppercase text-midnight">Client Accounts</h2>
              <p className="mt-3 font-serif text-base text-midnight/80">
                Online client accounts are coming soon. For now, book a free introduction appointment and we'll set everything up with you personally.
              </p>
              <button
                type="button"
                data-testid="account-modal-book-btn"
                onClick={() => {
                  setAccountOpen(false);
                  navigate("/booking");
                }}
                className="mt-6 rounded-full bg-mantis px-6 py-3 font-sans text-sm font-semibold uppercase tracking-wide text-midnight transition-transform duration-200 hover:scale-105"
              >
                Book Now
              </button>
              <button
                type="button"
                data-testid="account-modal-close-btn"
                onClick={() => setAccountOpen(false)}
                className="mt-3 block w-full font-sans text-sm font-semibold text-nuit underline underline-offset-4"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
