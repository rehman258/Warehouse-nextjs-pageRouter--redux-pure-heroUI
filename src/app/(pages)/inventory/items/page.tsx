"use client";

import dynamic from "next/dynamic";
import React, { useEffect, useState, dy } from "react";
import Image from "next/image";
import { 
  Input,
  Button,
} from "@heroui/react";
const Select = dynamic(() => import("react-select"), {
  ssr: false,
});

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
      setList(res);
    })();
  },[]);

  const testList = [
    { value: "all", label: "All categories" },
    { value: "cat", label: "Cat" },
    { value: "dog", label: "Dog" },
    { value: "elephant", label: "Elephant" },
    { value: "lion", label: "Lion" },
    { value: "tiger", label: "Tiger" },
    { value: "giraffe", label: "Giraffe" },
    { value: "dolphin", label: "Dolphin" },
    { value: "penguin", label: "Penguin" },
    { value: "zebra", label: "Zebra" },
    { value: "shark", label: "Shark" },
    { value: "whale", label: "Whale" },
    { value: "otter", label: "Otter" },
    { value: "crocodile", label: "Crocodile" },
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
          <Select 
            // className="max-w-[150px]" 
            isMulti
            options={testList}
            onMenuClose={() => {}}
            onMenuOpen={() => {}} 
          />
          <Select 
            // className="max-w-[150px]" 
            isMulti
            options={testList}
            onMenuClose={() => {}}
            onMenuOpen={() => {}} 
          />
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