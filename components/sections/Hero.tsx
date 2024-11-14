import React, { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import CVDownloadButton from "../cv/CVDownloadButton";
import ThemeToggleButton from "../ThemeToggleButton";

interface Props {
  children?: ReactNode;
  href: string;
  initial: number;
  delay?: number;
}

function NavItem({ children, href, initial, delay = 0, ...props }: Props) {
  const [isAnimating, setIsAnimating] = useState(true);

  const handleAnimationComplete = () => {
    setIsAnimating(false);
  };

  return (
    <li
      className={`relative ${
        isAnimating ? "overflow-hidden" : ""
      } pt-[1em] pb-[1em]`}
    >
      {/* Conteneur pour garder les deux couches alignées */}
      <div className="group">
        {/* Couche pour le mix-blend-mode */}
        <motion.div
          initial={{ y: initial, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeIn", delay: delay }}
          onAnimationComplete={handleAnimationComplete}
        >
          <div className="absolute inset-0 z-20 transition-transform duration-300 ease-in pointer-events-none mix-blend-difference group-hover:-skew-x-6 group-hover:scale-105 group-hover:scale-y-125">
            <span className="block theme-nord:text-[#bebbb4] antialiased font-heading font-bold text-[12vw] lg:leading-none xl:font-normal md:text-[9vw] lg:text-[7.5vw]">
              {children}
            </span>
          </div>
        </motion.div>

        {/* Couche pour les interactions */}
        <motion.div
          initial={{ y: initial, opacity: 0 }}
          animate={{ y: 0, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeIn", delay: delay }}
        >
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
        </motion.div>
      </div>
    </li>
  );
}

export default function Hero() {
  const [currentDate, setCurrentDate] = useState<{
    day: number;
    month: string;
  }>({
    day: new Date().getDate(),
    month: new Intl.DateTimeFormat("fr-FR", { month: "long" }).format(
      new Date()
    ),
  });
  useEffect(() => {
    const date = new Date();
    const options = { month: "long" as const };
    const month = new Intl.DateTimeFormat("fr-FR", options).format(date);
    const day = date.getDate();
    setCurrentDate({ day, month });
  }, []);

  return (
    <section className="flex flex-col px-5 pt-5 h-svh">
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeIn", delay: 1 }}
        className="flex flex-col lg:ml-5"
      >
        {currentDate && (
          <>
            <div className="flex flex-row items-end">
              <h1 className="text-3xl font-bold leading-none font-heading">
                {currentDate.day}
              </h1>
              <ul className="ml-auto menu menu-sm menu-horizontal bg-base-200 rounded-box">
                <li>
                  <ThemeToggleButton
                    iconSize={20}
                    className="mix-blend-difference theme-nord:text-[#bebbb4]"
                  />
                </li>
                <li>
                  <CVDownloadButton
                    iconSize={20}
                    className="mix-blend-difference theme-nord:text-[#bebbb4]"
                  />
                </li>
              </ul>
            </div>

            <div className="flex flex-row items-center">
              <p className="mb-1 text-lg font-bold leading-none font-heading">
                {currentDate.month}
              </p>
              <div className="divider divider-vertical my-0 w-[15vw] mx-1 self-center"></div>
              <p className="mb-1 font-sans">Disponible pour un emploi</p>
            </div>
          </>
        )}
      </motion.div>
      <div className="flex flex-col justify-end max-h-full mx-5 grow lg:max-w-full lg:flex-row lg:mx-0 lg:justify-evenly">
        <div className="flex flex-col max-w-sm mt-10 md:mt-5 lg:mt-0 lg:mx-5 lg:justify-end lg:flex-1 lg:mb-56 lg:max-w-md">
          <motion.div>
            <h1 className="font-sans text-xl sm:text-2xl font-medium lg:text-3xl">
              Salut, je suis <span className="font-bold">Jonas Pilloud</span>
            </h1>
          </motion.div>
          <motion.div>
            {" "}
            <p className="font-sans text-sm font-medium text-justify sm:text-base md:text-lg">
              Un développeur junior passionné qui aime créer et apprendre en
              continu.
            </p>
          </motion.div>

          <motion.div>
            <p className="mt-2 font-sans text-sm font-medium text-justify sm:text-base md:text-lg">
              Quand je ne suis pas devant mon écran, vous me trouverez sur mon
              snowboard en hiver ou sur mon skateboard en été. Je suis toujours
              animé par la curiosité d'apprendre quelque chose de nouveau.
            </p>
          </motion.div>
        </div>
        <div className="flex mt-5 mb-5 lg:my-0 lg:mx-2 md:mb-5">
          <ul className="flex flex-col items-start justify-end lg:h-full lg:justify-evenly">
            <NavItem href="#about-me" initial={200}>
              À PROPOS
            </NavItem>
            <NavItem href="#career" initial={180} delay={0.2}>
              CARRIÈRE
            </NavItem>
            <NavItem href="#skills" initial={160} delay={0.4}>
              CAPACITÉS
            </NavItem>
            <NavItem href="#projects" initial={140} delay={0.6}>
              PROJETS
            </NavItem>
          </ul>
        </div>
      </div>
    </section>
  );
}
