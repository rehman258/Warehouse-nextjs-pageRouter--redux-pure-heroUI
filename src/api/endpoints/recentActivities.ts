import Axios from "@/api/axios";

class RecentActivitiesServices extends Axios {
  
  public async getRecentActivities<T=unknown> ():Promise<T>{
    const res = await this.get<T>("recentActivities");
    return res.data;
  }
}

const recentActivitiesServices = new RecentActivitiesServices();
export default recentActivitiesServices as RecentActivitiesServices;