import * as actionTypes from "./actionTypes";

const intialState = {
  loading: false,
  error: false,
  errorMessage: "",
  byId: {},
};

const complaintsReducer = (state = intialState, action) => {
  const { type } = action;

  switch (type) {
    case actionTypes.COMPLAINTS_FETCH_PENDING:
    case actionTypes.COMPLAINTS_FETCH_COMPLETE:
    case actionTypes.COMPLAINTS_FETCH_ERROR:
      return state;
  }

  return state;
};
export default complaintsReducer;
