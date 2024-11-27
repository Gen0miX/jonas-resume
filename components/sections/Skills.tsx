import React, { ReactNode, useRef, useEffect, useState } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import Spotlight, { SpotlightCard } from "@/components/SpotlightCard";
import Image from "next/image";
import SectionTitle from "../SectionTitle";
import AdaptiveSVG from "../../public/images/skills/adaptive.svg";
import HelpfulSVG from "../../public/images/skills/helpful.svg";
import MethodicSVG from "../../public/images/skills/methodic.svg";

interface Props {
  children?: ReactNode;
  value?: number;
  info?: string;
}

const textVariants = {
  hidden: { opacity: 0, x: -100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 11,
      delay: 0.8,
    },
  },
};

const divVariants = {
  hidden: { opacity: 0, y: -100 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 11,
      delay: 0.2,
    },
  },
};

function Skill({ children, value }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start({ width: `${value}%` });
    }
  }, [isInView, controls, value]);

  return (
    <div
      ref={ref}
      className="flex items-center w-full ease-in-out hover:text-primary group transition-color"
    >
      <motion.div
        variants={textVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="w-32 mb-2 sm:w-40"
      >
        <p className="font-sans text-base font-medium leading-none transition-all ease-in-out sm:text-lg sm:leading-none lg:text-xl lg:leading-none group-hover:font-bold">
          {children}
        </p>
      </motion.div>
      <div className="flex items-center flex-1">
        <span className="w-10 mr-1 font-sans text-sm font-bold text-right transition-opacity ease-in-out opacity-0 group-hover:opacity-100">
          {value}%
        </span>
        <div className="static flex-1 h-2 transition-colors ease-in-out rounded progress group-hover:progress-primary ">
          <motion.div
            className="h-full rounded bg-base-content group-hover:bg-primary"
            initial={{ width: 0 }}
            animate={controls}
            transition={{ duration: 1 }}
          ></motion.div>
        </div>
      </div>
    </div>
  );
}
function Language({ children, info, value }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start({ width: `${value}%` });
    }
  }, [isInView, controls, value]);

  return (
    <div
      ref={ref}
      className="flex items-center w-full ease-in-out hover:text-primary group transition-color"
    >
      <motion.div
        variants={textVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="flex flex-col mb-1 w-36 sm:w-40"
      >
        <p className="font-sans text-base font-medium leading-none transition-all ease-in-out sm:text-lg sm:leading-none lg:text-xl lg:leading-none group-hover:font-bold">
          {children}
        </p>
        <p className="font-sans text-sm leading-none transition-all ease-in-out sm:text-base sm:leading-none lg:text-lg lg:leading-none">
          {info}
        </p>
      </motion.div>
      <div className="flex items-center flex-1">
        <span className="w-10 mr-1 font-sans text-sm font-bold text-right transition-opacity ease-in-out opacity-0 group-hover:opacity-100">
          {value}%
        </span>
        <div className="static flex-1 h-2 transition-colors ease-in-out rounded progress group-hover:progress-primary ">
          <motion.div
            className="h-full rounded bg-base-content group-hover:bg-primary"
            initial={{ width: 0 }}
            animate={controls}
            transition={{ duration: 1 }}
          ></motion.div>
        </div>
      </div>
    </div>
  );
}

