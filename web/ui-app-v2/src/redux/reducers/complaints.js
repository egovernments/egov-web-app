import * as actionTypes from "../actionTypes/complaints";

const intialState = {
  loading: false,
  error: false,
  errorMessage: "",
  byId: {},
};

const complaintsReducer = (state = intialState, action) => {
  return state;
};
export default complaintsReducer;
