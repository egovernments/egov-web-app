import {
  getCommonCard,
  getCommonTitle,
  getCommonParagraph,
  getTextField,
  getSelectTextField,
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
        txt: getTextField(
          {
            labelName: "Property ID",
            labelKey: "TL_NEW_TRADE_DETAILS_PT_ID_LABEL"
          },
          {
            labelName: "Enter Property ID",
            labelKey: "TL_NEW_TRADE_DETAILS_PT_ID_PLACEHOLDER"
          },
          false,
          getPattern("PropertyID"),
          "",
          {
            iconName: "search",
            position: "end",
            color: "#FE7A51",
            label: "SEARCH"
          },
          {
            xs: 11,
            sm: 11
          }
        ),
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
    tradeLocCity: getSelectTextField(
      "City",
      "Select City",
      false,
      "",
      "",
      "applyScreenMdmsData.tenant.tenants",
      [],
      "code",
      "name"
    ),
    tradeLocDoorHouseNo: getTextField(
      {
        labelName: "Door/House No.",
        labelKey: "TL_NEW_TRADE_DETAILS_DOOR_NO_LABEL"
      },
      {
        labelName: "Enter Door/House No.",
        labelKey: "TL_NEW_TRADE_DETAILS_DOOR_NO_PLACEHOLDER"
      },
      false,
      getPattern("DoorHouseNo")
    ),
    tradeLocBuilidingName: getTextField(
      {
        labelName: "Building/Colony Name",
        labelKey: "TL_NEW_TRADE_DETAILS_BLDG_NAME_LABEL"
      },
      {
        labelName: "Enter Building/Colony Name",
        labelKey: "TL_NEW_TRADE_DETAILS_BLDG_NAME_PLACEHOLDER"
      },
      false,
      getPattern("BuildingStreet")
    ),
    tradeLocStreetName: getTextField(
      {
        labelName: "Street Name",
        labelKey: "TL_NEW_TRADE_DETAILS_SRT_NAME_LABEL"
      },
      {
        labelName: "Enter Street Name",
        labelKey: "TL_NEW_TRADE_DETAILS_SRT_NAME_PLACEHOLDER"
      },
      false,
      getPattern("BuildingStreet")
    ),
    tradeLocMohalla: getTextField(
      { labelName: "Mohalla", labelKey: "TL_NEW_TRADE_DETAILS_MOHALLA_LABEL" },
      {
        labelName: "Enter Mohalla",
        labelKey: "TL_NEW_TRADE_DETAILS_MOHALLA_PLACEHOLDER"
      },
      true,
      ""
    ),
    tradeLocPincode: getTextField(
      { labelName: "Pincode", labelKey: "TL_NEW_TRADE_DETAILS_PIN_LABEL" },
      {
        labelName: "Enter Pincode",
        labelKey: "TL_NEW_TRADE_DETAILS_PIN_PLACEHOLDER"
      },
      false,
      getPattern("Pincode")
    ),
    tradeLocGISCoord: getTextField(
      {
        labelName: "GIS Coordinates",
        labelKey: "TL_NEW_TRADE_DETAILS_GIS_CORD_LABEL"
      },
      {
        labelName: "Select your trade location on map",
        labelKey: "TL_NEW_TRADE_DETAILS_GIS_CORD_PLACEHOLDER"
      },
      false,
      "",
      "",
      {
        iconName: "gps_fixed",
        position: "end"
      }
    ),
    tradeLocElectricity: getTextField(
      {
        labelName: "Electricity Connection No.",
        labelKey: "TL_NEW_TRADE_DETAILS_ELEC_CON_NO_LABEL"
      },
      {
        labelName: "Enter Electricity Connection No. of Trade Loaction",
        labelKey: "TL_NEW_TRADE_DETAILS_ELEC_CON_NO_PLACEHOLDER"
      },
      false,
      getPattern("ElectricityConnNo")
    )
  })
});
