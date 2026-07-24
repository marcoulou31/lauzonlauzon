import { CtaBanner } from "@/components/home/CtaBanner";
import { ExpertiseFeatured } from "@/components/home/ExpertiseFeatured";
import { ExpertiseShowcase } from "@/components/home/ExpertiseShowcase";
import { Hero } from "@/components/home/Hero";

export default function HomePage() {
  return (
    <>
      <Hero />
      <section className="[content-visibility:auto] [contain-intrinsic-size:1200px]">
        <ExpertiseShowcase />
      </section>
      <section className="[content-visibility:auto] [contain-intrinsic-size:1800px]">
        <ExpertiseFeatured />
      </section>
      <section className="[content-visibility:auto] [contain-intrinsic-size:600px]">
        <CtaBanner />
      </section>
    </>
  );
}
