import { getTranslatedLabel } from "../ui-config/screens/specs/utils";
import { uploadFile, httpRequest } from "../ui-utils/api";
import store from "ui-redux/store";
import {
  prepareFinalObject,
  toggleSnackbar
} from "egov-ui-framework/ui-redux/screen-configuration/actions";
import get from "lodash/get";
import set from "lodash/set";
import { getTenantId } from "egov-ui-kit/utils/localStorageUtils";

export const getLocaleLabelsforTL = (label, labelKey, localizationLabels) => {
  if (labelKey) {
    let translatedLabel = getTranslatedLabel(labelKey, localizationLabels);
    if (!translatedLabel || labelKey === translatedLabel) {
      return label;
    } else {
      return translatedLabel;
    }
  } else {
    return label;
  }
};

export const findItemInArrayOfObject = (arr, conditionCheckerFn) => {
  for (let i = 0; i < arr.length; i++) {
    if (conditionCheckerFn(arr[i])) {
      return arr[i];
    }
  }
};

export const getSearchResults = async (queryObject, dispatch) => {
  try {
    const response = await httpRequest(
      "post",
      "/firenoc-services/v1/_search",
      "",
      queryObject
    );
    return response;
  } catch (error) {
    store.dispatch(
      toggleSnackbar(
        true,
        { labelName: error.message, labelKey: error.message },
        "error"
      )
    );
    throw error;
  }
};

export const createNocApplication = async (state, dispatch) => {
  try {
    let payload = get(
      state.screenConfiguration.preparedFinalObject,
      "FireNOCs",
      []
    );
    set(payload[0], "tenantId", getTenantId());
    const response = await httpRequest(
      "post",
      "/firenoc-services/v1/_create",
      "",
      [],
      { FireNOCs: payload }
    );
    dispatch(prepareFinalObject("FireNOCs", response.FireNOCs));
    return true;
  } catch (error) {
    dispatch(toggleSnackbar(true, { labelName: error.message }, "error"));
    return false;
  }
};

export const prepareDocumentsUploadData = (state, dispatch) => {
  let documents = get(
    state,
    "screenConfiguration.preparedFinalObject.applyScreenMdmsData.firenoc.Documents",
    []
  );
  documents = documents.filter(item => {
    return item.active;
  });
  let documentsContract = [];
  documents.forEach(item => {
    if (item.hasMultipleRows && item.options) {
      item.options.forEach(option => {
        let doc = {};
        doc["name"] = `${item.code}_${option.code}`;
        doc["required"] = option.required ? true : false;
        doc["jsonPath"] = `FireNOCs[0].documents.${item.code}.${option.code}`;
        documentsContract.push(doc);
      });
    } else {
      let doc = {};
      doc["name"] = item.code;
      doc["required"] = item.required ? true : false;
      doc["jsonPath"] = `FireNOCs[0].documents.${item.code}`;
      if (item.hasDropdown && item.dropdownData) {
        doc["selector"] = {
          inputLabel: "Select Document",
          menuItems: get(item, "dropdownData", [])
        };
      }
      documentsContract.push(doc);
    }
  });
  dispatch(prepareFinalObject("documentsContract", documentsContract));
};
