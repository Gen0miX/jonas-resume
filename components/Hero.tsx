import React, { ReactNode, useEffect, useState } from "react";
import Link from "next/link";

interface Props {
  children?: ReactNode;
  href: string;
}

function NavItem({ children, href, ...props }: Props) {
  return (
    <li className="antialiased font-heading font-normal text-[12vw] md:text-[7.5vw] hover:-skew-x-6 hover:scale-105 hover:scale-y-125 transition-transform duration-300 ease-in">
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
    <section className="flex flex-col h-dvh mt-5 mx-5">
      <div className="flex flex-col items-baseline">
        {currentDate && (
          <>
            <h1 className="font-heading text-3xl font-bold translate-y-2">
              {currentDate.day}
            </h1>
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
      <div className="flex flex-col mx-10 grow justify-end">
        <div className="flex flex-col mt-10">
          <h1 className="font-sans text-2xl md:text-3xl">
            Hi, I'm <span className="font-bold">Jonas Pilloud</span>
          </h1>
          <p className="text-justify font-sans text-base">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur
            corrupti vitae quasi debitis voluptate blanditiis earum
            reprehenderit nemo nam. Eum?
          </p>
        </div>
        <div className="flex mt-5 mb-10 md:mt-0">
          <ul className="flex flex-col items-start justify-end md:gap-10">
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
