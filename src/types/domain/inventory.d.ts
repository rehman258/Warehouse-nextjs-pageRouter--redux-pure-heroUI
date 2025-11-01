export type stockStatuses = "inStock" | "lowStock" | "outOfStock";
export type IInventoryList = IInventoryItem[];
export interface IInventoryItem{
  id:number|string;
  sku:string;
  productName:string;
  category:string;
  stock:string|number;
  location:string;
  price:string|number;
  status: stockStatuses;
}