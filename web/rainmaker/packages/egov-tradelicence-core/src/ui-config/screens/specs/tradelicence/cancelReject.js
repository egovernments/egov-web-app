import {
  getCommonHeader,
  getCommonContainer,
  getLabel
} from "mihy-ui-framework/ui-config/screens/specs/utils";
import { footer } from "./acknowledgementResource/approvalSuccessFooter";
import getAcknowledgementCard from "./acknowledgementResource/acknowledgementUtils";

import { getQueryArg } from "mihy-ui-framework/ui-utils/commons";

const purpose = getQueryArg(window.location.href, "purpose");
const status = getQueryArg(window.location.href, "status");
const number = getQueryArg(window.location.href, "number");

const header = getCommonContainer({
  headerText: getCommonHeader("Trade License Application (2018-2019)"),
  label: {
    uiFramework: "material-ui",
    componentPath: "Typography",
    props: {
      variant: "headline"
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
        approvalSuccessCard: {
          uiFramework: "custom-atoms",
          componentPath: "Div",
          children: {
            card: getAcknowledgementCard(purpose, status, number)
          }
        },
        footer
      }
    }
  }
};

export default screenConfig;
