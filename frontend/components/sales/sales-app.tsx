"use client";

import { useMemo, useState } from "react";

import { AppShell } from "@/components/layout/app-shell";
import { LayoutDashboard, Plus } from "@/components/icons";
import { KanbanBoard } from "@/components/sales/kanban-board";
import { WizardPanel } from "@/components/sales/wizard-panel";
import { WorkspacePanel } from "@/components/sales/workspace-panel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { salesWorkspaceData } from "@/lib/mock-data";
import type { SalesStageId, WizardStepId } from "@/lib/types";

const initialClientId = salesWorkspaceData.clients[0]?.id ?? "";

export function SalesApp() {
  const [clients, setClients] = useState(salesWorkspaceData.clients);
  const [selectedClientId, setSelectedClientId] = useState(initialClientId);
  const [query, setQuery] = useState("");
  const [managerFilter, setManagerFilter] = useState("all");
  const [productFilter, setProductFilter] = useState("all");
  const [draggingClientId, setDraggingClientId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("Обзор");
  const [wizardOpen, setWizardOpen] = useState(false);
  const [activeStep, setActiveStep] = useState<WizardStepId>(1);

  const selectedWorkspace = useMemo(() => {
    return salesWorkspaceData.workspaces[selectedClientId] ?? salesWorkspaceData.workspaces.ecoaero;
  }, [selectedClientId]);

  const visibleClients = useMemo(() => {
    return clients.filter((client) => {
      const text = `${client.name} ${client.company} ${client.summary} ${client.product}`.toLowerCase();
      const matchesQuery = !query || text.includes(query.toLowerCase());
      const matchesManager = managerFilter === "all" || client.manager === managerFilter;
      const matchesProduct = productFilter === "all" || client.product.includes(productFilter);
      return matchesQuery && matchesManager && matchesProduct;
    });
  }, [clients, managerFilter, productFilter, query]);

  const stageTotals = useMemo(() => {
    return salesWorkspaceData.stages.map((stage) => {
      const stageClients = visibleClients.filter((client) => client.stageId === stage.id);
      return {
        id: stage.id,
        value: stageClients.reduce((sum, client) => sum + Number(client.amount.replace(/[^\d]/g, "")), 0),
        count: stageClients.length
      };
    });
  }, [visibleClients]);

  function moveClientToStage(clientId: string, stageId: SalesStageId) {
    setClients((current) => current.map((client) => (client.id === clientId ? { ...client, stageId } : client)));
  }

  return (
    <AppShell
      activeSection="sales"
      title="Воронка продаж"
      subtitle="Kanban, workspace и wizard в одном интерфейсе"
      searchValue={query}
      onSearchChange={setQuery}
      searchPlaceholder="Поиск по клиентам, предложениям, товарам..."
      actions={
        <Button className="gap-2 rounded-xl px-4">
          <Plus className="h-4 w-4" />
          Новый клиент
        </Button>
      }
    >
      <div className="space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        <section className="grid gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Поиск по клиентам, предложениям, товарам..."
              className="max-w-[360px] xl:hidden"
            />
            <select
              value={managerFilter}
              onChange={(event) => setManagerFilter(event.target.value)}
              className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 shadow-sm outline-none"
            >
              <option value="all">Все менеджеры</option>
              <option value="Гарик">Гарик</option>
              <option value="Анна">Анна</option>
            </select>
            <select
              value={productFilter}
              onChange={(event) => setProductFilter(event.target.value)}
              className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 shadow-sm outline-none"
            >
              <option value="all">Все продукты</option>
              <option value="Металлическая тара">Металлическая тара</option>
              <option value="Жестяная тара">Жестяная тара</option>
              <option value="Лист">Листы</option>
            </select>
            <Button variant="outline" className="gap-2 rounded-xl">
              <LayoutDashboard className="h-4 w-4" />
              Настроить этапы
            </Button>
          </div>

          <KanbanBoard
            stages={salesWorkspaceData.stages}
            clients={clients}
            selectedClientId={selectedClientId}
            draggingClientId={draggingClientId}
            query={query}
            managerFilter={managerFilter}
            productFilter={productFilter}
            onCardClick={(clientId) => setSelectedClientId(clientId)}
            onDragStart={(clientId) => setDraggingClientId(clientId)}
            onDropOnStage={(stageId) => {
              if (draggingClientId) {
                moveClientToStage(draggingClientId, stageId);
                setSelectedClientId(draggingClientId);
              }
              setDraggingClientId(null);
            }}
            onDragOverStage={(event) => event.preventDefault()}
            onDragEnd={() => setDraggingClientId(null)}
          />
        </section>

        <section className="grid gap-6 xl:grid-cols-[minmax(0,1.55fr)_minmax(0,0.95fr)]">
          <div className="min-w-0">
            <WorkspacePanel
              client={selectedWorkspace}
              activeTab={activeTab}
              onTabChange={setActiveTab}
              onOpenWizard={() => {
                setActiveStep(1);
                setWizardOpen(true);
              }}
            />
          </div>

          <div className="grid gap-4">
            <Card className="border-slate-200/80 bg-white/95">
              <CardContent className="flex items-center justify-between p-5">
                <div>
                  <div className="text-lg font-semibold text-slate-950">Быстрый доступ</div>
                  <div className="mt-1 text-sm text-slate-500">Готово к будущему подключению FastAPI</div>
                </div>
                <Badge variant="blue">Mock JSON</Badge>
              </CardContent>
            </Card>

            <Card className="border-slate-200/80 bg-white/95">
              <CardContent className="space-y-4 p-5">
                <div className="text-lg font-semibold text-slate-950">Сводка по воронке</div>
                <div className="space-y-3">
                  {salesWorkspaceData.stages.map((stage, index) => {
                    const total = stageTotals[index];
                    return (
                      <div key={stage.id} className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                        <div>
                          <div className="text-sm font-medium text-slate-900">{stage.title}</div>
                          <div className="text-xs text-slate-500">{total.count} клиентов</div>
                        </div>
                        <div className="text-sm font-semibold text-slate-900">{new Intl.NumberFormat("ru-RU").format(total.value)} ₽</div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>

      <WizardPanel
        open={wizardOpen}
        data={salesWorkspaceData.wizard}
        activeStep={activeStep}
        onStepChange={setActiveStep}
        onOpenChange={setWizardOpen}
      />
    </AppShell>
  );
}
