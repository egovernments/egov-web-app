import { getCommonHeader } from "mihy-ui-framework/ui-config/screens/specs/utils";
import { footer } from "./acknowledgementResource/approvalSuccessFooter";
import getAcknowledgementCard from "./acknowledgementResource/acknowledgementUtils";

const header = getCommonHeader("Trade License Application (2018-2019)");

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
        approvalSuccessCard: {
          uiFramework: "custom-atoms",
          componentPath: "Div",
          children: {
            card: getAcknowledgementCard("approve", "success", "5343")
          }
        },
        footer
      }
    }
  }
};

export default screenConfig;
