import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/data/site";

export function ExpertiseGrid() {
  return (
    <section className="bg-navy py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="Expertise"
          title="Des solutions pour chaque projet"
          description="Résidentiel, commercial, hôtelier ou médical — nous élaborons une stratégie spécifique pour chaque transaction."
          align="center"
          light
        />

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {siteConfig.expertise.map((item) => (
            <div
              key={item.title}
              className="border border-cream/10 bg-navy-light/30 p-8 transition-colors hover:border-gold/30"
            >
              <h3 className="font-serif text-2xl text-cream">{item.title}</h3>
              <p className="mt-2 text-sm font-medium uppercase tracking-wider text-gold-light">
                {item.subtitle}
              </p>
              <p className="mt-4 leading-relaxed text-cream/75">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
