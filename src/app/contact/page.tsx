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
      <section className="relative isolate overflow-hidden py-20">
        <div className="absolute inset-0 -z-10 bg-[url('/contact-hero.jpg')] bg-cover bg-center" />
        <div className="absolute inset-0 -z-10 bg-navy/65" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeading
            as="h1"
            eyebrow="Contactez-nous"
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
                  <p className="text-sm font-medium uppercase tracking-wider text-gold-dark">
                    Courtier
                  </p>
                  <p className="mt-1">{siteConfig.broker.name}</p>
                </div>

                <div>
                  <p className="text-sm font-medium uppercase tracking-wider text-gold-dark">
                    Adresse
                  </p>
                  <p className="mt-1">{siteConfig.contact.fullAddress}</p>
                </div>

                <div>
                  <p className="text-sm font-medium uppercase tracking-wider text-gold-dark">
                    Téléphone
                  </p>
                  <a
                    href={siteConfig.contact.phoneHref}
                    className="mt-1 block transition-colors hover:text-gold-dark"
                  >
                    {siteConfig.contact.phone}
                  </a>
                </div>

                <div>
                  <p className="text-sm font-medium uppercase tracking-wider text-gold-dark">
                    Courriel
                  </p>
                  <a
                    href={siteConfig.contact.emailHref}
                    className="mt-1 block transition-colors hover:text-gold-dark"
                  >
                    {siteConfig.contact.email}
                  </a>
                </div>
              </address>

              <div className="mt-8 overflow-hidden border border-navy/20">
                <iframe
                  title="Carte Google Maps - Lauzon & Lauzon"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(siteConfig.contact.fullAddress)}&output=embed`}
                  className="h-72 w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
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
