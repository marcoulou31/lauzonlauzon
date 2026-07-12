"use client";

import Botpoison from "@botpoison/browser";
import { useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";
import { properties } from "@/data/properties";
import { siteConfig } from "@/data/site";
import type { InscriptionOption } from "@/lib/inscriptions";

type FormData = {
  name: string;
  email: string;
  phone: string;
  property: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const initialFormData: FormData = {
  name: "",
  email: "",
  phone: "",
  property: "",
  message: "",
};
const botpoisonPublicKey =
  process.env.NEXT_PUBLIC_BOTPOISON_PUBLIC_KEY ??
  "pk_a6aae5ef-c4a2-46e7-a8b2-b2eda12e7f8b";
const botpoison = new Botpoison({
  publicKey: botpoisonPublicKey,
});

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

type Props = {
  inscriptions?: InscriptionOption[];
};

export function ContactForm({ inscriptions = [] }: Props) {
  const searchParams = useSearchParams();
  const preselectedProperty = searchParams.get("propriete") ?? "";
  const successRef = useRef<HTMLDivElement | null>(null);

  const [formData, setFormData] = useState<FormData>({
    ...initialFormData,
    property: preselectedProperty,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validate = (): FormErrors => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Le nom est requis.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Le courriel est requis.";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Veuillez entrer un courriel valide.";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Le message est requis.";
    } else if (formData.message.trim().length < 5) {
      newErrors.message = "Le message doit contenir au moins 5 caractères.";
    }

    return newErrors;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError(null);
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      try {
        const payload = new FormData(e.currentTarget);
        const { solution } = await botpoison.challenge();
        payload.set("_botpoison", solution);

        const response = await fetch("/api/contact", {
          method: "POST",
          body: payload,
        });

        if (!response.ok) {
          const body = (await response.json().catch(() => null)) as
            | { error?: string }
            | null;
          setSubmitError(
            body?.error ??
              "Une erreur est survenue lors de l'envoi. Veuillez réessayer.",
          );
          return;
        }

        setSubmitted(true);
      } catch {
        setSubmitError(
          "Impossible d'envoyer le formulaire pour le moment. Veuillez réessayer.",
        );
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleChange = (
    field: keyof FormData,
    value: string,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  useEffect(() => {
    if (!submitted) {
      return;
    }

    const successTop = successRef.current?.getBoundingClientRect().top;
    if (typeof successTop !== "number") {
      return;
    }

    const headerOffset = 120;
    const targetTop = window.scrollY + successTop - headerOffset;
    window.scrollTo({
      top: Math.max(0, targetTop),
      behavior: "smooth",
    });
  }, [submitted]);

  return (
    <div className="flex min-h-160 flex-col justify-start sm:min-h-176">
      {submitted ? (
        <div
          ref={successRef}
          className="w-full border border-gold/30 bg-gold/10 p-8 text-center"
        >
          <h3 className="font-serif text-3xl text-navy">
            Merci pour votre message
          </h3>
          <p className="mt-3 text-lg text-navy/70">
            Nous vous contacterons sous peu. En attendant, n&apos;hésitez pas à
            nous appeler au{" "}
            <a
              href={siteConfig.contact.phoneHref}
              className="font-medium text-gold hover:text-navy"
            >
              {siteConfig.contact.phone}
            </a>
            .
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <div>
            <label htmlFor="name" className="mb-2 block text-base font-medium text-navy">
              Nom complet <span className="text-gold">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className={`w-full border bg-white px-4 py-4 text-navy outline-none transition-colors focus:border-gold ${
                errors.name ? "border-red-400" : "border-cream-dark"
              }`}
            />
            {errors.name && (
              <p className="mt-1 text-base text-red-600">{errors.name}</p>
            )}
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="email" className="mb-2 block text-base font-medium text-navy">
                Courriel <span className="text-gold">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className={`w-full border bg-white px-4 py-4 text-navy outline-none transition-colors focus:border-gold ${
                  errors.email ? "border-red-400" : "border-cream-dark"
                }`}
              />
              {errors.email && (
                <p className="mt-1 text-base text-red-600">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="phone" className="mb-2 block text-base font-medium text-navy">
                Téléphone
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                className="w-full border border-cream-dark bg-white px-4 py-4 text-navy outline-none transition-colors focus:border-gold"
              />
            </div>
          </div>

          <div>
            <label htmlFor="property" className="mb-2 block text-base font-medium text-navy">
              Propriété d&apos;intérêt
            </label>
            <select
              id="property"
              name="property"
              value={formData.property}
              onChange={(e) => handleChange("property", e.target.value)}
              className="w-full border border-cream-dark bg-white px-4 py-4 text-navy outline-none transition-colors focus:border-gold"
            >
              <option value="">Sélectionner une propriété</option>
              {inscriptions.length > 0 ? (
                inscriptions.map((ins) => (
                  <option key={ins.value} value={ins.value}>
                    {ins.label}
                  </option>
                ))
              ) : (
                properties.map((p) => (
                  <option key={p.slug} value={p.slug}>
                    {p.title}
                  </option>
                ))
              )}
              <option value="autre">Autre / Demande générale</option>
            </select>
          </div>

          <div>
            <label htmlFor="message" className="mb-2 block text-base font-medium text-navy">
              Message <span className="text-gold">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              value={formData.message}
              onChange={(e) => handleChange("message", e.target.value)}
              className={`w-full resize-y border bg-white px-4 py-4 text-navy outline-none transition-colors focus:border-gold ${
                errors.message ? "border-red-400" : "border-cream-dark"
              }`}
            />
            {errors.message && (
              <p className="mt-1 text-base text-red-600">{errors.message}</p>
            )}
          </div>

          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
            aria-hidden="true"
          />

          {submitError && <p className="text-base text-red-600">{submitError}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full cursor-pointer bg-navy px-6 py-4 text-base font-medium tracking-wide text-cream transition-colors hover:bg-navy-light sm:w-auto"
          >
            {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
          </button>
        </form>
      )}
    </div>
  );
}
