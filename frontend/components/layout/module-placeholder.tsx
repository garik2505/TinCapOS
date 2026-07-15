import { AppShell } from "@/components/layout/app-shell";
import type { SidebarSection } from "@/components/sales/sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type ModulePlaceholderProps = {
  activeSection: SidebarSection;
  title: string;
  subtitle: string;
};

export function ModulePlaceholder({ activeSection, title, subtitle }: ModulePlaceholderProps) {
  return (
    <AppShell activeSection={activeSection} title={title} subtitle={subtitle}>
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        <Card className="max-w-3xl">
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{subtitle}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-8 text-sm leading-6 text-slate-500">
              Раздел подключен к общему Application Shell. Бизнес-логика будет добавлена отдельной задачей, чтобы не смешивать архитектуру и продуктовые сценарии.
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
