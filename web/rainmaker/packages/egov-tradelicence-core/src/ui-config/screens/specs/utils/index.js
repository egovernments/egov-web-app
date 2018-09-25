import {
  getLabel,
  getTextField,
  getCommonSubHeader
} from "mihy-ui-framework/ui-config/screens/specs/utils";
import "./index.css";

import { getQueryArg } from "mihy-ui-framework/ui-utils/commons";

const queryValue = getQueryArg(window.location.href, "purpose");

export const getTooltip = (children, toolTipProps) => {
  return {
    uiFramework: "custom-atoms",
    componentPath: "Div",
    children: {
      label: children,
      toolTip: {
        componentPath: "Tooltip",
        props: { ...toolTipProps },
        children: {
          uiFramework: "custom-atoms",
          componentPath: "Icon",
          props: {
            iconName: "info"
          }
        }
      }
    }
  };
};

export const getCheckbox = (content, props = {}) => {
  return {
    uiFramework: "custom-atoms-local",
    componentPath: "Checkbox",
    props: {
      content,
      ...props
    }
  };
};

export const getUploadFile = {
  uiFramework: "custom-molecules",
  componentPath: "DocumentList",
  props: {
    documents: [
      {
        name: "Upload Document"
      }
    ]
  }
};

export const getUploadFilesMultiple = () => {
  return {
    uiFramework: "custom-molecules-local",
    componentPath: "UploadMultipleFiles",
    props: {}
  };
};

export const getRadioButtonGroup = buttons => {
  return {
    uiFramework: "custom-molecules-local",
    componentPath: "RadioButtonsGroup",
    props: {
      buttons
    }
  };
};
export const getRadioGroupWithLabel = (label, buttons) => {
  return {
    uiFramework: "custom-atoms",
    componentPath: "Container",
    props: {
      alignItems: "center"
    },

    children: {
      div1: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        gridDefination: {
          xs: 12,
          sm: 4
        },
        children: {
          div: getLabel(label, {
            style: {
              fontSize: "14px"
            }
          })
        }
      },
      div2: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        gridDefination: {
          xs: 12,
          sm: 8
        },
        children: {
          div: getRadioButtonGroup(buttons)
        }
      }
    }
  };
};

export const getApplicationNoContainer = number => {
  return {
    uiFramework: "custom-atoms-local",
    componentPath: "ApplicationNoContainer",
    props: {
      number
    }
  };
};

export const getContainerWithElement = (children, props = {}) => {
  return {
    uiFramework: "custom-atoms",
    componentPath: "Div",
    children,
    props: {
      ...props
    }
  };
};

export const getCommonHeader = (header, props) => {
  return {
    componentPath: "Typography",
    props: {
      variant: "headline",
      ...props
    },
    children: {
      [header]: getLabel(header)
    }
  };
};

export const getApprovalTextField = () => {
  if (queryValue === "reject") {
    return getTextField("Comments", "Enter rejection Comments", false, "");
  } else if (queryValue === "cancel") {
    return getTextField("Comments", "Enter Cancellation Comments", false, "");
  } else {
    return getTextField("Comments", "Enter Approval Comments", false, "");
  }
};

export const getSubHeaderLabel = () => {
  if (queryValue === "reject") {
    return getCommonSubHeader("Rejection CheckList");
  } else if (queryValue === "cancel") {
    return {};
  } else {
    return getCommonSubHeader("Approve Checklist");
  }
};

export const getFooterButtons = () => {
  if (queryValue === "reject") {
    return getLabel("REJECT APPLICATION");
  } else if (queryValue === "cancel") {
    return getLabel("CANCEL TRADE LICENSE");
  } else {
    return getLabel("APPROVE APPLICATION");
  }
};
export const getFeesEstimateCard = (header, fees, extra) => {
  return {
    uiFramework: "custom-molecules",
    componentPath: "FeesEstimateCard",
    props: {
      estimate: {
        header,
        fees,
        extra
      }
    }
  };
};

const style = {
  textfieldIcon: {
    position: "relative",
    top: "25px",
    left: "-249%"
  },
  headerIcon: {
    position: "relative",
    bottom: "2px"
  }
};

export const getIconStyle = key => {
  return style[key];
};
