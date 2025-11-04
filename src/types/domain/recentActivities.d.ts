export type RecentActivitiesList = IRecentActivitiesItem[];

export interface IRecentActivitiesItem{
  id:string|number;
  category:string;
  color:string;
  icon?:string;
  description:string;
  timeAgo:string;
  timeStamp:string;
  title:string;
  status: activityTypes;
}

type activityTypes = "completed" | "pending" | "warning"; 