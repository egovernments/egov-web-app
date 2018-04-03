import * as actionTypes from "./actionTypes";
import { getUserInfo } from "utils/commons";

const userInfo = getUserInfo();
const authenticated = userInfo ? true : false;
const tenantId = localStorage.getItem("tenant-id");
const token = localStorage.getItem("token");

const intialState = {
  authenticating: false,
  authenticated,
  authenticationFailed: !authenticated,
  userInfo,
  token,
  tenantId,
};

const auth = (state = intialState, action) => {
  const { type, field } = action;

  switch (type) {
    case actionTypes.AUTHENTICATING:
      return { ...state, authenticated: false, authenticationFailed: true, authenticating: true };
    case actionTypes.AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
        authenticationFailed: false,
        authenticating: false,
        userInfo: action.userInfo,
        token: action.accessToken,
      };
    case actionTypes.AUTHENTICATION_FAILED:
      return { ...state, authenticated: false, authenticationFailed: true, authenticating: false };

    case actionTypes.USER_PROFILE_UPDATED:
      return { ...state, userInfo: action.user };
    case actionTypes.LOGOUT:
      return {
        ...state,
        authenticated: false,
        authenticationFailed: false,
        authenticating: false,
        userInfo: {},
        token: "",
      };
    default:
      return state;
  }
};

export default auth;
