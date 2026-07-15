"use client";

import type { ReactNode } from "react";

import { Bell, Search, Sparkles } from "@/components/icons";
import { SalesSidebar, type SidebarSection } from "@/components/sales/sidebar";
import { Button } from "@/components/ui/button";

type AppShellProps = {
  activeSection: SidebarSection;
  title: string;
  subtitle?: string;
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  actions?: ReactNode;
  children: ReactNode;
};

export function AppShell({
  activeSection,
  title,
  subtitle,
  searchPlaceholder = "Поиск по TinCap OS...",
  searchValue = "",
  onSearchChange,
  actions,
  children
}: AppShellProps) {
  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-950">
      <SalesSidebar activeSection={activeSection} role="Administrator" />

      <main className="flex min-h-screen min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
          <div className="flex flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
            <div className="flex min-w-0 items-center gap-4">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-blue-600 text-sm font-black text-white shadow-sm lg:hidden">
                TC
              </div>
              <div className="min-w-0">
                <h1 className="truncate text-2xl font-semibold tracking-tight text-slate-950">{title}</h1>
                {subtitle ? <p className="mt-1 truncate text-sm text-slate-500">{subtitle}</p> : null}
              </div>
            </div>

            <div className="flex min-w-0 flex-1 flex-col gap-3 lg:max-w-3xl lg:flex-row lg:items-center lg:justify-end">
              <div className="flex w-full items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-2.5 shadow-sm lg:max-w-xl">
                <Search className="h-4 w-4 text-slate-400" />
                {onSearchChange ? (
                  <input
                    value={searchValue}
                    onChange={(event) => onSearchChange(event.target.value)}
                    placeholder={searchPlaceholder}
                    className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
                  />
                ) : (
                  <input
                    defaultValue={searchValue}
                    placeholder={searchPlaceholder}
                    className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
                  />
                )}
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <Button variant="outline" size="icon" className="hidden rounded-xl lg:inline-flex" aria-label="AI">
                  <Sparkles className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="relative hidden rounded-xl lg:inline-flex" aria-label="Уведомления">
                  <Bell className="h-4 w-4" />
                  <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-red-500 px-1 text-[10px] font-semibold text-white">
                    12
                  </span>
                </Button>
                {actions}
              </div>
            </div>
          </div>
        </header>

        <div className="min-h-0 flex-1">{children}</div>
      </main>
    </div>
  );
}
