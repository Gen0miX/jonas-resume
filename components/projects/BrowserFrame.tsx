import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Props = {
  host: string;
  children: ReactNode;
  aspectClassName?: string;
  compact?: boolean;
  className?: string;
} & Omit<ComponentPropsWithoutRef<"div">, "className" | "children">;

export default function BrowserFrame({
  host,
  children,
  aspectClassName = "aspect-[16/10]",
  compact = false,
  className = "rounded-[28px] border-2 border-base-content",
  ...rest
}: Props) {
  return (
    <div className={`overflow-hidden ${className}`} {...rest}>
      <div
        aria-hidden="true"
        className={`flex items-center gap-3 border-b-2 border-base-content bg-base-200 ${
          compact ? "px-3 py-2" : "px-5 py-3.5"
        }`}
      >
        <div className="flex flex-none gap-1.5">
          <span
            className={`rounded-full bg-base-content/25 ${
              compact ? "h-2 w-2" : "h-3 w-3"
            }`}
          />
          <span
            className={`rounded-full bg-base-content/25 ${
              compact ? "h-2 w-2" : "h-3 w-3"
            }`}
          />
          <span
            className={`rounded-full bg-base-content/25 ${
              compact ? "h-2 w-2" : "h-3 w-3"
            }`}
          />
        </div>
        <div
          className={`flex-1 truncate rounded-full border border-base-content/20 bg-base-100 text-center font-sans text-base-content/60 theme-nord:text-base-content/75 ${
            compact ? "px-2 py-0.5 text-[10px]" : "px-4 py-1 text-xs"
          }`}
        >
          {host}
        </div>
      </div>
      <div className={`relative w-full ${aspectClassName}`}>{children}</div>
    </div>
  );
}
