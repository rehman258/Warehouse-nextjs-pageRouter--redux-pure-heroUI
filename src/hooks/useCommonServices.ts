"use client";

import { useEffect } from "react";
import CategoriesServices from "@/api/endpoints/categories";
import StatusServices from "@/api/endpoints/statuses";
import { ICategoryItem } from "@/types/domain/categories";
import { useDispatch } from "react-redux";
import { LOAD_CATEGORIES_TYPE, LOAD_ALL_STATUSES } from "@/store/redux_types";
import { IStatusItem } from "@/types/domain/statuses";
const useCommonServices = () => {
  const dispatch = useDispatch();
  useEffect(()=>{
    (async()=>{
      const categoriesRes:{
        data:ICategoryItem[]
      } = await CategoriesServices.getAllCategories();
      // console.log(categoriesRes.data);
      dispatch({ type:LOAD_CATEGORIES_TYPE,payload:categoriesRes.data });
      const statusesRes:{
        data: IStatusItem[]
      } = await StatusServices.getAllStatuses();
      // console.log(statusesRes);
      dispatch({ type:LOAD_ALL_STATUSES,payload:statusesRes.data });
    })();
  },[]);
  return null;
};

export default useCommonServices;
