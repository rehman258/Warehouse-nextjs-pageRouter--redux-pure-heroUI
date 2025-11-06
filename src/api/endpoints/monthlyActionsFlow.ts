import Axios from "@/api/axios";

class MonthlyActionsFlowServices extends Axios {
  public async getMonthlyActionsFlowList<T>():Promise<T>{
    const res = await this.get<T>("monthlyActionsFlow");
    return res.data;
  };
};

const monthlyActionsFlowServices = new MonthlyActionsFlowServices();
export default monthlyActionsFlowServices as MonthlyActionsFlowServices;