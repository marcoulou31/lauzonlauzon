import type { Property } from "@/lib/types";
import { formatArea, formatPropertyType } from "@/lib/format";

type PropertyStatsProps = {
  property: Property;
};

export function PropertyStats({ property }: PropertyStatsProps) {
  const stats: string[] = [];

  if (property.bedrooms !== undefined) {
    stats.push(`${property.bedrooms} ch.`);
  }
  if (property.bathrooms !== undefined) {
    stats.push(`${property.bathrooms} sdb`);
  }
  if (property.areaSqft !== undefined) {
    stats.push(formatArea(property.areaSqft));
  }
  stats.push(formatPropertyType(property.type));

  return (
    <div className="flex flex-wrap gap-2">
      <span className="bg-gold/15 px-3 py-1 text-xs font-medium uppercase tracking-wider text-gold-dark">
        {property.status}
      </span>
      {stats.map((stat) => (
        <span
          key={stat}
          className="border border-cream-dark bg-white px-3 py-1 text-xs text-navy/70"
        >
          {stat}
        </span>
      ))}
    </div>
  );
}
