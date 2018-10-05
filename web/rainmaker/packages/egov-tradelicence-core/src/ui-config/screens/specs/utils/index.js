import {
  getLabel,
  getTextField,
  getCommonSubHeader
} from "mihy-ui-framework/ui-config/screens/specs/utils";
import "./index.css";

import { getQueryArg } from "mihy-ui-framework/ui-utils/commons";
import { handleScreenConfigurationFieldChange as handleField } from "mihy-ui-framework/ui-redux/screen-configuration/actions";
import get from "lodash/get";
import set from "lodash/set";
import { httpRequest } from "../../../../ui-utils/api";

const queryValue = getQueryArg(window.location.href, "purpose");

export const getCommonApplyFooter = children => {
  return {
    uiFramework: "custom-atoms",
    componentPath: "Div",
    props: {
      className: "apply-wizard-footer"
    },
    children
  };
};

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

export const getCheckbox = (content, jsonPath, props = {}) => {
  return {
    uiFramework: "custom-containers-local",
    componentPath: "CheckboxContainer",
    props: {
      content,
      jsonPath,
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

export const getUploadFilesMultiple = jsonPath => {
  return {
    uiFramework: "custom-molecules-local",
    componentPath: "UploadMultipleFiles",
    props: {
      maxFiles: 4,
      jsonPath: jsonPath,
      inputProps: {
        accept: "image/*, .pdf, .png, .jpeg"
      },
      buttonLabel: "UPLOAD FILES",
      maxFileSize: 5000
    }
  };
};

export const getRadioButtonGroup = (buttons, jsonPath) => {
  return {
    uiFramework: "custom-containers-local",
    componentPath: "RadioGroupContainer",
    props: {
      buttons,
      jsonPath
    }
  };
};
export const getRadioGroupWithLabel = (label, labelKey, buttons, jsonPath) => {
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
          div: getLabel({
            labelName: label,
            labelKey,

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
          div: getRadioButtonGroup(buttons, jsonPath)
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

export const getContainerWithElement = ({
  children,
  props = {},
  gridDefination = {}
}) => {
  return {
    uiFramework: "custom-atoms",
    componentPath: "Div",
    children,
    gridDefination,
    props: {
      ...props
    }
  };
};

export const transformById = (payload, id) => {
  return (
    payload &&
    payload.reduce((result, item) => {
      result[item[id]] = {
        ...item
      };

      return result;
    }, {})
  );
};

export const getTranslatedLabel = (labelKey, localizationLabels) => {
  let translatedLabel = null;
  if (localizationLabels && localizationLabels.hasOwnProperty(labelKey)) {
    translatedLabel = localizationLabels[labelKey];
    if (
      translatedLabel &&
      typeof translatedLabel === "object" &&
      translatedLabel.hasOwnProperty("message")
    )
      translatedLabel = translatedLabel.message;
  }
  return translatedLabel || labelKey;
};

export const getApprovalTextField = () => {
  if (queryValue === "reject") {
    return getTextField({
      label: {
        labelName: "Comments",
        labelKey: "TL_APPROVAL_CHECKLIST_COMMENTS_LABEL"
      },
      placeholder: {
        labelName: "Enter Rejection Comments",
        labelKey: "TL_REJECTION_CHECKLIST_COMMENTS_PLACEHOLDER"
      },
      required: false,
      pattern: "",
      jsonPath: "Licenses[0].tradeLicenseDetail.additionalDetail.comments"
    });
  } else if (queryValue === "cancel") {
    return getTextField({
      label: {
        labelName: "Comments",
        labelKey: "TL_APPROVAL_CHECKLIST_COMMENTS_LABEL"
      },
      placeholder: {
        labelName: "Enter Cancellation Comments",
        labelKey: "TL_CANCEL_CHECKLIST_COMMENTS_PLACEHOLDER"
      },
      required: false,
      pattern: "",
      jsonPath: "Licenses[0].tradeLicenseDetail.additionalDetail.comments"
    });
  } else {
    return getTextField({
      label: {
        labelName: "Comments",
        labelKey: "TL_APPROVAL_CHECKLIST_COMMENTS_LABEL"
      },
      placeholder: {
        labelName: "Enter Approval Comments",
        labelKey: "TL_APPROVAL_CHECKLIST_COMMENTS_PLACEHOLDER_APPR"
      },
      required: false,
      pattern: "",
      jsonPath: "Licenses[0].tradeLicenseDetail.additionalDetail.comments"
    });
  }
};

export const getSubHeaderLabel = () => {
  if (queryValue === "reject") {
    return getCommonSubHeader({
      labelName: "Rejection CheckList",
      labelKey: "TL_REJECTION_CHECKLIST_REJ_CHECKLIST"
    });
  } else if (queryValue === "cancel") {
    return {};
  } else {
    return getCommonSubHeader({
      labelName: "Approve Checklist",
      labelKey: "TL_APPROVAL_CHECKLIST_BUTTON_APPRV_CHECKLIST"
    });
  }
};

export const getFooterButtons = () => {
  if (queryValue === "reject") {
    return getLabel({
      labelName: "REJECT APPLICATION",
      labelKey: "TL_REJECTION_CHECKLIST_BUTTON_REJ_APPL"
    });
  } else if (queryValue === "cancel") {
    return getLabel({
      labelName: "CANCEL TRADE LICENSE",
      labelKey: "TL_COMMON_BUTTON_CANCEL_LICENSE"
    });
  } else {
    return getLabel({
      labelName: "APPROVE APPLICATION",
      labelKey: "TL_APPROVAL_CHECKLIST_BUTTON_APPRV_APPL"
    });
  }
};

export const onClickNextButton = (applicationNumber, tlNumber) => {
  switch (queryValue) {
    case "reject":
      return `/landing/mihy-ui-framework/tradelicence/acknowledgement?purpose=application&status=rejected&applicationNumber=${applicationNumber}&tlNumber=${tlNumber}`;
    case "cancel":
      return `/landing/mihy-ui-framework/tradelicence/acknowledgement?purpose=application&status=cancelled&applicationNumber=${applicationNumber}&tlNumber=${tlNumber}`;
    default:
      return `/landing/mihy-ui-framework/tradelicence/acknowledgement?purpose=approve&status=success&applicationNumber=${applicationNumber}&tlNumber=${tlNumber}`;
  }
};

export const onClickPreviousButton = () => {
  switch (queryValue) {
    case "reject":
      return "/landing/mihy-ui-framework/tradelicence/search-preview?role=approver&status=pending_approval";
    case "cancel":
      return "/landing/mihy-ui-framework/tradelicence/search-preview?role=approver&status=approved";
    default:
      return "/landing/mihy-ui-framework/tradelicence/search-preview?role=approver&status=pending_approval";
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

export const showHideAdhocPopup = (state, dispatch) => {
  let toggle = get(
    state.screenConfiguration.screenConfig["pay"],
    "components.adhocDialog.props.open",
    false
  );
  dispatch(handleField("pay", "components.adhocDialog", "props.open", !toggle));
};

export const getButtonVisibility = (role, status, button) => {
  if (status === "pending_payment" && button === "PROCEED TO PAYMENT")
    return true;
  if (
    status === "pending_approval" &&
    role === "approver" &&
    button === "APPROVE"
  )
    return true;
  if (
    status === "pending_approval" &&
    role === "approver" &&
    button === "REJECT"
  )
    return true;
  if (
    status === "approved" &&
    role === "approver" &&
    button === "CANCEL TRADE LICENSE"
  )
    return true;
  return false;
};

export const commonTransform = (object, path) => {
  let data = get(object, path);
  let transformedData = {};
  data.map(a => {
    const splitList = a.code.split(".");
    let ipath = "";
    for (let i = 0; i < splitList.length; i += 1) {
      if (i != splitList.length - 1) {
        if (
          !(
            splitList[i] in
            (ipath === "" ? transformedData : get(transformedData, ipath))
          )
        ) {
          set(
            transformedData,
            ipath === "" ? splitList[i] : ipath + "." + splitList[i],
            i < splitList.length - 2 ? {} : []
          );
        }
      } else {
        get(transformedData, ipath).push(a);
      }
      ipath = splitList.slice(0, i + 1).join(".");
    }
  });
  set(object, path, transformedData);
  return object;
};

export const objectToDropdown = object => {
  let dropDown = [];
  for (var variable in object) {
    if (object.hasOwnProperty(variable)) {
      dropDown.push({ code: variable });
    }
  }
  return dropDown;
};

// Search API call
export const getSearchResults = async queryObject => {
  try {
    const response = await httpRequest(
      "post",
      "/tl-services/v1/_search",
      "",
      queryObject
    );
    return response;
  } catch (error) {
    console.log(error);
    return {};
  }
};

export const getBill = async queryObject => {
  try {
    const response = await httpRequest(
      "post",
      "/tl-calculator/v1/_getbill",
      "",
      queryObject
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const convertEpochToDate = dateEpoch => {
  const dateFromApi = new Date(dateEpoch);
  let month = dateFromApi.getMonth() + 1;
  let day = dateFromApi.getDate();
  let year = dateFromApi.getFullYear();
  month = (month > 9 ? "" : "0") + month;
  day = (day > 9 ? "" : "0") + day;
  return `${day}/${month}/${year}`;
};

export const convertDateToEpoch = (dateString, dayStartOrEnd) => {
  const parts = dateString.match(/(\d{4})-(\d{1,2})-(\d{1,2})/);
  const DateObj = new Date(Date.UTC(parts[1], parts[2] - 1, parts[3]));
  DateObj.setMinutes(DateObj.getMinutes() + DateObj.getTimezoneOffset());
  if (dayStartOrEnd === "dayend") {
    DateObj.setHours(DateObj.getHours() + 24);
    DateObj.setSeconds(DateObj.getSeconds() - 1);
  }
  return DateObj.getTime();
};

export const getReceiptData = async queryObject => {
  try {
    const response = await httpRequest(
      "post",
      "collection-services/receipts/_search",
      "",
      queryObject
    );
    return response;
  } catch (error) {
    console.log(error);
    return {};
  }
};

export const getAutoSelector = textScheama => {
  const { textLabel = {}, jsonPath, props = {} } = textScheama;
  return {
    uiFramework: "custom-molecules-local",
    componentPath: "AutoSelector",
    gridDefination: {
      xs: 6,
      sm: 3
    },
    props: {
      data: []
    }
  };
};

export const getMapLocator = textSchema => {
  return {
    uiFramework: "custom-molecules-local",
    componentPath: "MapLocator",
    props: {}
  };
};

export const showHideMapPopup = (state, dispatch) => {
  let toggle = get(
    state.screenConfiguration.screenConfig["apply"],
    "components.div.children.formwizardFirstStep.children.tradeLocationDetails.children.cardContent.children.mapsDialog.props.open",
    false
  );
  dispatch(
    handleField(
      "apply",
      "components.div.children.formwizardFirstStep.children.tradeLocationDetails.children.cardContent.children.mapsDialog",
      "props.open",
      !toggle
    )
  );
};

export const getHeaderSideText = (status, licenseNo = null) => {
  switch (status) {
    case "PAID":
      return "Status: Pending Approval";
    case "APPLIED":
      return "Status: Pending Payment";
    case "REJECTED":
      return "Status: Application Rejected";
    case "CANCELLED":
      return `Trade License No: ${licenseNo}`;
    case "APPROVED":
      return `Trade License No: ${licenseNo}`;
    default:
      return "";
  }
};
