"use client";

import {
  Button, Input, Pagination, Select, SelectItem, Tab, Tabs,
} from "@heroui/react";
import { Eye, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { deleteItem } from "@/store/slices/inventorySlice";
import { queryInventory } from "@/lib/queries";
import { formatCurrency, formatNumber } from "@/lib/format";
import type { InventoryItem, StockStatus } from "@/lib/types";
import { Panel } from "@/components/ui/Panel";
import { DataTable, type Column } from "@/components/ui/DataTable";
import { StockStatusChip } from "@/components/ui/StatusChips";
import { InventoryFormModal } from "./InventoryFormModal";
import { InventoryViewModal } from "./InventoryViewModal";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";

export function InventoryView({ initialSearch }: { initialSearch: string }) {
  const items = useAppSelector((s) => s.inventory.items);
  const categories = useAppSelector((s) => s.reference.categories);
  const statuses = useAppSelector((s) => s.reference.statuses);
  const dispatch = useAppDispatch();

  const [search, setSearch] = useState(initialSearch);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<StockStatus[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const [active, setActive] = useState<InventoryItem | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const result = useMemo(
    () =>
      queryInventory(items, {
        search,
        categories: selectedCategories,
        statuses: selectedStatuses,
        page,
        pageSize,
      }),
    [items, search, selectedCategories, selectedStatuses, page, pageSize],
  );

  const resetPage = () => setPage(1);

  const columns: Column<InventoryItem>[] = [
    { key: "sku", label: "SKU", render: (r) => <span className="font-medium">{r.sku}</span> },
    { key: "productName", label: "Product Name", render: (r) => r.productName },
    { key: "category", label: "Category", render: (r) => r.category },
    { key: "stock", label: "Stock", render: (r) => formatNumber(r.stock) },
    { key: "location", label: "Location", render: (r) => r.location },
    { key: "price", label: "Price", render: (r) => formatCurrency(r.price) },
    { key: "status", label: "Status", render: (r) => <StockStatusChip status={r.status} /> },
    {
      key: "actions",
      label: "Actions",
      align: "center",
      render: (r) => (
        <div className="flex justify-center">
          <Button isIconOnly size="sm" variant="light" aria-label="View" onPress={() => { setActive(r); setViewOpen(true); }}>
            <Eye className="h-4 w-4" />
          </Button>
          <Button isIconOnly size="sm" variant="light" aria-label="Edit" onPress={() => { setActive(r); setFormOpen(true); }}>
            <Pencil className="h-4 w-4" />
          </Button>
          <Button isIconOnly size="sm" variant="light" color="danger" aria-label="Delete" onPress={() => { setActive(r); setDeleteOpen(true); }}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <Panel className="flex flex-col gap-4 p-5 lg:flex-row lg:items-center lg:justify-between">
        <Input
          aria-label="Search inventory"
          className="lg:max-w-sm"
          size="sm"
          radius="md"
          value={search}
          onValueChange={(v) => { setSearch(v); resetPage(); }}
          placeholder="Search by name, SKU or location..."
          startContent={<Search className="h-4 w-4 text-default-400" />}
        />
        <div className="flex flex-wrap items-center gap-3">
          <Select
            aria-label="Filter by category"
            size="sm"
            selectionMode="multiple"
            placeholder="Categories"
            className="w-44"
            selectedKeys={new Set(selectedCategories)}
            onSelectionChange={(keys) => { setSelectedCategories(Array.from(keys as Set<string>)); resetPage(); }}
          >
            {categories.map((c) => (
              <SelectItem key={c.name}>{c.name}</SelectItem>
            ))}
          </Select>
          <Select
            aria-label="Filter by status"
            size="sm"
            selectionMode="multiple"
            placeholder="Status"
            className="w-40"
            selectedKeys={new Set(selectedStatuses)}
            onSelectionChange={(keys) => { setSelectedStatuses(Array.from(keys as Set<StockStatus>)); resetPage(); }}
          >
            {statuses.map((s) => (
              <SelectItem key={s.code}>{s.name}</SelectItem>
            ))}
          </Select>
          <Button color="primary" startContent={<Plus className="h-4 w-4" />} onPress={() => { setActive(null); setFormOpen(true); }}>
            Add Product
          </Button>
        </div>
      </Panel>

      <Panel className="p-5">
        <DataTable
          ariaLabel="Inventory items"
          columns={columns}
          rows={result.items}
          emptyContent="No items match your filters."
          bottomContent={
            <div className="flex flex-col items-center justify-between gap-4 pt-4 sm:flex-row">
              <span className="text-sm text-default-500">
                {result.total} item{result.total === 1 ? "" : "s"}
              </span>
              <div className="flex items-center gap-4">
                <Tabs
                  size="sm"
                  aria-label="Rows per page"
                  selectedKey={String(pageSize)}
                  onSelectionChange={(key) => { setPageSize(Number(key)); resetPage(); }}
                >
                  <Tab key="5" title="5" />
                  <Tab key="10" title="10" />
                  <Tab key="20" title="20" />
                </Tabs>
                <Pagination
                  isCompact
                  showControls
                  color="primary"
                  page={result.page}
                  total={result.totalPages}
                  onChange={setPage}
                />
              </div>
            </div>
          }
        />
      </Panel>

      <InventoryFormModal isOpen={formOpen} onOpenChange={setFormOpen} item={active} />
      <InventoryViewModal isOpen={viewOpen} onOpenChange={setViewOpen} item={active} />
      <ConfirmDialog
        isOpen={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Delete item"
        description={`Are you sure you want to delete "${active?.productName ?? ""}"? This cannot be undone.`}
        confirmLabel="Delete"
        onConfirm={() => active && dispatch(deleteItem(active.id))}
      />
    </div>
  );
}
