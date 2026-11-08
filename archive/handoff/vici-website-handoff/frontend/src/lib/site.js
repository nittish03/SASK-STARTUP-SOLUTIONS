export const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export const SERVICES = [
  {
    slug: "bookkeeping",
    name: "Part 1 - Bookkeeping",
    detailTitle: "Part 1 - Bookkeeping Services",
    badge: "Part of Basic Service Package",
    duration: "30 mins",
    button: "Book Now",
    blurb: "Let us take care of the boring work and let you focus on the business.",
    img: "https://images.pexels.com/photos/4476378/pexels-photo-4476378.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "Bookkeeper recording figures on paper while using a calculator",
    paragraphs: [
      "Accurate bookkeeping is the foundation of every healthy startup. Our Saskatoon bookkeeping service covers monthly transaction recording, bank and credit card reconciliation, expense categorization, and financial statement preparation — all kept audit-ready and fully compliant with CRA bookkeeping standards. Whether you're currently tracking expenses in a spreadsheet, a shoebox of receipts, or an outdated system that no longer fits your growing business, we'll build a bookkeeping solution that scales with you.",
      "If you're a Saskatchewan startup founder who's falling behind on reconciling transactions, unsure whether your books are CRA-ready, or simply don't have time to manage finances yourself, this service is built for you. Our small business bookkeeping services give Saskatchewan startups an accurate, up-to-date financial picture every month, so you always know where your business stands.",
    ],
    faqs: [
      { q: "How often will my books be updated?", a: "Monthly, or on a schedule that matches your business activity and filing needs." },
      { q: "Do I need to switch accounting software?", a: "No, we can typically work within your existing system or recommend one that fits your business." },
    ],
  },
  {
    slug: "t2-corporate-filing",
    name: "Part 2 - T2 Corporate Filing Administration",
    detailTitle: "Part 2 - T2 Corporate Filing Administration",
    badge: "Part of the Basic Service Package",
    duration: "30 mins",
    button: "Book Now",
    blurb: "Provide us with your data and we will take care of the administration part so you don't have to worry about missing a deadline!",
    img: "https://images.pexels.com/photos/7821934/pexels-photo-7821934.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "A person completing a corporate form with a pen",
    paragraphs: [
      "Corporate tax filing doesn't have to be stressful. Our T2 corporate tax filing administration service manages the entire process for your Saskatchewan corporation — from gathering financial documents and preparing your corporate tax return, to coordinating submission to the Canada Revenue Agency (CRA) on your behalf. We help startups and growing companies stay ahead of T2 filing deadlines, avoid late-filing penalties, and maintain clean, compliant corporate tax records year after year.",
      "If you've recently incorporated in Saskatchewan and have never filed a T2 return, or you're unsure what CRA requires of your corporation each year, this service removes the guesswork. For founders who've been searching for reliable T2 filing help in Saskatoon, this is where startups get it handled correctly and on time.",
    ],
    faqs: [
      { q: "When is my T2 return due?", a: "Generally six months after your corporation's fiscal year-end; we'll confirm your exact deadline during your intro appointment." },
      { q: "What documents do I need to get started?", a: "Your incorporation documents, prior-year financials (if any), and current bookkeeping records." },
    ],
  },
  {
    slug: "isc-registry",
    name: "Part 3 - ISC Registry Administration",
    detailTitle: "Part 3 - ISC Registry Administration",
    badge: "Part of the Basic Service Package",
    duration: "30 mins",
    button: "Book Now",
    blurb: "There so many things to keep track of, let us take of this too, we'll help you with the administration of filing your new corporation with Information Services Corporation (ISC).",
    img: "https://images.pexels.com/photos/11482790/pexels-photo-11482790.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "Facade of an official registry building with stone columns",
    paragraphs: [
      "Staying compliant with Saskatchewan's Information Services Corporation (ISC) Registry is easy to overlook — and costly to miss. Our ISC Registry administration service manages your corporate registry filings from incorporation through ongoing annual reports, so your business stays in good standing with the Saskatchewan corporate registry at all times. We track your filing deadlines, prepare the required registry documents, and handle submissions so you avoid missed deadlines, late fees, and compliance penalties.",
      "If you're a Saskatchewan corporation unsure when your annual return is due, or you've received a registry compliance notice and don't know how to respond, this service keeps your corporate filings current without the administrative burden.",
    ],
    faqs: [
      { q: "What is the ISC Registry?", a: "Saskatchewan's Information Services Corporation maintains the official corporate registry; every active corporation must file annual returns to stay in good standing." },
      { q: "What happens if I miss a filing?", a: "Your corporation can face penalties or be struck from the registry; we help you catch up and stay on schedule going forward." },
    ],
  },
  {
    slug: "basic-package",
    name: "All in one Basic Service Package",
    detailTitle: "All in One Basic Service Package",
    badge: "Best Value",
    duration: "1 hr 30 mins",
    button: "Book Now",
    blurb: "The power to focus on your business is crucial for success. Let us take a load off and let that happen. This package includes: Bookkeeping, T2 Corporate Filing Administration and ISC Registry Administration",
    img: "https://images.pexels.com/photos/7718714/pexels-photo-7718714.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "An organized desk flat lay with notebooks, laptop and office tools",
    paragraphs: [
      "Running a startup means wearing every hat — founder, operator, and accountant all at once. Our All in One Basic Service Package takes the full compliance workload off your plate in a single engagement, combining Bookkeeping, T2 Corporate Filing Administration, and Saskatchewan ISC Registry Administration into one streamlined service. It's the most efficient way for Saskatoon startups and growing Saskatchewan businesses to stay financially organized, tax-compliant, and registry-current — without juggling multiple providers or deadlines.",
      "This package is built for founders who want one point of contact handling all their compliance needs, rather than coordinating separately with a bookkeeper, tax preparer, and registry administrator.",
    ],
    faqs: [
      { q: "Can I upgrade from a single service to the full package later?", a: "Yes, we can roll your existing service into the Basic Package at any time." },
    ],
  },
  {
    slug: "introduction",
    name: "Introduction and Intake Appointment - No Obligations",
    detailTitle: "Introduction and Intake Appointment - No Obligations",
    badge: null,
    duration: "30 mins (Free)",
    button: "Book Your Free Introduction",
    blurb: "Every engagement starts here. We'll review your situation and show you exactly how we can help - no obligation.",
    img: "https://images.pexels.com/photos/3874033/pexels-photo-3874033.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "Two people shaking hands across a cafe table over coffee and a notebook",
    paragraphs: [
      "Every client relationship starts with a conversation, not a contract. Book a free, no-obligation 30-minute introduction appointment with our Saskatoon team to walk through your current bookkeeping, corporate tax, and registry situation. We'll review where things stand, identify any gaps or upcoming deadlines, and show you exactly how our bookkeeping, T2 filing, and ISC Registry administration services can support your startup's growth — with zero pressure and zero commitment.",
    ],
    faqs: [],
    parts: [
      {
        title: "PART 1: BOOKKEEPING",
        text: "Your financial records are the foundation of your business. In this introduction, we'll assess your current bookkeeping setup, identify gaps, and show you how we keep your records accurate, audit-ready, and compliant with CRA standards. Whether you're tracking expenses in a shoebox or need to overhaul your system, we'll build a bookkeeping solution that scales with your growth. Book now to discuss your specific needs—no obligation.",
      },
      {
        title: "PART 2: T2 CORPORATE FILING ADMINISTRATION",
        text: "Corporate tax filing is complex, but it doesn't have to be stressful. We handle the entire T2 filing process—from gathering documents to submitting to CRA on your behalf. In this introduction, we'll review your current tax situation, explain what's required, and walk you through our filing timeline so there are no surprises. Let us manage the compliance so you can focus on your business.",
      },
      {
        title: "PART 3: ISC REGISTRY ADMINISTRATION",
        text: "Corporate registry filings keep your Saskatchewan business compliant and on the government's radar. From incorporation documents to annual reports, we handle ISC Registry requirements so you stay current—no missed deadlines, no penalties. In this introduction, we'll review your registry status and show you how we simplify administration for growing companies. Book to discuss your needs.",
      },
    ],
  },
];

