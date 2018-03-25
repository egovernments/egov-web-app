import * as actionTypes from "./actionTypes";

const initialState = {
  name: "Mseva",
  showMenu: false,
  showDailog: false,
  showToster: false,
  localizationLabel: {},
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_LOCALIZATION:
      return {
        ...state,
        localizationLabel: action.payload,
      };
    default:
      return state;
  }
};
export default appReducer;
