import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  descriptionClassName?: string;
  align?: "left" | "center";
  light?: boolean;
  eyebrowSize?: "base" | "lg";
  children?: ReactNode;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  descriptionClassName = "",
  align = "left",
  light = false,
  eyebrowSize = "lg",
  children,
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";
  const textColor = light ? "text-cream" : "text-navy";
  const descColor = light ? "text-cream/80" : "text-navy/70";
  const eyebrowColor = light ? "text-gold-light" : "text-gold-dark";
  const eyebrowSizeClass = eyebrowSize === "lg" ? "text-lg" : "text-base";

  return (
    <div className={`max-w-2xl ${alignClass}`}>
      {eyebrow && (
        <p
          className={`mb-4 ${eyebrowSizeClass} font-medium uppercase tracking-[0.25em] ${eyebrowColor}`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`font-serif text-4xl md:text-5xl lg:text-6xl leading-tight ${textColor}`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-xl leading-relaxed ${descColor} ${descriptionClassName}`}
        >
          {description}
        </p>
      )}
      {children && (
        <div
          className={`mt-8 flex ${
            align === "center" ? "justify-center" : "justify-start"
          }`}
        >
          {children}
        </div>
      )}
    </div>
  );
}
