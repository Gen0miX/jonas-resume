# Sections Design Refresh (À propos / Carrière / Capacités / Contact) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild `#about-me`, `#career`, `#skills` and `#contact` to adopt the visual system already shipped in `components/sections/Projects.tsx` / `components/projects/ProjectCard.tsx` (section header + chapô/filet + `base-200`/`border-base-300` card with `hover:border-primary`), per the Claude Design handoff, while preserving every existing framer-motion animation and DaisyUI theme (`dark`/`nord`) support.

**Architecture:** Five small shared presentational primitives (`components/sections/shared/{SectionHeader,SectionLede,Card,MetaRow,SubTitle}.tsx`) are extracted once and reused by all four sections, mirroring the header/chapô/card/meta-row/subtitle patterns already live in `Projects.tsx` and `ProjectCard.tsx`. Career's nine timeline entries move out of JSX into a typed `data/career.ts` (same pattern as `data/projects.ts`). `ProgressBar.tsx` and `SpotlightCard.tsx` are restyled in place (same public contract, new classes) since they're reused by `Skills.tsx`. `CVDownloadButton.tsx` gains an optional `children` override so it can render as a text link in the new About-me header instead of only an icon. No new dependencies, no new routes, no data-fetching changes — this is a styling/markup refactor of four existing client components plus their shared sub-components.

**Tech Stack:** Next.js App Router (16.3.4), TypeScript, Tailwind + DaisyUI (`dark`/`nord` themes via `theme-nord:` variant), framer-motion, react-icons.

**Spec:** `designs/design_handoff_sections/README.md` (+ `designs/design_handoff_sections/Home - Sections revues.dc.html` as the pixel reference — `support.js`/`image-slot.js` are prototype-only tooling, not ported)

## Global Constraints

