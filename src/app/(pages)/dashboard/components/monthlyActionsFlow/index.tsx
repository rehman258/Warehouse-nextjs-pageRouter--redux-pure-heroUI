"use client";

import React,{ useEffect } from "react";
import dynamic from "next/dynamic";
import ComponentWrapper from "@/components/componentWrapper";
const Chart = dynamic(() => import("react-apexcharts"),{ ssr: false });
import { IMonthlyActionsFlow, ISeriesItem } from "@/types/domain/monthlyActionsFlow";
import MonthlyActionsFlowServices from "@/api/endpoints/monthlyActionsFlow";

export default function MonthlyActionsFlow() {
  const [state, setState] = React.useState<{
    series: ISeriesItem[],
    options: {
      dataLabels: {
        enabled: boolean
      },
      xaxis: {
        categories: string[],
      },
      stroke: {
        show: boolean,
        width: number,
        colors: string[]
      }
      fill: {
        opacity: number
      },
      plotOptions: {
        bar: {
          horizontal: boolean,
          columnWidth: string,
          borderRadius: number,
          borderRadiusApplication: string
        },
      },
    },
  }>({
          
    series: [],
    options: {
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "80%",
          borderRadius: 5,
          borderRadiusApplication: "end"
        },
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: .01,
        colors: ["transparent"]
      },
      xaxis: {
        categories: ["Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
      },
    
      fill: {
        opacity: 1
      },
    }
          
  });
  useEffect(()=>{
    (async () => {
      const res = await MonthlyActionsFlowServices.getMonthlyActionsFlowList<IMonthlyActionsFlow>();
      const months = [];
      const series = [];
      setState({
        ...state,
        series,
        options: {
          ...state.options,
          xaxis: {
            categories: months,
          },
        },
      });
    })();
  },[]);
  return (
    <ComponentWrapper 
      className={"w-[65%]"}
    >
      <Chart
        height={350} 
        options={state.options} 
        series={state.series} 
        type="bar" />
    </ComponentWrapper>
  );
}
