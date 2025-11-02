import Axios from "@/api/axios";

class OrdersServices extends Axios{
  public async getOrders<T=unknown>():Promise<T>{
    const response = await this.get<T>("orders");
    return response.data;
  }
}

const ordersServices = new OrdersServices();
export default ordersServices as OrdersServices;