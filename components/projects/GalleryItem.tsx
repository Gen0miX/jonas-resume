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
