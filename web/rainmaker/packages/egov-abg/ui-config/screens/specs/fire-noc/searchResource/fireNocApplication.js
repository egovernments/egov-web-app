"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NOCApplication = undefined;

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _functions = require("./functions");

var NOCApplication = exports.NOCApplication = (0, _utils.getCommonCard)({
  subHeader: (0, _utils.getCommonTitle)({
    labelName: "Search NOC Application",
    labelKey: "NOC_HOME_SEARCH_RESULTS_HEADING"
  }),
  subParagraph: (0, _utils.getCommonParagraph)({
    labelName: "Provide at least one parameter to search for an application",
    labelKey: "NOC_HOME_SEARCH_RESULTS_DESC"
  }),
  appNOCAndMobNumContainer: (0, _utils.getCommonContainer)({
    applicationNo: (0, _utils.getTextField)({
      label: {
        labelName: "Application No.",
        labelKey: "NOC_HOME_SEARCH_RESULTS_APP_NO_LABEL"
      },
      placeholder: {
        labelName: "Enter Application No.",
        labelKey: "NOC_HOME_SEARCH_RESULTS_APP_NO_PLACEHOLDER"
      },
      gridDefination: {
        xs: 12,
        sm: 4
      },
      required: false,
      pattern: /^[a-zA-Z0-9-]*$/i,
      errorMessage: "Invalid Application No.",
      jsonPath: "searchScreen.applicationNumber"
    }),

    NOCNo: (0, _utils.getTextField)({
      label: {
        labelName: "NOC No.",
        labelKey: "NOC_HOME_SEARCH_RESULTS_NOC_NO_LABEL"
      },
      placeholder: {
        labelName: "Enter NOC No.",
        labelKey: "NOC_HOME_SEARCH_RESULTS_NOC_NO_PLACEHOLDER"
      },
      gridDefination: {
        xs: 12,
        sm: 4
      },
      required: false,
      pattern: /^[a-zA-Z0-9-]*$/i,
      errorMessage: "Invalid NOC No.",
      jsonPath: "searchScreen.NOCNumber"
    }),
    ownerMobNo: (0, _utils.getTextField)({
      label: {
        labelName: "Owner Mobile No.",
        labelKey: "NOC_HOME_SEARCH_RESULTS_OWN_MOB_LABEL"
      },
      placeholder: {
        labelName: "Enter your mobile No.",
        labelKey: "NOC_HOME_SEARCH_RESULTS_OWN_MOB_PLACEHOLDER"
      },
      gridDefination: {
        xs: 12,
        sm: 4
      },
      iconObj: {
        label: "+91 |",
        position: "start"
      },
      required: false,
      pattern: (0, _utils.getPattern)("MobileNo"),
      jsonPath: "searchScreen.mobileNumber",
      errorMessage: "Invalid Mobile Number"
    })
  }),
  appStatusAndToFromDateContainer: (0, _utils.getCommonContainer)({
    applicationNo: (0, _utils.getSelectField)({
      label: {
        labelName: "Application status",
        labelKey: "NOC_APPLICATION_NOC_LABEL"
      },
      placeholder: {
        labelName: "Select Application Status",
        labelKey: "NOC_APPLICATION_PLACEHOLDER"
      },
      required: false,
      jsonPath: "searchScreen.status",
      gridDefination: {
        xs: 12,
        sm: 4
      },
      data: [{
        code: "INITIATED"
      }, {
        code: "APPLIED"
      }, {
        code: "PAID"
      }, {
        code: "APPROVED"
      }, {
        code: "REJECTED"
      }, {
        code: "CANCELLED"
      }]
    }),

    fromDate: (0, _utils.getDateField)({
      label: { labelName: "From Date", labelKey: "NOC_FROM_DATE_LABEL" },
      placeholder: {
        labelName: "From Date",
        labelKey: "NOC_FROM_DATE_PLACEHOLDER"
      },
      jsonPath: "searchScreen.fromDate",
      gridDefination: {
        xs: 12,
        sm: 4
      },
      pattern: (0, _utils.getPattern)("Date"),
      errorMessage: "Invalid Date",
      required: false
    }),

    toDate: (0, _utils.getDateField)({
      label: { labelName: "To Date", labelKey: "NOC_TO_DATE_LABEL" },
      placeholder: {
        labelName: "To Date",
        labelKey: "NOC_TO_DATE_PLACEHOLDER"
      },
      jsonPath: "searchScreen.toDate",
      gridDefination: {
        xs: 12,
        sm: 4
      },
      pattern: (0, _utils.getPattern)("Date"),
      errorMessage: "Invalid Date",
      required: false
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

            backgroundColor: "rgba(0, 0, 0, 0.6000000238418579)",
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