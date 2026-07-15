import type { CompatibilityResult, ProductRestriction } from "@/lib/product-types";

function matchesRestriction(values: Record<string, string>, when: Record<string, string>) {
  return Object.entries(when).every(([attributeId, optionId]) => values[attributeId] === optionId);
}

export function getOptionCompatibility(
  restrictions: ProductRestriction[],
  values: Record<string, string>,
  attributeId: string,
  optionId: string
): CompatibilityResult {
  const restriction = restrictions.find((item) => {
    return item.attributeId === attributeId && item.optionId === optionId && matchesRestriction(values, item.when);
  });

  if (!restriction) {
    return { available: true };
  }

  return {
    available: false,
    reason: restriction.reason
  };
}

export function normalizeConfiguration(
  restrictions: ProductRestriction[],
  values: Record<string, string>,
  fallbackValues: Record<string, string>
) {
  const nextValues = { ...values };

  for (const restriction of restrictions) {
    const blocked = getOptionCompatibility(restrictions, nextValues, restriction.attributeId, nextValues[restriction.attributeId]);
    if (!blocked.available) {
      nextValues[restriction.attributeId] = fallbackValues[restriction.attributeId];
    }
  }

  return nextValues;
}
