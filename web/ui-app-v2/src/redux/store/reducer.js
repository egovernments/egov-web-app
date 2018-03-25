import { combineReducers } from "redux";

import app from "../app/reducer";
import auth from "../auth/reducer";
import form from "../form/reducer";
import complaints from "../complaints/reducer";
import comments from "../comments/reducer";
import timeline from "../timeline/reducer";
import common from "../common/reducer";

const rootReducer = combineReducers({
  app,
  auth,
  form,
  complaints,
  comments,
  timeline,
  common,
});

export default rootReducer;