- **DaisyUI semantic classes only** — never hardcode the prototype's hex values (`#191e24`, `#A2BFFE`, `#2a323c`, `#EBF6F7`, …); use `bg-base-200`, `text-primary`, `border-base-300`, `text-base-content` etc. so `nord` (light) renders correctly. Mapping table is in the spec's "Design tokens" section.
- **Contrast rule for reduced-opacity text**: every `text-base-content/40`, `/50`, `/55` or `/60` utility must carry a paired `theme-nord:` override at roughly +15–20 points, matching the convention already shipped in `ProjectCard.tsx` / `app/projets/[slug]/page.tsx` (`text-base-content/55 theme-nord:text-base-content/75`, `text-base-content/60 theme-nord:text-base-content/75`). Apply: `/40→theme-nord:/60`, `/50→theme-nord:/75`, `/55→theme-nord:/75`, `/60→theme-nord:/75`. Same rule applies to bare `opacity-50`/`opacity-55` utilities (pair with `theme-nord:opacity-75`).
- **Skew-hover link convention**, reuse verbatim, never reinvent: `inline-block transition-transform duration-300 ease-in hover:-skew-x-6 hover:scale-105 hover:scale-y-125` (see `components/Footer.tsx`, `ProjectCard.tsx`).
- **External-link text convention**, reuse verbatim (already shipped in `ProjectCard.tsx`/`app/projets/[slug]/page.tsx`): `font-sans text-[17px] font-semibold uppercase tracking-wider text-base-content/60 theme-nord:text-base-content/75 transition-colors hover:text-base-content`.
- **Sub-title convention**, reuse verbatim (already shipped as the `h2` pattern in `app/projets/[slug]/page.tsx`): `font-sans text-sm font-bold uppercase tracking-[.18em] text-primary`. This is what the new shared `SubTitle` primitive wraps.
- **Image-frame convention**, reuse verbatim: `border-2 border-base-content` + rounded corners (see `AboutMe.tsx` today, `ProjectCard.tsx`).
- **Fonts already loaded** in `app/layout.tsx` as CSS vars — use the Tailwind utilities, never inline `font-family`: `font-heading` = Merchant VF, `font-sans` = Darker Grotesque, `font-hero` = EB Garamond.
- **Spacing translation rule**: the outer section wrapper, the header row, the chapô/filet block, and (except Career) the content-container gap are copied verbatim from the already-shipped `components/sections/Projects.tsx` (`px-5 md:px-0 mt-40 mb-10 xl:mx-32 2xl:mx-60 2xl:mb-20 2xl:mt-60 scroll-mt-32` for the section; `flex flex-wrap items-end justify-between gap-8 px-0 md:px-10` for the header row; `mt-5 flex flex-col items-center` + `max-w-[820px] text-center font-sans text-lg font-medium sm:text-xl` + `mt-7 mb-2 w-1/4 divider mx-auto` for the lede; `mt-10 flex flex-col gap-12 px-0 md:px-8` for the content container) — do **not** recompute these from the spec's `clamp()` values, `Projects.tsx` is the reference implementation of "the same skeleton." Every other spacing value (padding/gap inside cards, between card elements) that the spec expresses as `clamp(min,pref,max)` is transcribed as a literal Tailwind arbitrary value, e.g. `clamp(22px,2vw,32px)` → `p-[clamp(22px,2vw,32px)]`. A two-axis CSS `padding: Y X` shorthand becomes two Tailwind classes (`py-[Y] px-[X]`). Fixed pixel values become plain arbitrary values or the exact matching default scale step when one exists (16px = `gap-4`, 8px = `gap-2`, 44px = `w-11`).
- **Card radius**: 32px default, 28px for Career cards and the Capacités "bars" cards — implemented via the shared `Card` primitive's `radius` prop (`28 | 32`, default `32`).
- **Apostrophes**: use the typographic apostrophe `’` (U+2019) in all new JSX text content instead of the straight `'` — the straight quote trips `react/no-unescaped-entities` (confirmed present as baseline lint noise in the current `AboutMe.tsx`/`Career.tsx`); this sidesteps reintroducing it without needing `&apos;` escapes.
- **Animations**: reuse the existing named variants from `utils/animations.js` verbatim (`fadeInFromTop`, `fadeInFromL`, `fadeInFromR`, `fadeInFromBottom`, `fadeInFromLeftWDelay`, `divVariants`, `contentVariantsTop`, `contentVariantsBot`, `letterVariant`/`staggeredContainer` via `SectionTitle`) — do not add new variants. Every `useInView`/`IntersectionObserver` stays `once: true`. `SectionTitle`, `CursorFollower`, `PageTransition`, `AppJP.tsx`'s header show/hide are not touched.
- **Career categories** ("Expérience"/"Formation"/"Service civil") are a classification the design added, inferred from existing titles — implement as specified (they're needed for the visual layout), but this is flagged in the spec as "à valider avec Jonas," not a blocker.
- **No test framework** in this repo (no jest/vitest/RTL in `package.json`). Verification per task = `npx eslint <files touched>` (zero _new_ errors — compare against the baseline lint run below) + `npx tsc --noEmit` (zero new errors) + manual check via `npm run dev` in both themes (`dark`/`nord`, toggle via the header button) at mobile/tablet/desktop widths. Do not chase a whole-repo green `npm run build`.
- **Baseline lint note** (recorded 2026-09-01, before this plan's changes): `npx eslint components/sections/AboutMe.tsx components/sections/Career.tsx components/sections/Skills.tsx components/sections/Contact.tsx components/ProgressBar.tsx components/CTitle.tsx components/SectionTitle.tsx components/Header.tsx components/SpotlightCard.tsx` reports 14 errors / 3 warnings, all pre-existing: `react/no-unescaped-entities` on straight apostrophes in `AboutMe.tsx`/`Career.tsx` (this plan rewrites both files entirely, so these disappear as a side effect — not something to separately "fix"), `react-hooks/set-state-in-effect` in `CTitle.tsx`/`SectionTitle.tsx` (both reused unchanged, out of scope), `react/jsx-no-comment-textnodes` in `Header.tsx` (untouched, out of scope), and two `react-hooks/exhaustive-deps` warnings in `Career.tsx` on the `ref.current` IntersectionObserver cleanup (pre-existing pattern this plan's `CareerCard` reproduces identically — not a regression to fix here). If a scoped `eslint` run on a touched file still shows one of these on a line this plan didn't add, that's expected baseline noise, not a regression — confirm via `git diff`.

---

## Task 1: Shared section primitives

**Files:**

- Create: `components/sections/shared/SectionHeader.tsx`
- Create: `components/sections/shared/SectionLede.tsx`
- Create: `components/sections/shared/Card.tsx`
- Create: `components/sections/shared/MetaRow.tsx`
- Create: `components/sections/shared/SubTitle.tsx`

**Interfaces:**

- Produces: `SectionHeader({ title: string; right: ReactNode })`, `SectionLede({ children: string })`, `Card` (forwardRef `HTMLDivElement`, props = `ComponentPropsWithoutRef<typeof motion.div> & { radius?: 28 | 32 }`, default `radius=32`), `MetaRow({ number?: string; label?: string; className?: string; lineClassName?: string })`, `SubTitle({ children: ReactNode; className?: string })` — all default exports, all consumed by Tasks 4/5/8/9.

- [ ] **Step 1: Create `SectionHeader.tsx`**

```tsx
// components/sections/shared/SectionHeader.tsx
import { ReactNode } from "react";
import SectionTitle from "@/components/SectionTitle";

type Props = { title: string; right: ReactNode };

export default function SectionHeader({ title, right }: Props) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-8 px-0 md:px-10">
      <SectionTitle>{title}</SectionTitle>
      {right}
    </div>
  );
}
```

- [ ] **Step 2: Create `SectionLede.tsx`**

```tsx
// components/sections/shared/SectionLede.tsx
type Props = { children: string };

export default function SectionLede({ children }: Props) {
  return (
    <div className="mt-5 flex flex-col items-center">
      <p className="max-w-[820px] text-center font-sans text-lg font-medium sm:text-xl">
        {children}
      </p>
      <div className="mt-7 mb-2 w-1/4 divider mx-auto" />
    </div>
  );
}
```

- [ ] **Step 3: Create `Card.tsx`**

```tsx
// components/sections/shared/Card.tsx
"use client";

import clsx from "clsx";
import { motion } from "framer-motion";
import { forwardRef, type ComponentPropsWithoutRef } from "react";

type Props = ComponentPropsWithoutRef<typeof motion.div> & { radius?: 28 | 32 };

const Card = forwardRef<HTMLDivElement, Props>(function Card(
  { className, radius = 32, ...props },
  ref,
) {
  return (
    <motion.div
      ref={ref}
      className={clsx(
        radius === 28 ? "rounded-[28px]" : "rounded-[32px]",
        "border border-base-300 bg-base-200 transition-colors duration-[400ms] hover:border-primary",
        className,
      )}
      {...props}
    />
  );
});

export default Card;
```

- [ ] **Step 4: Create `MetaRow.tsx`**

```tsx
// components/sections/shared/MetaRow.tsx
import clsx from "clsx";

type Props = {
  number?: string;
  label?: string;
  className?: string;
  lineClassName?: string;
};

export default function MetaRow({
  number,
  label,
  className,
  lineClassName,
}: Props) {
  return (
    <div className={clsx("flex items-center gap-4", className)}>
      {number && (
        <span className="font-heading text-xl font-bold tracking-wider text-primary">
          {number}
        </span>
      )}
      <span
        className={clsx(
          "h-px max-w-[80px] flex-1 bg-base-content/[.18]",
          lineClassName,
        )}
      />
      {label && (
        <span className="font-sans text-sm font-bold uppercase tracking-widest text-base-content/55 theme-nord:text-base-content/75">
          {label}
        </span>
      )}
    </div>
  );
}
```

- [ ] **Step 5: Create `SubTitle.tsx`**

```tsx
// components/sections/shared/SubTitle.tsx
import clsx from "clsx";
import { ReactNode } from "react";

type Props = { children: ReactNode; className?: string };

export default function SubTitle({ children, className }: Props) {
  return (
    <h2
      className={clsx(
        "font-sans text-sm font-bold uppercase tracking-[.18em] text-primary",
        className,
      )}
    >
      {children}
    </h2>
  );
}
```

- [ ] **Step 6: Type-check and lint**

Run: `npx tsc --noEmit` then `npx eslint components/sections/shared/*.tsx`
Expected: no errors from these five new files (the command may still print unrelated pre-existing errors from other files — ignore those).

- [ ] **Step 7: Commit**

```bash
git add components/sections/shared/SectionHeader.tsx components/sections/shared/SectionLede.tsx components/sections/shared/Card.tsx components/sections/shared/MetaRow.tsx components/sections/shared/SubTitle.tsx
git commit -m "feat(sections): add shared header/lede/card/meta-row/subtitle primitives"
```

---

## Task 2: `CVDownloadButton` optional children

**Files:**

- Modify: `components/cv/CVDownloadButton.tsx`

**Interfaces:**

- Consumes: nothing new.
- Produces: `CVDownloadButton({ iconSize?: number; className?: string; children?: ReactNode })` — when `children` is passed it replaces the default `IoDocumentText` icon; `components/Header.tsx`'s existing icon-only call (`<CVDownloadButton iconSize={20} className="text-primary" />`) keeps working unchanged. Consumed by Task 4.

- [ ] **Step 1: Add the `children` prop**

```tsx
// components/cv/CVDownloadButton.tsx
import React from "react";
import { IoDocumentText } from "react-icons/io5";

interface CVDownloadButtonProps {
  iconSize?: number;
  className?: string;
  children?: React.ReactNode;
}

export default function CVDownloadButton({
  iconSize = 24,
  className,
  children,
}: CVDownloadButtonProps) {
  const handleDownload = () => {
    const pdfUrl = "/images/Jonas_Pilloud.pdf"; // Chemin vers le fichier PDF dans le dossier public
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "Jonas_Pilloud.pdf";
    link.click();
  };

  return (
    <button onClick={handleDownload} className={className}>
      {children ?? <IoDocumentText size={iconSize} />}
    </button>
  );
}
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: no new errors.

- [ ] **Step 3: Commit**

```bash
git add components/cv/CVDownloadButton.tsx
git commit -m "feat(cv): let CVDownloadButton render custom children instead of the icon"
```

---

## Task 3: Career data model

**Files:**

- Create: `data/career.ts`

**Interfaces:**

- Produces: `CareerCategory` type (`"Expérience" | "Formation" | "Service civil"`), `CareerStep` type (`{ year: string; category: CareerCategory; title: string; description: string }`), `careerSteps: CareerStep[]` (9 entries, most recent first — index 0 = "01"). Consumed by Task 5.

- [ ] **Step 1: Write the data file**

```ts
// data/career.ts
export type CareerCategory = "Expérience" | "Formation" | "Service civil";

export type CareerStep = {
  year: string;
  category: CareerCategory;
  title: string;
  description: string;
};

export const careerSteps: CareerStep[] = [
  {
    year: "2025 — 2026",
    category: "Expérience",
    title: "Mandats indépendants",
    description:
      "Développement web, modélisation et développement de base de données.",
  },
  {
    year: "2023 — 2024",
    category: "Formation",
    title: "Master en informatique de gestion",
    description:
      "Une année d’études de Master en informatique de gestion à l’Université de Fribourg.",
  },
  {
    year: "2023",
    category: "Expérience",
    title: "Analyste programmeur",
    description:
      "Analyste programmeur chez Cremo pendant trois mois. Principalement responsable du support téléphonique et du développement de leurs logiciels internes (Visual Basic).",
  },
  {
    year: "2021 — 2022",
    category: "Service civil",
    title: "Aide voirie",
    description:
      "Aide voirie pour la municipalité de St-Maurice dans le cadre du service civil.",
  },
  {
    year: "2019 — 2020",
    category: "Formation",
    title: "Cours CISCO",
    description:
      "Cours CISCO à la HEG de Genève pendant mes études en informatique de gestion.",
  },
  {
    year: "2017 — 2021",
    category: "Formation",
    title: "Bachelor en informatique de gestion",
    description:
      "Programme de Bachelor en informatique de gestion à la HES-SO Valais, Sierre.",
  },
  {
    year: "2016 — 2017",
    category: "Service civil",
    title: "Animateur assistant",
    description:
      "Animateur assistant au Home les Tilleuls à Monthey dans le cadre du service civil.",
  },
  {
    year: "2015 — 2016",
    category: "Formation",
    title: "Stage MPC",
    description:
      "Stage d’employé de commerce à la Médiathèque Valais Sion pour compléter ma formation.",
  },
  {
    year: "2012 — 2015",
    category: "Formation",
    title: "CFC d’employé de commerce",
    description: "Formation d’employé de commerce à l’ECCG Martigny.",
  },
];
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: no new errors.

- [ ] **Step 3: Commit**

```bash
git add data/career.ts
git commit -m "feat(career): extract career timeline into a typed data file"
```

---

## Task 4: `AboutMe.tsx` rewrite

**Files:**

- Modify: `components/sections/AboutMe.tsx`

**Interfaces:**

- Consumes: `SectionHeader`, `SectionLede`, `Card`, `MetaRow`, `SubTitle` (Task 1), `CVDownloadButton` with `children` (Task 2), `StackChips` (existing, `@/components/projects/StackChips`), `fadeInFromTop`, `fadeInFromL`, `fadeInFromR`, `fadeInFromBottom` (existing, `@/utils/animations`).
- Produces: nothing consumed elsewhere (leaf section component, rendered by `AppJP.tsx` — already wired, no change needed there).

- [ ] **Step 1: Replace the file contents**

```tsx
// components/sections/AboutMe.tsx
"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  fadeInFromTop,
  fadeInFromL,
  fadeInFromR,
  fadeInFromBottom,
} from "@/utils/animations";
import profileImage from "@/public/images/profile.png";
import CVDownloadButton from "@/components/cv/CVDownloadButton";
import StackChips from "@/components/projects/StackChips";
import SectionHeader from "./shared/SectionHeader";
import SectionLede from "./shared/SectionLede";
import Card from "./shared/Card";
import MetaRow from "./shared/MetaRow";
import SubTitle from "./shared/SubTitle";

const linkHover =
  "inline-block transition-transform duration-300 ease-in hover:-skew-x-6 hover:scale-105 hover:scale-y-125";
const externalLinkClass =
  "font-sans text-[17px] font-semibold uppercase tracking-wider text-base-content/60 theme-nord:text-base-content/75 transition-colors hover:text-base-content";

const approachCards = [
  {
    title: "Développement orienté solution",
    body: "Conception d’applications complètes, de l’architecture backend à l’interface utilisateur, avec une attention particulière à la maintenabilité, la clarté du code et la performance.",
  },
  {
    title: "Automatisation & fiabilité",
    body: "Mise en place d’outils et de processus pour automatiser les tâches récurrentes, fiabiliser les déploiements et améliorer la productivité de l’équipe.",
  },
  {
    title: "Sécurité & qualité",
    body: "Sensibilité aux bonnes pratiques de sécurité, revue de code rigoureuse et tests automatisés pour garantir la stabilité des systèmes.",
  },
];

const bringToTeam = [
  "Des compétences solides en développement fullstack",
  "Un esprit d’analyse, de la méthode et de la curiosité technique",
  "Un vrai plaisir à collaborer, apprendre et faire avancer les projets ensemble",
];

export default function AboutMe() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <section
      ref={ref}
      id="about-me"
      className="px-5 md:px-0 mt-40 mb-10 xl:mx-32 2xl:mx-60 2xl:mb-20 2xl:mt-60 scroll-mt-32"
    >
      <SectionHeader
        title="À PROPOS"
        right={
          <CVDownloadButton
            className={`font-heading text-[clamp(16px,1.4vw,22px)] text-primary ${linkHover}`}
          >
            {"// TÉLÉCHARGER LE CV"}
          </CVDownloadButton>
        }
      />
      <SectionLede>
        Développeur fullstack diplômé en informatique de gestion. Je conçois des
        applications complètes, de l’architecture backend à l’interface
        utilisateur.
      </SectionLede>

      <div className="mt-10 flex flex-col gap-8 px-0 md:gap-16 md:px-8">
        <Card className="flex flex-wrap items-stretch gap-6 p-6 md:gap-14 md:p-10">
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeInFromTop}
            className="flex min-w-[260px] max-w-[420px] flex-1 basis-[300px]"
          >
            <div className="w-full self-start overflow-hidden rounded-[20px] border-2 border-base-content">
              <Image
                src={profileImage}
                alt="Photo de profil de Jonas Pilloud"
                placeholder="blur"
                sizes="(min-width: 768px) 420px, 90vw"
                className="h-auto w-full"
              />
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeInFromR}
            className="flex min-w-[300px] flex-1 basis-[420px] flex-col justify-center gap-[18px]"
          >
            <MetaRow label="Développeur junior · St-Maurice (VS)" />
            <h3 className="font-heading text-[clamp(34px,3.6vw,54px)] font-medium leading-none">
              Développeur <span className="text-primary">fullstack</span>
            </h3>
            <p className="font-hero text-[clamp(19px,1.5vw,24px)] leading-[1.35] text-base-content/80">
              Passionné par l’innovation et la création de solutions techniques{" "}
              <span className="italic text-primary">robustes</span>.
            </p>
            <p className="font-sans text-[clamp(17px,1.3vw,20px)] leading-[1.4] text-base-content/75">
              De la modélisation des données à l’interface : JavaScript et
              TypeScript, Node.js, bases de données relationnelles et NoSQL,
              outils DevOps.
            </p>
            <StackChips
              items={["TypeScript", "Node.js", "SQL & NoSQL", "DevOps"]}
            />
            <motion.div
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={fadeInFromTop}
              className="mt-1.5 flex flex-wrap items-center gap-7"
            >
              <a
                href="https://www.linkedin.com/in/jonas-pilloud/"
                target="_blank"
                rel="noopener noreferrer"
                className={externalLinkClass}
              >
                LinkedIn ↗
              </a>
              <a
                href="https://github.com/Gen0miX"
                target="_blank"
                rel="noopener noreferrer"
                className={externalLinkClass}
              >
                GitHub ↗
              </a>
              <a
                href="mailto:contact@jonas-pilloud.ch"
                className={externalLinkClass}
              >
                Mail ↗
              </a>
            </motion.div>
          </motion.div>
        </Card>

        <div className="flex flex-col gap-5">
          <SubTitle className="pl-1">Mon approche</SubTitle>
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeInFromL}
            className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-[clamp(20px,2vw,32px)]"
          >
            {approachCards.map((card, index) => (
              <Card
                key={card.title}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={fadeInFromBottom}
                transition={{
                  type: "spring",
                  stiffness: 80,
                  damping: 11,
                  delay: index * 0.08,
                }}
                className="flex flex-col gap-3.5 p-[clamp(22px,2vw,32px)]"
              >
                <MetaRow number={String(index + 1).padStart(2, "0")} />
                <h3 className="font-heading text-[clamp(24px,2.2vw,32px)] font-medium leading-[1.1]">
                  {card.title}
                </h3>
                <p className="font-sans text-[clamp(17px,1.3vw,20px)] leading-[1.45] text-base-content/75">
                  {card.body}
                </p>
              </Card>
            ))}
          </motion.div>
        </div>

        <div className="flex flex-col gap-5">
          <SubTitle className="pl-1">Ce que j’apporte à votre équipe</SubTitle>
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeInFromR}
            className="rounded-[32px] border border-dashed border-base-content/20 px-6 py-2 md:px-11"
          >
            {bringToTeam.map((line, index) => (
              <p
                key={line}
                className={`flex items-center gap-5 py-5 font-hero text-[clamp(20px,1.6vw,26px)] leading-[1.3] text-base-content/85 ${
                  index < bringToTeam.length - 1
                    ? "border-b border-base-content/10"
                    : ""
                }`}
              >
                <span className="h-px w-7 flex-none bg-primary" />
                {line}
              </p>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Type-check and lint**

Run: `npx tsc --noEmit` then `npx eslint components/sections/AboutMe.tsx`
Expected: no `react/no-unescaped-entities` errors (all apostrophes are `’`); no new errors of any kind.

- [ ] **Step 3: Manual check**

Run: `npm run dev`, open `/#about-me`. Confirm: profile card, "Mon approche" 3-card grid, dashed "Ce que j’apporte" block all render; CV link downloads the PDF; LinkedIn/GitHub/Mail links point correctly; toggle theme to `nord` and confirm text stays readable; resize below ~740px and confirm the profile card stacks to one column.

- [ ] **Step 4: Commit**

```bash
git add components/sections/AboutMe.tsx
git commit -m "feat(about-me): rebuild section on the shared card system, drop emojis"
```

---

## Task 5: `Career.tsx` rewrite

**Files:**

- Modify: `components/sections/Career.tsx`

**Interfaces:**

- Consumes: `careerSteps`, `CareerStep` (Task 3), `SectionHeader`, `SectionLede`, `Card` (Task 1).
- Produces: nothing consumed elsewhere.

- [ ] **Step 1: Replace the file contents**

```tsx
// components/sections/Career.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { careerSteps, type CareerStep } from "@/data/career";
import SectionHeader from "./shared/SectionHeader";
import SectionLede from "./shared/SectionLede";
import Card from "./shared/Card";

const itemVariantsR = {
  hidden: { opacity: 0, x: 100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 80, damping: 11 },
  },
};

const itemVariantsL = {
  hidden: { opacity: 0, x: -100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 80, damping: 11 },
  },
};

type CareerCardProps = {
  step: CareerStep;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
};

function CareerCard({ step, index, isOpen, onToggle }: CareerCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const node = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.5 },
    );
    if (node) observer.observe(node);
    return () => {
      if (node) observer.unobserve(node);
    };
  }, [hasAnimated]);

  const number = String(index + 1).padStart(2, "0");
  const panelId = `career-step-${index}`;

  return (
    <Card
      ref={ref}
      radius={28}
      variants={index % 2 === 0 ? itemVariantsL : itemVariantsR}
      initial="hidden"
      animate={hasAnimated ? "visible" : "hidden"}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className="flex min-h-[44px] w-full flex-wrap items-center gap-[clamp(16px,2vw,28px)] px-[clamp(20px,2.2vw,32px)] py-[clamp(18px,1.8vw,26px)] text-left"
      >
        <span className="min-w-[28px] font-heading text-xl font-bold tracking-wider text-primary">
          {number}
        </span>
        <div className="flex min-w-[130px] flex-col gap-0.5">
          <span className="font-heading text-[clamp(22px,1.9vw,30px)] font-medium leading-none text-primary">
            {step.year}
          </span>
          <span className="font-sans text-[12px] font-bold uppercase tracking-[.16em] text-base-content/50 theme-nord:text-base-content/75">
            {step.category}
          </span>
        </div>
        <span className="min-h-[44px] w-px self-stretch bg-base-content/[.18]" />
        <span className="flex-1 basis-[220px] font-heading text-[clamp(22px,2.1vw,32px)] font-medium leading-[1.1]">
          {step.title}
        </span>
        <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full border border-base-content/20 font-sans text-xl font-bold leading-none text-base-content/60 theme-nord:text-base-content/75">
          {isOpen ? "–" : "+"}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-[clamp(20px,2.2vw,32px)] pb-[clamp(20px,2vw,28px)]">
              <div className="mb-[18px] h-px bg-base-content/10" />
              <p className="max-w-[900px] font-sans text-[clamp(17px,1.3vw,20px)] leading-[1.45] text-base-content/75">
                {step.description}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}

export default function Career() {
  const [openSteps, setOpenSteps] = useState<Record<number, boolean>>({
    0: true,
  });

  return (
    <section
      id="career"
      className="px-5 md:px-0 mt-40 mb-10 xl:mx-32 2xl:mx-60 2xl:mb-20 2xl:mt-60 scroll-mt-32"
    >
      <SectionHeader
        title="CARRIÈRE"
        right={
          <span className="font-sans text-[15px] font-bold uppercase tracking-[.14em] text-base-content/55 theme-nord:text-base-content/75">
            9 étapes · 2012 — 2026
          </span>
        }
      />
      <SectionLede>
        Formations, expériences et services civils, du CFC d’employé de commerce
        aux mandats indépendants d’aujourd’hui.
      </SectionLede>

      <div className="mt-10 flex flex-col gap-[clamp(14px,1.4vw,20px)] px-0 md:px-8">
        {careerSteps.map((step, index) => (
          <CareerCard
            key={step.title}
            step={step}
            index={index}
            isOpen={!!openSteps[index]}
            onToggle={() =>
              setOpenSteps((current) => ({
                ...current,
                [index]: !current[index],
              }))
            }
          />
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Type-check and lint**

Run: `npx tsc --noEmit` then `npx eslint components/sections/Career.tsx`
Expected: no `react/no-unescaped-entities` errors; the two pre-existing `react-hooks/exhaustive-deps` warnings on the `ref.current` cleanup may still appear (documented in Global Constraints as baseline, reproduced identically) — no other new errors.

- [ ] **Step 3: Manual check**

Run: `npm run dev`, open `/#career`. Confirm: 9 cards render most-recent-first, card 01 open by default, others closed; clicking a header toggles that card only (others unaffected) with an animated height/opacity transition, not a snap; the `+`/`–` glyph flips; keyboard focus on the header (Tab) shows the button outline and Enter/Space toggles it; alternating left/right entrance animation on scroll into view; `nord` theme contrast check.

- [ ] **Step 4: Commit**

```bash
git add components/sections/Career.tsx
git commit -m "feat(career): replace zigzag timeline with a card list, keep collapse behavior"
```

---

## Task 6: `ProgressBar.tsx` restyle

**Files:**

- Modify: `components/ProgressBar.tsx`

**Interfaces:**

- Consumes: `fadeInFromLeftWDelay` (existing, `@/utils/animations`).
- Produces: `ProgressBar({ label: string; value: number; info?: string; percentWidth?: 38 | 44 })` (default `percentWidth=38`) — consumed by Task 8.

- [ ] **Step 1: Replace the file contents**

```tsx
// components/ProgressBar.tsx
"use client";

import clsx from "clsx";
import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { fadeInFromLeftWDelay } from "@/utils/animations";

interface ProgressBarProps {
  label: string;
  value: number;
  info?: string;
  percentWidth?: 38 | 44;
}

export default function ProgressBar({
  label,
  value,
  info,
  percentWidth = 38,
}: ProgressBarProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start({ width: `${value}%` });
    }
  }, [isInView, controls, value]);

  return (
    <div
      ref={ref}
      className="group flex items-center gap-3 text-base-content/85 transition-colors duration-300 hover:text-primary"
    >
      <motion.span
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInFromLeftWDelay}
        className="flex w-[120px] flex-none flex-col leading-[1.1]"
      >
        <span className="font-sans text-[clamp(16px,1.2vw,19px)] font-medium">
          {label}
        </span>
        {info && (
          <span className="font-sans text-[14px] font-medium opacity-55 theme-nord:opacity-75">
            {info}
          </span>
        )}
      </motion.span>
      <div className="h-2 flex-1 rounded-full bg-base-content/[.12]">
        <motion.div
          className="h-full rounded-full bg-current"
          initial={{ width: 0 }}
          animate={controls}
          transition={{ duration: 1 }}
        />
      </div>
      <span
        className={clsx(
          "flex-none text-right font-sans text-[14px] font-bold opacity-50 theme-nord:opacity-75",
          percentWidth === 44 ? "w-11" : "w-[38px]",
        )}
      >
        {value}%
      </span>
    </div>
  );
}
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: no new errors (Task 8 will supply the only caller; this file compiles standalone regardless).

- [ ] **Step 3: Commit**

```bash
git add components/ProgressBar.tsx
git commit -m "feat(progress-bar): restyle to the card system, keep fill animation, show % always"
```

---

## Task 7: `SpotlightCard.tsx` restyle

**Files:**

- Modify: `components/SpotlightCard.tsx`

**Interfaces:**

- Consumes: `contentVariantsTop`, `contentVariantsBot` (existing, `@/utils/animations`).
- Produces: `Spotlight` (unchanged signature), `SpotlightCard` (unchanged signature, restyled base classes), `MySpotlightCard({ number: string; title: string; svg: FC<SVGProps<SVGSVGElement>>; color: string; info: string })` — **breaking change**: adds a required `number` prop, drops the previous `CTitle`-based title. Consumed by Task 8.

- [ ] **Step 1: Replace the file contents**

```tsx
// components/SpotlightCard.tsx
"use client";

import React, { useRef, useState, useEffect } from "react";
import MousePosition from "../utils/mouse-position";
import { motion } from "framer-motion";
import { contentVariantsBot, contentVariantsTop } from "@/utils/animations";

type SpotlightProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Spotlight({
  children,
  className = "",
}: SpotlightProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePosition = MousePosition();
  const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const containerSize = useRef<{ w: number; h: number }>({ w: 0, h: 0 });
  const [boxes, setBoxes] = useState<Array<HTMLElement>>([]);

  const initContainer = () => {
    if (containerRef.current) {
      containerSize.current.w = containerRef.current.offsetWidth;
      containerSize.current.h = containerRef.current.offsetHeight;
    }
  };

  const onMouseMove = () => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const { w, h } = containerSize.current;
      const x = mousePosition.x - rect.left;
      const y = mousePosition.y - rect.top;
      const inside = x < w && x > 0 && y < h && y > 0;
      if (inside) {
        mouse.current.x = x;
        mouse.current.y = y;
        boxes.forEach((box) => {
          const boxX =
            -(box.getBoundingClientRect().left - rect.left) + mouse.current.x;
          const boxY =
            -(box.getBoundingClientRect().top - rect.top) + mouse.current.y;
          box.style.setProperty("--mouse-x", `${boxX}px`);
          box.style.setProperty("--mouse-y", `${boxY}px`);
        });
      }
    }
  };

  useEffect(() => {
    containerRef.current &&
      setBoxes(
        Array.from(containerRef.current.children).map(
          (el) => el as HTMLElement,
        ),
      );
  }, []);

  useEffect(() => {
    initContainer();
    window.addEventListener("resize", initContainer);

    return () => {
      window.removeEventListener("resize", initContainer);
    };
  }, [boxes]);

  useEffect(() => {
    onMouseMove();
  }, [mousePosition]);

  return (
    <div className={className} ref={containerRef}>
      {children}
    </div>
  );
}

