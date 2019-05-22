import {
  getCommonCard,
  getTextField,
  getSelectField,
  getCommonContainer,
  getPattern,
  getDateField
  // getCommonTitle
} from "egov-ui-framework/ui-config/screens/specs/utils";
import {
  handleScreenConfigurationFieldChange as handleField,
  prepareFinalObject
} from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import { convertDateToEpoch } from "../../utils";
import {
  getTransformedLocalStorgaeLabels,
  getLocaleLabels
} from "egov-ui-framework/ui-utils/commons";
import get from "lodash/get";

const hasButton = getQueryArg(window.location.href, "hasButton");
let enableButton = true;
enableButton = hasButton && hasButton === "false" ? false : true;

export const newCollectionDetailsCard = getCommonCard({
  // header: getCommonTitle(
  //   {
  //     labelName: "Trade Details",
  //     labelKey: "TL_NEW_TRADE_DETAILS_PROV_DET_HEADER"
  //   },
  //   {
  //     style: {
  //       marginBottom: 18
  //     }
  //   }
  // ),
  searchContainer: getCommonContainer({
    City: {
      ...getSelectField({
        label: {
          labelName: "City",
          labelKey: "TL_NEW_TRADE_DETAILS_CITY_LABEL"
        },
        labelPrefix: {
          moduleName: "TENANT",
          masterName: "TENANTS"
        },
        optionLabel: "name",
        placeholder: { labelName: "Select City", labelKey: "TL_SELECT_CITY" },
        sourceJsonPath: "applyScreenMdmsData.tenant.tenants",
        jsonPath: "Demands[0].tenantId",
        required: true,
        props: {
          required: true,
          disabled: false
        }
      })
    },
    dummyDiv: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      gridDefination: {
        xs: 12,
        sm: 6
      },
      visible: process.env.REACT_APP_NAME === "Citizen" ? false : true,
      props: {
        disabled: true
      }
    },

    ConsumerMobileNo: getTextField({
      label: {
        labelName: "Mobile No",
        labelKey: "UC_MOBILE_NO_LABEL"
      },
      placeholder: {
        labelName: "Enter Mobile No",
        labelKey: "UC_MOBILE_NO_PLACEHOLDER"
      },
      iconObj: {
        label: "+91 |",
        position: "start"
      },

      required: true,
      visible: true,
      pattern: getPattern("MobileNo"),
      errorMessage: "Invalid Mobile No.",
      jsonPath: "Demands[0].mobileNo"
    }),
    ConsumerName: getTextField({
      label: {
        labelName: " consumer Name",
        labelKey: "UC_CONS_NAME_LABEL"
      },
      placeholder: {
        labelName: "Enter Consumer  Name",
        labelKey: "UC _CONS_NAME_LABEL_PLACEHOLDER"
      },

      required: true,
      visible: true,
      pattern: getPattern("Name"),
      errorMessage: "Invalid Name.",
      jsonPath: "Demands[0].consumerName"
    }),
    serviceCategory: {
      ...getSelectField({
        label: {
          labelName: "serviceCategory",
          labelKey: "UC_SERVICE_CATEGORY_LABEL"
        },
        placeholder: {
          labelName: "Select service Category ",
          labelKey: "UC_SERVICE_CATEGORY_PLACEHOLDER"
        },
        required: true,
        visible: true,
        jsonPath: "Demands[0].consumerType",
        sourceJsonPath: "applyScreenMdmsData.serviceCategories",
        gridDefination: {
          xs: 12,
          sm: 6
        }
      }),
      beforeFieldChange: async (action, state, dispatch) => {
        console.log(action);
        //Set service type data and field if available.
        const serviceData = get(
          state.screenConfiguration,
          "preparedFinalObject.applyScreenMdmsData.nestedServiceData",
          {}
        );
        if (action.value) {
          if (
            serviceData[action.value] &&
            serviceData[action.value].child &&
            serviceData[action.value].child.length > 0
          ) {
            dispatch(
              prepareFinalObject(
                "applyScreenMdmsData.serviceTypes",
                serviceData[action.value].child
              )
            );
            dispatch(
              handleField(
                "newCollection",
                "components.div.children.newCollectionDetailsCard.children.cardContent.children.searchContainer.children.serviceType",
                "visible",
                true
              )
            );
          } else {
            dispatch(
              handleField(
                "newCollection",
                "components.div.children.newCollectionDetailsCard.children.cardContent.children.searchContainer.children.serviceType",
                "visible",
                false
              )
            );
          }
        }
        //Set tax head fields if there is no service type available
        if (serviceData[action.value]) {
          const taxHeads = setTaxHeadFields(action, state, dispatch);
          console.log(taxHeads);
        }
      }
    },
    serviceType: {
      ...getSelectField({
        label: {
          labelName: "Service Type",
          labelKey: "UC_SERVICE_TYPE_LABEL"
        },
        placeholder: {
          labelName: "Select Service Type",
          labelKey: "UC_SERVICE_TYPE_PLACEHOLDER"
        },
        required: true,
        visible: false,
        sourceJsonPath: "applyScreenMdmsData.serviceTypes",
        jsonPath: "Demands[0].businessService",
        gridDefination: {
          xs: 12,
          sm: 6
        }
      })
      // beforeFieldChange: async (action, state, dispatch) => {
      //   const taxHeads = setTaxHeadFields(action, state, dispatch);
      //   console.log(taxHeads);
      // }
    },
    fromDate: getDateField({
      label: {
        labelName: "Select from Date",
        labelKey: "UC_FROM_DATE_LABEL"
      },
      placeholder: {
        labelName: "Enter from Date",
        labelKey: "UC_SELECT_FROM_DATE_PLACEHOLDER"
      },
      gridDefination: {
        xs: 12,
        sm: 6
      },
      required: true,
      pattern: getPattern("Date"),
      jsonPath: "Demands[0].taxPeriodFrom"
    }),
    toDate: getDateField({
      label: {
        labelName: "Select to Date",
        labelKey: "UC_TO_DATE_LABEL"
      },
      placeholder: {
        labelName: "Enter to Date",
        labelKey: "UC_SELECT_TO_DATE_PLACEHOLDER"
      },
      gridDefination: {
        xs: 12,
        sm: 6
      },
      required: true,
      pattern: getPattern("Date"),
      jsonPath: "Demands[0].taxPeriodTo"
    }),

    // amountTobeCollected: getTextField({
    //   label: {
    //     labelName: "Amount To Be Collected",
    //     labelKey: "UC_AMOUNT_TO_BE_ COLLECTED_LABEL"
    //   },
    //   placeholder: {
    //     labelName: "Enter Amount To be Collected",
    //     labelKey: "UC_AMOUNT_TO_BE_COLLECTED_PLACEHOLDER"
    //   },

    //   required: true,
    //   pattern: getPattern("Amount"),
    //   errorMessage: "Invalid Amount",
    //   jsonPath: "Demands[0].demandDetails[0].taxAmount"
    // }),
    // fieldCollectionFee: getTextField({
    //   label: {
    //     labelName: "Field Collection Fee",
    //     labelKey: "UC_FIELD_COLLECTION_FEE_LABEL"
    //   },
    //   placeholder: {
    //     labelName: "Enter Field Collection Fee ",
    //     labelKey: "UC_FIELD_COLLECTION_FEE_PLACEHOLDER"
    //   },
    //   required: false,
    //   pattern: getPattern("FieldCollectionFee"),
    //   jsonPath: "Demands[0].demandDetails[0].collectionAmount"
    // }),
    comment: getTextField({
      label: {
        labelName: "Comments",
        labelKey: "UC_COMMENT_LABEL"
      },
      placeholder: {
        labelName: "Enter Comment ",
        labelKey: "UC_COMMENT_PLACEHOLDER"
      },

      Required: false,
      jsonPath: "Demands[0].demandDetails[0].comment"
    }),
    dummyDiv: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      gridDefination: {
        xs: 12,
        sm: 6
      },
      visible: true,
      props: {
        disabled: true
      }
    }
  })
});

