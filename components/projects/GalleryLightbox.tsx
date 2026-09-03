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
  "absolute top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-base-content/20 bg-base-100 text-base-content transition-colors hover:border-primary hover:text-primary sm:flex";

const inlineNavButtonClass =
  "flex h-9 w-9 items-center justify-center rounded-full border border-base-content/20 bg-base-100 text-base-content transition-colors hover:border-primary hover:text-primary sm:hidden";

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
      className="fixed inset-0 z-[950] flex items-center justify-center bg-base-300/90 p-4 sm:p-8"
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
        className="flex w-full max-w-[1150px] flex-col items-center gap-4"
        onClick={(event) => event.stopPropagation()}
      >
        {type === "mobile" ? (
          <PhoneFrame
            aspectClassName="aspect-[393/830]"
            className="mx-auto h-[70vh] max-h-[640px] w-auto"
          >
            {shot.src ? (
              <div className="absolute inset-0 overflow-y-auto">
                {/* eslint-disable-next-line @next/next/no-img-element -- needs its natural intrinsic height to drive real scroll, next/image fill would crop it instead */}
                <img src={shot.src} alt={shot.alt} className="h-auto w-full" />
              </div>
            ) : (
              <ProjectShot src={shot.src} alt={shot.alt} sizes="420px" />
            )}
          </PhoneFrame>
        ) : type === "full" ? (
          <BrowserFrame
            host={host}
            className="mx-auto w-full rounded-[28px] border-2 border-base-content"
          >
            {shot.src ? (
              <div className="absolute inset-0 overflow-y-auto">
                {/* eslint-disable-next-line @next/next/no-img-element -- needs its natural intrinsic height to drive real scroll, next/image fill would crop it instead */}
                <img src={shot.src} alt={shot.alt} className="h-auto w-full" />
              </div>
            ) : (
              <ProjectShot src={shot.src} alt={shot.alt} sizes="1150px" />
            )}
          </BrowserFrame>
        ) : (
          <BrowserFrame
            host={host}
            className="mx-auto w-full rounded-[28px] border-2 border-base-content"
          >
            <ProjectShot src={shot.src} alt={shot.alt} sizes="1150px" />
          </BrowserFrame>
        )}
        {gallery.length > 1 && (
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={goPrev}
              aria-label="Image précédente"
              className={inlineNavButtonClass}
            >
              <ChevronLeft size={18} />
            </button>
            <span className="font-sans text-sm text-base-content/70">
              {currentIndex + 1} / {gallery.length}
            </span>
            <button
              type="button"
              onClick={goNext}
              aria-label="Image suivante"
              className={inlineNavButtonClass}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
