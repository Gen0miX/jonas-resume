// components/sections/shared/SubTitle.tsx
import clsx from "clsx";
import { ReactNode } from "react";

type Props = { children: ReactNode; className?: string };

export default function SubTitle({ children, className }: Props) {
  return (
    <h2
      className={clsx(
        "font-sans text-sm font-bold uppercase tracking-[.18em] text-primary",
        className
      )}
    >
      {children}
    </h2>
  );
}
