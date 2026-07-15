export type ProductCategory = {
  id: string;
  name: string;
  icon: string;
};

export type ProductOption = {
  id: string;
  label: string;
};

export type ProductAttribute = {
  id: string;
  label: string;
  unit?: string;
  display: "select" | "chips";
  options: ProductOption[];
};

export type ProductBase = {
  id: string;
  name: string;
  article: string;
  categoryId: string;
  status: "active" | "draft";
  imageTone: "silver" | "steel" | "gray";
  defaultConfiguration: Record<string, string>;
};

export type ProductRestriction = {
  attributeId: string;
  optionId: string;
  when: Record<string, string>;
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
  restrictions: ProductRestriction[];
  savedConfigurations: SavedProductConfiguration[];
  documents: ProductDocument[];
};

export type CompatibilityResult = {
  available: boolean;
  reason?: string;
};
