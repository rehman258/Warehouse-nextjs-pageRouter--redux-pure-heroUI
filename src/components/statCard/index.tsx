import React from "react";
import Image from "next/image";
import { IStatCard } from "@/types/models";

export default function StatCard({ title,desc,count,icon }:IStatCard) {
  return (
    <div 
      className="shadow rounded-lg flex w-[204px] p-4 flex-col gap-6 bg-white"
    >
      <div className="stat-card--header flex justify-between w-[100%]">
        <h5 className="stat-card--title label-medium">
          {title}
        </h5>
        {
          icon ? icon :   
            ( <>
              <Image
                alt="stat card icon"
                height={16}
                src={"/icons/total-inventory.svg"}
                width={16}
              />**
            </>
            )
        }
      </div>
      <div className="content">
        <p className="stat-detail heading-2-bold">
          {count}
        </p>
        {
          desc && 
          <span className="additional-info caption-regular">
            {desc}
          </span>
        }
      </div>

    </div>
  );
}
