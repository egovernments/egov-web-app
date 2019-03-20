import {
  getCommonContainer,
  getCommonHeader,
  getStepperObject
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { getCurrentFinancialYear } from "../utils";
import { footer } from "./applyResource/footer";
import { nocDetails } from "./applyResource/nocDetails";
import { propertyDetails } from "./applyResource/propertyDetails";
import { propertyLocationDetails } from "./applyResource/propertyLocationDetails";

export const stepsData = [
  { labelName: "NOC Details", labelKey: "NOC_COMMON_NOC_DETAILS" },
  { labelName: "Property Details", labelKey: "NOC_COMMON_PROPERTY_DETAILS" },
  { labelName: "Applicant Details", labelKey: "NOC_COMMON_APPLICANT_DETAILS" },
  { labelName: "Documents", labelKey: "NOC_COMMON_DOCUMENTS" }
];
export const stepper = getStepperObject(
  { props: { activeStep: 0 } },
  stepsData
);

export const header = getCommonContainer({
  header: getCommonHeader({
    labelName: `Apply for Fire NOC (${getCurrentFinancialYear()})`,
    labelKey: "NOC_COMMON_APPLY_NOC"
  })
  // applicationNumber: {
  //   uiFramework: "custom-atoms-local",
  //   moduleName: "egov-tradelicence",
  //   componentPath: "ApplicationNoContainer",
  //   props: {
  //     number: "NA"
  //   },
  //   visible: false
  // }
});

export const formwizardFirstStep = {
  uiFramework: "custom-atoms",
  componentPath: "Form",
  props: {
    id: "apply_form1"
  },
  children: {
    nocDetails,
    propertyDetails,
    propertyLocationDetails
  }
};

export const formwizardSecondStep = {
  uiFramework: "custom-atoms",
  componentPath: "Form",
  props: {
    id: "apply_form2"
  },
  // children: {
  //   tradeOwnerDetails
  // },
  visible: false
};

export const formwizardThirdStep = {
  uiFramework: "custom-atoms",
  componentPath: "Form",
  props: {
    id: "apply_form3"
  },
  // children: {
  //   tradeDocumentDetails
  // },
  visible: false
};

export const formwizardFourthStep = {
  uiFramework: "custom-atoms",
  componentPath: "Form",
  props: {
    id: "apply_form4"
  },
  // children: {
  //   tradeReviewDetails
  // },
  visible: false
};

const screenConfig = {
  uiFramework: "material-ui",
  name: "apply",
  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      props: {
        className: "common-div-css"
      },
      children: {
        headerDiv: {
          uiFramework: "custom-atoms",
          componentPath: "Container",
          children: {
            header: {
              gridDefination: {
                xs: 12,
                sm: 10
              },
              ...header
            }
          }
        },
        stepper,
        formwizardFirstStep,
        footer
      }
    }
  }
};

export default screenConfig;
