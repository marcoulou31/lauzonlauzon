import Image from "next/image";
import { ScrollIndicator } from "@/components/home/ScrollIndicator";
import { siteConfig } from "@/data/site";

type ExpertiseItem = (typeof siteConfig.expertise)[number];
type FeaturedItem = Extract<ExpertiseItem, { images: readonly string[] }>;

function isFeatured(item: ExpertiseItem): item is FeaturedItem {
  return "images" in item;
}

const featured = siteConfig.expertise.filter(isFeatured);

export function ExpertiseFeatured() {
  return (
    <section id="expertise-details" className="relative scroll-mt-21 py-8 md:py-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h3 className="font-serif text-4xl text-navy md:text-5xl mb-6">
          Notre expertise
        </h3>

        <div className="space-y-8 lg:space-y-10">
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
                <p className="mt-2 text-lg font-medium uppercase tracking-wide text-navy/85">
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
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    className="object-cover"
                    quality={index === 0 ? 50 : 60}
                    loading="lazy"
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
                      quality={50}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <ScrollIndicator targetId="cta" />
    </section>
  );
}
