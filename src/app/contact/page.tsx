import type { Metadata } from "next";
import { Suspense } from "react";
import { ContactForm } from "@/components/contact/ContactForm";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/data/site";
import { getInscriptionsList } from "@/lib/inscriptions";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contactez ${siteConfig.broker.name} pour vos projets immobiliers à Québec. Téléphone : ${siteConfig.contact.phone}`,
};

function ContactFormFallback() {
  return (
    <div className="h-96 animate-pulse bg-cream-dark" aria-hidden="true" />
  );
}

export default async function ContactPage() {
  const inscriptions = await getInscriptionsList();
  return (
    <>
      <section className="bg-navy py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeading
            eyebrow="Contact"
            title="Parlons de votre projet"
            description="Remplissez le formulaire ci-dessous ou contactez-nous directement. Nous vous répondrons dans les plus brefs délais."
            light
          />
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <h2 className="font-serif text-2xl text-navy">Coordonnées</h2>

              <address className="mt-6 space-y-4 not-italic text-navy/80">
                <div>
                  <p className="text-sm font-medium uppercase tracking-wider text-gold">
                    Courtier
                  </p>
                  <p className="mt-1">{siteConfig.broker.name}</p>
                </div>

                <div>
                  <p className="text-sm font-medium uppercase tracking-wider text-gold">
                    Adresse
                  </p>
                  <p className="mt-1">{siteConfig.contact.fullAddress}</p>
                </div>

                <div>
                  <p className="text-sm font-medium uppercase tracking-wider text-gold">
                    Téléphone
                  </p>
                  <a
                    href={siteConfig.contact.phoneHref}
                    className="mt-1 block transition-colors hover:text-gold"
                  >
                    {siteConfig.contact.phone}
                  </a>
                </div>

                <div>
                  <p className="text-sm font-medium uppercase tracking-wider text-gold">
                    Courriel
                  </p>
                  <a
                    href={siteConfig.contact.emailHref}
                    className="mt-1 block transition-colors hover:text-gold"
                  >
                    {siteConfig.contact.email}
                  </a>
                </div>
              </address>

              <a
                href={siteConfig.contact.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-block text-sm font-medium text-gold transition-colors hover:text-navy"
              >
                Voir sur Google Maps &rarr;
              </a>
            </div>

            <div className="lg:col-span-3">
              <Suspense fallback={<ContactFormFallback />}>
                <ContactForm inscriptions={inscriptions} />
              </Suspense>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
