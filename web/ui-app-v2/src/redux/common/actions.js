import * as actionTypes from "./actionTypes";
import { httpRequest } from "utils/api";
import { TENANT, EMPLOYEE, CITIZEN, DEP_DES } from "utils/endPoints";

export const setDropDownData = (key, payload) => {
  return { type: actionTypes.SET_DROPDOWN_DATA, key, payload };
};
const setCities = (cities) => {
  return { type: actionTypes.SET_CITIES, cities };
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

const departmentAndDesignationFetchError = (error) => {
  return {
    type: actionTypes.DEPARTMENT_AND_DESIGNATION_FETCH_ERROR,
    error,
  };
};

const departmentAndDesignationFetchSuccess = (payload) => {
  return {
    type: actionTypes.DEPARTMENT_AND_DESIGNATION_FETCH_SUCCESS,
    payload,
  };
};

// make this to be a generic mdms call
export const fetchCities = () => {
  return async (dispatch) => {
    try {
      const payload = await httpRequest(TENANT.GET.URL, TENANT.GET.ACTION, [
        { key: "moduleName", value: "tenant" },
        { key: "masterName", value: "tenants" },
      ]);
      const cities = payload.MdmsRes["tenant"]["tenants"].map((item) => {
        return {
          key: item.code,
          text: item.city.name,
        };
      });
      dispatch(setCities(cities));
    } catch (error) {}
  };
};

export const fetchEmployees = () => {
  return async (dispatch) => {
    try {
      const payload = await httpRequest(EMPLOYEE.GET.URL, EMPLOYEE.GET.ACTION);
      dispatch(employeeFetchSuccess(payload));
    } catch (error) {
      dispatch(employeeFetchError(error.message));
    }
  };
};

export const fetchCitizens = (requestBody) => {
  return async (dispatch) => {
    try {
      const payload = await httpRequest(CITIZEN.GET.URL, CITIZEN.GET.ACTION, [], requestBody);
      dispatch(citizenFetchSuccess(payload));
    } catch (error) {
      dispatch(citizenFetchError(error.message));
    }
  };
};

export const fetchDepartmentAndDesignation = () => {
  let requestBody = {
    MdmsCriteria: {
      tenantId: "pb",
      moduleDetails: [
        {
          moduleName: "common-masters",
          masterDetails: [
            {
              name: "Department",
            },
            {
              name: "Designation",
            },
          ],
        },
      ],
    },
  };
  return async (dispatch) => {
    try {
      const payload = await httpRequest(DEP_DES.GET.URL, DEP_DES.GET.ACTION, [], requestBody);
      dispatch(departmentAndDesignationFetchSuccess(payload));
    } catch (error) {
      dispatch(departmentAndDesignationFetchError(error.message));
    }
  };
};
