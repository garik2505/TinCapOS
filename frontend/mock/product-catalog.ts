import type { ProductCatalogData } from "@/lib/product-types";

export const productCatalogData: ProductCatalogData = {
  categories: [
    { id: "tin-cans", name: "Жестяные банки", icon: "▣", order: 1, active: true },
    { id: "tin-canisters", name: "Жестяные канистры", icon: "▥", order: 2, active: true },
    { id: "aerosol-cans", name: "Аэрозольные баллоны", icon: "▯", order: 3, active: true },
    { id: "metal-buckets", name: "Металлические ведра", icon: "▤", order: 4, active: true },
    { id: "chemical-cans", name: "Банки для химии", icon: "▧", order: 5, active: true }
  ],
  products: [
    {
      id: "tin-can-250",
      name: "Банка жестяная 250 мл",
      article: "TC-CAN-250",
      categoryId: "tin-cans",
      status: "active",
      imageTone: "silver",
      attributeIds: ["volume", "shape", "bodyMaterial", "innerCoating", "outerCoating", "lidType", "seamType", "tinThickness", "printing"],
      defaultConfiguration: {
        volume: "250",
        shape: "cylindrical",
        bodyMaterial: "tinplate",
        innerCoating: "gold-lacquer",
        outerCoating: "gloss-lacquer",
        lidType: "pull-cap",
        seamType: "welded",
        tinThickness: "0.18",
        printing: "none"
      }
    },
    {
      id: "tin-can-4000",
      name: "Банка жестяная 4 л",
      article: "TC-CAN-4000",
      categoryId: "tin-cans",
      status: "active",
      imageTone: "steel",
      attributeIds: ["volume", "shape", "bodyMaterial", "innerCoating", "outerCoating", "lidType", "seamType", "tinThickness", "printing"],
      defaultConfiguration: {
        volume: "4000",
        shape: "cylindrical",
        bodyMaterial: "tinplate",
        innerCoating: "bpa-ni",
        outerCoating: "gloss-lacquer",
        lidType: "lever-lid",
        seamType: "welded",
        tinThickness: "0.25",
        printing: "offset"
      }
    },
    {
      id: "metal-canister-2000",
      name: "Канистра металлическая 2 л",
      article: "TC-KAN-2000",
      categoryId: "tin-canisters",
      status: "active",
      imageTone: "gray",
      attributeIds: ["volume", "shape", "bodyMaterial", "innerCoating", "outerCoating", "handleType", "lidType", "seamType", "tinThickness", "printing"],
      defaultConfiguration: {
        volume: "2000",
        shape: "rectangular",
        bodyMaterial: "tinplate",
        innerCoating: "gold-lacquer",
        outerCoating: "gloss-lacquer",
        handleType: "no-handle",
        lidType: "screw-cap",
        seamType: "welded",
        tinThickness: "0.22",
        printing: "none"
      }
    },
    {
      id: "metal-canister-5000",
      name: "Канистра металлическая 5 л",
      article: "TC-KAN-5000",
      categoryId: "tin-canisters",
      status: "active",
      imageTone: "gray",
      attributeIds: ["volume", "shape", "bodyMaterial", "innerCoating", "outerCoating", "handleType", "lidType", "seamType", "tinThickness", "printing"],
      defaultConfiguration: {
        volume: "5000",
        shape: "rectangular",
        bodyMaterial: "tinplate",
        innerCoating: "white-lacquer",
        outerCoating: "painted",
        handleType: "plastic-handle",
        lidType: "screw-cap",
        seamType: "welded",
        tinThickness: "0.25",
        printing: "label"
      }
    },
    {
      id: "aerosol-520",
      name: "Аэрозольный баллон 520 мл",
      article: "TC-AER-520",
      categoryId: "aerosol-cans",
      status: "draft",
      imageTone: "silver",
      attributeIds: ["volume", "shape", "bodyMaterial", "outerCoating", "printing"],
      defaultConfiguration: {
        volume: "520",
        shape: "cylindrical",
        bodyMaterial: "tinplate",
        outerCoating: "gloss-lacquer",
        printing: "offset"
      }
    }
  ],
  attributes: [
    {
      id: "volume",
      label: "Объем",
      type: "Dropdown",
      unit: "мл",
      active: true,
      options: [
        { id: "250", label: "250 мл" },
        { id: "520", label: "520 мл" },
        { id: "2000", label: "2 л" },
        { id: "4000", label: "4 л" },
        { id: "5000", label: "5 л" }
      ]
    },
    {
      id: "shape",
      label: "Форма",
      type: "Buttons",
      active: true,
      options: [
        { id: "cylindrical", label: "Цилиндрическая" },
        { id: "rectangular", label: "Прямоугольная" }
      ]
    },
    {
      id: "bodyMaterial",
      label: "Материал корпуса",
      type: "Buttons",
      active: true,
      options: [
        { id: "tinplate", label: "Жесть" },
        { id: "galvanized-steel", label: "Оцинкованная сталь" }
      ]
    },
    {
      id: "innerCoating",
      label: "Внутреннее покрытие",
      type: "Buttons",
      active: true,
      options: [
        { id: "gold-lacquer", label: "Золотой лак" },
        { id: "white-lacquer", label: "Белый лак" },
        { id: "epoxy-phenolic", label: "Эпокси" },
        { id: "bpa-ni", label: "BPA-NI" }
      ]
    },
    {
      id: "outerCoating",
      label: "Внешнее покрытие",
      type: "Dropdown",
      active: true,
      options: [
        { id: "gloss-lacquer", label: "Лак (глянцевый)" },
        { id: "matte-lacquer", label: "Лак (матовый)" },
        { id: "painted", label: "Окрашенное покрытие" }
      ]
    },
    {
      id: "handleType",
      label: "Ручка",
      type: "Buttons",
      active: true,
      options: [
        { id: "no-handle", label: "Без ручки" },
        { id: "plastic-handle", label: "Пластиковая" },
        { id: "metal-handle", label: "Металлическая" }
      ]
    },
    {
      id: "lidType",
      label: "Тип крышки",
      type: "Dropdown",
      active: true,
      options: [
        { id: "pull-cap", label: "Крышка с натягом" },
        { id: "lever-lid", label: "Крышка с замком" },
        { id: "screw-cap", label: "Винтовая крышка" }
      ]
    },
    {
      id: "seamType",
      label: "Тип шва",
      type: "Buttons",
      active: true,
      options: [
        { id: "welded", label: "Сварной шов" },
        { id: "lock-seam", label: "Замковый шов" }
      ]
    },
    {
      id: "tinThickness",
      label: "Толщина жести",
      type: "Dropdown",
      unit: "мм",
      active: true,
      options: [
        { id: "0.18", label: "0.18 мм" },
        { id: "0.22", label: "0.22 мм" },
        { id: "0.25", label: "0.25 мм" },
        { id: "0.28", label: "0.28 мм" }
      ]
    },
    {
      id: "printing",
      label: "Печать",
      type: "Dropdown",
      active: true,
      options: [
        { id: "none", label: "Без печати" },
        { id: "offset", label: "Офсетная печать" },
        { id: "label", label: "Этикетка" }
      ]
    }
  ],
  rules: [
    {
      id: "rule-can-250-inner-coating",
      name: "250 мл только золотой лак",
      active: true,
      if: { attributeId: "volume", operator: "=", optionId: "250" },
      then: { attributeId: "innerCoating", action: "allowOnly", optionIds: ["gold-lacquer"] },
      reason: "Для объема 250 мл доступен только золотой лак."
    },
    {
      id: "rule-canister-2l-handle",
      name: "2 л без ручки",
      active: true,
      if: { attributeId: "volume", operator: "=", optionId: "2000" },
      then: { attributeId: "handleType", action: "allowOnly", optionIds: ["no-handle"] },
      reason: "Для канистры 2 л ручка недоступна."
    }
  ],
  savedConfigurations: [
    {
      id: "saved-250-gold",
      productId: "tin-can-250",
      title: "250 мл · Золотой лак",
      createdAt: "15.07.2026",
      updatedAt: "15.07.2026",
      values: {
        volume: "250",
        shape: "cylindrical",
        bodyMaterial: "tinplate",
        innerCoating: "gold-lacquer",
        outerCoating: "gloss-lacquer",
        lidType: "pull-cap",
        seamType: "welded",
        tinThickness: "0.18",
        printing: "none"
      }
    },
    {
      id: "saved-250-alt",
      productId: "tin-can-250",
      title: "250 мл · Альтернативный вариант",
      createdAt: "14.07.2026",
      updatedAt: "14.07.2026",
      values: {
        volume: "250",
        shape: "cylindrical",
        bodyMaterial: "tinplate",
        innerCoating: "gold-lacquer",
        outerCoating: "matte-lacquer",
        lidType: "lock-cap",
        seamType: "welded",
        tinThickness: "0.22",
        printing: "offset"
      }
    }
  ],
  documents: [
    { id: "specification", label: "Спецификация PDF", type: "pdf" },
    { id: "drawing", label: "Чертеж PDF", type: "pdf" },
    { id: "step-model", label: "3D-модель STEP", type: "step" }
  ]
};
