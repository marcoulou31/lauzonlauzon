import Image from "next/image";
import { siteConfig } from "@/data/site";

type ExpertiseItem = (typeof siteConfig.expertise)[number];
type FeaturedItem = Extract<ExpertiseItem, { images: readonly string[] }>;

function isFeatured(item: ExpertiseItem): item is FeaturedItem {
  return "images" in item;
}

const featured = siteConfig.expertise.filter(isFeatured);

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
      </div>

      <div className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h3 className="font-serif text-4xl text-navy md:text-5xl mb-16">
            Notre expertise
          </h3>

          <div className="space-y-20 lg:space-y-28">
            {featured.map((item, index) => (
              <div
                key={item.title}
                className="grid gap-8 lg:grid-cols-3 lg:items-start lg:gap-12"
              >
                <div
                  className={
                    index % 2 === 1 ? "lg:order-last lg:col-span-1" : "lg:col-span-1"
                  }
                >
                  <h4 className="font-serif text-3xl text-navy">{item.title}</h4>
                  <p className="mt-2 text-lg font-medium uppercase tracking-wide text-gold-dark">
                    {item.subtitle}
                  </p>
                  <p className="mt-4 leading-relaxed text-xl text-navy/70">
                    {item.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 lg:col-span-2">
                  <div className="relative col-span-2 aspect-video overflow-hidden rounded-lg shadow-md">
                    <Image
                      src={item.images[0]}
                      alt={item.title}
                      fill
                      sizes="(min-width: 1024px) 66vw, 100vw"
                      className="object-cover"
                      priority={index === 0}
                    />
                  </div>
                  {item.images.slice(1).map((src) => (
                    <div
                      key={src}
                      className="relative aspect-4/3 overflow-hidden rounded-lg shadow-md"
                    >
                      <Image
                        src={src}
                        alt={item.title}
                        fill
                        sizes="(min-width: 1024px) 33vw, 50vw"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
