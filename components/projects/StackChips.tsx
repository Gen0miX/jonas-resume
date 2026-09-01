type Props = { items: string[]; className?: string };

export default function StackChips({ items, className }: Props) {
  return (
    <div className={`flex flex-wrap gap-2 ${className ?? ""}`}>
      {items.map((item) => (
        <span
          key={item}
          className="inline-block rounded-full border border-base-content/20 px-3 py-1 font-sans text-sm font-bold uppercase tracking-wider text-base-content/80"
        >
          {item}
        </span>
      ))}
    </div>
  );
}