const setTaxHeadFields = (action, state, dispatch) => {
  const serviceData = get(
    state.screenConfiguration,
    "preparedFinalObject.applyScreenMdmsData.nestedServiceData",
    {}
  );
  const taxHeadMasters = get(
    state.screenConfiguration,
    "preparedFinalObject.applyScreenMdmsData.BillingService.TaxHeadMaster",
    {}
  );
  debugger;
  const matchingTaxHeads = taxHeadMasters.filter(
    item => item.service === action.value
  );
  if (matchingTaxHeads && matchingTaxHeads.length > 0) {
    matchingTaxHeads.forEach((item, index) => {
      dispatch(
        prepareFinalObject(
          `Demands[0].demandDetails[${index}].taxHeadMasterCode`,
          item.code
        )
      );
      dispatch(
        handleField(
          "newCollection",
          "components.div.children.newCollectionDetailsCard.children.cardContent.children.searchContainer.children",
          `taxheadField_${index}`,
          getTextField({
            label: {
              labelName: "Tax Amount",
              labelKey: `${item.code}`
            },
            placeholder: {
              labelName: "Enter Tax Amount",
              labelKey: "UC_AMOUNT_TO_BE_COLLECTED_PLACEHOLDER"
            },
            required: item.required || false,
            pattern: getPattern("Amount"),
            errorMessage: "Invalid Amount",
            jsonPath: `Demands[0].demandDetails[${index}].taxAmount`
          })
        )
      );
    });
  }
};
