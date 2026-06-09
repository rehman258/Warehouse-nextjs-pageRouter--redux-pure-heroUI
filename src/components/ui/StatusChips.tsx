import { Chip } from "@heroui/react";
import type { OrderPriority, OrderStatus, StockStatus } from "@/lib/types";
import { orderStatusLabel, stockStatusLabel, titleCase } from "@/lib/format";

type ChipColor = "default" | "primary" | "secondary" | "success" | "warning" | "danger";

const STOCK_COLOR: Record<StockStatus, ChipColor> = {
  inStock: "success",
  lowStock: "warning",
  outOfStock: "danger",
};

export function StockStatusChip({ status }: { status: StockStatus }) {
  return (
    <Chip size="sm" variant="flat" color={STOCK_COLOR[status]}>
      {stockStatusLabel(status)}
    </Chip>
  );
}

const ORDER_COLOR: Record<OrderStatus, ChipColor> = {
  delivered: "success",
  inTransit: "primary",
  approved: "secondary",
  partial: "warning",
  pending: "default",
};

export function OrderStatusChip({ status }: { status: OrderStatus }) {
  return (
    <Chip size="sm" variant="flat" color={ORDER_COLOR[status]}>
      {orderStatusLabel(status)}
    </Chip>
  );
}

const PRIORITY_COLOR: Record<OrderPriority, ChipColor> = {
  high: "danger",
  medium: "warning",
  low: "default",
};

export function PriorityChip({ priority }: { priority: OrderPriority }) {
  return (
    <Chip size="sm" variant="dot" color={PRIORITY_COLOR[priority]}>
      {titleCase(priority)}
    </Chip>
  );
}
