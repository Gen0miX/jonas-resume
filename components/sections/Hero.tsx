import React, { ReactNode, useEffect, useState } from "react";
import { images } from "@/utils/images";
import Image from "next/image";
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
    setTimeout(() => {
      setIsAnimating(false);
    }, 200);
  };

  return (
    <motion.div
      initial={{ y: initial, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 80,
        damping: 11,
        delay: delay,
      }}
      onAnimationComplete={handleAnimationComplete}
    >
      <li className="relative">
        <div className="group">
          {/* Couche visible pendant l'animation */}
          {isAnimating && (
            <div className="absolute inset-0 z-20 pointer-events-none">
              <span className="block antialiased font-heading font-light text-xl md:text-2xl xl:text-3xl theme-nord:text-base-content theme-dark:text-[#ced3cd]">
                {children}
              </span>
            </div>
          )}

          {/* Couche avec mix-blend-mode qui apparaît après l'animation */}
          <div
            className={`
              absolute inset-0 z-20 pointer-events-none
              transition-transform duration-300 ease-in
              group-hover:-skew-x-6 group-hover:scale-105 group-hover:scale-y-125
              ${!isAnimating ? "mix-blend-difference opacity-100" : "opacity-0"}
            `}
          >
            <span className="block antialiased font-heading font-light text-xl md:text-2xl xl:text-3xl theme-nord:text-[#bebbb4]">
              {children}
            </span>
          </div>

          <Link
            href={href}
            className="
              block antialiased font-heading font-light text-xl xl:text-3xl md:text-2xl 
              transition-transform duration-300 ease-in 
              group-hover:-skew-x-6 group-hover:scale-105 group-hover:scale-y-125 
              xl:font-normal
              relative z-10 text-transparent
            "
          >
            {children}
          </Link>
        </div>
      </li>
    </motion.div>
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

  const [showImage, setShowImage] = useState(false);
  const isSmall = useIsSmallScreen();
  const imageWidth = isSmall ? 64 : 96;

  useEffect(() => {
    const date = new Date();
    const options = { month: "long" as const };
    const month = new Intl.DateTimeFormat("fr-FR", options).format(date);
    const day = date.getDate();
    setCurrentDate({ day, month });
    const timer = setTimeout(() => setShowImage(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="flex flex-col px-5 pt-5 h-svh">
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 80,
          damping: 11,
          delay: 0.2,
        }}
        className="flex flex-col lg:ml-5"
      >
        {currentDate && (
          <>
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 90,
                damping: 11,
                delay: 0.6,
              }}
              className="flex flex-row items-end"
            >
              <h1 className="text-3xl font-bold leading-none font-heading">
                {currentDate.day}
              </h1>
              <ul className="ml-auto menu menu-sm menu-horizontal bg-base-200 rounded-box">
                <li>
                  <ThemeToggleButton iconSize={20} className="" />
                </li>
                <li>
                  <CVDownloadButton iconSize={20} className="text-primary" />
                </li>
              </ul>
            </motion.div>

            <div className="flex flex-row items-center">
              <p className="mb-1 text-primary text-lg font-bold leading-none font-heading">
                {currentDate.month}
              </p>
              <div className="divider divider-vertical my-0 w-[15vw] mx-1 self-center"></div>
              <p className="mb-1 font-hero">
                Disponible pour un <span className="text-primary">emploi</span>
              </p>
            </div>
          </>
        )}
      </motion.div>
      <motion.div
        className="flex flex-col flex-grow justify-center items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: "tween", duration: 1 }}
      >
        <div className="flex flex-col items-center font-hero text-3xl sm:text-5xl md:text-6xl">
          <div className="flex items-center mb-2 sm:mb-5">
            Je suis
            <span className="ml-2 text-primary italic">Jonas</span>
            {/* Image qui s'affiche après un délai */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: showImage ? imageWidth : 0 }}
              transition={{
                delay: 0.2,
                type: "spring",
                stiffness: 80,
                damping: 11,
              }}
              className="overflow-hidden mx-2"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={showImage ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.1, type: "spring", stiffness: 80 }}
                className={`${
                  isSmall ? "w-16 h-12" : "w-24 h-16"
                } rounded-xl border-2 border-base-content overflow-hidden`}
              >
                <Image
                  src={images.profileMiniJonas}
                  alt="Photo de Jonas"
                  width={150}
                  height={150}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </motion.div>
            <span className="text-primary italic">,</span>
          </div>
          <div className="flex items-center mb-2 sm:mb-5">
            un
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: showImage ? imageWidth : 0 }}
              transition={{
                delay: 1,
                type: "spring",
                stiffness: 80,
                damping: 11,
              }}
              className="overflow-hidden mx-2"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={showImage ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.1, type: "spring", stiffness: 80 }}
                className={`${
                  isSmall ? "w-16 h-12" : "w-24 h-16"
                } rounded-xl border-2 border-base-content overflow-hidden`}
              >
                <Image
                  src={images.devImage}
                  alt={"Petite photo d'un ordinateur"}
                  width={150}
                  height={150}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </motion.div>
            développeur <span className="text-primary italic ml-2">junior</span>
          </div>
          <div className="flex items-center mb-2 sm:mb-5">
            basé en Suisse {/* Image qui s'affiche après un délai */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: showImage ? imageWidth : 0 }}
              transition={{
                delay: 0.6,
                type: "spring",
                stiffness: 80,
                damping: 11,
              }}
              className="overflow-hidden mx-2"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={showImage ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.1, type: "spring", stiffness: 80 }}
                className={`${
                  isSmall ? "w-16 h-12" : "w-24 h-16"
                } rounded-xl border-2 border-base-content overflow-hidden`}
              >
                <Image
                  src={images.chImage}
                  alt={"Petite photo d'une edelweiss"}
                  width={150}
                  height={150}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.2 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.0, type: "spring", stiffness: 80 }}
        className="divider w-1/2 sm:w-2/5 mr-auto mb-2"
      ></motion.div>
      <div className="mb-5 flex flex-col justify-center">
        <div className="flex gap-4 justify-center sm:flex-wrap">
          <ul className="flex flex-col gap-4 sm:flex-row sm:gap-4">
            <NavItem href="#about-me" initial={200} delay={1.4}>
              // À PROPOS
            </NavItem>
            <NavItem href="#career" initial={160} delay={1.8}>
              // CARRIÈRE
            </NavItem>
          </ul>
          <ul className="flex flex-col gap-4 sm:flex-row sm:gap-4">
            <NavItem href="#skills" initial={140} delay={2}>
              // CAPACITÉS
            </NavItem>
            <NavItem href="#projects" initial={180} delay={1.6}>
              // PROJETS
            </NavItem>
          </ul>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.2 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.0, type: "spring", stiffness: 80 }}
          className="divider w-1/2 sm:w-2/5 ml-auto mt-2"
        ></motion.div>
      </div>
    </section>
  );
}

function useIsSmallScreen(breakpoint = 640) {
  const [isSmall, setIsSmall] = useState(false);

  useEffect(() => {
    const check = () => setIsSmall(window.innerWidth < breakpoint);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);

  return isSmall;
}
