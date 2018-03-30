import * as actionTypes from "../actionTypes";
import {authenticated} from "redux/auth/actions";
import { setRoute } from "../../app/actions";

const formSubmit = (store) => (next) => (action) => {
  const { type, formKey, payload } = action
  console.log(formKey,payload);
  const dispatch = store.dispatch;
  let redirectionRoute = "";


  if (type == actionTypes.SUBMIT_FORM_COMPLETE) {
    // complete the form submit complete action
    next(action);
    // navigation,
    // if you wish to do something with the state
    const state = store.getState();
    redirectionRoute = state.form[formKey].redirectionRoute;

    if(formKey === "otp"){
      delete payload.ResponseInfo;
      localStorage.setItem("user-info", JSON.stringify(payload));
      localStorage.setItem("token", payload["access_token"]);
      localStorage.setItem("authenticated", true);
      localStorage.setItem("tenantId", payload["UserRequest"].tenantId);
      redirectionRoute = "/citizen";
      dispatch(authenticated(payload));
    }

    if (redirectionRoute && redirectionRoute.length) dispatch(setRoute(redirectionRoute));
  } else {
    next(action);
  }
};

export default formSubmit;
