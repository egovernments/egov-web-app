import {
  getCommonGrayCard,
  getCommonSubHeader,
  getCommonContainer,
  getLabelWithValue,
  getLabel
} from "mihy-ui-framework/ui-config/screens/specs/utils";

import { changeStep } from "./footer";

export const getReviewOwner = (isEditable = true) => {
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
          ...getCommonSubHeader("Owner Details")
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
              changeStep(state, dispatch, "", 1);
            }
          }
        }
      }
    },
    viewFive: getCommonContainer({
      reviewOwnerName: getLabelWithValue("Name", "Satinder Singh"),
      reviewOwnerFatherName: getLabelWithValue(
        "Father/Husband's Name",
        "Jaswindar Singh"
      ),
      reviewOwnerGender: getLabelWithValue("Gender", "Male"),
      reviewOwnerAge: getLabelWithValue("Age", "45"),
      reviewOwnerPhoneNo: getLabelWithValue("Phone No.", "9999999999"),
      reviewOwnerEmail: getLabelWithValue("Email", "satinder@gmail.com"),
      reviewOwnerPAN: getLabelWithValue("PAN No.", "BUFAS1234H"),
      reviewOwnerAddr: getLabelWithValue(
        "Corrospondance Address",
        "707/B, railway Colony, Vikarnagar, Amritsar"
      ),
      reviewOwnerSpecialCat: getLabelWithValue("Special Category", "None")
    })
  });
};
