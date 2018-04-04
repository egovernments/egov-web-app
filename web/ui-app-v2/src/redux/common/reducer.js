import * as commonTypes from "./actionTypes";

const intialState = {
  dropDownData: {},
};

const commonReducer = (state = intialState, action) => {
  switch (action.type) {
    case commonTypes.SET_DROPDOWN_DATA:
      return {
        ...state,
        dropDownData: {
          ...state.dropDownData,
          [action.key]: action.payload,
        },
      };

    case commonTypes.SET_CITIES:
      return {
        ...state,
        cities: action.cities,
      };

    default:
      return state;
  }
};
export default commonReducer;
