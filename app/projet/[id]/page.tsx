"use client";

import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import CTitle from "@/components/CTitle";
import {
  FaPython,
  FaAngular,
  FaJava,
  FaHtml5,
  FaCss3Alt,
} from "react-icons/fa";
import { TbBrandThreejs } from "react-icons/tb";
import { BiLogoTypescript } from "react-icons/bi";
import { IoChevronBack } from "react-icons/io5";

export default function ProjetDetail({ params }: { params: { id: string } }) {
  const { id } = params;
  const projectId = parseInt(id, 10);
  const projects = [
    {
      id: 1,
      name: "MANUSCRIT",
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea eaque architecto, repellat quibusdam, omnis praesentium aut dolorum enim nobis excepturi saepe voluptate sed dolores exercitationem blanditiis hic magnam facere magni laborum reiciendis. Recusandae, consequatur quos magnam suscipit libero alias ipsam ad sapiente voluptatum id aliquid assumenda enim! At quia ad dolorem ipsa, perferendis repudiandae? Placeat aliquid deserunt ratione eius recusandae?",
      techs: FaPython,
      image: "/images/projects/mockup_project_1.png",
    },
    {
      id: 2,
      name: "MEDIA MNG",
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea eaque architecto, repellat quibusdam, omnis praesentium aut dolorum enim nobis excepturi saepe voluptate sed dolores exercitationem blanditiis hic magnam facere magni laborum reiciendis. Recusandae, consequatur quos magnam suscipit libero alias ipsam ad sapiente voluptatum id aliquid assumenda enim! At quia ad dolorem ipsa, perferendis repudiandae? Placeat aliquid deserunt ratione eius recusandae?",
      techs: FaPython,
      image: "/images/projects/mockup_project_2.png",
    },
    {
      id: 3,
      name: "CARTE CADEAU",
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea eaque architecto, repellat quibusdam, omnis praesentium aut dolorum enim nobis excepturi saepe voluptate sed dolores exercitationem blanditiis hic magnam facere magni laborum reiciendis. Recusandae, consequatur quos magnam suscipit libero alias ipsam ad sapiente voluptatum id aliquid assumenda enim! At quia ad dolorem ipsa, perferendis repudiandae? Placeat aliquid deserunt ratione eius recusandae?",
      techs: [FaAngular, TbBrandThreejs, BiLogoTypescript, FaHtml5, FaCss3Alt],
      image: "/images/projects/mockup_project_3.png",
    },
    {
      id: 4,
      name: "PENTOMINOS",
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea eaque architecto, repellat quibusdam, omnis praesentium aut dolorum enim nobis excepturi saepe voluptate sed dolores exercitationem blanditiis hic magnam facere magni laborum reiciendis. Recusandae, consequatur quos magnam suscipit libero alias ipsam ad sapiente voluptatum id aliquid assumenda enim! At quia ad dolorem ipsa, perferendis repudiandae? Placeat aliquid deserunt ratione eius recusandae?",
      techs: FaJava,
      image: "/images/projects/mockup_project_4.png",
    },
  ];

  const project = projects.find((p) => p.id === projectId);

  if (!project) {
    return (
      <div className="flex justify-center items-center h-screen bg-base-300">
        <h1 className="text-xl font-bold text-red-500">Project not found!</h1>
      </div>
    );
  }

  return (
    <div className="flex ml-2 sm:mx-5 md:mx-10 h-[95svh] bg-base-300 justify-center overflow-auto">
      <div className="flex flex-col lg:px-28 xl:max-w-screen-lg p-5 sm:p-10">
        <Link
          href="/#projects"
          className="link flex items-center leading-none font-light mb-10"
        >
          <IoChevronBack size={18}></IoChevronBack>
          <span className="text-lg leading-none">retour</span>
        </Link>

        <div className="flex flex-col mb-16 lg:mr-10">
          <CTitle classname="!font-heading  sm:text-4xl ">
            {project.name}
          </CTitle>
          <p className="font-sans text-lg text-justify mr-2 md:text-xl lg:text-2xl">
            {project.description}
          </p>
          <h2 className="font-sans text-2xl font-medium mt-10 self-end">
            Technologie(s)
          </h2>
          <div className="flex mt-4 space-x-3 justify-end justify-items-center">
            {Array.isArray(project.techs)
              ? project.techs.map((TechIcon, index) => (
                  <TechIcon key={index} className="text-4xl" />
                ))
              : React.createElement(project.techs, {
                  className: "text-4xl",
                })}
          </div>
        </div>

        <div>
          <Image
            src={project.image}
            alt={`${project.name} illustration`}
            width={800}
            height={400}
            className="w-full h-64 object-cover rounded-md mb-3"
          />
        </div>
      </div>
    </div>
  );
}
