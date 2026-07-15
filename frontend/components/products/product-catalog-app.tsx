"use client";

import * as React from "react";

import { Bell, Bookmark, ChevronDown, Download, Info, Lock, MoreVertical, Plus, RefreshCw, Search, SlidersHorizontal, Star } from "@/components/icons";
import { OfferWizard } from "@/components/products/offer-wizard";
import { ProductImage } from "@/components/products/product-image";
import { SalesSidebar } from "@/components/sales/sidebar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { productCatalogData } from "@/mock/product-catalog";
import { getOptionCompatibility, normalizeConfiguration } from "@/lib/product-compatibility";
import type { ProductAttribute, ProductBase } from "@/lib/product-types";
import { cn } from "@/lib/utils";

const data = productCatalogData;

function getCategoryName(product: ProductBase) {
  return data.categories.find((category) => category.id === product.categoryId)?.name ?? "Без категории";
}

function getOptionLabel(attribute: ProductAttribute, optionId: string) {
  return attribute.options.find((option) => option.id === optionId)?.label ?? optionId;
}

function getAttributeLabel(attributeId: string, values: Record<string, string>) {
  const attribute = data.attributes.find((item) => item.id === attributeId);
  if (!attribute) {
    return values[attributeId] ?? "Не выбрано";
  }
  return getOptionLabel(attribute, values[attributeId]);
}

