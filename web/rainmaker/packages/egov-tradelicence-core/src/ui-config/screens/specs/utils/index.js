import {
  getLabel,
  getTextField,
  getCommonSubHeader
} from "mihy-ui-framework/ui-config/screens/specs/utils";
import { toggleSnackbarAndSetText } from "mihy-ui-framework/ui-redux/app/actions";
import "./index.css";
import { validate } from "mihy-ui-framework/ui-redux/screen-configuration/utils";
import { handleScreenConfigurationFieldChange as handleField } from "mihy-ui-framework/ui-redux/screen-configuration/actions";
import get from "lodash/get";
import set from "lodash/set";
import { httpRequest } from "ui-utils/api";
import { prepareFinalObject } from "mihy-ui-framework/ui-redux/screen-configuration/actions";
import { getQueryArg } from "mihy-ui-framework/ui-utils/commons";

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

export const getAsteric = () => {
  return {
    uiFramework: "custom-atoms-local",
    componentPath: "Asteric"
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

export const getRadioButtonGroup = (buttons, jsonPath, defaultValue) => {
  return {
    uiFramework: "custom-containers-local",
    componentPath: "RadioGroupContainer",
    props: {
      buttons,
      jsonPath,
      defaultValue
    }
  };
};
export const getRadioGroupWithLabel = (
  label,
  labelKey,
  buttons,
  jsonPath,
  defaultValue
) => {
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
          }),
          asteric: getAsteric()
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
          div: getRadioButtonGroup(buttons, jsonPath, defaultValue)
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

export const getApprovalTextField = queryValue => {
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
      jsonPath:
        "Licenses[0].tradeLicenseDetail.additionalDetail.rejectDetail.comments",
      props: {
        style: {
          paddingBottom: 5
        }
      }
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
      jsonPath:
        "Licenses[0].tradeLicenseDetail.additionalDetail.cancelDetail.comments",
      props: {
        style: {
          paddingBottom: 5
        }
      }
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
      jsonPath:
        "Licenses[0].tradeLicenseDetail.additionalDetail.approveDetail.comments",
      props: {
        style: {
          paddingBottom: 5
        }
      }
    });
  }
};

export const getCheckBoxJsonpath = queryValue => {
  if (queryValue === "reject") {
    return "Licenses[0].tradeLicenseDetail.additionalDetail.rejectDetail.check";
  } else if (queryValue === "cancel") {
    return "Licenses[0].tradeLicenseDetail.additionalDetail.cancelDetail.check";
  } else {
    return "Licenses[0].tradeLicenseDetail.additionalDetail.approveDetail.check";
  }
};

export const getSafetyNormsJson = queryValue => {
  if (queryValue === "reject") {
    return "Licenses[0].tradeLicenseDetail.additionalDetail.rejectDetail.checklist.safetyNorms";
  } else if (queryValue === "cancel") {
    return "Licenses[0].tradeLicenseDetail.additionalDetail.cancelDetail.checklist.safetyNorms";
  } else {
    return "Licenses[0].tradeLicenseDetail.additionalDetail.approveDetail.checklist.safetyNorms";
  }
};

export const getHygeneLevelJson = queryValue => {
  if (queryValue === "reject") {
    return "Licenses[0].tradeLicenseDetail.additionalDetail.rejectDetail.checklist.hygieneLevels";
  } else if (queryValue === "cancel") {
    return "Licenses[0].tradeLicenseDetail.additionalDetail.cancelDetail.checklist.hygieneLevels";
  } else {
    return "Licenses[0].tradeLicenseDetail.additionalDetail.approveDetail.checklist.hygieneLevels";
  }
};

export const getLocalityHarmedJson = queryValue => {
  if (queryValue === "reject") {
    return "Licenses[0].tradeLicenseDetail.additionalDetail.rejectDetail.checklist.localityHarmed";
  } else if (queryValue === "cancel") {
    return "Licenses[0].tradeLicenseDetail.additionalDetail.cancelDetail.checklist.localityHarmed";
  } else {
    return "Licenses[0].tradeLicenseDetail.additionalDetail.approveDetail.checklist.localityHarmed";
  }
};

