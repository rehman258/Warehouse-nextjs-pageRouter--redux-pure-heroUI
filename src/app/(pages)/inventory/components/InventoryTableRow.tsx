import React from "react";
// import Image from "next/image";
import { 
  // Button,
  TableRow,
  TableCell, 
} from "@heroui/react";
import { IInventoryItem } from "@/types/domain/inventory";

export default function InventoryTableRow({ inventoryItem }:{inventoryItem:IInventoryItem}) {
  return (
    <TableRow >
      <TableCell>{"Content"}</TableCell>
      <TableCell>{"Content"}</TableCell>
      <TableCell>{"Content"}</TableCell>
      <TableCell>{"Content"}</TableCell>
      <TableCell>{"Content"}</TableCell>
      <TableCell>{"Content"}</TableCell>
      <TableCell>{"Content"}</TableCell>
      <TableCell>{"Content"}</TableCell>
      {/* <TableCell>
        {inventoryItem.sku}
      </TableCell>
      <TableCell>
        {inventoryItem.productName}
      </TableCell>
      <TableCell>
        {inventoryItem.category}
      </TableCell>
      <TableCell>
        {inventoryItem.stock}
      </TableCell>
      <TableCell>
        {inventoryItem.location}
      </TableCell>
      <TableCell>
        {inventoryItem.price}
      </TableCell>
      <TableCell>
        <span className=
          {` p-1 px-2 gap-1 font-bold text-[11px] flex rounded-lg justify-self-start
                        ${inventoryItem.status === "inStock" ? "bg-green-100 text-green-800" : 
      inventoryItem.status === "lowStock" ? "bg-yellow-100 text-yellow-800" :
        "bg-red-500 text-white"
    }  
                  `}>
          <Image
            alt="stock status icon"
            height={15}
            src={`/icons/${inventoryItem.status}.svg`}
            width={15}
          />
          {
            inventoryItem.status === "inStock" ? "in stock" : 
              inventoryItem.status === "lowStock" ? 
                "low stock" : "out of stock"
          }
        </span>
      </TableCell>
      <TableCell className="text-center">
        <Button isIconOnly className="bg-transparent">
          <Image
            alt="table action icon"
            height={22}
            src={"/icons/view.svg"}
            width={22}
          />
        </Button>
        <Button isIconOnly className="bg-transparent">
          <Image
            alt="table action icon"
            height={22}
            src={"/icons/edit.svg"}
            width={22}
          />
        </Button>
        <Button isIconOnly className="bg-transparent">
          <Image
            alt="table action icon"
            height={22}
            src={"/icons/delete.svg"}
            width={22}
          />
        </Button>
      </TableCell> */}
    </TableRow>
  );
}
