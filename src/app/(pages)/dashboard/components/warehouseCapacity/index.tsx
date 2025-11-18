"use client";

import React, { useEffect,useState } from "react";
import ComponentWrapper from "@/components/componentWrapper";
import { Progress } from "@heroui/react";
import { WarehouseCapacityList, IWarehouseCapacityItem } from "@/types/domain/warehouseCapacity";
import CapacityServices from "@/api/endpoints/capacity"; 
export default function WarehouseCapacity() {
  const [capacityList, setCapacityList] = useState<WarehouseCapacityList | undefined>();
  useEffect(()=>{
    (async()=>{
      const res = await CapacityServices.getCapacityList<WarehouseCapacityList>();
      setCapacityList([]);
    })();    
  },[]);
  return (
    <ComponentWrapper className="w-[40%]"
      subTitle={"Current utilization"}
      title={"Warehouse Capacity"}
    >
      <ul className="flex flex-col gap-[20px]">
        {
          capacityList &&
          capacityList?.map((capacityItem:IWarehouseCapacityItem)=>{
            const percentage = capacityItem.percentage;
            return (
              <li key={capacityItem.id}>
                <Progress showValueLabel color={`${percentage >= 55 ? "success" : percentage >= 30 ? "warning" 
                  :"danger"}`} 
                label={capacityItem.zone} 
                value={capacityItem.percentage}/>
              </li>
            );
          })
        }
      </ul>
    </ComponentWrapper>
  );
}
