import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Icon } from "../Icon";
import { Panel } from "./Panel";
import { cn } from "@/lib/cn";

export function StatCard({
  label,
  value,
  icon,
  iconBg,
  delta,
  hint,
}: {
  label: string;
  value: string;
  icon: string;
  iconBg: string;
  delta?: number;
  hint?: string;
}) {
  return (
    <Panel className="p-5">
      <div className="flex items-start justify-between">
        <span className={cn("flex h-11 w-11 items-center justify-center rounded-lg", iconBg)}>
          <Icon name={icon} className="h-5 w-5" />
        </span>
        {delta != null && (
          <span
            className={cn(
              "inline-flex items-center gap-0.5 text-xs font-medium",
              delta >= 0 ? "text-green-600" : "text-red-500",
            )}
          >
            {delta >= 0 ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
            {Math.abs(delta)}%
          </span>
        )}
      </div>
      <p className="mt-4 text-2xl font-bold">{value}</p>
      <p className="mt-1 text-sm text-default-500">{label}</p>
      {hint && <p className="mt-0.5 text-xs text-default-400">{hint}</p>}
    </Panel>
  );
}
