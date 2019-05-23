import {
  getCommonCard,
  getCommonHeader,
  getCommonContainer
} from "egov-ui-framework/ui-config/screens/specs/utils";

import { billDetails } from "./payResource/billDetails";
import { amountToBePaid } from "./payResource/amount";
import { capturePayment } from "./payResource/capturePayment";
import { G8ReceiptDetails } from "./payResource/G8ReceiptDetails";
import { footer } from "./payResource/footer";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";

const header = getCommonContainer({
  header: getCommonHeader({
    labelName: "Universal Bill",
    labelKey: "ABG_UNIVERSAL_BILL_COMMON_HEADER"
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
          billDetails: billDetails,
          // amount: amountToBePaid,
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
