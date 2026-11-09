import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import Marquee from "@/components/Marquee";
import ParallaxImage from "@/components/ParallaxImage";
import MediaCarousel from "@/components/MediaCarousel";
import HeroCarousel from "@/components/HeroCarousel";
import { DEFAULT_HOME_SECTIONS, DEFAULT_PAGE_IMAGES, imageForDelivery } from "@/lib/site";
import { useContent } from "@/lib/content";
import Seo from "@/components/Seo";
import { HOME_DESCRIPTION, HOME_TITLE } from "@/lib/seoShell";

const FEATURED = [
  "Part 1 - Bookkeeping",
  "Part 2 - T2 Corporate Filing Administration",
  "Part 3 - ISC Registry Administration",
  "Introduction and Intake Appointment - No Obligations",
  "All in one Basic Service Package",
];

const DEFAULT_STORY_POINTS = [
  "Our Purpose | Starting a business comes with important decisions, paperwork, and ongoing responsibilities. At Vici SaskStartupSolutions, our goal is to make the administrative side of business simpler, giving entrepreneurs more time to focus on building their future.",
  "Our Services | From business registration and corporate registry administration to bookkeeping and corporate tax filing administration support, we help Saskatchewan business owners manage essential business tasks with greater clarity and confidence.",
  "Our Approach | We believe every business deserves personal attention. We take the time to understand your needs, communicate clearly, and provide practical support tailored to your business journey.",
  "Our Commitment | Based in Saskatoon, we are proud to support startups, entrepreneurs, and small businesses across Saskatchewan. Whether you are launching a new venture or managing an established business, we are here to help you take the next step.",
].join("\n");

// CMS format: one point per line, "Title | Text" (title optional)
function parseStoryPoints(text) {
  return (text || "")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l) => {
      const idx = l.indexOf("|");
      return idx === -1
        ? { title: "", body: l }
        : { title: l.slice(0, idx).trim(), body: l.slice(idx + 1).trim() };
    });
}

