export default function Marquee({ items, className = "", testId = "marquee" }) {
  const row = [...items, ...items];
  return (
    <div
      data-testid={testId}
      aria-hidden="true"
      className={`overflow-hidden border-y-2 border-midnight/20 bg-spring py-3 ${className}`}
    >
      <div className="animate-marquee flex w-max whitespace-nowrap">
        {[0, 1].map((half) => (
          <div key={half} className="flex items-center">
            {row.map((item, i) => (
              <span
                key={`${half}-${i}`}
                className="mx-6 font-serif text-lg italic tracking-wide text-midnight sm:text-xl"
              >
                {item}
                <span className="ml-12 inline-block h-2 w-2 rounded-full bg-midnight align-middle" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