export function ProductCatalogApp() {
  const [selectedProductId, setSelectedProductId] = React.useState(data.products[0].id);
  const [query, setQuery] = React.useState("");
  const [configuration, setConfiguration] = React.useState(data.products[0].defaultConfiguration);
  const [wizardOpen, setWizardOpen] = React.useState(false);

  const selectedProduct = React.useMemo(() => {
    return data.products.find((product) => product.id === selectedProductId) ?? data.products[0];
  }, [selectedProductId]);

  const filteredProducts = React.useMemo(() => {
    const normalizedQuery = query.toLowerCase();
    return data.products.filter((product) => {
      return !normalizedQuery || `${product.name} ${product.article} ${getCategoryName(product)}`.toLowerCase().includes(normalizedQuery);
    });
  }, [query]);

  const categoryCounts = React.useMemo(() => {
    return data.categories.map((category) => ({
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
      data.restrictions,
      { ...configuration, [attributeId]: optionId },
      { ...selectedProduct.defaultConfiguration, innerCoating: "gold-lacquer" }
    );
    setConfiguration(nextValues);
  }

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-950">
      <SalesSidebar activeSection="products" />

      <main className="flex min-h-screen flex-1 flex-col">
        <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
          <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
            <div>
              <h1 className="text-2xl font-semibold tracking-normal text-slate-950">Каталог товаров</h1>
              <p className="mt-1 text-sm text-slate-500">Конфигуратор продукции</p>
            </div>

            <div className="hidden flex-1 justify-center px-6 xl:flex">
              <div className="flex w-full max-w-2xl items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-2.5 shadow-sm">
                <Search className="h-4 w-4 text-slate-400" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Поиск по товарам, характеристикам..."
                  className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" className="relative hidden rounded-xl lg:inline-flex">
                <Bell className="h-4 w-4" />
                <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-red-500 px-1 text-[10px] font-semibold text-white">12</span>
              </Button>
              <Button variant="outline" size="icon" className="hidden rounded-xl lg:inline-flex">
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
              <Button className="gap-2 rounded-xl px-5" onClick={() => setWizardOpen(true)}>
                <Plus className="h-4 w-4" />
                Создать предложение
              </Button>
            </div>
          </div>
        </header>

        <div className="grid flex-1 gap-4 p-4 sm:p-6 lg:grid-cols-[320px_minmax(0,1fr)_360px] lg:p-6">
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
                        active ? "bg-violet-50 text-violet-700 ring-1 ring-violet-100" : "text-slate-700 hover:bg-slate-50"
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
              <h2 className="text-sm font-semibold text-slate-950">Популярные товары</h2>
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
                        active ? "border-violet-300 bg-violet-50" : "border-slate-200 bg-white hover:bg-slate-50"
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
              <Button variant="subtle" className="mt-4 w-full">Показать все товары</Button>
            </section>
          </aside>

          <section className="min-w-0 rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 p-5">
              <div className="flex items-center gap-5">
                <ProductImage product={selectedProduct} size="lg" />
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-xl font-semibold tracking-normal text-slate-950">{selectedProduct.name}</h2>
                    <Badge variant="emerald">Активен</Badge>
                  </div>
                  <div className="mt-2 text-sm text-slate-500">Артикул: {selectedProduct.article}</div>
                  <div className="mt-2 text-sm text-slate-500">Категория: {getCategoryName(selectedProduct)}</div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="gap-2">
                  <Star className="h-4 w-4" />
                  В избранное
                </Button>
                <Button variant="outline" className="gap-2">
                  <Download className="h-4 w-4" />
                  Экспорт
                </Button>
              </div>
            </div>

            <div className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-base font-semibold text-slate-950">Конфигуратор товара</h3>
                  <p className="mt-1 text-sm text-slate-500">Выберите характеристики товара. Недоступные варианты отображаются серым.</p>
                </div>
                <Button variant="ghost" className="gap-2" onClick={() => setConfiguration(selectedProduct.defaultConfiguration)}>
                  <RefreshCw className="h-4 w-4" />
                  Сбросить все
                </Button>
              </div>

              <div className="mt-5 divide-y divide-slate-200">
                {data.attributes.map((attribute) => (
                  <div key={attribute.id} className="grid gap-3 py-4 md:grid-cols-[240px_minmax(0,1fr)]">
                    <div className="flex items-center gap-3 text-sm font-medium text-slate-800">
                      <span className="grid h-8 w-8 place-items-center rounded-lg bg-slate-50 text-slate-500">
                        <Info className="h-4 w-4" />
                      </span>
                      {attribute.label}
                    </div>

                    {attribute.display === "chips" ? (
                      <div className="flex flex-wrap gap-2">
                        {attribute.options.map((option) => {
                          const compatibility = getOptionCompatibility(data.restrictions, configuration, attribute.id, option.id);
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
                                selected ? "border-violet-400 bg-violet-50 text-violet-700" : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
                                !compatibility.available ? "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400 opacity-70 hover:bg-slate-100" : ""
                              )}
                            >
                              {option.label}
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
                          className="h-11 w-full appearance-none rounded-lg border border-slate-200 bg-white px-4 pr-10 text-sm font-medium text-slate-900 outline-none transition focus:border-violet-300 focus:ring-4 focus:ring-violet-50"
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

              <div className="mt-4 flex items-start gap-3 rounded-xl bg-blue-50 px-4 py-4 text-sm text-blue-900">
                <Info className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
                <div>
                  <div className="font-semibold">Сформированная конфигурация доступна для заказа.</div>
                  <div className="mt-1 text-blue-800">Минимальный тираж: от 5 000 шт.</div>
                </div>
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
                  {data.attributes.map((attribute) => (
                    <div key={attribute.id} className="flex items-center justify-between gap-4 text-sm">
                      <span className="text-slate-500">{attribute.label}</span>
                      <span className="text-right font-semibold text-slate-950">{getAttributeLabel(attribute.id, configuration)}</span>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full gap-2">
                  <Bookmark className="h-4 w-4" />
                  Сохранить конфигурацию
                </Button>
                <Button className="w-full gap-2" onClick={() => setWizardOpen(true)}>
                  Создать предложение с этим товаром
                  <ChevronDown className="h-4 w-4 -rotate-90" />
                </Button>
              </div>
            </section>

            <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <h2 className="text-sm font-semibold text-slate-950">Сохраненные конфигурации ({data.savedConfigurations.length})</h2>
              <div className="mt-4 space-y-2">
                {data.savedConfigurations.map((item) => (
                  <div key={item.id} className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 px-3 py-3">
                    <div>
                      <div className="text-sm font-semibold text-slate-950">{item.title}</div>
                      <div className="mt-1 text-xs text-slate-500">{item.createdAt}</div>
                    </div>
                    <button type="button" className="grid h-8 w-8 place-items-center rounded-lg text-slate-500 hover:bg-slate-50">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <h2 className="text-sm font-semibold text-slate-950">Документация</h2>
              <div className="mt-4 space-y-2">
                {data.documents.map((document) => (
                  <button key={document.id} type="button" className="flex w-full items-center justify-between rounded-lg border border-slate-200 px-3 py-3 text-left text-sm font-medium text-slate-800 hover:bg-slate-50">
                    {document.label}
                    <Download className="h-4 w-4 text-slate-400" />
                  </button>
                ))}
              </div>
            </section>
          </aside>
        </div>
      </main>

      <OfferWizard
        open={wizardOpen}
        product={selectedProduct}
        attributes={data.attributes}
        values={configuration}
        onOpenChange={setWizardOpen}
      />
    </div>
  );
}
