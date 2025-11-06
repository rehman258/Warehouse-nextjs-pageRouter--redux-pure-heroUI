export interface IMonthlyActionsFlow {
  series: ISeriesItem[];
  months: string[];
}

export interface ISeriesItem {
  name: string,
  data: number[];
}