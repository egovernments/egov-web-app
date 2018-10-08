import {
  getCommonGrayCard,
  getCommonSubHeader,
  getCommonContainer,
  getDivider,
  getLabelWithValue,
  getLabel
} from "mihy-ui-framework/ui-config/screens/specs/utils";

import { changeStep } from "./footer";

export const getReviewOwner = (isEditable = true) => {
  

return getCommonGrayCard({
  header:getCommonSubHeader({
    labelName: "Owner Details",
    labelKey: "TL_COMMON_OWN_DETAILS"
  }),
  multiOwner:{
    uiFramework: "custom-containers",
    componentPath: "MultiItem",
    props: {
      scheama: getCommonGrayCard({
        headerDiv: {
          uiFramework: "custom-atoms",
          componentPath: "Container",
          children: {
           
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
                  changeStep(state, dispatch, "", 1);
                }
              }
            }
          }
        },
        viewFive: getCommonContainer({
          reviewOwnerName: getLabelWithValue(
            {
              labelName: "Name",
              labelKey: "TL_NEW_OWNER_DETAILS_NAME_LABEL"
            },
            { jsonPath: "Licenses[0].tradeLicenseDetail.owners[0].name" }
          ),
          reviewOwnerFatherName: getLabelWithValue(
            {
              labelName: "Father/Husband's Name",
              labelKey: "TL_NEW_OWNER_DETAILS_FATHER_NAME_LABEL"
            },
            {
              jsonPath:
                "Licenses[0].tradeLicenseDetail.owners[0].fatherOrHusbandName"
            }
          ),
          reviewOwnerGender: getLabelWithValue(
            {
              labelName: "Gender",
              labelKey: "TL_NEW_OWNER_DETAILS_GENDER_LABEL"
            },
    
            { jsonPath: "Licenses[0].tradeLicenseDetail.owners[0].gender" }
          ),
          reviewOwnerAge: getLabelWithValue(
            {
              labelName: "Age",
              labelKey: "TL_EMP_APPLICATION_AGE"
            },
            { jsonPath: "Licenses[0].tradeLicenseDetail.owners[0].dob" }
          ),
          reviewOwnerPhoneNo: getLabelWithValue(
            {
              labelName: "Mobile No.",
              labelKey: "TL_NEW_OWNER_DETAILS_MOB_NO_LABEL"
            },
            { jsonPath: "Licenses[0].tradeLicenseDetail.owners[0].mobileNumber" }
          ),
          reviewOwnerEmail: getLabelWithValue(
            {
              labelName: "Email",
              labelKey: "TL_NEW_OWNER_DETAILS_EMAIL_LABEL"
            },
            { jsonPath: "Licenses[0].tradeLicenseDetail.owners[0].dob.emailId" }
          ),
          reviewOwnerPAN: getLabelWithValue(
            {
              labelName: "PAN No.",
              labelKey: "TL_NEW_OWNER_DETAILS_PAN_LABEL"
            },
            { jsonPath: "Licenses[0].tradeLicenseDetail.owners[0].pan" }
          ),
          reviewOwnerAddr: getLabelWithValue(
            {
              labelName: "Corrospondence Address",
              labelKey: "TL_NEW_OWNER_DETAILS_ADDR_LABEL"
            },
            {
              jsonPath: "Licenses[0].tradeLicenseDetail.owners[0].permanentAddress"
            }
          ),
          reviewOwnerSpecialCat: getLabelWithValue(
            {
              labelName: "Special Owner Category",
              labelKey: "TL_NEW_OWNER_DETAILS_SPL_OWN_CAT_LABEL"
            },
            {
              jsonPath: "Licenses[0].tradeLicenseDetail.owners[0].subOwnerShipCategory"
            }
          )
        })
      }),
  
      items: [],
      hasAddItem:false,
      sourceJsonPath: "Licenses[0].tradeLicenseDetail.owners",
      prefixSourceJsonPath:
        "children.cardContent.children.viewFive.children"
    },
    type: "array"
  }
});
};
