"use client";

import { useMemo, useState } from "react";
import { Tabs, Tab } from "@heroui/react";
import { useAppSelector } from "@/store/hooks";
import { inventorySelectors } from "@/store/slices/inventorySlice";
import { MONTHLY_FLOW, STOCK_INTERESTS } from "@/lib/seed";
import { formatCurrency, formatNumber } from "@/lib/format";
import { StatCard } from "@/components/ui/StatCard";
import { Panel, PanelHeader } from "@/components/ui/Panel";
import { DataTable, type Column } from "@/components/ui/DataTable";
import { BarChart } from "@/components/charts/BarChart";
import { DonutChart } from "@/components/charts/DonutChart";
import { AreaChart } from "@/components/charts/AreaChart";
import type { StockInterest } from "@/lib/types";

const FLOW_COLORS = ["#3b82f6", "#f59e0b"];

export default function ReportsPage() {
  const inventory = useAppSelector(inventorySelectors.selectAll);
  const orders = useAppSelector((s) => s.orders.items);
  const [selected, setSelected] = useState<string>("overview");

  const metrics = useMemo(() => {
    const totalValue = inventory.reduce((sum, i) => sum + i.stock * i.price, 0);
    const totalUnits = inventory.reduce((sum, i) => sum + i.stock, 0);
    const totalOrders = orders.length;
    const delivered = orders.filter((o) => o.status === "delivered").length;
    const fulfillmentRate = totalOrders > 0 ? Math.round((delivered / totalOrders) * 100) : 0;
    return { totalValue, totalUnits, totalOrders, delivered, fulfillmentRate };
  }, [inventory, orders]);

  const stats = [
    {
      label: "Inventory Value",
      value: formatCurrency(metrics.totalValue),
      icon: "DollarSign",
      iconBg: "bg-green-100 text-green-600",
      delta: 6,
      hint: "Across all categories",
    },
    {
      label: "Units in Stock",
      value: formatNumber(metrics.totalUnits),
      icon: "Layers",
      iconBg: "bg-violet-100 text-violet-600",
      delta: 3,
      hint: `${inventory.length} active SKUs`,
    },
    {
      label: "Total Orders",
      value: formatNumber(metrics.totalOrders),
      icon: "ShoppingCart",
      iconBg: "bg-blue-100 text-blue-600",
      hint: "Inbound and outbound",
    },
    {
      label: "Fulfillment Rate",
      value: `${metrics.fulfillmentRate}%`,
      icon: "CircleCheck",
      iconBg: "bg-cyan-100 text-cyan-600",
      delta: 5,
      hint: `${metrics.delivered} of ${metrics.totalOrders} delivered`,
    },
  ];

  const categoryColumns: Column<StockInterest>[] = [
    {
      key: "category",
      label: "Category",
      render: (row) => (
        <div className="flex items-center gap-2">
          <span
            className="h-2.5 w-2.5 shrink-0 rounded-full"
            style={{ background: row.color }}
          />
          <span className="font-medium">{row.category}</span>
        </div>
      ),
    },
    {
      key: "value",
      label: "Value",
      align: "end",
      render: (row) => formatCurrency(row.value),
    },
    {
      key: "percentage",
      label: "Share",
      align: "end",
      render: (row) => (
        <span className="text-default-500">{row.percentage}%</span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Reports & Analytics</h1>
        <p className="mt-1 text-sm text-default-500">
          Performance overview of inventory value, stock movement and category distribution.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      <Tabs
        aria-label="Report views"
        selectedKey={selected}
        onSelectionChange={(key) => setSelected(String(key))}
        color="primary"
        variant="underlined"
      >
        <Tab key="overview" title="Overview">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Panel>
              <PanelHeader title="Monthly Actions Flow" />
              <div className="p-4">
                <BarChart
                  categories={MONTHLY_FLOW.months}
                  series={MONTHLY_FLOW.series}
                  colors={FLOW_COLORS}
                />
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
        </Tab>

        <Tab key="movement" title="Stock Movement">
          <Panel>
            <PanelHeader title="Inbound vs. Outbound Flow" />
            <div className="p-4">
              <AreaChart
                categories={MONTHLY_FLOW.months}
                series={MONTHLY_FLOW.series}
                colors={FLOW_COLORS}
                height={340}
              />
              <p className="mt-2 px-1 text-sm text-default-500">
                Inbound receipts have consistently outpaced outbound shipments over the past 12
                months, with both trending upward into Q4 — a sign of healthy restocking ahead of
                peak demand.
              </p>
            </div>
          </Panel>
        </Tab>

        <Tab key="categories" title="Categories">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Panel>
              <PanelHeader title="Value by Category" />
              <div className="p-4">
                <BarChart
                  horizontal
                  categories={STOCK_INTERESTS.map((s) => s.category)}
                  series={[{ name: "Value", data: STOCK_INTERESTS.map((s) => s.value) }]}
                  colors={["#3b82f6"]}
                  showLegend={false}
                  height={340}
                />
              </div>
            </Panel>
            <Panel>
              <PanelHeader title="Category Breakdown" />
              <div className="p-4">
                <DataTable
                  ariaLabel="Inventory value by category"
                  columns={categoryColumns}
                  rows={STOCK_INTERESTS}
                />
              </div>
            </Panel>
          </div>
        </Tab>
      </Tabs>
    </div>
  );
}
