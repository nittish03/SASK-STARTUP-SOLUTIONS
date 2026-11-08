import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DEFAULT_PAGE_IMAGES } from "@/lib/site";
import { useContent } from "@/lib/content";

const SLIDES = [
  {
    src: "/media/poster-bookkeeping.jpg",
    alt: "Accountant writing in a ledger at a desk",
    caption: "Bookkeeping, handled for you",
    width: 1280,
    height: 720,
  },
  {
    imageKey: "carouselPhoto1",
    alt: "Downtown Saskatoon skyline",
    caption: "Downtown Saskatoon",
    width: 800,
    height: 533,
  },
  {
    src: "/media/poster-meeting.jpg",
    alt: "Two people in a first consultation meeting",
    caption: "Introduction appointments that start with listening",
    width: 1280,
    height: 720,
  },
  {
    imageKey: "carouselPhoto2",
    alt: "A Saskatoon bridge over the South Saskatchewan River",
    caption: "The South Saskatchewan River",
    width: 800,
    height: 533,
  },
  {
    src: "/media/poster-calculator.jpg",
    alt: "Close-up of hands using a calculator over paperwork",
    caption: "T2 filing, on time",
    width: 1280,
    height: 720,
  },
  {
    imageKey: "carouselPhoto3",
    alt: "The Saskatoon riverfront",
    caption: "The Saskatoon riverfront",
    width: 800,
    height: 533,
  },
];

export default function MediaCarousel() {
  const design = useContent("design");
  const images = { ...DEFAULT_PAGE_IMAGES, ...(design.images || {}) };
  const slides = SLIDES.map((s) => (s.imageKey ? { ...s, src: images[s.imageKey] } : s));

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [selected, setSelected] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => emblaApi.off("select", onSelect);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi || paused || reduced) return;
    const t = setInterval(() => emblaApi.scrollNext(), 6000);
    return () => clearInterval(t);
  }, [emblaApi, paused, reduced]);

  const prev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const next = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  return (
    <div
      data-testid="media-carousel"
      role="region"
      aria-roledescription="carousel"
      aria-label="Photos of our work and city"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
    >
      <div data-testid="media-carousel-viewport" className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide, i) => (
            <div
              key={i}
              data-testid={`carousel-slide-${i + 1}`}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${slides.length}: ${slide.caption}`}
              className="min-w-0 flex-[0_0_92%] pr-4 sm:flex-[0_0_70%] sm:pr-6 lg:flex-[0_0_55%]"
            >
              <div className="relative aspect-video overflow-hidden rounded-3xl border-2 border-black/15 shadow-lg">
                <img
                  data-testid={`carousel-image-${i + 1}`}
                  src={slide.src}
                  alt={slide.alt}
                  width={slide.width || 800}
                  height={slide.height || 450}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(0,0,0,0.7)_100%)]" aria-hidden="true" />
                <div className="absolute bottom-0 left-0 flex w-full items-center gap-2 p-5">
                  <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-white sm:text-sm">
                    {slide.caption}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        <div className="flex gap-2">
          <button
            type="button"
            data-testid="carousel-prev-btn"
            onClick={prev}
            aria-label="Previous slide"
            className="rounded-full border-2 border-black bg-transparent p-3 text-black transition-colors duration-300 hover:bg-black hover:text-white"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            data-testid="carousel-next-btn"
            onClick={next}
            aria-label="Next slide"
            className="rounded-full border-2 border-black bg-transparent p-3 text-black transition-colors duration-300 hover:bg-black hover:text-white"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
        <div className="flex items-center gap-2" role="tablist" aria-label="Choose slide">
          {slides.map((slide, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={selected === i}
              aria-label={`Go to slide ${i + 1}: ${slide.caption}`}
              data-testid={`carousel-dot-${i + 1}`}
              onClick={() => emblaApi && emblaApi.scrollTo(i)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                selected === i ? "w-8 bg-black" : "w-2.5 bg-black/25 hover:bg-black/50"
              }`}
            />
          ))}
        </div>
        <p data-testid="carousel-counter" className="font-sans text-xs font-semibold uppercase tracking-widest text-black/60">
          {selected + 1} / {slides.length}
        </p>
      </div>
    </div>
  );
}