type SpotlightCardProps = {
  children: React.ReactNode;
  className?: string;
};

export function SpotlightCard({
  children,
  className = "",
}: SpotlightCardProps) {
  return (
    <div
      className={`relative h-full overflow-hidden rounded-[32px] border border-base-300 bg-base-200 transition-colors duration-[400ms] hover:border-primary
        before:absolute before:w-80 before:h-80 before:-left-40 before:-top-40 
        before:bg-base-300 theme-nord:before:bg-gray-800
        before:rounded-full before:opacity-0 before:pointer-events-none before:transition-opacity before:duration-500 
        before:translate-x-[var(--mouse-x)] before:translate-y-[var(--mouse-y)] 
        before:group-hover:opacity-100 theme-nord:before:group-hover:opacity-40
        before:z-10 before:blur-[100px] 
        after:absolute after:w-96 after:h-96 after:-left-48 after:-top-48 
        after:bg-primary theme-nord:after:bg-gray-900
        after:rounded-full after:opacity-0 after:pointer-events-none after:transition-opacity after:duration-500
        after:translate-x-[var(--mouse-x)] after:translate-y-[var(--mouse-y)] 
        after:hover:opacity-10 theme-nord:after:hover:opacity-30
        after:z-30 after:blur-[100px] ${className}`}
    >
      {children}
    </div>
  );
}

