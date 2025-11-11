import { LOAD_CATEGORIES_TYPE } from "@/store/redux_types";
import { CategoryType } from "@/types/domain/categories";
const defaultState:{
  categories:CategoryType;
} = {
  categories:[],
};
export type CategoryRootType = ReturnType<typeof categoriesReducer>;
export function categoriesReducer(state=defaultState,{ type,payload }:{type:string,payload:CategoryType} ){
  switch(type){
    case LOAD_CATEGORIES_TYPE:
      return {
        ...state,
        categories:payload,
      };
    default: return state;
  }
}