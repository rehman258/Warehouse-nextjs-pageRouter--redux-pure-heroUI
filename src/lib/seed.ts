import type {
  Activity, AppNotification, CapacityZone, Category, InventoryItem, MonthlyFlow,
  Order, Preferences, StockInterest, StockStatus, StockStatusMeta, Supplier,
} from "./types";

/** Single source of truth for an item's stock status. */
export function statusFromStock(stock: number): StockStatus {
  if (stock <= 0) return "outOfStock";
  if (stock <= 10) return "lowStock";
  return "inStock";
}

const item = (
  id: number, sku: string, productName: string, category: string,
  stock: number, location: string, price: number,
): InventoryItem => ({
  id, sku, productName, category, stock, location, price, status: statusFromStock(stock),
});

export const CATEGORIES: Category[] = [
  { id: 1, code: "electronics", name: "Electronics", description: "Devices, audio and accessories" },
  { id: 2, code: "sports", name: "Sports", description: "Sportswear and equipment" },
  { id: 3, code: "furniture", name: "Furniture", description: "Office and home furniture" },
  { id: 4, code: "home-garden", name: "Home & Garden", description: "Kitchen, décor and garden" },
  { id: 5, code: "apparel", name: "Apparel", description: "Clothing and accessories" },
  { id: 6, code: "tools", name: "Tools", description: "Hand and power tools" },
  { id: 7, code: "office", name: "Office", description: "Stationery and supplies" },
  { id: 8, code: "toys", name: "Toys", description: "Toys and games" },
];

export const STATUSES: StockStatusMeta[] = [
  { code: "inStock", name: "In Stock" },
  { code: "lowStock", name: "Low Stock" },
  { code: "outOfStock", name: "Out of Stock" },
];

export const INVENTORY: InventoryItem[] = [
  item(1, "SKU-001", "Wireless Headphones", "Electronics", 45, "A1-B2", 99.99),
  item(2, "SKU-002", "Running Shoes", "Sports", 8, "C3-D1", 79.99),
  item(3, "SKU-003", "Office Chair", "Furniture", 0, "E2-F1", 249.99),
  item(4, "SKU-004", "Laptop Stand", "Electronics", 23, "A2-B1", 49.99),
  item(5, "SKU-005", "Coffee Mug", "Home & Garden", 67, "B1-C2", 12.99),
  item(6, "SKU-006", "Smartphone Case", "Electronics", 12, "A1-B3", 24.99),
  item(7, "SKU-007", "Yoga Mat", "Sports", 34, "C2-D3", 29.99),
  item(8, "SKU-008", "Standing Desk", "Furniture", 6, "E1-F2", 399.99),
  item(9, "SKU-009", "LED Desk Lamp", "Home & Garden", 52, "B2-C1", 34.99),
  item(10, "SKU-010", "Mechanical Keyboard", "Electronics", 0, "A3-B1", 119.99),
  item(11, "SKU-011", "Dumbbell Set", "Sports", 18, "C1-D2", 149.99),
  item(12, "SKU-012", "Bookshelf", "Furniture", 9, "E3-F2", 179.99),
  item(13, "SKU-013", "Cotton T-Shirt", "Apparel", 120, "G1-H1", 19.99),
  item(14, "SKU-014", "Leather Wallet", "Apparel", 41, "G2-H1", 39.99),
  item(15, "SKU-015", "Cordless Drill", "Tools", 14, "I1-J2", 89.99),
  item(16, "SKU-016", "Screwdriver Kit", "Tools", 73, "I2-J1", 24.99),
  item(17, "SKU-017", "Notebook A5", "Office", 240, "K1-L1", 4.99),
  item(18, "SKU-018", "Ballpoint Pens (50)", "Office", 5, "K2-L1", 9.99),
  item(19, "SKU-019", "Building Blocks", "Toys", 33, "M1-N1", 29.99),
  item(20, "SKU-020", "RC Car", "Toys", 0, "M2-N1", 59.99),
  item(21, "SKU-021", "Bluetooth Speaker", "Electronics", 27, "A2-B3", 64.99),
  item(22, "SKU-022", "Garden Hose 50ft", "Home & Garden", 16, "B3-C2", 27.99),
  item(23, "SKU-023", "Hiking Backpack", "Sports", 22, "C3-D2", 89.99),
  item(24, "SKU-024", "Filing Cabinet", "Furniture", 4, "E2-F3", 129.99),
  item(25, "SKU-025", "Winter Jacket", "Apparel", 38, "G1-H2", 119.99),
  item(26, "SKU-026", "Hammer", "Tools", 61, "I1-J1", 14.99),
  item(27, "SKU-027", "Sticky Notes (12)", "Office", 95, "K1-L2", 7.49),
  item(28, "SKU-028", "Plush Teddy Bear", "Toys", 7, "M1-N2", 22.99),
  item(29, "SKU-029", "4K Webcam", "Electronics", 19, "A3-B2", 84.99),
  item(30, "SKU-030", "Desk Organizer", "Office", 48, "K2-L2", 18.99),
];

