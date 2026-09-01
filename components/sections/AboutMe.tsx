// components/sections/AboutMe.tsx
"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { fadeInFromTop, fadeInFromL, fadeInFromR, fadeInFromBottom } from "@/utils/animations";
import profileImage from "@/public/images/profile.png";
import CVDownloadButton from "@/components/cv/CVDownloadButton";
import StackChips from "@/components/projects/StackChips";
import SectionHeader from "./shared/SectionHeader";
import SectionLede from "./shared/SectionLede";
import Card from "./shared/Card";
import MetaRow from "./shared/MetaRow";
import SubTitle from "./shared/SubTitle";

const linkHover =
  "inline-block transition-transform duration-300 ease-in hover:-skew-x-6 hover:scale-105 hover:scale-y-125";
const externalLinkClass =
  "font-sans text-[17px] font-semibold uppercase tracking-wider text-base-content/60 theme-nord:text-base-content/75 transition-colors hover:text-base-content";

const approachCards = [
  {
    title: "Développement orienté solution",
    body: "Conception d’applications complètes, de l’architecture backend à l’interface utilisateur, avec une attention particulière à la maintenabilité, la clarté du code et la performance.",
  },
  {
    title: "Automatisation & fiabilité",
    body: "Mise en place d’outils et de processus pour automatiser les tâches récurrentes, fiabiliser les déploiements et améliorer la productivité de l’équipe.",
  },
  {
    title: "Sécurité & qualité",
    body: "Sensibilité aux bonnes pratiques de sécurité, revue de code rigoureuse et tests automatisés pour garantir la stabilité des systèmes.",
  },
];

const bringToTeam = [
  "Des compétences solides en développement fullstack",
  "Un esprit d’analyse, de la méthode et de la curiosité technique",
  "Un vrai plaisir à collaborer, apprendre et faire avancer les projets ensemble",
];

export default function AboutMe() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: "some" });

  return (
    <section
      ref={ref}
      id="about-me"
      className="px-5 md:px-0 mt-40 mb-10 xl:mx-32 2xl:mx-60 2xl:mb-20 2xl:mt-60 scroll-mt-32"
    >
      <SectionHeader
        title="À PROPOS"
        right={
          <CVDownloadButton
            className={`font-heading text-[clamp(16px,1.4vw,22px)] text-primary ${linkHover}`}
          >
            {"// TÉLÉCHARGER LE CV"}
          </CVDownloadButton>
        }
      />
      <SectionLede>
        Développeur fullstack diplômé en informatique de gestion. Je conçois des applications
        complètes, de l’architecture backend à l’interface utilisateur.
      </SectionLede>

      <div className="mt-10 flex flex-col gap-8 px-0 md:gap-16 md:px-8">
        <Card className="flex flex-wrap items-stretch gap-6 p-6 md:gap-14 md:p-10">
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeInFromTop}
            className="flex min-w-0 md:min-w-[260px] max-w-[420px] flex-1 basis-[300px]"
          >
            <div className="w-full self-start overflow-hidden rounded-[20px] border-2 border-base-content">
              <Image
                src={profileImage}
                alt="Photo de profil de Jonas Pilloud"
                placeholder="blur"
                sizes="(min-width: 768px) 420px, 90vw"
                className="h-auto w-full"
              />
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeInFromR}
            className="flex min-w-0 md:min-w-[300px] flex-1 basis-[420px] flex-col justify-center gap-[18px]"
          >
            <MetaRow label="Développeur junior · St-Maurice (VS)" />
            <h3 className="font-heading text-[clamp(34px,3.6vw,54px)] font-medium leading-none">
              Développeur <span className="text-primary">fullstack</span>
            </h3>
            <p className="font-hero text-[clamp(19px,1.5vw,24px)] leading-[1.35] text-base-content/80">
              Passionné par l’innovation et la création de solutions techniques{" "}
              <span className="italic text-primary">robustes</span>.
            </p>
            <p className="font-sans text-[clamp(17px,1.3vw,20px)] leading-[1.4] text-base-content/75">
              De la modélisation des données à l’interface : JavaScript et TypeScript, Node.js,
              bases de données relationnelles et NoSQL, outils DevOps.
            </p>
            <StackChips items={["TypeScript", "Node.js", "SQL & NoSQL", "DevOps"]} />
            <motion.div
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={fadeInFromTop}
              className="mt-1.5 flex flex-wrap items-center gap-7"
            >
              <a
                href="https://www.linkedin.com/in/jonas-pilloud/"
                target="_blank"
                rel="noopener noreferrer"
                className={externalLinkClass}
              >
                LinkedIn ↗
              </a>
              <a
                href="https://github.com/Gen0miX"
                target="_blank"
                rel="noopener noreferrer"
                className={externalLinkClass}
              >
                GitHub ↗
              </a>
              <a href="mailto:jonas-pilloud@jonas-pilloud.ch" className={externalLinkClass}>
                Mail ↗
              </a>
            </motion.div>
          </motion.div>
        </Card>

        <div className="flex flex-col gap-5">
          <SubTitle className="pl-1">Mon approche</SubTitle>
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeInFromL}
            className="grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-[clamp(20px,2vw,32px)]"
          >
            {approachCards.map((card, index) => (
              <Card
                key={card.title}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={fadeInFromBottom}
                transition={{ type: "spring", stiffness: 80, damping: 11, delay: index * 0.08 }}
                className="flex flex-col gap-3.5 p-[clamp(22px,2vw,32px)]"
              >
                <MetaRow number={String(index + 1).padStart(2, "0")} />
                <h3 className="font-heading text-[clamp(24px,2.2vw,32px)] font-medium leading-[1.1]">
                  {card.title}
                </h3>
                <p className="font-sans text-[clamp(17px,1.3vw,20px)] leading-[1.45] text-base-content/75">
                  {card.body}
                </p>
              </Card>
            ))}
          </motion.div>
        </div>

        <div className="flex flex-col gap-5">
          <SubTitle className="pl-1">Ce que j’apporte à votre équipe</SubTitle>
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeInFromR}
            className="rounded-[32px] border border-dashed border-base-content/20 px-6 py-2 md:px-11"
          >
            {bringToTeam.map((line, index) => (
              <p
                key={line}
                className={`flex items-center gap-5 py-5 font-hero text-[clamp(20px,1.6vw,26px)] leading-[1.3] text-base-content/85 ${
                  index < bringToTeam.length - 1 ? "border-b border-base-content/10" : ""
                }`}
              >
                <span className="h-px w-7 flex-none bg-primary" />
                {line}
              </p>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
