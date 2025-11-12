import Axios from "@/api/axios";

class StatusesServices extends Axios {

  public async getAllStatuses(){
    const res = await this.get("statuses");
    return res.data;
  };

}

const statusesServices = new StatusesServices();

export default statusesServices as StatusesServices;