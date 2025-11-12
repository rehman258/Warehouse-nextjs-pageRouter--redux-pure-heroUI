"use client";

import { useEffect } from "react";
import CategoriesServices from "@/api/endpoints/categories";
import StatusServices from "@/api/endpoints/statuses";
import { useDispatch } from "react-redux";
import { LOAD_CATEGORIES_TYPE, LOAD_ALL_STATUSES } from "@/store/redux_types";
const useCommonServices = () => {
  const dispatch = useDispatch();
  useEffect(()=>{
    (async()=>{
      const categoriesRes = await CategoriesServices.getAllCategories();
      dispatch({ type:LOAD_CATEGORIES_TYPE,payload:categoriesRes });
      const statusesRes = await StatusServices.getAllStatuses();
      dispatch({ type:LOAD_ALL_STATUSES,payload:statusesRes });
    })();
  },[]);
  return null;
};

export default useCommonServices;
