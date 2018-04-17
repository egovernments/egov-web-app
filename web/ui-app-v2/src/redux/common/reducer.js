import * as commonTypes from "./actionTypes";
import { transformById } from "../../utils/commons";

const intialState = {
  dropDownData: {},
};

const commonReducer = (state = intialState, action) => {
  switch (action.type) {
    case commonTypes.SET_DROPDOWN_DATA:
      return {
        ...state,
        dropDownData: {
          ...state.dropDownData,
          [action.key]: action.payload,
        },
      };

    case commonTypes.SET_CITIES:
      return {
        ...state,
        cities: action.cities,
      };
    case commonTypes.EMPLOYEE_FETCH_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        loading: false,
        employees: action.payload,
      };
    case commonTypes.EMPLOYEE_FETCH_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: action.error,
      };
    case commonTypes.CITIZEN_FETCH_SUCCESS:
      let citizenById = transformById(action.payload.user, "id");
      return {
        ...state,
        loading: false,
        citizenById: {
          ...state.citizenById,
          ...citizenById,
        },
      };
    case commonTypes.CITIZEN_FETCH_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: action.error,
      };
    case commonTypes.DEPARTMENT_AND_DESIGNATION_FETCH_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: action.error,
      };
    case commonTypes.DEPARTMENT_AND_DESIGNATION_FETCH_SUCCESS:
      let departmentsById = transformById(action.payload.MdmsRes["common-masters"].Department, "code");
      let designationsById = transformById(action.payload.MdmsRes["common-masters"].Designation, "code");
      return {
        ...state,
        loading: false,
        departmentById: {
          ...state.departmentsById,
          ...departmentsById,
        },
        designationsById: {
          ...state.designationsById,
          ...designationsById,
        },
      };
    default:
      return state;
  }
};
export default commonReducer;
