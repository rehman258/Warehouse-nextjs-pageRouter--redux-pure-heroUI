"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { 
  Input,
  Button,
} from "@heroui/react";
import CustomReactSelect from "@/components/customReactSelect";
import InventoryTable from "../components/InventoryTable";
// import inventoryJson from "@/aaaa/InventoryMock.json";
import { InventoryList } from "@/types/domain/inventory";
import InventoryServices from "@/api/endpoints/inventory";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "@/store";

type PropsFromRedux = ConnectedProps<typeof connector> & { 
  params: Promise<{ id: string }> 
};

function Items({ categoriesReducer }:PropsFromRedux) {
  console.log(categoriesReducer.categories.length);
  const [list,setList] = useState<InventoryList | undefined>();
  useEffect(()=>{
    (async()=>{
      const res = await InventoryServices.getInventoryList<InventoryList>();
      setList(res);
    })();
  },[]);

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
          {
            categoriesReducer.categories?.length && 
          <CustomReactSelect options={categoriesReducer.categories}/>
          }
          <CustomReactSelect/>
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
const mapStateToProps = (state: RootState) => {
  return {
    categoriesReducer: state.categoriesReducer,
  };
};

const mapDispatchToProps = {

};
const connector = connect(mapStateToProps, mapDispatchToProps);
export default connect(mapStateToProps,mapDispatchToProps)(Items);