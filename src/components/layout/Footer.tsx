import Link from "next/link";
import { Fragment } from "react";
import { CookiePreferencesButton } from "@/components/analytics/CookiePreferencesButton";
import { navLinks, siteConfig } from "@/data/site";

export function Footer() {
  return (
    <footer className="bg-navy text-cream">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <p className="font-serif text-2xl uppercase whitespace-nowrap">
              {siteConfig.contact.legalName}
            </p>
            <p className="mt-2 text-base italic text-cream/70">
              {siteConfig.slogan}
            </p>
            <p className="mt-4 text-base leading-relaxed text-cream/85">
              {siteConfig.description}
            </p>
          </div>

          <div>
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.15em] text-gold-light">
              Navigation
            </p>
            <ul className="grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2">
              {navLinks.map((link) => (
                <Fragment key={link.href}>
                  <li>
                    <Link
                      href={link.href}
                      className="text-base text-cream/95 transition-colors hover:text-gold-light"
                    >
                      {link.label}
                    </Link>
                  </li>
                  {link.href === "/proprietes" && (
                    <li>
                      <Link
                        href="/proprietes-vendues"
                        className="text-base text-cream/95 transition-colors hover:text-gold-light"
                      >
                        Propriétés vendues
                      </Link>
                    </li>
                  )}
                </Fragment>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.15em] text-gold-light">
              Coordonnées
            </p>
            <address className="space-y-1 not-italic text-base text-cream/95">
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

        <div className="mt-12 border-t border-cream/20 pt-8 text-center text-xs text-cream/80">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.name}. Tous droits
            réservés.
          </p>
          <p className="mt-2">
            <CookiePreferencesButton />
          </p>
        </div>
      </div>
    </footer>
  );
}
