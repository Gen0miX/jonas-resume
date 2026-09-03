import { getStackIcon } from "./stackIcons";

type Props = {
  items: string[];
  className?: string;
  showIcons?: boolean;
  layout?: "wrap" | "grid";
};

export default function StackChips({
  items,
  className,
  showIcons,
  layout = "wrap",
}: Props) {
  const layoutClasses =
    layout === "grid" ? "grid grid-cols-1 sm:grid-cols-2 gap-2" : "flex flex-wrap gap-2";

  return (
    <div className={`${layoutClasses} ${className ?? ""}`}>
      {items.map((item) => {
        const Icon = showIcons ? getStackIcon(item) : undefined;
        return (
          <span
            key={item}
            className="inline-flex items-center gap-1.5 rounded-full border border-base-content/20 px-3 py-1 font-sans text-sm font-bold uppercase tracking-wider text-base-content/80"
          >
            {Icon && <Icon size={14} aria-hidden="true" />}
            {item}
          </span>
        );
      })}
    </div>
  );
}
