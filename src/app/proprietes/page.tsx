import type { Metadata } from "next";
import { PropertySpotlight } from "@/components/properties/PropertySpotlight";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getAllProperties } from "@/data/properties";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Propriétés",
  description: `Découvrez les inscriptions actuelles de ${siteConfig.name}. Propriétés résidentielles et commerciales à Québec.`,
};

export default function PropertiesPage() {
  const allProperties = getAllProperties();

  return (
    <>
      <section className="bg-navy py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeading
            eyebrow="Inscriptions"
            title="Nos propriétés"
            description="Chaque propriété est présentée avec le soin qu'elle mérite. Découvrez nos inscriptions actuelles."
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
    </>
  );
}
