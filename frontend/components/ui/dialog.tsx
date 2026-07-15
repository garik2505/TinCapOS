import * as React from "react";

import { X } from "@/components/icons";
import { cn } from "@/lib/utils";

type DialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
};

const DialogContext = React.createContext<{ onOpenChange: (open: boolean) => void } | null>(null);

function Dialog({ open, onOpenChange, children }: DialogProps) {
  if (!open) {
    return null;
  }

  return (
    <DialogContext.Provider value={{ onOpenChange }}>
      <div className="fixed inset-0 z-50">
        <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-[2px]" onClick={() => onOpenChange(false)} />
        {children}
      </div>
    </DialogContext.Provider>
  );
}

function DialogTrigger({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

function DialogPortal({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

function DialogClose({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const context = React.useContext(DialogContext);
  return (
    <button
      type="button"
      onClick={() => context?.onOpenChange(false)}
      className={cn("absolute right-4 top-4 rounded-full border border-slate-200 bg-white p-2 text-slate-500 shadow-sm transition hover:bg-slate-50", className)}
      {...props}
    >
      <X className="h-4 w-4" />
    </button>
  );
}

const DialogOverlay = ({ className }: { className?: string }) => <div className={cn("fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-[2px]", className)} />;

const DialogContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { noClose?: boolean }>(({ className, children, noClose = false, ...props }, ref) => {
  return (
    <DialogPortal>
      <div className="fixed inset-0 z-50" aria-hidden="true" />
      <div
        ref={ref}
        className={cn("fixed right-0 top-0 z-50 h-full w-full max-w-[560px] border-l border-slate-200 bg-white shadow-2xl outline-none sm:max-w-[620px]", className)}
        {...props}
      >
        {!noClose ? <DialogClose /> : null}
        {children}
      </div>
    </DialogPortal>
  );
});
DialogContent.displayName = "DialogContent";

const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)} {...props} />
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)} {...props} />
);
DialogFooter.displayName = "DialogFooter";

const DialogDescription = ({ children, className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn("text-sm text-slate-500", className)} {...props}>
    {children}
  </p>
);
DialogDescription.displayName = "DialogDescription";

const DialogTitle = ({ children, className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h2 className={cn("text-lg font-semibold text-slate-950", className)} {...props}>
    {children}
  </h2>
);
DialogTitle.displayName = "DialogTitle";

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger
};
