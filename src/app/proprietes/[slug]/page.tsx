import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InscriptionFiche } from "@/components/properties/InscriptionFiche";
import { getInscriptionByNo, isInscriptionNo } from "@/lib/inscriptions";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  if (isInscriptionNo(slug)) {
    const result = await getInscriptionByNo(slug);
    if (!result) return { title: "Propriété introuvable" };
    const { property, detail } = result;
    return {
      title: property.title,
      description: property.description,
      openGraph: {
        title: property.title,
        description: property.description,
        images: detail.photoUrl ? [detail.photoUrl] : [],
      },
    };
  }

  return { title: "Propriété introuvable" };
}

export default async function PropertyPage({ params }: PageProps) {
  const { slug } = await params;

  if (!isInscriptionNo(slug)) notFound();

  const result = await getInscriptionByNo(slug);
  if (!result) notFound();

  return <InscriptionFiche detail={result.detail} />;
}
