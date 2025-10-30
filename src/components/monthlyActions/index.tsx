"use client";

import React from "react";
import dynamic from "next/dynamic";
import ComponentWrapper from "../componentWrapper";
const Chart = dynamic(() => import("react-apexcharts"),{ ssr: false });
import { IMonthlyActions } from "@/types/reusable";

export default function MonthlyActions({ series, months }:IMonthlyActions) {
  const [state, setState] = React.useState({
          
    series: series,
    options: {
      // chart: {
      //   type: "bar",
      //   height: 350
      // },
      // plotOptions: {
      //   bar: {
      //     horizontal: false,
      //     columnWidth: "55%",
      //     borderRadius: 5,
      //     borderRadiusApplication: "end"
      //   },
      // },
      dataLabels: {
        enabled: false
      },
      // stroke: {
      //   show: true,
      //   width: 2,
      //   colors: ["transparent"]
      // },
      xaxis: {
        categories: months,
      },
      // yaxis: {
      //   title: {
      //     text: "$ (thousands)"
      //   }
      // },
      fill: {
        opacity: 1
      },
      // tooltip: {
      //   y: {
      //     formatter: function (val:unknown) {
      //       return "$ " + val + " thousands";
      //     }
      //   }
      // }
    },
          
  });

  return (
    <ComponentWrapper 
      className={"w-[55%]"}
    >
      <Chart
        height={350} 
        options={state.options} 
        series={state.series} 
        type="bar" />
    </ComponentWrapper>
  );
}
