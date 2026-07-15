"use client";

import * as React from "react";

import { Bookmark, ChevronDown, FileText, Info, Lock, MoreVertical, Plus, SlidersHorizontal } from "@/components/icons";
import { OfferWizard } from "@/components/products/offer-wizard";
import { ProductImage } from "@/components/products/product-image";
import { AppShell } from "@/components/layout/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getOptionCompatibility, normalizeConfiguration, shouldRenderAsButtons } from "@/lib/product-compatibility";
import type { ProductAttribute, ProductBase } from "@/lib/product-types";
import { cn } from "@/lib/utils";
import { productCatalogData } from "@/mock/product-catalog";

const data = productCatalogData;

function getCategoryName(product: ProductBase) {
  return data.categories.find((category) => category.id === product.categoryId)?.name ?? "Без категории";
}

function getProductAttributes(product: ProductBase) {
  return product.attributeIds
    .map((attributeId) => data.attributes.find((attribute) => attribute.id === attributeId))
    .filter((attribute): attribute is ProductAttribute => Boolean(attribute && attribute.active));
}

function getOptionLabel(attribute: ProductAttribute, optionId: string) {
  return attribute.options.find((option) => option.id === optionId)?.label ?? optionId;
}

export function ProductCatalogApp() {
  const [selectedProductId, setSelectedProductId] = React.useState(data.products[0].id);
  const [query, setQuery] = React.useState("");
  const [configuration, setConfiguration] = React.useState(data.products[0].defaultConfiguration);
  const [wizardOpen, setWizardOpen] = React.useState(false);

  const selectedProduct = React.useMemo(() => {
    return data.products.find((product) => product.id === selectedProductId) ?? data.products[0];
  }, [selectedProductId]);

  const productAttributes = React.useMemo(() => getProductAttributes(selectedProduct), [selectedProduct]);

  const filteredProducts = React.useMemo(() => {
    const normalizedQuery = query.toLowerCase();
    return data.products.filter((product) => {
      return !normalizedQuery || `${product.name} ${product.article} ${getCategoryName(product)}`.toLowerCase().includes(normalizedQuery);
    });
  }, [query]);

  const categoryCounts = React.useMemo(() => {
    return data.categories
      .filter((category) => category.active)
      .sort((left, right) => left.order - right.order)
      .map((category) => ({
        ...category,
        count: data.products.filter((product) => product.categoryId === category.id).length
      }));
  }, []);

  function selectProduct(product: ProductBase) {
    setSelectedProductId(product.id);
    setConfiguration(product.defaultConfiguration);
  }

  function updateConfiguration(attributeId: string, optionId: string) {
    const nextValues = normalizeConfiguration(
      data.rules,
      productAttributes,
      { ...configuration, [attributeId]: optionId }
    );
    setConfiguration(nextValues);
  }

  return (
    <AppShell
      activeSection="productsCatalog"
      title="Каталог продукции"
      subtitle="Режим менеджера · конфигуратор продукции"
      searchValue={query}
      onSearchChange={setQuery}
      searchPlaceholder="Поиск по товарам и характеристикам..."
      actions={
        <>
          <Button variant="outline" size="icon" className="hidden rounded-xl lg:inline-flex" aria-label="Фильтры">
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
          <Button className="gap-2 rounded-xl px-5" onClick={() => setWizardOpen(true)}>
            <Plus className="h-4 w-4" />
            Создать предложение
          </Button>
        </>
      }
    >
      <div className="grid gap-4 p-4 sm:p-6 lg:grid-cols-[310px_minmax(0,1fr)_340px]">
          <aside className="space-y-4">
            <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <h2 className="text-sm font-semibold text-slate-950">Категории</h2>
              <div className="mt-4 space-y-2">
                {categoryCounts.map((category) => {
                  const active = category.id === selectedProduct.categoryId;
                  return (
                    <button
                      key={category.id}
                      type="button"
                      className={cn(
                        "flex w-full items-center justify-between rounded-lg px-3 py-3 text-left text-sm transition",
                        active ? "bg-blue-50 text-blue-700 ring-1 ring-blue-100" : "text-slate-700 hover:bg-slate-50"
                      )}
                    >
                      <span className="flex min-w-0 items-center gap-3">
                        <span className="grid h-8 w-8 place-items-center rounded-lg bg-slate-100 text-sm">{category.icon}</span>
                        <span className="truncate font-medium">{category.name}</span>
                      </span>
                      <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-500">{category.count}</span>
                    </button>
                  );
                })}
              </div>
            </section>

            <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <h2 className="text-sm font-semibold text-slate-950">Товары</h2>
              <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Поиск товара..." className="mt-4" />
              <div className="mt-3 space-y-2">
                {filteredProducts.map((product) => {
                  const active = product.id === selectedProduct.id;
                  return (
                    <button
                      key={product.id}
                      type="button"
                      onClick={() => selectProduct(product)}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-lg border p-3 text-left transition",
                        active ? "border-blue-300 bg-blue-50" : "border-slate-200 bg-white hover:bg-slate-50"
                      )}
                    >
                      <ProductImage product={product} size="sm" />
                      <span className="min-w-0">
                        <span className="block text-sm font-semibold text-slate-950">{product.name}</span>
                        <span className="mt-1 block text-xs text-slate-500">Артикул: {product.article}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>
          </aside>

          <section className="min-w-0 rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 p-5">
              <div className="flex items-center gap-5">
                <ProductImage product={selectedProduct} size="lg" />
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-xl font-semibold tracking-normal text-slate-950">{selectedProduct.name}</h2>
                    <Badge variant={selectedProduct.status === "active" ? "emerald" : "amber"}>
                      {selectedProduct.status === "active" ? "Активен" : "Черновик"}
                    </Badge>
                  </div>
                  <div className="mt-2 text-sm text-slate-500">Артикул: {selectedProduct.article}</div>
                  <div className="mt-2 text-sm text-slate-500">Категория: {getCategoryName(selectedProduct)}</div>
                </div>
              </div>
              <Button variant="outline" className="gap-2">
                <Bookmark className="h-4 w-4" />
                Сохранить шаблон
              </Button>
            </div>

            <div className="p-5">
              <h3 className="text-base font-semibold text-slate-950">Конфигуратор товара</h3>
              <p className="mt-1 text-sm text-slate-500">Карточка строится автоматически из характеристик базового товара.</p>

              <div className="mt-5 divide-y divide-slate-200">
                {productAttributes.map((attribute) => (
                  <div key={attribute.id} className="grid gap-3 py-4 md:grid-cols-[220px_minmax(0,1fr)]">
                    <div className="flex items-center gap-3 text-sm font-medium text-slate-800">
                      <span className="grid h-8 w-8 place-items-center rounded-lg bg-slate-50 text-slate-500">
                        <Info className="h-4 w-4" />
                      </span>
                      {attribute.label}
                    </div>

                    {attribute.type === "Text" || attribute.type === "Number" ? (
                      <Input
                        type={attribute.type === "Number" ? "number" : "text"}
                        value={configuration[attribute.id] ?? ""}
                        onChange={(event) => updateConfiguration(attribute.id, event.target.value)}
                        className="max-w-sm"
                      />
                    ) : shouldRenderAsButtons(attribute) ? (
                      <div className="flex flex-wrap gap-2">
                        {attribute.options.map((option) => {
                          const compatibility = getOptionCompatibility(data.rules, configuration, attribute.id, option.id);
                          const selected = configuration[attribute.id] === option.id;
                          return (
                            <button
                              key={option.id}
                              type="button"
                              disabled={!compatibility.available}
                              title={compatibility.reason}
                              onClick={() => updateConfiguration(attribute.id, option.id)}
                              className={cn(
                                "inline-flex h-10 items-center gap-2 rounded-lg border px-4 text-sm font-medium transition",
                                selected ? "border-blue-400 bg-blue-50 text-blue-700" : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
                                !compatibility.available ? "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400 opacity-70 hover:bg-slate-100" : ""
                              )}
                            >
                              {compatibility.available ? "●" : "●"} {option.label}
                              {!compatibility.available ? <Lock className="h-3.5 w-3.5" /> : null}
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="relative max-w-sm">
                        <select
                          value={configuration[attribute.id]}
                          onChange={(event) => updateConfiguration(attribute.id, event.target.value)}
                          className="h-11 w-full appearance-none rounded-lg border border-slate-200 bg-white px-4 pr-10 text-sm font-medium text-slate-900 outline-none transition focus:border-blue-300 focus:ring-4 focus:ring-blue-50"
                        >
                          {attribute.options.map((option) => (
                            <option key={option.id} value={option.id}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-3 top-3.5 h-4 w-4 text-slate-400" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>

          <aside className="space-y-4">
            <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 p-4">
                <h2 className="text-sm font-semibold text-slate-950">Текущая конфигурация</h2>
              </div>
              <div className="space-y-4 p-4">
                <div className="flex justify-center">
                  <ProductImage product={selectedProduct} size="lg" />
                </div>
                <div className="space-y-3">
                  {productAttributes.map((attribute) => (
                    <div key={attribute.id} className="flex items-center justify-between gap-4 text-sm">
                      <span className="text-slate-500">{attribute.label}</span>
                      <span className="text-right font-semibold text-slate-950">{getOptionLabel(attribute, configuration[attribute.id])}</span>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full gap-2">
                  <Bookmark className="h-4 w-4" />
                  Сохранить
                </Button>
                <Button className="w-full gap-2" onClick={() => setWizardOpen(true)}>
                  <Plus className="h-4 w-4" />
                  Создать предложение
                </Button>
              </div>
            </section>

            <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-sm font-semibold text-slate-950">Сохраненные конфигурации</h2>
                <Badge variant="blue">{data.savedConfigurations.length}</Badge>
              </div>
              <div className="mt-3 space-y-2">
                {data.savedConfigurations.map((savedConfiguration) => (
                  <div key={savedConfiguration.id} className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white px-3 py-2.5">
                    <div className="min-w-0">
                      <div className="truncate text-sm font-semibold text-slate-950">{savedConfiguration.title}</div>
                      <div className="mt-1 text-xs text-slate-500">Обновлено {savedConfiguration.updatedAt}</div>
                    </div>
                    <button type="button" className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-slate-400 hover:bg-slate-50 hover:text-slate-700" aria-label="Действия">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <h2 className="text-sm font-semibold text-slate-950">Документация</h2>
              <div className="mt-3 space-y-2">
                {data.documents.map((document) => (
                  <button key={document.id} type="button" className="flex w-full items-center gap-3 rounded-lg border border-slate-200 bg-white px-3 py-3 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-50">
                    <span className="grid h-8 w-8 place-items-center rounded-lg bg-blue-50 text-blue-700">
                      <FileText className="h-4 w-4" />
                    </span>
                    {document.label}
                  </button>
                ))}
              </div>
            </section>
          </aside>
      </div>

      <OfferWizard
        open={wizardOpen}
        product={selectedProduct}
        attributes={productAttributes}
        values={configuration}
        onOpenChange={setWizardOpen}
      />
    </AppShell>
  );
}
