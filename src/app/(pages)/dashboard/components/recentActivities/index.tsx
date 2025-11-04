"use client";

import React, { useEffect,useState } from "react";
import ComponentWrapper from "@/components/componentWrapper";
import { RecentActivitiesList, IRecentActivitiesItem } from "@/types/domain/recentActivities";
import RecentActivitiesServices from "@/api/endpoints/recentActivities";
export default function RecentActivities() {
  const [recentAtivitiesList,setRecentActivitiesList] = useState<RecentActivitiesList>();
  useEffect(()=>{
    (async()=>{
      try{
        const res = await RecentActivitiesServices.getRecentActivities<RecentActivitiesList>();
        setRecentActivitiesList(res);
      }catch(err){
        console.log(err);
      }
    })();
  },[]);
  return (
    <ComponentWrapper className="w-[60%] ">
      <ul className="flex flex-col gap-y-5">
        {
          recentAtivitiesList && 
          recentAtivitiesList.map((recentItem:IRecentActivitiesItem)=>(
            <li key={recentItem.id} className="flex items-center gap-[10px]">
              <span className="h-[10px] w-[10px] bg-green-400 rounded-full"></span>
              <div className="flex justify-between items-center w-full ">
                <div>
                  <h5 className="body-medium">
                    {recentItem.title}
                  </h5>
                  <p className="label-regular">
                    {recentItem.description}
                  </p>
                </div>
                <div className="flex flex-col gap-[5px] items-start w-[95px]">
                  <span className={`text-green-800 border-md p-1 px-2 rounded-2xl caption-medium self-start
                  bg-${recentItem.status==="completed" ? "success" : 
              recentItem.status==="pending" ? "primary":"warning" }-100`}>
                    {recentItem.status}
                  </span>
                  <span className="text-xs text-neutral-400">{recentItem.timeAgo}</span>
                </div>
              </div>
            </li>
          ))
        }
      </ul>
    </ComponentWrapper>
  );
}
