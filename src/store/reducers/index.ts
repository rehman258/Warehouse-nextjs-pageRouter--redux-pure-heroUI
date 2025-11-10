import { combineReducers } from "redux";
import { categoriesReducer } from "./categories";
import { statusesReducer } from "./statuses";

const rootReducer = combineReducers({
  categoriesReducer,
  statusesReducer
});
export default rootReducer;