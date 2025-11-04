import Axios from "@/api/axios";
class InventoryServices extends Axios {

  public async getInventoryList<T=unknown>():Promise<T>{
    const res = await this.get<T>("inventoryList");
    return res.data;
  }

}

const inventoryServices = new InventoryServices();
export default inventoryServices as InventoryServices;