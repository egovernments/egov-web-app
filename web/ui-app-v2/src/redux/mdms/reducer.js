import * as actionTypes from "./actionTypes";

const initialState = {
  loading: false,
  error: false,
  errorMessage: "",
};

const mdmsReducer = (state = initialState, action) => {
  const { type, moduleName, masterName } = action;
  switch (type) {
    case actionTypes.SPECS_FETCH_PENDING:
      return {
        ...state,
        loading: true,
        error: false,
        errorMessage: "",
      };
    case actionTypes.SPECS_FETCH_COMPLETE:
      return {
        ...state,
        loading: false,
        [moduleName]: {
          ...state[moduleName],
          [masterName]: action.payload,
        },
      };
    case actionTypes.SPECS_FETCH_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: action.error,
      };
    default:
      return state;
  }
};

export default mdmsReducer;
