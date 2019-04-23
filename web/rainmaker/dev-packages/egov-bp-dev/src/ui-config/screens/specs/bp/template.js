import {
  getCommonHeader,
  getBreak,
  getCommonTitle,
  getCommonParagraph,
  getCommonContainer
} from "egov-ui-framework/ui-config/screens/specs/utils";

import {
  getCommonGrayCard,
  getLabelOnlyValue
} from "../utils";

const header = getCommonHeader({
  labelName: "Boiler-plate app template",
  labelKey: "BP_TEMP_HEADER"
});

const notes = getCommonGrayCard({
  subHeader: getCommonTitle({
    labelName: "Note",
    labelKey: "BP_TEMP_HEADING"
  }),
  break1: getBreak(),
  docs: getCommonContainer({
    pan: getLabelOnlyValue({
      labelName: "1 Citizen and employee dependent app",
      labelKey: "BP_FIRSTPOINT_HEADING"
    }),
    pan2: getLabelOnlyValue({
      labelName: "2 Costumize your app accordindly by copy pasting this app",
      labelKey: "BP_SECONDPOINT_HEADING"
    }),
  }),
  subParagraph: getCommonParagraph({
    labelName:
      "This boiler-plate made to ease creation of an app everytime a new module comes up ",
    labelKey: "NOC_LINE_NOTE"
  })
});

export const templateDetails = getCommonContainer(
  {
    headerDiv: {
      uiFramework: "custom-atoms",
      componentPath: "Container",

      children: {
        header: {
          gridDefination: {
            xs: 12
          },
          ...header
        }
      }
    },
    lowerDiv: {
      uiFramework: "custom-atoms",
      componentPath: "Container",

      children: {
        notes,
      }
    }
  },
  {
    style: {
      paddingBottom: 75
    }
  }
);

export default templateDetails;
