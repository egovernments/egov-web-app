import { prepareFinalObject } from "mihy-ui-framework/ui-redux/screen-configuration/actions";
import {
  updatePFOforSearchResults,
  getBoundaryData
} from "../../../../ui-utils/commons";
import { footer } from "../tradelicence/applyResource/footer";
import { getQueryArg } from "mihy-ui-framework/ui-utils/commons";
import {
  header,
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
    getBoundaryData(action, state, dispatch, [
      { key: "tenantId", value: tenantId }
    ]);
    dispatch(
      prepareFinalObject(
        "Licenses[0].tradeLicenseDetail.address.tenantId",
        tenantId
      )
    );
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
    },
    breakUpDialog: {
      uiFramework: "custom-containers-local",
      componentPath: "ViewBreakupContainer",
      props: {
        open: false,
        maxWidth: "md",
        screenKey: "apply"
      }
    }
  }
};

export default screenConfig;
