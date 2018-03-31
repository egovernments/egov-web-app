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

    if (formKey === "otp") {
      delete payload.ResponseInfo;
      localStorage.setItem("user-info", JSON.stringify(payload));
      localStorage.setItem("token", payload["access_token"]);
      localStorage.setItem("authenticated", true);
      localStorage.setItem("tenantId", payload["UserRequest"].tenantId);
      redirectionRoute = "/citizen";
      dispatch(authenticated(payload));
    }

    if (redirectionRoute && redirectionRoute.length) {
      redirectionRoute = idJsonPath ? addQueryArg(redirectionRoute, [{ key: "id", value: get(payload, idJsonPath) }]) : redirectionRoute;
      dispatch(setRoute(redirectionRoute));
    }
    // reset form after successful submission
    dispatch(resetForm(formKey));
  } else {
    next(action);
  }
};

export default formSubmit;
