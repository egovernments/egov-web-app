import * as actionTypes from "../actionTypes";
import { resetForm } from "../actions";
import { authenticated } from "redux/auth/actions";
import { addQueryArg } from "utils/commons";
import { setRoute } from "redux/app/actions";
import get from "lodash/get";

const formSubmit = (store) => (next) => (action) => {
  const { type, formKey, payload } = action;
  const dispatch = store.dispatch;
  let redirectionRoute = "";

  if (type == actionTypes.SUBMIT_FORM_COMPLETE) {
    // complete the form submit complete action
    next(action);
    const state = store.getState();
    let { redirectionRoute, idJsonPath } = state.form[formKey];

    // for login/submit
    if (formKey === "otp") {
      const { previousRoute } = state.app;
      redirectionRoute = "/citizen";

      if (previousRoute.endsWith("register")) {
        redirectionRoute = "/citizen/user/login";
      } else {
        delete payload.ResponseInfo;
        dispatch(authenticated(payload));
      }
    }
    if (formKey !== "login" && formKey !== "register") {
      dispatch(resetForm(formKey));
    }

    if (redirectionRoute && redirectionRoute.length) {
      redirectionRoute = idJsonPath ? addQueryArg(redirectionRoute, [{ key: "id", value: get(payload, idJsonPath) }]) : redirectionRoute;
      dispatch(setRoute(redirectionRoute));
    }
  } else {
    next(action);
  }
};

export default formSubmit;
