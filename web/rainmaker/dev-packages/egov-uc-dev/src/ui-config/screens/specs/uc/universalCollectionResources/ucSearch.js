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
  
  const hasButton = getQueryArg(window.location.href, "hasButton");
  //const hasApproval = getQueryArg(window.location.href, "hasApproval");
  let enableButton = true;
  //enableInbox = hasApproval && hasApproval === "false" ? false : true;
  enableButton = hasButton && hasButton === "false" ? false : true;
  
  export const UCSearchCard = getCommonCard({
    header :getCommonHeader({
      labelName: "Search Receipt",
      labelKey: "UC_COMMON_HEADER"
    }),
    subheader: getCommonSubHeader({
      labelName: "Provide at least one parameter to search for an application",
      labelKey: "UC_COMMON_SUB_HEADER"
    }),
    searchContainer: getCommonContainer({
      receiptNo: getTextField({
        label: {
          labelName: "Receipt No.",
          labelKey: "UC_USAGE_LABEL"
        },
        placeholder: {
          labelName: "Enter Receipt NO.",
          labelKey: "UC_USAGE_PLACEHOLDER"
        },
        required: false,
        visible: true,
        jsonPath: "searchScreen.receiptNo",
        // sourceJsonPath: "applyScreenMdmsData.egf-master.FinancialYear",
        gridDefination: {
          xs: 12,
          sm: 4
        },
        
      }),
      serviceType: getSelectField({
        label: {
          labelName: "Service Type",
          labelKey: "UC__SERVICE_TYPE_LABEL"
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
        data: [
          {
            code: "service-1"
          },
          {
            code: "service-2"
          }
        ]
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
        
        },
      }),

      fromDate: getDateField({
        label: {
          labelName: "From Date",
          labelKey: "UC_FROM_DATE_LABEL"
        },
        placeholder: {
          labelName: "Select From Date",
          labelKey: "UC_FROM_DATE_PLACEHOLDER"
        },
        required: false,
        pattern: getPattern("Date"),
        jsonPath: "searchScreen.fromDate",
        gridDefination: {
          xs: 12,
          sm: 4
        
        },
      }),
    

    toDate: getDateField({
        label: {
          labelName: "To Date",
          labelKey: "UC_TO_DATE_LABEL"
        },
        placeholder: {
          labelName: "Select From Date",
          labelKey: "UC_TO_DATE_PLACEHOLDER"
        },
        required: false,
        pattern: getPattern("Date"),
        jsonPath: "searchScreen.toDate",
        gridDefination: {
          xs: 12,
          sm: 4
        }
      }),
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
             border:"#FE7A51 solid 1px",
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
          // onClickDefination: {
          //   action: "condition",
          //   callBack: searchApiCall
          // }
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
            callBack: searchApiCall
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