export const DEFAULT_HERO_SLIDES = [
  { img: "/media/poster-meeting.jpg", title: "A real conversation first", sub: "Let's review your business and know where you stand.", alt: "Two people in a first consultation meeting" },
  { img: "/media/poster-calculator.jpg", title: "Every filing on time", sub: "Without fear of deadlines.", alt: "Close-up of hands using a calculator over paperwork" },
  { img: "/media/poster-bookkeeping.jpg", title: "Up-to-date bookkeeping", sub: "For an accurate pulse of your business.", alt: "Accountant writing in a ledger at a desk" },
];

export const DEFAULT_PAGE_IMAGES = {
  homeGallerySkyline: "https://images.unsplash.com/photo-1758310999518-4126c4a1bf5f?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
  homeGalleryBridge: "https://images.unsplash.com/photo-1758565940999-68bb93af9c29?crop=entropy&cs=srgb&fm=jpg&q=85&w=900",
  homeGalleryRiverfront: "https://images.unsplash.com/photo-1662996514099-0e62004d311b?crop=entropy&cs=srgb&fm=jpg&q=85&w=900",
  homePatrickPhoto: "/media/patrick-vachon.jpg",
  carouselPhoto1: "https://images.unsplash.com/photo-1758310999518-4126c4a1bf5f?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
  carouselPhoto2: "https://images.unsplash.com/photo-1758565940999-68bb93af9c29?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
  carouselPhoto3: "https://images.unsplash.com/photo-1662996514099-0e62004d311b?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
  bookingBand: "https://images.unsplash.com/photo-1758565940999-68bb93af9c29?crop=entropy&cs=srgb&fm=jpg&q=85&w=2000",
  bookingIntake: "https://images.unsplash.com/photo-1758310999515-645097b709db?crop=entropy&cs=srgb&fm=jpg&q=85&w=900",
};

