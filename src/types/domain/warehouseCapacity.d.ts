export type WarehouseCapacityList = IWarehouseCapacity[];

export interface IWarehouseCapacityItem {
  id: string|number;
  zone:string;
  used:number;
  color:string;
  total:number;
  percentage:number;
};