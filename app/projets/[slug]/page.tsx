// app/projets/[slug]/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AiFillGithub } from "react-icons/ai";
import { getNextProject, getProject, projects } from "@/data/projects";
import StackChips from "@/components/projects/StackChips";
import Accented from "@/components/projects/Accented";
import ProjectShot from "@/components/projects/ProjectShot";
import WipBadge from "@/components/projects/WipBadge";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return {
    title: `${project.title}${project.titleAccent} — Jonas Pilloud`,
    description: project.detailLede,
    openGraph: project.cover.src
      ? { images: [{ url: project.cover.src }] }
      : undefined,
  };
}

const linkHover =
  "inline-block transition-transform duration-300 ease-in hover:-skew-x-6 hover:scale-105 hover:scale-y-125";

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const next = getNextProject(project.slug);

  return (
    <div className="mx-auto max-w-[1400px] px-5 pt-12 sm:px-12 lg:px-24">
      <Link
        href="/projets"
        className={`font-heading text-lg text-base-content/60 theme-nord:text-base-content/75 hover:text-primary ${linkHover}`}
      >
        {"// RETOUR AUX PROJETS"}
      </Link>

      <div className="mt-7 flex flex-wrap items-end justify-between gap-8">
        <div className="flex max-w-[820px] flex-col gap-3.5">
          <div className="flex flex-wrap items-center gap-4">
            <span className="font-sans text-sm font-bold uppercase tracking-widest text-base-content/55 theme-nord:text-base-content/75">
              {project.kicker}
            </span>
            {project.wip && <WipBadge />}
          </div>
          <h1 className="font-heading text-[clamp(48px,7vw,104px)] font-medium leading-[0.95]">
            {project.title}
            <span className="text-primary">{project.titleAccent}</span>
          </h1>
          <p className="font-hero text-[clamp(21px,2vw,30px)] leading-[1.3] text-base-content/85">
            <Accented text={project.detailLede} accent={project.detailLedeAccent} />
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-[52px] items-center gap-2 whitespace-nowrap rounded-[10px] bg-primary px-6 font-sans text-[17px] font-bold uppercase tracking-wider text-base-100 transition-colors hover:bg-base-content"
          >
            Voir le site ↗
          </a>
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-[52px] items-center gap-2 whitespace-nowrap rounded-[10px] border border-base-content/25 px-6 font-sans text-[17px] font-bold uppercase tracking-wider text-base-content transition-colors hover:border-primary hover:text-primary"
            >
              <AiFillGithub size={20} />
              Code
            </a>
          )}
        </div>
      </div>

      <div className="my-10 h-0.5 w-full bg-base-content/10" />

      <div className="relative aspect-video w-full overflow-hidden rounded-[28px] border-2 border-base-content">
        <ProjectShot src={project.cover.src} alt={project.cover.alt} sizes="100vw" />
      </div>

      <div className="mt-16 flex flex-wrap items-start gap-10 md:gap-20">
        <div className="flex min-w-0 md:min-w-[320px] flex-1 basis-[520px] flex-col gap-14">
          <section className="flex flex-col gap-4">
            <h2 className="font-sans text-sm font-bold uppercase tracking-[.18em] text-primary">
              Contexte
            </h2>
            {project.context.map((paragraph, i) => (
              <p
                key={i}
                className="text-justify font-sans text-[clamp(18px,1.4vw,22px)] leading-snug text-base-content/85"
              >
                {paragraph}
              </p>
            ))}
          </section>

          <section className="flex flex-col gap-6">
            <h2 className="font-sans text-sm font-bold uppercase tracking-[.18em] text-primary">
              Ce qui a été construit
            </h2>
            {project.built.map((item, i) => (
              <div
                key={item.title}
                className="flex items-start gap-5 border-b border-base-content/10 pb-6"
              >
                <span className="min-w-[32px] font-heading text-xl font-bold text-primary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex flex-col gap-1.5">
                  <h3 className="font-heading text-[clamp(24px,2.2vw,32px)] font-medium leading-tight">
                    {item.title}
                  </h3>
                  <p className="font-sans text-[clamp(17px,1.3vw,20px)] leading-snug text-base-content/75">
                    {item.body}
                  </p>
                </div>
              </div>
            ))}
          </section>

          <section className="flex flex-col gap-5">
            <h2 className="font-sans text-sm font-bold uppercase tracking-[.18em] text-primary">
              Galerie
            </h2>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-4">
              {project.gallery.map((shot) => (
                <div
                  key={shot.id}
                  className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-base-content/25"
                >
                  <ProjectShot src={shot.src} alt={shot.alt} sizes="(min-width: 768px) 25vw, 50vw" />
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="sticky top-24 flex min-w-0 md:min-w-[280px] flex-initial basis-[340px] flex-col rounded-[28px] border border-base-300 bg-base-200 p-7">
          <div className="flex flex-col gap-1 border-b border-base-content/10 pb-[18px]">
            <h6 className="font-sans text-[13px] font-bold uppercase tracking-[.16em] text-base-content/50 theme-nord:text-base-content/75">
              Client
            </h6>
            <p className="font-sans text-lg">{project.client}</p>
          </div>
          <div className="flex flex-col gap-1 border-b border-base-content/10 py-[18px]">
            <h6 className="font-sans text-[13px] font-bold uppercase tracking-[.16em] text-base-content/50 theme-nord:text-base-content/75">
              Année
            </h6>
            <p className="font-sans text-lg">{project.year}</p>
          </div>
          <div className="flex flex-col gap-1 border-b border-base-content/10 py-[18px]">
            <h6 className="font-sans text-[13px] font-bold uppercase tracking-[.16em] text-base-content/50 theme-nord:text-base-content/75">
              Mon rôle
            </h6>
            <p className="font-sans text-lg">{project.role}</p>
          </div>
          <div className="flex flex-col gap-2.5 border-b border-base-content/10 py-[18px]">
            <h6 className="font-sans text-[13px] font-bold uppercase tracking-[.16em] text-base-content/50 theme-nord:text-base-content/75">
              Stack
            </h6>
            <StackChips items={project.stack} />
          </div>
          <div className="flex flex-col gap-2 pt-[18px]">
            <h6 className="font-sans text-[13px] font-bold uppercase tracking-[.16em] text-base-content/50 theme-nord:text-base-content/75">
              Liens
            </h6>
            <a href={project.url} target="_blank" rel="noopener noreferrer" className="font-sans text-lg font-semibold hover:text-primary">
              {project.host} ↗
            </a>
            {project.repo && (
              <a href={project.repo} target="_blank" rel="noopener noreferrer" className="font-sans text-lg font-semibold hover:text-primary">
                Dépôt GitHub ↗
              </a>
            )}
          </div>
        </aside>
      </div>

      <Link
        href={`/projets/${next.slug}`}
        className="mt-24 flex flex-wrap items-center justify-between gap-6 rounded-[32px] border border-base-300 bg-base-200 p-9 transition-colors duration-[400ms] hover:border-primary"
      >
        <div className="flex flex-col gap-1.5">
          <span className="font-sans text-sm font-bold uppercase tracking-[.16em] text-base-content/50 theme-nord:text-base-content/75">
            Projet suivant
          </span>
          <span className="font-heading text-[clamp(28px,3vw,44px)] font-medium leading-none">
            {next.title}
            <span className="text-primary">{next.titleAccent}</span>
          </span>
        </div>
        <span className="whitespace-nowrap font-heading text-[clamp(18px,1.6vw,24px)] font-medium text-primary">
          {"// VOIR LE PROJET"}
        </span>
      </Link>
    </div>
  );
}
