"use client";

import React from "react";
import ComponentWrapper from "../componentWrapper";
import { RecentActivitiesType, IRecentActivitiesItem } from "@/types/models";
export default function RecentActivities( recentActivities:RecentActivitiesType) {
  return (
    <ComponentWrapper className="w-[60%] ">
      <ul>
        {
          recentActivities.length && 
          recentActivities.map((recentItem:IRecentActivitiesItem)=>(
            <li key={recentItem.id} className="flex items-center gap-[10px]">
              <span className="h-[10px] w-[10px] bg-green-400 rounded-full"></span>
              <div className="flex justify-between items-center w-full ">
                <div>
                  <h5 className="body-medium">
                    {recentItem.title}
                  </h5>
                  <p className="label-regular">
                    {recentItem.subTitle}
                  </p>
                </div>
                <div className="flex flex-col gap-[5px]">
                  <span className="bg-green-100 text-green-800 
              border-md p-1 px-2 rounded-2xl caption-medium">
                    {recentItem.status}
                  </span>
                  <span className="caption-medium text-neutral-400">{recentItem.date}</span>
                </div>
              </div>
            </li>
          ))
        }
      </ul>
    </ComponentWrapper>
  );
}
