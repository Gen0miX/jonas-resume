// components/projects/ProjectCard.tsx
"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { Project } from "@/data/projects";
import StackChips from "./StackChips";
import WipBadge from "./WipBadge";
import Accented from "./Accented";
import ProjectShot from "./ProjectShot";

const linkHover =
  "inline-block transition-transform duration-300 ease-in hover:-skew-x-6 hover:scale-105 hover:scale-y-125";

function ExternalLinkIcon({ className }: { className?: string }) {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
    </svg>
  );
}

type Props = { project: Project; index: number; variant: "home" | "index" };

export default function ProjectCard({ project, index, variant }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const number = String(index + 1).padStart(2, "0");

  if (variant === "index") {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: index * 0.08 }}
      >
        <Link
          href={`/projets/${project.slug}`}
          className="flex h-full flex-col overflow-hidden rounded-[28px] border border-base-300 bg-base-200 text-base-content transition-colors duration-[400ms] hover:border-primary"
        >
          <div className="relative w-full border-b border-base-300 aspect-[16/10]">
            <ProjectShot
              src={project.cover.src}
              alt={project.cover.alt}
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            />
          </div>
          <div className="flex flex-1 flex-col gap-3.5 px-6 pb-8 pt-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-heading text-xl font-bold text-primary">
                {number}
              </span>
              <span className="font-sans text-sm font-bold uppercase tracking-widest text-base-content/55">
                {project.meta}
              </span>
              {project.wip && <WipBadge />}
            </div>
            <h3 className="font-heading text-[clamp(30px,2.8vw,42px)] font-medium leading-none">
              {project.title}
              <span className="text-primary">{project.titleAccent}</span>
            </h3>
            <p className="font-hero text-[clamp(18px,1.4vw,22px)] leading-snug text-base-content/80">
              {project.lede}
            </p>
            <StackChips items={project.stack} className="mt-auto pt-2" />
            <div className="flex flex-wrap items-center justify-between gap-4">
              <span className="font-heading text-lg font-medium text-primary whitespace-nowrap">
                {"// VOIR LE PROJET"}
              </span>
              <span
                title={project.host}
                className="flex h-9 w-9 flex-none items-center justify-center rounded-full border border-base-content/20 text-base-content/60"
              >
                <ExternalLinkIcon />
              </span>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  const reversed = index % 2 === 1;

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className={`flex flex-wrap items-stretch gap-8 rounded-[32px] border border-base-300 bg-base-200 p-6 transition-colors duration-[400ms] hover:border-primary md:gap-14 md:p-10 ${
        reversed ? "md:flex-row-reverse" : ""
      }`}
    >
      <div className="flex min-w-[300px] flex-1 basis-[380px] flex-col justify-center gap-4">
        <div className="flex flex-wrap items-center gap-4">
          <span className="font-heading text-xl font-bold tracking-wider text-primary">
            {number}
          </span>
          <span
            className={`h-px flex-1 bg-base-content/[.18] ${
              project.wip ? "max-w-[40px]" : "max-w-[80px]"
            }`}
          />
          {project.wip && <WipBadge />}
          <span className="font-sans text-sm font-bold uppercase tracking-widest text-base-content/55">
            {project.meta}
          </span>
        </div>
        <h3 className="font-heading text-[clamp(34px,3.6vw,54px)] font-medium leading-none">
          {project.title}
          <span className="text-primary">{project.titleAccent}</span>
        </h3>
        <p className="font-hero text-[clamp(19px,1.5vw,24px)] leading-snug text-base-content/80">
          <Accented text={project.lede} accent={project.ledeAccent} />
        </p>
        <p className="font-sans text-[clamp(17px,1.3vw,20px)] leading-snug text-base-content/75">
          {project.summary}
        </p>
        <StackChips items={project.stack} />
        <div className="mt-1 flex flex-wrap items-center gap-7">
          <Link href={`/projets/${project.slug}`} className={`font-heading text-[clamp(17px,1.4vw,22px)] font-medium text-primary ${linkHover}`}>
            {"// VOIR LE PROJET"}
          </Link>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-[17px] font-semibold uppercase tracking-wider text-base-content/60 transition-colors hover:text-base-content"
          >
            {project.host} ↗
          </a>
        </div>
      </div>
      <div className="flex min-w-[300px] flex-1 basis-[420px]">
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[20px] border-2 border-base-content">
          <ProjectShot
            src={project.cover.src}
            alt={project.cover.alt}
            sizes="(min-width: 768px) 50vw, 100vw"
          />
        </div>
      </div>
    </motion.article>
  );
}
