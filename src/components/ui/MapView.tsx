"use client";

import { useEffect, useRef } from "react";

type Props = {
  address: string;
};

export function MapView({ address }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<import("leaflet").Map | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    let cancelled = false;

    (async () => {
      const L = (await import("leaflet")).default;
      await import("leaflet/dist/leaflet.css");

      // Fix default icon paths broken by bundlers
      delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      // Geocode with Nominatim (free, no key required)
      const encoded = encodeURIComponent(address + ", Québec, Canada");
      const resp = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encoded}&format=json&limit=1`,
        { headers: { "Accept-Language": "fr" } },
      );
      const results = await resp.json();
      const lat = results[0] ? parseFloat(results[0].lat) : 46.8139;
      const lon = results[0] ? parseFloat(results[0].lon) : -71.2082;

      // The effect may have been cleaned up while awaiting, or the map may
      // already have been created by a concurrent run (React strict mode).
      if (cancelled || !containerRef.current || mapRef.current) return;

      const map = L.map(containerRef.current).setView([lat, lon], 15);
      mapRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);

      L.marker([lat, lon]).addTo(map).bindPopup(address).openPopup();
    })();

    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [address]);

  return (
    <div
      ref={containerRef}
      className="w-full border border-navy/20"
      style={{ height: 280 }}
    />
  );
}
