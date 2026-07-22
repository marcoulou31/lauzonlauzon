import type { Metadata } from "next";
import { PropertySpotlight } from "@/components/properties/PropertySpotlight";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { getAllInscriptionsForPage } from "@/lib/inscriptions";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Propriétés",
  description: `Découvrez les inscriptions actuelles de ${siteConfig.name}. Propriétés résidentielles et commerciales à Québec.`,
};

export default async function PropertiesPage() {
  const allProperties = await getAllInscriptionsForPage();

  return (
    <>
      <section className="relative isolate overflow-hidden py-20">
        <div className="absolute inset-0 -z-10 bg-[url('/proprietes-hero.jpg')] bg-cover bg-center" />
        <div className="absolute inset-0 -z-10 bg-navy/65" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeading
            eyebrow="Inscriptions"
            title="Nos propriétés"
            description="Découvrez nos propriétés."
            light
            align="center"
          />
        </div>
      </section>

      {allProperties.map((property, index) => (
        <PropertySpotlight
          key={property.slug}
          property={property}
          index={index}
        />
      ))}

      <section className="bg-navy py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
          <SectionHeading
            eyebrow="Réalisations"
            title="Propriétés vendues"
            description="Découvrez un aperçu des propriétés que nous avons eu le plaisir de vendre."
            light
            align="center"
          />
          <div className="mt-8 flex justify-center">
            <Button href="/proprietes-vendues-mosaique" variant="secondary">
              Voir nos propriétés vendues
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
