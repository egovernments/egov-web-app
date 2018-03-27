import * as actionTypes from "../actionTypes";
import { setRoute } from "../../app/actions";

const formSubmit = (store) => (next) => (action) => {
  const { type, formKey, payload } = action;
  const dispatch = store.dispatch;

  if (type == actionTypes.SUBMIT_FORM_COMPLETE) {
    // complete the form submit complete action
    next(action);
    // navigation,
    // if you wish to do something with the state
    const state = store.getState();
    const { redirectionRoute } = state.form[formKey];
    if (redirectionRoute && redirectionRoute.length) dispatch(setRoute(redirectionRoute));
  } else {
    next(action);
  }
};

export default formSubmit;
