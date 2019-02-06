import {
  getCommonCard,
  getCommonTitle,
  getTextField,
  getSelectField,
  getCommonContainer,
  getCommonParagraph,
  getLabel
} from "mihy-ui-framework/ui-config/screens/specs/utils";
import { searchApiCall } from "./functions";

export const searchForm = getCommonCard({
  subHeader: getCommonTitle({
    labelName: "Search Employee",
    labelKey: "HR_HOME_SEARCH_RESULTS_HEADING"
  }),
  subParagraph: getCommonParagraph({
    labelName: "Provide at least one parameter to search for an application",
    labelKey: "HR_HOME_SEARCH_RESULTS_DESC"
  }),
  searchFormContainer: getCommonContainer({
    employeeName: getTextField({
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

    employeeID: getTextField({
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

    department: getSelectField({
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
    designation: getSelectField({
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

  button: getCommonContainer({
    // firstCont: {

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

            backgroundColor: "rgba(0, 0, 0, 0.6000000238418579)",
            borderRadius: "2px",
            width: "80%",
            height: "48px"
          }
        },
        children: {
          buttonLabel: getLabel({
            labelName: "Search",
            labelKey: "TL_HOME_SEARCH_RESULTS_BUTTON_SEARCH"
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
