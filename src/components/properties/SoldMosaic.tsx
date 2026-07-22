"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { SoldPhoto } from "@/data/soldProperties";

type Props = {
  photos: SoldPhoto[];
  /** Affiche les légendes sur les vignettes et dans la visionneuse. */
  showCaptions?: boolean;
};

// Ratios variés pour donner l'effet mosaïque (hauteurs différentes).
const ASPECTS = ["aspect-4/3", "aspect-3/4", "aspect-square", "aspect-4/5", "aspect-5/4"];

export function SoldMosaic({ photos, showCaptions = false }: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);
  const isOpen = activeIndex !== null;
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const safeIndex = useMemo(() => {
    if (activeIndex === null) return 0;
    if (activeIndex < 0) return 0;
    if (activeIndex >= photos.length) return photos.length - 1;
    return activeIndex;
  }, [activeIndex, photos.length]);

  const close = useCallback(() => setVisible(false), []);
  const goNext = useCallback(
    () => setActiveIndex((prev) => (prev === null ? 0 : (prev + 1) % photos.length)),
    [photos.length],
  );
  const goPrev = useCallback(
    () =>
      setActiveIndex((prev) =>
        prev === null ? 0 : (prev - 1 + photos.length) % photos.length,
      ),
    [photos.length],
  );

  useEffect(() => {
    if (!isOpen) return;
    const raf = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(raf);
  }, [isOpen]);

  useEffect(() => {
    if (visible || !isOpen) return;
    const timer = setTimeout(() => setActiveIndex(null), 250);
    return () => clearTimeout(timer);
  }, [visible, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") goNext();
      if (event.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, close, goNext, goPrev]);

  useEffect(() => {
    if (!isOpen) return;
    thumbRefs.current[safeIndex]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [isOpen, safeIndex]);

  if (photos.length === 0) return null;

  const open = (index: number) => {
    setActiveIndex(index);
    setVisible(false);
  };

  const activePhoto = photos[safeIndex];

  return (
    <>
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:balance]">
        {photos.map((photo, index) => (
          <figure key={photo.src} className="group mb-6 break-inside-avoid">
            <button
              type="button"
              onClick={() => open(index)}
              className={`relative ${ASPECTS[index % ASPECTS.length]} w-full overflow-hidden bg-cream-dark cursor-pointer`}
              aria-label={`Ouvrir la photo : ${photo.caption}`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <span className="pointer-events-none absolute inset-0 bg-navy/0 transition-colors duration-300 group-hover:bg-navy/10" />
              {showCaptions && (
                <span className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 bg-linear-to-t from-navy/80 to-transparent px-4 pb-3 pt-10 text-sm text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  {photo.caption}
                </span>
              )}
            </button>
          </figure>
        ))}
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50" aria-hidden={!visible}>
          <button
            type="button"
            onClick={close}
            aria-label="Fermer la galerie"
            className={`absolute inset-0 bg-navy/70 backdrop-blur-sm transition-opacity duration-300 ease-out ${
              visible ? "opacity-100" : "opacity-0"
            }`}
          />

          <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-8">
            <div
              role="dialog"
              aria-modal="true"
              aria-label="Galerie photo"
              className={`relative w-full max-w-4xl transition-all duration-300 ease-out ${
                visible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-3"
              }`}
            >
              <div className="bg-white shadow-2xl overflow-hidden">
                <div className="flex items-center justify-between gap-3 border-b border-cream-dark px-5 py-3">
                  <div className="min-w-0">
                    {showCaptions && (
                      <p className="truncate text-sm font-medium text-navy">{activePhoto.caption}</p>
                    )}
                    <p className="text-xs text-navy/50">
                      Photo {safeIndex + 1} sur {photos.length}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={close}
                    aria-label="Fermer"
                    className="shrink-0 flex h-9 w-9 items-center justify-center rounded-full text-navy/60 transition-colors hover:bg-cream hover:text-navy"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M6 6l12 12M18 6L6 18" />
                    </svg>
                  </button>
                </div>

                <div className="relative bg-cream p-3 sm:p-4">
                  <div className="relative mx-auto aspect-4/3 max-h-[65vh] w-full overflow-hidden bg-cream-dark">
                    <Image
                      key={activePhoto.src}
                      src={activePhoto.src}
                      alt={activePhoto.alt}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 900px"
                      priority
                    />
                  </div>

                  {photos.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={goPrev}
                        aria-label="Photo precedente"
                        className="absolute left-5 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-navy shadow-md transition-all hover:bg-white hover:scale-105"
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M15 18l-6-6 6-6" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        onClick={goNext}
                        aria-label="Photo suivante"
                        className="absolute right-5 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-navy shadow-md transition-all hover:bg-white hover:scale-105"
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M9 6l6 6-6 6" />
                        </svg>
                      </button>
                    </>
                  )}
                </div>

                {photos.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto border-t border-cream-dark px-4 py-3">
                    {photos.map((photo, index) => (
                      <button
                        key={photo.src}
                        ref={(el) => {
                          thumbRefs.current[index] = el;
                        }}
                        type="button"
                        onClick={() => setActiveIndex(index)}
                        aria-label={`Aller a la photo ${index + 1}`}
                        className={`relative h-14 w-20 shrink-0 overflow-hidden transition-all ${
                          index === safeIndex
                            ? "ring-2 ring-gold ring-offset-2 ring-offset-white"
                            : "opacity-60 hover:opacity-100"
                        }`}
                      >
                        <Image
                          src={photo.src}
                          alt={photo.alt}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
