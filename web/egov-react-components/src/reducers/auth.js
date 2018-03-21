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
    case "AUTHENTICATING":
      return { ...state, authenticated: false, authenticationFailed: true, authenticating: true };
    case "AUTHENTICATED":
      return { ...state, authenticated: true, authenticationFailed: false, authenticating: false };
    case "AUTHENTICATION_FAILED":
      return { ...state, authenticated: false, authenticationFailed: true, authenticating: false };
    default:
      return state;
  }
};

export default auth;
