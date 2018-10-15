import {
  getCommonHeader,
  getCommonCard,
  getCommonTitle,
  getCommonParagraph,
  getCommonGrayCard,
  getCommonContainer,
  getCommonValue,
  getCommonCaption,
  getLabel
} from "mihy-ui-framework/ui-config/screens/specs/utils";
import get from "lodash/get";
import set from "lodash/set";
import { handleScreenConfigurationFieldChange as handleField } from "mihy-ui-framework/ui-redux/screen-configuration/actions";
import { getQueryArg } from "mihy-ui-framework/ui-utils/commons";
import { prepareFinalObject } from "mihy-ui-framework/ui-redux/screen-configuration/actions";
import { getSearchResults } from "../../../../ui-utils/commons";
import { createEstimateData } from "../utils";
import { getFileUrlFromAPI } from "ui-utils/commons";

import { convertEpochToDate } from "../utils";
import { getFeesEstimateCard, getHeaderSideText } from "../utils";
import { getReviewTrade } from "./applyResource/review-trade";
import { getReviewOwner } from "./applyResource/review-owner";
import { getReviewDocuments } from "./applyResource/review-documents";
import { getApprovalDetails } from "./applyResource/approval-rejection-details";
import { footerReview } from "./applyResource/footer";

import { getBoundaryData } from "../../../../ui-utils/commons";

const status = getQueryArg(window.location.href, "status");
const tenantId = getQueryArg(window.location.href, "tenantId");
const applicationNumber = getQueryArg(
  window.location.href,
  "applicationNumber"
);
let headerSideText = "";

const setDocuments = async (
  payload,
  sourceJsonPath,
  destJsonPath,
  dispatch
) => {
  const uploadedDocData = get(payload, sourceJsonPath);

  const fileStoreIds =
    uploadedDocData &&
    uploadedDocData
      .map(item => {
        return item.fileStoreId;
      })
      .join(",");
  const fileUrlPayload =
    fileStoreIds && (await getFileUrlFromAPI(fileStoreIds));
  const reviewDocData =
    uploadedDocData &&
    uploadedDocData.map(item => {
      return {
        title: item.documentType || "",
        link:
          (fileUrlPayload &&
            fileUrlPayload[item.fileStoreId] &&
            fileUrlPayload[item.fileStoreId].split(",")[0]) ||
          "",
        linkText: "View",
        name: item.fileName || ""
      };
    });
  reviewDocData && dispatch(prepareFinalObject(destJsonPath, reviewDocData));
};

const getTradeTypeSubtypeDetails = payload => {
  const tradeUnitsFromApi = get(
    payload,
    "Licenses[0].tradeLicenseDetail.tradeUnits",
    []
  );
  const tradeUnitDetails = [];
  tradeUnitsFromApi.forEach(tradeUnit => {
    const { tradeType } = tradeUnit;
    const tradeDetails = tradeType.split(".");
    tradeUnitDetails.push({
      trade: get(tradeDetails, "[0]", ""),
      tradeType: get(tradeDetails, "[1]", ""),
      tradeSubType: get(tradeDetails, "[2]", "")
    });
  });
  return tradeUnitDetails;
};

const searchResults = async (action, state, dispatch) => {
  let queryObject = [
    { key: "tenantId", value: tenantId },
    { key: "applicationNumber", value: applicationNumber }
  ];
  let payload = await getSearchResults(queryObject);

  headerSideText = getHeaderSideText(
    get(payload, "Licenses[0].status"),
    get(payload, "Licenses[0].licenseNumber")
  );
  set(payload, "Licenses[0].headerSideText", headerSideText);

  await setDocuments(
    payload,
    "Licenses[0].tradeLicenseDetail.applicationDocuments",
    "LicensesTemp[0].reviewDocData",
    dispatch
  );
  if (
    status === "approved" ||
    status === "rejected" ||
    status === "cancelled"
  ) {
    if (get(payload, "Licenses[0].tradeLicenseDetail.verificationDocuments")) {
      await setDocuments(
        payload,
        "Licenses[0].tradeLicenseDetail.verificationDocuments",
        "LicensesTemp[0].verifyDocData",
        dispatch
      );
    } else {
      dispatch(
        handleField(
          "search-preview",
          "components.div.children.tradeReviewDetails.children.cardContent.children.approvalDetails.children.cardContent.children.viewTow.children.lbl",
          "visible",
          false
        )
      );
    }
  }
  dispatch(prepareFinalObject("Licenses[0]", payload.Licenses[0]));
  dispatch(
    prepareFinalObject(
      "LicensesTemp[0].tradeDetailsResponse",
      getTradeTypeSubtypeDetails(payload)
    )
  );
  const LicenseData = payload.Licenses[0];
  const fetchFromReceipt = status !== "pending_payment";
  createEstimateData(
    LicenseData,
    "LicensesTemp[0].estimateCardData",
    dispatch,
    {},
    fetchFromReceipt
  ); //Fetch Bill and populate estimate card
  const code = get(
    payload,
    "Licenses[0].tradeLicenseDetail.address.locality.code"
  );
  const queryObj = [{ key: "tenantId", value: tenantId }];
  getBoundaryData(action, state, dispatch, queryObj, code);
};

