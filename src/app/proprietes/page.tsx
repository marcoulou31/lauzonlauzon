import type { Metadata } from "next";
import Image from "next/image";
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
      <section className="relative isolate overflow-hidden py-8 md:py-12">
        <Image
          src="/proprietes-hero.jpg"
          alt="Nos propriétés à Québec"
          fill
          preload
          className="absolute inset-0 -z-10 object-cover"
          sizes="100vw"
          quality={70}
        />
        <div className="absolute inset-0 -z-10 bg-navy/65" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex justify-center">
            <SectionHeading
              as="h1"
              eyebrow="Inscriptions"
              title="Nos propriétés"
              light
              align="center"
            />
          </div>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div className="flex h-full flex-col items-center text-center">
              <p className="text-xl leading-relaxed text-cream/80">
                Découvrez nos propriétés à vendre.
              </p>
              <div className="mt-auto pt-4">
                <Button href="#proprietes" variant="secondary">
                  Propriétés à vendre
                </Button>
              </div>
            </div>
            <div className="flex h-full flex-col items-center text-center">
              <p className="text-xl leading-relaxed text-cream/80">
                Découvrez un aperçu des propriétés que nous avons eu le
                plaisir de vendre.
              </p>
              <div className="mt-auto pt-4">
                <Button href="/proprietes-vendues" variant="secondary">
                  Propriétés vendues
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div id="proprietes" className="scroll-mt-[73px]">
        {allProperties.map((property, index) => (
          <PropertySpotlight
            key={property.slug}
            property={property}
            index={index}
          />
        ))}
      </div>
    </>
  );
}