type MySpotlightCardProps = {
  number: string;
  title: string;
  svg: React.FC<React.SVGProps<SVGSVGElement>>;
  color: string;
  info: string;
};

export function MySpotlightCard({
  number,
  title,
  svg: SvgIcon,
  color,
  info,
}: MySpotlightCardProps) {
  return (
    <SpotlightCard className="flex h-full flex-col gap-4 p-[clamp(22px,2vw,32px)]">
      <div className="flex items-center gap-4">
        <span className="font-heading text-xl font-bold tracking-wider text-primary">
          {number}
        </span>
        <span className="h-px max-w-[80px] flex-1 bg-base-content/[.18]" />
      </div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={contentVariantsTop}
        custom={0.5}
        className="relative my-2 flex h-[150px] items-center justify-center"
      >
        <div
          className={`absolute h-32 w-32 rounded-full border-2 border-base-content ${color}`}
        />
        <SvgIcon className="relative h-[85px] w-[85px] fill-base-content theme-dark:fill-base-300" />
      </motion.div>
      <h3 className="font-heading text-[clamp(26px,2.3vw,36px)] font-medium leading-none">
        {title}
      </h3>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={contentVariantsBot}
        custom={0.8}
      >
        <p className="font-sans text-[clamp(17px,1.3vw,20px)] leading-[1.45] text-base-content/75">
          {info}
        </p>
      </motion.div>
    </SpotlightCard>
  );
}
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: an error at every existing call site of `MySpotlightCard` that doesn't pass `number` yet — that's expected and resolved by Task 8. No other new errors.

