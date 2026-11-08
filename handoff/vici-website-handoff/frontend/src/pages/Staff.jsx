import { useNavigate } from "react-router-dom";
import { Reveal, MaskedLine } from "@/components/Reveal";
import Marquee from "@/components/Marquee";
import { useContent } from "@/lib/content";

export default function Staff() {
  const navigate = useNavigate();
  const sc = useContent("staff");
  const name = sc.staffName || "Patrick Vachon";
  const photo = sc.staffPhoto || "/media/patrick-vachon.jpg";

  return (
    <div data-testid="staff-page">
      <section className="bg-bookgreen" aria-labelledby="staff-heading">
        <div className="mx-auto max-w-[900px] px-4 py-20 sm:px-6 sm:py-28">
          <h1
            id="staff-heading"
            data-testid="staff-heading"
            className="text-center font-serif text-4xl font-bold uppercase leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            <MaskedLine delay={0.1}>Meet The Team</MaskedLine>
          </h1>
          <Reveal delay={0.3}>
            <p className="mx-auto mt-8 max-w-2xl text-center font-serif text-base leading-relaxed text-white sm:text-lg">
              The people behind the compliance work — so you never have to wonder who's looking after your books, your filings, and your registry.
            </p>
          </Reveal>
        </div>
      </section>

      <Marquee testId="staff-marquee" items={["Founder-led", "Saskatoon, Saskatchewan", "Bookkeeping", "T2 Filing", "ISC Registry"]} />

      <section className="bg-praxeti" aria-label="Team members">
        <div className="mx-auto max-w-[900px] px-4 py-16 sm:px-6 sm:py-24">
          <Reveal>
            <article
              data-testid="staff-card-patrick-vachon"
              className="overflow-hidden rounded-3xl border-2 border-black/15 bg-white shadow-xl md:grid md:grid-cols-5"
            >
              <div className="relative md:col-span-2">
                <img
                  src={photo}
                  alt={`Portrait of ${name}, founder of Vici SaskStartupSolutions`}
                  className="h-72 w-full object-cover object-top md:h-full"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(0,0,0,0.55)_100%)]" aria-hidden="true" />
              </div>
              <div className="p-8 sm:p-12 md:col-span-3">
                <p className="font-sans text-xs font-semibold uppercase tracking-[0.3em] text-black/60">{sc.staffRole || "Founder"}</p>
                <h2 className="mt-2 font-serif text-3xl font-bold uppercase tracking-tight text-black sm:text-4xl">{name}</h2>
                <p className="mt-1 font-sans text-sm font-semibold uppercase tracking-widest text-black/60">{sc.staffTitle || "Founder & Lead Administrator"}</p>
                <p data-testid="staff-bio-patrick" className="mt-6 font-serif text-base leading-relaxed text-black/85 sm:text-lg">
                  {sc.staffBio || "Good business administration isn't just about managing numbers—it’s about delivering exceptional customer service and giving owners peace of mind. As the founder and lead administrator, Patrick draws directly on his real-world experience building and operating local businesses to help clients streamline their day-to-day operations. From full-service bookkeeping and ISC corporate maintenance to T2 tax filings, Patrick focuses on turning chaotic back-office tasks into clean, reliable systems that provide total clarity on business performance. A U of S graduate who grew up in St. Louis and has lived in Saskatoon for the past nine years, Patrick is dedicated to supporting local entrepreneurs across Saskatchewan. In his spare time, he is an avid reader and long-time Lord of the Rings enthusiast."}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <button
                    type="button"
                    data-testid="staff-book-btn"
                    onClick={() => navigate("/booking")}
                    className="rounded-full bg-mantis px-6 py-3 font-sans text-sm font-semibold uppercase tracking-wide text-black transition-transform duration-300 hover:scale-105"
                  >
                    Book With Patrick
                  </button>
                  <button
                    type="button"
                    data-testid="staff-contact-btn"
                    onClick={() => navigate("/contact")}
                    className="rounded-full border-2 border-black bg-transparent px-6 py-3 font-sans text-sm font-semibold uppercase tracking-wide text-black transition-colors duration-300 hover:bg-black hover:text-white"
                  >
                    Contact Us
                  </button>
                </div>
              </div>
            </article>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
