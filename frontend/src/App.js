import { useEffect, useLayoutEffect, useRef } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Lenis from "lenis";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import Services from "@/pages/Services";
import Booking from "@/pages/Booking";
import Staff from "@/pages/Staff";
import Contact from "@/pages/Contact";
import Faq from "@/pages/Faq";
import Admin from "@/pages/Admin";
import Portal from "@/pages/Portal";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import Sitemap from "@/pages/Sitemap";
import NotFound from "@/pages/NotFound";
import { scrollToId } from "@/lib/site";
import { useContent } from "@/lib/content";
import { trackPageView } from "@/lib/analytics";
import { ensureHomeSeoShell, removeHomeSeoShell } from "@/lib/seoShell";

function AnalyticsTracker() {
  const location = useLocation();
  const lastFired = useRef(null);
  useEffect(() => {
    // guard against StrictMode double-invocation; fires once per unique route
    const path = location.pathname + location.search;
    if (lastFired.current === path) return;
    lastFired.current = path;
    trackPageView(path);
  }, [location.pathname, location.search]);
  return null;
}

function SeoShellManager() {
  const { pathname } = useLocation();
  useLayoutEffect(() => {
    if (pathname === "/") ensureHomeSeoShell();
    else removeHomeSeoShell();
  }, [pathname]);
  return null;
}

function ScrollManager() {
  const location = useLocation();
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const t = setTimeout(() => scrollToId(id), 150);
      return () => clearTimeout(t);
    }
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash]);
  return null;
}

function ThemeEffect() {
  const design = useContent("design");
  useEffect(() => {
    const root = document.documentElement;
    const c = design.colors || {};
    if (c.spring) root.style.setProperty("--brand-spring", c.spring);
    if (c.bookgreen) root.style.setProperty("--brand-bookgreen", c.bookgreen);
    if (c.mantis) root.style.setProperty("--brand-mantis", c.mantis);
    document.body.classList.remove("preset-classic", "preset-modern", "btn-soft", "btn-sharp");
    if (design.fontPreset && design.fontPreset !== "editorial") document.body.classList.add(`preset-${design.fontPreset}`);
    if (design.buttonStyle && design.buttonStyle !== "pill") document.body.classList.add(`btn-${design.buttonStyle}`);
  }, [design]);
  return null;
}

function App() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    window.__lenis = lenis;
    let raf;
    const loop = (time) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);

  return (
    <div className="App min-h-screen flex flex-col">
      <HelmetProvider>
        <BrowserRouter>
          <SeoShellManager />
          <ScrollManager />
          <AnalyticsTracker />
          <ThemeEffect />
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/staff" element={<Staff />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/faq" element={<Faq />} />
              <Route path="/blogs" element={<Blog />} />
              <Route path="/blogs/:slug" element={<BlogPost />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/sitemap" element={<Sitemap />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/portal" element={<Portal />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
          <div className="grain-overlay" aria-hidden="true" />
        </BrowserRouter>
      </HelmetProvider>
    </div>
  );
}

export default App;
