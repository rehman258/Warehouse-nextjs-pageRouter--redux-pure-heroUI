import { LOAD_ALL_STATUSES } from "../redux_types";
import { StatusesType } from "@/types/domain/statuses";
const defaultState:{
  statuses:StatusesType
} = {
  statuses:[],
};

export function statusesReducer(state=defaultState,{ type,payload }:{type:string, payload:StatusesType}){
  switch(type){
    case LOAD_ALL_STATUSES: return {
      ...state,
      statuses:payload,
    };
    default: return state;
  }
}