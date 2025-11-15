import Axios from "@/api/axios";

class CategoriesServices extends Axios {

  public async getAllCategories<T=unknown>():Promise<T>{
    const res = await this.get<T>("categories");
    return res.data;
  };
  
  public async geCategoryById<T=unknown>(id:number|string):Promise<T>{
    const res = await this.get<T>(`categories/${id}`);
    return res.data;
  };
  public async getSubCategories<T=unknown>(id:number|string):Promise<T>{
    const res = await this.get<T>(`categories/${id}/subCategories`);
    return res.data;
  };

};

const categoriesServices = new CategoriesServices();

export default categoriesServices as CategoriesServices; 