export const getSubHeaderLabel = queryValue => {
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

export const getFooterButtons = queryValue => {
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

export const onClickNextButton = (
  applicationNumber,
  secondNumber,
  queryValue,
  tenantId
) => {
  switch (queryValue) {
    case "reject":
      return `/mihy-ui-framework/tradelicence/acknowledgement?purpose=application&status=rejected&applicationNumber=${applicationNumber}&secondNumber=${secondNumber}&tenantId=${tenantId}`;
    case "cancel":
      return `/mihy-ui-framework/tradelicence/acknowledgement?purpose=application&status=cancelled&applicationNumber=${applicationNumber}&secondNumber=${secondNumber}&tenantId=${tenantId}`;
    default:
      return `/mihy-ui-framework/tradelicence/acknowledgement?purpose=approve&status=success&applicationNumber=${applicationNumber}&secondNumber=${secondNumber}&tenantId=${tenantId}`;
  }
};

export const onClickPreviousButton = (
  queryValue,
  applicationNumber,
  tenantId
) => {
  switch (queryValue) {
    case "reject":
      return `/mihy-ui-framework/tradelicence/search-preview?role=approver&status=pending_approval&applicationNumber=${applicationNumber}&tenantId=${tenantId}`;
    case "cancel":
      return `/mihy-ui-framework/tradelicence/search-preview?role=approver&status=approved&applicationNumber=${applicationNumber}&tenantId=${tenantId}`;
    default:
      return `/mihy-ui-framework/tradelicence/search-preview?role=approver&status=pending_approval&applicationNumber=${applicationNumber}&tenantId=${tenantId}`;
  }
};
export const getFeesEstimateCard = props => {
  const { sourceJsonPath } = props;
  return {
    uiFramework: "custom-containers-local",
    componentPath: "EstimateCardContainer",
    props: {
      // estimate: {
      //   header,
      //   fees,
      //   extra
      // }
      sourceJsonPath
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

export const getButtonVisibility = (status, button) => {
  if (status === "pending_payment" && button === "PROCEED TO PAYMENT")
    return true;
  if (status === "pending_approval" && button === "APPROVE") return true;
  if (status === "pending_approval" && button === "REJECT") return true;
  if (status === "approved" && button === "CANCEL TRADE LICENSE") return true;
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

export const getReceipt = async queryObject => {
  try {
    const response = await httpRequest(
      "post",
      "/collection-services/receipts/_search",
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
  //example input format : "2018-10-02"
  try {
    const parts = dateString.match(/(\d{4})-(\d{1,2})-(\d{1,2})/);
    const DateObj = new Date(Date.UTC(parts[1], parts[2] - 1, parts[3]));
    DateObj.setMinutes(DateObj.getMinutes() + DateObj.getTimezoneOffset());
    if (dayStartOrEnd === "dayend") {
      DateObj.setHours(DateObj.getHours() + 24);
      DateObj.setSeconds(DateObj.getSeconds() - 1);
    }
    return DateObj.getTime();
  } catch (e) {
    return dateString;
  }
};

export const convertDateTimeToEpoch = dateTimeString => {
  //example input format : "26-07-2018 17:43:21"
  try {
    const parts = dateTimeString.match(
      /(\d{2})\-(\d{2})\-(\d{4}) (\d{2}):(\d{2}):(\d{2})/
    );
    return Date.UTC(+parts[3], parts[2] - 1, +parts[1], +parts[4], +parts[5]);
  } catch (e) {
    return dateTimeString;
  }
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

const nestedLevelScheama = ["Major", "Minor", "Subminor", "Details"];
//applyScreenMdmsData.MdmsRes.TradeLicense.TradeType
const reTrasnformerForNestedDropDown = (
  originaJsonPath,
  value,
  state,
  dispatch
) => {
  let nestedValues = value.split(".");
  while (nestedValues.length > 1) {
    const originalNestedValues = value.split(".");
    const originalObject = get(state, `${originaJsonPath}`);
    nestedValues = value.split(".");
    const targetLevel = nestedValues.pop();
    const targetpath = nestedValues.join(".");
    let targetValues = get(originalObject, `${targetpath}`, []);
    targetValues =
      targetValues.length && targetValues.length >= 0
        ? targetValues
        : objectToDropdown(targetValues);

    dispatch(
      prepareFinalObject(
        `${targetpath}.${nestedLevelScheama[nestedValues.length + 1]}`,
        targetValues
      )
    );
  }
};

export const getMdmsData = async queryObject => {
  try {
    const response = await httpRequest(
      "post",
      "egov-mdms-service/v1/_get",
      "",
      queryObject
    );
    return response;
  } catch (error) {
    console.log(error);
    return {};
  }
};

export const getDetailsFromProperty = async (state, dispatch) => {
  try {
    const propertyId = get(
      state.screenConfiguration.preparedFinalObject,
      "Licenses[0].propertyId",
      ""
    );
    if (propertyId) {
      let payload = await httpRequest(
        "post",
        `/pt-services-v2/property/_search?tenantId=pb.amritsar&ids=${propertyId}`,
        "_search",
        [],
        {}
      );
      if (
        payload &&
        payload.Properties &&
        payload.Properties.hasOwnProperty("length")
      ) {
        if (payload.Properties.length === 0) {
          dispatch(
            toggleSnackbarAndSetText(
              true,
              "Property is not found with this Property Id",
              "info"
            )
          );
        } else {
          dispatch(
            prepareFinalObject(
              "Licenses[0].tradeLicenseDetail.address",
              payload.Properties[0].address
            )
          );
          dispatch(
            handleField(
              "apply",
              "components.div.children.formwizardFirstStep.children.tradeLocationDetails.children.cardContent.children.tradeDetailsConatiner.children.tradeLocCity.children.cityDropdown",
              "props.value",
              payload.Properties[0].address.tenantId
            )
          );
        }
      }
    }
  } catch (e) {
    console.log(e);
  }
};

export const getDetailsForOwner = async (state, dispatch) => {
  try {
    const ownerNo = get(
      state.screenConfiguration.preparedFinalObject,
      "Licenses[0].tradeLicenseDetail.owners[0].mobileNumber",
      ""
    );
    let payload = await httpRequest(
      "post",
      "/user/_search?tenantId=pb",
      "_search",
      [],
      {
        tenantId: "pb",
        userName: `${ownerNo}`
      }
    );
    if (payload && payload.user && payload.user.hasOwnProperty("length")) {
      if (payload.user.length === 0) {
        dispatch(
          toggleSnackbarAndSetText(
            true,
            "This mobile number is not registered !",
            "info"
          )
        );
      } else {
        const userInfo =
          payload.user &&
          payload.user[0] &&
          JSON.parse(JSON.stringify(payload.user[0]));
        if (userInfo && userInfo.createdDate) {
          userInfo.createdDate = convertDateTimeToEpoch(userInfo.createdDate);
          userInfo.lastModifiedDate = convertDateTimeToEpoch(
            userInfo.lastModifiedDate
          );
          userInfo.pwdExpiryDate = convertDateTimeToEpoch(
            userInfo.pwdExpiryDate
          );
        }
        dispatch(
          prepareFinalObject(
            "Licenses[0].tradeLicenseDetail.owners[0]",
            userInfo
          )
        );
      }
    }
  } catch (e) {
    dispatch(toggleSnackbarAndSetText(true, e.message, "info"));
  }
};

// Get user data from uuid API call
export const getUserDataFromUuid = async bodyObject => {
  try {
    const response = await httpRequest(
      "post",
      "/user/_search",
      "",
      [],
      bodyObject
    );
    return response;
  } catch (error) {
    console.log(error);
    return {};
  }
};

export const prepareDocumentTypeObj = documents => {
  let documentsArr =
    documents.length > 0
      ? documents.reduce((documentsArr, item, ind) => {
          documentsArr.push({
            name: item,
            required: true,
            jsonPath: `Licenses[0].tradeLicenseDetail.applicationDocuments[${ind}]`
          });
          return documentsArr;
        }, [])
      : [];
  return documentsArr;
};

//Common functions for Estimate card

const getTaxValue = item => {
  return item
    ? item.debitAmount
      ? -Math.abs(item.debitAmount)
      : item.crAmountToBePaid
        ? item.crAmountToBePaid
        : 0
    : 0;
};

const getEstimateData = (Bill, getFromReceipt) => {
  if (Bill && Bill.length) {
    const extraData = ["Rebate", "Penalty"].map(item => {
      return {
        name: {
          labelName: item,
          labelKey: item
        },
        value: null,
        info: {
          labelName: `Information about ${item}`,
          labelKey: `Information about ${item}`
        }
      };
    });
    const { billAccountDetails } = Bill[0].billDetails[0];
    const transformedData = billAccountDetails.reduce((result, item) => {
      if (getFromReceipt) {
        item.accountDescription &&
          result.push({
            name: {
              labelName: item.accountDescription.split("-")[0],
              labelKey: item.accountDescription.split("-")[0]
            },
            value: getTaxValue(item),
            info: {
              labelName: `Information about ${
                item.accountDescription.split("-")[0]
              }`,
              labelKey: `Information about ${
                item.accountDescription.split("-")[0]
              }`
            }
          });
      } else {
        item.taxHeadCode &&
          result.push({
            name: {
              labelName: item.taxHeadCode,
              labelKey: item.taxHeadCode
            },
            value: getTaxValue(item),
            info: {
              labelName: `Information about ${item.taxHeadCode}`,
              labelKey: `Information about ${item.taxHeadCode}`
            }
          });
      }
      return result;
    }, []);
    return [...transformedData, ...extraData];
  }
};

export const createEstimateData = async (
  LicenseData,
  jsonPath,
  dispatch,
  href = {},
  getFromReceipt
) => {
  const applicationNo =
    get(LicenseData, "applicationNumber") ||
    getQueryArg(href, "applicationNumber");
  const tenantId =
    get(LicenseData, "tenantId") || getQueryArg(href, "tenantId");
  const businessService = "TL"; //Hardcoding Alert
  const queryObj = [
    { key: "tenantId", value: tenantId },
    {
      key: "consumerCode",
      value: applicationNo
    },
    {
      key: "businessService",
      value: businessService
    }
  ];
  const payload = getFromReceipt
    ? await getReceipt(queryObj.filter(item => item.key !== "businessService"))
    : await getBill(queryObj);
  const estimateData = payload
    ? getFromReceipt
      ? getEstimateData(payload.Receipt[0].Bill, getFromReceipt)
      : getEstimateData(payload.Bill)
    : [];
  dispatch(prepareFinalObject(jsonPath, estimateData));
  return payload;
};

export const getCurrentFinancialYear = () => {
  var today = new Date();
  var curMonth = today.getMonth();
  var fiscalYr = "";
  if (curMonth > 3) {
    var nextYr1 = (today.getFullYear() + 1).toString();
    fiscalYr = today.getFullYear().toString() + "-" + nextYr1;
  } else {
    var nextYr2 = today.getFullYear().toString();
    fiscalYr = (today.getFullYear() - 1).toString() + "-" + nextYr2;
  }
  return fiscalYr;
};

export const validateFields = (
  objectJsonPath,
  state,
  dispatch,
  screen = "apply"
) => {
  const fields = get(
    state.screenConfiguration.screenConfig[screen],
    objectJsonPath,
    {}
  );
  // console.log("fields is.....", fields);
  let isFormValid = true;
  for (var variable in fields) {
    if (fields.hasOwnProperty(variable)) {
      if (
        fields[variable] &&
        fields[variable].props &&
        (fields[variable].props.disabled === undefined ||
          !fields[variable].props.disabled) &&
        !validate(
          screen,
          {
            ...fields[variable],
            value: get(
              state.screenConfiguration.preparedFinalObject,
              fields[variable].jsonPath
            )
          },
          dispatch,
          true
        )
      ) {
        isFormValid = false;
      }
    }
  }
  return isFormValid;
};

export const epochToYmdDate = et => {
  if (!et) return null;
  if (typeof et === "string") return et;
  var date = new Date(Math.round(Number(et)));
  var formattedDate =
    date.getUTCFullYear() +
    "-" +
    (date.getUTCMonth() + 1) +
    "-" +
    date.getUTCDate();
  return formattedDate;
};

export const getBaseURL = () => {
  if (process.env.REACT_APP_NAME !== "Citizen") {
    return "/mihy-ui-framework/tradelicence";
  } else {
    return "/mihy-ui-framework/tradelicense-citizen";
  }
};

export const fetchBill = async (action, state, dispatch) => {
  //get bill and populate estimate card
  const payload = await createEstimateData(
    [],
    "LicensesTemp[0].estimateCardData",
    dispatch,
    window.location.href
  );

  //For Adhoc
  // Search License
  let queryObject = [
    { key: "tenantId", value: getQueryArg(window.location.href, "tenantId") },
    {
      key: "applicationNumber",
      value: getQueryArg(window.location.href, "applicationNumber")
    }
  ];
  const LicensesPayload = await getSearchResults(queryObject);
  //set in redux to be used for adhoc
  LicensesPayload &&
    LicensesPayload.Licenses &&
    dispatch(prepareFinalObject("Licenses[0]", LicensesPayload.Licenses[0]));

  //initiate receipt object
  payload &&
    dispatch(prepareFinalObject("ReceiptTemp[0].Bill[0]", payload.Bill[0]));

  //set amount paid as total amount from bill
  payload &&
    dispatch(
      prepareFinalObject(
        "ReceiptTemp[0].Bill[0].billDetails[0].amountPaid",
        payload.Bill[0].billDetails[0].totalAmount
      )
    );

  //set total amount in instrument
  payload &&
    dispatch(
      prepareFinalObject(
        "ReceiptTemp[0].instrument.amount",
        payload.Bill[0].billDetails[0].totalAmount
      )
    );

  //Initially select instrument type as Cash
  dispatch(
    prepareFinalObject("ReceiptTemp[0].instrument.instrumentType.name", "Cash")
  );

  //set tenantId
  dispatch(
    prepareFinalObject(
      "ReceiptTemp[0].tenantId",
      getQueryArg(window.location.href, "tenantId")
    )
  );

  //set tenantId in instrument
  dispatch(
    prepareFinalObject(
      "ReceiptTemp[0].instrument.tenantId",
      getQueryArg(window.location.href, "tenantId")
    )
  );
};

export const setMultiOwnerForSV = (action, isIndividual) => {
  if (isIndividual) {
    set(
      action,
      "screenConfig.components.div.children.tradeReviewDetails.children.cardContent.children.reviewOwnerDetails.children.cardContent.children.multiOwner.visible",
      true
    );
    set(
      action,
      "screenConfig.components.div.children.tradeReviewDetails.children.cardContent.children.reviewOwnerDetails.children.cardContent.children.multiOwnerInstitutional.visible",
      false
    );
  } else {
    set(
      action,
      "screenConfig.components.div.children.tradeReviewDetails.children.cardContent.children.reviewOwnerDetails.children.cardContent.children.multiOwner.visible",
      false
    );
    set(
      action,
      "screenConfig.components.div.children.tradeReviewDetails.children.cardContent.children.reviewOwnerDetails.children.cardContent.children.multiOwnerInstitutional.visible",
      true
    );
  }
};

export const setMultiOwnerForApply = (state, isIndividual) => {
  if (isIndividual) {
    set(
      state,
      "screenConfiguration.screenConfig.apply.components.div.children.formwizardFourthStep.children.tradeReviewDetails.children.cardContent.children.reviewOwnerDetails.children.cardContent.children.multiOwner.visible",
      true
    );
    set(
      state,
      "screenConfiguration.screenConfig.apply.components.div.children.formwizardFourthStep.children.tradeReviewDetails.children.cardContent.children.reviewOwnerDetails.children.cardContent.children.multiOwnerInstitutional.visible",
      false
    );
  } else {
    set(
      state,
      "screenConfiguration.screenConfig.apply.components.div.children.formwizardFourthStep.children.tradeReviewDetails.children.cardContent.children.reviewOwnerDetails.children.cardContent.children.multiOwner.visible",
      false
    );
    set(
      state,
      "screenConfiguration.screenConfig.apply.components.div.children.formwizardFourthStep.children.tradeReviewDetails.children.cardContent.children.reviewOwnerDetails.children.cardContent.children.multiOwnerInstitutional.visible",
      true
    );
  }
};

export const setValidToFromVisibilityForSV = (action, value) => {
  if (value === "PERMANENT") {
    set(
      action,
      "screenConfig.components.div.children.tradeReviewDetails.children.cardContent.children.reviewTradeDetails.children.cardContent.children.viewOne.children.reviewToDate.visible",
      false
    );
    set(
      action,
      "screenConfig.components.div.children.tradeReviewDetails.children.cardContent.children.reviewTradeDetails.children.cardContent.children.viewOne.children.reviewFromDate.visible",
      false
    );
  } else {
    set(
      action,
      "screenConfig.components.div.children.tradeReviewDetails.children.cardContent.children.reviewTradeDetails.children.cardContent.children.viewOne.children.reviewToDate.visible",
      true
    );
    set(
      action,
      "screenConfig.components.div.children.tradeReviewDetails.children.cardContent.children.reviewTradeDetails.children.cardContent.children.viewOne.children.reviewFromDate.visible",
      true
    );
  }
};

export const setValidToFromVisibilityForApply = (state, value) => {
  if (value === "PERMANENT") {
    set(
      state,
      "screenConfiguration.screenConfig.apply.components.div.children.formwizardFourthStep.children.tradeReviewDetails.children.cardContent.children.reviewTradeDetails.children.cardContent.children.viewOne.children.reviewToDate.visible",
      false
    );
    set(
      state,
      "screenConfiguration.screenConfig.apply.components.div.children.formwizardFourthStep.children.tradeReviewDetails.children.cardContent.children.reviewTradeDetails.children.cardContent.children.viewOne.children.reviewFromDate.visible",
      false
    );
  } else {
    set(
      state,
      "screenConfiguration.screenConfig.apply.components.div.children.formwizardFourthStep.children.tradeReviewDetails.children.cardContent.children.reviewTradeDetails.children.cardContent.children.viewOne.children.reviewToDate.visible",
      true
    );
    set(
      state,
      "screenConfiguration.screenConfig.apply.components.div.children.formwizardFourthStep.children.tradeReviewDetails.children.cardContent.children.reviewTradeDetails.children.cardContent.children.viewOne.children.reviewFromDate.visible",
      true
    );
  }
};

export const ifUserRoleExists = role => {
  let userInfo = JSON.parse(localStorage.getItem("user-info"));
  const roles = get(userInfo, "roles");
  const roleCodes = roles ? roles.map(role => role.code) : [];
  if (roleCodes.indexOf(role) > -1) {
    return true;
  } else return false;
};

export const getTransformedStatus = status => {
  switch (status) {
    case "PAID":
      return "pending_approval";
    case "APPLIED":
      return "pending_payment";
    case "REJECTED":
      return "rejected";
    case "CANCELLED":
      return "cancelled";
    case "APPROVED":
      return "approved";
    default:
      return "";
  }
};

export const updateDropDowns = (payload, action, state, dispatch) => {
  console.log("Sudhanshu123...", payload);
  const structType = get(
    payload,
    "Licenses[0].tradeLicenseDetail.structureType"
  );

  const tradeType = get(
    payload,
    "Licenses[0].tradeLicenseDetail.tradeUnits[0].tradeType"
  );

  if (structType) {
    set(
      payload,
      "LicensesTemp[0].tradeLicenseDetail.structureType",
      structType.split(".")[0]
    );
    try {
      dispatch(
        prepareFinalObject(
          "applyScreenMdmsData.common-masters.StructureSubTypeTransformed",
          get(
            state.screenConfiguration.preparedFinalObject.applyScreenMdmsData[
              "common-masters"
            ],
            `StructureType.${structType.split(".")[0]}`,
            []
          )
        )
      );
    } catch (e) {
      console.log(e);
    }
  }
  payload &&
    dispatch(
      prepareFinalObject(
        "LicensesTemp[0].tradeLicenseDetail.structureType",
        payload.LicensesTemp[0].tradeLicenseDetail.structureType
      )
    );
};
