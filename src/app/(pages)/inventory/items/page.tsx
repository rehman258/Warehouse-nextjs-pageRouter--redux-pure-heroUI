"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { 
  Input,
  Button,
} from "@heroui/react";
import CustomReactSelect from "@/components/customReactSelect";
import CustomTableComponent from "@/components/common/table";
// import inventoryJson from "@/aaaa/InventoryMock.json";
import InventoryServices from "@/api/endpoints/inventory";
import { connect, ConnectedProps } from "react-redux";
import { IInventoryListType,IInventoryItem } from "@/types/domain/inventory";
import { IPagination } from "@/types/models/pagination";
import { ICategoryItem } from "@/types/domain/categories";
import { IStatusItem } from "@/types/domain/statuses";
import { RootState } from "@/store";
import ViewModal from "@/components/common/modal/formModal/veiwModal";

type PropsFromRedux = ConnectedProps<typeof connector> & { 
  params: Promise<{ id: string }> 
};

function InventoryList({ categoriesReducer, statusesReducer }:PropsFromRedux) {

  const tableKeys:{
    headerKeys:string[];
    bodyKeys: (keyof IInventoryItem)[];
  } = {
    headerKeys:["Sku", "Product Name", "Category", "Current Stock", "Location", "Price", "Status", "Actions"],
    bodyKeys:["sku", "productName", "categoryName", "stock", "location", "price", "status"],
  };

  const [list,setList] = useState<IInventoryItem[] | undefined>();
  const [pagination,setPagination] = useState<IPagination>({} as IPagination);
  const [page,setPage] = useState<number>(1);
  const [pageSize,setPageSize] = useState<number | unknown>(5);
  const [categoriesFilterId,setCategoriesFilterId] = useState<number[] | []>([]);
  const [statusesFilterId,setStatusesFilterId] = useState<string[] | []>([]);
  const [isViewModalOpen,setIsViewModalOpen] = useState<boolean>(false);
  useEffect(()=>{
    (async()=>{
      const res:IInventoryListType = await InventoryServices.getInventoryList<IInventoryListType>({},{        
        page,
        itemsPerPage:pageSize,
        categoryIds:categoriesFilterId,
        status:statusesFilterId,
      });
      setPagination(res.pagination);
      setList(res.data);
    })();
  },[page, pageSize,categoriesFilterId,statusesFilterId]);

  const paginationHandler=(val:number)=>{
    setPage(val);
  };
  
  const pageSizeHandler = (val:unknown)=>{
    console.log(val, "-===");
    setPageSize(val);
  };

  const categoryFilterHandler=(_selected:ICategoryItem[] | null)=>{
    const tempIdArray = _selected?.map((sel)=>sel.id);
    if(tempIdArray) setCategoriesFilterId(tempIdArray);
  };

  const statusFilterHandler=(_selected: IStatusItem[] | null)=>{
    const tempStatusArray = _selected?.map((sel)=>sel.code);
    if(tempStatusArray) setStatusesFilterId(tempStatusArray);
  };

  const viewInventoryItemHandler=(id:number)=>{
    console.log(id);
    setIsViewModalOpen(true);
  };
  const editInventoryItemHandler=(id:number)=>{
    console.log(id);
    // setIsViewModalOpen(true);
  };
  const deleteInventoryItemHandler=(id:number)=>{
    console.log(id);
    // setIsViewModalOpen(true);
  };

  const viewModalArr:[string,string][] = [
    ["Test heading", "testValue"],
    ["Test heading", "testValue"],
    ["Test heading", "testValue"],
    ["Test heading", "testValue"],
    ["Test heading", "testValue"],
    ["Test heading", "testValue"],
    ["Test heading", "testValue"],
    ["Test heading", "testValue"],
    ["Test heading", "testValue"],
    ["Test heading", "testValue"],
    ["Test heading", "testValue"],
    ["Test heading", "testValue"],
  ];

  return (
    <div>
      <ViewModal closeModal={setIsViewModalOpen} details={viewModalArr} open={isViewModalOpen}/>
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
            onChange={categoryFilterHandler}
          />
          }
          {
            statusesReducer.statuses?.length && 
            <CustomReactSelect<IStatusItem> 
              getOptionLabel={(option:IStatusItem) => option.name}
              getOptionValue={(option:IStatusItem) => option.code}
              options={statusesReducer.statuses}
              placeholder="Select Status"
              onChange={statusFilterHandler}
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
      <CustomTableComponent<IInventoryItem>
        actionsController={
          {
            viewHandler:viewInventoryItemHandler,
            editHandler:editInventoryItemHandler,
            deleteHandler:deleteInventoryItemHandler
          }
        }
        list = {list} 
        pageSizeHandler={pageSizeHandler} 
        pagination={pagination}
        paginationHandler={paginationHandler} 
        tableKeys={tableKeys}
      />
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