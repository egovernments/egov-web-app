import * as actionTypes from "./actionTypes";

export const setRoute = route => {
  return { type: actionTypes.SET_ROUTE, route };
};

export const toggleSnackbarAndSetText = (open, message, errorType) => {
  return {
    type: actionTypes.SHOW_TOAST,
    open,
    message,
    errorType
  };
};

export const toggleSpinner = () => {
  return {
    type: actionTypes.TOGGLE_SPINNER
  };
};
