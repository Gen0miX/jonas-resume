"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { fadeInFromTop, fadeInFromL, fadeInFromR } from "@/utils/animations";
import { images } from "@/utils/images";
import { AiFillGithub, AiFillLinkedin, AiFillMail } from "react-icons/ai";
import SectionTitle from "../SectionTitle";

export default function AboutMe() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.9 });

  return (
    <section
      ref={ref}
      id="about-me"
      className="flex flex-col items-center mt-40 scroll-mt-28 xl:mx-32 2xl:m-60 lg:items-start"
    >
      <SectionTitle className="hidden lg:text-8xl lg:block">
        À PROPOS
      </SectionTitle>
      <div className="flex flex-col items-center 2xl:mx-auto lg:flex-row">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInFromTop}
          className="avatar mb-14 lg:ml-10"
        >
          <div className="border-2 border-base-content max-w-80 rounded-[2rem] lg:min-w-80 2xl:min-w-96">
            <Image
              src={images.profileJonas}
              alt={"Photo de profil"}
              width={1000}
              height={1165}
              className=""
            />
          </div>
        </motion.div>

        <div className="flex flex-col justify-center pl-5 pr-5 md:ml-10 2xl:max-w-[50rem] overflow-hidden">
          <SectionTitle className="mt-5 lg:hidden">À PROPOS</SectionTitle>
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeInFromR}
            className="mb-5"
          >
            <p className="font-sans text-xl font-medium text-justify lg:text-2xl ">
              Développeur Fullstack passionné par l'innovation et la création de
              solutions techniques robustes. Voici ce que je vous propose :
            </p>
          </motion.div>
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeInFromL}
            className="mb-5"
          >
            <p className="font-sans text-xl font-bold text-primary text-center my-5 lg:text-2xl">
              🎯 Mon approche en 3 points :
            </p>
            <p className="font-sans text-lg font-semibold lg:text-xl">
              🛠️ Développement orienté solution
            </p>
            <p className="font-sans text-lg text-justify font-medium lg:text-xl ml-10">
              Conception d'applications complètes, de l'architecture backend à
              l'interface utilisateur, avec une attention particulière à la
              maintenabilité, la clarté du code et la performance.
            </p>
            <p className="font-sans text-lg font-semibold lg:text-xl">
              ⚙️ Automatisation & fiabilité
            </p>
            <p className="font-sans text-lg text-justify font-medium lg:text-xl ml-10">
              Mise en place d'outils et de processus pour automatiser les tâches
              récurrentes, fiabiliser les déploiements et améliorer la
              productivité de l'équipe.
            </p>
            <p className="font-sans text-lg font-semibold lg:text-xl">
              🔐 Sécurité & qualité
            </p>
            <p className="font-sans text-lg text-justify font-medium lg:text-xl ml-10">
              Sensibilité aux bonnes pratiques de sécurité, revue de code
              rigoureuse et tests automatisés pour garantir la stabilité des
              systèmes.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeInFromR}
            className="mb-5"
          >
            <p className="font-sans text-xl font-bold text-primary text-center my-5 lg:text-2xl">
              🚀 Ce que je peux apporter à votre équipe :
            </p>
            <ul className="font-sans text-lg text-justify font-medium mb-2 lg:text-xl space-y-2">
              <li className="flex items-start gap-2">
                <span className="mt-1">⚫️</span>
                <span>
                  Compétences solides en développement Fullstack
                  (JavaScript/TypeScript, Node.js, bases de données
                  relationnelles & NoSQL, outils DevOps)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1">⚫️</span>
                <span>
                  Esprit d'analyse, méthodologie et curiosité technique
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1">⚫️</span>
                <span>
                  Un vrai plaisir à collaborer, apprendre et faire avancer les
                  projets ensemble
                </span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeInFromTop}
            className="flex justify-end mt-10 text-primary"
          >
            <a
              className="mx-1 text-3xl transition-transform duration-300 ease-in hover:-skew-x-6 hover:scale-105 hover:scale-y-125"
              href="https://www.linkedin.com/in/jonas-pilloud/"
              target="_blank"
            >
              <AiFillLinkedin></AiFillLinkedin>
            </a>
            <a
              className="mx-1 text-3xl transition-transform duration-300 ease-in hover:-skew-x-6 hover:scale-105 hover:scale-y-125"
              href="https://github.com/Gen0miX"
              target="_blank"
            >
              <AiFillGithub></AiFillGithub>
            </a>
            <a
              className="mx-1 text-3xl transition-transform duration-300 ease-in hover:-skew-x-6 hover:scale-105 hover:scale-y-125"
              href="mailto:jonas-pilloud@jonas-pilloud.ch"
            >
              <AiFillMail></AiFillMail>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
