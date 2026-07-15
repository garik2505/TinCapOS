import { AppShell } from "@/components/layout/app-shell";
import { BarChart3, Boxes, FileText, Target, Users } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const metrics = [
  { label: "Сумма воронки", value: "1 476 500 ₽", icon: Target, tone: "bg-blue-50 text-blue-700" },
  { label: "Клиентов в работе", value: "28", icon: Users, tone: "bg-emerald-50 text-emerald-700" },
  { label: "Предложений", value: "16", icon: FileText, tone: "bg-violet-50 text-violet-700" },
  { label: "Товаров в каталоге", value: "5", icon: Boxes, tone: "bg-amber-50 text-amber-700" }
];

export function DashboardApp() {
  return (
    <AppShell activeSection="dashboard" title="Dashboard" subtitle="Обзор TinCap OS и быстрый доступ к рабочим модулям">
      <div className="space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {metrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <Card key={metric.label}>
                <CardContent className="flex items-center justify-between p-5">
                  <div>
                    <div className="text-sm text-slate-500">{metric.label}</div>
                    <div className="mt-2 text-2xl font-semibold text-slate-950">{metric.value}</div>
                  </div>
                  <div className={`grid h-11 w-11 place-items-center rounded-xl ${metric.tone}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <Card>
            <CardHeader>
              <CardTitle>Рабочее пространство</CardTitle>
              <CardDescription>Dashboard остается стартовой страницей. Новые модули подключаются через общий Application Shell.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 md:grid-cols-3">
                {["Воронка продаж", "Каталог продукции", "Настройки каталога"].map((item) => (
                  <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="text-sm font-semibold text-slate-950">{item}</div>
                    <div className="mt-2 text-sm leading-6 text-slate-500">Единые карточки, кнопки, сетка и навигация.</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Статус системы</CardTitle>
              <CardDescription>Frontend-прототип без backend и базы данных.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
                <span className="text-sm text-slate-600">Application Shell</span>
                <Badge variant="emerald">Единый</Badge>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
                <span className="text-sm text-slate-600">Product Configurator</span>
                <Badge variant="blue">MVP</Badge>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
                <span className="text-sm text-slate-600">FastAPI</span>
                <Badge>Позже</Badge>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </AppShell>
  );
}