export default function Home() {
  const c = useContent("home");
  const design = useContent("design");
  const merged = { ...DEFAULT_PAGE_IMAGES, ...(design.images || {}) };
  const imgs = {
    ...merged,
    homeGallerySkyline: imageForDelivery(merged.homeGallerySkyline, 800),
    homeGalleryBridge: imageForDelivery(merged.homeGalleryBridge, 640),
    homeGalleryRiverfront: imageForDelivery(merged.homeGalleryRiverfront, 640),
    homePatrickPhoto: imageForDelivery(merged.homePatrickPhoto),
  };

  const blocks = {
    featured: (
      <section key="featured" className="bg-bookgreen" aria-labelledby="featured-services-heading">
        <div className="mx-auto max-w-[900px] px-4 py-20 sm:px-6 sm:py-28">
          <Reveal>
            <p className="text-center font-sans text-xs font-semibold uppercase tracking-[0.3em] text-white">What we do</p>
            <h2 id="featured-services-heading" data-testid="featured-services-heading"
              className="mt-3 text-center font-serif text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl">
              {c.featuredHeading || "Featured Services"}
            </h2>
          </Reveal>
          <div className="mt-12" role="list">
            {FEATURED.map((name, i) => (
              <Reveal key={name} delay={i * 0.08}>
                <div role="listitem" data-testid={`featured-service-row-${i + 1}`}
                  className="flex flex-col gap-4 border-t border-white/20 py-7 last:border-b sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-baseline gap-4">
                    <span className="font-sans text-xs font-semibold uppercase tracking-widest text-white/80">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-sans text-lg font-semibold text-white sm:text-xl">{name}</h3>
                  </div>
                  <Link to="/booking#intake" data-testid={`featured-service-intake-btn-${i + 1}`}
                    className="self-start rounded-full bg-mantis px-5 py-2.5 font-sans text-sm font-semibold uppercase tracking-wide text-black transition-all duration-300 hover:scale-105 hover:bg-spring sm:self-auto">
                    Submit Intake Form
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    ),
    carousel: (
      <section key="carousel" className="bg-praxeti" aria-labelledby="media-carousel-heading">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <Reveal>
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.3em] text-black/70">In motion</p>
            <h2 id="media-carousel-heading" data-testid="media-carousel-heading"
              className="mt-3 font-serif text-3xl font-bold uppercase tracking-tight text-black sm:text-4xl">
              {c.carouselHeading || "The work behind your growth"}
            </h2>
            <p className="mt-4 max-w-2xl font-serif text-base leading-relaxed text-black/80 sm:text-lg">
              {c.carouselText || "A look at the careful, hands-on work we do every day — and the city we're proud to call home."}
            </p>
          </Reveal>
          <Reveal delay={0.15} className="mt-10">
            <MediaCarousel />
          </Reveal>
        </div>
      </section>
    ),
    gallery: (
      <section key="gallery" className="bg-bookgreen py-20 sm:py-28" aria-labelledby="saskatoon-gallery-heading">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.3em] text-white">Rooted in Saskatoon</p>
            <h2 id="saskatoon-gallery-heading" data-testid="saskatoon-gallery-heading"
              className="mt-3 font-serif text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl">
              {c.galleryHeading || "Proudly local, like our clients"}
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            <Reveal className="md:col-span-2">
              <ParallaxImage
                src={imgs.homeGallerySkyline}
                alt={imgs.homeGallerySkylineAlt || "Saskatoon skyline at dusk"} testId="gallery-image-skyline"
                width={800} height={533}
                className="h-72 rounded-3xl border-2 border-white/20 md:h-[26rem]" />
              <p className="mt-3 font-sans text-xs font-semibold uppercase tracking-widest text-white">Downtown Saskatoon</p>
            </Reveal>
            <div className="grid gap-5">
              <Reveal delay={0.1}>
                <ParallaxImage
                  src={imgs.homeGalleryBridge}
                  alt={imgs.homeGalleryBridgeAlt || "A Saskatoon bridge over the South Saskatchewan River"} testId="gallery-image-bridge"
                  width={800} height={533}
                  className="h-44 rounded-3xl border-2 border-white/20 md:h-[12.25rem]" />
              </Reveal>
              <Reveal delay={0.2}>
                <ParallaxImage
                  src={imgs.homeGalleryRiverfront}
                  alt={imgs.homeGalleryRiverfrontAlt || "The Saskatoon riverfront"} testId="gallery-image-riverfront"
                  width={800} height={533}
                  className="h-44 rounded-3xl border-2 border-white/20 md:h-[12.25rem]" />
              </Reveal>
              <p className="font-sans text-xs font-semibold uppercase tracking-widest text-white">The South Saskatchewan River</p>
            </div>
          </div>
        </div>
      </section>
    ),
    patrick: (
      <section key="patrick" className="bg-praxeti" aria-labelledby="meet-patrick-heading">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <div className="grid items-center gap-12 md:grid-cols-2 lg:gap-16">
            <Reveal className="relative">
              <div className="absolute -bottom-4 -right-4 h-full w-full rounded-3xl border-2 border-spring" aria-hidden="true" />
              <img src={imgs.homePatrickPhoto}
                alt={imgs.homePatrickPhotoAlt || "Patrick Vachon, founder of Vici SaskStartupSolutions, in the Saskatoon office"}
                data-testid="meet-patrick-photo"
                width={800} height={1421}
                className="relative aspect-[4/5] w-full rounded-3xl border-2 border-black/15 object-cover object-top shadow-xl"
                loading="lazy"
                decoding="async" />
            </Reveal>
            <Reveal delay={0.15}>
              <p className="font-sans text-xs font-semibold uppercase tracking-[0.3em] text-black/70">Meet the founder</p>
              <h2 id="meet-patrick-heading" data-testid="meet-patrick-heading"
                className="mt-3 font-serif text-3xl font-bold uppercase tracking-tight text-black sm:text-4xl">
                {c.patrickHeading || "Patrick Vachon"}
              </h2>
              <p data-testid="meet-patrick-text" className="mt-5 font-serif text-base leading-relaxed text-black/85 sm:text-lg">
                {c.patrickText || "Good business administration isn't just about managing numbers — it’s about delivering exceptional customer service and giving owners peace of mind. Drawing on real-world experience building and operating local businesses, Patrick turns chaotic back-office tasks into clean, reliable systems — from full-service bookkeeping and T2 corporate filing to ISC Registry administration — so you always have total clarity on how your business is performing."}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/booking" data-testid="meet-patrick-book-btn"
                  className="group inline-flex items-center gap-2 rounded-full bg-mantis px-6 py-3 font-sans text-sm font-semibold uppercase tracking-wide text-black transition-transform duration-300 hover:scale-105">
                  Book With Patrick
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                </Link>
                <Link to="/staff" data-testid="meet-patrick-staff-btn"
                  className="rounded-full border-2 border-black bg-transparent px-6 py-3 font-sans text-sm font-semibold uppercase tracking-wide text-black transition-colors duration-300 hover:bg-black hover:text-white">
                  Meet The Team
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    ),
    story: (
      <section key="story" className="border-t-2 border-black/10 bg-praxeti" aria-labelledby="brand-story-heading">
        <div className="mx-auto max-w-[900px] px-4 py-20 sm:px-6 sm:py-28">
          <Reveal>
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.3em] text-black/70">Our story</p>
            <h2 id="brand-story-heading" data-testid="brand-story-heading"
              className="mt-3 font-serif text-3xl font-bold uppercase tracking-tight text-black sm:text-4xl">
              {c.storyHeading || "Superior service, personalized attention"}
            </h2>
          </Reveal>
          <div className="mt-12 space-y-10">
            {parseStoryPoints(c.storyText || DEFAULT_STORY_POINTS).map((pt, i) => (
              <Reveal key={`${i}-${pt.title}`} delay={i * 0.1}>
                <div className="flex gap-6 border-t-2 border-black/15 pt-8">
                  <span className="font-serif text-5xl font-light italic text-black/40" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    {pt.title && (
                      <h3 data-testid={`brand-story-point-title-${i + 1}`} className="font-sans text-sm font-semibold uppercase tracking-widest text-black/70">{pt.title}</h3>
                    )}
                    <p data-testid={`brand-story-point-${i + 1}`} className={`${pt.title ? "mt-2 " : ""}max-w-2xl font-serif text-lg leading-relaxed text-black sm:text-xl`}>
                      {pt.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
            <Reveal delay={0.4}>
              <div className="flex items-center gap-6 border-t-2 border-black/15 pt-8">
                <span className="font-serif text-5xl font-light italic text-black/40" aria-hidden="true">{String(parseStoryPoints(c.storyText || DEFAULT_STORY_POINTS).length + 1).padStart(2, "0")}</span>
                <div>
                  <p className="max-w-2xl font-serif text-lg leading-relaxed text-black sm:text-xl">
                    {c.story2Text || "Based in Saskatoon, built for Saskatchewan businesses."}
                  </p>
                  <Link to="/booking" data-testid="brand-story-book-btn"
                    className="mt-4 inline-block rounded-full border-2 border-black bg-transparent px-6 py-2.5 font-sans text-sm font-semibold uppercase tracking-wide text-black transition-colors duration-300 hover:bg-black hover:text-white">
                    {c.story2Btn || "Book Your Free Introduction"}
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    ),
  };

  const sections = (design.homeSections?.length ? design.homeSections : DEFAULT_HOME_SECTIONS)
    .filter((s) => s.visible && blocks[s.id]);

  return (
    <div data-testid="home-page">
      <Seo
        staticShell
        title={HOME_TITLE}
        description={HOME_DESCRIPTION}
        path="/"
      />
      <section className="relative overflow-hidden bg-bookgreen" aria-labelledby="home-hero-heading">
        <div aria-hidden="true" className="pointer-events-none absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-[linear-gradient(135deg,#74C365_0%,#FDD401_100%)] opacity-20 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-48 -left-40 h-[30rem] w-[30rem] rounded-full bg-[linear-gradient(135deg,#FDD401_0%,#74C365_100%)] opacity-20 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h1 id="home-hero-heading" data-testid="home-hero-heading"
                className="text-center font-serif text-4xl font-bold uppercase leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-left lg:text-6xl">
                <span className="block">{c.heroLine1 || "Let Your Business Grow."}</span>
                <span className="block">{c.heroLine2 || "We'll Handle"}</span>
                <span className="block">{c.heroLine3 || "the Paperwork."}</span>
              </h1>
              <p data-testid="home-hero-para-1" className="mt-10 text-left font-serif text-base leading-relaxed text-white sm:text-lg">
                {c.heroPara1 || "Running a startup means juggling a hundred things. Bookkeeping. Tax filing. Corporate registry requirements. We take the paperwork off your plate—so you can focus on what you do best: building your business."}
              </p>
              <p data-testid="home-hero-para-2" className="mt-6 text-left font-serif text-base leading-relaxed text-white sm:text-lg">
                {c.heroPara2 || "Vici SaskStartupSolution specializes in bookkeeping, T2 corporate tax filing, and Saskatchewan ISC Registry administration for startups and growing companies. We keep your finances accurate, your filings on time, and your business compliant."}
              </p>
              <Reveal delay={0.75}>
                <div className="mt-10 border-l-4 border-spring pl-6">
                  <p data-testid="home-hero-callout" className="text-left font-serif text-lg leading-relaxed text-white sm:text-xl">
                    {c.heroCallout || "Ready to get organized? Book an introduction with us—no obligation. We'll review your situation and show you exactly how we can help."}
                  </p>
                  <Link to="/booking" data-testid="home-hero-book-btn"
                    className="group mt-6 inline-flex items-center gap-2 rounded-full bg-mantis px-7 py-3 font-sans text-sm font-semibold uppercase tracking-wide text-black transition-transform duration-300 hover:scale-105">
                    {c.heroBtn || "Book an Introduction"}
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                  </Link>
                </div>
              </Reveal>
            </div>
            <HeroCarousel slides={design.heroSlides} />
          </div>
        </div>
      </section>

      <Marquee
        testId="home-marquee"
        items={[
          "Bookkeeping",
          "T2 Corporate Filing",
          "ISC Registry Administration",
          "Saskatoon, Saskatchewan",
          "Free Introduction Appointment",
        ]}
      />

      {sections.map((s) => blocks[s.id])}
    </div>
  );
}
