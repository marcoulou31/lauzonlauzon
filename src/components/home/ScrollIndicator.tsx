type ScrollIndicatorProps = {
  targetId: string;
};

export function ScrollIndicator({ targetId }: ScrollIndicatorProps) {
  return (
    <a
      href={`#${targetId}`}
      aria-label="Défiler vers la section suivante"
      className="absolute bottom-4 right-4 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-cream/40 bg-navy/40 text-cream backdrop-blur-sm transition-colors hover:bg-navy/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5 motion-safe:animate-bounce"
        aria-hidden="true"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </a>
  );
}
