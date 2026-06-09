"use client";

import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/react";
import type { InventoryItem } from "@/lib/types";
import { formatCurrency, formatNumber } from "@/lib/format";
import { StockStatusChip } from "../ui/StatusChips";

export function InventoryViewModal({
  isOpen,
  onOpenChange,
  item,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  item: InventoryItem | null;
}) {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="lg" placement="center">
      <ModalContent>
        {(close) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <span>{item?.productName ?? "Item"}</span>
              <span className="text-sm font-normal text-default-500">{item?.sku}</span>
            </ModalHeader>
            <ModalBody>
              {item && (
                <dl className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                  <Field label="Category" value={item.category} />
                  <Field label="Location" value={item.location} />
                  <Field label="Unit Price" value={formatCurrency(item.price)} />
                  <Field label="In Stock" value={formatNumber(item.stock)} />
                  <Field label="Stock Value" value={formatCurrency(item.stock * item.price)} />
                  <div>
                    <dt className="text-xs text-default-500">Status</dt>
                    <dd className="mt-1">
                      <StockStatusChip status={item.status} />
                    </dd>
                  </div>
                </dl>
              )}
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onPress={close}>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs text-default-500">{label}</dt>
      <dd className="mt-1 font-medium">{value}</dd>
    </div>
  );
}
