"use client";

import dynamic from "next/dynamic";

/** ApexCharts touches `window`, so it must be client-only. */
export const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });
