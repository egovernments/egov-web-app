import { refreshTokenRequest } from "redux/auth/actions";

const auth = (store) => (next) => (action) => {
  const { type } = action;
  //const state = store.getState();
  const dispatch = store.dispatch;

  if (/(_ERROR|_FAILURE)$/.test(type)) {
    const { error } = action;
    if (error === "INVALID_TOKEN") {
      dispatch(refreshTokenRequest());
      return;
    }
  }
  next(action);
};

export default auth;
