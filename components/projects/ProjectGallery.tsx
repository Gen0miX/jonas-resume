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
