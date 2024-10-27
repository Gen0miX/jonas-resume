import clsx from "clsx";
import React, { ReactNode } from "react";
import { FaCheckCircle } from "react-icons/fa";

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
        <FaCheckCircle color="white"></FaCheckCircle>
      </div>
      <div className={clsx("mb-10", className)}>
        <time className="font-sans">{year}</time>
        <div className="text-lg font-bold">{title}</div>
        {children}
      </div>
      <hr />
    </li>
  );
}

export default function Career() {
  return (
    <section id="career" className="mt-40 mb-10 xl:mx-32 2xl:m-60 scroll-mt-32">
      <h1 className="font-heading text-6xl mb-5 ml-10">CAREER</h1>
      <ul className="static timeline timeline-snap-icon ml-10 mr-5 max-md:timeline-compact timeline-vertical z-0">
        <Timeline
          className="timeline-start md:text-end"
          year="2000"
          title="Développeur Front"
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
          unde voluptatem odio voluptates nemo fugiat! Fuga animi quos dolorum
          accusamus.
        </Timeline>
        <Timeline
          className="timeline-end"
          year="2000"
          title="Développeur Front"
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
          unde voluptatem odio voluptates nemo fugiat! Fuga animi quos dolorum
          accusamus.
        </Timeline>
      </ul>
    </section>
  );
}
