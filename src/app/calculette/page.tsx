import type { Metadata } from "next";
import Image from "next/image";
import { MortgageCalculator } from "@/components/calculette/MortgageCalculator";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Calculette",
  description:
    "Estimez vos frais de transaction immobilière et vos remboursements hypothécaires : droits de mutation, frais de notaire, mise de fonds et paiements.",
};

export default function CalculettePage() {
  return (
    <>
      <section className="relative isolate overflow-hidden py-12">
        <Image
          src="/calculette-hero.jpg"
          alt="Calculette hypothécaire"
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
            eyebrow="Outils de calcul"
            title="Calculette hypothécaire"
            description="Estimez les frais liés à votre transaction immobilière ainsi que vos remboursements hypothécaires."
            light
          />
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <MortgageCalculator />
        </div>
      </section>
    </>
  );
}
