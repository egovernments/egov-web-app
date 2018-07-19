import { combineReducers } from "redux";

import app from "../app/reducer";
import auth from "../auth/reducer";
import form from "../form/reducer";
import complaints from "../complaints/reducer";
import common from "../common/reducer";
import formtemp from "../formtemp/reducer";
import mdms from "../mdms/reducer";
import report from "../reports/report";
import properties from "../properties/reducer";

const rootReducer = {
  app,
  auth,
  form,
  complaints,
  common,
  mdms,
  formtemp,
  report,
  properties,
};

export default rootReducer;
