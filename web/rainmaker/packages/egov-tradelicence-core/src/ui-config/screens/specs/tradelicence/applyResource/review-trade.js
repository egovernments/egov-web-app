import {
  getCommonGrayCard,
  getCommonSubHeader,
  getCommonContainer,
  getLabelWithValue,
  getDivider,
  getLabel
} from "mihy-ui-framework/ui-config/screens/specs/utils";
import { changeStep } from "./footer";

const accessoriesCard = {
  uiFramework: "custom-containers",
  componentPath: "MultiItem",
  props: {
    className: "review-trade-search-preview",
    scheama: getCommonGrayCard({
      accessoriesCardContainer: getCommonContainer({
        reviewAccessoryType: getLabelWithValue(
          {
            labelName: "Accesory Type",
            labelKey: "TL_REVIEWACCESSORY_TYPE_LABEL"
          },
          {
            jsonPath:
              "Licenses[0].tradeLicenseDetail.accessories[0].accessoryCategory"
          }
        ),
        reviewAccessoryUOM: getLabelWithValue(
          {
            labelName: "UOM",
            labelKey: "TL_NEW_TRADE_DETAILS_UOM_UOM_PLACEHOLDER"
          },
          { jsonPath: "Licenses[0].tradeLicenseDetail.accessories[0].uom" }
        ),
        reviewAccessoryUOMValue: getLabelWithValue(
          {
            labelName: "UOM Value",
            labelKey: "TL_NEW_TRADE_DETAILS_UOM_VALUE_LABEL"
          },
          { jsonPath: "Licenses[0].tradeLicenseDetail.accessories[0].uomValue" }
        )
      })
    }),

    items: [],
    hasAddItem: false,
    sourceJsonPath: "Licenses[0].tradeLicenseDetail.accessories",
    prefixSourceJsonPath:
      "children.cardContent.children.accessoriesCardContainer.children"
  },
  type: "array"
};

