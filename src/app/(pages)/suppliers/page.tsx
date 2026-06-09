"use client";

import { Chip, Input, Pagination } from "@heroui/react";
import { Search, Star } from "lucide-react";
import { useMemo, useState } from "react";
import { useAppSelector } from "@/store/hooks";
import { formatNumber } from "@/lib/format";
import type { Supplier } from "@/lib/types";
import { Panel } from "@/components/ui/Panel";
import { StatCard } from "@/components/ui/StatCard";
import { DataTable, type Column } from "@/components/ui/DataTable";

const PAGE_SIZE = 6;

export default function SuppliersPage() {
  const suppliers = useAppSelector((s) => s.reference.suppliers);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const stats = useMemo(() => {
    const total = suppliers.length;
    const active = suppliers.filter((s) => s.status === "active").length;
    const products = suppliers.reduce((sum, s) => sum + s.products, 0);
    const avgRating = total
      ? suppliers.reduce((sum, s) => sum + s.rating, 0) / total
      : 0;
    return { total, active, products, avgRating };
  }, [suppliers]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return suppliers;
    return suppliers.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.contact.toLowerCase().includes(q) ||
        s.location.toLowerCase().includes(q),
    );
  }, [suppliers, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageRows = useMemo(
    () => filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE),
    [filtered, currentPage],
  );

  const columns: Column<Supplier>[] = [
    {
      key: "supplier",
      label: "Supplier",
      render: (s) => (
        <div>
          <p className="font-semibold">{s.name}</p>
          <p className="text-sm text-default-500">{s.contact}</p>
        </div>
      ),
    },
    { key: "location", label: "Location", render: (s) => s.location },
    {
      key: "email",
      label: "Email",
      render: (s) => (
        <a href={`mailto:${s.email}`} className="text-primary hover:underline">
          {s.email}
        </a>
      ),
    },
    {
      key: "phone",
      label: "Phone",
      render: (s) => <span className="text-default-500">{s.phone}</span>,
    },
    {
      key: "products",
      label: "Products",
      align: "end",
      render: (s) => <span className="font-medium">{formatNumber(s.products)}</span>,
    },
    {
      key: "rating",
      label: "Rating",
      render: (s) => (
        <span className="inline-flex items-center gap-1 font-medium">
          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
          {s.rating.toFixed(1)}
        </span>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (s) => (
        <Chip
          size="sm"
          variant="flat"
          color={s.status === "active" ? "success" : "default"}
        >
          {s.status === "active" ? "Active" : "Inactive"}
        </Chip>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Suppliers</h1>
        <p className="mt-1 text-sm text-default-500">
          Manage your supplier network and partner relationships.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total Suppliers"
          value={formatNumber(stats.total)}
          icon="Building2"
          iconBg="bg-blue-100 text-blue-600"
        />
        <StatCard
          label="Active Suppliers"
          value={formatNumber(stats.active)}
          icon="CheckCircle2"
          iconBg="bg-green-100 text-green-600"
        />
        <StatCard
          label="Products Supplied"
          value={formatNumber(stats.products)}
          icon="Package"
          iconBg="bg-purple-100 text-purple-600"
        />
        <StatCard
          label="Avg Rating"
          value={stats.avgRating.toFixed(1)}
          icon="Star"
          iconBg="bg-amber-100 text-amber-600"
        />
      </div>

      <Panel className="p-5">
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <Input
            aria-label="Search suppliers"
            className="sm:max-w-sm"
            size="sm"
            value={search}
            onValueChange={(v) => {
              setSearch(v);
              setPage(1);
            }}
            placeholder="Search by name, contact or location..."
            startContent={<Search className="h-4 w-4 text-default-400" />}
            isClearable
            onClear={() => {
              setSearch("");
              setPage(1);
            }}
          />
          <span className="text-sm text-default-500">
            {formatNumber(filtered.length)} of {formatNumber(suppliers.length)} suppliers
          </span>
        </div>

        <DataTable
          ariaLabel="Suppliers"
          columns={columns}
          rows={pageRows}
          emptyContent="No suppliers match your search."
          bottomContent={
            totalPages > 1 ? (
              <div className="flex justify-center pt-4">
                <Pagination
                  isCompact
                  showControls
                  color="primary"
                  page={currentPage}
                  total={totalPages}
                  onChange={setPage}
                />
              </div>
            ) : null
          }
        />
      </Panel>
    </div>
  );
}
