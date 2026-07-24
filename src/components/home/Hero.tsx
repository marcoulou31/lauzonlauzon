import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { ScrollIndicator } from "@/components/home/ScrollIndicator";
import { siteConfig } from "@/data/site";

export function Hero() {
  return (
    <section className="relative flex min-h-[48vh] md:min-h-[50vh] lg:min-h-[54vh] items-center">
      <Image
        src="/proprietes-hero.jpg"
        alt="Propriété de prestige à Québec"
        fill
        loading="eager"
        fetchPriority="high"
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 100vw"
        quality={70}
      />
      <div className="absolute inset-0 bg-navy/75" />

      <div className="relative mx-auto max-w-7xl px-6 pt-6 pb-8 md:pt-8 md:pb-10 lg:px-8">
        <div className="max-w-2xl">
          <p className="mb-3 text-base font-medium uppercase tracking-[0.25em] text-gold-light">
            {siteConfig.tagline}
          </p>
          <h1 className="font-serif text-5xl leading-tight text-cream md:text-6xl lg:text-7xl">
            {siteConfig.name}
          </h1>
          <p className="mt-3 text-xl italic text-cream/90 md:text-2xl">
            {siteConfig.slogan}
          </p>
          <p className="mt-3 max-w-lg text-base leading-relaxed text-cream/75">
            Courtier immobilier résidentiel et commercial à Québec. Plus de 25
            ans d&apos;expérience au service de votre projet.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Button href="/proprietes" variant="secondary">
              Voir les propriétés
            </Button>
            <Button href="/contact" variant="primary" className="bg-cream-dark! text-navy! border-cream! shadow-md hover:bg-cream! hover:border-cream! hover:text-navy!">
              Nous contacter
            </Button>
          </div>
        </div>
      </div>

      <ScrollIndicator targetId="expertise" />
    </section>
  );
}
