export type WarehouseCapacity = IWarehouseCapacity[];

export interface IWarehouseCapacityItem<T> {
  id: string|number;
  zone:T;
  percentage:number|string;
};