import { InventoryView } from "@/components/inventory/InventoryView";

export default async function InventoryItemsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  return <InventoryView initialSearch={q.toString()} />;
}
