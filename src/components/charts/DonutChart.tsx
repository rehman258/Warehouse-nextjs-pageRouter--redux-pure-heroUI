"use client";

import type { ApexOptions } from "apexcharts";
import { useTheme } from "next-themes";
import { ReactApexChart } from "./apex";

export function DonutChart({
  labels,
  series,
  colors,
  height = 300,
}: {
  labels: string[];
  series: number[];
  colors?: string[];
  height?: number;
}) {
  const { resolvedTheme } = useTheme();
  const mode = resolvedTheme === "dark" ? "dark" : "light";

  const options: ApexOptions = {
    chart: { background: "transparent", fontFamily: "inherit" },
    theme: { mode },
    labels,
    colors,
    stroke: { width: 0 },
    dataLabels: { enabled: false },
    legend: { position: "bottom" },
    plotOptions: { pie: { donut: { size: "68%" } } },
    tooltip: { theme: mode },
  };

  return <ReactApexChart type="donut" height={height} options={options} series={series} />;
}
