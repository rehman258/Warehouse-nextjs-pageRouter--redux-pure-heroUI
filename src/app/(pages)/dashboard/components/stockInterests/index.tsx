"use client";

import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import ComponentWrapper from "@/components/componentWrapper";
const Chart = dynamic(() => import("react-apexcharts"),{ ssr: false });
import { StockInterestsList } from "@/types/domain/stockInterests";
import StockInterestsServices from "@/api/endpoints/stockInterests";

export default function StockInterests() {
  const [state, setState] = React.useState<{
  series: number[];
  options: {
    labels: string[];
    responsive: Array<{
      breakpoint: number;
      options: {
        chart: {
          width: number;
        };
        legend: {
          position: string;
        };
      };
    }>;
  };
}>({
          
  series:[],
  options: {
    // chart: {
    //   width: 380,
    //   type: "pie",
    // },
    labels:[],
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
  useEffect(()=>{
    (async()=>{
      const res = await StockInterestsServices.getStockInterests<StockInterestsList>(); 
      const labels = res?.map((interestItem) => interestItem.category);
      const series = res?.map((interestItem) => interestItem.percentage);
      setState({
        ...state,
        series,
        options:{
          ...state.options,
          labels
        },
      });
    })();
  },[]);
  return (
    <ComponentWrapper
      className={"w-[40%]"}
    >
      <Chart className="flex justify-center" 
        options={state.options} series={state.series} type="pie" width={380} />
    </ComponentWrapper>
  );
}
