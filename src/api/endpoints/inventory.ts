// import { IInventoryList } from '@/types/domain/inventory';
import Axios from "../axios";
class InventoryServices extends Axios {

  public async getInventoryList<T=unknown>(url:string):Promise<T>{
    try{
      const res = await this.get<T>(url);
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