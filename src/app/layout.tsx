import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { AnalyticsConsent } from "@/components/analytics/AnalyticsConsent";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { siteConfig } from "@/data/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lauzonlauzon.ca"),
  title: {
    default: `${siteConfig.name} — Courtier immobilier à Québec`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    title: `${siteConfig.name} — Courtier immobilier à Québec`,
    description: siteConfig.description,
    locale: "fr_CA",
    type: "website",
    url: "https://lauzonlauzon.ca",
  },
  icons: {
    icon: [
      { url: "/icon-light.png", media: "(prefers-color-scheme: light)", type: "image/png" },
      { url: "/icon-dark.png", media: "(prefers-color-scheme: dark)", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" data-scroll-behavior="smooth" className={`${inter.variable} ${cormorant.variable} h-full`}>
      <body className="flex min-h-full flex-col antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <AnalyticsConsent />
      </body>
    </html>
  );
}
