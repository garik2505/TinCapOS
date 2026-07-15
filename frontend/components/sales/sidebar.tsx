import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BarChart3, Boxes, FileText, LayoutDashboard, MessageSquareText, Settings, ShieldAlert, Sparkles, Target, Users } from "@/components/icons";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Воронка", icon: Target, active: true },
  { label: "Каталог товаров", icon: Boxes },
  { label: "Поставщики", icon: Users },
  { label: "Предложения", icon: FileText },
  { label: "Документы", icon: FileText },
  { label: "Аналитика", icon: BarChart3 },
  { label: "Задачи", icon: ShieldAlert },
  { label: "Сообщения", icon: MessageSquareText },
  { label: "Настройки", icon: Settings }
];

export function SalesSidebar() {
  return (
    <aside className="hidden h-screen w-[286px] shrink-0 border-r border-slate-200 bg-slate-950 px-4 py-5 text-white lg:flex lg:flex-col">
      <div className="flex items-center gap-3 px-2">
        <div className="grid h-10 w-10 place-items-center rounded-2xl bg-blue-500/20 text-blue-300 shadow-inner">
          <span className="text-lg font-black">TC</span>
        </div>
        <div>
          <div className="text-xl font-semibold tracking-tight">TinCap OS</div>
          <div className="text-xs text-slate-400">Sales Workspace</div>
        </div>
      </div>

      <Separator className="my-6 bg-white/10" />

      <nav className="space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              className={cn(
                "flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm transition",
                item.active ? "bg-white/10 text-white shadow-[0_10px_30px_rgba(15,23,42,0.25)]" : "text-slate-300 hover:bg-white/5 hover:text-white"
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="mt-6 rounded-3xl border border-white/10 bg-gradient-to-b from-indigo-500/20 to-slate-900 p-4">
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-indigo-100">
          <Sparkles className="h-4 w-4" />
          AI-помощник
        </div>
        <p className="text-sm leading-6 text-slate-300">
          У вас 3 просроченные задачи и 2 предложения ждут ответа клиента.
        </p>
        <Button className="mt-4 w-full bg-white text-slate-950 hover:bg-slate-100">Открыть</Button>
      </div>

      <Card className="mt-auto border-white/10 bg-white/5 text-white shadow-none">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-full bg-white/10">
              <ShieldAlert className="h-5 w-5 text-indigo-200" />
            </div>
            <div>
              <div className="text-sm font-semibold">Сводка</div>
              <div className="text-xs text-slate-400">1 476 500 ₽ общая сумма</div>
            </div>
          </div>
          <Badge variant="blue" className="mt-4">
            Версия 0.1
          </Badge>
        </CardContent>
      </Card>
    </aside>
  );
}
