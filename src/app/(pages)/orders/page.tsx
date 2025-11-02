"use client";

import React,{ useEffect,useState } from "react";
import Image from "next/image";
import { 
  Input,
  Select, 
  SelectItem, 
  Button,
} from "@heroui/react";
import OrdersTable from "./components/ordersTable";
import OrdersServices from "@/api/endpoints/orders";
import { OrdersList } from "@/types/domain/orders";
export default function Orders() {
  const [list, setList] = useState<OrdersList>();

  useEffect(()=>{
    (async()=>{
      const res = await OrdersServices.getOrders<OrdersList>();
      setList(res);
    })();
  },[]);

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
      {
        list &&
        <OrdersTable list={list}/>
      }
    </div>
  );
}
