import * as actionTypes from "../actionTypes";
import { setRoute } from "../../app/actions";

const formSubmit = (store) => (next) => (action) => {
  const { type, formKey, payload } = action;
  const dispatch = store.dispatch;

  if (type == actionTypes.SUBMIT_FORM_COMPLETE) {
    // complete the form submit complete action
    next(action);
    // if you wish to do something with the state
    const state = store.getState();
    // decide on the redirection route
    let redirectionRoute = "";
    switch (formKey) {
      case "register":
        redirectionRoute = "/citizen/user/login";
        break;
      case "login":
        redirectionRoute = "/citizen";
      case "otp":
        redirectionRoute = "/citizen";
        break;
    }
    if (redirectionRoute.length) dispatch(setRoute(redirectionRoute));
  } else {
    next(action);
  }
};

export default formSubmit;
