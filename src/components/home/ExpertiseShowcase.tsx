import { ScrollIndicator } from "@/components/home/ScrollIndicator";
import { siteConfig } from "@/data/site";

export function ExpertiseShowcase() {
  return (
    <section id="expertise" className="relative bg-navy py-10 md:py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="font-serif text-4xl text-cream md:text-5xl">
            Établie depuis plus de 25 années
          </h2>
          <p className="mt-4 text-xl leading-relaxed text-cream/80">
            Une bannière respectée et reconnue pour :
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {siteConfig.values.map((value) => (
              <div key={value.title} className="flex gap-4">
                <div className="mt-1 shrink-0">
                  <div className="h-2.5 w-2.5 rounded-full bg-gold" />
                </div>
                <div>
                  <h3 className="font-medium text-cream text-xl">{value.title}</h3>
                  <p className="mt-1 text-lg text-cream/70">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
      </div>

      <ScrollIndicator targetId="expertise-details" />
    </section>
  );
}
