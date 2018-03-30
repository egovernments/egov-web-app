import * as actionTypes from "./actionTypes";

const intialState = {
  authenticating: false,
  authenticated: false,
  authenticationFailed: true,
  userInfo: {},
  token: "",
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
