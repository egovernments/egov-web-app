import {
  getCommonCard,
  getTextField,
  getSelectField,
  getCommonContainer,
  getPattern,
  getLabel
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { searchApiCall } from "./functions";

export const abgSearchCard = getCommonCard({
  searchContainer: getCommonContainer({
    financialYear: getSelectField({
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
      data: [
        {
          code: "2018-19"
        },
        {
          code: "2019-20"
        }
      ]
    }),
    locMohalla: getSelectField({
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
      data: [
        {
          code: "Ajit Nagar"
        },
        {
          code: "Cinema road-1"
        }
      ]
    }),
    propertyId: getTextField({
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
      pattern: getPattern("PropertyID"),
      errorMessage: "Invalid Property ID",
      jsonPath: "searchScreen.propertyId"
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
            labelKey: "NOC_HOME_SEARCH_RESULTS_BUTTON_SEARCH"
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
