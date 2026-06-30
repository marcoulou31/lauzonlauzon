import { AboutPreview } from "@/components/home/AboutPreview";
import { CtaBanner } from "@/components/home/CtaBanner";
import { ExpertiseGrid } from "@/components/home/ExpertiseGrid";
import { Hero } from "@/components/home/Hero";
import { PropertiesTeaser } from "@/components/home/PropertiesTeaser";

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutPreview />
      <PropertiesTeaser />
      <ExpertiseGrid />
      <CtaBanner />
    </>
  );
}
