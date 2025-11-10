import Axios from "@/api/axios";

class CategoriesServices extends Axios {

  public async getAllCategories(){
    const res = await this.get("categories");
    return res.data;
  };
  
  public async geCategoryById(id:number|string){
    const res = await this.get(`categories/${id}`);
    return res.data;
  };
  public async getSubCategories(id:number|string){
    const res = await this.get(`categories/${id}/subCategories`);
    return res.data;
  };

};

const categoriesServices = new CategoriesServices();

export default categoriesServices as CategoriesServices; 