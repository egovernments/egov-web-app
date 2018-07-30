import * as actionTypes from "./actionTypes";
import { httpRequest } from "egov-ui-kit/utils/api";
import { EMPLOYEE, CITIZEN, MDMS, EMPLOYEE_ASSIGN } from "egov-ui-kit/utils/endPoints";

export const setDropDownData = (key, payload) => {
  return { type: actionTypes.SET_DROPDOWN_DATA, key, payload };
};

const employeeFetchPending = () => {
  return {
    type: actionTypes.EMPLOYEE_FETCH_PENDING,
  };
};

const employeeFetchSuccess = (payload) => {
  return {
    type: actionTypes.EMPLOYEE_FETCH_SUCCESS,
    payload,
  };
};

const employeeFetchError = (error) => {
  return {
    type: actionTypes.EMPLOYEE_FETCH_ERROR,
    error,
  };
};

const employeeToAssignFetchSuccess = (payload) => {
  return {
    type: actionTypes.EMPLOYEE_TO_ASSIGN_FETCH_SUCCESS,
    payload,
  };
};

const employeeToAssignFetchPending = () => {
  return {
    type: actionTypes.EMPLOYEE_TO_ASSIGN_FETCH_PENDING,
  };
};

const employeeToAssignFetchError = (error) => {
  return {
    type: actionTypes.EMPLOYEE_TO_ASSIGN_FETCH_ERROR,
    error,
  };
};

const citizenFetchSuccess = (payload) => {
  return {
    type: actionTypes.CITIZEN_FETCH_SUCCESS,
    payload,
  };
};

const citizenFetchError = (error) => {
  return {
    type: actionTypes.CITIZEN_FETCH_ERROR,
    error,
  };
};

const MDMSFetchSuccess = (payload) => {
  return {
    type: actionTypes.MDMS_FETCH_SUCCESS,
    payload,
  };
};

const MDMSFetchError = (error) => {
  return {
    type: actionTypes.MDMS_FETCH_ERROR,
    error,
  };
};

export const prepareFormData = (jsonPath, value) => {
  return {
    type: actionTypes.PREPARE_FORM_DATA,
    jsonPath,
    value,
  };
};
const generalMDMSFetchSuccess = (payload, moduleName, masterArray) => {
  return {
    type: actionTypes.GENERAL_MDMS_FETCH_SUCCESS,
    payload,
    moduleName,
    masterArray,
  };
};

const generalMDMSFetchError = (error) => {
  return {
    type: actionTypes.GENERAL_MDMS_FETCH_ERROR,
    error,
  };
};

export const fetchEmployees = (requestBody) => {
  return async (dispatch) => {
    dispatch(employeeFetchPending());
    try {
      const payload = await httpRequest(EMPLOYEE.GET.URL, EMPLOYEE.GET.ACTION, requestBody);
      dispatch(employeeFetchSuccess(payload));
    } catch (error) {
      dispatch(employeeFetchError(error.message));
    }
  };
};

export const fetchCitizens = (requestBody = [], requestParams = []) => {
  return async (dispatch) => {
    try {
      const payload = await httpRequest(CITIZEN.GET.URL, CITIZEN.GET.ACTION, requestParams, requestBody);
      dispatch(citizenFetchSuccess(payload));
    } catch (error) {
      dispatch(citizenFetchError(error.message));
    }
  };
};

export const fetchMDMSData = (requestBody) => {
  return async (dispatch) => {
    try {
      const payload = await httpRequest(MDMS.GET.URL, MDMS.GET.ACTION, [], requestBody);
      dispatch(MDMSFetchSuccess(payload));
    } catch (error) {
      dispatch(MDMSFetchError(error.message));
    }
  };
};

export const fetchEmployeeToAssign = (queryObj, requestBody) => {
  return async (dispatch) => {
    dispatch(employeeToAssignFetchPending());
    try {
      const payload = await httpRequest(EMPLOYEE_ASSIGN.GET.URL, EMPLOYEE_ASSIGN.GET.ACTION, queryObj, requestBody);
      dispatch(employeeToAssignFetchSuccess(payload));
    } catch (error) {
      dispatch(employeeToAssignFetchError(error.message));
    }
  };
};

export const fetchGeneralMDMSData = (requestBody, moduleName, masterArray) => {
  return async (dispatch) => {
    try {
      const payload = await httpRequest(MDMS.GET.URL, MDMS.GET.ACTION, [], requestBody);
      dispatch(generalMDMSFetchSuccess(payload, moduleName, masterArray));
    } catch (error) {
      dispatch(generalMDMSFetchError(error.message));
    }
  };
};

export const toggleSpinner = () => ({
  type: actionTypes.TOGGLE_SPINNER
})
