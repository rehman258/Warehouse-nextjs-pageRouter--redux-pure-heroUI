export type stockStatuses = "inStock" | "lowStock" | "outOfStock";
export interface IInventoryListType {
  data:IInventoryItem[];
  pagination:IPagination;
};
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

export interface IPagination{
  currentPage:number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}