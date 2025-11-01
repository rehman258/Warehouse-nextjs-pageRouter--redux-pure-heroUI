export interface IMonthlyActions {
  series: [{
    name: "Inbound" | "Outbound";
    data: [number,number,number,number,number,number,number,number,number,number,number,number];
  }, {
    name: "Outbound" | "Inbound";
    data: [number,number,number,number,number,number,number,number,number,number,number,number];
  }];
  months: [string,string,string,string,string,string,string,string,string,string,string,string];
}