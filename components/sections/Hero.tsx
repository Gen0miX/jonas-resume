import React, { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import ThemeToggleButton from "../ThemeToggleButton";

interface Props {
  children?: ReactNode;
  href: string;
}

function NavItem({ children, href, ...props }: Props) {
  return (
    <li className="relative">
      {/* Conteneur pour garder les deux couches alignées */}
      <div className="group">
        {/* Couche pour le mix-blend-mode */}
        <div className="absolute inset-0 mix-blend-difference pointer-events-none z-20 transition-transform duration-300 ease-in group-hover:-skew-x-6 group-hover:scale-105 group-hover:scale-y-125">
          <span className="block theme-nord:text-[#bebbb4] antialiased font-heading font-bold text-[12vw] lg:leading-none xl:font-normal md:text-[9vw] lg:text-[7.5vw]">
            {children}
          </span>
        </div>

        {/* Couche pour les interactions */}
        <Link
          href={href}
          className="
            block
            antialiased 
            font-heading 
            font-bold 
            text-[12vw]
            lg:leading-none
            transition-transform
            duration-300
            ease-in
            group-hover:-skew-x-6
            group-hover:scale-105
            group-hover:scale-y-125
            xl:font-normal
            md:text-[9vw]
            lg:text-[7.5vw]
            relative
            z-10
            text-transparent
          "
        >
          {children}
        </Link>
      </div>
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
    const month = new Intl.DateTimeFormat("fr-FR", options).format(date);
    const day = date.getDate();
    setCurrentDate({ day, month });
  }, []);

  return (
    <section className="flex flex-col h-svh pt-5 px-5">
      <div className="flex flex-col lg:ml-5">
        {currentDate && (
          <>
            <div className="flex flex-row items-end">
              <h1 className="font-heading text-3xl font-bold leading-none">
                {currentDate.day}
              </h1>
              <ul className="menu menu-sm menu-horizontal bg-base-200 rounded-box ml-auto">
                <li>
                  <ThemeToggleButton iconSize={20} />
                </li>
              </ul>
            </div>

            <div className="flex flex-row items-center">
              <p className="font-heading text-lg font-bold mb-1 leading-none">
                {currentDate.month}
              </p>
              <div className="divider divider-vertical my-0 w-[15vw] mx-1 self-center"></div>
              <p className="font-sans mb-1">Disponible pour un emploi</p>
            </div>
          </>
        )}
      </div>
      <div className="flex flex-col mx-5 grow max-h-full justify-end lg:max-w-full lg:flex-row lg:mx-0 lg:justify-evenly">
        <div className="flex flex-col mt-10 md:mt-5 max-w-sm lg:mt-0 lg:mx-5 lg:justify-end lg:flex-1 lg:mb-56 lg:max-w-md">
          <h1 className="font-sans font-medium text-2xl lg:text-3xl">
            Salut, je suis <span className="font-bold">Jonas Pilloud</span>
          </h1>
          <p className="text-justify font-sans text-base sm:text-lg font-medium">
            Un développeur junior passionné qui aime créer et apprendre en
            continu.
          </p>
          <p className="text-justify font-sans mt-2 text-base sm:text-lg font-medium">
            Quand je ne suis pas devant mon écran, vous me trouverez sur mon
            snowboard en hiver ou sur mon skateboard en été. "DEUXIEME PHRASE"
            Toujours animé par la curiosité d'apprendre quelque chose de
            nouveau.
          </p>
        </div>
        <div className="flex mt-5 mb-5 lg:my-0 lg:mx-2 md:mb-5">
          <ul className="flex flex-col items-start justify-end lg:h-full lg:justify-evenly">
            <NavItem href="#about-me">À PROPOS</NavItem>
            <NavItem href="#career">CARRIÈRE</NavItem>
            <NavItem href="#skills">CAPACITÉS</NavItem>
            <NavItem href="#">PROJETS</NavItem>
          </ul>
        </div>
      </div>
    </section>
  );
}
