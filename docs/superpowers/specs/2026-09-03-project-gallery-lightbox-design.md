# Project gallery layout + lightbox — design

## Problem

The project detail page's gallery (`app/projets/[slug]/page.tsx`, rendered
via `components/projects/GalleryItem.tsx`) has two bugs and is missing a
zoom/carousel feature:

1. **`full` type items don't actually keep a 16:10 ratio.** They use a
   fixed pixel height (`h-[320px]`) with a flexible width, so their ratio
   drifts with the grid column width instead of staying locked at 16:10.
2. **`desktop` type items can be stretched off-ratio by their row
   neighbors.** The gallery grid uses CSS Grid's default
   `align-items: stretch`, so whenever a taller item (the portrait
   `mobile` shot) shares a row with a `desktop`/`full` item, the shorter
   item is stretched to fill the row height, overriding its
   `aspect-[16/10]` class.
3. **No way to enlarge a gallery image.** Images are view-only at card
   size, with no lightbox, no carousel between shots, and no way to see
   the full height of a `full`-type page screenshot (it only reveals
   itself via a hover-triggered pan inside a small fixed box).

## Goals

- `desktop` and `full` gallery items always render at a true 16:10 ratio,
  regardless of what else is in the grid.
- The single `mobile` item never affects the ratio/height of the other
  items.
- Any gallery image with a source can be clicked to open an enlarged
  lightbox view.
- The enlarged view keeps the same "fake window" chrome as the grid
  (browser frame for `desktop`/`full`, phone frame for `mobile`).
- The enlarged view supports a carousel (prev/next) across the whole
  gallery, in original order, wrapping at both ends.
- The `full` type's mechanism for revealing a tall page screenshot keeps
  working when enlarged.

## Non-goals

- No changes to `data/projects.ts`'s `ProjectGalleryItem` shape (no new
  fields).
- No changes to the `ProjectCard` cover image treatment (home/index
  variants) — this only touches the gallery on the project detail page.
- No masonry/Pinterest-style layout — two simple zones are enough for the
  current data shape (N desktop/full shots + exactly one mobile shot).

## Design

### 1. Two-zone gallery layout

Replace the single mixed `grid-cols-[repeat(auto-fit,minmax(240px,1fr))]`
grid with two zones, laid out `flex-col md:flex-row` (stacked on narrow
viewports, side-by-side from `md` up):

- **Frame grid** (left/main): all `desktop` + `full` items only, in a
  `grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] items-start gap-4`
  grid. `items-start` removes the stretch behavior. The `full` type
  switches from `h-[320px]` to `aspect-[16/10]`, matching `desktop`. Every
  cell in this grid is therefore always a true 16:10 box, independent of
  its neighbors.
- **Mobile slot** (right/below): the single `mobile` item, rendered at its
  own `aspect-[9/17]`, `flex-none`, sized independently — it never enters
  the grid's row-height calculation, so it can no longer distort anything.

Filtering happens in the new `ProjectGallery` component (see below):
`gallery.filter(g => g.type !== "mobile")` for the frame grid,
`gallery.find(g => g.type === "mobile")` for the slot. If a project ever
has no mobile shot, that slot is simply omitted.

### 2. `ProjectGallery` client component (new)

`app/projets/[slug]/page.tsx` currently renders the gallery inline:

```tsx
<div className="grid ...">
  {project.gallery.map((shot) => (
    <GalleryItem key={shot.id} shot={shot} host={project.host} />
  ))}
</div>
```

This becomes a single new client component,
`components/projects/ProjectGallery.tsx`, taking `gallery` and `host`
props. It owns:

- `isOpen: boolean`, `currentIndex: number` state.
- The two-zone layout described above, rendering each item via
  `GalleryItem` (updated to accept an `onOpen` callback and an
  `isClickable` flag).
- The `Lightbox` overlay (see below), mounted when `isOpen`.

Only items with a resolved `src` are clickable (placeholder items with no
`src` render as today, inert, no pointer cursor).

`page.tsx` changes to:

```tsx
<ProjectGallery gallery={project.gallery} host={project.host} />
```

### 3. Lightbox behavior

