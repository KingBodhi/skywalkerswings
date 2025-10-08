interface TrustBadgesProps {
  className?: string;
}

const badges = [
  {
    icon: '🪢',
    heading: '600 lb Rating',
  },
  {
    icon: '🎁',
    heading: 'Discreet Delivery',
  },
  {
    icon: '🫧',
    heading: 'Body-Safe Textiles',
  },
  {
    icon: '🧘',
    heading: 'Inclusive Fit',
  },
];

export default function TrustBadges({ className = '' }: TrustBadgesProps) {
  return (
    <section
      className={`relative overflow-hidden bg-neutral-50 py-6 ${className}`.trim()}
    >
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-3 sm:gap-5">
          {badges.map((badge) => (
            <div
              key={badge.heading}
              className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-white px-3 py-1.5 text-xs font-semibold text-primary-700 shadow-soft"
            >
              <span className="text-lg">{badge.icon}</span>
              <span>{badge.heading}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
