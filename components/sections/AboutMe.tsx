import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { fadeInFromTop, fadeInFromL, fadeInFromR } from "@/utils/animations";
import profilePic from "../../public/images/profile.png";
import { AiFillGithub, AiFillLinkedin, AiFillMail } from "react-icons/ai";
import SectionTitle from "../SectionTitle";

export default function AboutMe() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

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
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInFromTop}
          className="avatar mb-14 lg:ml-10"
        >
          <div className="border-2 border-base-content max-w-80 rounded-[2rem] lg:min-w-80 2xl:min-w-96">
            <Image
              src={profilePic}
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
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInFromR}
          >
            <p className="font-sans text-xl font-medium text-justify lg:text-2xl ">
              Développeur Fullstack passionné par l'innovation et la création de
              solutions techniques robustes. Voici ce que je vous propose :
            </p>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInFromL}
          >
            <p className="font-sans text-xl font-medium text-justify lg:text-2xl">
              Mon approche en 3 points : <br /> 🛠️ Développement orienté
              solution
              <br />
              Conception d'applications complètes, de l’architecture backend à
              l’interface utilisateur, avec une attention particulière à la
              maintenabilité, la clarté du code et la performance. <br />
              ⚙️ Automatisation & fiabilité
              <br />
              Mise en place d’outils et de processus pour automatiser les tâches
              récurrentes, fiabiliser les déploiements et améliorer la
              productivité de l’équipe.
              <br />
              🔐 Sécurité & qualité
              <br />
              Sensibilité aux bonnes pratiques de sécurité, revue de code
              rigoureuse et tests automatisés pour garantir la stabilité des
              systèmes.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInFromR}
          >
            <p className="font-sans text-xl font-medium text-justify lg:text-2xl">
              🚀 Ce que je peux apporter à votre équipe : <br /> Compétences
              solides en développement Fullstack (JavaScript/TypeScript,
              Node.js, bases de données relationnelles & NoSQL, outils DevOps)
              <br />
              Esprit d’analyse, méthodologie et curiosité technique
              <br />
              Un vrai plaisir à collaborer, apprendre et faire avancer les
              projets ensemble
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInFromTop}
            className="flex justify-end mt-10"
          >
            <a
              className="mx-1 text-3xl transition-transform duration-300 ease-in hover:-skew-x-6 hover:scale-105 hover:scale-y-125"
              href="https://www.linkedin.com/in/jonas-pilloud/"
            >
              <AiFillLinkedin></AiFillLinkedin>
            </a>
            <a
              className="mx-1 text-3xl transition-transform duration-300 ease-in hover:-skew-x-6 hover:scale-105 hover:scale-y-125"
              href="https://github.com/Gen0miX"
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
