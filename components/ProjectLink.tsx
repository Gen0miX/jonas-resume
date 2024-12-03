import { ReactNode } from "react";
import Link from "next/link";
import CTitle from "./CTitle";

type Props = {
  children: ReactNode;
  path: string;
};

export default function ProjectLink({ children, path }: Props) {
  return (
    <div className="ml-5">
      <Link href={path}>
        <CTitle classname="text-4xl sm:text-lg md:text-2xl lg:text-4xl transition-transform duration-300 ease-in hover:-skew-x-6 hover:scale-105 hover:scale-y-125">
          {children}
        </CTitle>
      </Link>
    </div>
  );
}