export const PAGE_IMAGE_FIELDS = [
  { key: "homeGallerySkyline", label: "Home — Gallery: skyline (large)" },
  { key: "homeGalleryBridge", label: "Home — Gallery: bridge" },
  { key: "homeGalleryRiverfront", label: "Home — Gallery: riverfront" },
  { key: "homePatrickPhoto", label: "Home — Meet the Founder photo" },
  { key: "carouselPhoto1", label: "Home — Carousel photo 1 (downtown)" },
  { key: "carouselPhoto2", label: "Home — Carousel photo 2 (bridge)" },
  { key: "carouselPhoto3", label: "Home — Carousel photo 3 (riverfront)" },
  { key: "bookingBand", label: "Booking — wide banner image" },
  { key: "bookingIntake", label: "Booking — intake section image" },
];

export const TIME_SLOTS = (() => {
  const slots = [];
  for (let hour = 8; hour < 20; hour++) {
    for (const min of [0, 30]) {
      const h12 = ((hour + 11) % 12) + 1;
      const suffix = hour < 12 ? "a.m." : "p.m.";
      const label = `${h12}:${min === 0 ? "00" : "30"} ${suffix}`;
      const value = `${String(hour).padStart(2, "0")}:${min === 0 ? "00" : "30"}`;
      slots.push({ label, value });
    }
  }
  return slots;
})();

export const DEFAULT_HOME_SECTIONS = [
  { id: "featured", label: "Featured Services", visible: true },
  { id: "carousel", label: "Video & Photo Carousel", visible: true },
  { id: "gallery", label: "Saskatoon Gallery", visible: true },
  { id: "patrick", label: "Meet The Founder", visible: true },
  { id: "story", label: "Brand Story", visible: true },
];

export function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  if (window.__lenis) {
    window.__lenis.scrollTo(el, { offset: -90 });
  } else {
    el.scrollIntoView({ behavior: "smooth" });
  }
}
