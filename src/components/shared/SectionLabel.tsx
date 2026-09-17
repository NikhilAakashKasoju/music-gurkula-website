import { cn } from "@/lib/utils";

export default function SectionLabel({
  children,
  className,
  dark = false,
}: {
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em]",
        dark ? "text-begonia-400" : "text-begonia-600",
        className
      )}
    >
      <span className={cn("h-px w-8", dark ? "bg-begonia-400" : "bg-begonia-600")} />
      {children}
    </div>
  );
}
