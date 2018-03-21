import { combineReducers } from "redux";
import framework from "./framework";
import auth from "./auth";

const rootReducer = combineReducers({
  framework,
  auth,
});

export default rootReducer;
