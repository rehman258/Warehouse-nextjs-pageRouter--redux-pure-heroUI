import Axios from "@/api/axios";
class InventoryServices extends Axios {

  public async getInventoryList<T=unknown>(dataParam:unknown,data:unknown):Promise<T>{
    const res = await this.post<T>("inventory/list", {
      params:dataParam
    }, data);
    return res.data;
  }

}

const inventoryServices = new InventoryServices();
export default inventoryServices as InventoryServices;