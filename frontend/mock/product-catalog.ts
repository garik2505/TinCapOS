import type { ProductCatalogData } from "@/lib/product-types";

export const productCatalogData: ProductCatalogData = {
  categories: [
    { id: "tin-cans", name: "Жестяные банки", icon: "▣" },
    { id: "tin-canisters", name: "Жестяные канистры", icon: "▥" },
    { id: "aerosol-cans", name: "Аэрозольные баллоны", icon: "▯" },
    { id: "metal-buckets", name: "Металлические ведра", icon: "▤" },
    { id: "chemical-cans", name: "Банки для химии", icon: "▧" }
  ],
  products: [
    {
      id: "tin-can-250",
      name: "Банка жестяная 250 мл",
      article: "TC-CAN-250",
      categoryId: "tin-cans",
      status: "active",
      imageTone: "silver",
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
      id: "tin-can-500",
      name: "Банка жестяная 500 мл",
      article: "TC-CAN-500",
      categoryId: "tin-cans",
      status: "active",
      imageTone: "silver",
      defaultConfiguration: {
        volume: "500",
        shape: "cylindrical",
        bodyMaterial: "tinplate",
        innerCoating: "gold-lacquer",
        outerCoating: "gloss-lacquer",
        lidType: "press-cap",
        seamType: "welded",
        tinThickness: "0.20",
        printing: "offset"
      }
    },
    {
      id: "tin-can-1000",
      name: "Банка жестяная 1 л",
      article: "TC-CAN-1000",
      categoryId: "tin-cans",
      status: "active",
      imageTone: "silver",
      defaultConfiguration: {
        volume: "1000",
        shape: "cylindrical",
        bodyMaterial: "tinplate",
        innerCoating: "white-lacquer",
        outerCoating: "matte-lacquer",
        lidType: "press-cap",
        seamType: "welded",
        tinThickness: "0.22",
        printing: "offset"
      }
    },
    {
      id: "tin-can-4000",
      name: "Банка жестяная 4 л",
      article: "TC-CAN-4000",
      categoryId: "tin-cans",
      status: "active",
      imageTone: "steel",
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
      id: "metal-canister-10000",
      name: "Канистра металлическая 10 л",
      article: "TC-CAN-10000",
      categoryId: "tin-canisters",
      status: "active",
      imageTone: "gray",
      defaultConfiguration: {
        volume: "10000",
        shape: "rectangular",
        bodyMaterial: "tinplate",
        innerCoating: "epoxy-phenolic",
        outerCoating: "gloss-lacquer",
        lidType: "screw-cap",
        seamType: "welded",
        tinThickness: "0.28",
        printing: "label"
      }
    }
  ],
  attributes: [
    {
      id: "volume",
      label: "Объем",
      unit: "мл",
      display: "select",
      options: [
        { id: "250", label: "250 мл" },
        { id: "500", label: "500 мл" },
        { id: "1000", label: "1 л" },
        { id: "4000", label: "4 л" },
        { id: "10000", label: "10 л" }
      ]
    },
    {
      id: "shape",
      label: "Форма",
      display: "select",
      options: [
        { id: "cylindrical", label: "Цилиндрическая" },
        { id: "rectangular", label: "Прямоугольная" }
      ]
    },
    {
      id: "bodyMaterial",
      label: "Материал корпуса",
      display: "select",
      options: [
        { id: "tinplate", label: "Жесть" },
        { id: "galvanized-steel", label: "Оцинкованная сталь" }
      ]
    },
    {
      id: "innerCoating",
      label: "Внутреннее покрытие",
      display: "chips",
      options: [
        { id: "gold-lacquer", label: "Золотой лак" },
        { id: "white-lacquer", label: "Белый лак" },
        { id: "epoxy-phenolic", label: "Эпоксифенольное покрытие" },
        { id: "bpa-ni", label: "BPA-NI" }
      ]
    },
    {
      id: "outerCoating",
      label: "Внешнее покрытие",
      display: "select",
      options: [
        { id: "gloss-lacquer", label: "Лак (глянцевый)" },
        { id: "matte-lacquer", label: "Лак (матовый)" },
        { id: "painted", label: "Окрашенное покрытие" }
      ]
    },
    {
      id: "lidType",
      label: "Тип крышки",
      display: "select",
      options: [
        { id: "pull-cap", label: "Крышка с натягом" },
        { id: "press-cap", label: "Прижимная крышка" },
        { id: "lever-lid", label: "Крышка с замком" },
        { id: "screw-cap", label: "Винтовая крышка" }
      ]
    },
    {
      id: "seamType",
      label: "Тип шва",
      display: "select",
      options: [
        { id: "welded", label: "Сварной шов" },
        { id: "lock-seam", label: "Замковый шов" }
      ]
    },
    {
      id: "tinThickness",
      label: "Толщина жести",
      unit: "мм",
      display: "select",
      options: [
        { id: "0.18", label: "0.18 мм" },
        { id: "0.20", label: "0.20 мм" },
        { id: "0.22", label: "0.22 мм" },
        { id: "0.25", label: "0.25 мм" },
        { id: "0.28", label: "0.28 мм" }
      ]
    },
    {
      id: "printing",
      label: "Печать",
      display: "select",
      options: [
        { id: "none", label: "Без печати" },
        { id: "offset", label: "Офсетная печать" },
        { id: "label", label: "Этикетка" }
      ]
    }
  ],
  restrictions: [
    {
      attributeId: "innerCoating",
      optionId: "white-lacquer",
      when: { volume: "250" },
      reason: "Для объема 250 мл доступен только золотой лак"
    },
    {
      attributeId: "innerCoating",
      optionId: "epoxy-phenolic",
      when: { volume: "250" },
      reason: "Для объема 250 мл доступен только золотой лак"
    },
    {
      attributeId: "innerCoating",
      optionId: "bpa-ni",
      when: { volume: "250" },
      reason: "Для объема 250 мл доступен только золотой лак"
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
        lidType: "press-cap",
        seamType: "welded",
        tinThickness: "0.20",
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
