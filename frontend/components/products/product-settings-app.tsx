"use client";

import * as React from "react";

import { Plus, SlidersHorizontal } from "@/components/icons";
import { AppShell } from "@/components/layout/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { ProductAttribute, ProductAttributeType, ProductBase, ProductCategory, ProductRule } from "@/lib/product-types";
import { cn } from "@/lib/utils";
import { productCatalogData } from "@/mock/product-catalog";

type SettingsTab = "categories" | "products" | "attributes" | "rules";

const settingsTabs: Array<{ id: SettingsTab; label: string; description: string }> = [
  { id: "categories", label: "Категории", description: "Структура каталога и порядок разделов" },
  { id: "products", label: "Товары", description: "Базовые товары, фотографии и характеристики" },
  { id: "attributes", label: "Характеристики", description: "Типы полей и варианты значений" },
  { id: "rules", label: "Зависимости", description: "Визуальные правила совместимости" }
];

const attributeTypes: ProductAttributeType[] = ["Dropdown", "Buttons", "Number", "Text"];

function createId(prefix: string, value: string) {
  return `${prefix}-${value
    .toLowerCase()
    .replace(/[^a-zа-яё0-9]+/gi, "-")
    .replace(/^-|-$/g, "")}-${Date.now().toString(36)}`;
}

function getOptionLabel(attributes: ProductAttribute[], attributeId: string, optionId: string) {
  return attributes.find((attribute) => attribute.id === attributeId)?.options.find((option) => option.id === optionId)?.label ?? optionId;
}

function getAttributeLabel(attributes: ProductAttribute[], attributeId: string) {
  return attributes.find((attribute) => attribute.id === attributeId)?.label ?? attributeId;
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">{children}</div>;
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-base font-semibold text-slate-950">{title}</h2>
      <div className="mt-4">{children}</div>
    </div>
  );
}

export function ProductSettingsApp() {
  const [activeTab, setActiveTab] = React.useState<SettingsTab>("categories");
  const [categories, setCategories] = React.useState<ProductCategory[]>(productCatalogData.categories);
  const [products, setProducts] = React.useState<ProductBase[]>(productCatalogData.products);
  const [attributes, setAttributes] = React.useState<ProductAttribute[]>(productCatalogData.attributes);
  const [rules, setRules] = React.useState<ProductRule[]>(productCatalogData.rules);

  const [categoryName, setCategoryName] = React.useState("Новая категория");
  const [productName, setProductName] = React.useState("Новый базовый товар");
  const [productCategoryId, setProductCategoryId] = React.useState(productCatalogData.categories[0]?.id ?? "");
  const [attributeName, setAttributeName] = React.useState("Новая характеристика");
  const [attributeType, setAttributeType] = React.useState<ProductAttributeType>("Dropdown");
  const [attributeValues, setAttributeValues] = React.useState("Значение 1, Значение 2");

  const [ruleIfAttribute, setRuleIfAttribute] = React.useState("volume");
  const [ruleIfOption, setRuleIfOption] = React.useState("250");
  const [ruleThenAttribute, setRuleThenAttribute] = React.useState("innerCoating");
  const [ruleAction, setRuleAction] = React.useState<ProductRule["then"]["action"]>("allowOnly");
  const [ruleThenOption, setRuleThenOption] = React.useState("gold-lacquer");
  const [ruleReason, setRuleReason] = React.useState("Для объема 250 мл доступен только золотой лак.");

  const ifAttribute = attributes.find((attribute) => attribute.id === ruleIfAttribute) ?? attributes[0];
  const thenAttribute = attributes.find((attribute) => attribute.id === ruleThenAttribute) ?? attributes[0];

  React.useEffect(() => {
    if (!ifAttribute?.options.some((option) => option.id === ruleIfOption)) {
      setRuleIfOption(ifAttribute?.options[0]?.id ?? "");
    }
  }, [ifAttribute, ruleIfOption]);

  React.useEffect(() => {
    if (!thenAttribute?.options.some((option) => option.id === ruleThenOption)) {
      setRuleThenOption(thenAttribute?.options[0]?.id ?? "");
    }
  }, [thenAttribute, ruleThenOption]);

  function addCategory() {
    const trimmedName = categoryName.trim();
    if (!trimmedName) return;
    setCategories((current) => [
      ...current,
      {
        id: createId("category", trimmedName),
        name: trimmedName,
        icon: "▦",
        order: current.length + 1,
        active: true
      }
    ]);
    setCategoryName("Новая категория");
  }

  function moveCategory(id: string, direction: -1 | 1) {
    setCategories((current) => {
      const sorted = [...current].sort((left, right) => left.order - right.order);
      const index = sorted.findIndex((category) => category.id === id);
      const targetIndex = index + direction;
      if (targetIndex < 0 || targetIndex >= sorted.length) return current;
      [sorted[index], sorted[targetIndex]] = [sorted[targetIndex], sorted[index]];
      return sorted.map((category, categoryIndex) => ({ ...category, order: categoryIndex + 1 }));
    });
  }

  function addProduct() {
    const trimmedName = productName.trim();
    if (!trimmedName || !productCategoryId) return;
    const assignedAttributes = attributes.slice(0, 4);
    setProducts((current) => [
      ...current,
      {
        id: createId("product", trimmedName),
        name: trimmedName,
        article: `TC-${String(current.length + 1).padStart(4, "0")}`,
        categoryId: productCategoryId,
        status: "draft",
        imageTone: "silver",
        attributeIds: assignedAttributes.map((attribute) => attribute.id),
        defaultConfiguration: Object.fromEntries(assignedAttributes.map((attribute) => [attribute.id, attribute.options[0]?.id ?? ""]))
      }
    ]);
    setProductName("Новый базовый товар");
  }

  function addAttribute() {
    const trimmedName = attributeName.trim();
    if (!trimmedName) return;
    const options = attributeValues
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean)
      .map((value) => ({ id: createId("option", value), label: value }));
    setAttributes((current) => [
      ...current,
      {
        id: createId("attribute", trimmedName),
        label: trimmedName,
        type: attributeType,
        active: true,
        options
      }
    ]);
    setAttributeName("Новая характеристика");
    setAttributeValues("Значение 1, Значение 2");
  }

  function addRule() {
    if (!ruleIfAttribute || !ruleIfOption || !ruleThenAttribute || !ruleThenOption || !ruleReason.trim()) return;
    setRules((current) => [
      {
        id: createId("rule", ruleReason),
        name: `${getAttributeLabel(attributes, ruleIfAttribute)} = ${getOptionLabel(attributes, ruleIfAttribute, ruleIfOption)}`,
        active: true,
        if: { attributeId: ruleIfAttribute, operator: "=", optionId: ruleIfOption },
        then: { attributeId: ruleThenAttribute, action: ruleAction, optionIds: [ruleThenOption] },
        reason: ruleReason.trim()
      },
      ...current
    ]);
  }

  return (
    <AppShell
      activeSection="productsSettings"
      title="Настройки каталога"
      subtitle="Режим администратора · товары, характеристики и зависимости"
      searchPlaceholder="Поиск настроек..."
    >
      <div className="space-y-5 p-4 sm:p-6">
          <div className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm md:grid-cols-4">
            {settingsTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "rounded-xl p-4 text-left transition",
                  activeTab === tab.id ? "bg-blue-600 text-white shadow-lg shadow-blue-100" : "text-slate-600 hover:bg-slate-50"
                )}
              >
                <div className="font-semibold">{tab.label}</div>
                <div className={cn("mt-1 text-xs", activeTab === tab.id ? "text-blue-100" : "text-slate-400")}>{tab.description}</div>
              </button>
            ))}
          </div>

          {activeTab === "categories" ? (
            <section className="grid gap-4 xl:grid-cols-[360px_minmax(0,1fr)]">
              <SectionCard title="Создать категорию">
                <FieldLabel>Название</FieldLabel>
                <Input value={categoryName} onChange={(event) => setCategoryName(event.target.value)} />
                <Button className="mt-3 w-full" onClick={addCategory}>
                  <Plus className="h-4 w-4" />
                  Создать
                </Button>
              </SectionCard>

              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {[...categories].sort((left, right) => left.order - right.order).map((category) => (
                  <div key={category.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-sm text-slate-500">Порядок {category.order}</div>
                        <input
                          value={category.name}
                          onChange={(event) => setCategories((current) => current.map((item) => (item.id === category.id ? { ...item, name: event.target.value } : item)))}
                          className="mt-2 w-full bg-transparent text-base font-semibold outline-none"
                        />
                      </div>
                      <Badge variant={category.active ? "emerald" : "default"}>{category.active ? "Активна" : "Выкл"}</Badge>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      <Button variant="outline" onClick={() => moveCategory(category.id, -1)}>Выше</Button>
                      <Button variant="outline" onClick={() => moveCategory(category.id, 1)}>Ниже</Button>
                      <Button variant="outline" onClick={() => setCategories((current) => current.map((item) => (item.id === category.id ? { ...item, active: !item.active } : item)))}>
                        {category.active ? "Деактивировать" : "Активировать"}
                      </Button>
                      <Button variant="outline" onClick={() => setCategories((current) => current.filter((item) => item.id !== category.id))}>Удалить</Button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {activeTab === "products" ? (
            <section className="grid gap-4 xl:grid-cols-[360px_minmax(0,1fr)]">
              <SectionCard title="Создать базовый товар">
                <FieldLabel>Название</FieldLabel>
                <Input value={productName} onChange={(event) => setProductName(event.target.value)} />
                <FieldLabel>Категория</FieldLabel>
                <select value={productCategoryId} onChange={(event) => setProductCategoryId(event.target.value)} className="h-11 w-full rounded-lg border border-slate-200 px-3 text-sm">
                  {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
                </select>
                <Button variant="outline" className="mt-3 w-full">Загрузить фотографию</Button>
                <Button className="mt-3 w-full" onClick={addProduct}>
                  <Plus className="h-4 w-4" />
                  Создать товар
                </Button>
              </SectionCard>

              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {products.map((product) => (
                  <div key={product.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <input
                          value={product.name}
                          onChange={(event) => setProducts((current) => current.map((item) => (item.id === product.id ? { ...item, name: event.target.value } : item)))}
                          className="w-full bg-transparent text-base font-semibold outline-none"
                        />
                        <div className="mt-1 text-sm text-slate-500">{product.article}</div>
                      </div>
                      <Badge variant={product.status === "active" ? "emerald" : "amber"}>{product.status === "active" ? "Активен" : "Черновик"}</Badge>
                    </div>
                    <select
                      value={product.categoryId}
                      onChange={(event) => setProducts((current) => current.map((item) => (item.id === product.id ? { ...item, categoryId: event.target.value } : item)))}
                      className="mt-4 h-10 w-full rounded-lg border border-slate-200 px-3 text-sm"
                    >
                      {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
                    </select>
                    <div className="mt-4 text-xs font-semibold uppercase text-slate-500">Назначить характеристики</div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {attributes.map((attribute) => (
                        <button
                          key={attribute.id}
                          type="button"
                          onClick={() => setProducts((current) => current.map((item) => {
                            if (item.id !== product.id) return item;
                            const exists = item.attributeIds.includes(attribute.id);
                            return { ...item, attributeIds: exists ? item.attributeIds.filter((id) => id !== attribute.id) : [...item.attributeIds, attribute.id] };
                          }))}
                          className={cn("rounded-lg border px-2.5 py-1.5 text-xs", product.attributeIds.includes(attribute.id) ? "border-blue-300 bg-blue-50 text-blue-700" : "border-slate-200 text-slate-500")}
                        >
                          {attribute.label}
                        </button>
                      ))}
                    </div>
                    <Button variant="outline" className="mt-4 w-full" onClick={() => setProducts((current) => current.filter((item) => item.id !== product.id))}>Удалить</Button>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {activeTab === "attributes" ? (
            <section className="grid gap-4 xl:grid-cols-[360px_minmax(0,1fr)]">
              <SectionCard title="Создать характеристику">
                <FieldLabel>Название</FieldLabel>
                <Input value={attributeName} onChange={(event) => setAttributeName(event.target.value)} />
                <FieldLabel>Тип</FieldLabel>
                <select value={attributeType} onChange={(event) => setAttributeType(event.target.value as ProductAttributeType)} className="h-11 w-full rounded-lg border border-slate-200 px-3 text-sm">
                  {attributeTypes.map((type) => <option key={type}>{type}</option>)}
                </select>
                <FieldLabel>Значения через запятую</FieldLabel>
                <Input value={attributeValues} onChange={(event) => setAttributeValues(event.target.value)} />
                <Button className="mt-3 w-full" onClick={addAttribute}>
                  <Plus className="h-4 w-4" />
                  Создать характеристику
                </Button>
              </SectionCard>

              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {attributes.map((attribute) => (
                  <div key={attribute.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="flex items-start justify-between gap-3">
                      <input
                        value={attribute.label}
                        onChange={(event) => setAttributes((current) => current.map((item) => (item.id === attribute.id ? { ...item, label: event.target.value } : item)))}
                        className="w-full bg-transparent text-base font-semibold outline-none"
                      />
                      <Badge variant="blue">{attribute.type}</Badge>
                    </div>
                    <select
                      value={attribute.type}
                      onChange={(event) => setAttributes((current) => current.map((item) => (item.id === attribute.id ? { ...item, type: event.target.value as ProductAttributeType } : item)))}
                      className="mt-3 h-10 w-full rounded-lg border border-slate-200 px-3 text-sm"
                    >
                      {attributeTypes.map((type) => <option key={type}>{type}</option>)}
                    </select>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {attribute.options.map((option) => (
                        <span key={option.id} className="rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs font-medium text-slate-700">{option.label}</span>
                      ))}
                    </div>
                    <Button variant="outline" className="mt-4 w-full" onClick={() => setAttributes((current) => current.filter((item) => item.id !== attribute.id))}>Удалить</Button>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {activeTab === "rules" ? (
            <section className="grid gap-4 xl:grid-cols-[460px_minmax(0,1fr)]">
              <SectionCard title="Визуальный редактор правил">
                <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
                  <SlidersHorizontal className="h-5 w-5 text-blue-600" />
                  Без JSON — только понятная логика для администратора
                </div>
                <div className="mt-5 space-y-4">
                  <div className="rounded-xl bg-slate-50 p-4">
                    <FieldLabel>Если</FieldLabel>
                    <select value={ruleIfAttribute} onChange={(event) => setRuleIfAttribute(event.target.value)} className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm">
                      {attributes.map((attribute) => <option key={attribute.id} value={attribute.id}>{attribute.label}</option>)}
                    </select>
                    <select value={ruleIfOption} onChange={(event) => setRuleIfOption(event.target.value)} className="mt-2 h-10 w-full rounded-lg border border-slate-200 px-3 text-sm">
                      {ifAttribute?.options.map((option) => <option key={option.id} value={option.id}>{option.label}</option>)}
                    </select>
                  </div>
                  <div className="rounded-xl bg-slate-50 p-4">
                    <FieldLabel>То</FieldLabel>
                    <select value={ruleThenAttribute} onChange={(event) => setRuleThenAttribute(event.target.value)} className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm">
                      {attributes.map((attribute) => <option key={attribute.id} value={attribute.id}>{attribute.label}</option>)}
                    </select>
                    <select value={ruleAction} onChange={(event) => setRuleAction(event.target.value as ProductRule["then"]["action"])} className="mt-2 h-10 w-full rounded-lg border border-slate-200 px-3 text-sm">
                      <option value="allowOnly">Разрешить только</option>
                      <option value="disallow">Запретить</option>
                    </select>
                    <select value={ruleThenOption} onChange={(event) => setRuleThenOption(event.target.value)} className="mt-2 h-10 w-full rounded-lg border border-slate-200 px-3 text-sm">
                      {thenAttribute?.options.map((option) => <option key={option.id} value={option.id}>{option.label}</option>)}
                    </select>
                  </div>
                  <FieldLabel>Причина</FieldLabel>
                  <Input value={ruleReason} onChange={(event) => setRuleReason(event.target.value)} />
                  <Button className="w-full" onClick={addRule}>
                    <Plus className="h-4 w-4" />
                    Добавить правило
                  </Button>
                </div>
              </SectionCard>

              <div className="grid gap-3 md:grid-cols-2">
                {rules.map((rule) => (
                  <div key={rule.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="font-semibold text-slate-950">{rule.name}</div>
                        <div className="mt-2 text-sm leading-6 text-slate-600">
                          ЕСЛИ {getAttributeLabel(attributes, rule.if.attributeId)} = {getOptionLabel(attributes, rule.if.attributeId, rule.if.optionId)}
                          <br />
                          ТО {getAttributeLabel(attributes, rule.then.attributeId)} {rule.then.action === "allowOnly" ? "разрешить только" : "запретить"} {rule.then.optionIds.map((optionId) => getOptionLabel(attributes, rule.then.attributeId, optionId)).join(", ")}
                        </div>
                      </div>
                      <Badge variant={rule.active ? "emerald" : "default"}>{rule.active ? "Активно" : "Выкл"}</Badge>
                    </div>
                    <div className="mt-4 rounded-lg bg-slate-50 p-3 text-sm text-slate-600">{rule.reason}</div>
                    <div className="mt-4 flex gap-2">
                      <Button variant="outline" onClick={() => setRules((current) => current.map((item) => (item.id === rule.id ? { ...item, active: !item.active } : item)))}>
                        {rule.active ? "Отключить" : "Включить"}
                      </Button>
                      <Button variant="outline" onClick={() => setRules((current) => current.filter((item) => item.id !== rule.id))}>Удалить</Button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ) : null}
      </div>
    </AppShell>
  );
}
