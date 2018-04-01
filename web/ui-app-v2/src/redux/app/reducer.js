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
  toster: {
    msg: "",
    status: false,
    isSuccess: false,
    isError: false,
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
      const { route: currentRoute } = state;
      const previousRoute = window.location.pathname;
      return { ...state, previousRoute, route: action.route };
    case actionTypes.SHOW_TOAST:
      return {
        ...state,
        toster: {
          msg: action.msg,
          status: action.snackbarState,
          isSuccess: action.isSuccess || false,
          isError: action.isError || false,
        },
      };
    default:
      return state;
  }
};
export default appReducer;
