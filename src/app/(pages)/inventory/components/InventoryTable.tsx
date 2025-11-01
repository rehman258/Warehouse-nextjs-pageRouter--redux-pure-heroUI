import React from "react";
import { 
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  Pagination,
  Tabs,
  Tab,
} from "@heroui/react";
import InventoryTableRow from "./InventoryTableRow";
import { IInventoryList, IInventoryItem } from "@/types/domain/inventory";
export default function InventoryTable({ inventoryList }:{inventoryList:IInventoryList}) {
  return (
    <Table 
      bottomContent={
        <div className="flex gap-6 justify-end mt-6">
          <Tabs className="">
            <Tab className="" title="1-5" value="1-5" />
            <Tab className="" title="1-10" value="1-10" />
            <Tab className="" title="1-20" value="1-20" />
          </Tabs>
          <Pagination
            isCompact
            showControls
            showShadow
            color="primary"
            page={1}
            total={10}
            // onChange={(page) => setPage(page)}
          />
        </div>
      }
      className=""
    >
      <TableHeader>
        <TableColumn className="max-w-[120px]">
          {"Sku"}
        </TableColumn>
        <TableColumn className="max-w-[120px]">
          {"Product Name"}
        </TableColumn>
        <TableColumn className="max-w-[120px]">
          {"Category"}
        </TableColumn>
        <TableColumn className="max-w-[120px]">
          {"Current Stock"}
        </TableColumn>
        <TableColumn className="max-w-[120px]">
          {"Location"}
        </TableColumn>
        <TableColumn className="max-w-[120px]">
          {"Price"}
        </TableColumn>
        <TableColumn className="max-w-[120px]">
          {"Status"}
        </TableColumn>
        <TableColumn className="text-center">
          {"Actions"}
        </TableColumn>
      </TableHeader>
      <TableBody>
        {
          inventoryList?.map((inventoryItem:IInventoryItem)=>(
            <InventoryTableRow
              key={inventoryItem.id}
              inventoryItem = {inventoryItem}
            />
          ))
        }
          
      </TableBody>
    </Table>
  );
}
