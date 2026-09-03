# Project Gallery Layout + Lightbox Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix the project detail page's gallery so `desktop`/`full` items always render at a true 16:10 ratio regardless of neighbors, and add a click-to-enlarge lightbox with carousel navigation that keeps the browser/phone chrome and lets `full`-type page screenshots be scrolled in full.

**Architecture:** Split the gallery into two independent layout zones (a 16:10 frame grid for `desktop`/`full` shots, and a separate slot for the single `mobile` shot) so CSS Grid row-stretch can no longer distort either. A new client component (`ProjectGallery`) owns open/current-index state and renders both the zones and a `GalleryLightbox` overlay; the overlay reuses the existing `BrowserFrame` chrome (extracting the phone chrome into a matching new `PhoneFrame` component) and gives `full`-type shots a real scrollable viewport instead of the grid's hover-pan trick.

**Tech Stack:** Next.js (App Router) Server + Client Components, TypeScript, Tailwind CSS, `next/image`, `lucide-react` icons.

**Spec:** `docs/superpowers/specs/2026-09-03-project-gallery-lightbox-design.md`

## Global Constraints

- No new fields on `ProjectGalleryItem` in `data/projects.ts` — layout and lightbox behavior derive entirely from the existing `type` field.
- `ProjectCard.tsx`'s cover-image treatment (home/index variants) is out of scope — untouched.
- This project has **no test framework** (`package.json` has no test script, no jest/vitest/playwright). Per-task verification is: `npx tsc --noEmit` (type-check), `npm run lint` (ESLint via `eslint-config-next`), and a manual check in the dev server (`npm run dev`) — run these instead of an automated test suite at each task's verification step.
- Reuse `BrowserFrame`'s existing prop shape (`children`, `aspectClassName`, `compact`, `className`) as-is — it already supports everything the lightbox needs without modification.
- Keep the `full`-type grid hover-pan animation exactly as it is today; only its lightbox behavior changes.

---

### Task 1: Extract `PhoneFrame` and fix the `full`-type ratio in `GalleryItem`

**Files:**
- Create: `components/projects/PhoneFrame.tsx`
- Modify: `components/projects/GalleryItem.tsx`

