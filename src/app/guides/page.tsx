import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Guides",
  description:
    "Les guides de l'acheteur et du vendeur de l'OACIQ : des aide-mémoire pratiques pour vous accompagner à chaque étape de votre transaction immobilière.",
};

export default function GuidesPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden py-12">
        <Image
          src="/guides-hero.jpg"
          alt="Guides vendeur et acheteur"
          fill
          preload
          className="absolute inset-0 -z-10 object-cover"
          sizes="100vw"
          quality={70}
        />
        <div className="absolute inset-0 -z-10 bg-navy/70" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeading
            as="h1"
            eyebrow="Ressources"
            title="Guide du vendeur et de l'acheteur"
            description="Pour vous accompagner tout au long de vos démarches immobilières."
            light
          />
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl space-y-5 text-lg leading-relaxed text-navy/80">
            <p>
              L&apos;OACIQ vous offre deux outils pour mieux comprendre les
              nombreuses étapes d&apos;une transaction immobilière. Les guides de
              l&apos;acheteur et du vendeur sont des aide-mémoire utiles
              débordant d&apos;informations pertinentes sur la route qui mène à
              l&apos;achat ou à la vente d&apos;une propriété résidentielle avec
              un courtier immobilier.
            </p>
            <p>
              Conçus par l&apos;OACIQ et spécialement pensés pour le public, vous
              y trouverez des renseignements pratiques sur&nbsp;: la promesse
              d&apos;achat, la mise de fonds, le contrat de courtage – vente, le
              formulaire Déclarations du vendeur sur l&apos;immeuble, les
              avantages de faire affaire avec un courtier immobilier ou
              hypothécaire, les spécificités de la copropriété, et plus encore.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {siteConfig.guides.map((guide) => (
              <div
                key={guide.title}
                className="flex flex-col border border-cream-dark bg-cream-dark/40 p-8 shadow-sm"
              >
                <h3 className="font-serif text-3xl text-navy">{guide.title}</h3>
                <p className="mt-4 flex-1 text-lg leading-relaxed text-navy/70">
                  {guide.description}
                </p>
                <Button
                  href={guide.pdfHref}
                  variant="secondary"
                  className="mt-8 self-start"
                >
                  Consulter le guide
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
