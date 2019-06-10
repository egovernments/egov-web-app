import { prepareFinalObject, toggleSnackbar } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { httpRequest } from "egov-ui-framework/ui-utils/api";
import { getTenantId } from "egov-ui-kit/utils/localStorageUtils";
import jp from "jsonpath";
import get from "lodash/get";
import set from "lodash/set";
import store from "ui-redux/store";
import { getTranslatedLabel } from "../ui-config/screens/specs/utils";

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
    const response = await httpRequest("post", "/firenoc-services/v1/_search", "", queryObject);
    return response;
  } catch (error) {
    store.dispatch(toggleSnackbar(true, { labelName: error.message, labelKey: error.message }, "error"));
    throw error;
  }
};

export const createUpdateNocApplication = async (state, dispatch) => {
  let nocId = get(state, "screenConfiguration.preparedFinalObject.FireNOCs[0].id");
  let method = nocId ? "UPDATE" : "CREATE";
  try {
    let payload = get(state.screenConfiguration.preparedFinalObject, "FireNOCs", []);
    set(payload[0], "tenantId", getTenantId());
    set(payload[0], "fireNOCDetails.action", "INITIATE");

    // Get uploaded documents from redux
    let reduxDocuments = get(state, "screenConfiguration.preparedFinalObject.documentsUploadRedux", {});

    let buildings = get(payload, "[0].fireNOCDetails.buildings", []);
    buildings.forEach((item, index) => {
      // GET UOMS FOR THE SELECTED BUILDING TYPE
      let uoms = get(
        state,
        "screenConfiguration.preparedFinalObject.applyScreenMdmsData.firenoc.BuildingType",
        []
      ).filter(buildingType => {
        return buildingType.code === item.usageSubType;
      });
      uoms = get(uoms, "[0].uom", []);
      // GET UNIQUE UOMS LIST INCLUDING THE DEFAULT
      uoms = [
        ...new Set([...uoms, ...["NO_OF_FLOORS", "NO_OF_BASEMENTS", "PLOT_SIZE", "BUILTUP_AREA", "HEIGHT_OF_BUILDING"]])
      ];
      let finalUoms = [];
      uoms.forEach(uom => {
        let value = get(item.uoms, uom);
        value &&
          finalUoms.push({
            code: uom,
            value: parseInt(value),
            isActiveUom: true,
            active: true
          });
      });
      set(payload[0], `fireNOCDetails.buildings[${index}].uoms`, finalUoms);

      // Set building documents
      let uploadedDocs = [];
      jp.query(reduxDocuments, "$.*").forEach(doc => {
        if (doc.documents && doc.documents.length > 0) {
          if (doc.documentSubCode && doc.documentSubCode.startsWith("BUILDING.BUILDING_PLAN")) {
            if (doc.documentCode === item.name) {
              uploadedDocs = [
                ...uploadedDocs,
                {
                  tenantId: getTenantId(),
                  documentType: doc.documentSubCode,
                  fileStoreId: doc.documents[0].fileStoreId
                }
              ];
            }
          }
        }
      });
      set(payload[0], `fireNOCDetails.buildings[${index}].applicationDocuments`, uploadedDocs);
    });

    // Set owners & other documents
    let ownerDocuments = [];
    let otherDocuments = [];
    jp.query(reduxDocuments, "$.*").forEach(doc => {
      if (doc.documents && doc.documents.length > 0) {
        if (doc.documentType === "OWNER") {
          ownerDocuments = [
            ...ownerDocuments,
            { tenantId: getTenantId(), documentType: doc.documentCode, fileStoreId: doc.documents[0].fileStoreId }
          ];
        } else if (!doc.documentSubCode) {
          // SKIP BUILDING PLAN DOCS
          otherDocuments = [
            ...otherDocuments,
            { tenantId: getTenantId(), documentType: doc.documentCode, fileStoreId: doc.documents[0].fileStoreId }
          ];
        }
      }
    });

    set(payload[0], "fireNOCDetails.applicantDetails.additionalDetail.documents", ownerDocuments);
    set(payload[0], "fireNOCDetails.additionalDetail.documents", otherDocuments);

    if (method === "CREATE") {
      const response = await httpRequest("post", "/firenoc-services/v1/_create", "", [], { FireNOCs: payload });
      dispatch(prepareFinalObject("FireNOCs", response.FireNOCs));
    } else if (method === "UPDATE") {
      const response = await httpRequest("post", "/firenoc-services/v1/_update", "", [], { FireNOCs: payload });
      dispatch(prepareFinalObject("FireNOCs", response.FireNOCs));
    }
    return true;
  } catch (error) {
    dispatch(toggleSnackbar(true, { labelName: error.message }, "error"));
    return false;
  }
};

