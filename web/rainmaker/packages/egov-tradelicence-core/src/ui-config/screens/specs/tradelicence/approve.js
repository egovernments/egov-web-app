import {
  getCommonCard,
  getCommonContainer,
  getCommonParagraph,
  getCommonSubHeader,
  getBreak,
  getCommonContainer
} from "mihy-ui-framework/ui-config/screens/specs/utils";

import { getQueryArg } from "mihy-ui-framework/ui-utils/commons";

import {
  getRadioGroupWithLabel,
  getApprovalTextField,
  getSubHeaderLabel,
  getCommonHeader,
  getCheckbox
} from "../utils";

import { footerApprove } from "./applyResource/footer";

const radioButtonLabels = ["Yes", "No", "Not Applicable"];
const queryValue = getQueryArg(window.location.href, "purpose");
const header = getCommonContainer({
  header: getCommonHeader("Trade License Application (2018-2019)"),
  applicationNumber: {
    uiFramework: "custom-atoms-local",
    componentPath: "ApplicationNoContainer",
    props: {
      number: 5434
    }
  }
});

const tradeDetails = getCommonCard({
  headerOne:
    queryValue === "cancel"
      ? getCommonSubHeader("Please provide Cancellation remarks")
      : getCommonSubHeader(
          "Please provide the following details on the basis of your field verification"
        ),
  paragraphOne: getCommonParagraph(
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard Lorem Ipsum has been the industry's standard."
  ),
  breakTwo: getBreak(),
  headerTwo: {
    uiFramework: "custom-atoms",
    componentPath: "Div",
    children: {
      div1: getSubHeaderLabel()
    },
    props: {
      style: {
        marginBottom: "10px"
      }
    }
  },

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

  tradeDetailsContainer: {
    uiFramework: "custom-atoms",
    componentPath: "Div",
    children: {
      div1: getApprovalTextField()
    },
    props: {
      style: {
        marginTop: "20px"
      }
    }
  },

  checkBoxContainer: getCheckbox(
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
