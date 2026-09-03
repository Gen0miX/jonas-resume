# Section Projets (home + index + détail) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the "En construction" placeholder in the home Projects section with a real projects showcase (3 delivered sites), add a `/projets` index page and a shared `/projets/[slug]` detail page, matching the Claude Design handoff pixel-for-pixel while using this project's DaisyUI semantic classes (so both `dark` and `nord` themes work) and its existing motion/hover conventions.

**Architecture:** One typed data file (`data/projects.ts`) feeds three consumers: the home `Projects` section, the `/projets` index grid, and a single parametrized `/projets/[slug]` detail page (`generateStaticParams` + `generateMetadata`). Shared presentational atoms (`StackChips`, `WipBadge`, `Accented`, `ProjectShot`, `ProjectCard`) live in `components/projects/` and are reused across all three screens, mirroring the site's existing pattern of small composable section components. No test framework exists in this repo (no jest/vitest/RTL in `package.json`) — verification is scoped lint/type-check of the files this plan touches, `npm run dev` + manual browser checks in both themes at mobile/tablet/desktop widths, per this project's standing convention for UI work. See the baseline note below on why whole-repo `npm run build` is not used as a gate.

**Tech Stack:** Next.js App Router, TypeScript, Tailwind + DaisyUI (`dark` / `nord` themes), framer-motion, react-icons (`AiFillGithub`).

**Spec:** `designs/design_handoff_projets/README.md` (+ the five `.dc.html` reference files in that folder)

## Global Constraints

- Use DaisyUI semantic classes only (`bg-base-100/200/300`, `text-base-content`, `text-primary`, `border-base-300`) — never hardcode the prototype's hex values, so `nord` (light) renders correctly too.
- Reuse the existing skew-hover convention exactly: `transition-transform duration-300 ease-in hover:-skew-x-6 hover:scale-105 hover:scale-y-125` (see `components/ProjectLink.tsx`, `components/Footer.tsx`) for every `// LABEL` style link — do not reinvent it.
- Reuse the existing image-frame convention: `border-2 border-base-content` + rounded corners (see `components/sections/AboutMe.tsx`, `components/sections/Hero.tsx`) for cover images.
- Fonts are already loaded in `app/layout.tsx` as CSS vars: `font-heading` = Merchant VF, `font-sans` = Darker Grotesque, `font-hero` = EB Garamond. Use these Tailwind font utilities, never inline `font-family`.
- No real project screenshots exist yet (confirmed: `designs/design_handoff_projets/assets/` has fonts only, no images; `public/images/projects/mockup_project_*.png` are unrelated generic laptop-mockup renders already unused elsewhere in the codebase — do not repurpose them as fake screenshots of these three sites). Build a placeholder-aware image component instead (Task 3) so the feature works today and real screenshots can be dropped in later purely via `data/projects.ts` edits.
- Data fidelity: reproduce copy verbatim from the `.dc.html` files. Where the prototype's "stack chips" differ between the home/index card and the detail sidebar (e.g. Avena39 home card omits "Vercel", Tsabloz home card says "Auth" but sidebar says "Auth par mot de passe"), the README itself flags stack/role as unconfirmed placeholders to validate later — so this plan uses one authoritative `stack` array per project (the more complete sidebar version) rendered identically everywhere, rather than maintaining two parallel lists for data that's already marked provisional.
- All three detail pages share **one** component parametrized by data — never duplicate the JSX per project.
- The installed Next.js version is **15.3.1** (confirmed via `node_modules/next/package.json` in this worktree — not the `^16.3.4` an uncommitted, unrelated edit on `master` bumps `package.json` to; that upgrade is a separate in-progress effort by the project owner and out of scope here). Next 15 made route params async: `page.tsx`'s `params` prop is `Promise<{ slug: string }>`, not a plain object — it must be awaited in `generateMetadata` and in the page component before use. Task 9's code below already reflects this; if any implementer or reviewer sees non-Promise `params` destructuring in a dynamic route, that's a bug, not a stylistic choice.
- `ThemeToggleButton` (used inside the shared `Header`) requires `ThemeContext`'s `ThemeProvider` as an ancestor — any new route that renders `Header` must be wrapped in `ThemeProvider` (the home page gets this via `AppJP`; the new `/projets` routes do not, and must add it explicitly — see Task 7).
- **Baseline note — do not chase a whole-repo green `npm run build`.** On the committed baseline, before any task in this plan touches a file, `npm run build` already fails: `eslint-config-next`'s currently-pinned rules (`react/jsx-no-comment-textnodes`, `react-hooks/set-state-in-effect`, `react/no-unescaped-entities`) fail as build-blocking errors on pre-existing, unrelated files — `Header.tsx`, `Hero.tsx`, `SectionTitle.tsx`, `CTitle.tsx`, `AboutMe.tsx`, `app/page.tsx`. (One additional pre-existing bug, a function-hoisting error in `SpotlightCard.tsx` that fully halted the build before it reached any lint pass, was fixed as a standalone baseline-repair commit prior to Task 1 — that fix is real and unrelated to this feature, not a workaround.) Fixing the remaining unrelated lint debt across those files is out of scope for this plan. Consequences:
  - Any task step below that says "Run `npm run build` … Expected: build succeeds" should instead be read as: run `npx eslint <files this task created/modified>` (zero errors in those files) and `npx tsc --noEmit` (zero *new* errors — the baseline already has 7 pre-existing `Cannot find module '...png'/'...svg'` errors from static image imports across `AboutMe.tsx`/`Hero.tsx`/`Skills.tsx`, caused by `next-env.d.ts` not existing outside a `next dev`/`next build` run; these are not real and are not ours to fix).
  - Task 9's "confirm `/projets/*` are prerendered as SSG routes" and Task 10's full `npm run build` step are **not achievable** without fixing unrelated files. Treat them as: confirm via `npm run dev` that all three detail routes render correctly instead (SSG-vs-dynamic is not visually observable in dev mode, but `generateStaticParams` being present and correct is verifiable by reading the code, which the task reviewer does).
  - If `Header.tsx` (touched by Task 6) or `SectionTitle.tsx` (imported unchanged by Task 5) show pre-existing lint errors in the scoped `npx eslint` run, that's expected baseline noise for lines this plan did not add — confirm via `git diff` that the flagged line predates this plan's changes before treating it as a regression.

