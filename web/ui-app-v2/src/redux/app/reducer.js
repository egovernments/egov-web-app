import * as actionTypes from "./actionTypes";

const initialState = {
  name: "Mseva",
  showMenu: false,
  showDailog: false,
  route: "",
  previousRoute: "",
  showToster: false,
  localizationLabels: {},
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_LOCALIZATION:
      return {
        ...state,
        localizationLabels: action.payload.reduce((result, item) => {
          result[item.code] = {
            message: item.message,
            module: item.module,
            locale: item.locale,
          };
          return result;
        }, {}),
      };
    case actionTypes.SET_ROUTE:
      const { route: currentRoute } = state;
      const previousRoute = currentRoute.length ? currentRoute : window.location.pathname;
      return { ...state, previousRoute, route: action.route };
    default:
      return state;
  }
};
export default appReducer;
