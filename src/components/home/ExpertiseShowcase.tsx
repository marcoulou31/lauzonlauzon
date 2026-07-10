import Image from "next/image";
import { siteConfig } from "@/data/site";

export function ExpertiseShowcase() {
  return (
    <section>
      <div className="bg-navy py-16">
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
                <div className="mt-1 flex-shrink-0">
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
      </div>

      <div className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h3 className="font-serif text-4xl text-navy md:text-5xl mb-12">
            Notre expertise
          </h3>

          <div className="grid gap-12 md:grid-cols-2 lg:gap-16">
            {siteConfig.expertise.map((item, index) => (
              <div
                key={item.title}
                className="flex flex-col gap-6"
              >
                <div className="overflow-hidden rounded-lg shadow-md">
                  <Image
                    src={`/expertise-${index + 1}.jpg`}
                    alt={item.title}
                    width={900}
                    height={475}
                    className="w-full h-auto object-cover"
                    priority={index < 2}
                  />
                </div>

                <div>
                  <h4 className="font-serif text-3xl text-navy">{item.title}</h4>
                  <p className="mt-2 text-lg font-medium uppercase tracking-wide text-gold">
                    {item.subtitle}
                  </p>
                  <p className="mt-3 leading-relaxed text-xl text-navy/70">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
