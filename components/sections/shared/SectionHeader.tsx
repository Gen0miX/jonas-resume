// components/sections/shared/SectionHeader.tsx
import { ReactNode } from "react";
import SectionTitle from "@/components/SectionTitle";

type Props = { title: string; right: ReactNode };

export default function SectionHeader({ title, right }: Props) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-8 px-0 md:px-10">
      <SectionTitle>{title}</SectionTitle>
      {right}
    </div>
  );
}
