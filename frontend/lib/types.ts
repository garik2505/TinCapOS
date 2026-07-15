export type SalesStageId =
  | "new"
  | "request-china"
  | "calculation"
  | "quote-sent"
  | "negotiation"
  | "order";

export type SalesStage = {
  id: SalesStageId;
  title: string;
  tone: "blue" | "amber" | "violet" | "emerald" | "orange" | "green";
};

export type ClientCard = {
  id: string;
  name: string;
  company: string;
  manager: string;
  date: string;
  amount: string;
  product: string;
  stageId: SalesStageId;
  summary: string;
  initials: string;
};

export type ProposalRow = {
  id: string;
  title: string;
  status: string;
  date: string;
  amount: string;
};

export type ContactRow = {
  name: string;
  role: string;
  phone: string;
  email: string;
};

export type TimelineEvent = {
  date: string;
  time: string;
  title: string;
  description: string;
};

export type TaskRow = {
  title: string;
  due: string;
  status: string;
};

export type CommentRow = {
  author: string;
  time: string;
  text: string;
};

export type DocumentRow = {
  title: string;
  type: string;
  status: string;
  updatedAt: string;
};

export type WorkspaceClient = {
  id: string;
  name: string;
  company: string;
  avatar: string;
  stageId: SalesStageId;
  stageLabel: string;
  status: string;
  proposalsCount: number;
  totalAmount: string;
  overview: {
    details: Array<{ label: string; value: string }>;
    metrics: Array<{ label: string; value: string; tone: string }>;
  };
  proposals: ProposalRow[];
  documents: DocumentRow[];
  contacts: ContactRow[];
  history: TimelineEvent[];
  tasks: TaskRow[];
  comments: CommentRow[];
};

export type WizardStepId = 1 | 2 | 3 | 4 | 5;

export type WizardProduct = {
  id: string;
  title: string;
  category: string;
  tag: string;
  note: string;
};

export type WizardData = {
  steps: Array<{ id: WizardStepId; label: string; description: string }>;
  products: WizardProduct[];
  calculatorRows: Array<{ label: string; value: string; helper: string }>;
  requisites: Array<{ label: string; value: string }>;
  cpRows: Array<{ label: string; value: string }>;
  channels: Array<{ label: string; value: string }>;
};

export type SalesWorkspaceData = {
  stages: SalesStage[];
  clients: ClientCard[];
  workspaces: Record<string, WorkspaceClient>;
  wizard: WizardData;
};
