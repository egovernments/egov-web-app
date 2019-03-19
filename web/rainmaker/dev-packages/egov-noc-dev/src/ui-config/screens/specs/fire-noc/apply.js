import {
  getStepperObject,
  getCommonHeader,
  getCommonCard,
  getCommonContainer,
  getCommonTitle,
  getCommonParagraph
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { footer } from "./applyResource/footer";

import get from "lodash/get";
import set from "lodash/set";

import {
  commonTransform,
  objectToDropdown,
  getCurrentFinancialYear,
  getAllDataFromBillingSlab
} from "../utils";
import {
  prepareFinalObject,
  handleScreenConfigurationFieldChange as handleField
} from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import { httpRequest } from "../../../../ui-utils";
import {
  updatePFOforSearchResults,
  getBoundaryData
} from "../../../../ui-utils/commons";
import { getTenantId } from "egov-ui-kit/utils/localStorageUtils";
import { nocDetails } from "./applyResource/nocDetails";

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
    nocDetails
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
