"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchForm = undefined;

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _functions = require("./functions");

var searchForm = exports.searchForm = (0, _utils.getCommonCard)({
  subHeader: (0, _utils.getCommonTitle)({
    labelName: "Search Employee",
    labelKey: "HR_HOME_SEARCH_RESULTS_HEADING"
  }),
  subParagraph: (0, _utils.getCommonParagraph)({
    labelName: "Provide at least one parameter to search for an application",
    labelKey: "HR_HOME_SEARCH_RESULTS_DESC"
  }),
  searchFormContainer: (0, _utils.getCommonContainer)({
    employeeName: (0, _utils.getTextField)({
      label: {
        labelName: "Employee Name",
        labelKey: "HR_EMP_NAME_LABEL"
      },
      placeholder: {
        labelName: "Enter Employee Name",
        labelKey: "HR_EMP_NAME_PLACEHOLDER"
      },
      gridDefination: {
        xs: 12,
        sm: 4
      },
      required: false,
      pattern: /^[a-zA-Z0-9-]*$/i,
      errorMessage: "HR_EMP_NAME_ERR_MSG",
      jsonPath: "searchScreen.names"
    }),

    employeeID: (0, _utils.getTextField)({
      label: {
        labelName: "Employee ID",
        labelKey: "HR_EMP_ID_LABEL"
      },
      placeholder: {
        labelName: "Enter Employee ID",
        labelKey: "HR_EMP_ID_PLACEHOLDER"
      },
      gridDefination: {
        xs: 12,
        sm: 4
      },
      required: false,
      pattern: /^[a-zA-Z0-9-]*$/i,
      errorMessage: "HR_EMP_ID_ERR_MSG",
      jsonPath: "searchScreen.codes"
    }),

    department: (0, _utils.getSelectField)({
      label: { labelName: "Department", labelKey: "HR_DEPT_LABEL" },
      placeholder: {
        labelName: "Select Department",
        labelKey: "HR_DEPT_PLACEHOLDER"
      },
      required: false,
      jsonPath: "searchScreen.departments",
      gridDefination: {
        xs: 12,
        sm: 4
      },
      sourceJsonPath: "searchScreenMdmsData.common-masters.Department",
      optionLabel: "code",
      optionValue: "code"
    }),
    designation: (0, _utils.getSelectField)({
      label: { labelName: "Designation", labelKey: "HR_DESG_LABEL" },
      placeholder: {
        labelName: "Select Designation",
        labelKey: "HR_DEPT_PLACEHOLDER"
      },
      required: false,
      jsonPath: "searchScreen.designations",
      gridDefination: {
        xs: 12,
        sm: 4
      },
      sourceJsonPath: "searchScreenMdmsData.common-masters.Designation",
      optionLabel: "code",
      optionValue: "code"
    })
  }),

  button: (0, _utils.getCommonContainer)({
    // firstCont: {

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
            width: "80%",
            height: "48px"
          }
        },
        children: {
          buttonLabel: (0, _utils.getLabel)({
            labelName: "Search",
            labelKey: "TL_HOME_SEARCH_RESULTS_BUTTON_SEARCH"
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