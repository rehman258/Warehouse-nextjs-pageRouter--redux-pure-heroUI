export type OrdersList = OrderItem[];

export interface IOrdersItem {
    "orderId": string;
    "type": "inBound" | "outBound";
    "supplier": string;
    "createdDate": string;
    "expectedDate": string;
    "status": "approved" | "partial" | "pending" | "inTransit" | "delivered";
    "priority": "high" | "medium" | "low";
    "progress": number;
    "items": number;
    "totalValue": number;
};