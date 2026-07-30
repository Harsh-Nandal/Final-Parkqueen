const ITEMS = [
  "Queen Bar & Lounge",
  "Rohtak's Premier Hotel",
  "Best Luxury Resort in Rohtak",
  "Luxury Hotel in Rohtak",
  "Banquet Hall",
  "Conference Hall",
];

export default function MarqueeStrip() {
  const track = [...ITEMS, ...ITEMS];

  return (
    <div className="overflow-hidden border-y border-line-light bg-navy-deep py-4">
      <div className="marquee-track flex w-max gap-10 whitespace-nowrap">
        {track.map((item, i) => (
          <span
            key={i}
            aria-hidden={i >= ITEMS.length}
            className="flex items-center gap-10 font-display text-xs uppercase tracking-[0.28em] text-gold-soft"
          >
            {item}
            <span className="text-gold">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
