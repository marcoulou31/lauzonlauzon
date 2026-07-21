import Image from "next/image";
import type { SoldPhoto } from "@/data/soldProperties";

type Props = {
  photos: SoldPhoto[];
};

export function SoldEditorial({ photos }: Props) {
  return (
    <>
      {photos.map((photo, index) => {
        const reversed = index % 2 === 1;
        const bgClass = index % 2 === 0 ? "bg-cream" : "bg-cream-dark";

        return (
          <section key={photo.src} className={`${bgClass} py-16 md:py-24`}>
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div
                className={`grid items-center gap-10 lg:grid-cols-5 lg:gap-16 ${
                  reversed ? "lg:[direction:rtl]" : ""
                }`}
              >
                <div className="relative min-h-[50vh] overflow-hidden lg:col-span-3 lg:min-h-[70vh] lg:[direction:ltr]">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    priority={index === 0}
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                  />
                </div>

                <div className="lg:col-span-2 lg:[direction:ltr]">
                  <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-gold">
                    Vendu
                  </p>
                  <p className="font-serif text-3xl leading-tight text-navy md:text-4xl">
                    {photo.caption}
                  </p>
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}
