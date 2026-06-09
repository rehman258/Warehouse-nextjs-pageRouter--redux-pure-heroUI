/**
 * Domain model for WareFlow Pro.
 *
 * All data is seeded in `lib/seed.ts` and held in the Redux Toolkit store —
 * there is no backend. Replacing the seed + queries with a real API would not
 * require touching the UI.
 */

export type StockStatus = "inStock" | "lowStock" | "outOfStock";

export interface InventoryItem {
  id: number;
  sku: string;
  productName: string;
  category: string;
  stock: number;
  location: string;
  price: number;
  status: StockStatus;
}

export interface Category {
  id: number;
  code: string;
  name: string;
  description: string;
}

export interface StockStatusMeta {
  code: StockStatus;
  name: string;
}

export type OrderType = "inBound" | "outBound";
export type OrderStatus = "approved" | "partial" | "pending" | "inTransit" | "delivered";
export type OrderPriority = "high" | "medium" | "low";

export interface Order {
  id: string; // PO number
  type: OrderType;
  supplier: string;
  createdDate: string;
  expectedDate: string;
  status: OrderStatus;
  priority: OrderPriority;
  progress: number;
  items: number;
  totalValue: number;
}

export interface Supplier {
  id: number;
  name: string;
  contact: string;
  email: string;
  phone: string;
  location: string;
  products: number;
  rating: number;
  status: "active" | "inactive";
}

export type ActivityStatus = "completed" | "pending" | "warning";

export interface Activity {
  id: number;
  title: string;
  description: string;
  status: ActivityStatus;
  timeAgo: string;
  icon: string;
  iconBg: string;
}

export interface CapacityZone {
  id: number;
  zone: string;
  used: number;
  total: number;
  color: string;
}

export interface StockInterest {
  id: number;
  category: string;
  percentage: number;
  value: number;
  color: string;
}

export interface MonthlyFlow {
  months: string[];
  series: { name: string; data: number[] }[];
}

export interface Preferences {
  lowStockAlerts: boolean;
  orderNotifications: boolean;
  autoReorder: boolean;
  compactTables: boolean;
  emailDigest: boolean;
}

export interface AppNotification {
  id: number;
  title: string;
  detail: string;
  time: string;
  icon: string;
  iconBg: string;
  unread: boolean;
}

/** Payload from the inventory create/edit form before it becomes an item. */
export interface InventoryFormValues {
  sku: string;
  productName: string;
  category: string;
  stock: number;
  location: string;
  price: number;
}
