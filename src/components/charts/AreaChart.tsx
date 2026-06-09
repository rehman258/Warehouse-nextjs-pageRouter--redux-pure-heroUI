"use client";

import type { ApexOptions } from "apexcharts";
import { useTheme } from "next-themes";
import { ReactApexChart } from "./apex";

export function AreaChart({
  categories,
  series,
  colors,
  height = 300,
}: {
  categories: string[];
  series: { name: string; data: number[] }[];
  colors?: string[];
  height?: number;
}) {
  const { resolvedTheme } = useTheme();
  const mode = resolvedTheme === "dark" ? "dark" : "light";

  const options: ApexOptions = {
    chart: { toolbar: { show: false }, background: "transparent", fontFamily: "inherit" },
    theme: { mode },
    colors,
    stroke: { curve: "smooth", width: 3 },
    fill: { type: "gradient", gradient: { opacityFrom: 0.4, opacityTo: 0 } },
    dataLabels: { enabled: false },
    grid: { borderColor: "rgba(148,163,184,0.18)", strokeDashArray: 4 },
    xaxis: { categories, axisBorder: { show: false }, axisTicks: { show: false } },
    legend: { position: "top", horizontalAlign: "right" },
    tooltip: { theme: mode },
  };

  return <ReactApexChart type="area" height={height} options={options} series={series} />;
}
