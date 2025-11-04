export type StockInterestsList = IStockInterestsItem[];
export interface IStockInterestsItem {
  id: number;
  category: string;
  percentage: number;
  value: number;
  color: string;
  icon: string;
  items: string;
}