function CTitle({ children }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 1 });
  const [text, setText] = useState<string[]>([]);

  useEffect(() => {
    // Convertir le children en tableau de caractères s'il est une string
    if (typeof children === "string") {
      setText(children.split(""));
    }
  }, [children]);

  // Configuration de l'animation
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05, // Délai entre chaque lettre
        delayChildren: 0.2,
      },
    },
  };

  const letterVariant = {
    hidden: { y: 100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        y: {
          type: "spring",
          damping: 10,
          stiffness: 80,
        },
        opacity: {
          duration: 0.4,
          ease: "backInOut",
        },
      },
    },
  };

  return (
    <motion.h2
      ref={ref}
      variants={container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="mb-3 font-sans text-2xl font-bold lg:text-4xl"
    >
      {text.map((letter, index) => (
        <motion.span
          key={index}
          variants={letterVariant}
          style={{ display: "inline-block" }} // Important pour l'animation
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.h2>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 1 });

  return (
    <section
      id="skills"
      className="mt-40 mb-10 ml-5 mr-5 xl:mx-32 2xl:mx-60 2xl:mb-20 2xl:mt-60 scroll-mt-32"
    >
      <SectionTitle className="ml-5">CAPACITÉS</SectionTitle>
      <motion.div
        ref={ref}
        variants={divVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="flex flex-col items-center"
      >
        <p className="font-sans text-base font-medium sm:text-lg lg:text-xl">
          Voici un résumé de mes compétences et aptitudes les plus importantes :
        </p>
        <div className="self-center w-1/4 divider"></div>
        <Spotlight className="flex flex-wrap h-full gap-4 p-4 justify-center mb-4">
          <SpotlightCard className="flex flex-col items-center max-w-md border theme-nord:border-base-content sm:h-auto">
            <div className="relative flex items-center justify-center m-10 sm:m-14">
              <div className="absolute w-32 h-32 border-2 rounded-full theme-nord:border-base-content bg-primary"></div>
              <AdaptiveSVG className="relative theme-dark:text-base-300 w-[85px] h-[85px]" />
            </div>
            <CTitle>ADAPTABLE</CTitle>
            <p className="mx-5 mb-5 font-sans text-lg text-center sm:mx-14 sm:mb-14">
              Je m'adapte rapidement aux nouvelles situations, technologies et
              environnements de travail, ce qui me permet de répondre
              efficacement aux défis et de contribuer activement aux projets.
            </p>
          </SpotlightCard>
          <SpotlightCard className="flex flex-col items-center max-w-md border theme-nord:border-base-content sm:h-auto">
            <div className="relative flex items-center justify-center m-10 sm:m-14">
              <div className="absolute w-32 h-32 border-2 rounded-full theme-nord:border-base-content bg-warning"></div>
              <HelpfulSVG className="relative theme-dark:text-base-300 w-[85px] h-[85px]" />
            </div>
            <CTitle>SERVIABLE</CTitle>
            <p className="mx-5 mb-5 font-sans text-lg text-center sm:mx-14 sm:mb-14">
              Toujours prêt à aider, je m'assure de soutenir mes collègues et de
              faciliter la réussite collective en offrant mon aide chaque fois
              que nécessaire.
            </p>
          </SpotlightCard>
          <SpotlightCard className="flex flex-col items-center max-w-md border theme-nord:border-base-content min-h-64 sm:h-auto">
            <div className="relative flex items-center justify-center m-10 sm:m-14">
              <div className="absolute w-32 h-32 border-2 theme-nord:border-base-content rounded-full bg-accent"></div>
              <MethodicSVG className="relative theme-dark:text-base-300 w-[85px] h-[85px]" />
            </div>
            <CTitle>MÉTHODIQUE</CTitle>
            <p className="mx-5 mb-5 font-sans text-lg text-center sm:mx-14 sm:mb-14">
              Je travaille de manière organisée et structurée, en suivant des
              processus clairs pour atteindre mes objectifs efficacement et
              garantir la qualité du travail.
            </p>
          </SpotlightCard>
        </Spotlight>
      </motion.div>
      <div className="flex flex-col justify-between md:flex-row">
        <div className="flex flex-col justify-evenly md:grow md:mr-5 xl:mr-10">
          <div className="mb-3 mr-2">
            <CTitle>CODING</CTitle>
            <Skill value={70}>HTML</Skill>
            <Skill value={60}>CSS</Skill>
            <Skill value={60}>Javascript</Skill>
            <Skill value={60}>Typescript</Skill>
            <Skill value={60}>Angular</Skill>
            <Skill value={50}>React/Native</Skill>
            <Skill value={70}>Python</Skill>
            <Skill value={50}>Java</Skill>
            <Skill value={40}>C#</Skill>
            <Skill value={80}>SQL</Skill>
            <Skill value={50}>SAP</Skill>
          </div>
        </div>
        <div className="flex flex-col justify-evenly md:grow">
          <div className="mb-3">
            <CTitle>LANGUES</CTitle>
            <Language value={100} info="langue maternelle">
              Français
            </Language>
            <Language value={80} info="bonnes connaissances">
              Anglais
            </Language>
            <Language value={30} info="ein bisschen">
              Allemand
            </Language>
          </div>
          <div className="">
            <CTitle>OUTILS / AUTRES</CTitle>
            <Skill value={80}>Windows 11</Skill>
            <Skill value={50}>Ubuntu</Skill>
            <Skill value={60}>Photoshop</Skill>
            <Skill value={80}>Suite office</Skill>
            <Skill value={60}>Scrum / Agile</Skill>
            <Skill value={90}>VS Code</Skill>
          </div>
        </div>
      </div>
    </section>
  );
}
