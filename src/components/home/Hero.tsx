import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/data/site";

export function Hero() {
  return (
    <section className="relative flex min-h-[85vh] items-center">
      <Image
        src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80"
        alt="Propriété de prestige à Québec"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-navy/60" />

      <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="max-w-2xl">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-gold-light">
            {siteConfig.tagline}
          </p>
          <h1 className="font-serif text-5xl leading-tight text-cream md:text-6xl lg:text-7xl">
            {siteConfig.name}
          </h1>
          <p className="mt-6 text-xl text-cream/90 md:text-2xl">
            {siteConfig.slogan}
          </p>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-cream/75">
            Courtier immobilier résidentiel et commercial à Québec. Plus de 25
            ans d&apos;expérience au service de votre projet.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button href="/proprietes" variant="secondary">
              Voir les propriétés
            </Button>
            <Button href="/contact" variant="outline" className="border-cream text-cream hover:bg-cream hover:text-navy">
              Nous contacter
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
