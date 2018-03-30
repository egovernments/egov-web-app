import * as actionTypes from "./actionTypes";

const intialState = {
  authenticating: false,
  authenticated: localStorage.getItem("authenticated")?(localStorage.getItem("authenticated")=="true"?true:false):false,
  authenticationFailed: true,
  userInfo: localStorage.getItem("user-info") || {},
  token: localStorage.getItem("token") || "",
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
        token: action.token,
      };
    case actionTypes.AUTHENTICATION_FAILED:
      return { ...state, authenticated: false, authenticationFailed: true, authenticating: false };
    case actionTypes.LOGOUT:
      return {
        ...state,
        authenticated: false,
        authenticationFailed: false,
        authenticating: false,
        userInfo: {},
        token:"",
      };
    default:
      return state;
  }
};

export default auth;
