import React, { useState } from "react";
import Image from "next/image";
import SectionTitle from "../SectionTitle";
import ProjectLink from "../ProjectLink";
import ProjectMockupImg1 from "@/public/images/projects/mockup_project_1.png";
import ProjectMockupImg2 from "@/public/images/projects/mockup_project_2.png";
import ProjectMockupImg3 from "@/public/images/projects/mockup_project_3.png";
import ProjectMockupImg4 from "@/public/images/projects/mockup_project_4.png";

export default function Projects() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const projects = [
    { id: 1, name: "MANUSCRIT", image: ProjectMockupImg1 },
    { id: 2, name: "MEDIA MNG", image: ProjectMockupImg2 },
    { id: 3, name: "CARTE CADEAU", image: ProjectMockupImg3 },
    { id: 4, name: "PENTOMINOS", image: ProjectMockupImg4 },
  ];

  return (
    <section
      id="projects"
      className="mt-40 mb-10 ml-5 mr-5 xl:mx-32 2xl:mx-60 2xl:mb-20 2xl:mt-60 scroll-mt-32"
    >
      <SectionTitle className="ml-5">PROJETS</SectionTitle>
      <div className="flex flex-row justify-center mt-10 ml-10">
        <div className="flex flex-col justify-items-center w-full sm:w-1/3 mr-5">
          {projects.map((project) => (
            <div>
              <div className="divider m-0"></div>
              <div
                key={project.id}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <ProjectLink path="#">{project.name}</ProjectLink>
              </div>
            </div>
          ))}
          <div className="divider m-0"></div>
        </div>
        <div className="w-full md:w-3/4 lg:w-3/4 xl:w-3/4 px-5 hidden sm:block sm:visible">
          <div className="relative w-full h-0 aspect-w-16 aspect-h-9">
            {projects.map(
              (project) =>
                hoveredProject === project.id && (
                  <Image
                    key={project.id}
                    src={project.image}
                    alt={`Mockup de ${project.name}`}
                    layout="fill"
                    className={`object-contain absolute top-0 left-0 transition-opacity duration-500 border ${
                      hoveredProject === project.id
                        ? "opacity-100 animate-fadeIn"
                        : "opacity-0 animate-fadeOut"
                    }`}
                  />
                )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
