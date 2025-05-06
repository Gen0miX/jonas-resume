"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { divVariants } from "@/utils/animations";
import Spotlight, { MySpotlightCard } from "@/components/SpotlightCard";
import CTitle from "@/components/CTitle";
import ProgressBar from "@/components/ProgressBar";
import SectionTitle from "../SectionTitle";
import AdaptiveSVG from "../../public/images/skills/adaptive.svg";
import AutonomousSVG from "../../public/images/skills/autonomous.svg";
import MethodicSVG from "../../public/images/skills/methodic.svg";

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  const softSkillsCards = [
    {
      title: "ADAPTABLE",
      svg: AdaptiveSVG,
      color: "bg-primary",
      info: "Je m'adapte rapidement aux nouvelles situations, technologies et environnements de travail, ce qui me permet de répondre efficacement aux défis et de contribuer activement aux projets.",
    },
    {
      title: "AUTONOME",
      svg: AutonomousSVG,
      color: "bg-warning",
      info: "Je prends des initiatives et avance de manière autonome dans mes tâches, en sachant gérer mes priorités tout en sollicitant de l’aide lorsque nécessaire pour garantir un travail fiable et abouti.",
    },
    {
      title: "MÉTHODIQUE",
      svg: MethodicSVG,
      color: "bg-accent",
      info: "Je travaille de manière organisée et structurée, en suivant des processus clairs pour atteindre mes objectifs efficacement et garantir la qualité du travail.",
    },
  ];

  const codingSkills = [
    { label: "HTML", value: 70 },
    { label: "CSS", value: 60 },
    { label: "JavaScript", value: 60 },
    { label: "TypeScript", value: 60 },
    { label: "Angular", value: 60 },
    { label: "React/Native", value: 50 },
    { label: "Python", value: 70 },
    { label: "Java", value: 50 },
    { label: "C#", value: 40 },
    { label: "SQL", value: 80 },
    { label: "SAP", value: 50 },
  ];

  const languages = [
    { label: "Français", value: 100, info: "langue maternelle" },
    { label: "Anglais", value: 80, info: "bonnes connaissances" },
    { label: "Allemand", value: 30, info: "ein bisschen" },
  ];

  const toolsOthers = [
    { label: "Windows 11", value: 80 },
    { label: "Ubuntu", value: 50 },
    { label: "Photoshop", value: 60 },
    { label: "Suite office", value: 80 },
    { label: "Scrum / Agile", value: 60 },
    { label: "VS Code", value: 90 },
  ];

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
          {softSkillsCards.map((card) => (
            <MySpotlightCard
              title={card.title}
              svg={card.svg}
              color={card.color}
              info={card.info}
              key={card.title}
            />
          ))}
        </Spotlight>
      </motion.div>
      <div className="flex flex-col justify-between md:flex-row">
        <div className="flex flex-col justify-evenly md:grow md:mr-5 xl:mr-10">
          <div className="mb-3 mr-2">
            <CTitle classname="text-primary">CODING</CTitle>
            {codingSkills.map((skill) => (
              <ProgressBar
                key={skill.label}
                label={skill.label}
                value={skill.value}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col justify-evenly md:grow">
          <div className="mb-3">
            <CTitle classname="text-primary">LANGUES</CTitle>
            {languages.map((lang) => (
              <ProgressBar
                key={lang.label}
                label={lang.label}
                value={lang.value}
                info={lang.info}
              />
            ))}
          </div>
          <div className="">
            <CTitle classname="text-primary">OUTILS / AUTRES</CTitle>
            {toolsOthers.map((tool) => (
              <ProgressBar
                key={tool.label}
                label={tool.label}
                value={tool.value}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
