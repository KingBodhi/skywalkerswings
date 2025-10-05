import { certBadgeMap } from '@/lib/certBadgeMap';

interface TrustBadgesProps {
  certifications?: string[];
  className?: string;
}

export default function TrustBadges({ certifications = ['ansi_z359_1', 'osha', 'csa', 'made_in_usa'], className = '' }: TrustBadgesProps) {
  if (!certifications || certifications.length === 0) {
    return null;
  }

  return (
    <div className={`trust-badges ${className}`}>
      <div className="text-xs text-neutral-600 dark:text-neutral-400 mb-2">Safety Certifications:</div>
      <div className="flex gap-3 items-center flex-wrap">
        {certifications.map(id => {
          const badge = certBadgeMap[id];
          if (!badge) return null;
          
          return (
            <div key={id} className="cert-badge flex items-center gap-2" title={badge.label}>
              <img
                src={`/logos/${badge.svg}`}
                alt={badge.label}
                className="h-8 w-8 opacity-90"
                loading="lazy"
                width="32"
                height="32"
              />
              <span className="text-xs text-neutral-700 dark:text-neutral-300 hidden sm:inline">
                {badge.shortLabel}
              </span>
            </div>
          );
        })}
      </div>
      <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-2">
        ✓ Trusted by 5,000+ worksites • Meets ANSI Z359.1 & OSHA standards
      </p>
    </div>
  );
}