---

## Task 1: Project data model

**Files:**
- Create: `data/projects.ts`

**Interfaces:**
- Produces: `Project` type, `ProjectBuiltItem` type, `ProjectGalleryItem` type, `projects: Project[]` (ordered Avena39 → Les Tsabloz → æncrage — this order drives numbering and the cyclic "next project" chain), `getProject(slug: string): Project | undefined`, `getNextProject(slug: string): Project` (cyclic).

- [ ] **Step 1: Write the data file**

```ts
// data/projects.ts
export type ProjectBuiltItem = { title: string; body: string };
export type ProjectGalleryItem = { id: string; alt: string; src?: string };

export type Project = {
  slug: string;
  title: string;
  titleAccent: string;
  kicker: string;
  meta: string;
  lede: string;
  ledeAccent: string;
  summary: string;
  detailLede: string;
  detailLedeAccent: string;
  url: string;
  host: string;
  repo?: string;
  client: string;
  year: string;
  role: string;
  stack: string[];
  wip?: boolean;
  context: string[];
  built: ProjectBuiltItem[];
  gallery: ProjectGalleryItem[];
  cover: { src?: string; alt: string };
};

export const projects: Project[] = [
  {
    slug: "avena39",
    title: "Avena",
    titleAccent: "39",
    kicker: "Projet 01 — Site vitrine & réservation",
    meta: "Mandat indépendant · 2025",
    lede: "Site vitrine et réservation d'un appartement de vacances à Saas-Fee.",
    ledeAccent: "réservation",
    summary:
      "Galerie d'images optimisées, fiche équipements, carte Google Maps embarquée et tunnel de réservation avec calendrier de disponibilités et sélection de période.",
    detailLede:
      "Louer un appartement de vacances à Saas-Fee sans intermédiaire : vitrine, disponibilités et demande de réservation sur un seul site.",
    detailLedeAccent: "sans intermédiaire",
    url: "https://www.avena39.ch/",
    host: "avena39.ch",
    repo: "https://github.com/Gen0miX",
    client: "Propriétaires privés, Saas-Fee (VS)",
    year: "2025",
    role: "Conception, design et développement fullstack. Mise en production et maintenance.",
    stack: ["Next.js", "TypeScript", "Tailwind", "Maps API", "Vercel"],
    context: [
      "Les propriétaires d'un appartement à Untere Dorfstrasse 39, au cœur de la station piétonne de Saas-Fee, dépendaient entièrement des plateformes de location. Objectif du mandat : un site en propre qui présente le logement, affiche les disponibilités et capte les demandes de réservation en direct.",
      "J'ai pris le mandat de bout en bout : structure du contenu, design, développement front et back, mise en production et suivi.",
    ],
    built: [
      {
        title: "Galerie et fiche logement",
        body: "Images servies en WebP via next/image avec tailles responsives et chargement différé. Fiche structurée : capacité, chambres, salle de bain, liste d'équipements.",
      },
      {
        title: "Calendrier de disponibilités",
        body: "Sélection d'une période et du nombre de voyageurs, contrôle des dates déjà réservées, envoi de la demande au propriétaire.",
      },
      {
        title: "Localisation & référencement",
        body: "Carte Google Maps embarquée, contenus rédigés pour les recherches « location appartement Saas-Fee », métadonnées et rendu serveur pour l'indexation.",
      },
    ],
    gallery: [
      { id: "avena-g1", alt: "Galerie du logement" },
      { id: "avena-g2", alt: "Fiche équipements" },
      { id: "avena-g3", alt: "Tunnel de réservation" },
      { id: "avena-g4", alt: "Vue mobile" },
    ],
    cover: { alt: "Capture d'écran — avena39.ch (page d'accueil)" },
  },
  {
    slug: "les-tsabloz",
    title: "Les ",
    titleAccent: "Tsabloz",
    kicker: "Projet 02 — Plateforme de réservation privée",
    meta: "Mandat indépendant · 2026",
    lede: "Plateforme de réservation privée pour un mayen près de Vercorin.",
    ledeAccent: "privée",
    summary:
      "Accès protégé par mot de passe partagé, calendrier de réservation pour la famille et les amis, back-office admin pour gérer les périodes et les demandes.",
    detailLede:
      "Un vieux mayen perché près de Vercorin, rien que pour la famille et les amis : accès par mot de passe, calendrier partagé, gestion en autonomie.",
    detailLedeAccent: "rien que pour la famille et les amis",
    url: "https://www.lestsabloz.ch/",
    host: "lestsabloz.ch",
    repo: "https://github.com/Gen0miX",
    client: "Propriétaires privés, Vercorin (VS)",
    year: "2026 — v1 en ligne",
    role: "Conception, design, développement fullstack et mise en production.",
    stack: ["Next.js", "TypeScript", "Tailwind", "Auth par mot de passe", "Vercel"],
    context: [
      "Un mayen familial à 1 211 m d'altitude, au-dessus de Vercorin dans le Val d'Anniviers, se prêtait mal aux outils de réservation grand public : le chalet n'est pas loué, il circule entre proches. Les demandes passaient par messages, sans vue d'ensemble des semaines déjà prises.",
      "Le mandat portait sur une plateforme fermée : une porte d'entrée unique protégée par un mot de passe transmis de main en main, un calendrier partagé derrière, et un espace d'administration pour l'hôte. Conception, design et développement de bout en bout.",
    ],
    built: [
      {
        title: "Accès privé par mot de passe",
        body: "Page d'entrée unique — « Saisis le mot de passe qui t'a été transmis » — validée côté serveur, session conservée ensuite. Aucune page publique en dehors de l'écran d'accueil, aucune indexation.",
      },
      {
        title: "Calendrier de réservation partagé",
        body: "Vue des périodes déjà réservées et pose d'une demande sur une plage de dates. Le calendrier fait référence pour tout le cercle familial.",
      },
      {
        title: "Espace d'administration",
        body: "Route /admin séparée : l'hôte valide ou refuse les demandes, bloque des périodes et garde la main sur le contenu, sans passer par le code.",
      },
    ],
    gallery: [
      { id: "tsabloz-g1", alt: "Écran d'entrée et mot de passe" },
      { id: "tsabloz-g2", alt: "Calendrier de réservation" },
      { id: "tsabloz-g3", alt: "Formulaire de demande" },
      { id: "tsabloz-g4", alt: "Back-office admin" },
    ],
    cover: { alt: "Capture d'écran — lestsabloz.ch (écran d'accès)" },
  },
  {
    slug: "aencrage",
    title: "Fondation ",
    titleAccent: "æncrage",
    kicker: "Projet 03 — Archives et site institutionnel",
    meta: "Mandat indépendant · 2026",
    wip: true,
    lede: "Archives vivantes du patrimoine oral et écrit de Mase.",
    ledeAccent: "vivantes",
    summary:
      "Catalogue de fonds d'archives classé par thématique, rubrique « fond du mois » éditorialisée, formulaire de dépôt de fonds. Contenu piloté par un CMS headless.",
    detailLede:
      "Sauvegarder la mémoire d'un village, écrite et racontée : le site de la fondation qui rassemble le patrimoine oral et écrit de Mase.",
    detailLedeAccent: "écrite et racontée",
    url: "https://aencrage.vercel.app/",
    host: "aencrage.vercel.app",
    repo: "https://github.com/Gen0miX",
    client: "Fondation æncrage, Mase (VS)",
    year: "2026 — en cours",
    role: "Conception, design, développement fullstack, modélisation du contenu dans le CMS.",
    stack: ["Next.js", "TypeScript", "Tailwind", "Sanity CMS", "Vercel"],
    context: [
      "La Fondation æncrage, créée à l'initiative d'Annette Corbaz, rassemble et met en valeur le patrimoine immatériel de la société masatte : correspondances, textes officiels, travaux de recherche, articles de presse, émissions radio-tv, photographies, films, témoignages et portraits.",
      "Le site doit tenir deux rôles à la fois : présenter la fondation et ses missions à ses soutiens, et servir de catalogue consultable pour des fonds d'archives qui s'ajoutent en continu. D'où un contenu entièrement piloté depuis un CMS, que la fondation alimente sans moi.",
    ],
    built: [
      {
        title: "Catalogue de fonds par thématique",
        body: "Onze thématiques regroupées en trois familles — vie sociale, patrimoine et territoire, culture et mémoire — chacune avec sa page de fonds, plus la liste complète du catalogue.",
      },
      {
        title: "Fond du mois éditorialisé",
        body: "Une pièce des archives mise en avant chaque mois avec son commentaire, sa datation et ses médias, publiée depuis Sanity par la fondation.",
      },
      {
        title: "Dépôt de fonds et soutien",
        body: "Parcours de dépôt pour confier des archives privées liées à Mase, et page de soutien par virement bancaire ou TWINT.",
      },
    ],
    gallery: [
      { id: "aencrage-g1", alt: "Page d'accueil" },
      { id: "aencrage-g2", alt: "Navigation par thématiques" },
      { id: "aencrage-g3", alt: "Fiche « fond du mois »" },
      { id: "aencrage-g4", alt: "Parcours de dépôt" },
    ],
    cover: { alt: "Capture d'écran — aencrage (page d'accueil)" },
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getNextProject(slug: string): Project {
  const index = projects.findIndex((p) => p.slug === slug);
  return projects[(index + 1) % projects.length];
}
```

