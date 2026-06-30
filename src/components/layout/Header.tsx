"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navLinks, siteConfig } from "@/data/site";

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-cream-dark/60 bg-cream/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <Link href="/" className="group">
          <span className="font-serif text-2xl text-navy transition-colors group-hover:text-gold">
            {siteConfig.name}
          </span>
          <span className="mt-0.5 block text-xs uppercase tracking-[0.15em] text-navy/60">
            {siteConfig.tagline}
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium tracking-wide transition-colors hover:text-gold ${
                isActive(link.href) ? "text-gold" : "text-navy"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href={siteConfig.contact.phoneHref}
          className="hidden text-sm font-medium text-navy transition-colors hover:text-gold md:block"
        >
          {siteConfig.contact.phone}
        </Link>

        <button
          type="button"
          className="flex flex-col gap-1.5 md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={menuOpen}
        >
          <span
            className={`block h-0.5 w-6 bg-navy transition-transform ${menuOpen ? "translate-y-2 rotate-45" : ""}`}
          />
          <span
            className={`block h-0.5 w-6 bg-navy transition-opacity ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block h-0.5 w-6 bg-navy transition-transform ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </div>

      {menuOpen && (
        <nav className="border-t border-cream-dark bg-cream px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`text-base font-medium ${
                  isActive(link.href) ? "text-gold" : "text-navy"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={siteConfig.contact.phoneHref}
              className="text-base font-medium text-gold"
            >
              {siteConfig.contact.phone}
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
