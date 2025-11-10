import { LOAD_CATEGORIES_TYPE } from "@/store/redux_types";
const defaultState = {
  categories:[],
};

export function categoriesReducer(state=defaultState,{ type,payload }:{type:string,payload:unknown} ){
  switch(type){
    case LOAD_CATEGORIES_TYPE:
      return {
        ...state,
        categories:payload,
      };
    default: return state;
  }
}