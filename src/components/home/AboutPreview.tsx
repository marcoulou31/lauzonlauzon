import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/data/site";

export function AboutPreview() {
  return (
    <section className="bg-cream py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="À propos"
              title={`${siteConfig.broker.name}, ${siteConfig.broker.credentials}`}
              description="Établie depuis plus de 25 années, Lauzon & Lauzon est une bannière respectée et reconnue pour sa clientèle, la qualité des produits offerts et l'efficacité dans la finalité de ses transactions."
            />

            <div className="mt-8 space-y-3 text-navy/80">
              <p>{siteConfig.broker.title}</p>
              <p>{siteConfig.broker.experience}</p>
              <p>
                Qualifiée dans les secteurs commercial et résidentiel, déterminée
                à vous offrir un service professionnel et compétitif.
              </p>
            </div>

            <div className="mt-8">
              <p className="mb-3 text-sm font-medium uppercase tracking-[0.15em] text-gold-dark">
                Secteurs desservis
              </p>
              <div className="flex flex-wrap gap-2">
                {siteConfig.territories.map((territory) => (
                  <span
                    key={territory}
                    className="border border-cream-dark bg-white px-3 py-1 text-sm text-navy/80"
                  >
                    {territory}
                  </span>
                ))}
              </div>
            </div>

            <Link
              href="/a-propos"
              className="mt-8 inline-block text-sm font-medium text-gold-dark transition-colors hover:text-navy"
            >
              En savoir plus &rarr;
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
