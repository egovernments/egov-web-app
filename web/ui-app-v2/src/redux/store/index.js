import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducer";
import thunk from "redux-thunk";
import { validation, formSubmit } from "../form/middlewares";

const middlewares = [];

middlewares.push(validation);
middlewares.push(formSubmit);

middlewares.push(thunk);
if (process.env.NODE_ENV === "development") {
  const { logger } = require("redux-logger");
  middlewares.push(logger);
}

const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;
