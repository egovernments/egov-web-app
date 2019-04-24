"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mergeDownloadButton = exports.abgSearchCard = undefined;

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _functions = require("./functions");

var hasButton = (0, _commons.getQueryArg)(window.location.href, "hasButton");
//const hasApproval = getQueryArg(window.location.href, "hasApproval");
var enableButton = true;
//enableInbox = hasApproval && hasApproval === "false" ? false : true;
enableButton = hasButton && hasButton === "false" ? false : true;

var abgSearchCard = exports.abgSearchCard = (0, _utils.getCommonCard)({
  searchContainer: (0, _utils.getCommonContainer)({
    financialYear: (0, _utils.getSelectField)({
      label: {
        labelName: "Financial Year",
        labelKey: "TL_FINANCIAL_YEAR_LABEL"
      },
      placeholder: {
        labelName: "Select Financial Year",
        labelKey: "TL_FINANCIAL_YEAR_PLACEHOLDER"
      },
      required: true,
      visible: true,
      jsonPath: "searchScreen.financialYear",
      // sourceJsonPath: "applyScreenMdmsData.egf-master.FinancialYear",
      gridDefination: {
        xs: 12,
        sm: 4
      },
      data: [{
        code: "2018-19"
      }, {
        code: "2019-20"
      }]
    }),
    locMohalla: (0, _utils.getSelectField)({
      label: {
        labelName: "Location/Mohalla",
        labelKey: "NOC_APPLICATION_NOC_LABEL"
      },
      placeholder: {
        labelName: "Select Location/Mohalla",
        labelKey: "NOC_APPLICATION_PLACEHOLDER"
      },
      required: false,
      jsonPath: "searchScreen.locMohalla",
      gridDefination: {
        xs: 12,
        sm: 4
      },
      data: [{
        code: "Ajit Nagar"
      }, {
        code: "Cinema road-1"
      }]
    }),
    propertyId: (0, _utils.getTextField)({
      label: {
        labelName: "Property ID",
        labelKey: "NOC_HOME_SEARCH_RESULTS_APP_NO_LABEL"
      },
      placeholder: {
        labelName: "Enter Property ID",
        labelKey: "NOC_HOME_SEARCH_RESULTS_APP_NO_PLACEHOLDER"
      },
      gridDefination: {
        xs: 12,
        sm: 4
      },
      required: false,
      pattern: (0, _utils.getPattern)("PropertyID"),
      errorMessage: "Invalid Property ID",
      jsonPath: "searchScreen.propertyId"
    })
  }),

  button: (0, _utils.getCommonContainer)({
    buttonContainer: (0, _utils.getCommonContainer)({
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
          buttonLabel: (0, _utils.getLabel)({
            labelName: "Search",
            labelKey: "NOC_HOME_SEARCH_RESULTS_BUTTON_SEARCH"
          })
        },
        onClickDefination: {
          action: "condition",
          callBack: _functions.searchApiCall
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

var mergeDownloadButton = exports.mergeDownloadButton = {
  uiFramework: "custom-atoms",
  componentPath: "Div",
  //  gridDefination: {
  //     xs: 12,
  //     sm: 12
  //     // align: ""
  // },
  props: {
    className: "abg-button-container",
    style: {
      textAlign: "right"
    }
  },
  children: {
    mergeButton: {
      componentPath: "Button",
      // gridDefination: {
      //   xs: 12,
      //   sm: 4
      //   // align: ""
      // },
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
        buttonLabel: (0, _utils.getLabel)({
          labelName: "MERGE & DOWNLOAD",
          labelKey: "ABG_GROUP_BILLS_MERGE_AND_DOWNLOAD_BUTTON"
        })
        //  Add onClickDefination
        // Add roleDefination
      } }
  }
};