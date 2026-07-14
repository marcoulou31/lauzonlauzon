import Image from "next/image";
import Link from "next/link";
import type { InscriptionDetail } from "@/lib/types";
import { formatPrice } from "@/lib/format";
import { Button } from "@/components/ui/Button";
import { MapView } from "@/components/ui/MapView";
import { InscriptionPhotoAlbum } from "@/components/properties/InscriptionPhotoAlbum";

type Props = { detail: InscriptionDetail };

function fmt(value: number | null, suffix = ""): string {
  if (value === null || value === undefined) return "—";
  return `${new Intl.NumberFormat("fr-CA").format(value)}${suffix ? " " + suffix : ""}`;
}

function fmtCurrency(value: number | null): string {
  if (value === null || value === undefined) return "—";
  return formatPrice(value);
}

function fmtMensuel(annual: number | null): string {
  if (!annual) return "—";
  return fmtCurrency(Math.round(annual / 12));
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  if (value === null || value === undefined || value === "—" || value === "")
    return null;
  return (
    <div className="flex items-baseline justify-between gap-2 py-1 border-b border-cream-dark last:border-0">
      <span className="text-sm text-navy/60 shrink-0">{label}</span>
      <span className="text-sm font-medium text-navy text-right">{value}</span>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border border-navy/20 bg-white p-5 mb-4">
      <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-navy/50 mb-3 pb-2 border-b border-navy/10">
        {title}
      </h2>
      {children}
    </div>
  );
}