**Interfaces:**
- Produces: `PhoneFrame` component — `{ children: ReactNode; className?: string; compact?: boolean }`, renders a phone-mockup chrome (notch bar + rounded screen) around `children` at `aspect-[9/17]`. Default `className` is `"mx-auto w-full max-w-[220px]"` (matches today's grid sizing); `compact` (default `false`) toggles the smaller notch-bar/padding used in the grid.
- Consumes (in `GalleryItem`): nothing new yet — this task is a pure refactor + ratio fix, no new props on `GalleryItem` itself.

This task only touches the two bugs that don't require the lightbox: the `mobile` chrome markup is duplicated wholesale today; extracting it now means Task 3's lightbox mobile slide can reuse it directly. The `full` type's fixed-height bug is fixed here since it's a one-line change unrelated to layout/lightbox work.

- [ ] **Step 1: Create `PhoneFrame.tsx`**

```tsx
// components/projects/PhoneFrame.tsx
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  compact?: boolean;
};

export default function PhoneFrame({
  children,
  className = "mx-auto w-full max-w-[220px]",
  compact = false,
}: Props) {
  return (
    <div
      className={`flex aspect-[9/17] flex-col overflow-hidden rounded-[36px] border-2 border-base-content bg-base-200 ${
        compact ? "gap-1.5 p-2" : "gap-2 p-3"
      } ${className}`}
    >
      <span
        aria-hidden="true"
        className={`mx-auto flex-none rounded-full bg-base-content/25 ${
          compact ? "h-1.5 w-16" : "h-2 w-24"
        }`}
      />
      <div className="relative flex-1 overflow-hidden rounded-[26px]">
        {children}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Update `GalleryItem.tsx` to use `PhoneFrame` and fix the `full` ratio**

Replace the whole file:

```tsx
import type { ProjectGalleryItem } from "@/data/projects";
import BrowserFrame from "./BrowserFrame";
import PhoneFrame from "./PhoneFrame";
import ProjectShot from "./ProjectShot";

type Props = {
  shot: ProjectGalleryItem;
  host: string;
};

const sizes = "(min-width: 768px) 25vw, 50vw";

export default function GalleryItem({ shot, host }: Props) {
  const type = shot.type ?? "desktop";

  if (type === "mobile") {
    return (
      <PhoneFrame compact>
        <ProjectShot src={shot.src} alt={shot.alt} sizes={sizes} />
      </PhoneFrame>
    );
  }

  if (type === "full") {
    return (
      <div className="group relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-base-content/25">
        <ProjectShot
          src={shot.src}
          alt={shot.alt}
          sizes={sizes}
          className="object-top transition-[object-position] duration-[1400ms] ease-out group-hover:object-bottom"
        />
      </div>
    );
  }

  return (
    <BrowserFrame host={host} compact className="rounded-2xl border border-base-content/25">
      <ProjectShot src={shot.src} alt={shot.alt} sizes={sizes} />
    </BrowserFrame>
  );
}
```

The only functional change from the original file: the `full`-type wrapper is now `aspect-[16/10]` instead of `h-[320px]`, and the mobile branch delegates its chrome to `PhoneFrame`.

- [ ] **Step 3: Verify — type-check, lint, visual check**

Run:
```bash
npx tsc --noEmit
npm run lint
npm run dev
```
Open `http://localhost:3000/projets/avena` (has `full` and `mobile` gallery items with real images) and confirm: the gallery still renders the same as before, the `full`-type item is now a fixed 16:10 box (compare its width/height ratio at different viewport widths — it should stay 16:10, not just 320px tall), and the mobile phone mockup looks identical to before.

- [ ] **Step 4: Commit**

```bash
git add components/projects/PhoneFrame.tsx components/projects/GalleryItem.tsx
git commit -m "refactor(gallery): extract PhoneFrame, lock full-type ratio to 16:10"
```

---

### Task 2: Two-zone layout via `ProjectGallery`

**Files:**
- Create: `components/projects/ProjectGallery.tsx`
- Modify: `app/projets/[slug]/page.tsx`

**Interfaces:**
- Consumes: `GalleryItem` (Task 1) — `{ shot: ProjectGalleryItem; host: string }` (unchanged signature for this task).
- Produces: `ProjectGallery` component — `{ gallery: ProjectGalleryItem[]; host: string }`. This is what Task 3 will add lightbox state to; its JSX structure (frame grid + mobile slot) must stay in this task's shape since Task 3 only adds behavior, not layout.

This task moves the gallery rendering out of `page.tsx` and splits it into the frame grid (`desktop`/`full`) and the mobile slot, using `items-start` so grid stretch can never distort a cell again. No click/lightbox behavior yet — that's Task 3, kept separate so this layout change is independently reviewable.

- [ ] **Step 1: Create `ProjectGallery.tsx`**

```tsx
// components/projects/ProjectGallery.tsx
import type { ProjectGalleryItem } from "@/data/projects";
import GalleryItem from "./GalleryItem";

type Props = {
  gallery: ProjectGalleryItem[];
  host: string;
};

export default function ProjectGallery({ gallery, host }: Props) {
  const mobileShot = gallery.find((shot) => (shot.type ?? "desktop") === "mobile");
  const frameShots = gallery.filter((shot) => (shot.type ?? "desktop") !== "mobile");

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-start">
      <div className="grid flex-1 grid-cols-[repeat(auto-fit,minmax(240px,1fr))] items-start gap-4">
        {frameShots.map((shot) => (
          <GalleryItem key={shot.id} shot={shot} host={host} />
        ))}
      </div>
      {mobileShot && (
        <div className="w-full flex-none md:w-[220px]">
          <GalleryItem shot={mobileShot} host={host} />
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Wire it into `app/projets/[slug]/page.tsx`**

In `app/projets/[slug]/page.tsx`, replace the import of `GalleryItem` with `ProjectGallery`:

```tsx
import ProjectGallery from "@/components/projects/ProjectGallery";
```

(remove the `import GalleryItem from "@/components/projects/GalleryItem";` line — `page.tsx` no longer renders it directly)

Then replace the gallery grid block:

```tsx
<div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-4">
  {project.gallery.map((shot) => (
    <GalleryItem key={shot.id} shot={shot} host={project.host} />
  ))}
</div>
```

with:

```tsx
<ProjectGallery gallery={project.gallery} host={project.host} />
```

- [ ] **Step 3: Verify — type-check, lint, visual check**

Run:
```bash
npx tsc --noEmit
npm run lint
npm run dev
```
Open `http://localhost:3000/projets/avena` and `http://localhost:3000/projets/les-tsabloz`:
- On `avena` (has `desktop`, `full`, and `mobile` shots mixed in the data order), confirm the `desktop`/`full` shots form a grid on the left/above and the phone mockup sits in its own column to the right (or below, on narrow viewports) — and that the `desktop`/`full` cells stay 16:10 regardless of the phone mockup's height.
- On `les-tsabloz` (placeholder items, no `src` yet), confirm the placeholders still render inert as before, just repositioned into the same two zones.
- Resize the browser down to a narrow (mobile) width and confirm the layout stacks (`flex-col`) instead of overflowing.

- [ ] **Step 4: Commit**

```bash
git add components/projects/ProjectGallery.tsx "app/projets/[slug]/page.tsx"
git commit -m "feat(gallery): split layout into frame grid + mobile slot"
```

---

### Task 3: `GalleryLightbox` — click to open, carousel, keyboard/backdrop close

**Files:**
- Create: `components/projects/GalleryLightbox.tsx`
- Modify: `components/projects/GalleryItem.tsx`
- Modify: `components/projects/ProjectGallery.tsx`

**Interfaces:**
- Consumes: `PhoneFrame` (Task 1) — `{ children, className?, compact? }`; `BrowserFrame` (existing, unmodified) — `{ host, children, aspectClassName?, compact?, className? }`; `ProjectShot` (existing, unmodified) — `{ src?, alt, sizes, className? }`.
- Produces: `GalleryLightbox` component — `{ gallery: ProjectGalleryItem[]; host: string; currentIndex: number; onNavigate: (index: number) => void; onClose: () => void }`. `GalleryItem` gains an optional `onOpen?: () => void` prop — when provided and `shot.src` is set, the item becomes clickable/keyboard-activatable and calls `onOpen`.

This task wires up full click-to-open/carousel/close behavior. The `full`-type slide reuses `ProjectShot` (`fill`, cropped) exactly like `desktop` for now — Task 4 swaps it for the real-scroll viewport, kept separate since it's a distinct, independently-testable piece of behavior.

- [ ] **Step 1: Add `onOpen` support to `GalleryItem.tsx`**

Modify `components/projects/GalleryItem.tsx`:

```tsx
import type { KeyboardEvent } from "react";
import type { ProjectGalleryItem } from "@/data/projects";
import BrowserFrame from "./BrowserFrame";
import PhoneFrame from "./PhoneFrame";
import ProjectShot from "./ProjectShot";

type Props = {
  shot: ProjectGalleryItem;
  host: string;
  onOpen?: () => void;
};

const sizes = "(min-width: 768px) 25vw, 50vw";

export default function GalleryItem({ shot, host, onOpen }: Props) {
  const type = shot.type ?? "desktop";
  const clickable = Boolean(shot.src && onOpen);

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onOpen?.();
    }
  }

  const interactive = {
    role: clickable ? ("button" as const) : undefined,
    tabIndex: clickable ? 0 : undefined,
    onClick: clickable ? onOpen : undefined,
    onKeyDown: clickable ? handleKeyDown : undefined,
    "aria-label": clickable ? `Agrandir : ${shot.alt}` : undefined,
  };
  const clickableClass = clickable
    ? "cursor-pointer transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    : "";

  if (type === "mobile") {
    return (
      <PhoneFrame
        compact
        className={`mx-auto w-full max-w-[220px] ${clickableClass}`}
        {...interactive}
      >
        <ProjectShot src={shot.src} alt={shot.alt} sizes={sizes} />
      </PhoneFrame>
    );
  }

  if (type === "full") {
    return (
      <div
        className={`group relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-base-content/25 ${clickableClass}`}
        {...interactive}
      >
        <ProjectShot
          src={shot.src}
          alt={shot.alt}
          sizes={sizes}
          className="object-top transition-[object-position] duration-[1400ms] ease-out group-hover:object-bottom"
        />
      </div>
    );
  }

  return (
    <BrowserFrame
      host={host}
      compact
      className={`rounded-2xl border border-base-content/25 ${clickableClass}`}
      {...interactive}
    >
      <ProjectShot src={shot.src} alt={shot.alt} sizes={sizes} />
    </BrowserFrame>
  );
}
```

Note: `interactive`'s values are `undefined` (not omitted) when not clickable — spreading it always attaches the same five prop *names* with `undefined` values, which React/JSX treats as "no attribute rendered." This keeps the type of `interactive` stable (no union type from a conditional object shape) and works identically on a plain `<div>` and on `BrowserFrame`/`PhoneFrame`, as long as those two forward `role`/`tabIndex`/`onClick`/`onKeyDown`/`aria-label` — that's what Steps 2 and 3 add.

- [ ] **Step 2: Type `BrowserFrame.tsx`'s props off `ComponentPropsWithoutRef<"div">` and forward the rest**

Modify `components/projects/BrowserFrame.tsx`:

```tsx
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Props = {
  host: string;
  children: ReactNode;
  aspectClassName?: string;
  compact?: boolean;
  className?: string;
} & Omit<ComponentPropsWithoutRef<"div">, "className" | "children">;

export default function BrowserFrame({
  host,
  children,
  aspectClassName = "aspect-[16/10]",
  compact = false,
  className = "rounded-[28px] border-2 border-base-content",
  ...rest
}: Props) {
  return (
    <div className={`overflow-hidden ${className}`} {...rest}>
      <div
        aria-hidden="true"
        className={`flex items-center gap-3 border-b-2 border-base-content bg-base-200 ${
          compact ? "px-3 py-2" : "px-5 py-3.5"
        }`}
      >
        <div className="flex flex-none gap-1.5">
          <span
            className={`rounded-full bg-base-content/25 ${
              compact ? "h-2 w-2" : "h-3 w-3"
            }`}
          />
          <span
            className={`rounded-full bg-base-content/25 ${
              compact ? "h-2 w-2" : "h-3 w-3"
            }`}
          />
          <span
            className={`rounded-full bg-base-content/25 ${
              compact ? "h-2 w-2" : "h-3 w-3"
            }`}
          />
        </div>
        <div
          className={`flex-1 truncate rounded-full border border-base-content/20 bg-base-100 text-center font-sans text-base-content/60 theme-nord:text-base-content/75 ${
            compact ? "px-2 py-0.5 text-[10px]" : "px-4 py-1 text-xs"
          }`}
        >
          {host}
        </div>
      </div>
      <div className={`relative w-full ${aspectClassName}`}>{children}</div>
    </div>
  );
}
```

- [ ] **Step 3: Add `...rest` forwarding to `PhoneFrame.tsx`**

Modify `components/projects/PhoneFrame.tsx`:

```tsx
// components/projects/PhoneFrame.tsx
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  compact?: boolean;
} & Omit<ComponentPropsWithoutRef<"div">, "className" | "children">;

export default function PhoneFrame({
  children,
  className = "mx-auto w-full max-w-[220px]",
  compact = false,
  ...rest
}: Props) {
  return (
    <div
      className={`flex aspect-[9/17] flex-col overflow-hidden rounded-[36px] border-2 border-base-content bg-base-200 ${
        compact ? "gap-1.5 p-2" : "gap-2 p-3"
      } ${className}`}
      {...rest}
    >
      <span
        aria-hidden="true"
        className={`mx-auto flex-none rounded-full bg-base-content/25 ${
          compact ? "h-1.5 w-16" : "h-2 w-24"
        }`}
      />
      <div className="relative flex-1 overflow-hidden rounded-[26px]">
        {children}
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Create `GalleryLightbox.tsx`**

```tsx
// components/projects/GalleryLightbox.tsx
"use client";

import { useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { ProjectGalleryItem } from "@/data/projects";
import BrowserFrame from "./BrowserFrame";
import PhoneFrame from "./PhoneFrame";
import ProjectShot from "./ProjectShot";

type Props = {
  gallery: ProjectGalleryItem[];
  host: string;
  currentIndex: number;
  onNavigate: (index: number) => void;
  onClose: () => void;
};

const navButtonClass =
  "absolute top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-base-content/20 bg-base-100 text-base-content transition-colors hover:border-primary hover:text-primary";

export default function GalleryLightbox({
  gallery,
  host,
  currentIndex,
  onNavigate,
  onClose,
}: Props) {
  const shot = gallery[currentIndex];
  const type = shot.type ?? "desktop";

  const goPrev = useCallback(() => {
    onNavigate((currentIndex - 1 + gallery.length) % gallery.length);
  }, [currentIndex, gallery.length, onNavigate]);

  const goNext = useCallback(() => {
    onNavigate((currentIndex + 1) % gallery.length);
  }, [currentIndex, gallery.length, onNavigate]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") goPrev();
      if (event.key === "ArrowRight") goNext();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, goPrev, goNext]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-base-300/90 p-4 sm:p-8"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Fermer"
        className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-base-content/20 bg-base-100 text-base-content transition-colors hover:border-primary hover:text-primary sm:right-8 sm:top-8"
      >
        <X size={20} />
      </button>

      {gallery.length > 1 && (
        <>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              goPrev();
            }}
            aria-label="Image précédente"
            className={`${navButtonClass} left-2 sm:left-6`}
          >
            <ChevronLeft size={22} />
          </button>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              goNext();
            }}
            aria-label="Image suivante"
            className={`${navButtonClass} right-2 sm:right-6`}
          >
            <ChevronRight size={22} />
          </button>
        </>
      )}

      <div
        className="flex w-full max-w-[1100px] flex-col items-center gap-4"
        onClick={(event) => event.stopPropagation()}
      >
        {type === "mobile" ? (
          <PhoneFrame className="mx-auto w-full max-w-[320px] sm:max-w-[380px]">
            <ProjectShot src={shot.src} alt={shot.alt} sizes="380px" />
          </PhoneFrame>
        ) : (
          <BrowserFrame host={host}>
            <ProjectShot src={shot.src} alt={shot.alt} sizes="1100px" />
          </BrowserFrame>
        )}
        {gallery.length > 1 && (
          <span className="font-sans text-sm text-base-content/70">
            {currentIndex + 1} / {gallery.length}
          </span>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Wire lightbox state into `ProjectGallery.tsx`**

Replace `components/projects/ProjectGallery.tsx`:

```tsx
// components/projects/ProjectGallery.tsx
"use client";

import { useState } from "react";
import type { ProjectGalleryItem } from "@/data/projects";
import GalleryItem from "./GalleryItem";
import GalleryLightbox from "./GalleryLightbox";

type Props = {
  gallery: ProjectGalleryItem[];
  host: string;
};

export default function ProjectGallery({ gallery, host }: Props) {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  const mobileShot = gallery.find((shot) => (shot.type ?? "desktop") === "mobile");
  const frameShots = gallery.filter((shot) => (shot.type ?? "desktop") !== "mobile");

  return (
    <>
      <div className="flex flex-col gap-4 md:flex-row md:items-start">
        <div className="grid flex-1 grid-cols-[repeat(auto-fit,minmax(240px,1fr))] items-start gap-4">
          {frameShots.map((shot) => (
            <GalleryItem
              key={shot.id}
              shot={shot}
              host={host}
              onOpen={() => setCurrentIndex(gallery.indexOf(shot))}
            />
          ))}
        </div>
        {mobileShot && (
          <div className="w-full flex-none md:w-[220px]">
            <GalleryItem
              shot={mobileShot}
              host={host}
              onOpen={() => setCurrentIndex(gallery.indexOf(mobileShot))}
            />
          </div>
        )}
      </div>
      {currentIndex !== null && (
        <GalleryLightbox
          gallery={gallery}
          host={host}
          currentIndex={currentIndex}
          onNavigate={setCurrentIndex}
          onClose={() => setCurrentIndex(null)}
        />
      )}
    </>
  );
}
```

- [ ] **Step 6: Verify — type-check, lint, manual interaction check**

Run:
```bash
npx tsc --noEmit
npm run lint
npm run dev
```
Open `http://localhost:3000/projets/avena` and confirm:
- Clicking any `desktop`/`full`/`mobile` shot with a real image opens the lightbox on that exact image, in the matching chrome (browser frame or phone frame).
- `←`/`→` keys and the on-screen prev/next buttons move through **all** gallery items in their original data order (check against the `gallery` array order in `data/projects.ts`), wrapping around at both ends.
- `Escape` and clicking the backdrop both close it; clicking the framed image itself does not close it.
- Tabbing to a gallery image with the keyboard and pressing `Enter` or `Space` also opens the lightbox.
- Open `http://localhost:3000/projets/les-tsabloz` and confirm the placeholder (no-`src`) items are NOT clickable (no pointer cursor, no keyboard focus outline, clicking does nothing).
- While the lightbox is open, confirm the page behind it cannot be scrolled (body scroll is locked), and scrolling works normally again after closing it.

- [ ] **Step 7: Commit**

```bash
git add components/projects/GalleryLightbox.tsx components/projects/GalleryItem.tsx components/projects/ProjectGallery.tsx components/projects/BrowserFrame.tsx components/projects/PhoneFrame.tsx
git commit -m "feat(gallery): add click-to-open lightbox with carousel navigation"
```

---

### Task 4: Real-scroll viewport for `full`-type lightbox slides

**Files:**
- Modify: `components/projects/GalleryLightbox.tsx`

**Interfaces:**
- Consumes: `BrowserFrame` (unmodified since Task 3) — content area is the `relative w-full aspect-[16/10]` div described in `components/projects/BrowserFrame.tsx:51`.
- No new exports — this task only changes `GalleryLightbox`'s internal rendering for `type === "full"`.

- [ ] **Step 1: Special-case the `full` type in `GalleryLightbox.tsx`**

In `components/projects/GalleryLightbox.tsx`, replace the slide-rendering block:

```tsx
{type === "mobile" ? (
  <PhoneFrame className="mx-auto w-full max-w-[320px] sm:max-w-[380px]">
    <ProjectShot src={shot.src} alt={shot.alt} sizes="380px" />
  </PhoneFrame>
) : (
  <BrowserFrame host={host}>
    <ProjectShot src={shot.src} alt={shot.alt} sizes="1100px" />
  </BrowserFrame>
)}
```

with:

```tsx
{type === "mobile" ? (
  <PhoneFrame className="mx-auto w-full max-w-[320px] sm:max-w-[380px]">
    <ProjectShot src={shot.src} alt={shot.alt} sizes="380px" />
  </PhoneFrame>
) : type === "full" ? (
  <BrowserFrame host={host}>
    {shot.src ? (
      <div className="absolute inset-0 overflow-y-auto">
        {/* eslint-disable-next-line @next/next/no-img-element -- needs its natural intrinsic height to drive real scroll, next/image fill would crop it instead */}
        <img src={shot.src} alt={shot.alt} className="h-auto w-full" />
      </div>
    ) : (
      <ProjectShot src={shot.src} alt={shot.alt} sizes="1100px" />
    )}
  </BrowserFrame>
) : (
  <BrowserFrame host={host}>
    <ProjectShot src={shot.src} alt={shot.alt} sizes="1100px" />
  </BrowserFrame>
)}
```

- [ ] **Step 2: Verify — type-check, lint, manual scroll check**

Run:
```bash
npx tsc --noEmit
npm run lint
npm run dev
```
Open `http://localhost:3000/projets/avena` and click the `full`-type gallery shot (`avena-g2`, "Fiche de logement") to open it in the lightbox:
- Confirm the frame is still a fixed 16:10 window (same size as the `desktop` slides), but the image inside is now scrollable with the mouse wheel, and dragging/scrolling reveals the entire page screenshot from top to bottom (not just the top crop).
- Confirm the grid's small `full`-type card (`avena-g2` in the frame grid) still uses the original hover-triggered pan — unchanged by this task.
- Confirm navigating with `←`/`→` away from and back to this slide resets the scroll position (no leftover scroll offset bleeding into other slides — verify by scrolling down on the full-type slide, pressing `→` then `←` to return to it, and confirming it's back at the top).

- [ ] **Step 3: Commit**

```bash
git add components/projects/GalleryLightbox.tsx
git commit -m "feat(gallery): make full-type lightbox slides scrollable instead of hover-panned"
```

---

## Self-Review Notes

- **Spec coverage:** Two-zone layout → Task 2. `PhoneFrame` extraction → Task 1. Lightbox open/close/keyboard/backdrop/carousel-order/body-scroll-lock → Task 3. `full`-type real-scroll in lightbox vs. unchanged hover-pan in grid → Task 4. Placeholder (no-`src`) items stay inert → Task 3, Step 1 (`clickable` check) and verified in Task 3 Step 6. `BrowserFrame`/`PhoneFrame` reused at two sizes via existing prop shape → Tasks 1, 3, 4.
- **Type consistency:** `GalleryItem`'s `onOpen?: () => void` (Task 3) matches `ProjectGallery`'s `onOpen={() => setCurrentIndex(...)}` callback shape. `GalleryLightbox`'s `currentIndex`/`onNavigate`/`onClose` props match exactly how `ProjectGallery` calls it in Task 3, Step 5, and stay unchanged through Task 4. `PhoneFrame`'s props (`children`, `className`, `compact`) are used consistently in `GalleryItem` (Task 1 and 3) and `GalleryLightbox` (Task 3 and 4).
- **Note on Task 3, Step 1:** flags that `BrowserFrame`/`PhoneFrame` need `...rest` forwarding for the click/keyboard props to reach the DOM — Steps 2 and 3 of that task implement exactly that, so there's no dangling dependency.
