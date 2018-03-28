import * as actionTypes from "./actionTypes";
import { transformLocalizationLabels, initLocalizationLabels } from "./utils";

let localizationLabels = initLocalizationLabels();

const initialState = {
  name: "Mseva",
  showMenu: false,
  showDailog: false,
  route: "",
  previousRoute: "",
  showToster: false,
  localizationLabels,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_LOCALIZATION:
      return {
        ...state,
        localizationLabels: transformLocalizationLabels(action.payload),
      };
    case actionTypes.SET_ROUTE:
      const { route: currentRoute } = state;
      const previousRoute = window.location.pathname;
      return { ...state, previousRoute, route: action.route };
    default:
      return state;
  }
};
export default appReducer;
