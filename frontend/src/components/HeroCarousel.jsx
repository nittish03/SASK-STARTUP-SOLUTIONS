import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DEFAULT_HERO_SLIDES, imageForDelivery } from "@/lib/site";

export default function HeroCarousel({ slides }) {
  const raw = slides && slides.filter((s) => s && s.img).length ? slides.filter((s) => s && s.img) : DEFAULT_HERO_SLIDES;
  const ITEMS = raw.map((s) => ({
    ...s,
    img: imageForDelivery(s.img),
  }));
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (paused || reduced) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % ITEMS.length), 5000);
    return () => clearInterval(t);
  }, [paused, reduced, ITEMS.length]);

  useEffect(() => {
    if (index >= ITEMS.length) setIndex(0);
  }, [ITEMS.length, index]);

  const go = (dir) => setIndex((i) => (i + dir + ITEMS.length) % ITEMS.length);
  const slide = ITEMS[index];
  const isFirstSlide = index === 0;
  const slideSize = typeof slide.img === "string" && slide.img.startsWith("/media/poster-")
    ? { width: 960, height: 540 }
    : null;

  return (
    <div
      data-testid="hero-carousel"
      role="region"
      aria-roledescription="carousel"
      aria-label="How we help your business"
      className="relative aspect-[4/3] overflow-hidden rounded-3xl border-2 border-white/25 shadow-2xl"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
    >
      <AnimatePresence mode="wait">
        {isFirstSlide ? (
          <img
            key={`${index}-${slide.img}`}
            src={slide.img}
            alt={slide.alt || slide.title}
            className="absolute inset-0 h-full w-full object-cover"
            fetchPriority="high"
            decoding="async"
            width={slideSize?.width || 960}
            height={slideSize?.height || 540}
          />
        ) : (
          <motion.img
            key={`${index}-${slide.img}`}
            src={slide.img}
            alt={slide.alt || slide.title}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
            decoding="async"
            width={slideSize?.width || 960}
            height={slideSize?.height || 540}
          />
        )}
      </AnimatePresence>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(0,0,0,0.75)_100%)]" aria-hidden="true" />

      <div aria-live="polite" className="absolute bottom-0 left-0 max-w-[80%] p-6 sm:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.45 }}
          >
            <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-spring" aria-hidden="true">
              {String(index + 1).padStart(2, "0")} / {String(ITEMS.length).padStart(2, "0")}
            </p>
            <p data-testid="hero-carousel-slide-title" className="mt-1 font-sans text-xl font-bold text-white sm:text-2xl">
              {slide.title}
            </p>
            <p className="mt-1 font-sans text-sm text-white/85">{slide.sub}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <button
        type="button"
        data-testid="hero-carousel-prev-btn"
        aria-label="Previous image"
        onClick={() => go(-1)}
        className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2.5 text-white transition-colors duration-200 hover:bg-black"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        type="button"
        data-testid="hero-carousel-next-btn"
        aria-label="Next image"
        onClick={() => go(1)}
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2.5 text-white transition-colors duration-200 hover:bg-black"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <div className="absolute bottom-5 right-6 flex gap-2" aria-hidden="true">
        {ITEMS.map((_, i) => (
          <span
            key={i}
            className={`h-1.5 rounded-full transition-all duration-300 ${i === index ? "w-6 bg-spring" : "w-1.5 bg-white/50"}`}
          />
        ))}
      </div>
    </div>
  );
}
