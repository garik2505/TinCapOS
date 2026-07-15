import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, Clock3, FileText, MoreHorizontal, Plus, UserCircle2 } from "@/components/icons";
import type { WorkspaceClient } from "@/lib/types";

type WorkspacePanelProps = {
  client: WorkspaceClient;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onOpenWizard: () => void;
};

const tabs = ["Обзор", "Предложения", "Документы", "Контакты", "История", "Задачи", "Комментарии"];

export function WorkspacePanel({ client, activeTab, onTabChange, onOpenWizard }: WorkspacePanelProps) {
  return (
    <Card className="border-slate-200/80 bg-white/95 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
      <CardContent className="p-0">
        <div className="border-b border-slate-200 px-6 py-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <Avatar className="h-14 w-14">
                <AvatarFallback className="bg-gradient-to-br from-blue-600 to-indigo-500 text-white">
                  {client.avatar}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-semibold tracking-tight text-slate-900">{client.name}</h2>
                  <Badge variant="emerald">{client.status}</Badge>
                </div>
                <div className="mt-1 text-sm text-slate-500">
                  {client.company} · {client.stageLabel}
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-slate-600">
                  <span>{client.proposalsCount} предложения</span>
                  <span>•</span>
                  <span>{client.totalAmount}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" className="h-11 w-11 rounded-xl">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
              <Button size="lg" className="gap-2 px-5" onClick={onOpenWizard}>
                <Plus className="h-4 w-4" />
                Новое предложение
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="px-6 pb-6 pt-5">
          <Tabs value={activeTab} onValueChange={onTabChange}>
            <TabsList className="h-auto flex-wrap">
              {tabs.map((tab) => (
                <TabsTrigger key={tab} value={tab} className="h-10 px-4">
                  {tab}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="Обзор">
              <div className="grid gap-4 xl:grid-cols-[1.2fr_1fr_1.05fr]">
                <Card>
                  <CardHeader>
                    <CardTitle>Информация о клиенте</CardTitle>
                    <CardDescription>Ключевые реквизиты и описание</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <dl className="grid grid-cols-1 gap-3">
                      {client.overview.details.map((item) => (
                        <div key={item.label} className="grid grid-cols-[140px_1fr] gap-4 rounded-xl bg-slate-50 px-4 py-3">
                          <dt className="text-sm text-slate-500">{item.label}</dt>
                          <dd className="text-sm font-medium text-slate-900">{item.value}</dd>
                        </div>
                      ))}
                    </dl>
                    <div className="grid gap-3 sm:grid-cols-3">
                      {client.overview.metrics.map((metric) => (
                        <div key={metric.label} className="rounded-2xl border border-slate-200 px-4 py-3">
                          <div className="text-xs text-slate-500">{metric.label}</div>
                          <div className="mt-2 text-lg font-semibold text-slate-950">{metric.value}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>История активности</CardTitle>
                    <CardDescription>Краткая временная шкала</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {client.history.map((event, index) => (
                      <div key={`${event.title}-${index}`} className="flex gap-3">
                        <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                          <Clock3 className="h-4 w-4" />
                        </div>
                        <div className="space-y-1">
                          <div className="text-xs text-slate-400">
                            {event.date} · {event.time}
                          </div>
                          <div className="text-sm font-medium text-slate-900">{event.title}</div>
                          <div className="text-sm text-slate-600">{event.description}</div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Предложения клиента</CardTitle>
                    <CardDescription>Доступные КП и расчёты</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {client.proposals.map((proposal) => (
                      <div key={proposal.id} className="rounded-2xl border border-slate-200 p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="text-sm font-semibold text-blue-700">{proposal.id}</div>
                            <div className="mt-1 text-sm font-medium text-slate-900">{proposal.title}</div>
                            <div className="mt-1 text-xs text-slate-500">{proposal.date}</div>
                          </div>
                          <Badge variant={proposal.status.includes("отправ") ? "blue" : "amber"}>{proposal.status}</Badge>
                        </div>
                        <div className="mt-4 flex items-center justify-between text-sm">
                          <span className="text-slate-500">Сумма</span>
                          <span className="font-semibold text-slate-900">{proposal.amount}</span>
                        </div>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full gap-2">
                      Все предложения
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="Предложения">
              <Card>
                <CardHeader>
                  <CardTitle>Предложения</CardTitle>
                  <CardDescription>Табличный список КП без API</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-hidden rounded-2xl border border-slate-200">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-slate-50 text-slate-500">
                        <tr>
                          <th className="px-4 py-3 font-medium">№</th>
                          <th className="px-4 py-3 font-medium">Название</th>
                          <th className="px-4 py-3 font-medium">Статус</th>
                          <th className="px-4 py-3 font-medium">Дата</th>
                          <th className="px-4 py-3 font-medium">Сумма</th>
                        </tr>
                      </thead>
                      <tbody>
                        {client.proposals.map((row) => (
                          <tr key={row.id} className="border-t border-slate-200">
                            <td className="px-4 py-3 font-medium text-slate-900">{row.id}</td>
                            <td className="px-4 py-3 text-slate-700">{row.title}</td>
                            <td className="px-4 py-3 text-slate-700">{row.status}</td>
                            <td className="px-4 py-3 text-slate-700">{row.date}</td>
                            <td className="px-4 py-3 font-semibold text-slate-900">{row.amount}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="Документы">
              <div className="grid gap-4 xl:grid-cols-[1.3fr_1fr]">
                <Card>
                  <CardHeader>
                    <CardTitle>Документы</CardTitle>
                    <CardDescription>Входящие и исходящие файлы</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-hidden rounded-2xl border border-slate-200">
                      <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 text-slate-500">
                          <tr>
                            <th className="px-4 py-3 font-medium">Название</th>
                            <th className="px-4 py-3 font-medium">Тип</th>
                            <th className="px-4 py-3 font-medium">Статус</th>
                            <th className="px-4 py-3 font-medium">Обновлён</th>
                          </tr>
                        </thead>
                        <tbody>
                          {client.documents.map((doc) => (
                            <tr key={doc.title} className="border-t border-slate-200">
                              <td className="px-4 py-3 font-medium text-slate-900">{doc.title}</td>
                              <td className="px-4 py-3 text-slate-700">{doc.type}</td>
                              <td className="px-4 py-3 text-slate-700">{doc.status}</td>
                              <td className="px-4 py-3 text-slate-700">{doc.updatedAt}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Быстрые действия</CardTitle>
                    <CardDescription>Место под будущую интеграцию FastAPI</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <FileText className="h-4 w-4" />
                      Создать КП
                    </Button>
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <FileText className="h-4 w-4" />
                      Скачать комплект
                    </Button>
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <FileText className="h-4 w-4" />
                      Отправить клиенту
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="Контакты">
              <Card>
                <CardHeader>
                  <CardTitle>Контакты</CardTitle>
                  <CardDescription>Основные лица для коммуникации</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {client.contacts.map((contact) => (
                      <div key={contact.email} className="rounded-2xl border border-slate-200 p-4">
                        <div className="flex items-center gap-3">
                          <div className="grid h-10 w-10 place-items-center rounded-full bg-slate-100 text-slate-700">
                            <UserCircle2 className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="font-semibold text-slate-900">{contact.name}</div>
                            <div className="text-sm text-slate-500">{contact.role}</div>
                          </div>
                        </div>
                        <div className="mt-4 space-y-2 text-sm text-slate-600">
                          <div>{contact.phone}</div>
                          <div>{contact.email}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="История">
              <Card>
                <CardHeader>
                  <CardTitle>История</CardTitle>
                  <CardDescription>Полная хронология действий</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {client.history.map((event) => (
                    <div key={`${event.date}-${event.time}`} className="flex gap-4 rounded-2xl border border-slate-200 p-4">
                      <div className="w-24 shrink-0 text-xs text-slate-400">
                        <div>{event.date}</div>
                        <div>{event.time}</div>
                      </div>
                      <div className="space-y-1">
                        <div className="font-semibold text-slate-900">{event.title}</div>
                        <div className="text-sm text-slate-600">{event.description}</div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="Задачи">
              <Card>
                <CardHeader>
                  <CardTitle>Задачи</CardTitle>
                  <CardDescription>План работы для клиента</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {client.tasks.map((task) => (
                    <div key={task.title} className="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3">
                      <div>
                        <div className="font-medium text-slate-900">{task.title}</div>
                        <div className="text-sm text-slate-500">{task.status}</div>
                      </div>
                      <div className="text-sm text-slate-600">{task.due}</div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="Комментарии">
              <Card>
                <CardHeader>
                  <CardTitle>Комментарии</CardTitle>
                  <CardDescription>Внутренние заметки по клиенту</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {client.comments.map((comment) => (
                    <div key={`${comment.time}-${comment.author}`} className="rounded-2xl border border-slate-200 p-4">
                      <div className="flex items-center justify-between text-sm">
                        <div className="font-semibold text-slate-900">{comment.author}</div>
                        <div className="text-slate-500">{comment.time}</div>
                      </div>
                      <div className="mt-3 text-sm leading-6 text-slate-700">{comment.text}</div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  );
}
