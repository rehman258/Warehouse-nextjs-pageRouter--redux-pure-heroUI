"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { 
  Input,
  Select, 
  SelectItem, 
  Button,
} from "@heroui/react";
import InventoryTable from "../components/InventoryTable";
// import inventoryJson from "@/aaaa/InventoryMock.json";
import { InventoryList } from "@/types/domain/inventory";
import InventoryServices from "@/api/endpoints/inventory";
import { connect, ConnectedProps } from "react-redux";

type PropsFromRedux = ConnectedProps<typeof connector>;

function Items({ categoriesReducer }:PropsFromRedux) {
  console.log(categoriesReducer);
  const [list,setList] = useState<InventoryList | undefined>();
  useEffect(()=>{
    (async()=>{
      const res = await InventoryServices.getInventoryList<InventoryList>();
      console.log(res);
      setList(res);
    })();
  },[]);

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
          <Select className="max-w-[150px]" defaultSelectedKeys={["all"]} selectionMode="multiple" size="sm">
            {
              testList.map((listItem)=>(
                <SelectItem key={listItem.key}>
                  {listItem.label}
                </SelectItem>
              ))
            }
          </Select>
          <Select className="max-w-[150px]" defaultSelectedKeys={["all"]} selectionMode="multiple" size="sm">
            {
              testList.map((listItem)=>(
                <SelectItem key={listItem.key}>
                  {listItem.label}
                </SelectItem>
              ))
            }
          </Select>
          <Button 
            className="font-medium"
            color="primary"
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
      {
        list &&  
      <InventoryTable inventoryList= {list}/>
      }
    </div>
  );
}

const mapStateToProps = (state:unknown)=>{
  return state;
};

const mapDispatchToProps = {

};
const connector = connect(mapStateToProps, mapDispatchToProps);
export default connect(mapStateToProps,mapDispatchToProps)(Items);