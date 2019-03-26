import {
  getCommonCard,
  getCommonHeader,
  getCommonContainer,
  getCommonTitle
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { nocSummary } from "./summaryResource/nocSummary";
import { propertySummary } from "./summaryResource/propertySummary";
import { applicantSummary } from "./summaryResource/applicantSummary";
// import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";

const header = getCommonContainer({
  header: getCommonHeader({
    labelName: "Fire NOC - Application Summary",
    labelKey: "NOC_SUMMARY_HEADER"
  })
});

const screenConfig = {
  uiFramework: "material-ui",
  name: "summary",
  beforeInitScreen: (action, state, dispatch) => {
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
          nocSummary: nocSummary,
          propertySummary: propertySummary,
          applicantSummary: applicantSummary
        })
      }
    }
  }
};

export default screenConfig;
