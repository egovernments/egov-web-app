import * as actionTypes from "./actionTypes";
import * as commonActions from "../common/actions";
import { initForm } from "redux/form/actions";
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

const mapFloatingLabelText = (rawText) => {
  return rawText.split(".").pop();
};

const transformRawTypeToFormat = (rawType) => {
  switch (rawType) {
    case "text":
      return "textfield";
    case "checkbox":
      return "checkbox";
    default:
      return "textfield";
  }
};

const transform = (rawSpecs) => {
  return {
    ...rawSpecs,
    values: rawSpecs.values.reduce((result, current) => {
      result["fields"] = {
        ...result["fields"],
        [current.name]: {
          id: current.name,
          type: transformRawTypeToFormat(current.type),
          required: current.isRequired,
          jsonPath: current.jsonPath,
          floatingLabelText: mapFloatingLabelText(current.label),
          errorMessage: current.patternErrorMsg,
          hintText: "",
          pattern: current.pattern,
          value: "",
        },
      };
      return result;
    }, {}),
  };
};

export const fetchSpecs = (queryObject, moduleName, masterName, requestBody) => {
  return async (dispatch, getState) => {
    dispatch(specsFetchPending());
    dispatch(dataFetchPending());
    try {
      const payloadSpec = await httpRequest(`${SPEC.GET.URL}/${moduleName}/${masterName}`, SPEC.GET.ACTION, queryObject);
      const specs = transform(payloadSpec);
      const { fields } = specs.values;
      const formConfig = { fields, name: masterName, submit: { type: "submit", label: "CORE_COMMON_CONTINUE" } };
      console.log(formConfig);
      dispatch(initForm(formConfig, masterName));
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
