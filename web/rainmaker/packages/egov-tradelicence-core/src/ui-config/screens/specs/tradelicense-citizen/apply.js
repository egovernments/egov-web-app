import {
  prepareFinalObject,
  handleScreenConfigurationFieldChange
} from "mihy-ui-framework/ui-redux/screen-configuration/actions";
import { updatePFOforSearchResults } from "../../../../ui-utils/commons";
import { footer } from "../tradelicence/applyResource/footer";
import { getQueryArg } from "mihy-ui-framework/ui-utils/commons";
import get from "lodash/get";
import {
  header,
  tradeDocumentDetails,
  stepsData,
  formwizardFirstStep,
  formwizardSecondStep,
  formwizardThirdStep,
  formwizardFourthStep,
  stepper,
  // queryValue,
  getMdmsData
} from "../tradelicence/apply";
import { getAllDataFromBillingSlab } from "../utils";

const screenConfig = {
  uiFramework: "material-ui",
  name: "apply",
  beforeInitScreen: (action, state, dispatch) => {
    const queryValue = getQueryArg(window.location.href, "applicationNumber");
    const tenantId = getQueryArg(window.location.href, "tenantId");
    if (queryValue) {
      updatePFOforSearchResults(
        action,
        state,
        dispatch,
        queryValue,
        "",
        tenantId
      );
    }
    getMdmsData(action, state, dispatch);
    getAllDataFromBillingSlab(tenantId, dispatch);
    return action;
  },
  // afterInitScreen: (action, state, dispatch) => {
  //   const tenantId = getQueryArg(window.location.href, "tenantId");
  //   dispatch(
  //     handleScreenConfigurationFieldChange(
  //       "apply",
  //       "components.div.children.formwizardFirstStep.children.tradeLocationDetails.children.cardContent.children.tradeDetailsConatiner.children.tradeLocCity",
  //       "props.value",
  //       tenantId
  //     )
  //   );
  // },
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
