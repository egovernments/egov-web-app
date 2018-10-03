import {
  getCommonGrayCard,
  getCommonSubHeader,
  getCommonContainer,
  getLabelWithValue,
  getDivider,
  getLabel
} from "mihy-ui-framework/ui-config/screens/specs/utils";

import { changeStep } from "./footer";

export const getReviewTrade = (isEditable = true) => {
  return getCommonGrayCard({
    headerDiv: {
      uiFramework: "custom-atoms",
      componentPath: "Container",
      children: {
        header: {
          gridDefination: {
            xs: 12,
            sm: 10
          },
          ...getCommonSubHeader("Trade Details")
        },
        editSection: {
          componentPath: "Button",
          props: {
            color: "primary"
          },
          visible: isEditable,
          gridDefination: {
            xs: 12,
            sm: 2,
            align: "right"
          },
          children: {
            editIcon: {
              uiFramework: "custom-atoms",
              componentPath: "Icon",
              props: {
                iconName: "edit"
              }
            },
            buttonLabel: getLabel({
              label: "Edit",
              labelKey: "TL_SUMMARY_EDIT"
            })
          },
          onClickDefination: {
            action: "condition",
            callBack: (state, dispatch) => {
              changeStep(state, dispatch, "", 0);
            }
          }
        }
      }
    },
    viewOne: getCommonContainer({
      reviewLicenceType: getLabelWithValue({
        textLabel: {
          label: "Licence Type",
          labelKey: "TL_COMMON_TABLE_COL_LICENSE_TYPE"
        },
        jsonPath: "Licenses[0].licenseType"
      }),
      reviewTradeName: getLabelWithValue({
        textLabel: {
          label: "Trade Name",
          labelKey: "TL_COMMON_TABLE_COL_TRD_NAME"
        },
        jsonPath: "Licenses[0].tradeName"
      }),
      reviewTradeMobility: getLabelWithValue("Trade Mobility", "Immovable"),
      reviewCommencementDate: getLabelWithValue({
        textLabel: {
          label: "Commencement Date",
          labelKey: "TL_NEW_TRADE_DETAILS_TRADE_COMM_DATE_LABEL"
        },
        jsonPath: "Licenses[0].commencementDate"
      }),
      reviewOperationalArea: getLabelWithValue({
        textLabel: {
          label: "Operational Area",
          labelKey: "TL_NEW_TRADE_DETAILS_OPR_AREA_LABEL"
        },
        jsonPath: "Licences[0].tradeLicenseDetail.operationalArea"
      }),
      reviewNoOfEmployee: getLabelWithValue({
        textLabel: {
          label: "No of Employees",
          labelKey: "TL_NEW_TRADE_DETAILS_NO_EMPLOYEES_LABEL"
        },
        jsonPath: "Licences[0].tradeLicenseDetail.noOfEmployees"
      }),
      reviewGSTNo: getLabelWithValue({
        textLabel: {
          label: "GST No.",
          labelKey: "TL_NEW_TRADE_DETAILS_TRADE_GST_NO_LABEL"
        },
        jsonPath: "Licenses[0].tradeName"
      })
    }),
    div1: getDivider(),
    viewTwo: getCommonContainer({
      reviewTradeCategory: getLabelWithValue({
        textLabel: {
          label: "Trade Category",
          labelKey: "TL_NEW_TRADE_DETAILS_TRADE_CAT_LABEL"
        },
        jsonPath: "LicencesTemp[0].tradeType"
      }),
      reviewTradeType: getLabelWithValue({
        textLabel: {
          label: "Trade Type",
          labelKey: "TL_NEW_TRADE_DETAILS_TRADE_TYPE_LABEL"
        },
        jsonPath: "LicencesTemp[0].tradeSubType"
      }),
      reviewTradeSubtype: getLabelWithValue({
        textLabel: {
          label: "Trade Sub-Type",
          labelKey: "TL_NEW_TRADE_DETAILS_TRADE_SUBTYPE_LABEL"
        },
        jsonPath: "Licences[0].tradeLicenseDetail.tradeUnits[0].tradeType"
      }),

      reviewTradeUOM: getLabelWithValue({
        textLabel: {
          label: "UOM (Unit of Measurement)",
          labelKey: "TL_NEW_TRADE_DETAILS_UOM_LABEL"
        },
        jSonPath: "Licences[0].tradeLicenseDetail.tradeUnits[0].uom"
      }),
      reviewTradeUOMValue: getLabelWithValue({
        textLabel: {
          label: "UOM Value",
          labelKey: "TL_NEW_TRADE_DETAILS_UOM_VALUE_LABEL"
        },
        jsonPath: "Licences[0].tradeLicenseDetail.tradeUnits[0].uomValue"
      })
    }),
    div2: getDivider(),
    viewThree: getCommonContainer({
      reviewAccessoryType: getLabelWithValue({
        textLabel: {
          label: "Accesory Type",
          labelKey: "TL_REVIEWACCESSORY_TYPE_LABEL"
        },
        jsonPath:
          "Licences[0].tradeLicenseDetail.accessories[0].accessoryCategory"
      }),
      reviewAccessoryUOM: getLabelWithValue({
        textLabel: {
          label: "UOM",
          labelKey: "TL_NEW_TRADE_DETAILS_UOM_UOM_PLACEHOLDER"
        },
        jsonPath: "Licences[0].tradeLicenseDetail.accessories[0].uom"
      }),
      reviewAccessoryUOMValue: getLabelWithValue({
        textLabel: {
          label: "UOM Value",
          labelKey: "TL_NEW_TRADE_DETAILS_UOM_VALUE_LABEL"
        },
        jsonPath: "Licences[0].tradeLicenseDetail.accessories[0].uomValue"
      })
    }),
    div3: getDivider(),
    viewFour: getCommonContainer({
      reviewPropertyID: getLabelWithValue({
        textLabel: {
          label: "Property Assessment ID",
          labelKey: "TL_EMP_APPLICATION_PT_ASS_ID"
        },
        jsonPath: "Licences[0].propertyI"
      }),
      reviewElectricityNo: getLabelWithValue({
        textLabel: {
          label: "Electricity Connection No.",
          labelKey: "TL_NEW_TRADE_DETAILS_ELEC_CON_NO_LABEL"
        },
        jsonPath: "Licences[0].propertyId"
      }),
      reviewCity: getLabelWithValue({
        textLabel: {
          label: "City",
          labelKey: "TL_NEW_TRADE_DETAILS_CITY_LABEL"
        },
        jsonPath: "Licences[0].tradeLicenseDetail.address.city"
      }),
      reviewPincode: getLabelWithValue({
        textLabel: {
          label: "Pincode",
          labelKey: "TL_NEW_TRADE_DETAILS_PIN_LABEL"
        },
        jsonPath: "Licences[0].tradeLicenseDetail.address.pincode"
      }),
      reviewDoorNo: getLabelWithValue({
        textLabel: {
          label: "Door/House No.",
          labelKey: "TL_NEW_TRADE_DETAILS_DOOR_NO_LABEL"
        },
        jsonPath: "Licences[0].tradeLicenseDetail.address.doorNo"
      }),
      reviewBuildingName: getLabelWithValue({
        textLabel: {
          label: "Building/Company Name",
          labelKey: "TL_NEW_TRADE_DETAILS_BLDG_NAME_LABEL"
        },
        jsonPath: "Licences[0].tradeLicenseDetail.address.buildingName"
      }),
      reviewStreetName: getLabelWithValue({
        textLabel: {
          label: "Street Name",
          labelKey: "TL_NEW_TRADE_DETAILS_SRT_NAME_LABEL"
        },
        jsonPath: "Licences[0].tradeLicenseDetail.address.street"
      }),
      reviewMohalla: getLabelWithValue({
        textLabel: {
          label: "Mohalla",
          labelKey: "TL_NEW_TRADE_DETAILS_MOHALLA_LABEL"
        },
        jsonPath: "Licences[0].tradeLicenseDetail.address.locality.name"
      })
    })
  });
};