export const prepareDocumentsUploadData = (state, dispatch) => {
  let documents = get(state, "screenConfiguration.preparedFinalObject.applyScreenMdmsData.FireNoc.Documents", []);
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
    // Handle the case for multiple muildings
    if (doc.code === "BUILDING.BUILDING_PLAN" && doc.hasMultipleRows && doc.options) {
      let buildingsData = get(
        state,
        "screenConfiguration.preparedFinalObject.FireNOCs[0].fireNOCDetails.buildings",
        []
      );

      buildingsData.forEach(building => {
        let card = {};
        card["name"] = building.name;
        card["code"] = doc.code;
        card["hasSubCards"] = true;
        card["subCards"] = [];
        doc.options.forEach(subDoc => {
          let subCard = {};
          subCard["name"] = subDoc.code;
          subCard["required"] = subDoc.required ? true : false;
          card.subCards.push(subCard);
        });
        tempDoc[doc.documentType].cards.push(card);
      });
    } else {
      let card = {};
      card["name"] = doc.code;
      card["code"] = doc.code;
      card["required"] = doc.required ? true : false;
      if (doc.hasDropdown && doc.dropdownData) {
        let dropdown = {};
        dropdown.label = "NOC_SELECT_DOC_DD_LABEL";
        dropdown.required = true;
        dropdown.menu = doc.dropdownData.filter(item => {
          return item.active;
        });
        card["dropdown"] = dropdown;
      }
      tempDoc[doc.documentType].cards.push(card);
    }
  });

  Object.keys(tempDoc).forEach(key => {
    documentsContract.push(tempDoc[key]);
  });

  dispatch(prepareFinalObject("documentsContract", documentsContract));
};

export const prepareDocumentsUploadRedux = (state, dispatch) => {
  const { documentsList, documentsUploadRedux = {}, prepareFinalObject } = this.props;
  let index = 0;
  documentsList.forEach(docType => {
    docType.cards &&
      docType.cards.forEach(card => {
        if (card.subCards) {
          card.subCards.forEach(subCard => {
            let oldDocType = get(documentsUploadRedux, `[${index}].documentType`);
            let oldDocCode = get(documentsUploadRedux, `[${index}].documentCode`);
            let oldDocSubCode = get(documentsUploadRedux, `[${index}].documentSubCode`);
            if (oldDocType != docType.code || oldDocCode != card.name || oldDocSubCode != subCard.name) {
              documentsUploadRedux[index] = {
                documentType: docType.code,
                documentCode: card.name,
                documentSubCode: subCard.name
              };
            }
            index++;
          });
        } else {
          let oldDocType = get(documentsUploadRedux, `[${index}].documentType`);
          let oldDocCode = get(documentsUploadRedux, `[${index}].documentCode`);
          if (oldDocType != docType.code || oldDocCode != card.name) {
            documentsUploadRedux[index] = {
              documentType: docType.code,
              documentCode: card.name
            };
          }
        }
        index++;
      });
  });
  prepareFinalObject("documentsUploadRedux", documentsUploadRedux);
};
