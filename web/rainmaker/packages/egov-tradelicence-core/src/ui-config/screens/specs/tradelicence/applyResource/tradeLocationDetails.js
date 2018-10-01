import {
  getCommonCard,
  getCommonTitle,
  getCommonParagraph,
  getTextField,
  getSelectField,
  getCommonContainer,
  getPattern
} from "mihy-ui-framework/ui-config/screens/specs/utils";

import { getIconStyle } from "../../utils";

export const tradeLocationDetails = getCommonCard({
  header: getCommonTitle("Please Provide Trade Location Details"),
  paragraph: getCommonParagraph(
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard Lorem Ipsum has been the industry's standard."
  ),
  tradeDetailsConatiner: getCommonContainer({
    tradeLocPropertyID: {
      uiFramework: "custom-atoms",
      componentPath: "Container",
      gridDefination: {
        xs: 12,
        sm: 6
      },
      children: {
        txt: getTextField({
          label: {
            labelName: "Property ID",
            labelKey: "TL_NEW_TRADE_DETAILS_PT_ID_LABEL"
          },
          placeholder: {
            labelName: "Enter Property ID",
            labelKey: "TL_NEW_TRADE_DETAILS_PT_ID_PLACEHOLDER"
          },

          pattern: getPattern("PropertyID"),
          iconObj: {
            iconName: "search",
            position: "end",
            color: "#FE7A51",
            label: "SEARCH"
          },
          gridDefination: {
            xs: 11,
            sm: 11
          }
        }),
        ico: {
          uiFramework: "custom-molecules-local",
          componentPath: "Tooltip",
          props: {
            val: "Property Id Information",
            style: getIconStyle("textfieldIcon")
          },
          gridDefination: { xs: 1 }
        }
      }
    },
    tradeLocCity: getSelectField({
      label: { labelName: "City" },
      placeholder: { labelName: "Select City" },
      sourceJsonPath: "applyScreenMdmsData.tenant.tenants"
    }),
    tradeLocDoorHouseNo: getTextField({
      label: {
        labelName: "Door/House No.",
        labelKey: "TL_NEW_TRADE_DETAILS_DOOR_NO_LABEL"
      },
      placeholder: {
        labelName: "Enter Door/House No.",
        labelKey: "TL_NEW_TRADE_DETAILS_DOOR_NO_PLACEHOLDER"
      },
      pattern: getPattern("DoorHouseNo")
    }),
    tradeLocBuilidingName: getTextField({
      label: {
        labelName: "Building/Colony Name",
        labelKey: "TL_NEW_TRADE_DETAILS_BLDG_NAME_LABEL"
      },
      placeholder: {
        labelName: "Enter Building/Colony Name",
        labelKey: "TL_NEW_TRADE_DETAILS_BLDG_NAME_PLACEHOLDER"
      },
      pattern: getPattern("BuildingStreet")
    }),
    tradeLocStreetName: getTextField({
      label: {
        labelName: "Street Name",
        labelKey: "TL_NEW_TRADE_DETAILS_SRT_NAME_LABEL"
      },
      placeholder: {
        labelName: "Enter Street Name",
        labelKey: "TL_NEW_TRADE_DETAILS_SRT_NAME_PLACEHOLDER"
      },
      pattern: getPattern("BuildingStreet")
    }),
    tradeLocMohalla: getTextField({
      label: {
        labelName: "Mohalla",
        labelKey: "TL_NEW_TRADE_DETAILS_MOHALLA_LABEL"
      },
      placeholder: {
        labelName: "Enter Mohalla",
        labelKey: "TL_NEW_TRADE_DETAILS_MOHALLA_PLACEHOLDER"
      }
    }),
    tradeLocPincode: getTextField({
      label: {
        labelName: "Pincode",
        labelKey: "TL_NEW_TRADE_DETAILS_PIN_LABEL"
      },
      placeholder: {
        labelName: "Enter Pincode",
        labelKey: "TL_NEW_TRADE_DETAILS_PIN_PLACEHOLDER"
      },
      pattern: getPattern("Pincode")
    }),
    tradeLocGISCoord: getTextField({
      label: {
        labelName: "GIS Coordinates",
        labelKey: "TL_NEW_TRADE_DETAILS_GIS_CORD_LABEL"
      },
      placeholder: {
        labelName: "Select your trade location on map",
        labelKey: "TL_NEW_TRADE_DETAILS_GIS_CORD_PLACEHOLDER"
      },
      iconObj: {
        iconName: "gps_fixed",
        position: "end"
      }
    }),
    tradeLocElectricity: getTextField({
      label: {
        labelName: "Electricity Connection No.",
        labelKey: "TL_NEW_TRADE_DETAILS_ELEC_CON_NO_LABEL"
      },
      placeholder: {
        labelName: "Enter Electricity Connection No. of Trade Loaction",
        labelKey: "TL_NEW_TRADE_DETAILS_ELEC_CON_NO_PLACEHOLDER"
      },
      pattern: getPattern("ElectricityConnNo")
    })
  })
});
