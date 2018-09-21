import {
  getCommonHeader,
  getCommonContainer
} from "mihy-ui-framework/ui-config/screens/specs/utils";
import { footer } from "./acknowledgementResource/paymentSuccessFooter";
import getAcknowledgementCard from "./acknowledgementResource/acknowledgementUtils";

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
  name: "acknowledgement",
  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      props: {
        className: "common-div-css"
      },
      children: {
        header,
        paymentSuccessCard: {
          uiFramework: "custom-atoms",
          componentPath: "Div",
          children: {
            card: getAcknowledgementCard("pay", "success", "5343")
          }
        },
        footer
      }
    }
  }
};

export default screenConfig;
