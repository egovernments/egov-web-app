import * as actionTypes from "../actionTypes/timeline";

const intialState = {
  loading: false,
  error: false,
  errorMessage: "",
  byId: {},
};

const timelineReducer = (state = intialState, action) => {
  return state;
};
export default timelineReducer;
