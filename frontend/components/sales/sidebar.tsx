import Link from "next/link";
import type { Route } from "next";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BarChart3, Boxes, FileText, LayoutDashboard, MessageSquareText, Settings, ShieldAlert, Sparkles, Target, Users } from "@/components/icons";
import type { UserRole } from "@/lib/product-types";
import { cn } from "@/lib/utils";

export type SidebarSection =
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

type NavItem = {
  id: SidebarSection;
  label: string;
  icon: typeof LayoutDashboard;
  href: Route;
};

const primaryNavItems: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "/" },
  { id: "sales", label: "Воронка", icon: Target, href: "/funnel" }
];

const secondaryNavItems: NavItem[] = [
  { id: "suppliers", label: "Поставщики", icon: Users, href: "/suppliers" },
  { id: "offers", label: "Предложения", icon: FileText, href: "/funnel" },
  { id: "documents", label: "Документы", icon: FileText, href: "/documents" },
  { id: "analytics", label: "Аналитика", icon: BarChart3, href: "/funnel" },
  { id: "tasks", label: "Задачи", icon: ShieldAlert, href: "/funnel" },
  { id: "messages", label: "Сообщения", icon: MessageSquareText, href: "/funnel" },
  { id: "settings", label: "Настройки", icon: Settings, href: "/settings" }
];

function navClass(active: boolean) {
  return cn(
    "flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition",
    active ? "bg-blue-600 text-white shadow-[0_10px_30px_rgba(37,99,235,0.25)]" : "text-slate-300 hover:bg-white/5 hover:text-white"
  );
}

export function SalesSidebar({ activeSection = "dashboard", role = "Administrator" }: SalesSidebarProps) {
  const productActive = activeSection === "productsCatalog" || activeSection === "productsSettings";

  return (
    <aside className="hidden h-screen w-[286px] shrink-0 border-r border-slate-900/40 bg-slate-950 px-4 py-5 text-white lg:flex lg:flex-col">
      <Link href="/" className="flex items-center gap-3 px-2">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-blue-600 text-sm font-black text-white shadow-sm">
          TC
        </div>
        <div className="min-w-0">
          <div className="truncate text-xl font-semibold tracking-normal">TinCap OS</div>
          <div className="text-xs text-slate-400">Sales Workspace</div>
        </div>
      </Link>

      <Separator className="my-6 bg-white/10" />

      <nav className="space-y-1">
        {primaryNavItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link key={item.id} href={item.href} className={navClass(item.id === activeSection)}>
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
                "block rounded-lg px-3 py-2 text-sm font-medium transition",
                activeSection === "productsCatalog" ? "bg-blue-600 text-white" : "text-slate-400 hover:bg-white/5 hover:text-white"
              )}
            >
              Каталог
            </Link>
            {role === "Administrator" ? (
              <Link
                href="/products/settings"
                className={cn(
                  "block rounded-lg px-3 py-2 text-sm font-medium transition",
                  activeSection === "productsSettings" ? "bg-blue-600 text-white" : "text-slate-400 hover:bg-white/5 hover:text-white"
                )}
              >
                Настройки каталога
              </Link>
            ) : null}
          </div>
        </div>

        {secondaryNavItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link key={item.id} href={item.href} className={navClass(item.id === activeSection)}>
              <Icon className="h-4 w-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-blue-100">
          <Sparkles className="h-4 w-4" />
          AI-помощник
        </div>
        <p className="text-sm leading-6 text-slate-300">У вас 3 просроченные задачи и 2 предложения ждут ответа клиента.</p>
        <button className="mt-4 h-10 w-full rounded-xl bg-white text-sm font-medium text-slate-950 transition hover:bg-slate-100">
          Открыть
        </button>
      </div>

      <Card className="mt-auto border-white/10 bg-white/[0.04] text-white shadow-none">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/10">
              <ShieldAlert className="h-5 w-5 text-blue-200" />
            </div>
            <div className="min-w-0">
              <div className="text-sm font-semibold">Сводка</div>
              <div className="truncate text-xs text-slate-400">1 476 500 ₽ общая сумма</div>
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
