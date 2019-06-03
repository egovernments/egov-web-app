import {
  getCommonCard,
  getTextField,
  getSelectField,
  getCommonContainer,
  getPattern,
  getDateField
  // getCommonTitle
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { httpRequest } from "egov-ui-framework/ui-utils/api";
import {
  handleScreenConfigurationFieldChange as handleField,
  prepareFinalObject
} from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getTenantId } from "egov-ui-kit/utils/localStorageUtils";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import {
  getTransformedLocalStorgaeLabels,
  getLocaleLabels
} from "egov-ui-framework/ui-utils/commons";
import set from "lodash/set";
import get from "lodash/get";

const hasButton = getQueryArg(window.location.href, "hasButton");
let enableButton = true;
enableButton = hasButton && hasButton === "false" ? false : true;
const tenantId = getTenantId();

export const newCollectionDetailsCard = getCommonCard({
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
        disabled: true,
        props: {
          required: true,
          disabled: false,
          value: tenantId,
          disabled: true
        }
      }),
      beforeFieldChange: async (action, state, dispatch) => {
        let requestBody = {
          MdmsCriteria: {
            tenantId: action.value,
            moduleDetails: [
              {
                moduleName: "BillingService",
                masterDetails: [
                  {
                    name: "BusinessService"
                  },
                  {
                    name: "TaxHeadMaster"
                  },
                  {
                    name: "TaxPeriod"
                  }
                ]
              }
            ]
          }
        };
        try {
          let payload = null;
          payload = await httpRequest(
            "post",
            "/egov-mdms-service/v1/_search",
            "_search",
            [],
            requestBody
          );
          dispatch(
            prepareFinalObject(
              "applyScreenMdmsData.BillingService",
              payload.MdmsRes.BillingService
            )
          );
          setServiceCategory(
            get(payload, "MdmsRes.BillingService.BusinessService", []),
            dispatch
          );
        } catch (e) {
          console.log(e);
        }
        return action;
      }
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
        localePrefix: {
          masterName: "BusinessService",
          moduleName: "BillingService"
        },
        required: true,
        visible: true,
        jsonPath: "Demands[0].businessService",
        sourceJsonPath: "applyScreenMdmsData.serviceCategories",
        gridDefination: {
          xs: 12,
          sm: 6
        }
      }),
      beforeFieldChange: async (action, state, dispatch) => {
        console.log(action);
        //Reset service type value, if any
        dispatch(
          handleField(
            "newCollection",
            "components.div.children.newCollectionDetailsCard.children.cardContent.children.searchContainer.children.serviceType",
            "props.value",
            null
          )
        );
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
            //Set tax head fields if there is no service type available
            if (serviceData[action.value]) {
              const taxHeads = setTaxHeadFields(action, state, dispatch);
            }
          }
        }
      }
    },
    serviceType: {
      ...getSelectField({
        label: {
          labelName: "Service Type",
          labelKey: "UC_SERVICE_TYPE_LABEL"
        },
        localePrefix: {
          masterName: "BusinessService",
          moduleName: "BillingService"
        },
        placeholder: {
          labelName: "Select Service Type",
          labelKey: "UC_SERVICE_TYPE_PLACEHOLDER"
        },
        required: true,
        visible: false,
        sourceJsonPath: "applyScreenMdmsData.serviceTypes",
        jsonPath: "Demands[0].serviceType",
        gridDefination: {
          xs: 12,
          sm: 6
        }
      }),
      beforeFieldChange: async (action, state, dispatch) => {
        if (action.value) {
          const taxHeads = setTaxHeadFields(action, state, dispatch);
          console.log(taxHeads);
        }
      }
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
  const matchingTaxHeads = taxHeadMasters.filter(
    item => item.service === action.value
  );
  if (matchingTaxHeads && matchingTaxHeads.length > 0) {
    //Delete previous Tax Head fields
    const noOfPreviousTaxHeads = get(
      state.screenConfiguration,
      "preparedFinalObject.Demands[0].demandDetails",
      []
    ).length;
    if (noOfPreviousTaxHeads > 0) {
      for (let i = 0; i < noOfPreviousTaxHeads; i++) {
        dispatch(
          handleField(
            "newCollection",
            "components.div.children.newCollectionDetailsCard.children.cardContent.children.searchContainer.children",
            `taxheadField_${i}.props.value`,
            ""
          )
        );
        dispatch(
          handleField(
            "newCollection",
            "components.div.children.newCollectionDetailsCard.children.cardContent.children.searchContainer.children",
            `taxheadField_${i}.visible`,
            false
          )
        );
      }
      dispatch(prepareFinalObject(`Demands[0].demandDetails`, []));
    }
    //Show new tax head fields
    matchingTaxHeads.forEach((item, index) => {
      dispatch(
        prepareFinalObject(
          `Demands[0].demandDetails[${index}].taxHeadMasterCode`,
          item.code
        )
      );
      dispatch(
        prepareFinalObject(
          `Demands[0].demandDetails[${index}].collectionAmount`,
          0
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
            componentJsonpath: `components.div.children.newCollectionDetailsCard.children.cardContent.children.searchContainer.children.taxheadField_${index}`,
            required: item.required || false,
            pattern: getPattern("Amount"),
            errorMessage: "Invalid Amount",
            visible: true,
            // required: true,
            props: {
              // required: true
            },
            jsonPath: `Demands[0].demandDetails[${index}].taxAmount`
          })
        )
      );
    });
  }
};

const setServiceCategory = (businessServiceData, dispatch) => {
  let nestedServiceData = {};
  businessServiceData.forEach(item => {
    if (item.code && item.code.indexOf(".") > 0) {
      if (nestedServiceData[item.code.split(".")[0]]) {
        let child = get(
          nestedServiceData,
          `${item.code.split(".")[0]}.child`,
          []
        );
        child.push(item);
        set(nestedServiceData, `${item.code.split(".")[0]}.child`, child);
      } else {
        set(
          nestedServiceData,
          `${item.code.split(".")[0]}.code`,
          item.code.split(".")[0]
        );
        set(nestedServiceData, `${item.code.split(".")[0]}.child[0]`, item);
      }
    } else {
      set(nestedServiceData, `${item.code}`, item);
    }
  });
  console.log(nestedServiceData);
  dispatch(
    prepareFinalObject(
      "applyScreenMdmsData.nestedServiceData",
      nestedServiceData
    )
  );
  let serviceCategories = Object.values(nestedServiceData).filter(
    item => item.code
  );
  dispatch(
    prepareFinalObject(
      "applyScreenMdmsData.serviceCategories",
      serviceCategories
    )
  );
};
