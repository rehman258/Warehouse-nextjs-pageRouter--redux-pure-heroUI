import Axios from "../axios";
class InventoryServices extends Axios {

  public async getInventoryList<T=unknown>():Promise<T>{
    try{
      const res = await this.get<T>("inventoryList");
      console.log(res);
      return res.data;
    }
    catch(err){
      throw new Error(`Error occurs ${err}`);
    }
  }

}

const inventoryServices = new InventoryServices();
export default inventoryServices as InventoryServices;