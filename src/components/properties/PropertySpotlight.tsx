import Image from "next/image";
import Link from "next/link";
import { PropertyStats } from "@/components/properties/PropertyStats";
import { Button } from "@/components/ui/Button";
import type { Property } from "@/lib/types";
import { formatPrice } from "@/lib/format";

type PropertySpotlightProps = {
  property: Property;
  index: number;
};

export function PropertySpotlight({ property, index }: PropertySpotlightProps) {
  const reversed = index % 2 === 1;
  const bgClass = index % 2 === 0 ? "bg-cream" : "bg-cream-dark";

  return (
    <section className={`${bgClass} py-16 md:py-24`}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div
          className={`grid items-center gap-10 lg:grid-cols-5 lg:gap-16 ${
            reversed ? "lg:[direction:rtl]" : ""
          }`}
        >
          <div className="relative min-h-[50vh] overflow-hidden lg:col-span-3 lg:min-h-[70vh] lg:[direction:ltr]">
            <Image
              src={property.images[0].src}
              alt={property.images[0].alt}
              fill
              priority={index === 0}
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          </div>

          <div className="lg:col-span-2 lg:[direction:ltr]">
            <h3 className="font-serif text-3xl text-navy md:text-4xl">
              <Link
                href={`/proprietes/${property.slug}`}
                className="transition-colors hover:text-gold-dark"
              >
                {property.title}
              </Link>
            </h3>
            <p className="mt-2 text-lg italic text-navy/70">{property.address}</p>
            {property.city && (
              <p className="text-lg italic text-navy/70">{property.city}</p>
            )}

            <p className="mt-6 font-serif text-4xl text-navy">
              {formatPrice(property.price)}
            </p>

            <div className="mt-4">
              <PropertyStats property={property} />
            </div>

            <p className="mt-6 leading-relaxed text-navy/80">
              {property.description}
            </p>

            <div className="mt-8">
              <Button href={`/proprietes/${property.slug}`}>
                Voir les détails
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