let titleText = "";

const setStatusBasedValue = status => {
  switch (status) {
    case "approved":
      return {
        approvalDetailsVisibility: true,
        titleText: "Review the Trade License",
        titleVisibility: true,
        roleDefination: {
          rolePath: "user-info.roles",
          roles: ["TL_APPROVER"]
        }
      };
    case "pending_payment":
      return {
        titleText: "Review the Application and Proceed",
        titleVisibility: true,
        approvalDetailsVisibility: false,
        roleDefination: {
          rolePath: "user-info.roles",
          roles: ["TL_CEMP"]
        }
      };
    case "pending_approval":
      return {
        titleText: "Review the Application and Proceed",
        titleVisibility: true,
        approvalDetailsVisibility: false,
        roleDefination: {
          rolePath: "user-info.roles",
          roles: ["TL_APPROVER"]
        }
      };
    case "cancelled":
      return {
        titleText: "",
        titleVisibility: false,
        approvalDetailsVisibility: true,
        roleDefination: {}
      };
    case "rejected":
      return {
        titleText: "",
        titleVisibility: false,
        approvalDetailsVisibility: true,
        roleDefination: {}
      };

    default:
      return {
        titleText: "",
        titleVisibility: false,
        approvalDetailsVisibility: false,
        roleDefination: {}
      };
  }
};

const headerrow = getCommonContainer({
  header: getCommonHeader({
    labelName: "Trade License Application (2018-2019)",
    labelKey: "TL_TRADE_APPLICATION"
  }),
  applicationNumber: {
    uiFramework: "custom-atoms-local",
    componentPath: "ApplicationNoContainer",
    props: {
      number: applicationNumber
    }
  }
});

const estimate = getCommonGrayCard({
  estimateSection: getFeesEstimateCard({
    sourceJsonPath: "LicensesTemp[0].estimateCardData"
  })
});

const reviewTradeDetails = getReviewTrade(false);

const reviewOwnerDetails = getReviewOwner(false);

const reviewDocumentDetails = getReviewDocuments(false, false);

let approvalDetails = getApprovalDetails(status);
let title = getCommonTitle({ labelName: titleText });

const setActionItems = (action, object) => {
  set(
    action,
    "screenConfig.components.div.children.tradeReviewDetails.children.cardContent.children.approvalDetails.visible",
    get(object, "approvalDetailsVisibility")
  );
  set(
    action,
    "screenConfig.components.div.children.tradeReviewDetails.children.cardContent.children.title",
    getCommonTitle({ labelName: get(object, "titleText") })
  );
  set(
    action,
    "screenConfig.components.div.children.tradeReviewDetails.children.cardContent.children.title.visible",
    get(object, "titleVisibility")
  );
  set(
    action,
    "screenConfig.components.div.children.tradeReviewDetails.children.cardContent.children.title.roleDefination",
    get(object, "roleDefination")
  );
};

export const tradeReviewDetails = getCommonCard({
  title,
  estimate,
  reviewTradeDetails,
  reviewOwnerDetails,
  reviewDocumentDetails,
  approvalDetails
});

const screenConfig = {
  uiFramework: "material-ui",
  name: "search-preview",
  beforeInitScreen: (action, state, dispatch) => {
    const role = getQueryArg(window.location.href, "role");
    const status = getQueryArg(window.location.href, "status");
    const applicationNumber = getQueryArg(
      window.location.href,
      "applicationNumber"
    );
    const obj = setStatusBasedValue(status);
    const footer = footerReview(status, applicationNumber, tenantId);
    set(action, "screenConfig.components.div.children.footer", footer);
    if (status === "cancelled")
      set(
        action,
        "screenConfig.components.div.children.headerDiv.children.helpSection.children.cancelledLabel.visible",
        true
      );

    setActionItems(action, obj);
    if (applicationNumber) {
      searchResults(action, state, dispatch);
    }

    return action;
  },

  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      props: {
        className: "common-div-css search-preview"
      },
      children: {
        headerDiv: {
          uiFramework: "custom-atoms",
          componentPath: "Container",
          children: {
            header1: {
              gridDefination: {
                xs: 12,
                sm: 8
              },
              ...headerrow
            },
            helpSection: {
              uiFramework: "custom-atoms",
              componentPath: "Container",
              props: {
                color: "primary",
                style: { justifyContent: "flex-end" }
              },
              gridDefination: {
                xs: 12,
                sm: 4,
                align: "right"
              },
              children: {
                buttonLabel: {
                  ...getCommonTitle({
                    jsonPath: "Licenses[0].headerSideText"
                  }),
                  gridDefination: {
                    xs: 12
                  }
                },
                cancelledLabel: {
                  ...getCommonHeader(
                    {
                      labelName: "Cancelled"
                    },
                    { variant: "body1", style: { color: "#E54D42" } }
                  ),
                  visible: false
                }
              }
            }
          }
        },
        tradeReviewDetails
        //footer
      }
    }
  }
};

export default screenConfig;
