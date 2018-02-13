import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducers";
import thunk from "redux-thunk";
import logger from "redux-logger";
import {
  fieldDependency,
  formValidation,
  modelDataTransformation
} from "../middlewares";

const middlewares = [];
middlewares.push(thunk);

// framework specific middlewares
middlewares.push(fieldDependency);
middlewares.push(formValidation);
middlewares.push(modelDataTransformation);

if (process.env.NODE_ENV === "development") {
  const { logger } = require("redux-logger");
  middlewares.push(logger);
}

const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;
