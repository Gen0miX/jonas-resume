"use client";

import Link from "next/link";
import { projects } from "@/data/projects";
import ProjectCard from "../projects/ProjectCard";
import SectionTitle from "../SectionTitle";

export default function Projects() {
  return (
    <section
      id="projects"
      className="mt-40 mb-10 xl:mx-32 2xl:mx-60 2xl:mb-20 2xl:mt-60 scroll-mt-32"
    >
      <div className="flex flex-wrap items-end justify-between gap-8 px-0 md:px-10">
        <SectionTitle className="ml-10">PROJETS</SectionTitle>
        <Link
          href="/projets"
          className="inline-block font-heading text-lg text-primary transition-transform duration-300 ease-in hover:-skew-x-6 hover:scale-105 hover:scale-y-125"
        >
          {"// TOUS LES PROJETS"}
        </Link>
      </div>

      <div className="mt-5 flex flex-col items-center">
        <p className="max-w-[820px] text-center font-sans text-lg font-medium sm:text-xl">
          Trois sites livrés en mandat indépendant, du modèle de données à la
          mise en production. Next.js, TypeScript, Tailwind, déploiement
          continu sur Vercel.
        </p>
        <div className="mt-7 mb-2 w-1/4 divider" />
      </div>

      <div className="mt-10 flex flex-col gap-12 px-0 md:px-8">
        {projects.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} variant="home" />
        ))}
      </div>
    </section>
  );
}
