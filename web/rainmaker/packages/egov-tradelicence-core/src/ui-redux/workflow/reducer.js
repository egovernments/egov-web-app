import * as actionTypes from "./actionTypes";

const initialState = {};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_WORK_FLOW:
      return {
        ...state,
        ...action.payload
      };

    default:
      return state;
  }
};
export default appReducer;
