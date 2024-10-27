import React, { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import ThemeToggleButton from "./ThemeToggleButton";

interface Props {
  children?: ReactNode;
  href: string;
}

function NavItem({ children, href, ...props }: Props) {
  return (
    <li className="antialiased font-heading font-bold lg:leading-none text-[12vw] hover:-skew-x-6 hover:scale-105 hover:scale-y-125 transition-transform duration-300 ease-in xl:font-normal md:text-[9vw] lg:text-[7.5vw]">
      <Link href={href}>{children}</Link>
    </li>
  );
}

export default function Hero() {
  const [currentDate, setCurrentDate] = useState<{
    day: number;
    month: string;
  } | null>(null);

  useEffect(() => {
    const date = new Date();
    const options = { month: "long" as const };
    const month = new Intl.DateTimeFormat("en-EN", options).format(date);
    const day = date.getDate();
    setCurrentDate({ day, month });
  }, []);

  return (
    <section className="flex flex-col h-svh pt-5 px-5">
      <div className="flex flex-col lg:ml-5">
        {currentDate && (
          <>
            <div className="flex flex-row items-end">
              <h1 className="font-heading text-3xl font-bold translate-y-2">
                {currentDate.day}
              </h1>
              <ThemeToggleButton iconSize={24} className="ml-auto lg:mr-10" />
            </div>

            <div className="flex flex-row items-center">
              <p className="font-heading text-lg font-bold mb-1">
                {currentDate.month}
              </p>
              <div className="divider divider-vertical my-0 w-[15vw] mx-1 self-center"></div>
              <p className="font-sans mb-1">Available for work</p>
            </div>
          </>
        )}
      </div>
      <div className="flex flex-col mx-5 grow max-h-full justify-end lg:max-w-full lg:flex-row lg:mx-0 lg:justify-evenly">
        <div className="flex flex-col mt-10 md:mt-5 max-w-sm lg:mt-0 lg:mx-5 lg:justify-end lg:flex-1 lg:mb-56 lg:max-w-md">
          <h1 className="font-sans font-medium text-2xl lg:text-3xl">
            Hi, I'm <span className="font-bold">Jonas Pilloud</span>
          </h1>
          <p className="text-justify font-sans text-lg font-medium">
            A passionate junior developer who loves creating and continuously
            learning.
          </p>
          <p className="text-justify font-sans mt-2 text-lg font-medium">
            When I'm not at my desk, you’ll find me carving down snowy slopes in
            winter or skateboarding in summer, always driven by a curiosity to
            learn something new.
          </p>
        </div>
        <div className="flex mt-5 mb-0 lg:my-0 lg:mx-2 md:mb-5">
          <ul className="flex flex-col items-start justify-end lg:h-full lg:justify-evenly">
            <NavItem href="#about-me">ABOUT ME</NavItem>
            <NavItem href="#career">CAREER</NavItem>
            <NavItem href="#skills">SKILLS</NavItem>
            <NavItem href="#">PROJECTS</NavItem>
          </ul>
        </div>
      </div>
    </section>
  );
}
