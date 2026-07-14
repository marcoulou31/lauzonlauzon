import type { Metadata } from "next";
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
        <div className="absolute inset-0 -z-10 bg-[url('/calculette-hero.jpg')] bg-cover bg-center" />
        <div className="absolute inset-0 -z-10 bg-navy/70" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeading
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
