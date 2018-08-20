import { createStore, applyMiddleware } from "redux"
import { combineReducers } from "redux";
import storeConfigs from "egov-ui-kit/redux/store"
import employeeReducer from "./reducer"

const { rootReducer, middlewares } = storeConfigs

const store = createStore(combineReducers({
  ...rootReducer,
  employee: employeeReducer,
}), applyMiddleware(...middlewares))

export default store
