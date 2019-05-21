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
  let tempDoc = {};
  documents.forEach(doc => {
    let card = {};
    card["code"] = doc.documentType;
    card["title"] = doc.documentType;
    card["cards"] = [];
    tempDoc[doc.documentType] = card;
  });

  documents.forEach(doc => {
    let card = {};
    card["name"] = doc.code;

    // Handle the case for multiple muildings
    if (doc.code === "BUILDING_PLAN" && doc.hasMultipleRows && doc.options) {
      card["hasSubCards"] = true;
      card["subCards"] = [];
      doc.options.forEach(subDoc => {
        let subCard = {};
        subCard["name"] = subDoc.code;
        subCard["required"] = subDoc.required ? true : false;
        card.subCards.push(subCard);
      });
    } else {
      card["required"] = doc.required ? true : false;
    }
    tempDoc[doc.documentType].cards.push(card);
  });

  Object.keys(tempDoc).forEach(key => {
    documentsContract.push(tempDoc[key]);
  });

  console.log("+++++", documentsContract);
  console.log("+++++", tempDoc);

  // let documentsContract = [];
  // let documentsCards = {};
  // documents.forEach(item => {
  //   // Initialize a map with keys as documentType (eg. Owner, Building)
  //   documentsCards[item.documentType] = get(
  //     documentsCards,
  //     item.documentType,
  //     []
  //   );

  //   // Handling multiple buildings by calculating cards required
  //   if (item.hasMultipleRows && item.options && item.code === "BUILDING_PLAN") {
  //     // Get the buildings added in property details step
  //     let buildings = get(
  //       state,
  //       "screenConfiguration.preparedFinalObject.FireNOCs[0].fireNOCDetails.buildings",
  //       [{ name: "ASd" }]
  //     );
  //     // For each building, be it 0 or >0, add the cards in contract
  //     buildings.forEach((building, key) => {
  //       item.options.forEach(option => {
  //         let doc = {};
  //         doc["name"] = `${item.code}_${option.code}`;
  //         doc["required"] = option.required ? true : false;
  //         doc["jsonPath"] = `uploadedDocuments.${item.documentType}[${key}].${
  //           item.code
  //         }.${option.code}`;
  //         doc["buildingName"] = building.name;
  //         documentsCards[item.documentType].push(doc);
  //       });
  //     });
  //   }
  //   // In case of multiple rows with options (Eg. Building plans, FireStations plans)
  //   else if (item.hasMultipleRows && item.options) {
  //     item.options.forEach(option => {
  //       let doc = {};
  //       doc["name"] = `${item.code}_${option.code}`;
  //       doc["required"] = option.required ? true : false;
  //       doc["jsonPath"] = `FireNOCs[0].documents.${item.code}.${option.code}`;
  //       documentsCards[item.documentType].push(doc);
  //     });
  //   } else {
  //     let doc = {};
  //     doc["name"] = item.code;
  //     doc["required"] = item.required ? true : false;
  //     doc["jsonPath"] = `FireNOCs[0].documents.${item.code}`;
  //     if (item.hasDropdown && item.dropdownData) {
  //       doc["selector"] = {
  //         inputLabel: "Select Document",
  //         menuItems: get(item, "dropdownData", [])
  //       };
  //     }
  //     // documentsContract.push(doc);
  //     documentsCards[item.documentType].push(doc);
  //   }
  // });
  // documentsContract = Object.keys(documentsCards).map(key => {
  //   return {
  //     name: `NOC_${key}_CARD_HEADER`,
  //     code: key,
  //     children: documentsCards[key]
  //   };
  // });
  // console.log("+++++=========", documentsContract);
  // console.log("+++++=========", documentsCards);
  dispatch(prepareFinalObject("documentsContract", documentsContract));
};
