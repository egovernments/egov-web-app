import {
  getCommonContainer,
  getCommonHeader,
  getCommonCard,
  getCommonTitle,
  getCommonParagraph
} from "mihy-ui-framework/ui-config/screens/specs/utils";

import { footer } from "./payResource/footer";
import estimateDetails from "./payResource/estimate-details";
import g8Details from "./payResource/g8-details";
import capturePaymentDetails from "./payResource/capture-payment-details";
import { adhocPopup } from "./applyResource/adhocPopup";
import { getQueryArg } from "mihy-ui-framework/ui-utils/commons";

const header = getCommonContainer({
  header: getCommonHeader("Payment for New Trade License (2018-2019)"),
  applicationNumber: {
    uiFramework: "custom-atoms-local",
    componentPath: "ApplicationNoContainer",
    props: {
      number: 5434
    }
  }
});

const screenConfig = {
  uiFramework: "material-ui",
  name: "pay",
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
                xs: "12",
                sm: "10"
              },
              ...header
            }
          }
        },
        formwizardFirstStep: {
          uiFramework: "custom-atoms",
          componentPath: "Div",
          children: {
            paymentDetails: getCommonCard({
              header: getCommonTitle(
                "Review your estimated fees and enter the payment collection details"
              ),
              paragraph: getCommonParagraph(
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard Lorem Ipsum has been the industry's standard."
              ),
              estimateDetails,
              capturePaymentDetails,
              g8Details
            })
          }
        },
        footer
      }
    },
    adhocDialog: {
      componentPath: "Dialog",
      props: {
        open: getQueryArg(window.location.href, "show-dialog") === "true" ? true : false
      },
      children: {
        dialogContent: {
          componentPath: "DialogContent",
          children: {
            popup: adhocPopup
          }
        }
      }
    }
  }
};

export default screenConfig;
