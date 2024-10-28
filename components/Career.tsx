import clsx from "clsx";
import React, { ReactNode } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";

interface Props {
  children?: ReactNode;
  year?: string;
  title?: string;
  className?: string;
}

function Timeline({ children, year, title, className }: Props) {
  return (
    <li className="static">
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
    </li>
  );
}

export default function Career() {
  return (
    <section id="career" className="mt-40 mb-10 xl:mx-32 2xl:m-60 scroll-mt-32">
      <h1 className="font-heading text-5xl mb-5 ml-10 lg:text-8xl">CARRIÈRE</h1>
      <ul className="static timeline timeline-snap-icon ml-10 mr-5 max-md:timeline-compact timeline-vertical z-0 lg:text-xl">
        <li className="static">
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
        </li>
        <Timeline
          className="timeline-start md:text-end"
          year="2023 - 2024"
          title="Master en informatique de gestion"
        >
          Une année d'études de Master en informatique de gestion à l'Université
          de Fribourg
        </Timeline>
        <Timeline
          className="timeline-start md:timeline-end"
          year="2023"
          title="Analyste Programmeur"
        >
          Analyste programmeur chez Cremo pendant trois mois. Principalement
          responsable du support téléphonique et du développement de leurs
          logiciels internes (Visual Basic).
        </Timeline>
        <Timeline
          className="timeline-start md:text-end"
          year="2021 - 2022"
          title="Service Civil / Aide voirie"
        >
          Aide voirie pour la municipalité de St-Maurice dans le cadre du
          service civil.
        </Timeline>
        <Timeline
          className="timeline-start md:timeline-end"
          year="2019 - 2020"
          title="Cours CISCO"
        >
          Cours CISCO à la HEG de Genève pendant mes études en informatique de
          Gestion.
        </Timeline>
        <Timeline
          className="timeline-start md:text-end"
          year="2017 - 2021"
          title="Bachelor en informatique de Gestion "
        >
          Programme de Bachelor en informatique de Gestion à la HES-SO Valais
          Sierre.
        </Timeline>
        <Timeline
          className="timeline-start md:timeline-end"
          year="2016 - 2017"
          title="Service civil / Animateur Assistant"
        >
          Animateur assistant au Home les Tilleuls à Monthey dans le cadre du
          service civil.
        </Timeline>
        <Timeline
          className="timeline-start md:text-end"
          year="2015 - 2016"
          title="Stage MPC"
        >
          Stage employé de commerce à la Médiathèque Valais Sion pour compléter
          ma formation.
        </Timeline>
        <Timeline
          className="timeline-start md:timeline-end"
          year="2012 - 2015"
          title="CFC - Employé de commerce"
        >
          Formation employé de commerce des affaires à l'ECCG Martigny.
        </Timeline>
      </ul>
    </section>
  );
}
