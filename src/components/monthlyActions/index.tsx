"use client";

import React from "react";
import ComponentWrapper from "../componentWrapper";
import Chart from "react-apexcharts";

export default function MonthlyActions() {
  const [state, setState] = React.useState({
          
    series: [{
      name: "Inbound",
      data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
    }, {
      name: "Outbound",
      data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
    }],
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
        categories: ["Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
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
