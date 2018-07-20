import * as actionTypes from "./actionTypes";
import { PROPERTY, DRAFT } from "egov-ui-kit/utils/endPoints";
import { httpRequest } from "egov-ui-kit/utils/api";

const propertyFetchPending = () => {
  return {
    type: actionTypes.PROPERTY_FETCH_PENDING,
  };
};

const draftFetchPending = () => {
  return {
    type: actionTypes.DRAFT_FETCH_PENDING,
  };
};

const propertyFetchComplete = (payload, overWrite) => {
  return {
    type: actionTypes.PROPERTY_FETCH_COMPLETE,
    payload,
  };
};

const draftFetchComplete = (payload) => {
  return {
    type: actionTypes.DRAFT_FETCH_COMPLETE,
    payload,
  };
};

const propertyFetchError = (error) => {
  return {
    type: actionTypes.PROPERTY_FETCH_ERROR,
    error,
  };
};
const draftFetchError = (error) => {
  return {
    type: actionTypes.DRAFT_FETCH_ERROR,
    error,
  };
};

export const fetchProperties = (queryObject) => {
  return async (dispatch) => {
    dispatch(propertyFetchPending());
    dispatch(draftFetchPending());
    try {
      const payload = await httpRequest(PROPERTY.GET.URL, PROPERTY.GET.ACTION, queryObject);
      dispatch(propertyFetchComplete(payload));
      try {
        const draftpayload = await httpRequest(DRAFT.GET.URL, DRAFT.GET.ACTION, queryObject);
        dispatch(draftFetchComplete(draftpayload));
      } catch (error) {
        dispatch(draftFetchError(error.message));
      }
    } catch (error) {
      dispatch(propertyFetchError(error.message));
    }
  };
};
