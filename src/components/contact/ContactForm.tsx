"use client";

import { useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import { properties } from "@/data/properties";
import { siteConfig } from "@/data/site";

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

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function ContactForm() {
  const searchParams = useSearchParams();
  const preselectedProperty = searchParams.get("propriete") ?? "";

  const [formData, setFormData] = useState<FormData>({
    ...initialFormData,
    property: preselectedProperty,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

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
    } else if (formData.message.trim().length < 20) {
      newErrors.message = "Le message doit contenir au moins 20 caractères.";
    }

    return newErrors;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setSubmitted(true);
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

  if (submitted) {
    return (
      <div className="border border-gold/30 bg-gold/10 p-8 text-center">
        <h3 className="font-serif text-2xl text-navy">Merci pour votre message</h3>
        <p className="mt-3 text-navy/70">
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
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div>
        <label htmlFor="name" className="mb-2 block text-sm font-medium text-navy">
          Nom complet <span className="text-gold">*</span>
        </label>
        <input
          id="name"
          type="text"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          className={`w-full border bg-white px-4 py-3 text-navy outline-none transition-colors focus:border-gold ${
            errors.name ? "border-red-400" : "border-cream-dark"
          }`}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name}</p>
        )}
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-navy">
            Courriel <span className="text-gold">*</span>
          </label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className={`w-full border bg-white px-4 py-3 text-navy outline-none transition-colors focus:border-gold ${
              errors.email ? "border-red-400" : "border-cream-dark"
            }`}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="mb-2 block text-sm font-medium text-navy">
            Téléphone
          </label>
          <input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            className="w-full border border-cream-dark bg-white px-4 py-3 text-navy outline-none transition-colors focus:border-gold"
          />
        </div>
      </div>

      <div>
        <label htmlFor="property" className="mb-2 block text-sm font-medium text-navy">
          Propriété d&apos;intérêt
        </label>
        <select
          id="property"
          value={formData.property}
          onChange={(e) => handleChange("property", e.target.value)}
          className="w-full border border-cream-dark bg-white px-4 py-3 text-navy outline-none transition-colors focus:border-gold"
        >
          <option value="">Sélectionner une propriété</option>
          {properties.map((p) => (
            <option key={p.slug} value={p.slug}>
              {p.title}
            </option>
          ))}
          <option value="autre">Autre / Demande générale</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium text-navy">
          Message <span className="text-gold">*</span>
        </label>
        <textarea
          id="message"
          rows={5}
          value={formData.message}
          onChange={(e) => handleChange("message", e.target.value)}
          className={`w-full resize-y border bg-white px-4 py-3 text-navy outline-none transition-colors focus:border-gold ${
            errors.message ? "border-red-400" : "border-cream-dark"
          }`}
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-600">{errors.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-navy px-6 py-3 text-sm font-medium tracking-wide text-cream transition-colors hover:bg-navy-light sm:w-auto"
      >
        Envoyer le message
      </button>
    </form>
  );
}