- [ ] **Step 3: Commit**

```bash
git add components/SpotlightCard.tsx
git commit -m "feat(spotlight-card): restyle to the card system, add numbered meta row, keep glow effect"
```

---

## Task 8: `Skills.tsx` rewrite

**Files:**

- Modify: `components/sections/Skills.tsx`

**Interfaces:**

- Consumes: `SectionHeader`, `SectionLede`, `Card`, `SubTitle` (Task 1), `ProgressBar` with `percentWidth` (Task 6), `Spotlight`/`MySpotlightCard` with `number` (Task 7), `divVariants` (existing, `@/utils/animations`).
- Produces: nothing consumed elsewhere.

- [ ] **Step 1: Replace the file contents**

```tsx
// components/sections/Skills.tsx
"use client";

import { useRef } from "react";
import type { FC, SVGProps } from "react";
import { motion, useInView } from "framer-motion";
import { divVariants } from "@/utils/animations";
import Spotlight, { MySpotlightCard } from "@/components/SpotlightCard";
import ProgressBar from "@/components/ProgressBar";
import AdaptiveSVG from "../../public/images/skills/adaptive.svg";
import AutonomousSVG from "../../public/images/skills/autonomous.svg";
import MethodicSVG from "../../public/images/skills/methodic.svg";
import SectionHeader from "./shared/SectionHeader";
import SectionLede from "./shared/SectionLede";
import Card from "./shared/Card";
import SubTitle from "./shared/SubTitle";

const softSkillsCards: {
  title: string;
  svg: FC<SVGProps<SVGSVGElement>>;
  color: string;
  info: string;
}[] = [
  {
    title: "ADAPTABLE",
    svg: AdaptiveSVG,
    color: "bg-primary",
    info: "Je m’adapte rapidement aux nouvelles situations, technologies et environnements de travail, ce qui me permet de répondre efficacement aux défis et de contribuer activement aux projets.",
  },
  {
    title: "AUTONOME",
    svg: AutonomousSVG,
    color: "bg-warning",
    info: "Je prends des initiatives et avance de manière autonome dans mes tâches, en sachant gérer mes priorités tout en sollicitant de l’aide lorsque nécessaire pour garantir un travail fiable et abouti.",
  },
  {
    title: "MÉTHODIQUE",
    svg: MethodicSVG,
    color: "bg-accent",
    info: "Je travaille de manière organisée et structurée, en suivant des processus clairs pour atteindre mes objectifs efficacement et garantir la qualité du travail.",
  },
];

const codingSkills = [
  { label: "HTML", value: 70 },
  { label: "CSS", value: 60 },
  { label: "JavaScript", value: 60 },
  { label: "TypeScript", value: 60 },
  { label: "Angular", value: 60 },
  { label: "React / Native", value: 50 },
  { label: "Python", value: 70 },
  { label: "Java", value: 50 },
  { label: "C#", value: 40 },
  { label: "SQL", value: 80 },
  { label: "SAP", value: 50 },
];

const languages = [
  { label: "Français", value: 100, info: "langue maternelle" },
  { label: "Anglais", value: 80, info: "bonnes connaissances" },
  { label: "Allemand", value: 30, info: "ein bisschen" },
];

const toolsOthers = [
  { label: "Windows 11", value: 80 },
  { label: "Ubuntu", value: 50 },
  { label: "Photoshop", value: 60 },
  { label: "Suite Office", value: 80 },
  { label: "Scrum / Agile", value: 60 },
  { label: "VS Code", value: 90 },
];

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <section
      id="skills"
      className="px-5 md:px-0 mt-40 mb-10 xl:mx-32 2xl:mx-60 2xl:mb-20 2xl:mt-60 scroll-mt-32"
    >
      <SectionHeader
        title="CAPACITÉS"
        right={
          <span className="font-sans text-[15px] font-bold uppercase tracking-[.14em] text-base-content/55 theme-nord:text-base-content/75">
            Aptitudes · Coding · Langues · Outils
          </span>
        }
      />
      <SectionLede>
        Un résumé de mes compétences et aptitudes les plus importantes.
      </SectionLede>

      <div className="mt-10 flex flex-col gap-12 px-0 md:px-8">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={divVariants}
        >
          <Spotlight className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-[clamp(20px,2vw,32px)]">
            {softSkillsCards.map((card, index) => (
              <MySpotlightCard
                key={card.title}
                number={String(index + 1).padStart(2, "0")}
                title={card.title}
                svg={card.svg}
                color={card.color}
                info={card.info}
              />
            ))}
          </Spotlight>
        </motion.div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(340px,1fr))] items-start gap-[clamp(20px,2vw,32px)]">
          <Card
            radius={28}
            className="flex flex-col gap-[18px] p-[clamp(24px,2vw,34px)]"
          >
            <SubTitle>Coding</SubTitle>
            <div className="flex flex-col gap-3.5">
              {codingSkills.map((skill) => (
                <ProgressBar
                  key={skill.label}
                  label={skill.label}
                  value={skill.value}
                />
              ))}
            </div>
          </Card>

          <div className="flex flex-col gap-[clamp(20px,2vw,32px)]">
            <Card
              radius={28}
              className="flex flex-col gap-[18px] p-[clamp(24px,2vw,34px)]"
            >
              <SubTitle>Langues</SubTitle>
              <div className="flex flex-col gap-4">
                {languages.map((lang) => (
                  <ProgressBar
                    key={lang.label}
                    label={lang.label}
                    value={lang.value}
                    info={lang.info}
                    percentWidth={44}
                  />
                ))}
              </div>
            </Card>
            <Card
              radius={28}
              className="flex flex-col gap-[18px] p-[clamp(24px,2vw,34px)]"
            >
              <SubTitle>Outils / autres</SubTitle>
              <div className="flex flex-col gap-3.5">
                {toolsOthers.map((tool) => (
                  <ProgressBar
                    key={tool.label}
                    label={tool.label}
                    value={tool.value}
                  />
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Type-check and lint**

Run: `npx tsc --noEmit` then `npx eslint components/sections/Skills.tsx components/SpotlightCard.tsx components/ProgressBar.tsx`
Expected: the `MySpotlightCard` call-site errors from Task 7 are now resolved; no new errors.

- [ ] **Step 3: Manual check**

Run: `npm run dev`, open `/#skills`. Confirm: 3 aptitude cards show number+filet, disk illustration, title, body, and the mouse-follow glow on hover; bars render with percentages always visible (not hover-only), row + fill turn `primary` on hover; `nord` theme contrast check; resize to confirm the aptitude grid and the bars grid both collapse to one column below their `minmax` breakpoints.

