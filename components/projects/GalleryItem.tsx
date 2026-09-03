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
