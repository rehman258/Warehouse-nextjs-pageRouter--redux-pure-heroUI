"use client";

import {
  Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,
} from "@heroui/react";
import type { ReactNode } from "react";

export interface Column<T> {
  key: string;
  label: string;
  render: (row: T) => ReactNode;
  align?: "start" | "center" | "end";
}

/**
 * Thin, correctly-typed wrapper around HeroUI's Table using its dynamic
 * collection API. Pages pass already-paginated rows and an optional footer.
 */
export function DataTable<T extends { id: string | number }>({
  columns,
  rows,
  ariaLabel,
  emptyContent = "No records found.",
  bottomContent,
}: {
  columns: Column<T>[];
  rows: T[];
  ariaLabel: string;
  emptyContent?: ReactNode;
  bottomContent?: ReactNode;
}) {
  return (
    <Table aria-label={ariaLabel} removeWrapper bottomContent={bottomContent}>
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.key} align={column.align ?? "start"}>
            {column.label}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={rows} emptyContent={emptyContent}>
        {(row) => (
          <TableRow key={row.id}>
            {(columnKey) => (
              <TableCell>
                {columns.find((c) => c.key === columnKey)?.render(row)}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
