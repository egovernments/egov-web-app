import * as actionTypes from "./actionTypes";

const intialState = {
  uploading: false,
  error: false,
};

const file = (state = intialState, action) => {
  const { type } = action;

  switch (type) {
    case actionTypes.FILE_UPLOAD_STARTED:
      return { ...state, uploading: true, error: false };
    case actionTypes.FILE_UPLOAD_COMPLETED:
      return { ...state, uploading: false, payload: action.payload };
    case actionTypes.FILE_UPLOAD_ERROR:
      return { ...state, uploading: false, error: true, errorMessage: action.error };
    default:
      return state;
  }
};

export default file;
