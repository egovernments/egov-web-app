import * as actionTypes from "./actionTypes";

const initialState = {
  loading: false,
  error: false,
  errorMessage: "",
};

const transformRawTypeToFormat = (rawType) => {
  switch (rawType) {
    case "text":
      return "textfield";
    default:
      return "textfield";
  }
};

const transformRawSpecsToFormat = (rawSpecs) => {
  return {
    ...rawSpecs,
    values: rawSpecs.values.reduce((result, current) => {
      result["fields"] = {
        ...result["fields"],
        [current.name]: {
          id: current.name,
          type: transformRawTypeToFormat(current.type),
          required: current.isRequired,
          jsonPath: current.jsonPath,
          floatingLabelText: current.label,
          errorMessage: current.patternErrorMsg,
          hintText: "",
          pattern: current.pattern,
        },
      };
      return result;
    }, {}),
  };
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
          [masterName]: transformRawSpecsToFormat(action.payload),
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
