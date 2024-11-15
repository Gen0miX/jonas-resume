import clsx from "clsx";
import React, { ReactNode, useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import SectionTitle from "../SectionTitle";
import { div } from "framer-motion/m";

interface Props {
  children?: ReactNode;
  year?: string;
  title?: string;
  className?: string;
  isLeft: boolean;
}

const itemVariantsR = {
  hidden: { opacity: 0, x: 100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 11,
    },
  },
};

const itemVariantsL = {
  hidden: { opacity: 0, x: -100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 11,
    },
  },
};

function Timeline({ children, year, title, className, isLeft }: Props) {
  const ref = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [hasAnimated]);

  return (
    <motion.li
      ref={ref}
      variants={isLeft ? itemVariantsL : itemVariantsR}
      initial="hidden"
      animate={hasAnimated ? "visible" : "hidden"}
      className="static"
    >
      <hr />
      <div className="timeline-middle">
        <FaCheckCircle />
      </div>
      <div className={clsx("mb-10 lg:text-lg", className)}>
        <time className="font-sans">{year}</time>
        <div className="text-lg font-bold lg:text-xl">{title}</div>
        {children}
      </div>
      <hr />
    </motion.li>
  );
}

export default function Career() {
  const ref = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [hasAnimated]);

  return (
    <section
      id="career"
      className="mt-40 mb-10 mr-5 xl:mx-32 2xl:m-60 scroll-mt-32"
    >
      <SectionTitle>CARRIÈRE</SectionTitle>
      <ul className="static z-0 ml-10 timeline timeline-snap-icon max-md:timeline-compact timeline-vertical lg:text-xl">
        <motion.li
          ref={ref}
          variants={itemVariantsR}
          initial="hidden"
          animate={hasAnimated ? "visible" : "hidden"}
          className="static"
        >
          <div className="timeline-middle">
            <FaMagnifyingGlass />
          </div>
          <div className="mb-10 timeline-end lg:text-lg">
            <time className="font-sans">2024 - Présent</time>
            <div className="text-lg font-bold lg:text-xl">
              À la recherche de nouvelles opportunités
            </div>
            Je recherche activement un poste où je peux mettre mes compétences
            en pratique, contribuer à des projets passionnants et continuer à
            grandir professionnellement. Prêt à relever de nouveaux défis et à
            faire la différence !
          </div>
          <hr />
        </motion.li>
        <Timeline
          className="timeline-start md:text-end"
          year="2023 - 2024"
          title="Master en informatique de gestion"
          isLeft={true}
        >
          Une année d'études de Master en informatique de gestion à l'Université
          de Fribourg
        </Timeline>
        <Timeline
          className="timeline-start md:timeline-end"
          year="2023"
          title="Analyste Programmeur"
          isLeft={false}
        >
          Analyste programmeur chez Cremo pendant trois mois. Principalement
          responsable du support téléphonique et du développement de leurs
          logiciels internes (Visual Basic).
        </Timeline>
        <Timeline
          className="timeline-start md:text-end"
          year="2021 - 2022"
          title="Service Civil / Aide voirie"
          isLeft={true}
        >
          Aide voirie pour la municipalité de St-Maurice dans le cadre du
          service civil.
        </Timeline>
        <Timeline
          className="timeline-start md:timeline-end"
          year="2019 - 2020"
          title="Cours CISCO"
          isLeft={false}
        >
          Cours CISCO à la HEG de Genève pendant mes études en informatique de
          Gestion.
        </Timeline>
        <Timeline
          className="timeline-start md:text-end"
          year="2017 - 2021"
          title="Bachelor en informatique de Gestion "
          isLeft={true}
        >
          Programme de Bachelor en informatique de Gestion à la HES-SO Valais
          Sierre.
        </Timeline>
        <Timeline
          className="timeline-start md:timeline-end"
          year="2016 - 2017"
          title="Service civil / Animateur Assistant"
          isLeft={false}
        >
          Animateur assistant au Home les Tilleuls à Monthey dans le cadre du
          service civil.
        </Timeline>
        <Timeline
          className="timeline-start md:text-end"
          year="2015 - 2016"
          title="Stage MPC"
          isLeft={true}
        >
          Stage employé de commerce à la Médiathèque Valais Sion pour compléter
          ma formation.
        </Timeline>
        <Timeline
          className="timeline-start md:timeline-end"
          year="2012 - 2015"
          title="CFC - Employé de commerce"
          isLeft={false}
        >
          Formation employé de commerce à l'ECCG Martigny.
        </Timeline>
      </ul>
    </section>
  );
}
