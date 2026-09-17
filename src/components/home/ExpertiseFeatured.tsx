import Image from "next/image";
import { ScrollIndicator } from "@/components/home/ScrollIndicator";
import { siteConfig } from "@/data/site";

type ExpertiseItem = (typeof siteConfig.expertise)[number];
type FeaturedItem = Extract<ExpertiseItem, { images: readonly string[] }>;

function isFeatured(item: ExpertiseItem): item is FeaturedItem {
  return "images" in item;
}

function buildMosaicRows<T>(items: readonly T[]): T[][] {
  const rows: T[][] = [];
  let index = 0;
  let rowSize = 3;

  while (index < items.length) {
    const remaining = items.length - index;
    const balancedRowSize =
      remaining === 4 ? 2 : remaining === 3 ? 3 : Math.min(rowSize, remaining);

    rows.push(items.slice(index, index + balancedRowSize));
    index += balancedRowSize;
    rowSize = rowSize === 3 ? 2 : 3;
  }

  return rows;
}

const featured = siteConfig.expertise.filter(isFeatured);

export function ExpertiseFeatured() {
  return (
    <section id="expertise-details" className="relative scroll-mt-21 py-8 md:py-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="space-y-8 lg:space-y-10">
          {featured.map((item, index) => {
            const secondaryImages = item.images.slice(1);
            const wideText = "wideText" in item && item.wideText;
            const inlineImages = wideText ? secondaryImages.slice(0, 2) : [];
            const mosaicImages = wideText
              ? secondaryImages.slice(2)
              : secondaryImages;
            const wideMosaicLead =
              "wideMosaicLead" in item && item.wideMosaicLead;
            const mosaicRows = wideMosaicLead
              ? [mosaicImages.slice(0, 2), ...buildMosaicRows(mosaicImages.slice(2))]
              : buildMosaicRows(mosaicImages);

            return (
              <div
                key={item.title}
                className={`space-y-4 ${
                  index > 0 ? "border-t border-gold/40 pt-8 lg:pt-10" : ""
                }`}
              >
                <div
                  className={`grid gap-8 lg:items-start lg:gap-12 ${
                    wideText ? "lg:grid-cols-2" : "lg:grid-cols-3"
                  }`}
                >
                  <div
                    className={index % 2 === 1 ? "lg:order-2" : "lg:order-1"}
                  >
                    <h4
                      className={`font-serif text-3xl text-navy ${
                        item.emphasizedTitle ? "font-bold" : ""
                      }`}
                    >
                      {item.title}
                    </h4>
                    <p className="mt-2 whitespace-pre-line text-lg font-medium uppercase tracking-wide text-navy/85">
                      {item.subtitle}
                    </p>
                    <p className="mt-4 leading-relaxed text-xl text-navy/70">
                      {item.description}
                    </p>
                  </div>

                  <div
                    className={`${
                      wideText ? "lg:col-span-1" : "lg:col-span-2"
                    } ${
                      index % 2 === 1 ? "lg:order-1" : "lg:order-2"
                    }`}
                  >
                    <div className="relative aspect-video overflow-hidden rounded-lg shadow-md">
                      <Image
                        src={item.images[0]}
                        alt={item.title}
                        fill
                        sizes={
                          wideText
                            ? "(max-width: 1023px) calc(100vw - 48px), 584px"
                            : "(max-width: 1023px) calc(100vw - 48px), 795px"
                        }
                        className="object-cover"
                        quality={index === 0 ? 50 : 60}
                        loading="lazy"
                      />
                    </div>

                    {inlineImages.length > 0 && (
                      <div className="mt-4 grid grid-cols-2 gap-4">
                        {inlineImages.map((src) => (
                          <div
                            key={src}
                            className="relative aspect-4/3 overflow-hidden rounded-lg shadow-md"
                          >
                            <Image
                              src={src}
                              alt={item.title}
                              fill
                              sizes="(max-width: 1023px) calc(50vw - 32px), 284px"
                              className="object-cover"
                              quality={50}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {mosaicImages.length > 0 && (
                  <div className="space-y-4">
                    {mosaicRows.map((row, rowIndex) => (
                      <div
                        key={rowIndex}
                        className={`grid gap-4 ${
                          row.length === 3
                            ? "grid-cols-2 md:grid-cols-3"
                            : row.length === 2
                              ? "grid-cols-2"
                              : "grid-cols-1"
                        }`}
                      >
                        {row.map((src) => {
                          const isPanoramic = src.includes(
                            "immeuble-commercial-avenue-cartier.jpg",
                          );

                          return (
                            <div
                              key={src}
                              className={`relative overflow-hidden rounded-lg shadow-md ${
                                row.length === 3
                                    ? "aspect-4/3"
                                    : "aspect-3/2"
                              }`}
                            >
                            <Image
                              src={src}
                              alt={item.title}
                              fill
                              sizes={
                                row.length === 3
                                  ? "(max-width: 767px) calc(50vw - 32px), (max-width: 1279px) calc(33.333vw - 27px), 395px"
                                  : "(max-width: 1279px) calc(50vw - 32px), 600px"
                              }
                              className={`object-cover ${
                                isPanoramic ? "object-left" : ""
                              }`}
                              quality={50}
                            />
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <ScrollIndicator targetId="cta" />
    </section>
  );
}
