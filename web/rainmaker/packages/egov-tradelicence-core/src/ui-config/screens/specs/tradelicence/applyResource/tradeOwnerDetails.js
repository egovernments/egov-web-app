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

const OwnerInfoCard = {
  uiFramework: "custom-containers",
  componentPath: "MultiItem",
  props: {
    scheama: getCommonGrayCard({
      header: getCommonSubHeader({
        labelName: "Owner Information",
        labelKey: "TL_NEW_OWNER_DETAILS_HEADER_OWNER_INFO"
      }),
      tradeUnitCardContainer: getCommonContainer({
        ownerMobileNo: getTextField({
          label: {
            labelName: "Mobile No.",
            labelKey: "TL_NEW_OWNER_DETAILS_MOB_NO_LABEL"
          },
          placeholder: {
            labelName: "Enter Mobile No.",
            labelKey: "TL_NEW_OWNER_DETAILS_MOB_NO_PLACEHOLDER"
          },
          required: true,
          pattern: getPattern("MobileNo"),
          jsonPath: "Licenses[0].tradeLicenseDetail.owners[0].mobileNumber",
          iconObj: {
            iconName: "search",
            position: "end",
            color: "#FE7A51",
            label: "SEARCH"
          }
        }),
        ownerName: getTextField({
          label: {
            labelName: "Name",
            labelKey: "TL_NEW_OWNER_DETAILS_NAME_LABEL"
          },
          placeholder: {
            labelName: "Enter Name",
            labelKey: "TL_NEW_OWNER_DETAILS_NAME_PLACEHOLDER"
          },
          required: true,
          pattern: getPattern("Name"),
          jsonPath: "Licenses[0].tradeLicenseDetail.owners[0].name"
        }),
        ownerFatherName: getTextField({
          label: {
            labelName: "Father/Husband's Name",
            labelKey: "TL_NEW_OWNER_DETAILS_FATHER_NAME_LABEL"
          },
          placeholder: {
            labelName: "Enter Father/Husband's Name",
            labelKey: "TL_NEW_OWNER_DETAILS_FATHER_NAME_PLACEHOLDER"
          },
          required: true,
          pattern: getPattern("Name"),
          jsonPath:
            "Licenses[0].tradeLicenseDetail.owners[0].fatherOrHusbandName"
        }),
        OwnerGender: getSelectField({
          label: {
            labelName: "Gender",
            labelKey: "TL_NEW_OWNER_DETAILS_GENDER_LABEL"
          },
          placeholder: {
            labelName: "Select Gender",
            labelKey: "TL_NEW_OWNER_DETAILS_GENDER_PLACEHOLDER"
          },
          required: true,
          jsonPath: "Licenses[0].tradeLicenseDetail.owners[0].gender",
          data: [
            {
              code: "MALE"
            },
            {
              code: "FEMALE"
            }
          ]
        }),
        ownerDOB: getDateField({
          label: { labelName: "Date of Birth" },
          placeholder: { labelName: "Enter Date of Birth" },
          required: true,
          pattern: getPattern("Date"),
          jsonPath: "Licenses[0].tradeLicenseDetail.owners[0].dob"
        }),
        ownerEmail: getTextField({
          label: {
            labelName: "Email",
            labelKey: "TL_NEW_OWNER_DETAILS_EMAIL_LABEL"
          },
          placeholder: {
            labelName: "Enter Email",
            labelKey: "TL_NEW_OWNER_DETAILS_EMAIL_PLACEHOLDER"
          },
          pattern: getPattern("Email"),
          jsonPath: "Licenses[0].tradeLicenseDetail.owners[0].emailId"
        }),
        ownerPAN: getTextField({
          label: {
            labelName: "PAN No.",
            labelKey: "TL_NEW_OWNER_DETAILS_PAN_LABEL"
          },
          placeholder: {
            labelName: "Enter Owner's PAN No.",
            labelKey: "TL_NEW_OWNER_DETAILS_PAN_PLACEHOLDER"
          },
          pattern: getPattern("PAN"),
          jsonPath: "Licenses[0].tradeLicenseDetail.owners[0].pan"
        }),
        ownerAddress: getTextField({
          label: {
            labelName: "Corrospondence Address",
            labelKey: "TL_NEW_OWNER_DETAILS_ADDR_LABEL"
          },
          placeholder: {
            labelName: "Enter Corrospondence Address",
            labelKey: "TL_NEW_OWNER_DETAILS_ADDR_PLACEHOLDER"
          },
          required: true,
          pattern: getPattern("Address"),
          jsonPath: "Licenses[0].tradeLicenseDetail.owners[0].permanentAddress"
        }),
        OwnerSpecialCategory: getSelectField({
          label: {
            labelName: "Special Owner Category",
            labelKey: "TL_NEW_OWNER_DETAILS_SPL_OWN_CAT_LABEL"
          },
          placeholder: {
            labelName: "Select Special Owner Category",
            labelKey: "TL_NEW_OWNER_DETAILS_SPL_OWN_CAT_PLACEHOLDER"
          },
          required: true,
          jsonPath:
            "Licenses[0].tradeLicenseDetail.owners[0].ownerType",
          sourceJsonPath: "applyScreenMdmsData.common-masters.OwnerType"
        })
      })
    }),
    items: [],
    addItemLabel: "ADD OWNER",
    headerName: "Owner Information",
    headerJsonPath:
      "children.cardContent.children.header.children.Owner Information.props.label",
      sourceJsonPath: "Licenses[0].tradeLicenseDetail.accessories",
    prefixSourceJsonPath:"children.cardContent.children.accessoriesCardContainer.children"
  },
  type: "array"
};

export const tradeOwnerDetails = getCommonCard({
  header: getCommonTitle({
    labelName: "Please Provide Trade Owner Details",
    labelKey: "TL_NEW_OWNER_DETAILS_HEADER"
  }),
  // paragraph: getCommonParagraph({
  //   labelName:
  //     "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard Lorem Ipsum has been the industry's standard."
  // }),
  ownership: getSelectField({
    label: { labelName: "Type of ownership" },
    placeholder: { labelName: "Select Type of Ownership" },
    jsonPath: "Licenses[0].tradeLicenseDetail.owners[0].ownerType",
    sourceJsonPath:
      "applyScreenMdmsData.common-masters.OwnerShipCategoryTransformed"
  }),
  OwnerInfoCard
});
