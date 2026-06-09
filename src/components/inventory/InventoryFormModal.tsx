"use client";

import {
  Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem,
} from "@heroui/react";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addItem, updateItem } from "@/store/slices/inventorySlice";
import type { InventoryItem } from "@/lib/types";

interface FormState {
  sku: string;
  productName: string;
  category: string;
  stock: string;
  location: string;
  price: string;
}

const EMPTY: FormState = { sku: "", productName: "", category: "", stock: "", location: "", price: "" };

function toForm(item: InventoryItem): FormState {
  return {
    sku: item.sku,
    productName: item.productName,
    category: item.category,
    stock: String(item.stock),
    location: item.location,
    price: String(item.price),
  };
}

export function InventoryFormModal({
  isOpen,
  onOpenChange,
  item,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  item: InventoryItem | null;
}) {
  const categories = useAppSelector((s) => s.reference.categories);
  const dispatch = useAppDispatch();
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});

  // Sync the form to the selected item each time the modal opens. The modal
  // stays mounted (HeroUI), so this prop->state sync is intentional.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (isOpen) {
      setForm(item ? toForm(item) : EMPTY);
      setErrors({});
    }
  }, [isOpen, item]);
  /* eslint-enable react-hooks/set-state-in-effect */

  const set = (key: keyof FormState, value: string) => setForm((f) => ({ ...f, [key]: value }));

  const validate = () => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (form.sku.trim().length < 2) next.sku = "SKU is required";
    if (form.productName.trim().length < 2) next.productName = "Product name is required";
    if (!form.category) next.category = "Select a category";
    if (form.location.trim().length < 1) next.location = "Location is required";
    const stock = Number(form.stock);
    if (form.stock === "" || Number.isNaN(stock) || stock < 0) next.stock = "Enter a valid stock count";
    const price = Number(form.price);
    if (form.price === "" || Number.isNaN(price) || price <= 0) next.price = "Enter a valid price";
    return next;
  };

  const submit = (close: () => void) => {
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    const values = {
      sku: form.sku.trim(),
      productName: form.productName.trim(),
      category: form.category,
      stock: Number(form.stock),
      location: form.location.trim(),
      price: Number(form.price),
    };

    if (item) dispatch(updateItem({ id: item.id, values }));
    else dispatch(addItem(values));
    close();
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="lg" placement="center">
      <ModalContent>
        {(close) => (
          <>
            <ModalHeader>{item ? "Edit inventory item" : "Add inventory item"}</ModalHeader>
            <ModalBody className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input
                label="SKU"
                value={form.sku}
                onValueChange={(v) => set("sku", v)}
                isInvalid={!!errors.sku}
                errorMessage={errors.sku}
              />
              <Input
                label="Product name"
                value={form.productName}
                onValueChange={(v) => set("productName", v)}
                isInvalid={!!errors.productName}
                errorMessage={errors.productName}
              />
              <Select
                label="Category"
                selectedKeys={form.category ? [form.category] : []}
                onSelectionChange={(keys) => set("category", String(Array.from(keys)[0] ?? ""))}
                isInvalid={!!errors.category}
                errorMessage={errors.category}
              >
                {categories.map((c) => (
                  <SelectItem key={c.name}>{c.name}</SelectItem>
                ))}
              </Select>
              <Input
                label="Location"
                value={form.location}
                onValueChange={(v) => set("location", v)}
                isInvalid={!!errors.location}
                errorMessage={errors.location}
              />
              <Input
                type="number"
                label="Stock"
                value={form.stock}
                onValueChange={(v) => set("stock", v)}
                isInvalid={!!errors.stock}
                errorMessage={errors.stock}
              />
              <Input
                type="number"
                label="Price"
                startContent={<span className="text-default-400">$</span>}
                value={form.price}
                onValueChange={(v) => set("price", v)}
                isInvalid={!!errors.price}
                errorMessage={errors.price}
              />
            </ModalBody>
            <ModalFooter>
              <Button variant="flat" onPress={close}>
                Cancel
              </Button>
              <Button color="primary" onPress={() => submit(close)}>
                {item ? "Save changes" : "Add item"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
