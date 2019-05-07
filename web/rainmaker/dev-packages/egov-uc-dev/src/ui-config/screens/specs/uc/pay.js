import {
  getCommonCard,
  getCommonHeader,
  getCommonContainer
  //getCommonTitle
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { estimateSummary } from "./payResource/estimateSummary";
import { capturePayment } from "./payResource/capturePayment";
import { G8ReceiptDetails } from "./payResource/G8ReceiptDetails";
// import { applicantSummary } from "./summaryResource/applicantSummary";
// import { documentsSummary } from "./summaryResource/documentsSummary";
import { footer } from "./payResource/footer";
// import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";

const header = getCommonContainer({
  header: getCommonHeader({
    labelName: "New universal Collection",
    labelKey: "UC_PAY_HEADER"
  })
});

const screenConfig = {
  uiFramework: "material-ui",
  name: "pay",
  beforeInitScreen: (action, state, dispatch) => {
    const applicationNumber = getQueryArg(
      window.location.href,
      "applicationNumber"
    );
    // if (applicationNumber)
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
        body: getCommonCard({
          estimateSummary: estimateSummary,
          capturePayment: capturePayment,
          G8ReceiptDetails: G8ReceiptDetails
          //   applicantSummary: applicantSummary,
          //   documentsSummary: documentsSummary
        }),
        footer: footer
      }
    }
  }
};

export default screenConfig;
