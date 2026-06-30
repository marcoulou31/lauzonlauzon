import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PropertyGallery } from "@/components/properties/PropertyGallery";
import { PropertyStats } from "@/components/properties/PropertyStats";
import { Button } from "@/components/ui/Button";
import { getAllPropertySlugs, getPropertyBySlug } from "@/data/properties";
import { formatPrice } from "@/lib/format";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllPropertySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);

  if (!property) {
    return { title: "Propriété introuvable" };
  }

  return {
    title: property.title,
    description: property.description,
    openGraph: {
      title: property.title,
      description: property.description,
      images: property.images[0] ? [property.images[0].src] : [],
    },
  };
}

export default async function PropertyPage({ params }: PageProps) {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);

  if (!property) {
    notFound();
  }

  const mapsQuery = encodeURIComponent(
    `${property.address}, ${property.city}`,
  );

  return (
    <article className="bg-cream">
      <div className="border-b border-cream-dark bg-cream-dark/30 py-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Link
            href="/proprietes"
            className="text-sm text-gold transition-colors hover:text-navy"
          >
            &larr; Retour aux propriétés
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <PropertyGallery images={property.images} title={property.title} />

          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-gold">
              {property.status}
            </p>
            <h1 className="mt-2 font-serif text-4xl text-navy md:text-5xl">
              {property.title}
            </h1>
            <p className="mt-3 text-lg text-navy/70">
              {property.address}, {property.city}
            </p>

            <p className="mt-6 font-serif text-4xl text-navy">
              {formatPrice(property.price)}
            </p>

            {property.taxes && (
              <p className="mt-2 text-sm text-navy/60">
                Taxes municipales : {formatPrice(property.taxes)} / an
              </p>
            )}

            <div className="mt-6">
              <PropertyStats property={property} />
            </div>

            <p className="mt-8 leading-relaxed text-navy/80">
              {property.longDescription}
            </p>

            <div className="mt-8">
              <Button
                href={`/contact?propriete=${property.slug}`}
                variant="primary"
              >
                Demander une visite
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-serif text-2xl text-navy">
              Caractéristiques
            </h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {property.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-2 text-navy/80"
                >
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-serif text-2xl text-navy">Emplacement</h2>
            <p className="mt-4 text-navy/80">
              {property.address}
              <br />
              {property.city}
            </p>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-sm font-medium text-gold transition-colors hover:text-navy"
            >
              Voir sur Google Maps &rarr;
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
