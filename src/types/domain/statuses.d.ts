export type StatusesType = IStatusItem[];

export interface IStatusItem {
  bgColor: string;
  code: string;
  color: string;
  condition: string;
  description: string;
  icon: string;
  id: number;
  name: string;
  priority: number;
};