import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/data/site";

export function CtaBanner() {
  return (
    <section className="bg-gold/20 py-20">
      <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
        <h2 className="font-serif text-3xl text-navy md:text-4xl">
          Prêt à concrétiser votre projet?
        </h2>
        <p className="mt-4 text-lg text-navy/70">
          Contactez {siteConfig.broker.name} pour une consultation personnalisée.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button href={siteConfig.contact.phoneHref} variant="primary">
            {siteConfig.contact.phone}
          </Button>
          <Button href="/contact" variant="outline">
            Formulaire de contact
          </Button>
        </div>
      </div>
    </section>
  );
}
