import * as actionTypes from "./actionTypes";
import * as commonActions from "../common/actions";
import { SPEC } from "utils/endPoints";
import { httpRequest } from "utils/api";

const specsFetchPending = () => {
  return {
    type: actionTypes.SPECS_FETCH_PENDING,
  };
};

const specsFetchComplete = (payload, moduleName, masterName) => {
  return {
    type: actionTypes.SPECS_FETCH_COMPLETE,
    payload,
    moduleName,
    masterName,
  };
};

const specsFetchError = (error) => {
  return {
    type: actionTypes.SPECS_FETCH_ERROR,
    error,
  };
};

export const fetchSpecs = (queryObject, moduleName, masterName, customEndPoint) => {
  return async (dispatch, getState) => {
    dispatch(specsFetchPending());
    try {
      const payload = await httpRequest(`${SPEC.GET.URL}/${moduleName}/${masterName}`, SPEC.GET.ACTION, queryObject);
      dispatch(specsFetchComplete(payload, moduleName, masterName));
    } catch (error) {
      dispatch(specsFetchError(error.message));
    }
  };
};
