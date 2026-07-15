import type { CompatibilityResult, ProductAttribute, ProductRule } from "@/lib/product-types";

function matchesCondition(values: Record<string, string>, rule: ProductRule) {
  return values[rule.if.attributeId] === rule.if.optionId;
}

export function getOptionCompatibility(
  rules: ProductRule[],
  values: Record<string, string>,
  attributeId: string,
  optionId: string
): CompatibilityResult {
  const matchedRule = rules.find((rule) => {
    if (!rule.active || rule.then.attributeId !== attributeId || !matchesCondition(values, rule)) {
      return false;
    }

    if (rule.then.action === "allowOnly") {
      return !rule.then.optionIds.includes(optionId);
    }

    return rule.then.optionIds.includes(optionId);
  });

  if (!matchedRule) {
    return { available: true };
  }

  return {
    available: false,
    reason: matchedRule.reason
  };
}

export function getFirstAvailableOption(
  rules: ProductRule[],
  attributes: ProductAttribute[],
  values: Record<string, string>,
  attributeId: string
) {
  const attribute = attributes.find((item) => item.id === attributeId);
  return attribute?.options.find((option) => getOptionCompatibility(rules, values, attributeId, option.id).available)?.id;
}

export function normalizeConfiguration(
  rules: ProductRule[],
  attributes: ProductAttribute[],
  values: Record<string, string>
) {
  const nextValues = { ...values };

  for (const attribute of attributes) {
    const selectedValue = nextValues[attribute.id];
    if (!selectedValue) {
      continue;
    }

    const compatibility = getOptionCompatibility(rules, nextValues, attribute.id, selectedValue);
    if (!compatibility.available) {
      const nextOption = getFirstAvailableOption(rules, attributes, nextValues, attribute.id);
      if (nextOption) {
        nextValues[attribute.id] = nextOption;
      }
    }
  }

  return nextValues;
}

export function shouldRenderAsButtons(attribute: ProductAttribute) {
  return attribute.type === "Buttons" || attribute.options.length <= 6;
}
