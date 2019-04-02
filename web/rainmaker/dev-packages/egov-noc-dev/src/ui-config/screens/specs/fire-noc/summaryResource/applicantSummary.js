import {
  getBreak,
  getCommonContainer,
  getCommonGrayCard,
  getCommonSubHeader,
  getLabel,
  getLabelWithValue
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { setRoute } from "egov-ui-framework/ui-redux/app/actions";

export const applicantSummary = getCommonGrayCard({
  header: {
    uiFramework: "custom-atoms",
    componentPath: "Container",
    props: {
      style: { marginBottom: "10px" }
    },
    children: {
      header: {
        gridDefination: {
          xs: 12,
          sm: 10
        },
        ...getCommonSubHeader({
          labelName: "Applicant Details",
          labelKey: "NOC_APPLICANT_DETAILS_HEADER"
        })
      },
      editSection: {
        componentPath: "Button",
        props: {
          color: "primary",
          style: {
            marginTop: "-10px",
            marginRight: "-18px"
          }
        },
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
            labelKey: "NOC_SUMMARY_EDIT"
          })
        },
        onClickDefination: {
          action: "condition"
          // callBack: (state, dispatch) => {
          //   changeStep(state, dispatch, "", 0);
          // }
        }
      }
    }
  },
  body: getCommonContainer({
    mobileNo: getLabelWithValue(
      {
        labelName: "Mobile No.",
        labelKey: "NOC_MOBILE_NO_LABEL"
      },
      {
        jsonPath: "mobileNo"
        // callBack: value => {
        //   return value.split(".")[0];
        // }
      }
    ),
    applicantName: getLabelWithValue(
      {
        labelName: "Name",
        labelKey: "NOC_APPLICANT_NAME_LABEL"
      },
      {
        jsonPath: "applicantName"
        // callBack: value => {
        //   return value.split(".")[1];
        // }
      }
    ),
    applicantGender: getLabelWithValue(
      {
        labelName: "Gender",
        labelKey: "NOC_APPLICANT_GENDER_LABEL"
      },
      { jsonPath: "applicantGender" }
    ),
    fatherHusbandName: getLabelWithValue(
      {
        labelName: "Father/Husband's Name",
        labelKey: "NOC_FATHER_HUSBAND_NAME_LABEL"
      },
      { jsonPath: "fatherHusbandName" }
    ),
    applicantDob: getLabelWithValue(
      {
        labelName: "Date of Birth",
        labelKey: "NOC_APPLICANT_DOB_LABEL"
      },
      { jsonPath: "applicantDob" }
    ),
    applicantEmail: getLabelWithValue(
      {
        labelName: "Email",
        labelKey: "NOC_APPLICANT_EMAIL_LABEL"
      },
      { jsonPath: "applicantEmail" }
    ),
    applicantPan: getLabelWithValue(
      {
        labelName: "PAN",
        labelKey: "NOC_APPLICANT_PAN_LABEL"
      },
      { jsonPath: "applicantPan" }
    ),
    applicantAddress: getLabelWithValue(
      {
        labelName: "Correspondence Address",
        labelKey: "NOC_APPLICANT_CORRESPONDENCE_ADDRESS_LABEL"
      },
      { jsonPath: "applicantAddress" }
    )
  })
});