import {
  getCommonCard,
  getTextField,
  getSelectField,
  getCommonContainer,
  getPattern,
  getLabel,
  getDateField,
  getCommonHeader,
  getCommonSubHeader
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import { searchApiCall } from "./function";
import { searchApi } from "../../utils";
import { handleScreenConfigurationFieldChange as handleField } from "egov-ui-framework/ui-redux/screen-configuration/actions";

const hasButton = getQueryArg(window.location.href, "hasButton");
//const hasApproval = getQueryArg(window.location.href, "hasApproval");
let enableButton = true;
//enableInbox = hasApproval && hasApproval === "false" ? false : true;
enableButton = hasButton && hasButton === "false" ? false : true;

const resetFields = (state, dispatch) => {
  dispatch(
    handleField(
      "search",
      "components.div.children.UCSearchCard.children.cardContent.children.searchContainer.children.receiptNo",
      "props.value",
      ""
    )
  );
  dispatch(
    handleField(
      "search",
      "components.div.children.UCSearchCard.children.cardContent.children.searchContainer.children.serviceType",
      "props.value",
      ""
    )
  );
  dispatch(
    handleField(
      "search",
      "components.div.children.UCSearchCard.children.cardContent.children.searchContainer.children.mobileNo",
      "props.value",
      ""
    )
  );
  dispatch(
    handleField(
      "search",
      "components.div.children.UCSearchCard.children.cardContent.children.searchContainer.children.fromDate",
      "props.value",
      ""
    )
  );
  dispatch(
    handleField(
      "search",
      "components.div.children.UCSearchCard.children.cardContent.children.searchContainer.children.toDate",
      "props.value",
      ""
    )
  );
};

export const UCSearchCard = getCommonCard({
  header: getCommonHeader({
    labelName: "Search Receipt",
    labelKey: "UC_SEARCH_COMMON_HEADER"
  }),
  subheader: getCommonSubHeader({
    labelName: "Provide at least one parameter to search for an application",
    labelKey: "UC_SEARCH_COMMON_SUB_HEADER"
  }),
  searchContainer: getCommonContainer({
    receiptNumber: getTextField({
      label: {
        labelName: "Receipt Number.",
        labelKey: "UC_RECEPIT_NO_LABEL"
      },
      placeholder: {
        labelName: "Enter Receipt No.",
        labelKey: "UC_ENTER_RECEPIT_NO_PLACEHOLDER"
      },
      required: false,
      visible: true,
      jsonPath: "searchScreen.receiptNumbers",
      // sourceJsonPath: "applyScreenMdmsData.egf-master.FinancialYear",
      gridDefination: {
        xs: 12,
        sm: 4
      }
    }),
    serviceType: getSelectField({
      label: {
        labelName: "Service Type",
        labelKey: "UC_SERVICE_TYPE_LABEL"
      },
      placeholder: {
        labelName: "Select Service Type",
        labelKey: "UC_SERVICE_TYPE_PLACEHOLDER"
      },
      required: false,
      jsonPath: "searchScreen.serviceType",
      gridDefination: {
        xs: 12,
        sm: 4
      },
      sourceJsonPath: "searchScreenMdmsData.BillingService.BusinessService"
    }),
    mobileNo: getTextField({
      label: {
        labelName: "Mobile No.",
        labelKey: "UC_MOBILE_NO_LABEL"
      },
      placeholder: {
        labelName: "+91|Enter Mobile NO.",
        labelKey: "UC_MOBILE_NO_PLACEHOLDER"
      },
      required: false,
      jsonPath: "searchScreen.mobileNo",
      gridDefination: {
        xs: 12,
        sm: 4
      }
    }),

    fromDate: getDateField({
      label: {
        labelName: "Select From Date",
        labelKey: "UC_FROM_DATE_LABEL"
      },
      placeholder: {
        labelName: "Enter From Date",
        labelKey: "UC_SELECT_FROM_DATE_PLACEHOLDER"
      },
      required: false,
      pattern: getPattern("Date"),
      jsonPath: "searchScreen.fromDate",
      gridDefination: {
        xs: 12,
        sm: 4
      }
    }),

    toDate: getDateField({
      label: {
        labelName: "Select To Date",
        labelKey: "UC_TO_DATE_LABEL"
      },
      placeholder: {
        labelName: "Enter From Date",
        labelKey: "UC_SELECT_TO_DATE_PLACEHOLDER"
      },
      required: false,
      pattern: getPattern("Date"),
      jsonPath: "searchScreen.toDate",
      gridDefination: {
        xs: 12,
        sm: 4
      }
    })
  }),

  buttonContainer: getCommonContainer({
    firstCont: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      gridDefination: {
        xs: 12,
        sm: 3
      }
    },
    resetButton: {
      componentPath: "Button",
      gridDefination: {
        xs: 12,
        sm: 3
        // align: "center"
      },
      props: {
        variant: "outlined",
        style: {
          color: "#FE7A51",
          // backgroundColor: "#FE7A51",
          border: "#FE7A51 solid 1px",
          borderRadius: "2px",
          width: window.innerWidth > 480 ? "80%" : "100%",
          height: "48px"
        }
      },
      children: {
        buttonLabel: getLabel({
          labelName: "RESET",
          labelKey: "UC_RESET_BUTTON"
        })
      },
      onClickDefination: {
        action: "condition",
        callBack: resetFields
      }
    },

    searchButton: {
      componentPath: "Button",
      gridDefination: {
        xs: 12,
        sm: 3
        // align: "center"
      },
      props: {
        variant: "contained",
        style: {
          color: "white",
          backgroundColor: "#696969",
          borderRadius: "2px",
          width: window.innerWidth > 480 ? "80%" : "100%",
          height: "48px"
        }
      },
      children: {
        buttonLabel: getLabel({
          labelName: "SEARCH",
          labelKey: "UC_SEARCH_BUTTON"
        })
      },
      onClickDefination: {
        action: "condition",
        callBack: (state, dispatch) => {
          searchApiCall(state, dispatch);
        }
      }
    },

    lastCont: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      gridDefination: {
        xs: 12,
        sm: 3
      }
    }
  })
});
