import type { InventoryItem, Order, StockStatus } from "./types";

/** Pure client-side filtering/pagination — the app's "query layer". */

export interface Page<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface InventoryQuery {
  search?: string;
  categories?: string[];
  statuses?: StockStatus[];
  page?: number;
  pageSize?: number;
}

export function queryInventory(items: InventoryItem[], query: InventoryQuery = {}): Page<InventoryItem> {
  const { search = "", categories = [], statuses = [], page = 1, pageSize = 5 } = query;
  const term = search.trim().toLowerCase();

  const filtered = items.filter((it) => {
    const matchesSearch =
      !term ||
      it.productName.toLowerCase().includes(term) ||
      it.sku.toLowerCase().includes(term) ||
      it.location.toLowerCase().includes(term) ||
      it.category.toLowerCase().includes(term);
    const matchesCategory = categories.length === 0 || categories.includes(it.category);
    const matchesStatus = statuses.length === 0 || statuses.includes(it.status);
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return paginate(filtered, page, pageSize);
}

export interface OrderQuery {
  search?: string;
  status?: string; // "" = all
  priority?: string; // "" = all
  page?: number;
  pageSize?: number;
}

export function queryOrders(orders: Order[], query: OrderQuery = {}): Page<Order> {
  const { search = "", status = "", priority = "", page = 1, pageSize = 6 } = query;
  const term = search.trim().toLowerCase();

  const filtered = orders.filter((o) => {
    const matchesSearch =
      !term || o.id.toLowerCase().includes(term) || o.supplier.toLowerCase().includes(term);
    const matchesStatus = !status || o.status === status;
    const matchesPriority = !priority || o.priority === priority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  return paginate(filtered, page, pageSize);
}

function paginate<T>(rows: T[], page: number, pageSize: number): Page<T> {
  const total = rows.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * pageSize;
  return {
    items: rows.slice(start, start + pageSize),
    total,
    page: safePage,
    pageSize,
    totalPages,
  };
}
