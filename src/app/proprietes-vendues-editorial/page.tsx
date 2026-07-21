import type { Metadata } from "next";
import { SoldEditorial } from "@/components/properties/SoldEditorial";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getSoldPhotos } from "@/data/soldProperties";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Propriétés vendues — Éditorial",
  description: `Découvrez quelques-unes des propriétés vendues par ${siteConfig.name}.`,
};

export default function SoldEditorialPage() {
  const photos = getSoldPhotos();

  return (
    <>
      <section className="relative isolate overflow-hidden bg-navy py-20">
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

      <SoldEditorial photos={photos} />
    </>
  );
}
