export type UserRole = "Manager" | "Administrator";

export type ProductCategory = {
  id: string;
  name: string;
  icon: string;
  order: number;
  active: boolean;
};

export type ProductAttributeType = "Dropdown" | "Buttons" | "Number" | "Text";

export type ProductOption = {
  id: string;
  label: string;
};

export type ProductAttribute = {
  id: string;
  label: string;
  type: ProductAttributeType;
  unit?: string;
  active: boolean;
  options: ProductOption[];
};

export type ProductBase = {
  id: string;
  name: string;
  article: string;
  categoryId: string;
  status: "active" | "draft";
  imageTone: "silver" | "steel" | "gray";
  attributeIds: string[];
  defaultConfiguration: Record<string, string>;
};

export type ProductRuleOperator = "=";
export type ProductRuleAction = "allowOnly" | "disallow";

export type ProductRule = {
  id: string;
  name: string;
  active: boolean;
  if: {
    attributeId: string;
    operator: ProductRuleOperator;
    optionId: string;
  };
  then: {
    attributeId: string;
    action: ProductRuleAction;
    optionIds: string[];
  };
  reason: string;
};

export type SavedProductConfiguration = {
  id: string;
  productId: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  values: Record<string, string>;
};

export type ProductDocument = {
  id: string;
  label: string;
  type: "pdf" | "step";
};

export type ProductCatalogData = {
  categories: ProductCategory[];
  products: ProductBase[];
  attributes: ProductAttribute[];
  rules: ProductRule[];
  savedConfigurations: SavedProductConfiguration[];
  documents: ProductDocument[];
};

export type CompatibilityResult = {
  available: boolean;
  reason?: string;
};
