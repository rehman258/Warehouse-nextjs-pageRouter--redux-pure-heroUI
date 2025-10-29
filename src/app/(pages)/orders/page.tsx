"use client";

import React from "react";
import Image from "next/image";
import { 
  Input,
  Select, 
  SelectItem, 
  Button,
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell, 
  Pagination,
  Tabs,
  Tab,
  Progress,

} from "@heroui/react";
import orders from "@/aaaa/ordersMock.json";

export default function Orders() {
  const testList = [
    { key: "all_s", label: "All Status" },
    { key: "all_p", label: "All Priorities" },
    { key: "cat", label: "Cat" },
    { key: "dog", label: "Dog" },
    { key: "elephant", label: "Elephant" },
    { key: "lion", label: "Lion" },
    { key: "tiger", label: "Tiger" },
    { key: "giraffe", label: "Giraffe" },
    { key: "dolphin", label: "Dolphin" },
    { key: "penguin", label: "Penguin" },
    { key: "zebra", label: "Zebra" },
    { key: "shark", label: "Shark" },
    { key: "whale", label: "Whale" },
    { key: "otter", label: "Otter" },
    { key: "crocodile", label: "Crocodile" },
  ];
  return (
    <div>
      <div className="inventory-header shadow bg-white p-5 mb-6 rounded-xl flex justify-between">
        <div className="w-[50%]">
          <Input
            className="max-w-[500px]"
            classNames={{
              inputWrapper: "rounded-md",
            }}
            labelPlacement="outside"
            placeholder="Search Warehouse"
            size ="sm"
            startContent={
              <Image
                alt="search icon"
                height={15}
                src={"/icons/search.svg"}
                width={15}
              />
            }
            type="text"
          />
        </div>
        <div className="w-[50%] flex justify-end gap-4">
          <Select className="max-w-[150px]" defaultSelectedKeys={["all_s"]} size="sm">
            {
              testList.map((listItem)=>(
                <SelectItem key={listItem.key}>
                  {listItem.label}
                </SelectItem>
              ))
            }
          </Select>
          <Select className="max-w-[150px]" defaultSelectedKeys={["all_p"]} size="sm">
            {
              testList.map((listItem)=>(
                <SelectItem key={listItem.key}>
                  {listItem.label}
                </SelectItem>
              ))
            }
          </Select>
          <Button 
            color="primary"
            size="sm"
            startContent={
              <Image
                alt="plus icon"
                className="font-medium"
                height={24}
                src={"/icons/plus.svg"}
                width={24}
              />
            }
          >
            {"Add Order"}
          </Button>
        </div>
      </div>
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
          <TableColumn className="max-w-[120px] font-bold text-dark">
            {"Order ID"}
          </TableColumn>
          <TableColumn className="max-w-[120px] font-bold text-dark">
            {"Supplier"}
          </TableColumn>
          <TableColumn className="max-w-[120px] font-bold text-dark">
            {"Created Date"}
          </TableColumn>
          <TableColumn className="max-w-[120px] font-bold text-dark">
            {"Expected Date"}
          </TableColumn>
          <TableColumn className="max-w-[120px] font-bold text-dark">
            {"Status"}
          </TableColumn>
          <TableColumn className="max-w-[120px] font-bold text-dark">
            {"Priority"}
          </TableColumn>
          <TableColumn className="max-w-[120px] font-bold text-dark">
            {"Progress"}
          </TableColumn>
          <TableColumn className="max-w-[120px] font-bold text-dark">
            {"Items"}
          </TableColumn>
          <TableColumn className="max-w-[120px] font-bold text-dark">
            {"Total Value"}
          </TableColumn>
          <TableColumn className="text-center">
            {"Actions"}
          </TableColumn>
        </TableHeader>
        <TableBody>
          {
            orders.orders.map((order)=>(
              <TableRow key={order.orderId}>
                <TableCell>
                  {order.orderId}
                </TableCell>
                <TableCell>
                  {order.supplier}
                </TableCell>
                <TableCell>
                  {order.createdDate}
                </TableCell>
                <TableCell>
                  {order.expectedDate}
                </TableCell>
                <TableCell>
                  <span className={`flex rounded-xl p-1 px-3 gap-2 text-[12px] font-bold
                    ${order.status === "delivered" ? "bg-green-100 text-green-800" : 
                order.status === "inTransit" ? "bg-primary-100 text-primary-800" :
                  order.status === "approved" ? "bg-orange-100 text-orange-800" :
                    order.status === "partial" ? "bg-yellow-100 text-yellow-800" : "bg-default"
              }`}>
                    <Image
                      alt="order status icon"
                      height={12}
                      src={`/icons/${order.status}.svg`}
                      width={12}
                    />
                    {order.status[0].toUpperCase() + order.status.slice(1).toLowerCase()}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">

                    <span className={`
                    p-1 rounded-xl px-3 text-[12px] font-medium
                    ${order.priority === "high" ? "bg-red-500 text-white": 
                order.priority==="medium" ? "bg-yellow-400 text-yellow-900" : " bg-default"} `}>
                      {order.priority}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2 items-center">
                    <Progress aria-label="Loading..." 
                      className="w-[50px]" color="secondary" size="sm" value={order.progress} />
                    <span className="w-[30px]">{order.progress}%</span>
                  </div>
                </TableCell>
                <TableCell>
                  {order.items}
                </TableCell>
                <TableCell className="font-bold text-xs">
                  ${order.totalValue}
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
    </div>
  );
}