- [ ] **Step 2: Verify it type-checks**

Run: `npx tsc --noEmit`
Expected: no errors referencing `data/projects.ts`.

- [ ] **Step 3: Commit**

```bash
git add data/projects.ts
git commit -m "feat(projects): add typed project data source"
```

---

## Task 2: Shared small atoms — StackChips, WipBadge, Accented

**Files:**
- Create: `components/projects/StackChips.tsx`
- Create: `components/projects/WipBadge.tsx`
- Create: `components/projects/Accented.tsx`

**Interfaces:**
- Consumes: nothing (pure presentational, no dependency on Task 1).
- Produces: `StackChips({ items: string[], className? })`, `WipBadge({ className? })`, `Accented({ text: string, accent: string, className? })` — `Accented` splits `text` on the first occurrence of `accent` and wraps that substring in `<span className="text-primary italic">`; if `accent` isn't found in `text`, it renders `text` unchanged (no throw).

- [ ] **Step 1: `StackChips`**

```tsx
// components/projects/StackChips.tsx
type Props = { items: string[]; className?: string };

export default function StackChips({ items, className }: Props) {
  return (
    <div className={`flex flex-wrap gap-2 ${className ?? ""}`}>
      {items.map((item) => (
        <span
          key={item}
          className="inline-block rounded-full border border-base-content/20 px-3 py-1 font-sans text-sm font-bold uppercase tracking-wider text-base-content/80"
        >
          {item}
        </span>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: `WipBadge`**

```tsx
// components/projects/WipBadge.tsx
type Props = { className?: string };

