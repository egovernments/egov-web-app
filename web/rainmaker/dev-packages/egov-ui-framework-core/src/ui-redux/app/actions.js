import * as actionTypes from "./actionTypes";

export const setRoute = route => {
  return { type: actionTypes.SET_ROUTE, route };
};

// export const toggleSnackbar = (open, message, error) => {
//   return {
//     type: actionTypes.SHOW_TOAST,
//     open,
//     message,
//     error
//   };
// };

export const toggleSpinner = () => {
  return {
    type: actionTypes.TOGGLE_SPINNER
  };
};
