import {
  getCommonHeader,
  getCommonCard,
  getCommonTitle,
  getCommonParagraph,
  getCommonGrayCard,
  getCommonContainer,
  getLabel
} from "mihy-ui-framework/ui-config/screens/specs/utils";

import { getFeesEstimateCard, getHeaderSideText } from "../utils";
import { footerReview } from "./applyResource/footer";
import { getReviewTrade } from "./applyResource/review-trade";
import { getReviewOwner } from "./applyResource/review-owner";
import { getReviewDocuments } from "./applyResource/review-documents";
import { getApprovalDetails } from "./applyResource/approval-rejection-details";
import { getCancelDetails } from "./applyResource/cancel-details";
import { getRejectionDetails } from "./applyResource/reject-details";
import { getQueryArg } from "mihy-ui-framework/ui-utils/commons";
import { prepareFinalObject } from "mihy-ui-framework/ui-redux/screen-configuration/actions";
import get from "lodash/get";
import set from "lodash/set";
import { getSearchResults } from "mihy-ui-framework/ui-utils/commons";
import { createEstimateData } from "../utils";
import { getFileUrlFromAPI } from "ui-utils/commons";

const role = getQueryArg(window.location.href, "role");
const status = getQueryArg(window.location.href, "status");
const applicationNumber = getQueryArg(
  window.location.href,
  "applicationNumber"
);
let headerSideText = "";

const searchResults = async (action, state, dispatch) => {
  const tenantId = "pb.amritsar";
  // console.log(tenantId);
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
  const uploadedDocData = get(
    payload,
    "Licenses[0].tradeLicenseDetail.applicationDocuments"
  );
  console.log("uploadedDocData is .....", uploadedDocData);
  const fileStoreIds = uploadedDocData
    .map(item => {
      return item.fileStoreId;
    })
    .join(",");
  console.log("filestore idis.....", fileStoreIds);
  const fileUrlPayload = await getFileUrlFromAPI(fileStoreIds);
  const reviewDocData = uploadedDocData.map(item => {
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
  dispatch(prepareFinalObject("LicensesTemp[0].reviewDocData", reviewDocData));
  dispatch(prepareFinalObject("Licenses[0]", payload.Licenses[0]));
  const LicenseData = payload.Licenses[0];
  createEstimateData(LicenseData, "LicensesTemp[0].estimateCardData", dispatch); //Fetch Bill and populate estimate card
};

let titleText = "";
let paraText =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard Lorem Ipsum has been the industry's standard.";
let titleVisibility = false;
let paraVisibiliy = false;
let approvalDetailsVisibility = false;
let cancelDetailsVisibility = false;
let RejectDetailsVisibility = false;

const setStatusBasedValue = status => {
  switch (status) {
    case "approved": {
      approvalDetailsVisibility = true;
      if (role === "approver") {
        titleText = "Please Review the Trade License";
        titleVisibility = true;
        paraVisibiliy = false;
        approvalDetailsVisibility = false;
        cancelDetailsVisibility = false;
        RejectDetailsVisibility = false;
      }
      break;
    }
    case "pending_payment": {
      titleText = "Please Review the Application and Proceed with Payment";
      titleVisibility = true;
      paraVisibiliy = false;
      approvalDetailsVisibility = false;
      cancelDetailsVisibility = false;
      RejectDetailsVisibility = false;

      break;
    }
    case "pending_approval": {
      if (role === "approver") {
        titleText = "Please Review the Application and Proceed with Approval";
        titleVisibility = true;
        paraText =
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard Lorem Ipsum has been the industry's standard.";
        paraVisibiliy = true;
        approvalDetailsVisibility = false;
        cancelDetailsVisibility = false;
        RejectDetailsVisibility = false;
      }
      break;
    }
    case "cancelled": {
      cancelDetailsVisibility = true;
      titleVisibility = false;
      paraVisibiliy = false;
      approvalDetailsVisibility = false;
      RejectDetailsVisibility = false;

      break;
    }
    case "rejected": {
      titleText = "Please Review the Trade License";
      titleVisibility = true;
      paraVisibiliy = true;
      approvalDetailsVisibility = false;
      cancelDetailsVisibility = false;
      RejectDetailsVisibility = true;
    }

    default:
      break;
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
let paragraph = getCommonParagraph({ labelName: paraText });

title = { ...title, visible: titleVisibility };
paragraph = { ...paragraph, visible: paraVisibiliy };
cancelDetails = { ...cancelDetails, visible: cancelDetailsVisibility };
approvalDetails = { ...approvalDetails, visible: approvalDetailsVisibility };
rejectionDetails = { ...rejectionDetails, visible: RejectDetailsVisibility };
export const tradeReviewDetails = getCommonCard({
  title,
  paragraph,
  estimate,
  reviewTradeDetails,
  reviewOwnerDetails,
  reviewDocumentDetails,
  approvalDetails,
  cancelDetails
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

    setStatusBasedValue(status);
    const footer = footerReview(status, applicationNumber);
    set(action, "screenConfig.components.div.children.footer", footer);

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
                buttonLabel: getCommonTitle({
                  jsonPath: "Licenses[0].headerSideText"
                })
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