export default function WipBadge({ className }: Props) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-primary px-3 py-[3px] font-sans text-[14px] font-bold uppercase tracking-widest text-primary ${
        className ?? ""
      }`}
    >
      <span className="inline-block h-[7px] w-[7px] rounded-full bg-primary" />
      En cours
    </span>
  );
}
```

- [ ] **Step 3: `Accented`**

```tsx
// components/projects/Accented.tsx
type Props = { text: string; accent: string; className?: string };

export default function Accented({ text, accent, className }: Props) {
  const index = accent ? text.indexOf(accent) : -1;
  if (index === -1) return <>{text}</>;

  const before = text.slice(0, index);
  const after = text.slice(index + accent.length);

  return (
    <>
      {before}
      <span className={className ?? "text-primary italic"}>{accent}</span>
      {after}
    </>
  );
}
```

- [ ] **Step 4: Verify it type-checks and lints**

Run: `npx tsc --noEmit && npx eslint components/projects/StackChips.tsx components/projects/WipBadge.tsx components/projects/Accented.tsx`
Expected: zero errors. (Use scoped `npx eslint` on just these files, not `npm run lint` — the whole repo already fails lint for unrelated pre-existing reasons; see the Global Constraints baseline note.)

- [ ] **Step 5: Commit**

```bash
git add components/projects/StackChips.tsx components/projects/WipBadge.tsx components/projects/Accented.tsx
git commit -m "feat(projects): add StackChips, WipBadge and Accented atoms"
```

