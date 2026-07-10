import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/data/site";

export function CtaBanner() {
  return (
    <section className="relative bg-navy py-24 lg:py-32">
      {/* Decorative top accent */}
      <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-transparent via-gold to-transparent" />
      
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        {/* Decorative accent line above heading */}
        <div className="mb-6 flex items-center justify-center gap-3">
          <div className="h-px w-8 bg-gold sm:w-12" />
          <span className="text-sm font-medium tracking-widest text-gold uppercase">
            Prochaine étape
          </span>
          <div className="h-px w-8 bg-gold sm:w-12" />
        </div>

        {/* Main heading */}
        <h2 className="font-serif text-4xl font-light text-cream sm:text-5xl md:text-6xl lg:text-7xl">
          Prêt à concrétiser votre projet?
        </h2>

        {/* Subheading */}
        <p className="mt-6 text-center text-lg text-cream/85 sm:text-xl md:text-2xl">
          Contactez <span className="font-medium text-gold">{siteConfig.broker.name}</span> pour une consultation personnalisée.
        </p>

        {/* CTA Buttons */}
        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
          <Button 
            href={siteConfig.contact.phoneHref} 
            variant="secondary"
            className="group"
          >
            <span className="mr-2">📞</span>
            {siteConfig.contact.phone}
          </Button>
          
          <div className="hidden text-cream/40 sm:block">•</div>
          
          <Button 
            href="/contact" 
            variant="outline" 
            className="!border-cream !text-cream !bg-transparent hover:!border-gold hover:!bg-gold hover:!text-navy"
          >
            <svg className="mr-2 inline h-5 w-5 stroke-gold-light" viewBox="0 0 24 24" fill="none" strokeWidth="2">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            Écrivez-nous
          </Button>
        </div>

        {/* Supporting text */}
        <p className="mt-10 text-center text-sm text-cream/60 sm:text-base">
          Disponible du lundi au dimanche • Réponse dans les 24h
        </p>
      </div>

      {/* Decorative bottom accent */}
      <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-gold to-transparent" />
    </section>
  );
}
