import * as actionTypes from "../constants/actionTypes";
import { Api } from "../api";
import { persistInLocalStorage } from "../utils";

export const initiateUserLogin = () => {
  return { type: actionTypes.INITIATE_USER_LOGIN };
};

export const userLoginSuccess = response => {
  const responseObj = {};
  const token = response.access_token;
  const userInfo = response.UserRequest;
  responseObj["token"] = token;
  responseObj["user-info"] = JSON.stringify(userInfo);
  responseObj["type"] = response.UserRequest.type;
  responseObj["id"] = response.UserRequest.id;
  responseObj["tenant-id"] = response.UserRequest.tenantId;
  responseObj["refresh-token"] = response.refresh_token;
  responseObj["expires-in"] = response.expires_in;

  // persist the results in local storage
  persistInLocalStorage(responseObj);

  return { type: actionTypes.USER_LOGIN_SUCCESS, token, userInfo };
};

export const userLoginFailure = error => {
  return { type: actionTypes.USER_LOGIN_FAILURE, error };
};

export const loginUser = (username, password, usertype, history) => {
  return async dispatch => {
    dispatch(initiateUserLogin());
    try {
      const response = await Api().loginUser(username, password, usertype);
      // dispatch the action
      dispatch(userLoginSuccess(response));
      // history.push("/");
    } catch (error) {
      dispatch(userLoginFailure(error));
    }
  };
};
