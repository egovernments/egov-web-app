import * as screenActionTypes from "../actionTypes";
import get from "lodash/get";

const afterInitScreen = store => next => action => {
  const { type } = action;
  if (type === screenActionTypes.INIT_SCREEN) {
    next(action);
    const dispatch = store.dispatch;
    const state = store.getState();
    if (typeof get(action, "screenConfig.afterInitScreen") === "function") {
      action = action.screenConfig.afterInitScreen(action, state, dispatch);
    }
  } else {
    next(action);
  }
};

export default afterInitScreen;
