import { SERVICES, DEFAULT_HERO_SLIDES, DEFAULT_HOME_SECTIONS, DEFAULT_PAGE_IMAGES } from "./site";

export const CONTENT_DEFAULTS = {
  home: {
    heroLine1: "Let Your Business Grow.",
    heroLine2: "We'll Handle",
    heroLine3: "the Paperwork.",
    heroPara1: "Running a startup means juggling a hundred things. Bookkeeping. Tax filing. Corporate registry requirements. We take the paperwork off your plate—so you can focus on what you do best: building your business.",
    heroPara2: "Vici SaskStartupSolution specializes in bookkeeping, T2 corporate tax filing, and Saskatchewan ISC Registry administration for startups and growing companies. We keep your finances accurate, your filings on time, and your business compliant.",
    heroCallout: "Ready to get organized? Book an introduction with us—no obligation. We'll review your situation and show you exactly how we can help.",
    heroBtn: "Book an Introduction",
    featuredHeading: "Featured Services",
    carouselHeading: "The work behind your growth",
    carouselText: "A look at the careful, hands-on work we do every day — and the city we're proud to call home.",
    galleryHeading: "Proudly local, like our clients",
    patrickHeading: "Patrick Vachon",
    patrickText: "Good business administration isn't just about managing numbers — it’s about delivering exceptional customer service and giving owners peace of mind. Drawing on real-world experience building and operating local businesses, Patrick turns chaotic back-office tasks into clean, reliable systems — from full-service bookkeeping and T2 corporate filing to ISC Registry administration — so you always have total clarity on how your business is performing.",
    storyHeading: "Superior service, personalized attention",
    storyText: "Our Purpose | Starting a business comes with important decisions, paperwork, and ongoing responsibilities. At Vici SaskStartupSolutions, our goal is to make the administrative side of business simpler, giving entrepreneurs more time to focus on building their future.\nOur Services | From business registration and corporate registry administration to bookkeeping and corporate tax filing administration support, we help Saskatchewan business owners manage essential business tasks with greater clarity and confidence.\nOur Approach | We believe every business deserves personal attention. We take the time to understand your needs, communicate clearly, and provide practical support tailored to your business journey.\nOur Commitment | Based in Saskatoon, we are proud to support startups, entrepreneurs, and small businesses across Saskatchewan. Whether you are launching a new venture or managing an established business, we are here to help you take the next step.",
    story2Text: "Based in Saskatoon, built for Saskatchewan businesses.",
    story2Btn: "Book Your Free Introduction",
  },
  services: {
    intro: "Bookkeeping, T2 corporate tax filing, and ISC Registry administration — built for startups and growing businesses across Saskatoon, Saskatchewan. Whether you need ongoing bookkeeping services, help with your corporate tax return filing, or support managing your Saskatchewan ISC Registry filings, our team handles the paperwork so you can focus on running your business. Choose a single service below, or save with our all-in-one Basic Service Package — every engagement starts with a free, no-obligation introduction appointment.",
    closingHeading: "Ready to get organized?",
    closingText: "Book your free introduction appointment today and email us your completed intake form. Let Vici SaskStartupSolutions handle your bookkeeping, T2 corporate filing, and ISC Registry administration — so you can focus on growing your Saskatchewan business.",
    items: Object.fromEntries(
      SERVICES.map((s) => [s.slug, { paragraphs: s.paragraphs.join("\n\n"), img: s.img, price: "" }])
    ),
  },
  staff: {
    staffName: "Patrick Vachon",
    staffRole: "Founder",
    staffTitle: "Founder & Lead Administrator",
    staffBio: "Good business administration isn't just about managing numbers—it’s about delivering exceptional customer service and giving owners peace of mind. As the founder and lead administrator, Patrick draws directly on his real-world experience building and operating local businesses to help clients streamline their day-to-day operations. From full-service bookkeeping and ISC corporate maintenance to T2 tax filings, Patrick focuses on turning chaotic back-office tasks into clean, reliable systems that provide total clarity on business performance. A U of S graduate who grew up in St. Louis and has lived in Saskatoon for the past nine years, Patrick is dedicated to supporting local entrepreneurs across Saskatchewan. In his spare time, he is an avid reader and long-time Lord of the Rings enthusiast.",
    staffPhoto: "/media/patrick-vachon.jpg",
  },
  contact: {
    phone: "1 (306) 960-0091",
    email: "Saskstartupsolutions@viciconsulting.ca",
    address1: "Vici SaskStartupSolutions",
    address2: "539 Avenue I N",
    address3: "Saskatoon, Saskatchewan S7L 2G9",
    hoursLabel: "Monday–Sunday",
    hoursTime: "8:00 a.m. – 8:00 p.m.",
    formHeading: "Contact us",
    formIntro: "Reach out to us and let us know if there is anything we can do for you",
  },
  footer: {
    footerBlurb: "Bookkeeping, T2 corporate tax filing administration, and Saskatchewan ISC Registry administration for startups and growing companies.",
  },
};

export const DESIGN_DEFAULTS = {
  colors: { spring: "#FDD401", bookgreen: "#076A21", mantis: "#74C365" },
  fontPreset: "editorial",
  buttonStyle: "pill",
  heroSlides: DEFAULT_HERO_SLIDES,
  homeSections: DEFAULT_HOME_SECTIONS,
  images: DEFAULT_PAGE_IMAGES,
};
