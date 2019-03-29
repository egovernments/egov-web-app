import {
  getCommonCard,
  getCommonHeader,
  getCommonContainer,
  getCommonSubHeader
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { estimateSummary } from "./summaryResource/estimateSummary";
import { nocSummary } from "./summaryResource/nocSummary";
import { propertySummary } from "./summaryResource/propertySummary";
import { applicantSummary } from "./summaryResource/applicantSummary";
import { documentsSummary } from "./summaryResource/documentsSummary";
import { footer } from "./summaryResource/footer";
import { taskStatus } from "./taskDetailsResource/taskStatus";
// import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";

const titlebar = getCommonContainer({
  header: getCommonHeader({
    labelName: "Task Detials",
    labelKey: "NOC_TASK_DETAILS_HEADER"
  })
});

const screenConfig = {
  uiFramework: "material-ui",
  name: "summary",
  beforeInitScreen: action => {
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
              ...titlebar
            }
          }
        },
        taskStatus: taskStatus,
        body: getCommonCard({
          estimateSummary: estimateSummary,
          nocSummary: nocSummary,
          propertySummary: propertySummary,
          applicantSummary: applicantSummary,
          documentsSummary: documentsSummary
        }),
        footer: footer
      }
    }
  }
};

export default screenConfig;
