import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, ArrowRight, CheckCircle2, SquarePlus } from "@/components/icons";
import type { WizardData, WizardStepId } from "@/lib/types";
import { cn } from "@/lib/utils";

type WizardPanelProps = {
  open: boolean;
  data: WizardData;
  activeStep: WizardStepId;
  onStepChange: (step: WizardStepId) => void;
  onOpenChange: (open: boolean) => void;
};

export function WizardPanel({ open, data, activeStep, onStepChange, onOpenChange }: WizardPanelProps) {
  const currentIndex = data.steps.findIndex((step) => step.id === activeStep);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[980px] overflow-hidden rounded-none border-l-0 p-0 sm:max-w-[980px] lg:rounded-l-[28px]">
        <DialogHeader className="border-b border-slate-200 px-6 py-5">
          <DialogTitle className="text-xl font-semibold text-slate-950">Новое предложение</DialogTitle>
        </DialogHeader>

        <div className="grid h-[calc(100vh-84px)] grid-cols-1 lg:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="border-b border-slate-200 bg-slate-50 p-5 lg:border-b-0 lg:border-r">
            <div className="space-y-3">
              {data.steps.map((step, index) => {
                const active = step.id === activeStep;
                const done = index < currentIndex;
                return (
                  <button
                    key={step.id}
                    onClick={() => onStepChange(step.id)}
                    className={cn(
                      "flex w-full items-start gap-3 rounded-2xl px-4 py-3 text-left transition",
                      active ? "bg-white shadow-sm ring-1 ring-blue-100" : "hover:bg-white/70"
                    )}
                  >
                    <div
                      className={cn(
                        "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border",
                        done
                          ? "border-emerald-200 bg-emerald-50 text-emerald-600"
                          : active
                            ? "border-blue-200 bg-blue-50 text-blue-600"
                            : "border-slate-200 bg-white text-slate-400"
                      )}
                    >
                      {done ? <CheckCircle2 className="h-4 w-4" /> : <span className="text-xs font-semibold">{step.id}</span>}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-900">{step.label}</div>
                      <div className="mt-1 text-xs leading-5 text-slate-500">{step.description}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </aside>

          <section className="flex min-h-0 flex-col bg-white">
            <div className="flex-1 overflow-y-auto p-6 scrollbar-thin">
              {activeStep === 1 && (
                <div className="space-y-5">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-950">1. Выбор товара</h3>
                    <p className="mt-1 text-sm text-slate-500">
                      Выберите продукт из mock-списка для будущего КП.
                    </p>
                  </div>

                  <div className="grid gap-3 md:grid-cols-3">
                    {data.products.map((product, index) => (
                      <Card key={product.id} className={cn("cursor-pointer transition hover:-translate-y-0.5 hover:shadow-md", index === 0 ? "ring-2 ring-blue-100" : "")}>
                        <CardHeader>
                          <div className="flex items-center justify-between gap-3">
                            <CardTitle className="text-base">{product.title}</CardTitle>
                            <Badge variant="blue">{product.tag}</Badge>
                          </div>
                          <CardDescription>{product.category}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <p className="text-sm leading-6 text-slate-600">{product.note}</p>
                          <Button variant="outline" className="w-full gap-2">
                            <SquarePlus className="h-4 w-4" />
                            Выбрать
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {activeStep === 2 && (
                <div className="space-y-5">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-950">2. Калькулятор</h3>
                    <p className="mt-1 text-sm text-slate-500">
                      Пока это только интерфейс будущего расчёта без формул и API.
                    </p>
                  </div>

                  <div className="grid gap-3 md:grid-cols-3">
                    {data.calculatorRows.map((row) => (
                      <Card key={row.label}>
                        <CardHeader>
                          <CardTitle className="text-base">{row.label}</CardTitle>
                          <CardDescription>{row.helper}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-5 text-center text-lg font-semibold text-slate-400">
                            {row.value}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Поля для будущего расчёта</CardTitle>
                      <CardDescription>
                        Все элементы уже заложены, расчёты подключим позже через FastAPI.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4 md:grid-cols-3">
                      <Input placeholder="Цена за единицу" />
                      <Input placeholder="Валюта" />
                      <Input placeholder="Курс" />
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeStep === 3 && (
                <div className="space-y-5">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-950">3. Реквизиты</h3>
                    <p className="mt-1 text-sm text-slate-500">
                      Подготовка данных клиента и будущего поставщика.
                    </p>
                  </div>

                  <Card>
                    <CardContent className="p-0">
                      <div className="overflow-hidden rounded-2xl border border-slate-200">
                        <table className="w-full text-left text-sm">
                          <thead className="bg-slate-50 text-slate-500">
                            <tr>
                              <th className="px-4 py-3 font-medium">Поле</th>
                              <th className="px-4 py-3 font-medium">Значение</th>
                            </tr>
                          </thead>
                          <tbody>
                            {data.requisites.map((row) => (
                              <tr key={row.label} className="border-t border-slate-200">
                                <td className="px-4 py-3 font-medium text-slate-900">{row.label}</td>
                                <td className="px-4 py-3 text-slate-600">{row.value}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeStep === 4 && (
                <div className="space-y-5">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-950">4. Коммерческое предложение</h3>
                    <p className="mt-1 text-sm text-slate-500">
                      Макет КП в виде готового блока без финального расчёта.
                    </p>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Структура КП</CardTitle>
                      <CardDescription>
                        Место под генерацию PDF и последующую интеграцию FastAPI.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {data.cpRows.map((row) => (
                        <div key={row.label} className="grid gap-2 rounded-2xl border border-slate-200 px-4 py-3 md:grid-cols-[180px_1fr]">
                          <div className="text-sm font-medium text-slate-500">{row.label}</div>
                          <div className="text-sm font-semibold text-slate-900">{row.value}</div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeStep === 5 && (
                <div className="space-y-5">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-950">5. Отправка</h3>
                    <p className="mt-1 text-sm text-slate-500">Каналы отправки и статусы направления.</p>
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    {data.channels.map((channel) => (
                      <Card key={channel.label}>
                        <CardHeader>
                          <CardTitle className="text-base">{channel.label}</CardTitle>
                          <CardDescription>{channel.value}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <Separator />
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-500">Статус</span>
                            <Badge variant="emerald">Подготовка</Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-slate-200 bg-slate-50 px-6 py-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="text-sm text-slate-500">
                  Шаг <span className="font-semibold text-slate-900">{activeStep}</span> из{" "}
                  <span className="font-semibold text-slate-900">{data.steps.length}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    onClick={() => onStepChange(Math.max(1, activeStep - 1) as WizardStepId)}
                    disabled={activeStep === 1}
                    className="gap-2"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Назад
                  </Button>
                  <Button onClick={() => onStepChange(Math.min(data.steps.length, activeStep + 1) as WizardStepId)} className="gap-2">
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
