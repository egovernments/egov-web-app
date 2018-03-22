import { combineReducers } from "redux";

import app from "./app";
import auth from "./auth";
import form from "./form";
import complaints from "./complaints";
import comments from "./comments";
import timeline from "./timeline";

const rootReducer = combineReducers({
  app,
  auth,
  form,
  complaints,
  comments,
  timeline,
});

export default rootReducer;
