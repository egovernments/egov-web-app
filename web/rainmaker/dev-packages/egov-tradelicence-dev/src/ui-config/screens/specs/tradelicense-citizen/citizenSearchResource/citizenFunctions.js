import get from "lodash/get";
import { getSearchResults } from "../../../../../ui-utils/commons";
import { convertEpochToDate } from "../../utils/index";
import { httpRequest } from "../../../../../ui-utils";
import {
  handleScreenConfigurationFieldChange as handleField,
  prepareFinalObject
} from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getLocalization } from "egov-ui-kit/utils/localStorageUtils";

const getLocalTextFromCode = localCode => {
  return JSON.parse(getLocalization("localization_en_IN")).find(
    item => item.code == localCode
  );
};
const getMdmsData = async () => {
  let mdmsBody = {
    MdmsCriteria: {
      tenantId: "pb",
      moduleDetails: [
        {
          moduleName: "tenant",
          masterDetails: [{ name: "citymodule" }]
        }
      ]
    }
  };
  try {
    let payload = await httpRequest(
      "post",
      "/egov-mdms-service/v1/_search",
      "_search",
      [],
      mdmsBody
    );
    return payload;
  } catch (e) {
    console.log(e);
  }
};
export const fetchData = async (action, state, dispatch) => {
  const response = await getSearchResults();
  const mdmsRes = await getMdmsData(dispatch);
  let tenants =
    mdmsRes &&
    mdmsRes.MdmsRes &&
    mdmsRes.MdmsRes.tenant.citymodule.find(item => {
      if (item.code === "TL") return true;
    });
  dispatch(
    prepareFinalObject(
      "applyScreenMdmsData.common-masters.citiesByModule.TL",
      tenants
    )
  );
  try {
    let data =
      response &&
      response.Licenses.map(item => ({
        [get(textToLocalMapping, "Application No")]:
          item.applicationNumber || "-",
        [get(textToLocalMapping, "License No")]: item.licenseNumber || "-",
        [get(textToLocalMapping, "Trade Name")]: item.tradeName || "-",
        [get(textToLocalMapping, "Owner Name")]:
          item.tradeLicenseDetail.owners[0].name || "-",
        [get(textToLocalMapping, "Application Date")]:
          convertEpochToDate(item.applicationDate) || "-",
        tenantId: item.tenantId,
        [get(textToLocalMapping, "Status")]:
          get(textToLocalMapping, item.status) || "-"
      }));
    dispatch(
      handleField(
        "home",
        "components.div.children.applyCard.children.searchResults",
        "props.data",
        data
      )
    );
  } catch (error) {
    console.log(error);
  }
};

export const textToLocalMapping = {
  "Application No": get(
    getLocalTextFromCode("TL_COMMON_TABLE_COL_APP_NO"),
    "message"
    // "Application No"
  ),
  "License No": get(
    getLocalTextFromCode("TL_COMMON_TABLE_COL_LIC_NO"),
    "message"
    // "License No"
  ),
  "Trade Name": get(
    getLocalTextFromCode("TL_COMMON_TABLE_COL_TRD_NAME"),
    "message"
    // "Trade Name"
  ),
  "Owner Name": get(
    getLocalTextFromCode("TL_COMMON_TABLE_COL_OWN_NAME"),
    "message"
    // "Owner Name"
  ),
  "Application Date": get(
    getLocalTextFromCode("TL_COMMON_TABLE_COL_APP_DATE"),
    "message"
    // "Application Date"
  ),
  Status: get(
    getLocalTextFromCode("TL_COMMON_TABLE_COL_STATUS"),
    "message"
    // "Status"
  ),
  INITIATED: get(getLocalTextFromCode("TL_INITIATED"), "message"),
  APPLIED: get(getLocalTextFromCode("TL_APPLIED"), "message"),
  PAID: get(
    getLocalTextFromCode("WF_NEWTL_PENDINGAPPROVAL"),
    "message"
    // "PAID"
  ),
  PENDINGAPPROVAL: get(
    getLocalTextFromCode("WF_NEWTL_PENDINGAPPROVAL"),
    "message"
    // "Pending for Approval"
  ),
  PENDINGPAYMENT: get(
    getLocalTextFromCode("WF_NEWTL_PENDINGPAYMENT"),
    "message"
    // "Pending payment"
  ),
  FIELDINSPECTION: get(
    getLocalTextFromCode("WF_NEWTL_FIELDINSPECTION"),
    "message"
    // "Pending for Field Inspection"
  ),
  APPROVED: get(getLocalTextFromCode("TL_APPROVED"), "message"),
  REJECTED: get(getLocalTextFromCode("TL_REJECTED"), "message"),
  CANCELLED: get(getLocalTextFromCode("TL_CANCELLED"), "message"),
  MY_APPLICATIONS: get(
    getLocalTextFromCode("TL_MY_APPLICATIONS"),
    "message"
    // "My Applications"
  )
};
