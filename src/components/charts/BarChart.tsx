"use client";

import type { ApexOptions } from "apexcharts";
import { useTheme } from "next-themes";
import { ReactApexChart } from "./apex";

export function BarChart({
  categories,
  series,
  colors,
  height = 300,
  horizontal = false,
  showLegend = true,
}: {
  categories: string[];
  series: { name: string; data: number[] }[];
  colors?: string[];
  height?: number;
  horizontal?: boolean;
  showLegend?: boolean;
}) {
  const { resolvedTheme } = useTheme();
  const mode = resolvedTheme === "dark" ? "dark" : "light";

  const options: ApexOptions = {
    chart: { toolbar: { show: false }, background: "transparent", fontFamily: "inherit" },
    theme: { mode },
    colors,
    plotOptions: { bar: { borderRadius: 6, columnWidth: "45%", horizontal } },
    dataLabels: { enabled: false },
    grid: { borderColor: "rgba(148,163,184,0.18)", strokeDashArray: 4 },
    xaxis: { categories, axisBorder: { show: false }, axisTicks: { show: false } },
    legend: { show: showLegend, position: "top", horizontalAlign: "right" },
    tooltip: { theme: mode },
  };

  return <ReactApexChart type="bar" height={height} options={options} series={series} />;
}