export const getReviewTrade = (isEditable = true) => {
  return getCommonGrayCard({
    headerDiv: {
      uiFramework: "custom-atoms",
      componentPath: "Container",
      props: {
        style: { marginBottom: "10px" }
      },
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
      reviewFromDate: getLabelWithValue(
        { labelName: "From Date" },
        { jsonPath: "Licenses[0].validFrom" }
      ),
      reviewToDate: getLabelWithValue(
        { labelName: "To Date" },
        { jsonPath: "Licenses[0].validTo" }
      ),
      reviewStructureType: getLabelWithValue(
        { labelName: "Structure Type" },
        {
          jsonPath: "LicensesTemp[0].tradeLicenseDetail.structureType"
        }
      ),
      reviewSubStructureType: getLabelWithValue(
        { labelName: "Structure Sub Type" },
        {
          jsonPath: "Licenses[0].tradeLicenseDetail.structureType"
        }
      ),
      reviewCommencementDate: getLabelWithValue(
        {
          labelName: "Commencement Date",
          labelKey: "TL_NEW_TRADE_DETAILS_TRADE_COMM_DATE_LABEL"
        },
        { jsonPath: "Licenses[0].commencementDate" }
      ),
      reviewGSTNo: getLabelWithValue(
        {
          labelName: "GST No.",
          labelKey: "TL_NEW_TRADE_DETAILS_TRADE_GST_NO_LABEL"
        },
        {
          jsonPath: "Licenses[0].tradeLicenseDetail.additionalDetail.gstNo"
        }
      ),
      reviewOperationalArea: getLabelWithValue(
        {
          labelName: "Operational Area",
          labelKey: "TL_NEW_TRADE_DETAILS_OPR_AREA_LABEL"
        },
        { jsonPath: "Licenses[0].tradeLicenseDetail.operationalArea" }
      ),
      reviewNoOfEmployee: getLabelWithValue(
        {
          labelName: "No of Employees",
          labelKey: "TL_NEW_TRADE_DETAILS_NO_EMPLOYEES_LABEL"
        },
        { jsonPath: "Licences[0].tradeLicenseDetail.noOfEmployees" }
      )
    }),
    div1: getDivider(),
    viewTwo: getCommonContainer({
      reviewTradeCategory: getLabelWithValue(
        {
          labelName: "Trade Category",
          labelKey: "TL_NEW_TRADE_DETAILS_TRADE_CAT_LABEL"
        },
        { jsonPath: "LicensesTemp[0].tradeDetailsResponse[0].trade" }
      ),
      reviewTradeType: getLabelWithValue(
        {
          labelName: "Trade Type",
          labelKey: "TL_NEW_TRADE_DETAILS_TRADE_TYPE_LABEL"
        },
        { jsonPath: "LicensesTemp[0].tradeDetailsResponse[0].tradeType" }
      ),
      reviewTradeSubtype: getLabelWithValue(
        {
          labelName: "Trade Sub-Type",
          labelKey: "TL_NEW_TRADE_DETAILS_TRADE_SUBTYPE_LABEL"
        },
        { jsonPath: "Licenses[0].tradeLicenseDetail.tradeUnits[0].tradeType" }
      ),

      reviewTradeUOM: getLabelWithValue(
        {
          labelName: "UOM (Unit of Measurement)",
          labelKey: "TL_NEW_TRADE_DETAILS_UOM_LABEL"
        },
        { jsonPath: "Licenses[0].tradeLicenseDetail.tradeUnits[0].uom" }
      ),
      reviewTradeUOMValue: getLabelWithValue(
        {
          labelName: "UOM Value",
          labelKey: "TL_NEW_TRADE_DETAILS_UOM_VALUE_LABEL"
        },
        { jsonPath: "Licenses[0].tradeLicenseDetail.tradeUnits[0].uomValue" }
      )
    }),
    div2: getDivider(),
    viewThree: accessoriesCard,

    div3: getDivider(),
    viewFour: getCommonContainer({
      reviewPropertyID: getLabelWithValue(
        {
          labelName: "Property Assessment ID",
          labelKey: "TL_EMP_APPLICATION_PT_ASS_ID"
        },
        { jsonPath: "Licenses[0].propertyId" }
      ),
      reviewCity: getLabelWithValue(
        {
          labelName: "City",
          labelKey: "TL_NEW_TRADE_DETAILS_CITY_LABEL"
        },
        { jsonPath: "Licenses[0].tradeLicenseDetail.address.city" }
      ),
      reviewDoorNo: getLabelWithValue(
        {
          labelName: "Door/House No.",
          labelKey: "TL_NEW_TRADE_DETAILS_DOOR_NO_LABEL"
        },
        { jsonPath: "Licenses[0].tradeLicenseDetail.address.doorNo" }
      ),
      reviewBuildingName: getLabelWithValue(
        {
          labelName: "Building/Company Name",
          labelKey: "TL_NEW_TRADE_DETAILS_BLDG_NAME_LABEL"
        },
        { jsonPath: "Licenses[0].tradeLicenseDetail.address.buildingName" }
      ),
      reviewStreetName: getLabelWithValue(
        {
          labelName: "Street Name",
          labelKey: "TL_NEW_TRADE_DETAILS_SRT_NAME_LABEL"
        },
        { jsonPath: "Licenses[0].tradeLicenseDetail.address.street" }
      ),
      reviewMohalla: getLabelWithValue(
        {
          labelName: "Mohalla",
          labelKey: "TL_NEW_TRADE_DETAILS_MOHALLA_LABEL"
        },
        { jsonPath: "Licenses[0].tradeLicenseDetail.address.locality.code" }
      ),
      reviewPincode: getLabelWithValue(
        {
          labelName: "Pincode",
          labelKey: "TL_NEW_TRADE_DETAILS_PIN_LABEL"
        },
        { jsonPath: "Licenses[0].tradeLicenseDetail.address.pincode" }
      ),
      reviewElectricityNo: getLabelWithValue(
        {
          labelName: "Electricity Connection No.",
          labelKey: "TL_NEW_TRADE_DETAILS_ELEC_CON_NO_LABEL"
        },
        {
          jsonPath:
            "Licenses[0].tradeLicenseDetail.additionalDetail.electricityConnectionNo"
        }
      )
    })
  });
};
