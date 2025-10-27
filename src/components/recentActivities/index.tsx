import React from "react";
import ComponentWrapper from "../componentWrapper";
export default function page() {
  return (
    <ComponentWrapper className="w-[60%] ">
      <ul>
        <li className="flex items-center gap-[10px]">
          <span className="h-[10px] w-[10px] bg-green-500 rounded-full"></span>
          <div className="flex justify-between items-center w-full ">
            <div>
              <h5 className="body-medium">
                {"Stock replenishment"}
              </h5>
              <p className="label-regular">
                {"Electronics - SKU-2024"}
              </p>
            </div>
            <div className="flex flex-col gap-[5px]">
              <span className="bg-green-500 border-md p-1 px-2 rounded-2xl caption-medium text-white">
                {"completed"}
              </span>
              <span className="caption-medium text-neutral-400">{"2 minutes ago"}</span>
            </div>
          </div>
        </li>
      </ul>
    </ComponentWrapper>
  );
}
