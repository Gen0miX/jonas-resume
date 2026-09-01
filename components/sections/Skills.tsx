// components/sections/Skills.tsx
"use client";

import { useRef } from "react";
import type { FC, SVGProps } from "react";
import { motion, useInView } from "framer-motion";
import { divVariants } from "@/utils/animations";
import Spotlight, { MySpotlightCard } from "@/components/SpotlightCard";
import ProgressBar from "@/components/ProgressBar";
import AdaptiveSVG from "../../public/images/skills/adaptive.svg";
import AutonomousSVG from "../../public/images/skills/autonomous.svg";
import MethodicSVG from "../../public/images/skills/methodic.svg";
import SectionHeader from "./shared/SectionHeader";
import SectionLede from "./shared/SectionLede";
import Card from "./shared/Card";
import SubTitle from "./shared/SubTitle";

const softSkillsCards: {
  title: string;
  svg: FC<SVGProps<SVGSVGElement>>;
  color: string;
  info: string;
}[] = [
  {
    title: "ADAPTABLE",
    svg: AdaptiveSVG,
    color: "bg-primary",
    info: "Je m’adapte rapidement aux nouvelles situations, technologies et environnements de travail, ce qui me permet de répondre efficacement aux défis et de contribuer activement aux projets.",
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
  { label: "React / Native", value: 50 },
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
  { label: "Suite Office", value: 80 },
  { label: "Scrum / Agile", value: 60 },
  { label: "VS Code", value: 90 },
];

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: "some" });

  return (
    <section
      id="skills"
      className="px-5 md:px-0 mt-40 mb-10 xl:mx-32 2xl:mx-60 2xl:mb-20 2xl:mt-60 scroll-mt-32"
    >
      <SectionHeader
        title="CAPACITÉS"
        right={
          <span className="font-sans text-[15px] font-bold uppercase tracking-[.14em] text-base-content/55 theme-nord:text-base-content/75">
            Aptitudes · Coding · Langues · Outils
          </span>
        }
      />
      <SectionLede>Un résumé de mes compétences et aptitudes les plus importantes.</SectionLede>

      <div className="mt-10 flex flex-col gap-12 px-0 md:px-8">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={divVariants}
        >
          <Spotlight className="grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-[clamp(20px,2vw,32px)]">
            {softSkillsCards.map((card, index) => (
              <MySpotlightCard
                key={card.title}
                number={String(index + 1).padStart(2, "0")}
                title={card.title}
                svg={card.svg}
                color={card.color}
                info={card.info}
              />
            ))}
          </Spotlight>
        </motion.div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(340px,100%),1fr))] items-start gap-[clamp(20px,2vw,32px)]">
          <Card radius={28} className="flex flex-col gap-[18px] p-[clamp(24px,2vw,34px)]">
            <SubTitle>Coding</SubTitle>
            <div className="flex flex-col gap-3.5">
              {codingSkills.map((skill) => (
                <ProgressBar key={skill.label} label={skill.label} value={skill.value} />
              ))}
            </div>
          </Card>

          <div className="flex flex-col gap-[clamp(20px,2vw,32px)]">
            <Card radius={28} className="flex flex-col gap-[18px] p-[clamp(24px,2vw,34px)]">
              <SubTitle>Langues</SubTitle>
              <div className="flex flex-col gap-4">
                {languages.map((lang) => (
                  <ProgressBar
                    key={lang.label}
                    label={lang.label}
                    value={lang.value}
                    info={lang.info}
                    percentWidth={44}
                  />
                ))}
              </div>
            </Card>
            <Card radius={28} className="flex flex-col gap-[18px] p-[clamp(24px,2vw,34px)]">
              <SubTitle>Outils / autres</SubTitle>
              <div className="flex flex-col gap-3.5">
                {toolsOthers.map((tool) => (
                  <ProgressBar key={tool.label} label={tool.label} value={tool.value} />
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
