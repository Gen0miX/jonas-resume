import React, { ReactNode } from "react";
import Link from "next/link";

interface Props {
  children?: ReactNode;
  href: string;
}

function NavItem({ children, href, ...props }: Props) {
  return (
    <li className="antialiased font-normal font-heading text-9xl">
      <Link href={href}>{children}</Link>
    </li>
  );
}

export default function Hero() {
  return (
    <section className="flex flex-row justify-center h-screen">
      <div className="flex flex-col justify-end max-w-md mb-60 ml-40 mr-20">
        <h1 className="font-sans text-3xl">
          Hi, I'm <span className="font-bold">Jonas Pilloud</span>
        </h1>
        <p className="text-justify font-sans text-lg">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur
          corrupti vitae quasi debitis voluptate blanditiis earum reprehenderit
          nemo nam. Eum?
        </p>
      </div>
      <div className="flex justify-center m-10">
        <ul className="flex flex-col h-full justify-evenly">
          <NavItem href="#about-me">ABOUT ME</NavItem>
          <NavItem href="#career">CAREER</NavItem>
          <NavItem href="#skills">SKILLS</NavItem>
          <NavItem href="#">PROJECTS</NavItem>
        </ul>
      </div>
    </section>
  );
}
