import { uploadFile, httpRequest } from "ui-utils/api";
import {
  convertDateToEpoch,
  getCurrentFinancialYear,
  getCheckBoxJsonpath,
  getSafetyNormsJson,
  getHygeneLevelJson,
  getLocalityHarmedJson,
  setFilteredTradeTypes
} from "../ui-config/screens/specs/utils";
import { prepareFinalObject } from "mihy-ui-framework/ui-redux/screen-configuration/actions";
import {
  getTranslatedLabel,
  updateDropDowns,
  ifUserRoleExists
} from "../ui-config/screens/specs/utils";
import { handleScreenConfigurationFieldChange as handleField } from "mihy-ui-framework/ui-redux/screen-configuration/actions";
import { toggleSnackbarAndSetText } from "mihy-ui-framework/ui-redux/app/actions";
import store from "../ui-redux/store";
import get from "lodash/get";
import set from "lodash/set";

export const updateTradeDetails = async requestBody => {
  try {
    const payload = await httpRequest(
      "post",
      "/tl-services/v1/_update",
      "",
      [],
      requestBody
    );
    return payload;
  } catch (error) {
    store.dispatch(toggleSnackbarAndSetText(true, error.message, "error"));
    throw error;
  }
};

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

export const getFileUrlFromAPI = async fileStoreId => {
  const queryObject = [
    { key: "tenantId", value: "pb" },
    { key: "fileStoreIds", value: fileStoreId }
  ];
  try {
    const fileUrl = await httpRequest(
      "get",
      "/filestore/v1/files/url",
      "",
      queryObject
    );
    return fileUrl;
  } catch (e) {
    console.log(e);
  }
};

// HRMS Search API
export const getSearchResults = async queryObject => {
  try {
    const response = await httpRequest(
      "post",
      "/egov-hrms/employees/_search",
      "",
      queryObject
    );
    return response;
  } catch (error) {
    store.dispatch(toggleSnackbarAndSetText(true, error.message, "error"));
  }
};

// HRMS Search API
export const createEmployee = async (queryObject, payload) => {
  try {
    const response = await httpRequest(
      "post",
      "/egov-hrms/employees/_create",
      "",
      queryObject,
      { Employees: payload }
    );
    return response;
  } catch (error) {
    store.dispatch(toggleSnackbarAndSetText(true, error.message, "error"));
    throw error;
  }
};

// HRMS Update API
export const updateEmployee = async (queryObject, payload) => {
  try {
    const response = await httpRequest(
      "post",
      "/egov-hrms/employees/_update",
      "",
      queryObject,
      { Employees: payload }
    );
    return response;
  } catch (error) {
    store.dispatch(toggleSnackbarAndSetText(true, error.message, "error"));
    throw error;
  }
};

export const updatePFOforSearchResults = async (
  action,
  state,
  dispatch,
  queryValue,
  queryValuePurpose,
  tenantId
) => {
  let queryObject = [
    {
      key: "tenantId",
      value: tenantId ? tenantId : localStorage.getItem("tenant-id")
    },
    { key: "applicationNumber", value: queryValue }
  ];
  const payload = await getSearchResults(queryObject);
  if (payload) {
    dispatch(prepareFinalObject("Licenses[0]", payload.Licenses[0]));
  }
  const licenseType = payload && get(payload, "Licenses[0].licenseType");
  const structureSubtype =
    payload && get(payload, "Licenses[0].tradeLicenseDetail.structureType");
  setFilteredTradeTypes(state, dispatch, licenseType, structureSubtype);
  updateDropDowns(payload, action, state, dispatch, queryValue);

  if (queryValuePurpose !== "cancel") {
    set(payload, getSafetyNormsJson(queryValuePurpose), "yes");
    set(payload, getHygeneLevelJson(queryValuePurpose), "yes");
    set(payload, getLocalityHarmedJson(queryValuePurpose), "No");
  }
  set(payload, getCheckBoxJsonpath(queryValuePurpose), true);

  setApplicationNumberBox(state, dispatch);
  // return action;
};

