import * as actionTypes from "./actionTypes";
import { initLocalizationLabels } from "./utils";
import { stat } from "fs";

const locale = window.localStorage.getItem("locale") || "en_IN";
const localizationLabels = initLocalizationLabels(locale);

const initialState = {
  name: "Mseva",
  showMenu: false,
  showActionMenu: true,
  showDailog: false,
  route: "",
  locale,
  urls: [],
  bottomNavigationIndex: 0,
  previousRoute: "",
  toast: {
    message: "",
    open: false,
    error: true,
  },
  localizationLabels,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_LOCALIZATION:
      return {
        ...state,
        locale: action.locale,
        localizationLabels: action.localizationLabels,
      };
    case actionTypes.CHANGE_BOTTOM_NAVIGATION_INDEX:
      return {
        ...state,
        bottomNavigationIndex: action.bottomNavigationIndex,
      };
    case actionTypes.SET_ROUTE:
      return { ...state, previousRoute: action.route ? window.location.pathname : state.previousRoute, route: action.route };
    case actionTypes.SHOW_TOAST:
      return {
        ...state,
        toast: {
          message: action.message,
          open: action.open,
          error: action.error,
        },
      };
    case actionTypes.SET_USER_CURRENT_LOCATION:
      return { ...state, currentLocation: action.currentLocation };

    case actionTypes.ADD_BREADCRUM_ITEM:
      const url =
        window.location.pathname && window.location.pathname.split("/").pop() === "property-tax"
          ? []
          : state.urls && state.urls.indexOf(action.url) > -1
            ? state.urls.splice(state.urls.indexOf(action.url), 1)
            : [...state.urls, action.url];

      return { ...state, urls: url };

    case actionTypes.REMOVE_BREADCRUM_ITEM:
      if (action.mode == "single") {
        let { urls } = state;
        return {
          ...state,
          urls: urls.filter((item) => item !== action.url),
        };
      } else {
        let urls = [];
        return {
          ...state,
          urls,
        };
      }

    default:
      return state;
  }
};
export default appReducer;
