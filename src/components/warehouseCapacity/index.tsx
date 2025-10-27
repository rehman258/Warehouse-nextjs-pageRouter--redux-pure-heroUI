"use client";

import React from "react";
import ComponentWrapper from "../componentWrapper";
import { Progress } from "@heroui/react";
export default function WarehouseCapacity() {
  return (
    <ComponentWrapper className="w-[40%]">
      <ul className="flex flex-col gap-[20px]">
        <li>
          <p className="flex justify-between">
          </p>
          <Progress showValueLabel color="default" label="Zone A" value={100}/>
        </li>
        <li>
          <p className="flex justify-between">
          </p>
          <Progress showValueLabel color="danger" label="Zone b" value={75}/>
        </li>
        <li>
          <p className="flex justify-between">
          </p>
          <Progress showValueLabel color="warning" label="Zone A" value={50}/>
        </li>
        <li>
          <p className="flex justify-between">
          </p>
          <Progress showValueLabel color="success" label="Zone A" value={25}/>
        </li>
        <li>
          <p className="flex justify-between">
          </p>
          <Progress showValueLabel color={undefined} label="Zone A" value={10}/>
        </li>
      </ul>
    </ComponentWrapper>
  );
}
