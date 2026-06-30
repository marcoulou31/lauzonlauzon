"use client";

import Image from "next/image";
import { useState } from "react";
import type { PropertyImage } from "@/lib/types";

type PropertyGalleryProps = {
  images: PropertyImage[];
  title: string;
};

export function PropertyGallery({ images, title }: PropertyGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="space-y-4">
      <div className="relative aspect-[16/10] overflow-hidden bg-cream-dark">
        <Image
          src={images[activeIndex].src}
          alt={images[activeIndex].alt}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 70vw"
        />
      </div>

      {images.length > 1 && (
        <div className="grid grid-cols-3 gap-3">
          {images.map((image, index) => (
            <button
              key={image.src}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`relative aspect-[4/3] overflow-hidden transition-opacity ${
                activeIndex === index
                  ? "ring-2 ring-gold ring-offset-2"
                  : "opacity-70 hover:opacity-100"
              }`}
              aria-label={`Voir l'image ${index + 1} de ${title}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                sizes="200px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
