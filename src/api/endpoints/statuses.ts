import Axios from "@/api/axios";

class StatusesServices extends Axios {

  public async getAllStatuses<T=unknown>():Promise<T>{
    const res = await this.get<T>("statuses");
    return res.data;
  };

}

const statusesServices = new StatusesServices();

export default statusesServices as StatusesServices;