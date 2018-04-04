import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducer";
import thunk from "redux-thunk";
import { validation, translateFieldText, formSubmit } from "redux/form/middlewares";
import authMiddleware from "redux/auth/middleware";

const middlewares = [];

middlewares.push(translateFieldText);
middlewares.push(validation);
middlewares.push(formSubmit);
middlewares.push(thunk);
middlewares.push(authMiddleware);

if (process.env.NODE_ENV === "development") {
  const { logger } = require("redux-logger");
  middlewares.push(logger);
}

const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;
