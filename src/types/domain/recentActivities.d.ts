export type RecentActivitiesList = IRecentActivitiesItem[];

export interface IRecentActivitiesItem{
  id:string|number;
  title:string;
  subTitle:string;
  status: activityTypes;
  date:string;
}

type activityTypes = "completed" | "pending" | "warning"; 