---

## Task 3: Placeholder-aware project image — ProjectShot

**Files:**
- Create: `components/projects/ProjectShot.tsx`

**Interfaces:**
- Consumes: nothing new.
- Produces: `ProjectShot({ src?: string, alt: string, sizes: string, className? })`. Parent element is expected to set `aspect-ratio`, border and `overflow-hidden` (matches the prototype's frame-then-fill pattern already used by `AboutMe`/`Hero`); `ProjectShot` itself just fills that box — with `next/image` when `src` is given, or a labeled placeholder block when it isn't.

- [ ] **Step 1: Write the component**

```tsx
// components/projects/ProjectShot.tsx
import Image from "next/image";

type Props = {
  src?: string;
  alt: string;
  sizes: string;
  className?: string;
};

export default function ProjectShot({ src, alt, sizes, className }: Props) {
  if (src) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className={`object-cover ${className ?? ""}`}
      />
    );
  }

  return (
    <div
      className={`flex h-full w-full items-center justify-center border border-dashed border-base-content/25 bg-base-300/40 p-4 text-center font-sans text-sm text-base-content/50 ${
        className ?? ""
      }`}
    >
      {alt}
    </div>
  );
}
```

- [ ] **Step 2: Verify it type-checks**

Run: `npx tsc --noEmit`
Expected: no errors. Note `fill` requires the parent to be `position: relative` — this is called out again in Task 4/8/9 where `ProjectShot` is wrapped in a `relative` frame div.

- [ ] **Step 3: Commit**

```bash
git add components/projects/ProjectShot.tsx
git commit -m "feat(projects): add placeholder-aware ProjectShot image component"
```

---

## Task 4: ProjectCard (home + index variants)

**Files:**
- Create: `components/projects/ProjectCard.tsx`

**Interfaces:**
- Consumes: `Project` type from `data/projects.ts` (Task 1), `StackChips`/`WipBadge`/`Accented` (Task 2), `ProjectShot` (Task 3).
- Produces: `ProjectCard({ project: Project, index: number, variant: "home" | "index" })`.

- [ ] **Step 1: Write the component**

```tsx
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
```

- [ ] **Step 2: Verify it type-checks**

Run: `npx tsc --noEmit`
Expected: no errors in `components/projects/ProjectCard.tsx`. On the index variant, `StackChips` sits directly under the lede with `mt-auto` so it (and everything below it) gets pushed to the bottom of the card regardless of text length, and the `// VOIR LE PROJET` / external-link-icon row is the last element, right after it — confirm this visually once Task 8 renders real cards.

- [ ] **Step 3: Commit**

```bash
git add components/projects/ProjectCard.tsx
git commit -m "feat(projects): add ProjectCard (home and index variants)"
```

---

## Task 5: Home Projects section

**Files:**
- Modify: `components/sections/Projects.tsx` (full rewrite)

**Interfaces:**
- Consumes: `projects` from `data/projects.ts` (Task 1), `ProjectCard` (Task 4), existing `SectionTitle` (`components/SectionTitle.tsx`, unchanged).
- Produces: default export `Projects()`, still mounted at `id="projects"` (kept — `Hero.tsx` and `Header.tsx` already link to `#projects`).

- [ ] **Step 1: Rewrite the section**

```tsx
// components/sections/Projects.tsx
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
```

- [ ] **Step 2: Start the dev server and check the home page**

Run: `npm run dev`, open `http://localhost:3000`, scroll to the Projets section.
Expected: three cards render (Avena39, Les Tsabloz with reversed image side, æncrage with "En cours" badge), each fading/sliding in as it scrolls into view, "// TOUS LES PROJETS" skews on hover.

- [ ] **Step 3: Commit**

```bash
git add components/sections/Projects.tsx
git commit -m "feat(projects): wire real project data into the home Projects section"
```

---

## Task 6: Header — active "// PROJETS" entry that works off the home page

**Files:**
- Modify: `components/Header.tsx`

**Interfaces:**
- Consumes: `usePathname` from `next/navigation`.
- Produces: same default export `Header()`, now `"use client"` explicitly and path-aware. Behavior: on `/` the four nav items keep their in-page anchors (`#about-me`, `#career`, `#skills`, `#projects`) exactly as today; on any other route (`/projets`, `/projets/[slug]`, …) the first three become `/#about-me`, `/#career`, `/#skills` (so they navigate home then jump), and `PROJETS` becomes `/projets` and renders in `text-primary` to mark it active.

- [ ] **Step 1: Add the path-aware href/active logic**

```tsx
// components/Header.tsx
"use client";

import React, { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggleButton from "./ThemeToggleButton";
import CVDownloadButton from "./cv/CVDownloadButton";

interface Props {
  children?: ReactNode;
  href: string;
  active?: boolean;
}

function NavItemHeader({ children, href, active, ...props }: Props) {
  return (
    <li className="text-lg antialiased font-medium font-heading lg:text-xl">
      <Link href={href} className={active ? "text-primary" : ""}>
        <span className="">//</span>
        {children}
      </Link>
    </li>
  );
}

export default function Header() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const onProjects = pathname?.startsWith("/projets") ?? false;

  const homeHref = (anchor: string) => (onHome ? `#${anchor}` : `/#${anchor}`);
  const navItems = [
    { key: "about-me", label: "À PROPOS" },
    { key: "career", label: "CARRIÈRE" },
    { key: "skills", label: "CAPACITÉS" },
  ] as const;

  return (
    <div className="navbar bg-base-200">
      <div className="ml-3 navbar-start">
        <Link
          href="/"
          className="flex flex-col justify-end p-0 m-0 text-xl leading-none transition-transform duration-200 ease-in font-heading hover:-skew-x-6 hover:scale-105 hover:scale-y-125"
        >
          <span className="font-bold">Jonas</span>{" "}
          <span className="ml-2 font-extralight">Pilloud</span>
        </Link>
      </div>
      <div className="navbar-center">
        <div className="dropdown dropdown-bottom lg:hidden">
          <div
            tabIndex={0}
            role="button"
            className="m-1 text-xl antialiased font-normal border-none btn rounded-box font-heading bg-base-300"
          >
            // MENU
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-200 rounded-box z-[1] w-52 p-2 shadow"
          >
            {navItems.map((item) => (
              <NavItemHeader key={item.key} href={homeHref(item.key)}>
                {item.label}
              </NavItemHeader>
            ))}
            <NavItemHeader href={onHome ? "#projects" : "/projets"} active={onProjects}>
              PROJETS
            </NavItemHeader>
          </ul>
        </div>
        <ul className="hidden px-1 menu menu-xl menu-horizontal lg:flex">
          {navItems.map((item) => (
            <NavItemHeader key={item.key} href={homeHref(item.key)}>
              {item.label}
            </NavItemHeader>
          ))}
          <NavItemHeader href={onHome ? "#projects" : "/projets"} active={onProjects}>
            PROJETS
          </NavItemHeader>
        </ul>
      </div>
      <div className="mr-0 sm:mr-3 navbar-end">
        <ul className="ml-auto mr-0 px-0 menu menu-sm menu-horizontal bg-base-300 rounded-box">
          <li>
            <ThemeToggleButton iconSize={20} />
          </li>
          <li>
            <CVDownloadButton iconSize={20} className="text-primary" />
          </li>
        </ul>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify the home page nav still works**

Run: `npm run dev`, open `/`, click each nav item (mobile dropdown at <1024px width and desktop menu at ≥1024px).
Expected: anchors scroll to the matching section exactly as before this change (no regression from the `href={"#" + key}` → `homeHref(key)` refactor, since `onHome` is `true` on `/`).

- [ ] **Step 3: Commit**

```bash
git add components/Header.tsx
git commit -m "feat(header): make nav path-aware and highlight active PROJETS entry"
```

---

## Task 7: Layout wrapper for the /projets routes

**Files:**
- Create: `app/projets/layout.tsx`

**Interfaces:**
- Consumes: `ThemeProvider` (`components/ThemeContext.tsx`), `Header` (Task 6), `Footer` (`components/Footer.tsx`, unchanged).
- Produces: default export `ProjectsLayout({ children })`, applied by Next.js to both `/projets` and `/projets/[slug]`.

- [ ] **Step 1: Write the layout**

```tsx
// app/projets/layout.tsx
"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "@/components/ThemeContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ProjectsLayout({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <div className="sticky top-0 z-[900] bg-base-200">
        <Header />
      </div>
      {children}
      <Footer />
    </ThemeProvider>
  );
}
```

- [ ] **Step 2: Verify it type-checks**

Run: `npx tsc --noEmit`
Expected: no errors (there's nothing to render yet under `/projets` until Task 8, so this alone isn't browser-testable — confirmed together with Task 8's dev-server check).

- [ ] **Step 3: Commit**

```bash
git add app/projets/layout.tsx
git commit -m "feat(projects): add shared layout (theme + header + footer) for /projets routes"
```

---

## Task 8: `/projets` index page

**Files:**
- Create: `app/projets/page.tsx`

**Interfaces:**
- Consumes: `projects` from `data/projects.ts` (Task 1), `ProjectCard` variant `"index"` (Task 4), `ProjectsLayout` (Task 7, applied automatically by Next.js).
- Produces: default export `ProjectsIndexPage()`, plus a `metadata` export.

- [ ] **Step 1: Write the page**

```tsx
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
    <div className="mx-auto max-w-[1400px] px-5 pt-14 sm:px-12 lg:px-24">
      <Link
        href="/#projects"
        className="inline-block font-heading text-lg text-base-content/60 transition-transform duration-300 ease-in hover:-skew-x-6 hover:scale-105 hover:scale-y-125 hover:text-primary"
      >
        {"// RETOUR À L'ACCUEIL"}
      </Link>

      <div className="mt-6 flex flex-wrap items-end justify-between gap-8">
        <h1 className="font-heading text-[clamp(44px,6.5vw,96px)] font-normal leading-[0.95]">
          PROJETS
        </h1>
        <p className="max-w-[520px] font-sans text-lg font-medium leading-snug text-base-content/80 sm:text-xl">
          Trois sites livrés en mandat indépendant, du modèle de données à la
          mise en production. Next.js, TypeScript, Tailwind, déploiement
          continu sur Vercel.
        </p>
      </div>

      <div className="my-9 h-0.5 w-full bg-base-content/10" />

      <div className="grid grid-cols-[repeat(auto-fit,minmax(360px,1fr))] gap-6">
        {projects.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} variant="index" />
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
```

- [ ] **Step 2: Verify in the browser**

Run: `npm run dev`, open `/projets`.
Expected: back link, `PROJETS` heading + chapô, 3-column grid (collapsing per viewport width — verified for real in Task 10), contact block at the bottom. Click a card → navigates to `/projets/avena39` (404 expected until Task 9).

- [ ] **Step 3: Commit**

```bash
git add app/projets/page.tsx
git commit -m "feat(projects): add /projets index page"
```

---

## Task 9: `/projets/[slug]` detail page

**Files:**
- Create: `app/projets/[slug]/page.tsx`

**Interfaces:**
- Consumes: `getProject`, `getNextProject`, `projects` from `data/projects.ts` (Task 1); `StackChips`, `Accented`, `ProjectShot` (Tasks 2–3); `AiFillGithub` from `react-icons/ai` (already a project dependency, used in `Footer.tsx`).
- Produces: default export `ProjectDetailPage`, `generateStaticParams`, `generateMetadata`.

- [ ] **Step 1: Write the page**

```tsx
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
        className={`font-heading text-lg text-base-content/60 hover:text-primary ${linkHover}`}
      >
        {"// RETOUR AUX PROJETS"}
      </Link>

      <div className="mt-7 flex flex-wrap items-end justify-between gap-8">
        <div className="flex max-w-[820px] flex-col gap-3.5">
          <div className="flex flex-wrap items-center gap-4">
            <span className="font-sans text-sm font-bold uppercase tracking-widest text-base-content/55">
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
        <div className="flex min-w-[320px] flex-1 basis-[520px] flex-col gap-14">
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

        <aside className="sticky top-24 flex min-w-[280px] flex-1 basis-[340px] flex-col rounded-[28px] border border-base-300 bg-base-200 p-7">
          <div className="flex flex-col gap-1 border-b border-base-content/10 pb-4.5">
            <h6 className="font-sans text-[13px] font-bold uppercase tracking-[.16em] text-base-content/50">
              Client
            </h6>
            <p className="font-sans text-lg">{project.client}</p>
          </div>
          <div className="flex flex-col gap-1 border-b border-base-content/10 py-4.5">
            <h6 className="font-sans text-[13px] font-bold uppercase tracking-[.16em] text-base-content/50">
              Année
            </h6>
            <p className="font-sans text-lg">{project.year}</p>
          </div>
          <div className="flex flex-col gap-1 border-b border-base-content/10 py-4.5">
            <h6 className="font-sans text-[13px] font-bold uppercase tracking-[.16em] text-base-content/50">
              Mon rôle
            </h6>
            <p className="font-sans text-lg">{project.role}</p>
          </div>
          <div className="flex flex-col gap-2.5 border-b border-base-content/10 py-4.5">
            <h6 className="font-sans text-[13px] font-bold uppercase tracking-[.16em] text-base-content/50">
              Stack
            </h6>
            <StackChips items={project.stack} />
          </div>
          <div className="flex flex-col gap-2 pt-4.5">
            <h6 className="font-sans text-[13px] font-bold uppercase tracking-[.16em] text-base-content/50">
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
          <span className="font-sans text-sm font-bold uppercase tracking-[.16em] text-base-content/50">
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
```

- [ ] **Step 2: Verify in the browser**

Run: `npm run dev`, open `/projets/avena39`, `/projets/les-tsabloz`, `/projets/aencrage`, and `/projets/does-not-exist`.
Expected: each real slug renders full content (context, 3 built items, 4 placeholder gallery tiles, sidebar, next-project card cycling Avena39 → Tsabloz → æncrage → Avena39); the aencrage page shows the "En cours" badge next to the kicker; the unknown slug renders the Next.js `not-found` page (404).

- [ ] **Step 3: Scoped check (not a full `npm run build`)**

The committed baseline already fails a whole-repo `npm run build` for reasons unrelated to this feature (pre-existing lint errors in `Header.tsx`, `Hero.tsx`, `SectionTitle.tsx`, `CTitle.tsx`, `AboutMe.tsx`, `app/page.tsx` — not files this task touches). Do not chase that; instead run:
`npx eslint app/projets/[slug]/page.tsx`
Expected: zero errors. Then re-read `generateStaticParams` in the file you just wrote and confirm it returns exactly the three slugs (`avena39`, `les-tsabloz`, `aencrage`) — that's what makes these routes static at build time; there is no separate build step needed to confirm it.

- [ ] **Step 4: Commit**

```bash
git add app/projets/[slug]/page.tsx
git commit -m "feat(projects): add /projets/[slug] detail page"
```

---

## Task 10: Responsive + theme verification pass

**Files:**
- Modify: whichever of the above files need small fixes found during this check (most likely `ProjectCard.tsx` mobile stacking, per the note below).

- [ ] **Step 1: Run the scoped static checks**

Run: `npx eslint data/projects.ts components/projects components/sections/Projects.tsx components/Header.tsx app/projets`
Expected: zero errors. (Do not run a whole-repo `npm run build`/`npm run lint` as the gate — see the Global Constraints baseline note: the committed baseline already fails those repo-wide for reasons unrelated to this feature. `npx tsc --noEmit` will also still show the 7 pre-existing image-import errors called out there; confirm no *new* ones appear beyond that known set.)

- [ ] **Step 2: Manual browser pass — desktop (≥1280px)**

Open `/`, `/projets`, `/projets/avena39` at a wide viewport, in both the `dark` and `nord` themes (use the existing theme toggle in the header — `ThemeToggleButton`).
Check: card borders, chip borders, and the `base-content/NN` opacity text (labels at `/50`, `/55`, `/60`) stay legible against `bg-base-200` in **both** themes — this is the one thing the prototype (dark-only) couldn't show. Fix any contrast issue by adjusting the opacity fraction on the affected `text-base-content/NN` class, not by hardcoding a color.

- [ ] **Step 3: Manual browser pass — mobile (~375px) and tablet (~768px)**

Using devtools device toolbar (or an actual narrow window):
- Home Projects section: cards stack to one column under ~740px. **Specifically confirm the Les Tsabloz card (the reversed one, `index === 1`)** still shows text above image, not image above text — `md:flex-row-reverse` in Task 4 only reverses at `md:` (768px) and above, so below that breakpoint `flex-wrap` alone determines order and the DOM order (text div first, image div second) already puts text first. If it renders image-first on mobile, add `flex-col` explicitly below `md` on the article (`flex-col md:flex-row md:flex-wrap`) so the reversed row-direction utility can't affect stacking order.
- `/projets` grid: 3 → 2 → 1 columns as the viewport narrows (via `auto-fit`/`minmax(360px,1fr)` — no manual breakpoint needed, just confirm visually).
- `/projets/[slug]`: sidebar moves below the main column and loses its `sticky` positioning on narrow viewports (this falls out of `flex-wrap` automatically since the aside is a flex child, not an independent sticky sibling of the viewport — confirm it visually rather than assuming).
- Footer row on index cards (`// VOIR LE PROJET` + icon button): confirm the label never wraps to two lines around 900px width — `whitespace-nowrap` in Task 4 should already prevent this.

- [ ] **Step 4: Fix anything found, then re-run Step 1**

If Step 2 or 3 surfaced a fix, apply it, then re-run Step 1's scoped `npx eslint` command (plus `npx tsc --noEmit`, checking only for *new* errors beyond the 7 known pre-existing ones) to confirm nothing broke.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "fix(projects): responsive and theme-contrast fixes from manual QA pass"
```

(Skip this commit if Step 2/3 found nothing to fix.)
