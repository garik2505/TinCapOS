import * as React from "react";

import { cn } from "@/lib/utils";

type ButtonVariant = "default" | "secondary" | "ghost" | "outline" | "subtle";
type ButtonSize = "default" | "sm" | "lg" | "icon";

const base = "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

function buttonStyles(variant: ButtonVariant = "default", size: ButtonSize = "default") {
  const variantStyles: Record<ButtonVariant, string> = {
    default: "bg-blue-600 text-white shadow-sm hover:bg-blue-700",
    secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200",
    ghost: "text-slate-700 hover:bg-slate-100",
    outline: "border border-slate-200 bg-white text-slate-900 hover:bg-slate-50",
    subtle: "bg-blue-50 text-blue-700 hover:bg-blue-100"
  };

  const sizeStyles: Record<ButtonSize, string> = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-lg px-3",
    lg: "h-12 rounded-xl px-6",
    icon: "h-10 w-10"
  };

  return `${base} ${variantStyles[variant]} ${sizeStyles[size]}`;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant = "default", size = "default", ...props }, ref) => {
  return <button ref={ref} className={cn(buttonStyles(variant, size), className)} {...props} />;
});
Button.displayName = "Button";

export { Button };
