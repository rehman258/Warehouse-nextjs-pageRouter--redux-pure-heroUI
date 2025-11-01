export type WarehouseCapacityList = IWarehouseCapacity[];

export interface IWarehouseCapacityItem<T> {
  id: string|number;
  zone:T;
  percentage:number|string;
};