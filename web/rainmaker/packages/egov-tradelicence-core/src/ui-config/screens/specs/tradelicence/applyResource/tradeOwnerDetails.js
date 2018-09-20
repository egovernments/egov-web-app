import {
  getCommonCard,
  getCommonGrayCard,
  getCommonTitle,
  getCommonSubHeader,
  getCommonParagraph,
  getTextField,
  getSelectTextField,
  getCommonContainer,
  getPattern
} from "mihy-ui-framework/ui-config/screens/specs/utils";

const OwnerInfoCard = {
  uiFramework: "custom-molecules",
  componentPath: "MultiItem",
  props: {
    scheama: getCommonGrayCard({
      header: getCommonSubHeader("Owner Information"),
      tradeUnitCardContainer: getCommonContainer({
        ownerMobileNo: getTextField(
          "Mobile No.",
          "Enter Mobile No.",
          true,
          getPattern("MobileNo"),
          "",
          {
            iconName: "search",
            position: "end",
            color: "#FE7A51",
            label: "SEARCH"
          }
        ),
        ownerName: getTextField("Name", "Enter Name", true, getPattern("Name")),
        ownerFatherName: getTextField(
          "Father/Husband's Name",
          "Enter Father/Husband's Name",
          true,
          getPattern("Name")
        ),
        OwnerGender: getSelectTextField("Gender", "Select Gender", true, ""),
        ownerDOB: getTextField(
          "Date of Birth",
          "Enter Date of Birth",
          true,
          getPattern("Date"),
          "",
          {
            position: "end",
            iconName: "date_range"
          }
        ),
        ownerEmail: getTextField(
          "Email",
          "Enter Email",
          false,
          getPattern("Email")
        ),
        ownerPAN: getTextField(
          "PAN No.",
          "Enter Owner's PAN No.",
          false,
          getPattern("PAN")
        ),
        ownerAddress: getTextField(
          "Corrospondence Address",
          "Enter Corrospondence Address",
          true,
          getPattern("Address")
        ),
        OwnerSpecialCategory: getSelectTextField(
          "Special Owner Category",
          "Select Special Owner Category",
          true,
          ""
        )
      })
    }),
    items: [],
    addItemLabel: "ADD OWNER",
    headerName: "Owner Information",
    headerJsonPath:
      "children.cardContent.children.header.children.Owner Information.props.label"
  },
  type: "array"
};

export const tradeOwnerDetails = getCommonCard({
  header: getCommonTitle("Please Provide Trade Owner Details"),
  paragraph: getCommonParagraph(
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard Lorem Ipsum has been the industry's standard."
  ),
  tradeLicenseType: getSelectTextField(
    "Type of ownership",
    "Select Type of Ownership",
    false,
    ""
  ),
  OwnerInfoCard
});
