import * as actionTypes from "../actionTypes";
import { resetForm } from "../actions";
import { authenticated, userProfileUpdated } from "redux/auth/actions";
import { addQueryArg } from "utils/commons";
import { setRoute } from "redux/app/actions";
import { fetchComplaints } from "redux/complaints/actions";
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

    // for profile update
    if (formKey === "profile") {
      delete payload.responseInfo;
      dispatch(userProfileUpdated(payload));
    }

    // use a flag reset true or false
    if (formKey !== "login" && formKey !== "register" && formKey !== "profile") {
      dispatch(resetForm(formKey));
    }

    if (formKey === "comment") {
      dispatch(fetchComplaints([{ serviceRequestId: decodeURIComponent(window.location.href.split("/").pop()) }]));
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
