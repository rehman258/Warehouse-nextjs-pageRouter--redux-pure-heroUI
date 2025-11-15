import Axios from "@/api/axios";
class InventoryServices extends Axios {

  public async getInventoryList<T=unknown>(dataParam:unknown):Promise<T>{
    const res = await this.get<T>("inventory/list", {
      params:dataParam
    });
    return res.data;
  }

}

const inventoryServices = new InventoryServices();
export default inventoryServices as InventoryServices;