export const getBoundaryData = async (
  action,
  state,
  dispatch,
  queryObject,
  code,
  componentPath
) => {
  try {
    let payload = await httpRequest(
      "post",
      "/egov-location/location/v11/boundarys/_search?hierarchyTypeCode=REVENUE&boundaryType=Locality",
      "_search",
      queryObject,
      {}
    );

    dispatch(
      prepareFinalObject(
        "applyScreenMdmsData.tenant.localities",
        payload.TenantBoundary && payload.TenantBoundary[0].boundary
      )
    );

    dispatch(
      handleField(
        "apply",
        "components.div.children.formwizardFirstStep.children.tradeLocationDetails.children.cardContent.children.tradeDetailsConatiner.children.tradeLocMohalla",
        "props.suggestions",
        payload.TenantBoundary && payload.TenantBoundary[0].boundary
      )
    );
    if (code) {
      let data = payload.TenantBoundary[0].boundary;
      let messageObject =
        data &&
        data.find(item => {
          return item.code == code;
        });
      if (messageObject)
        dispatch(
          prepareFinalObject(
            "Licenses[0].tradeLicenseDetail.address.locality.name",
            messageObject.name
          )
        );
    }
  } catch (e) {
    console.log(e);
  }
};

const getMultiUnits = multiUnits => {
  let hasTradeType = false;
  let hasAccessoryType = false;

  let mergedUnits =
    multiUnits &&
    multiUnits.reduce((result, item) => {
      hasTradeType = item.hasOwnProperty("tradeType");
      hasAccessoryType = item.hasOwnProperty("accessoryCategory");
      if (item && item !== null && (hasTradeType || hasAccessoryType)) {
        if (item.hasOwnProperty("id")) {
          if (item.hasOwnProperty("active") && item.active) {
            if (item.hasOwnProperty("isDeleted") && !item.isDeleted) {
              set(item, "active", false);
              result.push(item);
            } else {
              result.push(item);
            }
          }
        } else {
          if (!item.hasOwnProperty("isDeleted")) {
            result.push(item);
          }
        }
      }
      return result;
    }, []);

  return mergedUnits;
};

// const getMultipleAccessories = licenses => {
//   let accessories = get(licenses, "tradeLicenseDetail.accessories");
//   let mergedAccessories =
//     accessories &&
//     accessories.reduce((result, item) => {
//       if (item && item !== null && item.hasOwnProperty("accessoryCategory")) {
//         if (item.hasOwnProperty("id")) {
//           if (item.hasOwnProperty("active") && item.active) {
//             if (item.hasOwnProperty("isDeleted") && !item.isDeleted) {
//               set(item, "active", false);
//               result.push(item);
//             } else {
//               result.push(item);
//             }
//           }
//         } else {
//           if (!item.hasOwnProperty("isDeleted")) {
//             result.push(item);
//           }
//         }
//       }
//       return result;
//     }, []);

//   return mergedAccessories;
// };

const getMultipleOwners = owners => {
  let mergedOwners =
    owners &&
    owners.reduce((result, item) => {
      if (item && item !== null && item.hasOwnProperty("mobileNumber")) {
        if (item.hasOwnProperty("active") && item.active) {
          if (item.hasOwnProperty("isDeleted") && !item.isDeleted) {
            set(item, "active", false);
            result.push(item);
          } else {
            result.push(item);
          }
        } else {
          if (!item.hasOwnProperty("isDeleted")) {
            result.push(item);
          }
        }
      }
      return result;
    }, []);

  return mergedOwners;
};

