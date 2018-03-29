import * as actionTypes from "./actionTypes";
import { COMPLAINT,CATEGORY } from "../../utils/endPoints";
import { httpRequest } from "../../utils/api";

const complaintFetchPending = (type) => {
  return {
    type,
  };
};

const complaintFetchComplete = (type, payload) => {
  return {
    type,
    payload,
  };
};

const complaintFetchError = (type, error) => {
  return {
    type,
    error,
  };
};

export const fetchComplaints = (queryObject) => {
  return async (dispatch) => {
    dispatch(complaintFetchPending(actionTypes.COMPLAINTS_FETCH_PENDING));
    try {
      const payload = await httpRequest(COMPLAINT.GET.URL, COMPLAINT.GET.ACTION, queryObject);
      dispatch(complaintFetchComplete(actionTypes.COMPLAINTS_FETCH_COMPLETE, payload));
    } catch (error) {
      dispatch(complaintFetchError(actionTypes.COMPLAINTS_FETCH_ERROR, error));
    }
  };
};

export const fetchComplaintCategoies = () => {
  return async (dispatch) => {
    try {
      const payload = await httpRequest(CATEGORY.GET.URL, CATEGORY.GET.ACTION);
      dispatch({type:actionTypes.SET_COMPLAINTS_CATEGORIS, payload});
    } catch (error) {
      console.log(error);
    }
  };
};
