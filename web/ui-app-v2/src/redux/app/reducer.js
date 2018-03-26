import * as actionTypes from "./actionTypes";

const initialState = {
  name: "Mseva",
  showMenu: false,
  showDailog: false,
  route: "",
  showToster: false,
  localizationLabels: {
  },
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_LOCALIZATION:
      return {
        ...state,
        localizationLabels: action.payload.reduce((result,item)=>{
        result[item.code]={
          message:item.message,
          module:item.module,
          locale:item.locale
        }
        return result;
      },{})
      };
    case actionTypes.SET_ROUTE:
      //temprovory solution for persiting previous route
      localStorage.setItem("previousPath",window.location.pathname);
      return { ...state, route: action.route };
    default:
      return state;
  }
};
export default appReducer;
