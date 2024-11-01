import clsx from "clsx";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

export default function SectionTitle({ children, className }: Props) {
  return (
    <h1
      className={clsx(
        "font-heading text-right text-5xl mb-5 ml-10 sm:text-6xl sm:text-left lg:text-8xl ",
        className
      )}
    >
      {children}
    </h1>
  );
}
