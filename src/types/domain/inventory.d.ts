import { IPagination } from "./inventory.d";
export type stockStatuses = "inStock" | "lowStock" | "outOfStock";
export interface IInventoryListType {
  data:IInventoryItem[];
  pagination:IPagination;
};
export interface IInventoryItem{
  id:number|string;
  sku:string;
  categoryName:string;
  productName:string;
  category:string;
  stock:string|number;
  location:string;
  price:string|number;
  status: stockStatuses;
}
