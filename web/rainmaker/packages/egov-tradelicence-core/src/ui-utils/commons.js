import isEmpty from "lodash/isEmpty";
import { uploadFile, httpRequest } from "ui-utils/api";
import {
  convertDateToEpoch,
  getCurrentFinancialYear
} from "../ui-config/screens/specs/utils";
import { prepareFinalObject } from "mihy-ui-framework/ui-redux/screen-configuration/actions";
import { getTranslatedLabel } from "../ui-config/screens/specs/utils";
import { handleScreenConfigurationFieldChange as handleField } from "mihy-ui-framework/ui-redux/screen-configuration/actions";
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
    console.log(error);
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
    console.log(error);
  }
};

export const updatePFOforSearchResults = async (
  action,
  state,
  dispatch,
  queryValue
) => {
  let queryObject = [
    { key: "tenantId", value: "pb.amritsar" },
    { key: "applicationNumber", value: queryValue }
  ];
  const payload = await getSearchResults(queryObject);
  dispatch(prepareFinalObject("Licenses[0]", payload.Licenses[0]));
};

export const getBoundaryData = async (
  action,
  state,
  dispatch,
  queryObject,
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
    let currentFinancialYr = getCurrentFinancialYear();
    let fY1 = currentFinancialYr.split("-")[1];
    fY1 = fY1.substring(2, 4);
    currentFinancialYr = currentFinancialYr.split("-")[0] + "-" + fY1;
    set(queryObject[0], "financialYear", currentFinancialYr);
    set(queryObject[0], "validFrom", 1522540800000);
    set(queryObject[0], "validTo", 1554076799000);
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
    // const status = get(queryObject[0], "status", "");

    if (queryObject[0].applicationNumber) {
      //call update
      let action = "INITIATE";
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
      response && dispatch(prepareFinalObject("Licenses", response.Licenses));
    } else {
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
  } catch (error) {
    console.log(error);
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
        alert(`Maximum file size can be ${5} MB`);
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
