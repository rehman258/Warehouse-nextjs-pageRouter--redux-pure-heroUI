"use client";

import { useAppSelector } from "@/store/hooks";
import { computeMetrics } from "@/lib/metrics";
import { ACTIVITIES, CAPACITY_ZONES, MONTHLY_FLOW, STOCK_INTERESTS } from "@/lib/seed";
import { formatCurrency, formatNumber } from "@/lib/format";
import { StatCard } from "@/components/ui/StatCard";
import { Panel, PanelHeader } from "@/components/ui/Panel";
import { BarChart } from "@/components/charts/BarChart";
import { DonutChart } from "@/components/charts/DonutChart";
import { Icon } from "@/components/Icon";
import { cn } from "@/lib/cn";

export default function DashboardPage() {
  const inventory = useAppSelector((s) => s.inventory.items);
  const orders = useAppSelector((s) => s.orders.items);
  const m = computeMetrics(inventory, orders);

  const stats = [
    { label: "Total SKUs", value: formatNumber(m.totalSkus), icon: "Boxes", iconBg: "bg-blue-100 text-blue-600", delta: 4 },
    { label: "Units in Stock", value: formatNumber(m.totalUnits), icon: "Layers", iconBg: "bg-violet-100 text-violet-600", delta: 2 },
    { label: "Inventory Value", value: formatCurrency(m.inventoryValue), icon: "DollarSign", iconBg: "bg-green-100 text-green-600", delta: 6 },
    { label: "Low Stock", value: formatNumber(m.lowStock), icon: "TriangleAlert", iconBg: "bg-amber-100 text-amber-600" },
    { label: "Out of Stock", value: formatNumber(m.outOfStock), icon: "PackageX", iconBg: "bg-red-100 text-red-600" },
    { label: "Pending Orders", value: formatNumber(m.pendingOrders), icon: "ShoppingCart", iconBg: "bg-cyan-100 text-cyan-600" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Panel className="lg:col-span-2">
          <PanelHeader title="Monthly Actions Flow" />
          <div className="p-4">
            <BarChart categories={MONTHLY_FLOW.months} series={MONTHLY_FLOW.series} colors={["#3b82f6", "#f59e0b"]} />
          </div>
        </Panel>
        <Panel>
          <PanelHeader title="Stock by Category" />
          <div className="p-4">
            <DonutChart
              labels={STOCK_INTERESTS.map((s) => s.category)}
              series={STOCK_INTERESTS.map((s) => s.percentage)}
              colors={STOCK_INTERESTS.map((s) => s.color)}
            />
          </div>
        </Panel>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Panel>
          <PanelHeader title="Recent Activities" />
          <ul className="divide-y divide-default-200">
            {ACTIVITIES.map((a) => (
              <li key={a.id} className="flex items-start gap-3 px-5 py-3.5">
                <span className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-full", a.iconBg)}>
                  <Icon name={a.icon} className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">{a.title}</p>
                  <p className="text-xs text-default-500">{a.description}</p>
                </div>
                <span className="text-xs whitespace-nowrap text-default-400">{a.timeAgo}</span>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel>
          <PanelHeader title="Warehouse Capacity" />
          <div className="space-y-4 p-5">
            {CAPACITY_ZONES.map((z) => {
              const pct = Math.round((z.used / z.total) * 100);
              return (
                <div key={z.id}>
                  <div className="mb-1 flex justify-between text-sm">
                    <span className="font-medium">{z.zone}</span>
                    <span className="text-default-500">{pct}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-default-200">
                    <div className="h-2 rounded-full" style={{ width: `${pct}%`, background: z.color }} />
                  </div>
                  <p className="mt-1 text-xs text-default-400">
                    {formatNumber(z.used)} / {formatNumber(z.total)} units
                  </p>
                </div>
              );
            })}
          </div>
        </Panel>
      </div>
    </div>
  );
}
