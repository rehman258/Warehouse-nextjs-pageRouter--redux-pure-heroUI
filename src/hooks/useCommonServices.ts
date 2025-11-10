"use client";

import { useEffect } from "react";
import categoriesServices from "@/api/endpoints/categories";
import { useDispatch } from "react-redux";
import { LOAD_CATEGORIES_TYPE } from "@/store/redux_types";
const useCommonServices = () => {
  const dispatch = useDispatch();
  useEffect(()=>{
    (async()=>{
      const categoriesRes = await categoriesServices.getAllCategories();
      dispatch({ type:LOAD_CATEGORIES_TYPE,payload:categoriesRes });
    })();
  },[]);
  return null;
};

export default useCommonServices;
