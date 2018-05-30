import * as actionTypes from "./actionTypes";
import * as commonActions from "../common/actions";
import { initForm } from "redux/form/actions";
import { SPEC, MDMS } from "utils/endPoints";
import { upperCaseFirst } from "utils/commons";
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

export const dataFetchComplete = (payload, moduleName, masterName) => {
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
    case "singleValueList":
      return "singleValueList";
    default:
      return "textfield";
  }
};

const createMDMSGenericSpecs = (moduleName, masterName, tenantId) => {
  return {
    moduleName: {
      id: "MDMS_moduleName",
      required: true,
      type: null,
      dontReset: true,
      jsonPath: "MasterMetaData.moduleName",
      value: moduleName,
    },
    masterName: {
      id: "MDMS_masterName",
      required: true,
      type: null,
      dontReset: true,
      jsonPath: "MasterMetaData.masterName",
      value: masterName,
    },
    topLevelTenantId: {
      id: "MDMS_tenantIdtopLevel",
      required: true,
      type: null,
      dontReset: true,
      jsonPath: "MasterMetaData.tenantId",
      value: tenantId,
    },
    tenantId: {
      id: "MDMS_tenantId",
      required: true,
      type: null,
      dontReset: true,
      jsonPath: "MasterMetaData.masterData[0].tenantId",
      value: tenantId,
    },
  };
};

const transform = (rawSpecs, moduleName) => {
  return {
    ...rawSpecs,
    values: rawSpecs.values.reduce((result, current) => {
      console.log(current, moduleName);
      if (current.name != "tenantId") {
        result["fields"] = {
          ...result["fields"],
          [current.name]: {
            id: current.name,
            type: transformRawTypeToFormat(current.type),
            required: current.isRequired,
            jsonPath: current.jsonPath.replace("MdmsMetadata", "MasterMetaData"),
            floatingLabelText: mapFloatingLabelText(current.label),
            errorMessage: current.patternErrorMsg,
            hintText: "",
            pattern: current.pattern,
            value: "",
            //To make API call and initialise field, if Reqd.
            dataFetchConfig:
              current.type === "singleValueList"
                ? {
                    url: MDMS.GET.URL,
                    action: MDMS.GET.ACTION,
                    queryParams: {},
                    requestBody: {
                      MdmsCriteria: {
                        tenantId: "testtenant",
                        moduleDetails: [
                          {
                            moduleName: moduleName,
                            masterDetails: [
                              {
                                //To get any field data, masterName is field name with upper cased first letter to match API body
                                name: upperCaseFirst(current.name),
                              },
                            ],
                          },
                        ],
                      },
                    },
                  }
                : null,
          },
        };
      }
      return result;
    }, {}),
  };
};

export const fetchSpecs = (queryObject, moduleName, masterName, tenantId, requestBody) => {
  return async (dispatch, getState) => {
    dispatch(specsFetchPending());
    dispatch(dataFetchPending());
    try {
      const payloadSpec = await httpRequest(`${SPEC.GET.URL}/${moduleName}/${masterName}`, SPEC.GET.ACTION, queryObject);
      const specs = transform(payloadSpec, moduleName);
      const { fields } = specs.values;
      const formConfig = {
        fields: {
          ...fields,
          ...createMDMSGenericSpecs(moduleName, masterName, tenantId),
        },
        name: `MDMS_${masterName}`,
        submit: { type: "submit", label: "CORE_COMMON_CONTINUE" },
        saveUrl: "egov-mdms-create/v1/_create",
        editUrl: "egov-mdms-create/v1/_update",
      };
      dispatch(initForm(formConfig));
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
