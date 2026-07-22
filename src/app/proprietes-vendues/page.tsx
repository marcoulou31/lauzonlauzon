import type { Metadata } from "next";
import { SoldMosaic } from "@/components/properties/SoldMosaic";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getSoldPhotos } from "@/data/soldProperties";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Propriétés vendues — Mosaïque",
  description: `Découvrez quelques-unes des propriétés vendues par ${siteConfig.name}.`,
};

export default function SoldMosaicPage() {
  const photos = getSoldPhotos();

  return (
    <>
      <section className="relative isolate overflow-hidden bg-navy py-20">
        <div className="absolute inset-0 -z-10 bg-[url('/proprietes-vendues/thomas-maher-lac-saint-joseph-aerien.jpg')] bg-cover bg-center" />
        <div className="absolute inset-0 -z-10 bg-navy/65" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeading
            eyebrow="Réalisations"
            title="Propriétés vendues"
            description="Un aperçu des propriétés que nous avons eu le plaisir de vendre."
            light
            align="center"
          />
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SoldMosaic photos={photos} />
        </div>
      </section>
    </>
  );
}
