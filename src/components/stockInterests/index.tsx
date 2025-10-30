"use client";

import React from "react";
import dynamic from "next/dynamic";
import ComponentWrapper from "../componentWrapper";
const Chart = dynamic(() => import("react-apexcharts"),{ ssr: false });
import { IStockInterests } from "@/types/reusable";

export default function StockInterests({ series, labels }:IStockInterests) {
  const [state, setState] = React.useState({
          
    series,
    options: {
      // chart: {
      //   width: 380,
      //   type: "pie",
      // },
      labels,
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: "bottom"
          }
        }
      }]
    },
          
  });
  return (
    <ComponentWrapper
      className={"w-[45%]"}
    >
      <Chart class="flex justify-center" options={state.options} series={state.series} type="pie" width={380} />

    </ComponentWrapper>
  );
}