- [ ] **Step 4: Commit**

```bash
git add components/sections/Skills.tsx
git commit -m "feat(skills): rebuild on the shared card system, restyle bars and spotlight cards"
```

---

## Task 9: `Contact.tsx` restyle

**Files:**

- Modify: `components/sections/Contact.tsx`

**Interfaces:**

- Consumes: `SectionHeader`, `SectionLede`, `Card` (Task 1).
- Produces: nothing consumed elsewhere.

- [ ] **Step 1: Replace the file contents**

```tsx
// components/sections/Contact.tsx
"use client";

import { useRef, useState } from "react";
import { useInView } from "framer-motion";
import { FaUser } from "react-icons/fa";
import { IoMdMail, IoIosSend } from "react-icons/io";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import SectionHeader from "./shared/SectionHeader";
import SectionLede from "./shared/SectionLede";
import Card from "./shared/Card";

const externalLinkClass =
  "font-sans text-[17px] font-semibold uppercase tracking-wider text-base-content/60 theme-nord:text-base-content/75 transition-colors hover:text-base-content";

const fieldClass =
  "flex h-[52px] flex-1 basis-[240px] items-center gap-3 rounded-[10px] border border-base-content/20 bg-transparent px-[18px] transition-colors duration-300 hover:border-primary focus-within:border-primary";

const inputClass =
  "min-w-0 flex-1 border-none bg-transparent font-sans text-lg font-medium outline-none placeholder:text-base-content/40 theme-nord:placeholder:text-base-content/60";

export default function Contact() {
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<"success" | "error">("success");

  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.2 });

  const showToast = (message: string, type: "success" | "error") => {
    setToastMessage(message);
    setToastType(type);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    setIsLoading(true);
    const formData = new FormData(event.currentTarget);

    formData.append("access_key", "10538beb-60fe-4fac-8ee1-6facfe5635ff");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        showToast("Super ! J’ai bien reçu votre message.", "success");
        form.reset();
      } else {
        console.log("Error", data);
        showToast(
          data.message || "Mince ! Votre message n’est pas parti.",
          "error",
        );
      }
    } catch (error) {
      console.error("Erreur d’envoi :", error);
      showToast("Mince ! Votre message n’est pas parti.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="px-5 md:px-0 mt-40 mb-10 xl:mx-32 2xl:mx-60 2xl:mb-20 2xl:mt-60 scroll-mt-32"
    >
      <SectionHeader
        title="CONTACT"
        right={
          <a
            href="mailto:contact@jonas-pilloud.ch"
            className={externalLinkClass}
          >
            contact@jonas-pilloud.ch ↗
          </a>
        }
      />
      <SectionLede>
        Un projet, une question, une opportunité ? Le formulaire arrive
        directement dans ma boîte mail.
      </SectionLede>

      <div className="mt-10 flex justify-center px-0 md:px-8">
        <Card
          ref={cardRef}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex w-full max-w-[880px] flex-col gap-4 p-[clamp(24px,2.5vw,44px)]"
        >
          <form onSubmit={onSubmit} className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-4">
              <label className={fieldClass}>
                <FaUser className="flex-none text-primary" size={16} />
                <input
                  type="text"
                  name="name"
                  placeholder="Prénom"
                  required
                  className={inputClass}
                />
              </label>
              <label className={fieldClass}>
                <IoMdMail className="flex-none text-primary" size={16} />
                <input
                  type="email"
                  name="email"
                  placeholder="Mail"
                  required
                  className={inputClass}
                />
              </label>
            </div>
            <textarea
              name="message"
              placeholder="Message"
              rows={7}
              className="w-full resize-y rounded-[10px] border border-base-content/20 bg-transparent px-[18px] py-3.5 font-sans text-lg font-medium outline-none transition-colors duration-300 placeholder:text-base-content/40 theme-nord:placeholder:text-base-content/60 hover:border-primary focus:border-primary"
            />
            <button
              type="submit"
              className="mt-2 inline-flex h-[52px] min-w-[256px] items-center justify-center gap-2.5 self-center rounded-[10px] bg-primary px-[26px] font-sans text-[17px] font-bold uppercase tracking-[.08em] text-base-100 transition-colors duration-300 hover:bg-base-content"
            >
              {isLoading ? (
                <span className="loading loading-spinner loading-sm" />
              ) : (
                <>
                  <IoIosSend size={18} />
                  Envoyer
                </>
              )}
            </button>
          </form>
        </Card>
      </div>

      {toastMessage && (
        <div className="toast toast-bottom toast-end z-50">
          <div
            className={`alert ${
              toastType === "success" ? "alert-success" : "alert-error"
            } flex items-center gap-2`}
          >
            {toastType === "success" ? (
              <AiOutlineCheckCircle className="text-xl" />
            ) : (
              <AiOutlineCloseCircle className="text-xl" />
            )}
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
    </section>
  );
}
```

