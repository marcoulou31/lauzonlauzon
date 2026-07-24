import type { Metadata } from "next";
import Image from "next/image";
import { SoldMosaic } from "@/components/properties/SoldMosaic";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getSoldPhotosByCategory } from "@/data/soldProperties";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Propriétés vendues — Mosaïque",
  description: `Découvrez quelques-unes des propriétés vendues par ${siteConfig.name}.`,
};

export default function SoldMosaicPage() {
  const groups = getSoldPhotosByCategory();

  return (
    <>
      <section className="relative isolate overflow-hidden bg-navy py-20">
        <Image
          src="/proprietes-vendues/thomas-maher-lac-saint-joseph-aerien.jpg"
          alt="Propriétés vendues à Québec"
          fill
          preload
          className="absolute inset-0 -z-10 object-cover"
          sizes="100vw"
          quality={70}
        />
        <div className="absolute inset-0 -z-10 bg-navy/65" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeading
            as="h1"
            eyebrow="Réalisations"
            title="Propriétés vendues"
            description="Un aperçu des propriétés que nous avons eu le plaisir de vendre."
            light
            align="center"
          />
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl space-y-16 px-6 md:space-y-24 lg:px-8">
          {groups.map((group) => (
            <div key={group.id}>
              <div className="mb-8 flex items-center gap-4">
                <h2 className="font-serif text-2xl text-navy md:text-3xl">{group.title}</h2>
                <span className="h-px flex-1 bg-cream-dark" aria-hidden />
              </div>
              <SoldMosaic photos={group.photos} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