A new `components/projects/GalleryLightbox.tsx` (rendered by
`ProjectGallery`), a full-screen fixed overlay:

- Body scroll is locked while open (`document.body.style.overflow =
  "hidden"` in a `useEffect`, restored on close/unmount). This is
  standard modal behavior and is independent of the in-image scroll
  described in §4 — the two don't conflict because the in-image scroll
  container captures wheel/touch events over itself.
- Keyboard: `Escape` closes, `ArrowLeft`/`ArrowRight` navigate.
- Click on the backdrop closes; click on the frame/image does not.
- Visible prev/next buttons and a "current / total" counter.
- Navigation always cycles through the **full** `gallery` array in its
  original order (mixing `desktop`/`full`/`mobile`), wrapping at both
  ends — not scoped to a single zone/type.
- The slide's chrome matches its type:
  - `desktop` / `full`: rendered inside `BrowserFrame` (existing
    component, already parameterized for size — used here at full/large
    size instead of `compact`), fixed at `aspect-[16/10]`.
  - `mobile`: rendered inside a new `PhoneFrame` component (see §5) at
    its native `aspect-[9/17]`.

### 4. `full`-type scroll/pan: grid vs. lightbox

- **Grid (small card):** unchanged. Hover-triggered `object-position`
  transition (`group-hover:object-bottom`), exactly as today.
- **Lightbox (enlarged):** becomes a real scrollable viewport instead of
  a hover trick, since hover doesn't work on touch and doesn't fit an
  enlarged, deliberately-inspected view:
  - The 16:10 `BrowserFrame` content area gets `overflow-y-auto`.
  - Inside it, the image renders via a plain `<img src={shot.src}
    className="w-full h-auto" />` (not `next/image` `fill`) so the
    browser sizes it at its true intrinsic aspect ratio — taller than the
    16:10 viewport — enabling native wheel/touch/drag scroll to pan
    through the whole page screenshot. No new data field is needed since
    the real image dimensions drive the layout directly.
  - `desktop` and `mobile` slides keep using `ProjectShot`
    (`next/image`, `fill`, `object-cover`) exactly as in the grid, just
    at a larger rendered size — they're already a single "viewport"
    screenshot, nothing to pan through.

### 5. `PhoneFrame` component (new, extracted)

The phone-mockup chrome currently lives inline inside `GalleryItem`'s
`mobile` branch (rounded border, notch bar, inner rounded content area).
Extract it into `components/projects/PhoneFrame.tsx`, mirroring
`BrowserFrame`'s existing prop shape (`children`, `className`, size
variant), so both the grid's small mobile card and the lightbox's
enlarged mobile slide render the same chrome at different sizes — the
same reuse pattern `BrowserFrame` already established.

## File-level summary of changes

- `components/projects/GalleryItem.tsx` — `full` type: fixed height →
  `aspect-[16/10]`. `mobile` type: chrome markup extracted to
  `PhoneFrame`. All types: accept `onOpen`/clickable behavior.
- `components/projects/PhoneFrame.tsx` — **new**, extracted phone chrome.
- `components/projects/ProjectGallery.tsx` — **new**, two-zone layout +
  lightbox state owner.
- `components/projects/GalleryLightbox.tsx` — **new**, overlay/carousel.
- `app/projets/[slug]/page.tsx` — swap the inline gallery grid for
  `<ProjectGallery gallery={project.gallery} host={project.host} />`.
- `data/projects.ts` — no changes.

## Testing

- Manual verification in the browser (dev server) per project
  (`avena`, `les-tsabloz`, `aencrage`) covering:
  - Grid: `desktop`/`full` cells stay 16:10 regardless of the mobile
    slot's height, at various viewport widths (mobile stack vs. desktop
    side-by-side).
  - Placeholder gallery items (no `src`) remain inert, non-clickable.
  - Lightbox opens on click, closes on Escape/backdrop click, arrow keys
    and buttons navigate and wrap at both ends.
  - `full`-type slide is scrollable in the lightbox (wheel + drag/touch)
    and shows the entire page screenshot.
  - `mobile`-type slide keeps its phone chrome and portrait ratio when
    enlarged.
  - Body scroll is locked while the lightbox is open and restored on
    close.
