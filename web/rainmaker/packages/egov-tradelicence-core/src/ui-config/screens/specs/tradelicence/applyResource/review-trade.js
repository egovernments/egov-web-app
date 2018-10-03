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
          ...getCommonSubHeader({
            labelName: "Trade Details",
            labelKey: "TL_COMMON_TR_DETAILS"
          })
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
              labelName: "Edit",
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
      reviewLicenceType: getLabelWithValue(
        {
          labelName: "Licence Type",
          labelKey: "TL_COMMON_TABLE_COL_LICENSE_TYPE"
        },
        { jsonPath: "Licenses[0].licenseType" }
      ),
      reviewTradeName: getLabelWithValue(
        {
          labelName: "Trade Name",
          labelKey: "TL_COMMON_TABLE_COL_TRD_NAME"
        },
        { jsonPath: "Licenses[0].tradeName" }
      ),
      reviewTradeMobility: getLabelWithValue("Trade Mobility", "Immovable"),
      reviewCommencementDate: getLabelWithValue(
        {
          labelName: "Commencement Date",
          labelKey: "TL_NEW_TRADE_DETAILS_TRADE_COMM_DATE_LABEL"
        },
        { jsonPath: "Licenses[0].commencementDate" }
      ),
      reviewOperationalArea: getLabelWithValue(
        {
          labelName: "Operational Area",
          labelKey: "TL_NEW_TRADE_DETAILS_OPR_AREA_LABEL"
        },
        { jsonPath: "Licences[0].tradeLicenseDetail.operationalArea" }
      ),
      reviewNoOfEmployee: getLabelWithValue(
        {
          labelName: "No of Employees",
          labelKey: "TL_NEW_TRADE_DETAILS_NO_EMPLOYEES_LABEL"
        },
        { jsonPath: "Licences[0].tradeLicenseDetail.noOfEmployees" }
      ),
      reviewGSTNo: getLabelWithValue(
        {
          labelName: "GST No.",
          labelKey: "TL_NEW_TRADE_DETAILS_TRADE_GST_NO_LABEL"
        },
        { jsonPath: "Licenses[0].tradeName" }
      )
    }),
    div1: getDivider(),
    viewTwo: getCommonContainer({
      reviewTradeCategory: getLabelWithValue(
        {
          labelName: "Trade Category",
          labelKey: "TL_NEW_TRADE_DETAILS_TRADE_CAT_LABEL"
        },
        { jsonPath: "LicencesTemp[0].tradeType" }
      ),
      reviewTradeType: getLabelWithValue(
        {
          labelName: "Trade Type",
          labelKey: "TL_NEW_TRADE_DETAILS_TRADE_TYPE_LABEL"
        },
        { jsonPath: "LicencesTemp[0].tradeSubType" }
      ),
      reviewTradeSubtype: getLabelWithValue(
        {
          labelName: "Trade Sub-Type",
          labelKey: "TL_NEW_TRADE_DETAILS_TRADE_SUBTYPE_LABEL"
        },
        { jsonPath: "Licences[0].tradeLicenseDetail.tradeUnits[0].tradeType" }
      ),

      reviewTradeUOM: getLabelWithValue(
        {
          labelName: "UOM (Unit of Measurement)",
          labelKey: "TL_NEW_TRADE_DETAILS_UOM_LABEL"
        },
        { jSonPath: "Licences[0].tradeLicenseDetail.tradeUnits[0].uom" }
      ),
      reviewTradeUOMValue: getLabelWithValue(
        {
          labelName: "UOM Value",
          labelKey: "TL_NEW_TRADE_DETAILS_UOM_VALUE_LABEL"
        },
        { jsonPath: "Licences[0].tradeLicenseDetail.tradeUnits[0].uomValue" }
      )
    }),
    div2: getDivider(),
    viewThree: getCommonContainer({
      reviewAccessoryType: getLabelWithValue(
        {
          labelName: "Accesory Type",
          labelKey: "TL_REVIEWACCESSORY_TYPE_LABEL"
        },
        {
          jsonPath:
            "Licences[0].tradeLicenseDetail.accessories[0].accessoryCategory"
        }
      ),
      reviewAccessoryUOM: getLabelWithValue(
        {
          labelName: "UOM",
          labelKey: "TL_NEW_TRADE_DETAILS_UOM_UOM_PLACEHOLDER"
        },
        { jsonPath: "Licences[0].tradeLicenseDetail.accessories[0].uom" }
      ),
      reviewAccessoryUOMValue: getLabelWithValue(
        {
          labelName: "UOM Value",
          labelKey: "TL_NEW_TRADE_DETAILS_UOM_VALUE_LABEL"
        },
        { jsonPath: "Licences[0].tradeLicenseDetail.accessories[0].uomValue" }
      )
    }),
    div3: getDivider(),
    viewFour: getCommonContainer({
      reviewPropertyID: getLabelWithValue(
        {
          labelName: "Property Assessment ID",
          labelKey: "TL_EMP_APPLICATION_PT_ASS_ID"
        },
        { jsonPath: "Licences[0].propertyId" }
      ),
      reviewElectricityNo: getLabelWithValue(
        {
          labelName: "Electricity Connection No.",
          labelKey: "TL_NEW_TRADE_DETAILS_ELEC_CON_NO_LABEL"
        },
        { jsonPath: "Licences[0].propertyId" }
      ),
      reviewCity: getLabelWithValue(
        {
          labelName: "City",
          labelKey: "TL_NEW_TRADE_DETAILS_CITY_LABEL"
        },
        { jsonPath: "Licences[0].tradeLicenseDetail.address.city" }
      ),
      reviewPincode: getLabelWithValue(
        {
          labelName: "Pincode",
          labelKey: "TL_NEW_TRADE_DETAILS_PIN_LABEL"
        },
        { jsonPath: "Licences[0].tradeLicenseDetail.address.pincode" }
      ),
      reviewDoorNo: getLabelWithValue(
        {
          labelName: "Door/House No.",
          labelKey: "TL_NEW_TRADE_DETAILS_DOOR_NO_LABEL"
        },
        { jsonPath: "Licences[0].tradeLicenseDetail.address.doorNo" }
      ),
      reviewBuildingName: getLabelWithValue(
        {
          labelName: "Building/Company Name",
          labelKey: "TL_NEW_TRADE_DETAILS_BLDG_NAME_LABEL"
        },
        { jsonPath: "Licences[0].tradeLicenseDetail.address.buildingName" }
      ),
      reviewStreetName: getLabelWithValue(
        {
          labelName: "Street Name",
          labelKey: "TL_NEW_TRADE_DETAILS_SRT_NAME_LABEL"
        },
        { jsonPath: "Licences[0].tradeLicenseDetail.address.street" }
      ),
      reviewMohalla: getLabelWithValue(
        {
          labelName: "Mohalla",
          labelKey: "TL_NEW_TRADE_DETAILS_MOHALLA_LABEL"
        },
        { jsonPath: "Licences[0].tradeLicenseDetail.address.locality.name" }
      )
    })
  });
};
