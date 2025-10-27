"use client";

import React from "react";
import dynamic from "next/dynamic";
import ComponentWrapper from "../componentWrapper";
const Chart = dynamic(() => import("react-apexcharts"));
export default function StockInterests() {
  const [state, setState] = React.useState({
          
    series: [44, 55, 13, 43, 22],
    options: {
      // chart: {
      //   width: 380,
      //   type: "pie",
      // },
      labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
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
