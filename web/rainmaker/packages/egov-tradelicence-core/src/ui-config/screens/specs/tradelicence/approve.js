import {
  getCommonHeader,
  getCommonCard,
  getCommonSubHeader,
  getCommonParagraph,
  getBreak,
  getTextField,
  getRadioButtonGroup,
  getCheckBoxwithLabel
} from "mihy-ui-framework/ui-config/screens/specs/utils";

import { getRadioGroupWithLabel, getUploadFile } from "../utils";

import { footerApprove } from "./applyResource/footer";

const radioButtonLabels = ["Yes", "No", "Not Applicable"];

const header = getCommonHeader("Trade License Application (2018-2019)");

const tradeDetails = getCommonCard({
  headerOne: getCommonSubHeader(
    "Please Review the Application and Proceed with Approval"
  ),
  breakOne: getBreak(),
  paragraphOne: getCommonParagraph(
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard Lorem Ipsum has been the industry's standard."
  ),
  breakTwo: getBreak(),
  headerTwo: getCommonSubHeader("Approve Checklist"),
  // safetyNorms: getRadioGroupWithLabel(
  //   "Are Safety Norms Satisfactory?",
  //   radioButtonLabels
  // ),

  safetyNorms: getRadioButtonGroup(radioButtonLabels),

  // hygieneMeasure: getRadioGroupWithLabel(
  //   "Are Hygiene Levels Satisfactory?",
  //   radioButtonLabels
  // ),

  // localityMeasure: getRadioGroupWithLabel(
  //   "Is Locality harmed/disturbed by this trade?",
  //   radioButtonLabels
  // ),

  tradeDetailsContainer: getTextField(
    "Comments",
    "Enter Approval Comments",
    false,
    ""
  ),
  //uploadFile: getUploadFile(),
  checkBoxContainer: getCheckBoxwithLabel(
    "All information in the application are true upto best of my knowledge"
  )
});

const screenConfig = {
  uiFramework: "material-ui",
  name: "mihytradeliceceapply",
  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      props: {
        className: "common-div-css"
      },
      children: {
        header,
        approveForm: {
          uiFramework: "custom-atoms",
          componentPath: "Div",
          children: {
            tradeDetails
          }
        },
        footerApprove
      }
    }
  }
};

export default screenConfig;
