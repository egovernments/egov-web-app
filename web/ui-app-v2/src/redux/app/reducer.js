import * as actionTypes from "./actionTypes";
import { transformLocalizationLabels, initLocalizationLabels } from "./utils";

const locale = window.localStorage.getItem("locale") || "en_IN";
const localizationLabels = initLocalizationLabels(locale);

const initialState = {
  name: "Mseva",
  showMenu: false,
  showDailog: false,
  route: "",
  locale,
  previousRoute: "",
  toast: {
    message: "",
    open: false,
    error: true,
  },
  showToster: false,
  localizationLabels,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_LOCALIZATION:
      return {
        ...state,
        locale: action.locale,
        localizationLabels: transformLocalizationLabels(action.localizationLabels),
      };
    case actionTypes.SET_ROUTE:
      const previousRoute = window.location.pathname;
      return { ...state, previousRoute, route: action.route };
    case actionTypes.SHOW_TOAST:
      return {
        ...state,
        toast: {
          message: action.message,
          open: action.open,
          error: action.error,
        },
      };
    default:
      return state;
  }
};
export default appReducer;
