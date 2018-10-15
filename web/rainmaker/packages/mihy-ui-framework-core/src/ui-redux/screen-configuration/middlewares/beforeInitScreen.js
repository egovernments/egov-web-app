import * as screenActionTypes from "../actionTypes";
import get from "lodash/get";

const beforeInitScreen = store => next => action => {
  const { type } = action;
  if (type === screenActionTypes.INIT_SCREEN) {
    const dispatch = store.dispatch;
    const state = store.getState();
    if (typeof get(action, "screenConfig.beforeInitScreen") === "function") {
      action = action.screenConfig.beforeInitScreen(action, store, dispatch);
    }
    next(action);
  } else {
    next(action);
  }
};

export default beforeInitScreen;
