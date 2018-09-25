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
          "Property ID",
          "Enter Property ID",
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
    tradeLocCity: getSelectTextField("City", "Select City", false, ""),
    tradeLocDoorHouseNo: getTextField(
      "Door/House No.",
      "Enter Door/House No.",
      false,
      getPattern("DoorHouseNo")
    ),
    tradeLocBuilidingName: getTextField(
      "Building/Colony Name",
      "Enter Building/Colony Name",
      false,
      getPattern("BuildingStreet")
    ),
    tradeLocStreetName: getTextField(
      "Street Name",
      "Enter Street Name",
      false,
      getPattern("BuildingStreet")
    ),
    tradeLocMohalla: getTextField("Mohalla", "Enter Mohalla", true, ""),
    tradeLocPincode: getTextField(
      "Pincode",
      "Enter Pincode",
      false,
      getPattern("Pincode")
    ),
    tradeLocGISCoord: getTextField(
      "GIS Coordinates",
      "Select your trade location on map",
      false,
      "",
      "",
      {
        iconName: "gps_fixed",
        position: "end"
      }
    ),
    tradeLocElectricity: getTextField(
      "Electricity Connection No.",
      "Enter Electricity Connection No. of Trade Loaction",
      false,
      getPattern("ElectricityConnNo")
    )
  })
});
