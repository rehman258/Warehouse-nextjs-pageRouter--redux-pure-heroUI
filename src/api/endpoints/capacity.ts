import Axios from "@/api/axios";

class CapacityServices extends Axios{

  public async getCapacityList<T=unknown>():Promise<T>{
    const res = await this.get<T>("capacity");
    return res.data;
  }

}

const capacityServices = new CapacityServices();
export default capacityServices as CapacityServices;
