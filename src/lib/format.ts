export function formatPrice(price: number): string {
  return new Intl.NumberFormat("fr-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatArea(sqft: number): string {
  return `${new Intl.NumberFormat("fr-CA").format(sqft)} pi²`;
}

export function formatPropertyType(type: string): string {
  const labels: Record<string, string> = {
    condo: "Condo",
    maison: "Maison",
    commercial: "Commercial",
    terrain: "Terrain",
  };
  return labels[type] ?? type;
}
