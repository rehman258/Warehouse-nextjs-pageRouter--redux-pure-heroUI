import Axios from "@/api/axios";
class InventoryServices extends Axios {

  public async getInventoryList<T=unknown>(data:unknown):Promise<T>{
    const res = await this.get<T>("inventory/list", {
      params:data
    });
    return res.data;
  }

}

const inventoryServices = new InventoryServices();
export default inventoryServices as InventoryServices;