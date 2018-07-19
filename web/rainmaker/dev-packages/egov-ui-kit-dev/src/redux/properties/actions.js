import * as actionTypes from "./actionTypes";
import { PROPERTY } from "egov-ui-kit/utils/endPoints";
import { httpRequest } from "egov-ui-kit/utils/api";

const propertyFetchPending = () => {
  return {
    type: actionTypes.PROPERTY_FETCH_PENDING,
  };
};

const propertyFetchComplete = (payload, overWrite) => {
  return {
    type: actionTypes.PROPERTY_FETCH_COMPLETE,
    payload,
  };
};

const propertyFetchError = (error) => {
  return {
    type: actionTypes.PROPERTY_FETCH_ERROR,
    error,
  };
};

export const fetchProperties = (queryObject) => {
  return async (dispatch) => {
    dispatch(propertyFetchPending());
    try {
      const payload = await httpRequest(PROPERTY.GET.URL, PROPERTY.GET.ACTION, queryObject);
      dispatch(propertyFetchComplete(payload));
    } catch (error) {
      dispatch(propertyFetchError(error.message));
    }
  };
};
