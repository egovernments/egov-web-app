import {
  getCommonCard,
  getCommonGrayCard,
  getCommonTitle,
  getCommonSubHeader,
  getTextField,
  getSelectField,
  getCommonContainer,
  getContainerWithElement,
  getDateField,
  getPattern,
  getLabel
} from "mihy-ui-framework/ui-config/screens/specs/utils";
import { getDetailsForOwner } from "../../utils";
import { prepareFinalObject as pFO } from "mihy-ui-framework/ui-redux/screen-configuration/actions";
import get from "lodash/get";
import { handleScreenConfigurationFieldChange as handleField } from "mihy-ui-framework/ui-redux/screen-configuration/actions";

export const getOwnerMobNoField = {
  uiFramework: "custom-atoms",
  componentPath: "Container",
  gridDefination: {
    xs: 12,
    sm: 12
  },
  children: {
    txt: getTextField({
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
        onClickDefination: {
          action: "condition",
          callBack: (state, dispatch) => {
            getDetailsForOwner(state, dispatch);
          }
        }
      }
    })
  }
};

export const getOwnerGenderField = getSelectField({
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
});

export const getOwnerDOBField = getDateField({
  label: { labelName: "Date of Birth" },
  placeholder: { labelName: "Enter Date of Birth" },
  required: true,
  pattern: getPattern("Date"),
  jsonPath: "Licenses[0].tradeLicenseDetail.owners[0].dob"
});

export const getOwnerEmailField = getTextField({
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
});

export const getFatherNameField = getTextField({
  label: {
    labelName: "Father/Spouse Name",
    labelKey: "TL_NEW_OWNER_DETAILS_FATHER_NAME_LABEL"
  },
  placeholder: {
    labelName: "Enter Father/Spouse Name",
    labelKey: "TL_NEW_OWNER_DETAILS_FATHER_NAME_PLACEHOLDER"
  },
  required: true,
  pattern: getPattern("Name"),
  jsonPath: "Licenses[0].tradeLicenseDetail.owners[0].fatherOrHusbandName"
});

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
    hasAddItem: false,
    headerJsonPath:
      "children.cardContent.children.header.children.Owner Information.props.label",
    sourceJsonPath: "Licenses[0].tradeLicenseDetail.accessories",
    prefixSourceJsonPath:
      "children.cardContent.children.accessoriesCardContainer.children"
  },
  visible: false,
  type: "array"
};

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
        getOwnerMobNoField,
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
        getFatherNameField,
        getOwnerGenderField,
        getOwnerDOBField,
        getOwnerEmailField,
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
          jsonPath: "Licenses[0].tradeLicenseDetail.owners[0].ownerType",
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
    prefixSourceJsonPath:
      "children.cardContent.children.accessoriesCardContainer.children"
  },

  type: "array"
};

export const tradeOwnerDetails = getCommonCard({
  header: getCommonTitle({
    labelName: "Please Provide Trade Owner Details",
    labelKey: "TL_NEW_OWNER_DETAILS_HEADER"
  }),
  ownershipType: getCommonContainer({
    ownership: {
      ...getSelectField({
        label: { labelName: "Type of ownership" },
        placeholder: { labelName: "Select Type of Ownership" },
        jsonPath: "LicensesTemp[0].tradeLicenseDetail.ownerShipCategory",
        sourceJsonPath:
          "applyScreenMdmsData.common-masters.OwnerShipCategoryTransformed"
      }),
      beforeFieldChange: (action, state, dispatch) => {
        try {
          dispatch(
            pFO(
              "applyScreenMdmsData.common-masters.subOwnerShipCategoryTransformed",
              get(
                state.screenConfiguration.preparedFinalObject,
                `applyScreenMdmsData.common-masters.OwnerShipCategory.${
                  action.value
                }`,
                []
              )
            )
          );
          if (action.value === "INDIVIDUAL") {
            dispatch(
              handleField(
                "apply",
                "components.div.children.formwizardSecondStep.children.tradeOwnerDetails.children.cardContent.children.OwnerInfoCard",
                "visible",
                true
              )
            );
            dispatch(
              handleField(
                "apply",
                "components.div.children.formwizardSecondStep.children.tradeOwnerDetails.children.cardContent.children.ownerInfoInstitutional",
                "visible",
                false
              )
            );
          } else {
            dispatch(
              handleField(
                "apply",
                "components.div.children.formwizardSecondStep.children.tradeOwnerDetails.children.cardContent.children.OwnerInfoCard",
                "visible",
                false
              )
            );
            dispatch(
              handleField(
                "apply",
                "components.div.children.formwizardSecondStep.children.tradeOwnerDetails.children.cardContent.children.ownerInfoInstitutional",
                "visible",
                true
              )
            );
          }
        } catch (e) {
          console.log(e);
        }
      }
    },
    subOwnership: getSelectField({
      label: { labelName: "Type of sub-ownership" },
      placeholder: { labelName: "Select Type of Ownership" },
      jsonPath: "Licenses[0].tradeLicenseDetail.subOwnerShipCategory",
      sourceJsonPath:
        "applyScreenMdmsData.common-masters.subOwnerShipCategoryTransformed"
    })
  }),
  OwnerInfoCard,
  ownerInfoInstitutional
});