- [ ] **Step 2: Type-check and lint**

Run: `npx tsc --noEmit` then `npx eslint components/sections/Contact.tsx`
Expected: no new errors.

- [ ] **Step 3: Manual check**

Run: `npm run dev`, open `/#contact`. Confirm: fields have a neutral border at rest and turn `primary` on hover/focus (not permanently colored); submitting a real message still posts to Web3Forms and shows the success/error toast (test with a throwaway message); button shows the spinner while `isLoading`; `nord` theme contrast check; below ~640px the name/email fields stack.

- [ ] **Step 4: Commit**

```bash
git add components/sections/Contact.tsx
git commit -m "feat(contact): put the form in a card, restyle fields and button, keep Web3Forms logic"
```

---

## Task 10: Full-page verification pass

**Files:** none (verification only).

**Interfaces:** none.

- [ ] **Step 1: Full scoped lint + type-check**

Run:

```bash
npx eslint components/sections/AboutMe.tsx components/sections/Career.tsx components/sections/Skills.tsx components/sections/Contact.tsx components/sections/shared components/ProgressBar.tsx components/SpotlightCard.tsx components/cv/CVDownloadButton.tsx data/career.ts
npx tsc --noEmit
```

Expected: zero errors beyond the documented pre-existing baseline (none of these files carry baseline errors except the two `Career.tsx` `exhaustive-deps` warnings, which are expected).

