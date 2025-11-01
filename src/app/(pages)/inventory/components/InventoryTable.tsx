import React from "react";
import Image from "next/image";
import { 
  Table,
  Button,
  TableHeader,
  TableBody,
  TableColumn,
  Pagination,
  Tabs,
  Tab,
  TableRow,
  TableCell
} from "@heroui/react";
import { IInventoryList, IInventoryItem } from "@/types/domain/inventory";
export default function InventoryTable({ inventoryList }:{inventoryList:IInventoryList}) {
  console.log(inventoryList);
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
      <TableBody items={inventoryList}>
        {
          inventoryList?.map((inventoryItem:IInventoryItem)=>(
            <TableRow key={inventoryItem.id}>
              <TableCell>
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
              </TableCell>
            </TableRow>
          ))
        }
          
      </TableBody>
    </Table>
  );
}