export const applyTradeLicense = async (state, dispatch, activeIndex) => {
  try {
    let queryObject = JSON.parse(
      JSON.stringify(
        get(state.screenConfiguration.preparedFinalObject, "Licenses", [])
      )
    );
    let currentFinancialYr = getCurrentFinancialYear();
    //Changing the format of FY
    let fY1 = currentFinancialYr.split("-")[1];
    fY1 = fY1.substring(2, 4);
    currentFinancialYr = currentFinancialYr.split("-")[0] + "-" + fY1;
    set(queryObject[0], "financialYear", currentFinancialYr);
    set(
      queryObject[0],
      "validFrom",
      convertDateToEpoch(queryObject[0].validFrom, "dayend")
    );
    set(
      queryObject[0],
      "validTo",
      convertDateToEpoch(queryObject[0].validTo, "dayend")
    );
    if (queryObject[0] && queryObject[0].commencementDate) {
      queryObject[0].commencementDate = convertDateToEpoch(
        queryObject[0].commencementDate,
        "dayend"
      );
    }
    let owners = get(queryObject[0], "tradeLicenseDetail.owners");
    owners = (owners && convertOwnerDobToEpoch(owners)) || [];

    //set(queryObject[0], "tradeLicenseDetail.owners", getMultipleOwners(owners));
    const cityId = get(
      queryObject[0],
      "tradeLicenseDetail.address.tenantId",
      ""
    );
    const tenantId = ifUserRoleExists("CITIZEN")
      ? cityId
      : localStorage.getItem("tenant-id");

    set(queryObject[0], "tenantId", tenantId);

    if (queryObject[0].applicationNumber) {
      //call update
      let accessories = get(queryObject[0], "tradeLicenseDetail.accessories");
      let tradeUnits = get(queryObject[0], "tradeLicenseDetail.tradeUnits");
      set(
        queryObject[0],
        "tradeLicenseDetail.tradeUnits",
        getMultiUnits(tradeUnits)
      );
      set(
        queryObject[0],
        "tradeLicenseDetail.accessories",
        getMultiUnits(accessories)
      );
      set(
        queryObject[0],
        "tradeLicenseDetail.owners",
        getMultipleOwners(owners)
      );

      let action = "INITIATE";
      if (
        queryObject[0].tradeLicenseDetail &&
        queryObject[0].tradeLicenseDetail.applicationDocuments &&
        activeIndex === 1
      ) {
        set(queryObject[0], "tradeLicenseDetail.applicationDocuments", null);
      } else if (
        queryObject[0].tradeLicenseDetail &&
        queryObject[0].tradeLicenseDetail.applicationDocuments
      ) {
        action = "APPLY";
      }
      set(queryObject[0], "action", action);
      const updateResponse = await httpRequest(
        "post",
        "/tl-services/v1/_update",
        "",
        [],
        { Licenses: queryObject }
      );
      let searchQueryObject = [
        { key: "tenantId", value: queryObject[0].tenantId },
        { key: "applicationNumber", value: queryObject[0].applicationNumber }
      ];
      let searchResponse = await getSearchResults(searchQueryObject);
      dispatch(prepareFinalObject("Licenses", searchResponse.Licenses));
      const updatedtradeUnits = get(
        searchResponse,
        "Licenses[0].tradeLicenseDetail.tradeUnits"
      );
      const tradeTemp = updatedtradeUnits.map((item, index) => {
        return {
          tradeSubType: item.tradeType.split(".")[1],
          tradeType: item.tradeType.split(".")[0]
        };
      });
      dispatch(prepareFinalObject("LicensesTemp.tradeUnits", tradeTemp));
    } else {
      let accessories = get(queryObject[0], "tradeLicenseDetail.accessories");
      let tradeUnits = get(queryObject[0], "tradeLicenseDetail.tradeUnits");
      // let owners = get(queryObject[0], "tradeLicenseDetail.owners");
      let mergedTradeUnits =
        tradeUnits &&
        tradeUnits.filter(item => !item.hasOwnProperty("isDeleted"));
      let mergedAccessories =
        accessories &&
        accessories.filter(item => !item.hasOwnProperty("isDeleted"));
      let mergedOwners =
        owners && owners.filter(item => !item.hasOwnProperty("isDeleted"));

      set(queryObject[0], "tradeLicenseDetail.tradeUnits", mergedTradeUnits);
      set(queryObject[0], "tradeLicenseDetail.accessories", mergedAccessories);
      set(queryObject[0], "tradeLicenseDetail.owners", mergedOwners);
      set(queryObject[0], "action", "INITIATE");
      const response = await httpRequest(
        "post",
        "/tl-services/v1/_create",
        "",
        [],
        { Licenses: queryObject }
      );
      dispatch(prepareFinalObject("Licenses", response.Licenses));
    }
    /** Application no. box setting */
    setApplicationNumberBox(state, dispatch);
    return true;
  } catch (error) {
    dispatch(toggleSnackbarAndSetText(true, error.message, "error"));
    console.log(error);
    return false;
  }
};

