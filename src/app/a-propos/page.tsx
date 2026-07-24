import type { Metadata } from "next";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "À propos",
  description: `Découvrez ${siteConfig.broker.name}, fondatrice de ${siteConfig.name}, courtier immobilier à Québec depuis plus de 25 ans.`,
};

export default function AboutPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden py-20">
        <div className="absolute inset-0 -z-10 bg-[url('/about-hero.jpg')] bg-cover bg-center" />
        <div className="absolute inset-0 -z-10 bg-navy/65" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeading
            as="h1"
            eyebrow="Notre histoire"
            title={siteConfig.name}
            description={siteConfig.slogan}
            descriptionClassName="italic"
            light
          />
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="relative aspect-9/10 overflow-hidden rounded-lg shadow-lg">
              <Image
                src="/chantal-lauzon.jpg"
                alt={siteConfig.broker.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>

            <div className="space-y-6 text-navy/80 leading-relaxed">
              <div>
                <h2 className="font-serif text-5xl text-navy">
                  {siteConfig.broker.name}
                  <span className="ml-3 text-lg font-medium uppercase tracking-wide text-gold-dark">
                    {siteConfig.broker.credentials}
                  </span>
                </h2>
              </div>

              <p className="text-2xl">
                Établie depuis plus de 25 années, Lauzon & Lauzon courtier est
                une bannière respectée et reconnue pour sa clientèle, la qualité
                des produits offerts et l&apos;efficacité dans la finalité de
                ses transactions.
              </p>

              <div>
                <p className="font-medium text-navy text-2xl">{siteConfig.broker.title}</p>
                <p className="mt-1 text-navy/70 text-xl">{siteConfig.broker.experience}</p>
              </div>

              <div className="border-t border-cream-dark pt-6">
                <p className="font-medium text-navy text-2xl">Expertise</p>
                <ul className="mt-3 space-y-2 text-lg text-navy/70">
                  <li>Qualifiée dans les secteurs commercial et résidentiel</li>
                  <li>Respectée et reconnue du milieu</li>
                  <li>Stratégies personnalisées pour chaque transaction</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cream-dark py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeading
            eyebrow="Territoires"
            title="Secteurs desservis"
            description="Une connaissance approfondie du marché immobilier de la région de Québec."
            align="center"
          />

          <div className="mt-12 flex flex-wrap justify-center gap-3">
            {siteConfig.territories.map((territory) => (
              <span
                key={territory}
                className="border border-cream-dark bg-white px-5 py-2 text-navy/80"
              >
                {territory}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
