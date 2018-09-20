import {
  // getCommonHeader,
  getCommonCard,
  getCommonSubHeader,
  getCommonParagraph,
  getBreak,
  getCheckBoxwithLabel
} from "mihy-ui-framework/ui-config/screens/specs/utils";

import { getQueryArg } from "mihy-ui-framework/ui-utils/commons";

import {
  getRadioGroupWithLabel,
  getApplicationNoContainer,
  getApprovalTextField,
  getSubHeaderLabel,
  getCommonHeader
} from "../utils";

import { footerApprove } from "./applyResource/footer";

const radioButtonLabels = ["Yes", "No", "Not Applicable"];
const queryValue = getQueryArg(window.location.href, "purpose");
const applicationNo = getApplicationNoContainer(5467);
const header = getCommonHeader(
  "Trade License Application (2018-2019)",
  {},
  true
);

const tradeDetails = getCommonCard({
  headerOne:
    queryValue === "cancel"
      ? getCommonSubHeader("Please provide Cancellation remarks")
      : getCommonSubHeader(
          "Please provide the following details on the basis of your field verification"
        ),
  breakOne: getBreak(),
  paragraphOne: getCommonParagraph(
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard Lorem Ipsum has been the industry's standard."
  ),
  breakTwo: getBreak(),
  headerTwo: getSubHeaderLabel(),
  safetyNorms:
    queryValue === "cancel"
      ? {}
      : getRadioGroupWithLabel(
          "Are Safety Norms Satisfactory?",
          radioButtonLabels
        ),

  hygieneMeasure:
    queryValue === "cancel"
      ? {}
      : getRadioGroupWithLabel(
          "Are Hygiene Levels Satisfactory?",
          radioButtonLabels
        ),

  localityMeasure:
    queryValue === "cancel"
      ? {}
      : getRadioGroupWithLabel(
          "Is Locality harmed/disturbed by this trade?",
          radioButtonLabels
        ),

  tradeDetailsContainer: getApprovalTextField(),

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
