import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getFeaturedProperties } from "@/data/properties";
import { formatPrice } from "@/lib/format";
import Image from "next/image";
import Link from "next/link";

export function PropertiesTeaser() {
  const featuredProperties = getFeaturedProperties();

  return (
    <section className="bg-cream py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="Inscriptions"
          title="Propriétés en vedette"
          description="Découvrez un aperçu de nos inscriptions actuelles."
          align="center"
        />

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {featuredProperties.map((property) => (
            <Link
              key={property.slug}
              href={`/proprietes/${property.slug}`}
              className="group overflow-hidden bg-white"
            >
              <div className="relative aspect-16/10 overflow-hidden">
                <Image
                  src={property.images[0].src}
                  alt={property.images[0].alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="p-6">
                <p className="text-sm font-medium uppercase tracking-[0.15em] text-gold">
                  {property.status}
                </p>
                <h3 className="mt-2 font-serif text-xl text-navy transition-colors group-hover:text-gold">
                  {property.title}
                </h3>
                <p className="mt-1 text-sm text-navy/70">
                  {property.address}, {property.city}
                </p>
                <p className="mt-3 font-serif text-2xl text-navy">
                  {formatPrice(property.price)}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button href="/proprietes">Voir toutes les propriétés</Button>
        </div>
      </div>
    </section>
  );
}
