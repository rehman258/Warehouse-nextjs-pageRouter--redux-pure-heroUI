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
import InventoryServices from "@/api/endpoints/inventory";
import { connect, ConnectedProps } from "react-redux";
import { IInventoryListType,IInventoryItem, IPagination } from "@/types/domain/inventory";
import { ICategoryItem } from "@/types/domain/categories";
import { IStatusItem } from "@/types/domain/statuses";
import { RootState } from "@/store";

type PropsFromRedux = ConnectedProps<typeof connector> & { 
  params: Promise<{ id: string }> 
};

function InventoryList({ categoriesReducer, statusesReducer }:PropsFromRedux) {
  console.log(categoriesReducer);
  const [list,setList] = useState<IInventoryItem[] | undefined>();
  const [pagination,setPagination] = useState<IPagination>({} as IPagination);
  const [page,setPage] = useState<number>(1);
  const [pageSize,setPageSize] = useState<number | unknown>(5);
  useEffect(()=>{
    (async()=>{
      const res:IInventoryListType = await InventoryServices.getInventoryList<IInventoryListType>({
        page,
        itemsPerPage:pageSize,
      });
      console.log(res);
      setPagination(res.pagination);
      setList(res.data);
    })();
  },[page, pageSize]);

  const paginationHandler=(val:number)=>{
    setPage(val);
  };
  
  const pageSizeHandler = (val:unknown)=>{
    console.log(val, "-===");
    setPageSize(val);
  };

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
          <CustomReactSelect<ICategoryItem> 
            getOptionLabel={(option:ICategoryItem) => option.name}
            getOptionValue={(option:ICategoryItem) => option.code}
            options={categoriesReducer.categories}
            placeholder="Select Categories"
          />
          }
          {
            statusesReducer.statuses?.length && 
            <CustomReactSelect<IStatusItem> 
              getOptionLabel={(option:IStatusItem) => option.name}
              getOptionValue={(option:IStatusItem) => option.code}
              options={statusesReducer.statuses}
              placeholder="Select Status"
            />
          }
          <Button
            className="font-medium"
            color="primary"
            size="md"
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
        list?.length &&  
      <InventoryTable
        inventoryList = {list} 
        pageSizeHandler={pageSizeHandler} 
        pagination={pagination} 
        paginationHandler={paginationHandler}/>
      }
    </div>
  );
}
const mapStateToProps = (state: RootState) => {
  return {
    categoriesReducer: state.categoriesReducer,
    statusesReducer: state.statusesReducer,
  };
};

const mapDispatchToProps = {

};
const connector = connect(mapStateToProps, mapDispatchToProps);
export default connect(mapStateToProps,mapDispatchToProps)(InventoryList);