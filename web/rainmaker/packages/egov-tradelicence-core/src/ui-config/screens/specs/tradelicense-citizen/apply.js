import { prepareFinalObject } from "mihy-ui-framework/ui-redux/screen-configuration/actions";
import { updatePFOforSearchResults } from "../../../../ui-utils/commons";
import { footer } from "../tradelicence/applyResource/footer";

import {
  header,
  tradeDocumentDetails,
  stepsData,
  formwizardFirstStep,
  formwizardSecondStep,
  formwizardThirdStep,
  formwizardFourthStep,
  stepper,
  queryValue,
  getMdmsData
} from "../tradelicence/apply";

const screenConfig = {
  uiFramework: "material-ui",
  name: "apply",
  beforeInitScreen: (action, state, dispatch) => {
    if (queryValue) {
      updatePFOforSearchResults(action, state, dispatch, queryValue);
    }
    getMdmsData(action, state, dispatch);
    return action;
  },
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
        formwizardSecondStep,
        formwizardThirdStep,
        formwizardFourthStep,
        footer
      }
    }
  }
};

export default screenConfig;
