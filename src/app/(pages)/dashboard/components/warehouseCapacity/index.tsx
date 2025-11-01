"use client";

import React from "react";
import ComponentWrapper from "@/components/componentWrapper";
import { Progress } from "@heroui/react";
import { WarehouseCapacityList, IWarehouseCapacityItem } from "@/types/domain/warehouseCapacity";
export default function WarehouseCapacity(warehouseCapacity:WarehouseCapacityList) {
  return (
    <ComponentWrapper className="w-[40%]">
      <ul className="flex flex-col gap-[20px]">
        {
          warehouseCapacity.length &&
          warehouseCapacity.map((capacityItem:IWarehouseCapacityItem<string>)=>(
            <li key={capacityItem.id}>
              <Progress showValueLabel color="default" label={capacityItem.zone} value={100}/>
            </li>
          ))
        }
      </ul>
    </ComponentWrapper>
  );
}
