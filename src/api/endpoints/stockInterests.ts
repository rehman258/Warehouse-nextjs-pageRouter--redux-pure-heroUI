import Axios from "@/api/axios";

class StockInterestsServices extends Axios {
  
  public async getStockInterests<T>():Promise<T>{
    const res = await this.get<T>("stockInterests");
    return res.data;
  };

}

const stockInterestsServices = new StockInterestsServices();

export default stockInterestsServices as StockInterestsServices; 