import * as commonTypes from "../common/actionTypes";
import * as appTypes from "./actionTypes";
import { asyncPending, asyncComplete, asyncError } from "../common/actions";
import { LOCALATION } from "../../utils/endPoints";
import { httpRequest } from "../../utils/api";

export const setRoute = (route) => {
  return { type: appTypes.SET_ROUTE, route };
};

export const setUserInfo = (userInfo) => {
  return { type:appTypes.SET_USER_INFO,userInfo}
}

export const toggleSnackbarAndSetText = (status,msg,isSuccess,isError) => dispatch => {
  dispatch({
    type:appTypes.SHOW_TOAST,
    status,
    msg,
    isSuccess,
    isError
  });
}

export const fetchLocalizationLabel = (locale) => {
  return async (dispatch) => {
    dispatch(asyncPending(commonTypes.ASYNC_PENDING, "localation"));
    try {
      const payload = await httpRequest(LOCALATION.GET.URL, LOCALATION.GET.ACTION, [
        { key: "module", value: "rainmaker-pgr" },
        { key: "locale", value: locale },
      ]);
      window.localStorage.setItem("localization", JSON.stringify(payload.messages));
      // data transformation will be handled by a custom middleware
      dispatch({ type: appTypes.ADD_LOCALIZATION, payload: payload.messages });
      dispatch(asyncComplete(commonTypes.ASYNC_COMPLETE, "localation"));
    } catch (error) {
      //handle the error
      dispatch(asyncError(commonTypes.ASYNC_ERROR, "localation", error));
    }
  };
};
