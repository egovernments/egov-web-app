import {
  getCommonGrayCard,
  getCommonSubHeader,
  getCommonContainer,
  getLabelWithValue,
  getDivider,
  getLabel
} from "mihy-ui-framework/ui-config/screens/specs/utils";

import { changeStep } from "./footer";
import { getLabelWithValueNew } from "../../utils";

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
            buttonLabel: getLabel("Edit")
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
      reviewLicenceType: getLabelWithValue("Licence Type", "Temporary"),
      reviewTradeName: getLabelWithValueNew({
        textLabel: {
          label: "Trade Name",
          labelKey: "TL_COMMON_TABLE_COL_TRD_NAME"
        },
        jsonPath: "Licenses[0].tenantId"
      }),
      reviewTradeMobility: getLabelWithValue("Trade Mobility", "Immovable"),
      reviewCommencementDate: getLabelWithValue(
        "Commencement Date",
        "12/12/2018"
      ),
      reviewOperationalArea: getLabelWithValue("Operational Area", "2000 Sqft"),
      reviewNoOfEmployee: getLabelWithValue("No of Employees", "200"),
      reviewGSTNo: getLabelWithValue("GST No.", "364565")
    }),
    div1: getDivider(),
    viewTwo: getCommonContainer({
      reviewTradeCategory: getLabelWithValue("Trade Category", "Goods"),
      reviewTradeType: getLabelWithValue("Trade Type", "Value"),
      reviewTradeSubtype: getLabelWithValue(
        "Trade Sub-Type",
        "Manufacuring Plant"
      ),
      reviewTradeUOM: getLabelWithValue("UOM (Unit of Measurement)", "Sq Ft"),
      reviewTradeUOMValue: getLabelWithValue("UOM Value", "2000")
    }),
    div2: getDivider(),
    viewThree: getCommonContainer({
      reviewAccessoryType: getLabelWithValue("Accesory Type", "Generator"),
      reviewAccessoryUOM: getLabelWithValue("UOM", "Watt"),
      reviewAccessoryUOMValue: getLabelWithValue("UOM Value", "5000")
    }),
    div3: getDivider(),
    viewFour: getCommonContainer({
      reviewPropertyID: getLabelWithValue("Property Assessment ID", "456"),
      reviewElectricityNo: getLabelWithValue(
        "Electricity Connection No.",
        "789"
      ),
      reviewCity: getLabelWithValue("City", "Amritsar"),
      reviewPincode: getLabelWithValue("Pincode", "875478"),
      reviewDoorNo: getLabelWithValue("Door/House No.", "707/B"),
      reviewBuildingName: getLabelWithValue(
        "Building/Company Name",
        "Suncity Apartments"
      ),
      reviewStreetName: getLabelWithValue(
        "Street Name",
        "Old Gurudwara Street"
      ),
      reviewMohalla: getLabelWithValue("Mohalla", "Old Gurudwara Street")
    })
  });
};
