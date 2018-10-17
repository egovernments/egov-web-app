import isEmpty from "lodash/isEmpty";
import { uploadFile, httpRequest } from "ui-utils/api";
import {
  convertDateToEpoch,
  getCurrentFinancialYear,
  getCheckBoxJsonpath,
  getSafetyNormsJson,
  getHygeneLevelJson,
  getLocalityHarmedJson
} from "../ui-config/screens/specs/utils";
import { prepareFinalObject } from "mihy-ui-framework/ui-redux/screen-configuration/actions";
import { getTranslatedLabel } from "../ui-config/screens/specs/utils";
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

export const getSearchResults = async queryObject => {
  try {
    const response = await httpRequest(
      "post",
      "/tl-services/v1/_search",
      "",
      queryObject
    );
    return response;
  } catch (error) {
    store.dispatch(toggleSnackbarAndSetText(true, error.message, "error"));
  }
};

export const updatePFOforSearchResults = async (
  action,
  state,
  dispatch,
  queryValue,
  queryValuePurpose
) => {
  let queryObject = [
    { key: "tenantId", value: "pb.amritsar" },
    { key: "applicationNumber", value: queryValue }
  ];
  const payload = await getSearchResults(queryObject);
  if (queryValuePurpose !== "cancel") {
    set(payload, getSafetyNormsJson(queryValuePurpose), "yes");
    set(payload, getHygeneLevelJson(queryValuePurpose), "yes");
    set(payload, getLocalityHarmedJson(queryValuePurpose), "No");
  }
  set(payload, getCheckBoxJsonpath(queryValuePurpose), true);

  payload && dispatch(prepareFinalObject("Licenses[0]", payload.Licenses[0]));
  setApplicationNumberBox(state, dispatch);
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
            "Licenses[0].tradeLicenseDetail.address.locality.label",
            messageObject.name
          )
        );
    }
  } catch (e) {
    console.log(e);
  }
};

export const applyTradeLicense = async (state, dispatch) => {
  try {
    let queryObject = JSON.parse(
      JSON.stringify(
        get(state.screenConfiguration.preparedFinalObject, "Licenses", [])
      )
    );
    let isfreshApplication = true;
    let currentFinancialYr = getCurrentFinancialYear();
    let fY1 = currentFinancialYr.split("-")[1];
    let applicationNumber = get(queryObject[0], "applicationNumber");
    let tenantId = get(queryObject[0], "tenantId");
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
    set(queryObject[0], "tradeLicenseDetail.owners", owners);
    set(queryObject[0], "tenantId", "pb.amritsar");

    if (queryObject[0].applicationNumber) {
      //call update
      let accessories = get(
        queryObject[0],
        "tradeLicenseDetail.accessories"
      ).reduce((result, item) => {
        if (item && item !== null) {
          if (item.hasOwnProperty("id")) {
            if (item.hasOwnProperty("active") && item.active) {
              if (item.hasOwnProperty("isDeleted") && !item.isDeleted) {
                set(item, "active", false);
                result.push(item);
              } else {
                result.push(item);
              }
            } else if (item.hasOwnProperty("active") && !item.active) {
              // result.push(item);
            }
          } else {
            result.push(item);
          }
        }
        return result;
      }, []);
      set(queryObject[0], "tradeLicenseDetail.accessories", accessories);

      let action = "INITIATE";
      isfreshApplication = false;
      if (
        queryObject[0].tradeLicenseDetail &&
        queryObject[0].tradeLicenseDetail.applicationDocuments
      ) {
        action = "APPLY";
      }
      set(queryObject[0], "action", action);
      const response = await httpRequest(
        "post",
        "/tl-services/v1/_update",
        "",
        [],
        { Licenses: queryObject }
      );

      // const searchResponse = await getSearchResults([
      //   { key: "tenantId", value: tenantId },
      //   { key: "applicationNumber", value: applicationNumber }
      // ]);

      dispatch(prepareFinalObject("Licenses", response.Licenses));
    } else {
      let accessories = get(
        queryObject[0],
        "tradeLicenseDetail.accessories"
      ).filter(item => !item.hasOwnProperty("isDeleted"));
      set(queryObject[0], "tradeLicenseDetail.accessories", accessories);
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
    dispatch(
      toggleSnackbarAndSetText(
        true,
        "Could not create/update trade license appication",
        "error"
      )
    );
    console.log(error);
    return false;
  }
};

const convertOwnerDobToEpoch = owners => {
  let updatedOwners =
    owners &&
    owners.map(owner => {
      owner.dob = convertDateToEpoch(owner.dob, "dayend");
      return owner;
    });
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
  const { inputProps, maxFileSize } = props;
  const input = event.target;
  if (input.files && input.files.length > 0) {
    const files = input.files;
    Object.keys(files).forEach(async (key, index) => {
      const file = files[key];
      const fileValid = isFileValid(file, acceptedFiles(inputProps.accept));
      const isSizeValid = getFileSize(file) <= maxFileSize;
      if (!fileValid) {
        alert(`Only image or pdf files can be uploaded`);
        return;
      }
      if (!isSizeValid) {
        alert(`Maximum file size can be ${Math.round(maxFileSize / 1000)} MB`);
        return;
      }
      if (file.type.match(/^image\//)) {
        const imageUri = await getImageUrlByFile(file);
        const fileStoreId = await uploadFile(
          S3_BUCKET.endPoint,
          "rainmaker-pgr",
          file,
          "pb"
        );
        handleDocument(file, fileStoreId);
      } else {
        const fileStoreId = await uploadFile(
          S3_BUCKET.endPoint,
          "RAINMAKER-PGR",
          file,
          "pb"
        );
        handleDocument(file, fileStoreId);
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
