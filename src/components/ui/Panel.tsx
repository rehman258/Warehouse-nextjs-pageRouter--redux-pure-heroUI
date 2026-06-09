import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Panel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-xl border border-default-200 bg-content1 shadow-sm", className)}>
      {children}
    </div>
  );
}

export function PanelHeader({
  title,
  action,
}: {
  title: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex items-center justify-between border-b border-default-200 px-5 py-4">
      <h2 className="font-semibold">{title}</h2>
      {action}
    </div>
  );
}
