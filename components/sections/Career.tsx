import clsx from "clsx";
import React, { ReactNode, useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import SectionTitle from "../SectionTitle";

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
      className="w-full"
    >
      <hr />
      <div className="timeline-middle text-primary">
        <FaCheckCircle />
      </div>
      <div
        className={clsx("mb-10 lg:text-lg group w-[95%] sm:w-3/4", className)}
      >
        <div className="py-0 my-0 border rounded-2xl collapse border-base-300 bg-base-200">
          <input type="checkbox" role="button" />
          <div className="flex flex-col px-2 text-lg font-medium collapse-title lg:text-xl">
            <time className="font-sans text-3xl font-bold group-hover:text-primary">
              {year}
            </time>
            {title}
          </div>
          <div className="px-2 font-thin collapse-content">{children}</div>
        </div>
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
      <ul className="z-0 p-10 overflow-hidden timeline timeline-snap-icon max-md:timeline-compact timeline-vertical lg:text-xl">
        <motion.li
          ref={ref}
          variants={itemVariantsR}
          initial="hidden"
          animate={hasAnimated ? "visible" : "hidden"}
        >
          <div className="timeline-middle text-primary">
            <FaMagnifyingGlass />
          </div>
          <div className="mb-10 timeline-end group lg:text-lg w-[95%] sm:w-3/4">
            <div className="py-0 my-0 border collapse border-base-300 bg-base-200">
              <input type="checkbox" defaultChecked role="button" />
              <div className="flex flex-col px-2 text-lg font-medium collapse-title lg:text-xl">
                <time className="font-sans text-3xl font-bold group-hover:text-primary">
                  2024 - 2025
                </time>
                Mandats indépendants
              </div>
              <div className="px-2 font-thin collapse-content">
                Développement web, modélisation et développement de base de
                données
              </div>
            </div>
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
          className="timeline-start md:timeline-end md:mb-5"
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
          className="timeline-start md:timeline-end md:mb-5"
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
          className="timeline-start md:timeline-end md:mb-5"
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
