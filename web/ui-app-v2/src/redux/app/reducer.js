import * as actionTypes from "./actionTypes";
import { transformLocalizationLabels, initLocalizationLabels } from "./utils";

let localizationLabels = initLocalizationLabels();

const initialState = {
  name: "Mseva",
  showMenu: false,
  showDailog: false,
  route: "",
  previousRoute: "",
  toster:{
    msg: "",
    status: false,
    isSuccess:false,
    isError: false,
  },
  showToster: false,
  localizationLabels,
  userInfo:{

  }
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
    case actionTypes.SHOW_TOAST:
        return {
          ...state,
          toster:{
            msg: action.msg,
            status: action.snackbarState,
            isSuccess: action.isSuccess || false,
            isError: action.isError || false,
          }
        };
    case actionTypes.SET_USER_INFO:
            return {
              ...state,
              userInfo:action.userInfo
            };
    default:
      return state;
  }
};
export default appReducer;
