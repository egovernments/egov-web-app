import * as actionTypes from "./actionTypes";
import { transformById } from "egov-ui-kit/utils/commons";

const mergeServiceWithActions = (payload) => {
  return payload.actionHistory.map((item, index) => {
    return {
      ...payload.services[index],
      actions: payload.actionHistory[index].actions,
    };
  });
};

const intialState = {
  loading: false,
  error: false,
  errorMessage: "",
  byId: {},
  categoriesById: {},
};

const complaintsReducer = (state = intialState, action) => {
  const { type, overWrite } = action;

  switch (type) {
    case actionTypes.ASSESSMENT_FETCH_PENDING:
      return {
        ...state,
        loading: true,
        error: false,
        fetchSuccess: false,
        errorMessage: "",
      };
    case actionTypes.ASSESSMENT_FETCH_COMPLETE:
      let draftsById = action.payload;
      return {
        ...state,
        loading: false,
        fetchSuccess: true,
        byId: overWrite
          ? { ...draftsById }
          : {
              ...state.byId,
              ...draftsById,
            },
      };
    case actionTypes.ASSESSMENT_FETCH_ERROR:
      return {
        ...state,
        loading: false,
        fetchSuccess: true,
        error: true,
        errorMessage: action.error,
      };
    default:
      return state;
  }
};

export default complaintsReducer;
