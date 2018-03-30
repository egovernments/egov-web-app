import { combineReducers } from "redux";

import app from "../app/reducer";
import auth from "../auth/reducer";
import form from "../form/reducer";
import file from "../file/reducer";
import complaints from "../complaints/reducer";
import common from "../common/reducer";

const rootReducer = combineReducers({
  app,
  auth,
  file,
  form,
  complaints,
  common,
});

export default rootReducer;
