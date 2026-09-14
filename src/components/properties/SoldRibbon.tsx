export function SoldRibbon() {
  return (
    <span
      className="pointer-events-none absolute left-0 top-5 z-10 whitespace-nowrap bg-navy/80 py-2.5 pl-5 pr-9 text-lg font-bold italic uppercase text-white shadow-lg sm:top-6 sm:py-3 sm:pl-6 sm:pr-10 sm:text-xl"
      style={{ clipPath: "polygon(0 0, 100% 0, 88% 50%, 100% 100%, 0 100%)" }}
    >
      Vendu
    </span>
  );
}