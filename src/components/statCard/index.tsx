import React from "react";
import Image from "next/image";

export default function StatDard() {
  return (
    <div 
      className="shadow rounded-lg flex w-[204px] p-4 flex-col gap-6 bg-white"
    >
      <div className="stat-card--header flex justify-between w-[100%]">
        <h5 className="stat-card--title label-medium">
          {"Total Items"}
        </h5>
        <Image
          alt="stat card icon"
          height={16}
          src={"/icons/total-invertory.svg"}
          width={16}
        />
      </div>
      <div className="content">
        <p className="stat-detail heading-2-bold">
          {"12,999"}
        </p>
        <span className="additional-info caption-regular">
          {"+2.1% from last month"}
        </span>
      </div>

    </div>
  );
}
