// components/projects/PhoneFrame.tsx
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  compact?: boolean;
  aspectClassName?: string;
} & Omit<ComponentPropsWithoutRef<"div">, "className" | "children">;

export default function PhoneFrame({
  children,
  className = "mx-auto w-full max-w-[220px]",
  compact = false,
  aspectClassName = "aspect-[9/17]",
  ...rest
}: Props) {
  return (
    <div
      className={`flex ${aspectClassName} flex-col overflow-hidden rounded-[36px] border-2 border-base-content bg-base-200 ${
        compact ? "gap-1.5 p-2" : "gap-2 p-3"
      } ${className}`}
      {...rest}
    >
      <span
        aria-hidden="true"
        className={`mx-auto flex-none rounded-full bg-base-content/25 ${
          compact ? "h-1.5 w-16" : "h-2 w-24"
        }`}
      />
      <div className="relative flex-1 overflow-hidden rounded-[26px]">
        {children}
      </div>
    </div>
  );
}