- [ ] **Step 2: Full home-page walkthrough in the browser**

Run: `npm run dev`, open `/`. For each of `#about-me`, `#career`, `#skills`, `#contact`, scroll it into view from above (not a hard refresh mid-section) and confirm against the spec's animation checklist:

- Section title still animates letter-by-letter (`SectionTitle`, unchanged).
- About-me: avatar drops from top, text column slides from right, "Mon approche" cards cascade in with `delay: index * 0.08`, dashed block slides from right, link row drops from top — all trigger once, on first scroll into view, not on scroll back up.
- Career: cards alternate left/right entrance; first card open by default; toggling animates height, not a snap; reopening a previously-closed card still animates (state, not `once`).
- Skills: aptitude block drops from top; each card's illustration/body fade in with their own delay; spotlight glow follows the cursor on hover; each bar's label slides in from the left and its fill animates from 0 to its value on scroll into view.
- Contact: form card fades up into view once.

- [ ] **Step 3: Theme and responsive sweep**

In the browser: toggle the theme button (top-right in `Header`) between `dark` and `nord` and re-check all four sections for readable contrast (especially the `/40`–`/60` opacity text and placeholders). Resize the viewport through ~375px, ~768px, ~1024px, ~1440px and confirm: About-me profile card and all `auto-fit` grids reflow to one column on narrow widths without overlap; Career header row wraps instead of clipping; Skills bars stack; Contact fields stack; every Career toggle button remains a real `<button>` at least 44px tall on mobile widths.

- [ ] **Step 4: Confirm `#projects` is untouched**

`git diff --stat` should show no changes to `components/sections/Projects.tsx` or `components/projects/*` — those were the reference implementation, not a target of this plan.

- [ ] **Step 5: Report the "à valider" item**

Note for Jonas (no code change): the Career "Expérience"/"Formation"/"Service civil" categories are a classification the design added and are implemented as specified in `data/career.ts` — flag them as needing his confirmation, per the spec's own caveat.
