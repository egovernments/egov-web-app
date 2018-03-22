import * as actionTypes from "../actionTypes/auth";

const intialState = {
  authenticating: false,
  authenticated: true,
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
      return { ...state, authenticated: true, authenticationFailed: false, authenticating: false };
    case actionTypes.AUTHENTICATION_FAILED:
      return { ...state, authenticated: false, authenticationFailed: true, authenticating: false };
    default:
      return state;
  }
};

export default auth;
