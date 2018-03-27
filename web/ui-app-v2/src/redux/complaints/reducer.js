import * as actionTypes from "./actionTypes";
import {transformById} from "../../utils/commons";

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
      return {
        ...state,
        loading:true,
        error:false,
        errorMessage:""
      }
    case actionTypes.COMPLAINTS_FETCH_COMPLETE:

      let complaintsById=transformById(action.payload,"serviceRequestId");
      debugger;
      return {
        ...state,
        loading:false,
        byId:{
          ...state.byId,
          ...complaintsById
        }
      }
    case actionTypes.COMPLAINTS_FETCH_ERROR:
      return {
        ...state,
        loading:false,
        error:true,
        errorMessage:action.error
      }
    default:
      return state;
  }
};

export default complaintsReducer;
