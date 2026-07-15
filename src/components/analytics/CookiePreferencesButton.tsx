"use client";

import { OPEN_CONSENT_EVENT } from "@/components/analytics/consent";

export function CookiePreferencesButton() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_CONSENT_EVENT))}
      className="transition-colors hover:text-gold-light"
    >
      Préférences cookies
    </button>
  );
}
