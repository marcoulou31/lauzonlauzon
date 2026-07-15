"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import Script from "next/script";
import {
  CONSENT_STORAGE_KEY,
  CONSENT_UPDATED_EVENT,
  OPEN_CONSENT_EVENT,
} from "@/components/analytics/consent";

type ConsentStatus = "accepted" | "rejected" | null;

function readConsent(): ConsentStatus {
  if (typeof window === "undefined") {
    return null;
  }

  const rawValue = window.localStorage.getItem(CONSENT_STORAGE_KEY);
  if (rawValue === "accepted" || rawValue === "rejected") {
    return rawValue;
  }

  return null;
}

function subscribeConsent(onStoreChange: () => void) {
  const onStorageChange = (event: Event) => {
    if (
      event.type === CONSENT_UPDATED_EVENT ||
      (event instanceof StorageEvent && event.key === CONSENT_STORAGE_KEY)
    ) {
      onStoreChange();
    }
  };

  window.addEventListener("storage", onStorageChange);
  window.addEventListener(CONSENT_UPDATED_EVENT, onStorageChange);

  return () => {
    window.removeEventListener("storage", onStorageChange);
    window.removeEventListener(CONSENT_UPDATED_EVENT, onStorageChange);
  };
}

export function AnalyticsConsent() {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const consent = useSyncExternalStore(subscribeConsent, readConsent, () => null);
  const [isBannerOpen, setIsBannerOpen] = useState(false);

  useEffect(() => {
    const onOpenPreferences = () => {
      setIsBannerOpen(true);
    };

    window.addEventListener(OPEN_CONSENT_EVENT, onOpenPreferences);

    return () => {
      window.removeEventListener(OPEN_CONSENT_EVENT, onOpenPreferences);
    };
  }, []);

  const gaEnabled = useMemo(() => {
    return Boolean(measurementId) && consent === "accepted";
  }, [measurementId, consent]);

  const saveConsent = (nextConsent: Exclude<ConsentStatus, null>) => {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, nextConsent);
    window.dispatchEvent(new Event(CONSENT_UPDATED_EVENT));
    setIsBannerOpen(false);
  };

  return (
    <>
      {gaEnabled ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${measurementId}');
            `}
          </Script>
        </>
      ) : null}

      {consent === null || isBannerOpen ? (
        <div className="fixed inset-x-0 bottom-0 z-50 border-t border-navy/20 bg-cream/95 shadow-xl backdrop-blur">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-6 py-4 sm:flex-row sm:items-center sm:justify-between lg:px-8">
            <div>
              <p className="font-serif text-lg text-navy">Vos préférences de confidentialité</p>
              <p className="mt-1 text-sm text-navy/80">
                Nous utilisons des cookies et des technologies similaires à des fins de statistiques et d'amélioration du service. Vous pouvez accepter ou refuser ces cookies.
              </p>
            </div>
            <div className="flex shrink-0 gap-3">
              <button
                type="button"
                onClick={() => saveConsent("rejected")}
                className="rounded-md border border-navy/30 px-4 py-2 text-sm font-medium text-navy transition-colors hover:bg-navy/5"
              >
                Refuser
              </button>
              <button
                type="button"
                onClick={() => saveConsent("accepted")}
                className="rounded-md bg-navy px-4 py-2 text-sm font-medium text-cream transition-colors hover:bg-navy/90"
              >
                Accepter
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