export const ORDERS: Order[] = [
  { id: "PO-2024-001", type: "inBound", supplier: "TechCorp Solutions", createdDate: "2024-01-15", expectedDate: "2024-01-25", status: "delivered", priority: "high", progress: 100, items: 3, totalValue: 12500 },
  { id: "PO-2024-002", type: "outBound", supplier: "FurniCo Ltd", createdDate: "2024-01-18", expectedDate: "2024-01-28", status: "inTransit", priority: "medium", progress: 75, items: 5, totalValue: 8750 },
  { id: "PO-2024-003", type: "outBound", supplier: "Office Supplies Inc", createdDate: "2024-01-20", expectedDate: "2024-01-30", status: "pending", priority: "low", progress: 0, items: 12, totalValue: 3200 },
  { id: "PO-2024-004", type: "inBound", supplier: "ElectroWorld", createdDate: "2024-01-19", expectedDate: "2024-01-29", status: "approved", priority: "high", progress: 25, items: 8, totalValue: 15600 },
  { id: "PO-2024-005", type: "outBound", supplier: "BagWorld Enterprises", createdDate: "2024-01-17", expectedDate: "2024-01-27", status: "partial", priority: "medium", progress: 50, items: 6, totalValue: 5400 },
  { id: "PO-2024-006", type: "inBound", supplier: "SportsGear Co", createdDate: "2024-01-22", expectedDate: "2024-02-01", status: "inTransit", priority: "medium", progress: 60, items: 9, totalValue: 7300 },
  { id: "PO-2024-007", type: "inBound", supplier: "ToolMasters", createdDate: "2024-01-23", expectedDate: "2024-02-03", status: "approved", priority: "low", progress: 20, items: 4, totalValue: 2100 },
  { id: "PO-2024-008", type: "outBound", supplier: "HomeStyle Depot", createdDate: "2024-01-21", expectedDate: "2024-01-31", status: "delivered", priority: "high", progress: 100, items: 7, totalValue: 9800 },
  { id: "PO-2024-009", type: "outBound", supplier: "Apparel Hub", createdDate: "2024-01-24", expectedDate: "2024-02-04", status: "pending", priority: "low", progress: 0, items: 15, totalValue: 4500 },
  { id: "PO-2024-010", type: "inBound", supplier: "TechCorp Solutions", createdDate: "2024-01-25", expectedDate: "2024-02-05", status: "inTransit", priority: "high", progress: 80, items: 6, totalValue: 13200 },
  { id: "PO-2024-011", type: "inBound", supplier: "ToyTown Imports", createdDate: "2024-01-26", expectedDate: "2024-02-06", status: "partial", priority: "medium", progress: 40, items: 10, totalValue: 3900 },
  { id: "PO-2024-012", type: "outBound", supplier: "Office Supplies Inc", createdDate: "2024-01-27", expectedDate: "2024-02-07", status: "approved", priority: "low", progress: 15, items: 20, totalValue: 2750 },
];

export const SUPPLIERS: Supplier[] = [
  { id: 1, name: "TechCorp Solutions", contact: "Daniel Reeve", email: "sales@techcorp.com", phone: "+1 415 555 0110", location: "San Francisco, US", products: 42, rating: 4.8, status: "active" },
  { id: 2, name: "FurniCo Ltd", contact: "Mia Holland", email: "orders@furnico.com", phone: "+44 20 7946 0991", location: "London, UK", products: 28, rating: 4.5, status: "active" },
  { id: 3, name: "Office Supplies Inc", contact: "Greg Park", email: "hello@officesupplies.com", phone: "+1 212 555 0144", location: "New York, US", products: 65, rating: 4.6, status: "active" },
  { id: 4, name: "ElectroWorld", contact: "Aylin Demir", email: "b2b@electroworld.com", phone: "+49 30 5557 220", location: "Berlin, DE", products: 51, rating: 4.7, status: "active" },
  { id: 5, name: "SportsGear Co", contact: "Lucas Pereira", email: "supply@sportsgear.com", phone: "+55 11 5555 7788", location: "São Paulo, BR", products: 33, rating: 4.3, status: "active" },
  { id: 6, name: "ToolMasters", contact: "Hannah West", email: "team@toolmasters.com", phone: "+1 312 555 0190", location: "Chicago, US", products: 24, rating: 4.4, status: "inactive" },
  { id: 7, name: "HomeStyle Depot", contact: "Kenji Suzuki", email: "wholesale@homestyle.com", phone: "+81 3 5555 2210", location: "Tokyo, JP", products: 47, rating: 4.6, status: "active" },
  { id: 8, name: "Apparel Hub", contact: "Sofia Marino", email: "buy@apparelhub.com", phone: "+39 02 5555 8841", location: "Milan, IT", products: 39, rating: 4.2, status: "inactive" },
];

