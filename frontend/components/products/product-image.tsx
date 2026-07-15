import { cn } from "@/lib/utils";
import type { ProductBase } from "@/lib/product-types";

type ProductImageProps = {
  product: ProductBase;
  size?: "sm" | "md" | "lg";
};

const sizeMap = {
  sm: "h-14 w-14",
  md: "h-24 w-24",
  lg: "h-32 w-32"
};

export function ProductImage({ product, size = "md" }: ProductImageProps) {
  const rectangular = product.defaultConfiguration.shape === "rectangular";

  return (
    <div className={cn("relative grid place-items-center rounded-xl bg-slate-50", sizeMap[size])}>
      <div
        className={cn(
          "relative shadow-[inset_10px_0_18px_rgba(255,255,255,0.72),inset_-10px_0_20px_rgba(15,23,42,0.16),0_12px_24px_rgba(15,23,42,0.12)]",
          rectangular ? "h-[72%] w-[62%] rounded-md" : "h-[76%] w-[54%] rounded-[45%/9%]",
          product.imageTone === "gray" ? "bg-gradient-to-r from-slate-300 via-slate-100 to-slate-400" : "bg-gradient-to-r from-slate-300 via-white to-slate-400"
        )}
      >
        <div className={cn("absolute left-0 right-0 top-0 mx-auto h-2 border border-slate-300 bg-slate-100", rectangular ? "w-full rounded-t-md" : "w-full rounded-[50%]")} />
        <div className={cn("absolute bottom-0 left-0 right-0 mx-auto h-2 border border-slate-300 bg-slate-200", rectangular ? "w-full rounded-b-md" : "w-full rounded-[50%]")} />
      </div>
    </div>
  );
}
