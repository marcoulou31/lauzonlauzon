import { CtaBanner } from "@/components/home/CtaBanner";
import { ExpertiseShowcase } from "@/components/home/ExpertiseShowcase";
import { Hero } from "@/components/home/Hero";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ExpertiseShowcase />
      <CtaBanner />
    </>
  );
}
