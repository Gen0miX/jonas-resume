// components/sections/shared/MetaRow.tsx
import clsx from "clsx";

type Props = {
  number?: string;
  label?: string;
  className?: string;
  lineClassName?: string;
};

export default function MetaRow({ number, label, className, lineClassName }: Props) {
  return (
    <div className={clsx("flex items-center gap-4", className)}>
      {number && (
        <span className="font-heading text-xl font-bold tracking-wider text-primary">
          {number}
        </span>
      )}
      <span className={clsx("h-px max-w-[80px] flex-1 bg-base-content/[.18]", lineClassName)} />
      {label && (
        <span className="font-sans text-sm font-bold uppercase tracking-widest text-base-content/55 theme-nord:text-base-content/75">
          {label}
        </span>
      )}
    </div>
  );
}