const convertOwnerDobToEpoch = owners => {
  let updatedOwners =
    owners &&
    owners
      .map(owner => {
        return {
          ...owner,
          dob:
            owner && owner !== null && convertDateToEpoch(owner.dob, "dayend")
        };
      })
      .filter(item => item && item !== null);
  return updatedOwners;
};

export const getImageUrlByFile = file => {
  return new Promise(resolve => {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = e => {
      const fileurl = e.target.result;
      resolve(fileurl);
    };
  });
};

export const getFileSize = file => {
  const size = parseFloat(file.size / 1024).toFixed(2);
  return size;
};

export const isFileValid = (file, acceptedFiles) => {
  const mimeType = file["type"];
  return (
    (mimeType &&
      acceptedFiles &&
      acceptedFiles.indexOf(mimeType.split("/")[1]) > -1) ||
    false
  );
};

export const acceptedFiles = acceptedExt => {
  const splitExtByName = acceptedExt.split(",");
  const acceptedFileTypes = splitExtByName.reduce((result, curr) => {
    if (curr.includes("image")) {
      result.push("image");
    } else {
      result.push(curr.split(".")[1]);
    }
    return result;
  }, []);
  return acceptedFileTypes;
};

export const handleFileUpload = (event, handleDocument, props) => {
  const S3_BUCKET = {
    endPoint: "filestore/v1/files"
  };
  let uploadDocument = true;
  const { inputProps, maxFileSize } = props;
  const input = event.target;
  if (input.files && input.files.length > 0) {
    const files = input.files;
    Object.keys(files).forEach(async (key, index) => {
      const file = files[key];
      const fileValid = isFileValid(file, acceptedFiles(inputProps.accept));
      const isSizeValid = getFileSize(file) <= maxFileSize;
      if (!fileValid) {
        // store.dispatch(
        //   toggleSnackbarAndSetText(
        //     true,
        //     `Only image or pdf files can be uploaded`,
        //     "error"
        //   )
        // );
        alert(`Only image or pdf files can be uploaded`);
        uploadDocument = false;
      }
      if (!isSizeValid) {
        // store.dispatch(
        //   toggleSnackbarAndSetText(
        //     true,
        //     `Maximum file size can be ${Math.round(maxFileSize / 1000)} MB`,
        //     "error"
        //   )
        // );
        alert(`Maximum file size can be ${Math.round(maxFileSize / 1000)} MB`);
        uploadDocument = false;
      }
      if (uploadDocument) {
        if (file.type.match(/^image\//)) {
          //const imageUri = await getImageUrlByFile(file);
          const fileStoreId = await uploadFile(
            S3_BUCKET.endPoint,
            "TL",
            file,
            "pb"
          );
          handleDocument(file, fileStoreId);
        } else {
          const fileStoreId = await uploadFile(
            S3_BUCKET.endPoint,
            "TL",
            file,
            "pb"
          );
          handleDocument(file, fileStoreId);
        }
      }
    });
  }
};

const setApplicationNumberBox = (state, dispatch) => {
  let applicationNumber = get(
    state,
    "screenConfiguration.preparedFinalObject.Licenses[0].applicationNumber",
    null
  );
  if (applicationNumber) {
    dispatch(
      handleField(
        "apply",
        "components.div.children.headerDiv.children.header.children.applicationNumber",
        "visible",
        true
      )
    );
    dispatch(
      handleField(
        "apply",
        "components.div.children.headerDiv.children.header.children.applicationNumber",
        "props.number",
        applicationNumber
      )
    );
  }
};

export const findItemInArrayOfObject = (arr, conditionCheckerFn) => {
  for (let i = 0; i < arr.length; i++) {
    if (conditionCheckerFn(arr[i])) {
      return arr[i];
    }
  }
};
