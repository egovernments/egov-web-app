import { refreshTokenRequest } from "redux/auth/actions";
import { setRoute } from "redux/app/actions";

const auth = (store) => (next) => (action) => {
  const { type } = action;
  const state = store.getState();
  const { authenticated } = state.auth;
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
