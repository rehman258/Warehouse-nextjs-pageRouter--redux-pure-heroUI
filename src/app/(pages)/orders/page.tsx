"use client";

import {
  Button, Chip, Input, Pagination, Progress, Select, SelectItem, Tab, Tabs,
} from "@heroui/react";
import { ArrowDownLeft, ArrowUpRight, Search, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { deleteOrder } from "@/store/slices/ordersSlice";
import { queryOrders } from "@/lib/queries";
import { formatCurrency } from "@/lib/format";
import type { Order, OrderStatus } from "@/lib/types";
import { Panel } from "@/components/ui/Panel";
import { DataTable, type Column } from "@/components/ui/DataTable";
import { OrderStatusChip, PriorityChip } from "@/components/ui/StatusChips";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";

const STATUS_OPTIONS = [
  { key: "all", label: "All Status" },
  { key: "pending", label: "Pending" },
  { key: "approved", label: "Approved" },
  { key: "partial", label: "Partial" },
  { key: "inTransit", label: "In Transit" },
  { key: "delivered", label: "Delivered" },
];

const PRIORITY_OPTIONS = [
  { key: "all", label: "All Priorities" },
  { key: "high", label: "High" },
  { key: "medium", label: "Medium" },
  { key: "low", label: "Low" },
];

export default function OrdersPage() {
  const orders = useAppSelector((s) => s.orders.items);
  const dispatch = useAppDispatch();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [active, setActive] = useState<Order | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const resetPage = () => setPage(1);
  const result = useMemo(
    () => queryOrders(orders, { search, status, priority, page, pageSize }),
    [orders, search, status, priority, page, pageSize],
  );

  const counts = useMemo(() => {
    const by = (s: OrderStatus) => orders.filter((o) => o.status === s).length;
    return { total: orders.length, pending: by("pending"), inTransit: by("inTransit"), delivered: by("delivered") };
  }, [orders]);

  const columns: Column<Order>[] = [
    { key: "id", label: "Order ID", render: (o) => <span className="font-medium">{o.id}</span> },
    {
      key: "type",
      label: "Type",
      render: (o) => (
        <Chip
          size="sm"
          variant="flat"
          color={o.type === "inBound" ? "success" : "primary"}
          startContent={o.type === "inBound" ? <ArrowDownLeft className="h-3 w-3" /> : <ArrowUpRight className="h-3 w-3" />}
        >
          {o.type === "inBound" ? "Inbound" : "Outbound"}
        </Chip>
      ),
    },
    { key: "supplier", label: "Supplier", render: (o) => o.supplier },
    { key: "expectedDate", label: "Expected", render: (o) => o.expectedDate },
    { key: "status", label: "Status", render: (o) => <OrderStatusChip status={o.status} /> },
    { key: "priority", label: "Priority", render: (o) => <PriorityChip priority={o.priority} /> },
    {
      key: "progress",
      label: "Progress",
      render: (o) => (
        <div className="flex w-28 items-center gap-2">
          <Progress aria-label="progress" size="sm" value={o.progress} color="secondary" className="max-w-16" />
          <span className="text-xs text-default-500">{o.progress}%</span>
        </div>
      ),
    },
    { key: "totalValue", label: "Total", render: (o) => <span className="font-medium">{formatCurrency(o.totalValue)}</span> },
    {
      key: "actions",
      label: "Actions",
      align: "center",
      render: (o) => (
        <Button isIconOnly size="sm" variant="light" color="danger" aria-label="Delete" onPress={() => { setActive(o); setDeleteOpen(true); }}>
          <Trash2 className="h-4 w-4" />
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Summary label="Total Orders" value={counts.total} color="text-foreground" />
        <Summary label="Pending" value={counts.pending} color="text-default-500" />
        <Summary label="In Transit" value={counts.inTransit} color="text-primary" />
        <Summary label="Delivered" value={counts.delivered} color="text-green-600" />
      </div>

      <Panel className="flex flex-col gap-4 p-5 lg:flex-row lg:items-center lg:justify-between">
        <Input
          aria-label="Search orders"
          className="lg:max-w-sm"
          size="sm"
          value={search}
          onValueChange={(v) => { setSearch(v); resetPage(); }}
          placeholder="Search by order ID or supplier..."
          startContent={<Search className="h-4 w-4 text-default-400" />}
        />
        <div className="flex flex-wrap gap-3">
          <Select
            aria-label="Status"
            size="sm"
            className="w-40"
            selectedKeys={[status || "all"]}
            onSelectionChange={(keys) => {
              const key = String(Array.from(keys)[0] ?? "all");
              setStatus(key === "all" ? "" : key);
              resetPage();
            }}
          >
            {STATUS_OPTIONS.map((o) => (
              <SelectItem key={o.key}>{o.label}</SelectItem>
            ))}
          </Select>
          <Select
            aria-label="Priority"
            size="sm"
            className="w-40"
            selectedKeys={[priority || "all"]}
            onSelectionChange={(keys) => {
              const key = String(Array.from(keys)[0] ?? "all");
              setPriority(key === "all" ? "" : key);
              resetPage();
            }}
          >
            {PRIORITY_OPTIONS.map((o) => (
              <SelectItem key={o.key}>{o.label}</SelectItem>
            ))}
          </Select>
        </div>
      </Panel>

      <Panel className="p-5">
        <DataTable
          ariaLabel="Orders"
          columns={columns}
          rows={result.items}
          emptyContent="No orders match your filters."
          bottomContent={
            <div className="flex flex-col items-center justify-between gap-4 pt-4 sm:flex-row">
              <span className="text-sm text-default-500">{result.total} orders</span>
              <div className="flex items-center gap-4">
                <Tabs
                  size="sm"
                  aria-label="Rows per page"
                  selectedKey={String(pageSize)}
                  onSelectionChange={(key) => { setPageSize(Number(key)); resetPage(); }}
                >
                  <Tab key="6" title="6" />
                  <Tab key="10" title="10" />
                  <Tab key="20" title="20" />
                </Tabs>
                <Pagination isCompact showControls color="primary" page={result.page} total={result.totalPages} onChange={setPage} />
              </div>
            </div>
          }
        />
      </Panel>

      <ConfirmDialog
        isOpen={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Delete order"
        description={`Delete order ${active?.id ?? ""}? This cannot be undone.`}
        confirmLabel="Delete"
        onConfirm={() => active && dispatch(deleteOrder(active.id))}
      />
    </div>
  );
}

function Summary({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <Panel className="p-4">
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
      <p className="mt-1 text-sm text-default-500">{label}</p>
    </Panel>
  );
}
