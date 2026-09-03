// app/projets/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/data/projects";
import ProjectCard from "@/components/projects/ProjectCard";

export const metadata: Metadata = {
  title: "Projets — Jonas Pilloud",
  description:
    "Trois sites livrés en mandat indépendant, du modèle de données à la mise en production. Next.js, TypeScript, Tailwind, déploiement continu sur Vercel.",
};

export default function ProjectsIndexPage() {
  return (
    <div className="mx-auto max-w-[1400px] px-5 pt-14 sm:px-12 lg:px-24 pb-14">
      <Link
        href="/#projects"
        className="inline-block font-heading text-lg text-base-content/60 theme-nord:text-base-content/75 transition-transform duration-300 ease-in hover:-skew-x-6 hover:scale-105 hover:scale-y-125 hover:text-primary"
      >
        {"// RETOUR À L'ACCUEIL"}
      </Link>

      <div className="mt-6 flex flex-wrap items-end justify-between gap-8">
        <h1 className="font-heading text-[clamp(44px,6.5vw,96px)] font-normal leading-[0.95]">
          PROJETS
        </h1>
        <p className="max-w-[520px] font-sans text-lg font-medium leading-snug text-base-content/80 sm:text-xl">
          Trois sites livrés en mandat indépendant, du modèle de données à la
          mise en production. Next.js, TypeScript, Tailwind, déploiement continu
          sur Vercel.
        </p>
      </div>

      <div className="my-9 h-0.5 w-full bg-base-content/10" />

      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(360px,100%),1fr))] gap-6">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.slug}
            project={project}
            index={index}
            variant="index"
          />
        ))}
      </div>

      <div className="mt-14 flex flex-wrap items-center justify-between gap-6 rounded-[32px] border border-dashed border-base-content/20 p-9 sm:mt-24">
        <p className="max-w-[640px] font-hero text-xl leading-snug text-base-content/80 sm:text-2xl">
          Un site, une plateforme interne ou une reprise de projet existant ?
          Écrivez-moi, je réponds sous 48 heures.
        </p>
        <Link
          href="/#contact"
          className="inline-flex h-[52px] items-center rounded-[10px] bg-primary px-7 font-sans text-[17px] font-bold uppercase tracking-wider text-base-100 transition-colors hover:bg-base-content"
        >
          Me contacter
        </Link>
      </div>
    </div>
  );
}
