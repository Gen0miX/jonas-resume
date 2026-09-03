// components/projects/StackMarquee.tsx
import { getStackIcon } from "./stackIcons";

type Props = { items: string[]; className?: string };

function Chip({ item }: { item: string }) {
  const Icon = getStackIcon(item);
  return (
    <span className="inline-flex flex-none items-center gap-1.5 rounded-full border border-base-content/20 px-3 py-1 font-sans text-sm font-bold uppercase tracking-wider text-base-content/80">
      {Icon && <Icon size={14} aria-hidden="true" />}
      {item}
    </span>
  );
}

export default function StackMarquee({ items, className }: Props) {
  const duration = `${Math.max(items.length * 2.5, 10)}s`;

  return (
    <div className={className}>
      {/* Static, fully-visible fallback for prefers-reduced-motion. */}
      <div className="hidden flex-wrap gap-2 motion-reduce:flex">
        {items.map((item) => (
          <Chip key={item} item={item} />
        ))}
      </div>
      {/* Animated marquee, suppressed when the user prefers reduced motion. */}
      <div
        className="group relative overflow-hidden motion-reduce:hidden [mask-image:linear-gradient(to_right,transparent,black_24px,black_calc(100%-24px),transparent)]"
      >
        <div
          className="flex w-max animate-marquee items-center gap-3 group-hover:[animation-play-state:paused]"
          style={{ "--marquee-duration": duration } as React.CSSProperties}
        >
          {[...items, ...items].map((item, i) => (
            <Chip key={`${item}-${i}`} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
