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
import { getCancelDetails } from "./applyResource/cancel-details";
import { getRejectionDetails } from "./applyResource/reject-details";
import { footerReview } from "./applyResource/footer";

const status = getQueryArg(window.location.href, "status");
const tenantId = getQueryArg(window.location.href, "tenantId");
const applicationNumber = getQueryArg(
  window.location.href,
  "applicationNumber"
);
let headerSideText = "";

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
  set(
    payload,
    "Licenses[0].validFrom",
    convertEpochToDate(get(payload, "Licenses[0].validFrom"))
  );
  set(
    payload,
    "Licenses[0].validTo",
    convertEpochToDate(get(payload, "Licenses[0].validTo"))
  );
  set(
    payload,
    "Licenses[0].commencementDate",
    convertEpochToDate(get(payload, "Licenses[0].commencementDate"))
  );

  set(
    payload,
    "Licenses[0].tradeLicenseDetail.owners[0].dob",
    convertEpochToDate(
      get(payload, "Licenses[0].tradeLicenseDetail.owners[0].dob")
    )
  );

  headerSideText = getHeaderSideText(
    get(payload, "Licenses[0].status"),
    get(payload, "Licenses[0].licenseNumber")
  );
  set(payload, "Licenses[0].headerSideText", headerSideText);
  const uploadedDocData = get(
    payload,
    "Licenses[0].tradeLicenseDetail.applicationDocuments"
  );
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
  reviewDocData &&
    dispatch(
      prepareFinalObject("LicensesTemp[0].reviewDocData", reviewDocData)
    );
  dispatch(prepareFinalObject("Licenses[0]", payload.Licenses[0]));
  dispatch(
    prepareFinalObject(
      "LicensesTemp[0].tradeDetailsResponse",
      getTradeTypeSubtypeDetails(payload)
    )
  );
  const LicenseData = payload.Licenses[0];
  const fetchFromReceipt = true;
  createEstimateData(
    LicenseData,
    "LicensesTemp[0].estimateCardData",
    dispatch,
    {},
    fetchFromReceipt
  ); //Fetch Bill and populate estimate card
};

let titleText = "";

const setStatusBasedValue = status => {
  switch (status) {
    case "approved":
      return {
        approvalDetailsVisibility: true,
        titleText: "Review the Trade License",
        titleVisibility: true,
        cancelDetailsVisibility: false,
        rejectDetailsVisibility: false,
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
        cancelDetailsVisibility: false,
        rejectDetailsVisibility: false,
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
        cancelDetailsVisibility: false,
        rejectDetailsVisibility: false,
        roleDefination: {
          rolePath: "user-info.roles",
          roles: ["TL_APPROVER"]
        }
      };
    case "cancelled":
      return {
        titleText: "",
        cancelDetailsVisibility: true,
        titleVisibility: false,
        approvalDetailsVisibility: false,
        rejectDetailsVisibility: false,
        roleDefination: {}
      };
    case "rejected":
      return {
        titleText: "",
        titleVisibility: false,
        approvalDetailsVisibility: false,
        cancelDetailsVisibility: false,
        rejectDetailsVisibility: true,
        roleDefination: {}
      };

    default:
      return {
        titleText: "",
        titleVisibility: false,
        approvalDetailsVisibility: false,
        cancelDetailsVisibility: false,
        rejectDetailsVisibility: false,
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

const reviewDocumentDetails = getReviewDocuments(false);

let approvalDetails = getApprovalDetails();
let rejectionDetails = getRejectionDetails();
let cancelDetails = getCancelDetails();
let title = getCommonTitle({ labelName: titleText });

const setActionItems = (action, object) => {
  set(
    action,
    "screenConfig.components.div.children.tradeReviewDetails.children.cardContent.children.cancelDetails.visible",
    get(object, "cancelDetailsVisibility")
  );
  set(
    action,
    "screenConfig.components.div.children.tradeReviewDetails.children.cardContent.children.rejectionDetails.visible",
    get(object, "rejectDetailsVisibility")
  );
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
  approvalDetails,
  cancelDetails,
  rejectionDetails
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
