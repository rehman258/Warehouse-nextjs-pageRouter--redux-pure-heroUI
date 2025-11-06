import React from "react";
import StatCard from "@/components/statCard";
import MonthlyActionsFlow from "./components/monthlyActionsFlow";
import StockInterests from "./components/stockInterests";
import ReacentActivities from "./components/recentActivities";
import WarehouseCapacity from "./components/warehouseCapacity";
export default function Dashboard() {
  return (
    <div className="flex flex-col gap-6">
      <section className="">
        <ul className="flex gap-5 justify-start flex-wrap">
          <li>
            <StatCard/>
          </li>
          <li>
            <StatCard/>
          </li>
          <li>
            <StatCard/>
          </li>
          <li>
            <StatCard/>
          </li>
          <li>
            <StatCard/>
          </li>
        </ul>
      </section>
      <section className="flex gap-6">
        <MonthlyActionsFlow/>
        <StockInterests/>
      </section>
      <section className="flex gap-6">
        <ReacentActivities/>
        <WarehouseCapacity/>
      </section>
    </div>
  );
}
