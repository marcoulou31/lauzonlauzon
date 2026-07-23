import { CtaBanner } from "@/components/home/CtaBanner";
import { ExpertiseFeatured } from "@/components/home/ExpertiseFeatured";
import { ExpertiseShowcase } from "@/components/home/ExpertiseShowcase";
import { Hero } from "@/components/home/Hero";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ExpertiseShowcase />
      <ExpertiseFeatured />
      <CtaBanner />
    </>
  );
}
