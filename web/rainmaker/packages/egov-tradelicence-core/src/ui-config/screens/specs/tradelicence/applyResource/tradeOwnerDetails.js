import {
  getCommonCard,
  getCommonGrayCard,
  getCommonTitle,
  getCommonSubHeader,
  getCommonParagraph,
  getTextField,
  getSelectTextField,
  getCommonContainer,
  getDateField,
  getPattern
} from "mihy-ui-framework/ui-config/screens/specs/utils";

import { prepareFinalObject as pFO } from "mihy-ui-framework/ui-redux/screen-configuration/actions";
import get from "lodash/get";

const OwnerInfoCard = {
  uiFramework: "custom-molecules",
  componentPath: "MultiItem",
  props: {
    scheama: getCommonGrayCard({
      header: getCommonSubHeader("Owner Information"),
      tradeUnitCardContainer: getCommonContainer({
        ownerMobileNo: getTextField(
          {
            labelName: "Mobile No.",
            labelKey: "TL_NEW_OWNER_DETAILS_MOB_NO_LABEL"
          },
          {
            labelName: "Enter Mobile No.",
            labelKey: "TL_NEW_OWNER_DETAILS_MOB_NO_PLACEHOLDER"
          },
          true,
          getPattern("MobileNo"),
          "Licenses[0].tradeLicenseDetail.owners[0].mobileNumber",
          {
            iconName: "search",
            position: "end",
            color: "#FE7A51",
            label: "SEARCH"
          }
        ),
        ownerName: getTextField(
          { labelName: "Name", labelKey: "TL_NEW_OWNER_DETAILS_NAME_LABEL" },
          {
            labelName: "Enter Name",
            labelKey: "TL_NEW_OWNER_DETAILS_NAME_PLACEHOLDER"
          },
          true,
          getPattern("Name"),
          "Licenses[0].tradeLicenseDetail.owners[0].name"
        ),
        ownerFatherName: getTextField(
          {
            labelName: "Father/Husband's Name",
            labelKey: "TL_NEW_OWNER_DETAILS_FATHER_NAME_LABEL"
          },
          {
            labelName: "Enter Father/Husband's Name",
            labelKey: "TL_NEW_OWNER_DETAILS_FATHER_NAME_PLACEHOLDER"
          },
          true,
          getPattern("Name"),
          "Licenses[0].tradeLicenseDetail.owners[0].fatherOrHusbandName"
        ),
        OwnerGender: getSelectTextField(
          "Gender",
          "Select Gender",
          true,
          "",
          "Licenses[0].tradeLicenseDetail.owners[0].gender",
          "",
          [
            {
              code: "MALE",
              label: "Male"
            },
            {
              code: "FEMALE",
              label: "Female"
            }
          ],
          "code",
          "label"
        ),
        ownerDOB: getDateField(
          "Date of Birth",
          "Enter Date of Birth",
          true,
          getPattern("Date"),
          "Licenses[0].tradeLicenseDetail.owners[0].dob",
          {}
        ),
        ownerEmail: getTextField(
          { labelName: "Email", labelKey: "TL_NEW_OWNER_DETAILS_EMAIL_LABEL" },
          {
            labelName: "Enter Email",
            labelKey: "TL_NEW_OWNER_DETAILS_EMAIL_PLACEHOLDER"
          },
          false,
          getPattern("Email"),
          "Licenses[0].tradeLicenseDetail.owners[0].dob.emailId"
        ),
        ownerPAN: getTextField(
          { labelName: "PAN No.", labelKey: "TL_NEW_OWNER_DETAILS_PAN_LABEL" },
          {
            labelName: "Enter Owner's PAN No.",
            labelKey: "TL_NEW_OWNER_DETAILS_PAN_PLACEHOLDER"
          },
          false,
          getPattern("PAN"),
          "Licenses[0].tradeLicenseDetail.owners[0].pan"
        ),
        ownerAddress: getTextField(
          {
            labelName: "Corrospondence Address",
            labelKey: "TL_NEW_OWNER_DETAILS_ADDR_LABEL"
          },
          {
            labelName: "Enter Corrospondence Address",
            labelKey: "TL_NEW_OWNER_DETAILS_ADDR_PLACEHOLDER"
          },
          true,
          getPattern("Address"),
          "Licenses[0].tradeLicenseDetail.owners[0].permanentAddress"
        ),
        OwnerSpecialCategory: getSelectTextField(
          "Special Owner Category",
          "Select Special Owner Category",
          true,
          "",
          "Licenses[0].tradeLicenseDetail.owners.subOwnerShipCategory",
          "applyScreenMdmsData.common-masters.OwnerType",
          [],
          "code",
          "code"
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
  ownershipSection:getCommonContainer({
    ownership: {...getSelectTextField(
      "Type of ownership",
      "Select Type of Ownership",
      false,
      "",
      "LicensesTemp[0].ownerType",
      "applyScreenMdmsData.common-masters.OwnerShipCategoryTransformed",
      [],
      "code",
      "code"
    ),
    beforeFieldChange: (action, state, dispatch) => {
      try {
        dispatch(
          pFO(
            "applyScreenMdmsData.common-masters.OwnerShipSubCategoryTransformed",

              get(
                state.screenConfiguration.preparedFinalObject,
                `applyScreenMdmsData.common-masters.OwnerShipCategory.${action.value}`,
                []
              )
            
          )
        );
      } catch (e) {
        console.log(e);
      }
    }
  },
    ownershipSubCategory: getSelectTextField(
      "Type of sub ownership",
      "Select Type of Sub Ownership",
      false,
      "",
      "Licenses[0].tradeLicenseDetail.owners[0].ownerType",
      "applyScreenMdmsData.common-masters.OwnerShipSubCategoryTransformed",
      [],
      "code",
      "code"
    )
  }),
  OwnerInfoCard
});
