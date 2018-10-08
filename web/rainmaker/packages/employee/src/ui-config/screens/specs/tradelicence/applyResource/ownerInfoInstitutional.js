import {
  getCommonCard,
  getCommonGrayCard,
  getCommonTitle,
  getCommonSubHeader,
  getCommonParagraph,
  getTextField,
  getSelectField,
  getCommonContainer,
  getDateField,
  getPattern
} from "mihy-ui-framework/ui-config/screens/specs/utils";

import {
  getOwnerMobNoField,
  getOwnerGenderField,
  getOwnerDOBField,
  getOwnerEmailField,
  getFatherNameField
} from "./tradeOwnerDetails";

export const ownerInfoInstitutional = {
  uiFramework: "custom-containers",
  componentPath: "MultiItem",
  props: {
    scheama: getCommonGrayCard({
      header: getCommonSubHeader({
        labelName: "Owner Information",
        labelKey: "TL_NEW_OWNER_DETAILS_HEADER_OWNER_INFO"
      }),
      tradeUnitCardContainer: getCommonContainer({
        getOwnerMobNoField,
        offTelephone: getTextField({
          label: {
            labelName: "Official Telephone No.",
            labelKey: "TL_NEW_OWNER_PHONE_LABEL"
          },
          placeholder: {
            labelName: "Enter Official Telephone No.",
            labelKey: "TL_NEW_OWNER_PHONE_PLACEHOLDER"
          },
          required: true,
          jsonPath: "Licenses[0].tradeLicenseDetail.owners[0].altContactNumber"
        }),

        authPerson: getTextField({
          label: {
            labelName: "Name of Authorised Person",
            labelKey: "TL_NEW_OWNER_AUTH_PER_LABEL"
          },
          placeholder: {
            labelName: "Enter Name of Authorised Person",
            labelKey: "TL_NEW_OWNER_AUTH_PER_PLACEHOLDER"
          },
          pattern: getPattern("Name"),
          required: true,
          jsonPath: "Licenses[0].tradeLicenseDetail.owners[0].name"
        }),

        designation: getTextField({
          label: {
            labelName: "Designation",
            labelKey: "TL_NEW_OWNER_DESIG_LABEL"
          },
          placeholder: {
            labelName: "Enter Designation",
            labelKey: "TL_NEW_OWNER_DESIG_PLACEHOLDER"
          },
          pattern: getPattern("Name"),
          required: true,
          jsonPath: "Licenses[0].tradeLicenseDetail.institution.designation"
        }),
        getFatherNameField,
        getOwnerGenderField,
        getOwnerDOBField,
        getOwnerEmailField,
        ownerAddress: getTextField({
          label: {
            labelName: "Official Corrospondence Address",
            labelKey: "TL_NEW_OWNER_OFF_ADDR_LABEL"
          },
          placeholder: {
            labelName: "Enter Official Corrospondence Address",
            labelKey: "TL_NEW_OWNER_OFF_ADDR_PLACEHOLDER"
          },
          required: true,
          pattern: getPattern("Address"),
          jsonPath: "Licenses[0].tradeLicenseDetail.owners[0].permanentAddress"
        })
      })
    }),
    items: [],
    addItemLabel: "ADD OWNER",
    headerName: "Owner Information",
    headerJsonPath:
      "children.cardContent.children.header.children.Owner Information.props.label",
    sourceJsonPath: "Licenses[0].tradeLicenseDetail.accessories",
    prefixSourceJsonPath:
      "children.cardContent.children.accessoriesCardContainer.children"
  },
  type: "array"
};
