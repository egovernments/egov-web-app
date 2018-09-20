import { getCommonHeader } from "mihy-ui-framework/ui-config/screens/specs/utils";
import { footer } from "./acknowledgementResource/applicationSuccessFooter";
import getAcknowledgementCard from "./acknowledgementResource/acknowledgementUtils";

const header = getCommonHeader("Application for New Trade License (2018-2019)");

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
        applicationSuccessCard: {
          uiFramework: "custom-atoms",
          componentPath: "Div",
          children: {
            card: getAcknowledgementCard("apply", "success", "12345")
          }
        },
        footer
      }
    }
  }
};

export default screenConfig;
