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

import { IPagination } from "@/types/models/pagination";
export default function CustomTableComponent<T extends {id:number}>({ 
  list,
  pagination,
  paginationHandler,
  pageSizeHandler,
  tableKeys,
  actionsController,
}:{
  paginationHandler:(_val:number) => void; 
  pageSizeHandler:(_val:unknown) => void;
  list:T[];
  pagination:IPagination;
  actionsController?: {
    viewHandler: (_id:number) => void,
    editHandler: (_id:number) => void,
    deleteHandler: (_id:number) => void,
  },
  tableKeys:{
    headerKeys:string[];
    bodyKeys:(keyof T)[]
  };
}) {
  // console.log(
  // tableKeys.bodyKeys.map((item)=><div key={item}>{item}</div>)
  // );
  return (
    <Table 
      bottomContent={
        <div className="flex gap-6 justify-end mt-6">
          <Tabs className="" onSelectionChange={pageSizeHandler}>
            <Tab key={"5"} title="5" value="5" />
            <Tab key={"10"} title="10" value="10"/>
            <Tab key={"20"} title="20" value="20"/>
          </Tabs>
          <Pagination
            isCompact
            showControls
            showShadow
            color="primary"
            page={pagination.currentPage}
            total={pagination.totalPages}
            onChange={paginationHandler}
          />
        </div>
      }
      className=""
    >
      <TableHeader>
        <>
          {
            tableKeys.headerKeys.length && 
          tableKeys.headerKeys.map((headerItem:string)=>(
            <TableColumn key={headerItem} className="max-w-[120px]">
              {headerItem}
            </TableColumn>
          ))
          }
        </>
      </TableHeader>
      <TableBody items={list}>
        {
          list.map((item:T)=>(
            <TableRow key={item.id}>
              {
                tableKeys.bodyKeys.map((bodyKeyItem:(keyof T), i)=>(
                  bodyKeyItem === "status" ? 
                    <TableCell 
                      key={i} 
                      className={` p-1 px-2 gap-1 font-bold text-[11px] flex rounded-lg justify-self-start
                        ${item[bodyKeyItem] === "inStock" ? "bg-green-100 text-green-800" : 
                        item[bodyKeyItem] === "lowStock" ? "bg-yellow-100 text-yellow-800" :
                          "bg-red-500 text-white"
                        }  
                    `}
                    >
                      {String(item[bodyKeyItem]) ?? ""}
                    </TableCell>:
                    <TableCell key={i}>
                      {String(item[bodyKeyItem]) ?? ""}
                    </TableCell>
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                )) as any
              }
              <TableCell key={"aaa"}>
                <Button isIconOnly className="bg-transparent"
                  onPress={()=>actionsController?.viewHandler(item.id)}
                >
                  <Image
                    alt="table action icon"
                    height={22}
                    src={"/icons/view.svg"}
                    width={22}
                  />
                </Button>
                <Button isIconOnly className="bg-transparent"
                  onPress={()=>actionsController?.editHandler(item.id)}>
                  <Image
                    alt="table action icon"
                    height={22}
                    src={"/icons/edit.svg"}
                    width={22}
                  />
                </Button>
                <Button isIconOnly className="bg-transparent"
                  onPress={()=>actionsController?.deleteHandler(item.id)}>
                  <Image
                    alt="table action icon"
                    height={22}
                    src={"/icons/delete.svg"}
                    width={22}
                  />
                </Button>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}