export const ACTIVITIES: Activity[] = [
  { id: 1, title: "Stock received", description: "120 units of Cotton T-Shirt added to G1-H1", status: "completed", timeAgo: "12 min ago", icon: "PackageCheck", iconBg: "bg-green-100 text-green-600" },
  { id: 2, title: "Low stock alert", description: "Ballpoint Pens (50) dropped below threshold", status: "warning", timeAgo: "48 min ago", icon: "TriangleAlert", iconBg: "bg-amber-100 text-amber-600" },
  { id: 3, title: "Order shipped", description: "PO-2024-002 is now in transit", status: "pending", timeAgo: "2 hrs ago", icon: "Truck", iconBg: "bg-blue-100 text-blue-600" },
  { id: 4, title: "Out of stock", description: "Office Chair is out of stock at E2-F1", status: "warning", timeAgo: "5 hrs ago", icon: "PackageX", iconBg: "bg-red-100 text-red-600" },
  { id: 5, title: "Cycle count done", description: "Zone A inventory reconciled — 0 discrepancies", status: "completed", timeAgo: "Yesterday", icon: "ClipboardCheck", iconBg: "bg-green-100 text-green-600" },
  { id: 6, title: "New supplier added", description: "ToyTown Imports onboarded successfully", status: "completed", timeAgo: "Yesterday", icon: "Building2", iconBg: "bg-violet-100 text-violet-600" },
];

export const CAPACITY_ZONES: CapacityZone[] = [
  { id: 1, zone: "Zone A — Electronics", used: 820, total: 1000, color: "#3b82f6" },
  { id: 2, zone: "Zone B — Home & Garden", used: 540, total: 900, color: "#10b981" },
  { id: 3, zone: "Zone C — Sports", used: 670, total: 750, color: "#f59e0b" },
  { id: 4, zone: "Zone E — Furniture", used: 300, total: 600, color: "#8b5cf6" },
  { id: 5, zone: "Zone K — Office", used: 410, total: 500, color: "#ec4899" },
];

export const STOCK_INTERESTS: StockInterest[] = [
  { id: 1, category: "Electronics", percentage: 28, value: 142000, color: "#3b82f6" },
  { id: 2, category: "Furniture", percentage: 22, value: 110500, color: "#8b5cf6" },
  { id: 3, category: "Sports", percentage: 18, value: 89000, color: "#f59e0b" },
  { id: 4, category: "Apparel", percentage: 16, value: 78500, color: "#10b981" },
  { id: 5, category: "Tools", percentage: 9, value: 44000, color: "#ec4899" },
  { id: 6, category: "Office", percentage: 7, value: 33500, color: "#06b6d4" },
];

export const MONTHLY_FLOW: MonthlyFlow = {
  months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  series: [
    { name: "Inbound", data: [320, 410, 380, 460, 520, 490, 540, 600, 560, 610, 670, 720] },
    { name: "Outbound", data: [280, 350, 330, 420, 470, 440, 500, 540, 520, 560, 600, 650] },
  ],
};

export const NOTIFICATIONS: AppNotification[] = [
  { id: 1, title: "Low stock", detail: "5 items are below their reorder point", time: "10m ago", icon: "TriangleAlert", iconBg: "bg-amber-100 text-amber-600", unread: true },
  { id: 2, title: "Order delivered", detail: "PO-2024-001 was delivered", time: "1h ago", icon: "PackageCheck", iconBg: "bg-green-100 text-green-600", unread: true },
  { id: 3, title: "New order", detail: "PO-2024-012 created by Office Supplies Inc", time: "3h ago", icon: "ShoppingCart", iconBg: "bg-blue-100 text-blue-600", unread: false },
  { id: 4, title: "Capacity warning", detail: "Zone C is at 89% utilization", time: "1d ago", icon: "Warehouse", iconBg: "bg-violet-100 text-violet-600", unread: false },
];

export const PREFERENCES: Preferences = {
  lowStockAlerts: true,
  orderNotifications: true,
  autoReorder: false,
  compactTables: false,
  emailDigest: true,
};
