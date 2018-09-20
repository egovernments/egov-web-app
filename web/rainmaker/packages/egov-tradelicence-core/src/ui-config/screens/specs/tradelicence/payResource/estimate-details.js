import {
  getCommonCard,
  getCommonGrayCard,
  getCommonTitle,
  getCommonSubHeader,
  getCommonParagraph,
  getTextField,
  getSelectTextField,
  getCommonContainer,
  getPattern
} from "mihy-ui-framework/ui-config/screens/specs/utils";

import {
  getTooltip
} from "../../utils";


const estimate = getCommonGrayCard({estimateSection:{
  uiFramework: "custom-molecules",
  componentPath: "FeesEstimateCard",
  props: {
    estimate: {
      header: "Trade License Fee",
      fees: [
        { name: "Trade License Charge" },
        { name: "Penalty", value: 500, info: "Information about Penalty" },
        { name: "Rebate", value: 200, info: "Information about Rebate" }
      ],
      extra: [
        { textLeft: "Last Date for Rebate (20% of TL)" },
        {
          textLeft: "Penalty (10% of TL) applicable from"
        },
        { textLeft: "Additoinal Penalty (20% of TL) applicable from" }
      ]
    }
  }
}})

export default estimate;
