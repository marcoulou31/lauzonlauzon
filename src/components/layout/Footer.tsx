import Link from "next/link";
import { navLinks, siteConfig } from "@/data/site";

export function Footer() {
  return (
    <footer className="bg-navy text-cream">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <p className="font-serif text-2xl uppercase">
              {siteConfig.contact.legalName}
            </p>
            <p className="mt-2 text-sm italic text-cream/70">
              {siteConfig.slogan}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-cream/70">
              {siteConfig.description}
            </p>
          </div>

          <div>
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.15em] text-gold-light">
              Navigation
            </p>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-cream/80 transition-colors hover:text-gold-light"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.15em] text-gold-light">
              Coordonnées
            </p>
            <address className="space-y-2 not-italic text-sm text-cream/80">
              <p>{siteConfig.broker.name}</p>
              <p>{siteConfig.contact.fullAddress}</p>
              <p>
                <Link
                  href={siteConfig.contact.phoneHref}
                  className="transition-colors hover:text-gold-light"
                >
                  {siteConfig.contact.phone}
                </Link>
              </p>
              <p>
                <Link
                  href={siteConfig.contact.emailHref}
                  className="transition-colors hover:text-gold-light"
                >
                  {siteConfig.contact.email}
                </Link>
              </p>
            </address>
          </div>
        </div>

        <div className="mt-12 border-t border-cream/10 pt-8 text-center text-xs text-cream/50">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.name}. Tous droits
            réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
