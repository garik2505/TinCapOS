import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown, Plus } from "@/components/icons";
import { cn } from "@/lib/utils";
import type { ClientCard, SalesStage, SalesStageId } from "@/lib/types";

type KanbanBoardProps = {
  stages: SalesStage[];
  clients: ClientCard[];
  selectedClientId: string;
  draggingClientId: string | null;
  query: string;
  managerFilter: string;
  productFilter: string;
  onCardClick: (clientId: string) => void;
  onDragStart: (clientId: string) => void;
  onDropOnStage: (stageId: SalesStageId) => void;
  onDragOverStage: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragEnd: () => void;
};

const toneMap: Record<SalesStage["tone"], string> = {
  blue: "from-blue-500 to-blue-400",
  amber: "from-amber-500 to-amber-400",
  violet: "from-violet-500 to-violet-400",
  emerald: "from-emerald-500 to-emerald-400",
  orange: "from-orange-500 to-orange-400",
  green: "from-green-500 to-green-400"
};

export function KanbanBoard({
  stages,
  clients,
  selectedClientId,
  draggingClientId,
  query,
  managerFilter,
  productFilter,
  onCardClick,
  onDragStart,
  onDropOnStage,
  onDragOverStage,
  onDragEnd
}: KanbanBoardProps) {
  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <select className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 shadow-sm outline-none">
          <option>Все менеджеры</option>
          <option>Гарик</option>
          <option>Анна</option>
        </select>
        <select className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 shadow-sm outline-none">
          <option>Все продукты</option>
          <option>Металлическая тара</option>
          <option>Жестяная тара</option>
          <option>Листы</option>
        </select>
        <Button variant="outline" className="gap-2">
          <ChevronDown className="h-4 w-4" />
          Фильтры
        </Button>
      </div>

      <div className="grid gap-4 xl:grid-cols-6">
        {stages.map((stage) => {
          const stageClients = clients.filter((client) => client.stageId === stage.id);
          const visibleClients = stageClients.filter((client) => {
            const text = `${client.name} ${client.company} ${client.summary} ${client.product}`.toLowerCase();
            const matchesQuery = !query || text.includes(query.toLowerCase());
            const matchesManager = !managerFilter || managerFilter === "all" || client.manager === managerFilter;
            const matchesProduct = !productFilter || productFilter === "all" || client.product.includes(productFilter);
            return matchesQuery && matchesManager && matchesProduct;
          });

          const stageValue = visibleClients.reduce((sum, client) => sum + Number(client.amount.replace(/[^\d]/g, "")), 0);

          return (
            <Card
              key={stage.id}
              className={cn("border-slate-200/80 bg-white/90 backdrop-blur", draggingClientId ? "ring-1 ring-blue-100" : "")}
              onDragOver={onDragOverStage}
              onDrop={(event) => {
                event.preventDefault();
                onDropOnStage(stage.id);
              }}
            >
              <CardContent className="space-y-4 p-4">
                <div className={cn("h-1 rounded-full bg-gradient-to-r", toneMap[stage.tone])} />
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="text-sm font-semibold uppercase tracking-wide text-slate-900">
                      {stage.title}
                    </div>
                    <div className="mt-1 text-xs text-slate-500">
                      {new Intl.NumberFormat("ru-RU").format(stageValue)} ₽ · {visibleClients.length}
                    </div>
                  </div>
                  <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-3">
                  {visibleClients.map((client) => {
                    const selected = client.id === selectedClientId;
                    return (
                      <button
                        key={client.id}
                        draggable
                        onDragStart={() => onDragStart(client.id)}
                        onDragEnd={onDragEnd}
                        onClick={() => onCardClick(client.id)}
                        className={cn(
                          "w-full rounded-2xl border bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md",
                          selected ? "border-blue-400 ring-2 ring-blue-100" : "border-slate-200",
                          draggingClientId === client.id ? "opacity-50" : ""
                        )}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="text-sm font-semibold text-slate-900">{client.name}</div>
                            <div className="text-xs text-slate-500">
                              {client.manager} · {client.date}
                            </div>
                          </div>
                          <Badge variant={stage.tone}>{client.amount}</Badge>
                        </div>
                        <div className="mt-3 text-sm text-slate-600">{client.summary}</div>
                        <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
                          <span>{client.product}</span>
                          <span className="rounded-full bg-slate-100 px-2.5 py-1 font-medium text-slate-700">Drag</span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <button className="w-full rounded-xl border border-dashed border-slate-200 py-2 text-sm text-blue-600 transition hover:border-blue-300 hover:bg-blue-50">
                  + Добавить клиента
                </button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
