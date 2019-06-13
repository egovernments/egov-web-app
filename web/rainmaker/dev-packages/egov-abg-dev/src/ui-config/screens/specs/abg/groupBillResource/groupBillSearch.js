import {
  getCommonCard,
  getTextField,
  getSelectField,
  getCommonContainer,
  getPattern,
  getLabel
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { getFinancialYearDates } from "../../utils";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import { searchApiCall } from "./functions";
import { generateBill } from "../../utils/receiptPdf";
import { handleScreenConfigurationFieldChange as handleField } from "egov-ui-framework/ui-redux/screen-configuration/actions";

const hasButton = getQueryArg(window.location.href, "hasButton");
//const hasApproval = getQueryArg(window.location.href, "hasApproval");
let enableButton = true;
//enableInbox = hasApproval && hasApproval === "false" ? false : true;
enableButton = hasButton && hasButton === "false" ? false : true;

export const abgSearchCard = getCommonCard({
  searchContainer: getCommonContainer({
    financialYear: getSelectField({
      label: {
        labelName: "Financial Year",
        labelKey: "ABG_FINANCIAL_YEAR_LABEL"
      },
      placeholder: {
        labelName: "Select Financial Year",
        labelKey: "ABG_FINANCIAL_YEAR_PLACEHOLDER"
      },
      required: false,
      visible: true,
      jsonPath: "searchCriteria.financialYear",
      // sourceJsonPath: "applyScreenMdmsData.egf-master.FinancialYear",
      gridDefination: {
        xs: 12,
        sm: 4
      },
      visible: process.env.REACT_APP_NAME === "Citizen" ? false : true,
      sourceJsonPath: "searchScreenMdmsData.egf-master.FinancialYear"
    }),
    locMohalla: getSelectField({
      label: {
        labelName: "Location/Mohalla",
        labelKey: "ABG_LOCMOHALLA_LABEL"
      },
      placeholder: {
        labelName: "Select Location/Mohalla",
        labelKey: "ABG_LOCMOHALLA_PLACEHOLDER"
      },
      required: false,
      jsonPath: "searchCriteria.locality",
      gridDefination: {
        xs: 12,
        sm: 4
      },
      sourceJsonPath: "searchScreenMdmsData.localities"
    }),
    consumerId: getTextField({
      label: {
        labelName: "Consumer ID",
        labelKey: "ABG_PROPERTY_ID_LABEL"
      },
      placeholder: {
        labelName: "Enter Property ID",
        labelKey: "ABG_CONSUMER_ID_PLACEHOLDER"
      },
      gridDefination: {
        xs: 12,
        sm: 4
      },
      required: false,
      // pattern: getPattern("PropertyID"),
      // errorMessage: "Invalid Property ID",
      jsonPath: "searchCriteria.consumercode[0]"
    })
  }),

  button: getCommonContainer({
    buttonContainer: getCommonContainer({
      firstCont: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        gridDefination: {
          xs: 12,
          sm: 4
        }
      },
      searchButton: {
        componentPath: "Button",
        gridDefination: {
          xs: 12,
          sm: 4
          // align: "center"
        },
        props: {
          variant: "contained",
          style: {
            color: "white",
            backgroundColor: "#FE7A51",
            borderRadius: "2px",
            width: window.innerWidth > 480 ? "80%" : "100%",
            height: "48px"
          }
        },
        children: {
          buttonLabel: getLabel({
            labelName: "Search",
            labelKey: "ABG_GROUP_BILL_SEARCH_BUTTON"
          })
        },
        onClickDefination: {
          action: "condition",
          callBack: searchApiCall
        }
      },
      lastCont: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        gridDefination: {
          xs: 12,
          sm: 4
        }
      }
    })
  })
});

export const mergeDownloadButton = {
  uiFramework: "custom-atoms",
  componentPath: "Div",
  props: {
    className: "abg-button-container",
    style: {
      textAlign: "right"
    }
  },
  children: {
    mergeButton: {
      componentPath: "Button",
      visible: enableButton,
      props: {
        variant: "contained",
        color: "primary",
        style: {
          color: "white",
          borderRadius: "2px",
          width: "250px",
          height: "48px"
        }
      },
      children: {
        buttonLabel: getLabel({
          labelName: "MERGE & DOWNLOAD",
          labelKey: "ABG_GROUP_BILLS_MERGE_AND_DOWNLOAD_BUTTON"
        })
      },
      onClickDefination: {
        action: "condition",
        callBack: generateBill
      }
    }
  }
};
