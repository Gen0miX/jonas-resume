import React from "react";
import Image from "next/image";
import Link from "next/link";
import Project1 from "../../public/images/projects/project_1.png";
import Project2 from "../../public/images/projects/project_2.png";
import Project3 from "../../public/images/projects/project_3.png";
import Project4 from "../../public/images/projects/project_4.png";
import SectionTitle from "../SectionTitle";

export default function Projects() {
  return (
    <section
      id="projects"
      className="flex mt-40 mb-10 mr-5 xl:mx-32 scroll-mt-32"
    >
      <div className="bg-base-100 w-96 h-96"></div>
      <div className="bg-base-200 w-96 h-96"></div>
      <div className="bg-base-300 w-96 h-96"></div>
      <div className="bg-base-content w-96 h-96"></div>
      <div className="bg-accent-content w-96 h-96"></div>
      <div className="bg-primary-content w-96 h-96"></div>
    </section>
  );
}
