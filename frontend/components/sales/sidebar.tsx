import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BarChart3, Boxes, FileText, LayoutDashboard, MessageSquareText, Settings, ShieldAlert, Sparkles, Target, Users } from "@/components/icons";
import type { UserRole } from "@/lib/product-types";
import { cn } from "@/lib/utils";

type SidebarSection =
  | "dashboard"
  | "sales"
  | "productsCatalog"
  | "productsSettings"
  | "suppliers"
  | "offers"
  | "documents"
  | "analytics"
  | "tasks"
  | "messages"
  | "settings";

type SalesSidebarProps = {
  activeSection?: SidebarSection;
  role?: UserRole;
};

const navItems: Array<{ id: SidebarSection; label: string; icon: typeof LayoutDashboard; href: "/" | "#" }> = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "/" },
  { id: "sales", label: "Воронка", icon: Target, href: "/" },
  { id: "suppliers", label: "Поставщики", icon: Users, href: "#" },
  { id: "offers", label: "Предложения", icon: FileText, href: "#" },
  { id: "documents", label: "Документы", icon: FileText, href: "#" },
  { id: "analytics", label: "Аналитика", icon: BarChart3, href: "#" },
  { id: "tasks", label: "Задачи", icon: ShieldAlert, href: "#" },
  { id: "messages", label: "Сообщения", icon: MessageSquareText, href: "#" },
  { id: "settings", label: "Настройки", icon: Settings, href: "#" }
];

function navClass(active: boolean) {
  return cn(
    "flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm transition",
    active ? "bg-violet-600 text-white shadow-[0_10px_30px_rgba(124,58,237,0.25)]" : "text-slate-300 hover:bg-white/5 hover:text-white"
  );
}

export function SalesSidebar({ activeSection = "sales", role = "Administrator" }: SalesSidebarProps) {
  const productActive = activeSection === "productsCatalog" || activeSection === "productsSettings";

  return (
    <aside className="hidden h-screen w-[286px] shrink-0 border-r border-slate-200 bg-slate-950 px-4 py-5 text-white lg:flex lg:flex-col">
      <div className="flex items-center gap-3 px-2">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-blue-500/20 text-blue-300 shadow-inner">
          <span className="text-lg font-black">TC</span>
        </div>
        <div>
          <div className="text-xl font-semibold tracking-normal">TinCap OS</div>
          <div className="text-xs text-slate-400">Sales Workspace</div>
        </div>
      </div>

      <Separator className="my-6 bg-white/10" />

      <nav className="space-y-1">
        {navItems.slice(0, 2).map((item) => {
          const Icon = item.icon;
          const active = item.id === activeSection;
          return (
            <Link key={item.id} href={item.href} className={navClass(active)}>
              <Icon className="h-4 w-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}

        <div className={cn("rounded-xl px-3 py-3", productActive ? "bg-white/5" : "")}>
          <div className="mb-2 flex items-center gap-3 px-1 text-sm font-medium text-slate-300">
            <Boxes className="h-4 w-4" />
            Продукция
          </div>
          <div className="space-y-1 pl-7">
            <Link
              href="/products"
              className={cn(
                "block rounded-lg px-3 py-2 text-sm transition",
                activeSection === "productsCatalog" ? "bg-violet-600 text-white" : "text-slate-400 hover:bg-white/5 hover:text-white"
              )}
            >
              Каталог
            </Link>
            {role === "Administrator" ? (
              <Link
                href="/products/settings"
                className={cn(
                  "block rounded-lg px-3 py-2 text-sm transition",
                  activeSection === "productsSettings" ? "bg-violet-600 text-white" : "text-slate-400 hover:bg-white/5 hover:text-white"
                )}
              >
                Настройки каталога
              </Link>
            ) : null}
          </div>
        </div>

        {navItems.slice(2).map((item) => {
          const Icon = item.icon;
          const active = item.id === activeSection;
          if (item.href === "#") {
            return (
              <button key={item.id} className={navClass(active)}>
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </button>
            );
          }
          return null;
        })}
      </nav>

      <div className="mt-6 rounded-2xl border border-white/10 bg-gradient-to-b from-indigo-500/20 to-slate-900 p-4">
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
