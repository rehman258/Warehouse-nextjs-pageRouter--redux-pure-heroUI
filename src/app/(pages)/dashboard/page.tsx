import React from "react";
import StatDard from "@/components/statCard";
import MonthlyActions from "@/components/monthlyActions";
import StockInterests from "@/components/stockInterests";
import ReacentActivities from "@/components/recentActivities";
import WarehouseCapacity from "@/components/warehouseCapacity";
export default function Dashboard() {
  return (
    <div className="flex flex-col gap-6">
      <section className="">
        <ul className="flex gap-5 justify-start flex-wrap">
          <li>
            <StatDard/>
          </li>
          <li>
            <StatDard/>
          </li>
          <li>
            <StatDard/>
          </li>
          <li>
            <StatDard/>
          </li>
          <li>
            <StatDard/>
          </li>
        </ul>
      </section>
      <section className="flex gap-6">
        <MonthlyActions/>
        <StockInterests/>
      </section>
      <section className="flex gap-6">
        <ReacentActivities/>
        <WarehouseCapacity/>
      </section>
    </div>
  );
}
