"use client";

import * as React from "react";

import { ArrowLeft, ArrowRight, CheckCircle2 } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ProductImage } from "@/components/products/product-image";
import type { ProductAttribute, ProductBase } from "@/lib/product-types";
import { cn } from "@/lib/utils";

type OfferWizardProps = {
  open: boolean;
  product: ProductBase;
  attributes: ProductAttribute[];
  values: Record<string, string>;
  onOpenChange: (open: boolean) => void;
};

const steps = [
  "Выбор товаров",
  "Выбор клиента",
  "Калькулятор",
  "Реквизиты",
  "Коммерческое предложение",
  "Отправка"
];

export function OfferWizard({ open, product, attributes, values, onOpenChange }: OfferWizardProps) {
  const [step, setStep] = React.useState(1);

  React.useEffect(() => {
    if (open) {
      setStep(1);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[920px] overflow-hidden rounded-l-2xl p-0 sm:max-w-[920px]">
        <DialogHeader className="border-b border-slate-200 px-6 py-5">
          <DialogTitle>Создать предложение</DialogTitle>
        </DialogHeader>

        <div className="grid h-[calc(100vh-84px)] grid-cols-1 lg:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="border-b border-slate-200 bg-slate-50 p-5 lg:border-b-0 lg:border-r">
            <div className="space-y-2">
              {steps.map((label, index) => {
                const number = index + 1;
                const active = number === step;
                const done = number < step;

                return (
                  <button
                    key={label}
                    type="button"
                    onClick={() => setStep(number)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm transition",
                      active ? "bg-white text-slate-950 shadow-sm ring-1 ring-violet-100" : "text-slate-600 hover:bg-white"
                    )}
                  >
                    <span className={cn("grid h-8 w-8 place-items-center rounded-full border text-xs font-semibold", active ? "border-violet-200 bg-violet-50 text-violet-700" : "border-slate-200 bg-white")}>
                      {done ? <CheckCircle2 className="h-4 w-4 text-emerald-600" /> : number}
                    </span>
                    {label}
                  </button>
                );
              })}
            </div>
          </aside>

          <section className="flex min-h-0 flex-col">
            <div className="flex-1 overflow-y-auto p-6">
              {step === 1 ? (
                <div className="space-y-5">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-950">Выбранный товар</h3>
                    <p className="mt-1 text-sm text-slate-500">Текущая конфигурация уже добавлена в предложение.</p>
                  </div>
                  <div className="flex gap-5 rounded-xl border border-slate-200 p-4">
                    <ProductImage product={product} size="md" />
                    <div className="min-w-0 flex-1">
                      <div className="text-base font-semibold text-slate-950">{product.name}</div>
                      <div className="mt-1 text-sm text-slate-500">Артикул: {product.article}</div>
                      <div className="mt-4 grid gap-2 sm:grid-cols-2">
                        {attributes.map((attribute) => {
                          const option = attribute.options.find((item) => item.id === values[attribute.id]);
                          return (
                            <div key={attribute.id} className="rounded-lg bg-slate-50 px-3 py-2">
                              <div className="text-xs text-slate-500">{attribute.label}</div>
                              <div className="text-sm font-medium text-slate-900">{option?.label ?? "Не выбрано"}</div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid h-full place-items-center rounded-xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center">
                  <div>
                    <div className="text-lg font-semibold text-slate-950">{steps[step - 1]}</div>
                    <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                      Пока здесь только интерфейс шага. Логика, API и документы подключим на следующих задачах.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-slate-200 bg-slate-50 px-6 py-4">
              <div className="flex items-center justify-between gap-3">
                <div className="text-sm text-slate-500">
                  Шаг <span className="font-semibold text-slate-900">{step}</span> из <span className="font-semibold text-slate-900">{steps.length}</span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" disabled={step === 1} onClick={() => setStep((current) => Math.max(1, current - 1))}>
                    <ArrowLeft className="h-4 w-4" />
                    Назад
                  </Button>
                  <Button onClick={() => setStep((current) => Math.min(steps.length, current + 1))}>
                    Далее
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
}
