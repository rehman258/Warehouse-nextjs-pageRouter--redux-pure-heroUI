"use client";

import React from "react";
import Image from "next/image";
import { Input,Select, SelectItem, Button } from "@heroui/react";

export default function Invertory() {
  const testList = [
    { key: "all", label: "All categories" },
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
      <div className="invertory-header bg-white p-5 rounded-md flex justify-between">
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
          <Select className="max-w-[150px]" defaultSelectedKeys={["all"]} size="sm">
            {
              testList.map((listItem)=>(
                <SelectItem key={listItem.key}>
                  {listItem.label}
                </SelectItem>
              ))
            }
          </Select>
          <Select className="max-w-[150px]" defaultSelectedKeys={["all"]} size="sm">
            {
              testList.map((listItem)=>(
                <SelectItem key={listItem.key}>
                  {listItem.label}
                </SelectItem>
              ))
            }
          </Select>
          <Button 
            size="sm"
            startContent={
              <Image
                alt="plus icon"
                height={24}
                src={"/icons/plus.svg"}
                width={24}
              />
            }
          >
            {"Add Product"}
          </Button>
        </div>
      </div>
    </div>
  );
}
