import * as React from "react";

import { cn } from "@/lib/utils";

type TabsContextValue = {
  value: string;
  onValueChange: (value: string) => void;
};

const TabsContext = React.createContext<TabsContextValue | null>(null);

function Tabs({ value, onValueChange, children }: { value: string; onValueChange: (value: string) => void; children: React.ReactNode }) {
  return <TabsContext.Provider value={{ value, onValueChange }}>{children}</TabsContext.Provider>;
}

function TabsList({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("inline-flex h-12 items-center justify-start gap-1 rounded-2xl border border-slate-200 bg-slate-50 p-1 text-slate-500", className)} {...props} />;
}

function TabsTrigger({ className, children, value, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { value: string }) {
  const context = React.useContext(TabsContext);
  const active = context?.value === value;

  return (
    <button
      type="button"
      onClick={() => context?.onValueChange(value)}
      className={cn("inline-flex items-center justify-center whitespace-nowrap rounded-xl px-4 py-2 text-sm font-medium text-slate-500 transition-all", active ? "bg-white text-slate-950 shadow-sm" : "", className)}
      {...props}
    >
      {children}
    </button>
  );
}

function TabsContent({ className, children, value }: React.HTMLAttributes<HTMLDivElement> & { value: string }) {
  const context = React.useContext(TabsContext);
  if (context?.value !== value) {
    return null;
  }
  return <div className={cn("mt-5 outline-none", className)}>{children}</div>;
}

export { Tabs, TabsContent, TabsList, TabsTrigger };
