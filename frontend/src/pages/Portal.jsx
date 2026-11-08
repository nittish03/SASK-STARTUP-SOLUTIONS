import { Reveal, MaskedLine } from "@/components/Reveal";
import BookingFlow from "@/components/BookingFlow";
import Seo from "@/components/Seo";

export default function Portal() {
  return (
    <div data-testid="portal-page">
      <Seo title="Booking Portal | Vici SaskStartupSolutions" description="Book an appointment with Vici SaskStartupSolutions." path="/portal" noindex />
      <section className="bg-bookgreen" aria-labelledby="portal-heading">
        <div className="mx-auto max-w-[900px] px-4 py-16 sm:px-6 sm:py-20">
          <h1
            id="portal-heading"
            data-testid="portal-heading"
            className="text-center font-serif text-4xl font-bold uppercase leading-[1.08] tracking-tight text-white sm:text-5xl"
          >
            <MaskedLine delay={0.1}>Booking Portal</MaskedLine>
          </h1>
          <Reveal delay={0.3}>
            <p className="mx-auto mt-6 max-w-2xl text-center font-serif text-base leading-relaxed text-white sm:text-lg">
              Book your appointment below — choose a service, pick a date and time, and we'll confirm shortly.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-bookgreen" aria-label="Book an appointment">
        <div className="mx-auto max-w-[900px] px-4 pb-20 sm:px-6">
          <BookingFlow idPrefix="portal" />
        </div>
      </section>
    </div>
  );
}
