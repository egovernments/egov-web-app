import * as actionTypes from "./actionTypes";
import * as commonActions from "../common/actions";
import { SPEC, MDMS } from "utils/endPoints";
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

const dataFetchPending = () => {
  return {
    type: actionTypes.DATA_FETCH_PENDING,
  };
};

const dataFetchComplete = (payload, moduleName, masterName) => {
  return {
    type: actionTypes.DATA_FETCH_COMPLETE,
    payload,
    moduleName,
    masterName,
  };
};

const dataFetchError = (error) => {
  return {
    type: actionTypes.DATA_FETCH_ERROR,
    error,
  };
};

export const fetchSpecs = (queryObject, moduleName, masterName, requestBody) => {
  return async (dispatch, getState) => {
    dispatch(specsFetchPending());
    dispatch(dataFetchPending());
    try {
      const payloadSpec = await httpRequest(`${SPEC.GET.URL}/${moduleName}/${masterName}`, SPEC.GET.ACTION, queryObject);
      dispatch(specsFetchComplete(payloadSpec, moduleName, masterName));
      try {
        const payloadData = await httpRequest(MDMS.GET.URL, MDMS.GET.ACTION, [], requestBody);
        dispatch(dataFetchComplete(payloadData, moduleName, masterName));
      } catch (error) {
        dispatch(dataFetchError(error.message));
      }
    } catch (error) {
      dispatch(specsFetchError(error.message));
    }
  };
};