export function InscriptionFiche({ detail }: Props) {
  const prix = detail.prix ?? detail.prixLocation;

  // Group caracteristiques by type
  const caractByType = detail.caracteristiques.reduce<Record<string, string[]>>(
    (acc, c) => {
      const key = c.typeDesc || c.typeCode;
      acc[key] = acc[key] ?? [];
      const label = c.nombre ? `${c.sousTypeDesc} (${c.nombre})` : c.sousTypeDesc;
      acc[key].push(label);
      return acc;
    },
    {},
  );

  return (
    <article className="bg-cream min-h-screen">
      {/* Breadcrumb */}
      <div className="border-b border-cream-dark bg-cream-dark/30 py-6">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 flex items-center justify-between flex-wrap gap-3">
          <Link href="/proprietes" className="text-sm text-gold transition-colors hover:text-navy">
            &larr; Retour aux propriétés
          </Link>
          <span className="text-sm text-navy/40 font-mono">MLS® {detail.noInscription}</span>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        {/* Prix + titre */}
        <div className="bg-navy text-white px-6 py-4 flex items-center justify-between flex-wrap gap-2 mb-6">
          <span className="font-serif text-2xl">
            {prix ? fmtCurrency(prix) : "Prix sur demande"}
            {!detail.prix && detail.prixLocation ? " /mois" : ""}
          </span>
          <span className="text-sm text-white/60 font-mono">MLS® {detail.noInscription}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
          {/* ── Colonne gauche ── */}
          <div>
            {/* Photo principale + infos rapides */}
            <Section title="Propriété">
              <div className="grid sm:grid-cols-2 gap-4">
                {detail.photoUrl && (
                  <div className="relative aspect-4/3 bg-cream-dark">
                    <Image
                      src={detail.photoUrl}
                      alt={detail.adresseMaps}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                  </div>
                )}
                <div className="space-y-0.5">
                  <Row label="Adresse" value={<span className="whitespace-pre-line">{detail.adresse}</span>} />
                  <Row label="Type" value={detail.genreProprieteDescr} />
                  <Row label="Chambres" value={detail.nbChambres} />
                  <Row label="Salle de bain" value={detail.nbSallesBains} />
                  <Row label="Salle d'eau" value={detail.nbSallesEau} />
                  <Row label="Étages" value={detail.nbEtages} />
                  <Row label="Année de construction" value={detail.anneeConstruction} />
                  <Row label="Certificat de localisation" value={detail.anneeCertLocalisation} />
                  <Row label="Lot / Cadastre" value={detail.cadastre} />
                </div>
              </div>
              <div className="mt-4">
                <Button href="#album" variant="secondary">
                  Album photo →
                </Button>
              </div>
            </Section>

            {/* Description */}
            {detail.descriptionGenerale && (
              <Section title="Description générale">
                <p className="text-sm leading-relaxed text-navy/80">
                  {detail.descriptionGenerale}
                </p>
              </Section>
            )}

            {/* Évaluation */}
            <Section title="Évaluation">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                {[
                  { label: "Année", value: detail.anneeEvaluation?.toString() },
                  { label: "Bâtiment", value: fmtCurrency(detail.evalBatiment) },
                  { label: "Terrain", value: fmtCurrency(detail.evalTerrain) },
                  { label: "Total", value: fmtCurrency(detail.evalTotal) },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-cream p-3">
                    <div className="text-xs text-navy/50 mb-1">{label}</div>
                    <div className="font-semibold text-navy">{value ?? "—"}</div>
                  </div>
                ))}
              </div>
            </Section>

            {/* Taxes + frais mensuels */}
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <Section title="Taxes annuelles">
                <Row label="Municipale" value={fmtCurrency(detail.taxesMunicipale)} />
                <Row label="Scolaire" value={fmtCurrency(detail.taxesScolaire)} />
                <div className="mt-2 pt-2 border-t border-navy/10 flex justify-between">
                  <span className="text-sm font-semibold text-navy">Total</span>
                  <span className="text-sm font-bold text-navy">{fmtCurrency(detail.taxesTotal)}</span>
                </div>
              </Section>

              <Section title="Frais mensuels estimés">
                <Row label="Énergie" value={fmtMensuel(detail.energie)} />
                <Row label="Taxes" value={fmtMensuel(detail.taxesTotal)} />
                <Row label="Frais communs" value={fmtMensuel(detail.fraisCommuns)} />
                <Row label="Frais de copropriété" value={fmtMensuel(detail.fraisCopropriete)} />
                <Row label="Autres" value={fmtMensuel(detail.depensesAutres)} />
                <div className="mt-2 pt-2 border-t border-navy/10 flex justify-between">
                  <span className="text-sm font-semibold text-navy">Total / mois</span>
                  <span className="text-sm font-bold text-navy">{fmtMensuel(detail.depensesTotal)}</span>
                </div>
              </Section>
            </div>

            {/* Dimensions */}
            <Section title="Dimensions">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-navy/50 text-xs uppercase tracking-wider border-b border-navy/10">
                      <th className="pb-2 pr-4"></th>
                      <th className="pb-2 pr-4">Irrégulière</th>
                      <th className="pb-2 pr-4">Largeur</th>
                      <th className="pb-2 pr-4">Profondeur</th>
                      <th className="pb-2 pr-4">Superficie</th>
                      <th className="pb-2">Habitable</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-navy/10">
                      <td className="py-2 pr-4 font-medium text-navy">Bâtiment</td>
                      <td className="py-2 pr-4 text-navy/70">{detail.irregulierBatiment || "—"}</td>
                      <td className="py-2 pr-4 text-navy/70">{fmt(detail.facadeBatiment, detail.umDimensionBatiment ?? "")}</td>
                      <td className="py-2 pr-4 text-navy/70">{fmt(detail.profondeurBatiment, detail.umDimensionBatiment ?? "")}</td>
                      <td className="py-2 pr-4 text-navy/70">{fmt(detail.aireSol, detail.umAireSol ?? "")}</td>
                      <td className="py-2 text-navy/70">{fmt(detail.aireHabitable, detail.umAireHabitable ?? "")}</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4 font-medium text-navy">Terrain</td>
                      <td className="py-2 pr-4 text-navy/70">{detail.irregulierTerrain || "—"}</td>
                      <td className="py-2 pr-4 text-navy/70">{fmt(detail.facadeTerrain, detail.umDimensionTerrain ?? "")}</td>
                      <td className="py-2 pr-4 text-navy/70">{fmt(detail.profondeurTerrain, detail.umDimensionTerrain ?? "")}</td>
                      <td className="py-2 pr-4 text-navy/70">{fmt(detail.superficieTerrain, detail.umSuperficieTerrain ?? "")}</td>
                      <td className="py-2 text-navy/70">—</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Section>

            {/* Déclarations */}
            {detail.declarationVendeur && (
              <Section title="Déclarations du vendeur">
                <p className="text-sm text-navy/80">{detail.declarationVendeur}</p>
              </Section>
            )}

            {/* Inclusions / Exclusions */}
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              {detail.inclusFrancais && (
                <Section title="Inclusions">
                  <p className="text-sm text-navy/80">{detail.inclusFrancais}</p>
                </Section>
              )}
              {detail.exclusFrancais && (
                <Section title="Exclusions">
                  <p className="text-sm text-navy/80">{detail.exclusFrancais}</p>
                </Section>
              )}
            </div>

            {/* Caractéristiques des pièces */}
            <Section title="Caractéristiques des pièces">
              <div className="grid grid-cols-4 text-center mb-4">
                {[
                  { label: "Chambres", value: detail.nbChambres },
                  { label: "Salle de bain", value: detail.nbSallesBains },
                  { label: "Salle d'eau", value: detail.nbSallesEau },
                  { label: "Total pièces", value: detail.nbPieces },
                ].map(({ label, value }) => (
                  <div key={label} className="p-2 bg-cream">
                    <div className="text-xs text-navy/50">{label}</div>
                    <div className="text-lg font-bold text-navy">{value ?? "—"}</div>
                  </div>
                ))}
              </div>
              {detail.pieces.length > 0 && (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-navy/50 text-xs uppercase tracking-wider border-b border-navy/10">
                        <th className="pb-2 pr-4">Pièce</th>
                        <th className="pb-2 pr-4">Dimensions</th>
                        <th className="pb-2 pr-4">Étage</th>
                        <th className="pb-2">Plancher</th>
                      </tr>
                    </thead>
                    <tbody>
                      {detail.pieces.map((p, i) => (
                        <tr key={i} className="border-b border-navy/10 last:border-0">
                          <td className="py-2 pr-4 font-medium text-navy">{p.description}</td>
                          <td className="py-2 pr-4 text-navy/70">{p.dimensions ?? "—"}</td>
                          <td className="py-2 pr-4 text-navy/70">{p.etage ?? "—"}</td>
                          <td className="py-2 text-navy/70">{p.plancher ?? "—"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Section>
          </div>

          {/* ── Colonne droite ── */}
          <div>
            {/* Courtier */}
            {detail.courtier && (
              <Section title="Courtier">
                <div className="flex gap-4 items-start mb-3">
                  {detail.courtier.photoUrl && (
                    <div className="relative w-20 h-24 shrink-0 bg-cream-dark overflow-hidden">
                      <Image
                        src={detail.courtier.photoUrl}
                        alt={`${detail.courtier.prenom} ${detail.courtier.nom}`}
                        fill
                        className="object-cover"
                        sizes="80px"
                        unoptimized
                      />
                    </div>
                  )}
                  <div>
                    <p className="font-semibold text-navy">
                      {detail.courtier.prenom} {detail.courtier.nom}
                    </p>
                    <p className="text-xs text-navy/60 mt-0.5">{detail.courtier.titre}</p>
                    <p className="text-sm text-navy mt-2">
                      Tél.&nbsp;
                      <a
                        href={`tel:${detail.courtier.telephone}`}
                        className="text-gold hover:text-navy"
                      >
                        {detail.courtier.telephone.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3")}
                      </a>
                    </p>
                    <a
                      href={`mailto:${detail.courtier.courriel}`}
                      className="text-sm text-gold hover:text-navy break-all"
                    >
                      {detail.courtier.courriel}
                    </a>
                  </div>
                </div>
                <div className="text-xs text-navy/50 border-t border-navy/10 pt-3">
                  1043 avenue Holland, Québec (QC), G1S 3T4<br />
                  Bur.&nbsp;418-648-2359 · Téléc.&nbsp;418-524-6666
                </div>
              </Section>
            )}

            {/* Carte OpenStreetMap (gratuit, sans clé API) */}
            <div className="mb-4">
              <MapView address={detail.adresseMaps} />
            </div>

            {/* Addenda */}
            {detail.addenda && (
              <Section title="Addenda">
                <p className="text-sm text-navy/80 whitespace-pre-line">{detail.addenda}</p>
              </Section>
            )}

            {/* Caractéristiques principales */}
            <Section title="Caractéristiques principales">
              <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="text-center bg-cream p-3">
                  <div className="text-xs text-navy/50">Garage</div>
                  <div className="font-semibold text-navy">{detail.garage ?? "—"}</div>
                </div>
                <div className="text-center bg-cream p-3">
                  <div className="text-xs text-navy/50">Abri d&apos;auto</div>
                  <div className="font-semibold text-navy">{detail.abri ?? "—"}</div>
                </div>
              </div>
              {Object.entries(caractByType).length > 0 && (
                <div className="space-y-1">
                  {Object.entries(caractByType).map(([type, values]) => (
                    <div key={type} className="text-sm border-b border-navy/10 pb-1 last:border-0">
                      <span className="text-navy/50">{type}&nbsp;:&nbsp;</span>
                      <span className="text-navy">{values.join(", ")}</span>
                    </div>
                  ))}
                </div>
              )}
            </Section>

            {/* CTA */}
            <div className="mt-4">
              <Button href={`/contact?propriete=${detail.noInscription}`} variant="primary">
                Demander une visite
              </Button>
            </div>
          </div>
        </div>

        {/* ── Album photos ── */}
        {detail.photos.length > 0 && (
          <div id="album" className="mt-10">
            <div className="border border-navy/20 bg-white p-5">
              <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-navy/50 mb-4 pb-2 border-b border-navy/10">
                Album photos
              </h2>
              <InscriptionPhotoAlbum photos={detail.photos} address={detail.adresseMaps} />
            </div>
          </div>
        )}

        {/* Lien Centris */}
        <div className="mt-6 text-center">
          <a
            href={`https://www.centris.ca/fr/proprietes~a-vendre~${detail.noInscription}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gold hover:text-navy transition-colors"
          >
            Voir sur Centris.ca →
          </a>
        </div>
      </div>
    </article>
  );
}
