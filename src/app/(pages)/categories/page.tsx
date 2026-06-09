"use client";

import { CATEGORIES, INVENTORY } from "@/lib/seed";
import { formatCurrency, formatNumber } from "@/lib/format";
import { StatCard } from "@/components/ui/StatCard";
import { Panel, PanelHeader } from "@/components/ui/Panel";
import { DonutChart } from "@/components/charts/DonutChart";
import { Icon } from "@/components/Icon";
import { cn } from "@/lib/cn";

interface CategoryStyle {
  icon: string;
  iconBg: string;
  color: string;
}

/** Per-category visual identity (lucide icon, chip background, donut hex). */
const CATEGORY_STYLES: Record<string, CategoryStyle> = {
  Electronics: { icon: "Cpu", iconBg: "bg-blue-100 text-blue-600", color: "#3b82f6" },
  Sports: { icon: "Dumbbell", iconBg: "bg-amber-100 text-amber-600", color: "#f59e0b" },
  Furniture: { icon: "Armchair", iconBg: "bg-violet-100 text-violet-600", color: "#8b5cf6" },
  "Home & Garden": { icon: "Flower2", iconBg: "bg-green-100 text-green-600", color: "#10b981" },
  Apparel: { icon: "Shirt", iconBg: "bg-pink-100 text-pink-600", color: "#ec4899" },
  Tools: { icon: "Wrench", iconBg: "bg-orange-100 text-orange-600", color: "#f97316" },
  Office: { icon: "Briefcase", iconBg: "bg-cyan-100 text-cyan-600", color: "#06b6d4" },
  Toys: { icon: "ToyBrick", iconBg: "bg-rose-100 text-rose-600", color: "#f43f5e" },
};

const FALLBACK_STYLE: CategoryStyle = {
  icon: "Tags",
  iconBg: "bg-default-200 text-default-600",
  color: "#64748b",
};

export default function CategoriesPage() {
  const cards = CATEGORIES.map((category) => {
    const items = INVENTORY.filter((i) => i.category === category.name);
    const totalUnits = items.reduce((sum, i) => sum + i.stock, 0);
    const totalValue = items.reduce((sum, i) => sum + i.stock * i.price, 0);
    const style = CATEGORY_STYLES[category.name] ?? FALLBACK_STYLE;
    return {
      ...category,
      itemCount: items.length,
      totalUnits,
      totalValue,
      style,
    };
  });

  const totalInventoryValue = INVENTORY.reduce((sum, i) => sum + i.stock * i.price, 0);

  const donutCards = [...cards].sort((a, b) => b.totalValue - a.totalValue);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold">Categories</h1>
        <p className="mt-1 text-sm text-default-500">
          Breakdown of inventory across every product category in the warehouse.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          label="Total Categories"
          value={formatNumber(CATEGORIES.length)}
          icon="Tags"
          iconBg="bg-violet-100 text-violet-600"
          hint="Active product groups"
        />
        <StatCard
          label="Total SKUs"
          value={formatNumber(INVENTORY.length)}
          icon="Boxes"
          iconBg="bg-blue-100 text-blue-600"
          hint="Distinct stock-keeping units"
        />
        <StatCard
          label="Total Inventory Value"
          value={formatCurrency(totalInventoryValue)}
          icon="DollarSign"
          iconBg="bg-green-100 text-green-600"
          hint="Stock x unit price"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <Panel key={c.id} className="flex flex-col gap-4 p-5">
            <div className="flex items-start gap-3">
              <span
                className={cn(
                  "flex h-11 w-11 shrink-0 items-center justify-center rounded-lg",
                  c.style.iconBg,
                )}
              >
                <Icon name={c.style.icon} className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <p className="truncate font-semibold">{c.name}</p>
                <p className="text-sm text-default-500">{c.description}</p>
              </div>
            </div>

            <div className="mt-auto grid grid-cols-3 gap-2 border-t border-default-200 pt-4">
              <div>
                <p className="text-sm font-semibold">{formatNumber(c.itemCount)}</p>
                <p className="text-xs text-default-400">Items</p>
              </div>
              <div>
                <p className="text-sm font-semibold">{formatNumber(c.totalUnits)}</p>
                <p className="text-xs text-default-400">Units</p>
              </div>
              <div>
                <p className="text-sm font-semibold">{formatCurrency(c.totalValue)}</p>
                <p className="text-xs text-default-400">Value</p>
              </div>
            </div>
          </Panel>
        ))}
      </div>

      <Panel>
        <PanelHeader title="Inventory Value by Category" />
        <div className="p-4">
          <DonutChart
            labels={donutCards.map((c) => c.name)}
            series={donutCards.map((c) => Math.round(c.totalValue))}
            colors={donutCards.map((c) => c.style.color)}
            height={340}
          />
        </div>
      </Panel>
    </div>
  );
}
