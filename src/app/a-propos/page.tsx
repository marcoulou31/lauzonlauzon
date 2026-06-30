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
      <section className="bg-navy py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeading
            eyebrow="Notre histoire"
            title={siteConfig.broker.name}
            description={siteConfig.slogan}
            light
          />
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80"
                alt={siteConfig.broker.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            <div className="space-y-6 text-navy/80 leading-relaxed">
              <p>
                Établie depuis plus de 25 années, Lauzon & Lauzon courtier est
                une bannière respectée et reconnue pour sa clientèle, la qualité
                des produits offerts et l&apos;efficacité dans la finalité de
                ses transactions.
              </p>
              <p>
                Nous élaborons une stratégie spécifique pour chaque produit et
                pour tous les types de transactions, qu&apos;elles soient
                relatives aux secteurs résidentiel, commercial, hôtelier et
                médical. Peu importe le projet, nous proposons des solutions de
                partenariat et financement.
              </p>
              <p>
                Quelle que soit l&apos;ampleur du dossier, notre équipe vous
                conseillera judicieusement pour tous vos besoins.
              </p>

              <div className="border-l-2 border-gold pl-6">
                <p className="font-serif text-xl text-navy">
                  {siteConfig.broker.name} {siteConfig.broker.credentials}
                </p>
                <p className="mt-1 text-sm text-gold">
                  {siteConfig.broker.title}
                </p>
                <ul className="mt-4 space-y-1 text-sm">
                  <li>{siteConfig.broker.experience}</li>
                  <li>Qualifiée dans les secteurs commercial et résidentiel</li>
                  <li>Respectée et reconnue du milieu</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cream-dark py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeading
            eyebrow="Nos valeurs"
            title="Ce qui nous distingue"
            align="center"
          />

          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {siteConfig.values.map((value) => (
              <div key={value.title} className="bg-cream p-8">
                <h3 className="font-serif text-xl text-navy">{value.title}</h3>
                <p className="mt-3 leading-relaxed text-navy/70">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
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
