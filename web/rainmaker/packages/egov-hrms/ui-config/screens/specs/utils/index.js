"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toggleDeactivateDialog = exports.getEpochForDate = exports.sortByEpoch = exports.applyForm = exports.showCityPicker = exports.setFilteredTradeTypes = exports.getUniqueItemsFromArray = exports.getAllDataFromBillingSlab = exports.getDialogButton = exports.showHideBreakupPopup = exports.setOwnerShipDropDownFieldChange = exports.getDocList = exports.updateDropDowns = exports.getTransformedStatus = exports.ifUserRoleExists = exports.setValidToFromVisibilityForApply = exports.setValidToFromVisibilityForSV = exports.setMultiOwnerForApply = exports.setMultiOwnerForSV = exports.fetchBill = exports.getBaseURL = exports.getFinancialYearDates = exports.getNextMonthDateInYMD = exports.getTodaysDateInYMD = exports.epochToYmdDate = exports.validateFields = exports.getCurrentFinancialYear = exports.createEstimateData = exports.prepareDocumentTypeObj = exports.getUserDataFromUuid = exports.getDetailsForOwner = exports.getDetailsFromProperty = exports.getMdmsData = exports.getHeaderSideText = exports.showHideMapPopup = exports.getMapLocator = exports.getAutoSelector = exports.getReceiptData = exports.convertDateTimeToEpoch = exports.convertDateToEpoch = exports.convertEpochToDate = exports.getReceipt = exports.getBill = exports.getSearchResults = exports.objectArrayToDropdown = exports.objectToDropdown = exports.commonTransform = exports.getButtonVisibility = exports.showHideAdhocPopup = exports.getIconStyle = exports.getFeesEstimateCard = exports.onClickPreviousButton = exports.onClickNextButton = exports.getFooterButtons = exports.getSubHeaderLabel = exports.getLocalityHarmedJson = exports.getHygeneLevelJson = exports.getSafetyNormsJson = exports.getCheckBoxJsonpath = exports.getApprovalTextField = exports.getTranslatedLabel = exports.transformById = exports.getContainerWithElement = exports.getApplicationNoContainer = exports.getRadioGroupWithLabel = exports.getRadioButtonGroup = exports.getUploadFilesMultiple = exports.getUploadFile = exports.getCheckbox = exports.getTooltip = exports.getAsteric = exports.getCommonApplyFooter = undefined;

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _objectWithoutProperties2 = require("babel-runtime/helpers/objectWithoutProperties");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _actions = require("egov-ui-framework/ui-redux/app/actions");

require("./index.css");

var _utils2 = require("egov-ui-framework/ui-redux/screen-configuration/utils");

var _actions2 = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _set = require("lodash/set");

var _set2 = _interopRequireDefault(_set);

var _filter = require("lodash/filter");

var _filter2 = _interopRequireDefault(_filter);

var _api = require("ui-utils/api");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _isUndefined = require("lodash/isUndefined");

var _isUndefined2 = _interopRequireDefault(_isUndefined);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getCommonApplyFooter = exports.getCommonApplyFooter = function getCommonApplyFooter(children) {
  return {
    uiFramework: "custom-atoms",
    componentPath: "Div",
    props: {
      className: "apply-wizard-footer"
    },
    children: children
  };
};

var getAsteric = exports.getAsteric = function getAsteric() {
  return {
    uiFramework: "custom-atoms-local",
    componentPath: "Asteric"
  };
};

var getTooltip = exports.getTooltip = function getTooltip(children, toolTipProps) {
  return {
    uiFramework: "custom-atoms",
    componentPath: "Div",
    children: {
      label: children,
      toolTip: {
        componentPath: "Tooltip",
        props: (0, _extends3.default)({}, toolTipProps),
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

var getCheckbox = exports.getCheckbox = function getCheckbox(content, jsonPath) {
  var props = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  return {
    uiFramework: "custom-containers-local",
    componentPath: "CheckboxContainer",
    props: (0, _extends3.default)({
      content: content,
      jsonPath: jsonPath
    }, props)
  };
};

var getUploadFile = exports.getUploadFile = {
  uiFramework: "custom-molecules",
  componentPath: "DocumentList",
  props: {
    documents: [{
      name: "Upload Document"
    }]
  }
};

var getUploadFilesMultiple = exports.getUploadFilesMultiple = function getUploadFilesMultiple(jsonPath) {
  return {
    uiFramework: "custom-molecules-local",
    componentPath: "UploadMultipleFiles",
    props: {
      maxFiles: 4,
      jsonPath: jsonPath,
      inputProps: {
        accept: "image/*, .pdf, .png, .jpeg"
      },
      buttonLabel: {
        labelKey: "HR_UPLOAD_FILES_LABEL",
        labelName: "UPLOAD FILES"
      },
      maxFileSize: 5000
    }
  };
};

var getRadioButtonGroup = exports.getRadioButtonGroup = function getRadioButtonGroup(buttons, jsonPath, defaultValue) {
  return {
    uiFramework: "custom-containers-local",
    componentPath: "RadioGroupContainer",
    props: {
      buttons: buttons,
      jsonPath: jsonPath,
      defaultValue: defaultValue
    }
  };
};
var getRadioGroupWithLabel = exports.getRadioGroupWithLabel = function getRadioGroupWithLabel(label, labelKey, buttons, jsonPath, defaultValue) {
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
          div: (0, _utils.getLabel)({
            labelName: label,
            labelKey: labelKey,

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

var getApplicationNoContainer = exports.getApplicationNoContainer = function getApplicationNoContainer(number) {
  return {
    uiFramework: "custom-atoms-local",
    componentPath: "ApplicationNoContainer",
    props: {
      number: number
    }
  };
};

var getContainerWithElement = exports.getContainerWithElement = function getContainerWithElement(_ref) {
  var children = _ref.children,
      _ref$props = _ref.props,
      props = _ref$props === undefined ? {} : _ref$props,
      _ref$gridDefination = _ref.gridDefination,
      gridDefination = _ref$gridDefination === undefined ? {} : _ref$gridDefination;

  return {
    uiFramework: "custom-atoms",
    componentPath: "Div",
    children: children,
    gridDefination: gridDefination,
    props: (0, _extends3.default)({}, props)
  };
};

var transformById = exports.transformById = function transformById(payload, id) {
  return payload && payload.reduce(function (result, item) {
    result[item[id]] = (0, _extends3.default)({}, item);

    return result;
  }, {});
};

var getTranslatedLabel = exports.getTranslatedLabel = function getTranslatedLabel(labelKey, localizationLabels) {
  var translatedLabel = null;
  if (localizationLabels && localizationLabels.hasOwnProperty(labelKey)) {
    translatedLabel = localizationLabels[labelKey];
    if (translatedLabel && (typeof translatedLabel === "undefined" ? "undefined" : (0, _typeof3.default)(translatedLabel)) === "object" && translatedLabel.hasOwnProperty("message")) translatedLabel = translatedLabel.message;
  }
  return translatedLabel || labelKey;
};

var getApprovalTextField = exports.getApprovalTextField = function getApprovalTextField(queryValue) {
  if (queryValue === "reject") {
    return (0, _utils.getTextField)({
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
      jsonPath: "Licenses[0].tradeLicenseDetail.additionalDetail.rejectDetail.comments",
      props: {
        style: {
          paddingBottom: 5
        }
      }
    });
  } else if (queryValue === "cancel") {
    return (0, _utils.getTextField)({
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
      jsonPath: "Licenses[0].tradeLicenseDetail.additionalDetail.cancelDetail.comments",
      props: {
        style: {
          paddingBottom: 5
        }
      }
    });
  } else {
    return (0, _utils.getTextField)({
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
      jsonPath: "Licenses[0].tradeLicenseDetail.additionalDetail.approveDetail.comments",
      props: {
        style: {
          paddingBottom: 5
        }
      }
    });
  }
};

var getCheckBoxJsonpath = exports.getCheckBoxJsonpath = function getCheckBoxJsonpath(queryValue) {
  if (queryValue === "reject") {
    return "Licenses[0].tradeLicenseDetail.additionalDetail.rejectDetail.check";
  } else if (queryValue === "cancel") {
    return "Licenses[0].tradeLicenseDetail.additionalDetail.cancelDetail.check";
  } else {
    return "Licenses[0].tradeLicenseDetail.additionalDetail.approveDetail.check";
  }
};

var getSafetyNormsJson = exports.getSafetyNormsJson = function getSafetyNormsJson(queryValue) {
  if (queryValue === "reject") {
    return "Licenses[0].tradeLicenseDetail.additionalDetail.rejectDetail.checklist.safetyNorms";
  } else if (queryValue === "cancel") {
    return "Licenses[0].tradeLicenseDetail.additionalDetail.cancelDetail.checklist.safetyNorms";
  } else {
    return "Licenses[0].tradeLicenseDetail.additionalDetail.approveDetail.checklist.safetyNorms";
  }
};

var getHygeneLevelJson = exports.getHygeneLevelJson = function getHygeneLevelJson(queryValue) {
  if (queryValue === "reject") {
    return "Licenses[0].tradeLicenseDetail.additionalDetail.rejectDetail.checklist.hygieneLevels";
  } else if (queryValue === "cancel") {
    return "Licenses[0].tradeLicenseDetail.additionalDetail.cancelDetail.checklist.hygieneLevels";
  } else {
    return "Licenses[0].tradeLicenseDetail.additionalDetail.approveDetail.checklist.hygieneLevels";
  }
};

var getLocalityHarmedJson = exports.getLocalityHarmedJson = function getLocalityHarmedJson(queryValue) {
  if (queryValue === "reject") {
    return "Licenses[0].tradeLicenseDetail.additionalDetail.rejectDetail.checklist.localityHarmed";
  } else if (queryValue === "cancel") {
    return "Licenses[0].tradeLicenseDetail.additionalDetail.cancelDetail.checklist.localityHarmed";
  } else {
    return "Licenses[0].tradeLicenseDetail.additionalDetail.approveDetail.checklist.localityHarmed";
  }
};

var getSubHeaderLabel = exports.getSubHeaderLabel = function getSubHeaderLabel(queryValue) {
  if (queryValue === "reject") {
    return (0, _utils.getCommonSubHeader)({
      labelName: "Rejection CheckList",
      labelKey: "TL_REJECTION_CHECKLIST_REJ_CHECKLIST"
    });
  } else if (queryValue === "cancel") {
    return {};
  } else {
    return (0, _utils.getCommonSubHeader)({
      labelName: "Approve Checklist",
      labelKey: "TL_APPROVAL_CHECKLIST_BUTTON_APPRV_CHECKLIST"
    });
  }
};

var getFooterButtons = exports.getFooterButtons = function getFooterButtons(queryValue) {
  if (queryValue === "reject") {
    return (0, _utils.getLabel)({
      labelName: "REJECT APPLICATION",
      labelKey: "TL_REJECTION_CHECKLIST_BUTTON_REJ_APPL"
    });
  } else if (queryValue === "cancel") {
    return (0, _utils.getLabel)({
      labelName: "CANCEL TRADE LICENSE",
      labelKey: "TL_COMMON_BUTTON_CANCEL_LICENSE"
    });
  } else {
    return (0, _utils.getLabel)({
      labelName: "APPROVE APPLICATION",
      labelKey: "TL_APPROVAL_CHECKLIST_BUTTON_APPRV_APPL"
    });
  }
};

var onClickNextButton = exports.onClickNextButton = function onClickNextButton(applicationNumber, secondNumber, queryValue, tenantId) {
  switch (queryValue) {
    case "reject":
      return "/egov-ui-framework/hrms/acknowledgement?purpose=application&status=rejected&applicationNumber=" + applicationNumber + "&secondNumber=" + secondNumber + "&tenantId=" + tenantId;
    case "cancel":
      return "/egov-ui-framework/hrms/acknowledgement?purpose=application&status=cancelled&applicationNumber=" + applicationNumber + "&secondNumber=" + secondNumber + "&tenantId=" + tenantId;
    default:
      return "/egov-ui-framework/hrms/acknowledgement?purpose=approve&status=success&applicationNumber=" + applicationNumber + "&secondNumber=" + secondNumber + "&tenantId=" + tenantId;
  }
};

var onClickPreviousButton = exports.onClickPreviousButton = function onClickPreviousButton(queryValue, applicationNumber, tenantId) {
  switch (queryValue) {
    case "reject":
      return "/egov-ui-framework/hrms/search-preview?role=approver&status=pending_approval&applicationNumber=" + applicationNumber + "&tenantId=" + tenantId;
    case "cancel":
      return "/egov-ui-framework/hrms/search-preview?role=approver&status=approved&applicationNumber=" + applicationNumber + "&tenantId=" + tenantId;
    default:
      return "/egov-ui-framework/hrms/search-preview?role=approver&status=pending_approval&applicationNumber=" + applicationNumber + "&tenantId=" + tenantId;
  }
};
var getFeesEstimateCard = function getFeesEstimateCard(props) {
  var sourceJsonPath = props.sourceJsonPath,
      rest = (0, _objectWithoutProperties3.default)(props, ["sourceJsonPath"]);

  return {
    uiFramework: "custom-containers-local",
    componentPath: "EstimateCardContainer",
    props: (0, _extends3.default)({
      // estimate: {
      //   header,
      //   fees,
      //   extra
      // }
      sourceJsonPath: sourceJsonPath
    }, rest)
  };
};

exports.getFeesEstimateCard = getFeesEstimateCard;
var style = {
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

var getIconStyle = exports.getIconStyle = function getIconStyle(key) {
  return style[key];
};

var showHideAdhocPopup = exports.showHideAdhocPopup = function showHideAdhocPopup(state, dispatch) {
  var toggle = (0, _get2.default)(state.screenConfiguration.screenConfig["view"], "components.adhocDialog.props.open", false);
  dispatch((0, _actions2.handleScreenConfigurationFieldChange)("view", "components.adhocDialog", "props.open", !toggle));
};

var getButtonVisibility = exports.getButtonVisibility = function getButtonVisibility(status, button) {
  if (status === "pending_payment" && button === "PROCEED TO PAYMENT") return true;
  if (status === "pending_approval" && button === "APPROVE") return true;
  if (status === "pending_approval" && button === "REJECT") return true;
  if (status === "approved" && button === "CANCEL TRADE LICENSE") return true;
  return false;
};

var commonTransform = exports.commonTransform = function commonTransform(object, path) {
  var data = (0, _get2.default)(object, path);
  var transformedData = {};
  data.map(function (a) {
    var splitList = a.code.split(".");
    var ipath = "";
    for (var i = 0; i < splitList.length; i += 1) {
      if (i != splitList.length - 1) {
        if (!(splitList[i] in (ipath === "" ? transformedData : (0, _get2.default)(transformedData, ipath)))) {
          (0, _set2.default)(transformedData, ipath === "" ? splitList[i] : ipath + "." + splitList[i], i < splitList.length - 2 ? {} : []);
        }
      } else {
        (0, _get2.default)(transformedData, ipath).push(a);
      }
      ipath = splitList.slice(0, i + 1).join(".");
    }
  });
  (0, _set2.default)(object, path, transformedData);
  return object;
};

var objectToDropdown = exports.objectToDropdown = function objectToDropdown(object) {
  var dropDown = [];
  for (var variable in object) {
    if (object.hasOwnProperty(variable)) {
      dropDown.push({ code: variable });
    }
  }
  return dropDown;
};

// Prepare dropdown data with object as value from array
var objectArrayToDropdown = exports.objectArrayToDropdown = function objectArrayToDropdown(objectArray, labelName) {
  return objectArray.map(function (item) {
    if (item.hasOwnProperty(labelName)) return { name: item[labelName], value: JSON.stringify(item) };
  });

  // let dropDown = [];
  // for (var item in objectArray) {
  //   console.log(item);
  //   if (item.hasOwnProperty(labelName)) {
  //     dropDown.push({ label: item.labelName, value: item });
  //   }
  // }
  // return dropDown;
};

// Search API call
var getSearchResults = exports.getSearchResults = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(queryObject) {
    var response;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return (0, _api.httpRequest)("post", "/tl-services/v1/_search", "", queryObject);

          case 3:
            response = _context.sent;
            return _context.abrupt("return", response);

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);

            console.log(_context.t0);
            return _context.abrupt("return", {});

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 7]]);
  }));

  return function getSearchResults(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

var getBill = exports.getBill = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(queryObject) {
    var response;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return (0, _api.httpRequest)("post", "/tl-calculator/v1/_getbill", "", queryObject);

          case 3:
            response = _context2.sent;
            return _context2.abrupt("return", response);

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);

            console.log(_context2.t0);

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[0, 7]]);
  }));

  return function getBill(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

var getReceipt = exports.getReceipt = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(queryObject) {
    var response;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return (0, _api.httpRequest)("post", "/collection-services/receipts/_search", "", queryObject);

          case 3:
            response = _context3.sent;
            return _context3.abrupt("return", response);

          case 7:
            _context3.prev = 7;
            _context3.t0 = _context3["catch"](0);

            console.log(_context3.t0);

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[0, 7]]);
  }));

  return function getReceipt(_x4) {
    return _ref4.apply(this, arguments);
  };
}();

var convertEpochToDate = exports.convertEpochToDate = function convertEpochToDate(dateEpoch) {
  var dateFromApi = new Date(dateEpoch);
  var month = dateFromApi.getMonth() + 1;
  var day = dateFromApi.getDate();
  var year = dateFromApi.getFullYear();
  month = (month > 9 ? "" : "0") + month;
  day = (day > 9 ? "" : "0") + day;
  return day + "/" + month + "/" + year;
};

var convertDateToEpoch = exports.convertDateToEpoch = function convertDateToEpoch(dateString) {
  var dayStartOrEnd = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "dayend";

  //example input format : "2018-10-02"
  try {
    var parts = dateString.match(/(\d{4})-(\d{1,2})-(\d{1,2})/);
    var DateObj = new Date(Date.UTC(parts[1], parts[2] - 1, parts[3]));
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

var convertDateTimeToEpoch = exports.convertDateTimeToEpoch = function convertDateTimeToEpoch(dateTimeString) {
  //example input format : "26-07-2018 17:43:21"
  try {
    // const parts = dateTimeString.match(
    //   /(\d{2})\-(\d{2})\-(\d{4}) (\d{2}):(\d{2}):(\d{2})/
    // );
    var parts = dateTimeString.match(/(\d{2})-(\d{2})-(\d{4}) (\d{2}):(\d{2}):(\d{2})/);
    return Date.UTC(+parts[3], parts[2] - 1, +parts[1], +parts[4], +parts[5]);
  } catch (e) {
    return dateTimeString;
  }
};

var getReceiptData = exports.getReceiptData = function () {
  var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(queryObject) {
    var response;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return (0, _api.httpRequest)("post", "collection-services/receipts/_search", "", queryObject);

          case 3:
            response = _context4.sent;
            return _context4.abrupt("return", response);

          case 7:
            _context4.prev = 7;
            _context4.t0 = _context4["catch"](0);

            console.log(_context4.t0);
            return _context4.abrupt("return", {});

          case 11:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, undefined, [[0, 7]]);
  }));

  return function getReceiptData(_x6) {
    return _ref5.apply(this, arguments);
  };
}();

var getAutoSelector = exports.getAutoSelector = function getAutoSelector(textScheama) {
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

var getMapLocator = exports.getMapLocator = function getMapLocator(textSchema) {
  return {
    uiFramework: "custom-molecules-local",
    componentPath: "MapLocator",
    props: {}
  };
};

var showHideMapPopup = exports.showHideMapPopup = function showHideMapPopup(state, dispatch) {
  var toggle = (0, _get2.default)(state.screenConfiguration.screenConfig["apply"], "components.div.children.formwizardFirstStep.children.tradeLocationDetails.children.cardContent.children.mapsDialog.props.open", false);
  dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.tradeLocationDetails.children.cardContent.children.mapsDialog", "props.open", !toggle));
};

var getHeaderSideText = exports.getHeaderSideText = function getHeaderSideText(status) {
  var licenseNo = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  switch (status) {
    case "PAID":
      return { word1: "Status: ", word2: "Pending Approval" };
    case "APPLIED":
      return { word1: "Status: ", word2: "Pending Payment" };
    case "REJECTED":
      return { word1: "Status: ", word2: "Application Rejected" };
    case "CANCELLED":
      return { word1: "Trade License No: ", word2: "" + licenseNo };
    case "APPROVED":
      return { word1: "Trade License No: ", word2: "" + licenseNo };
    default:
      return { word1: "", word2: "" };
  }
};

//const nestedLevelScheama = ["Major", "Minor", "Subminor", "Details"];
//applyScreenMdmsData.MdmsRes.TradeLicense.TradeType
// const reTrasnformerForNestedDropDown = (
//   originaJsonPath,
//   value,
//   state,
//   dispatch
// ) => {
//   let nestedValues = value.split(".");
//   while (nestedValues.length > 1) {
//     const originalNestedValues = value.split(".");
//     const originalObject = get(state, `${originaJsonPath}`);
//     nestedValues = value.split(".");
//     const targetLevel = nestedValues.pop();
//     const targetpath = nestedValues.join(".");
//     let targetValues = get(originalObject, `${targetpath}`, []);
//     targetValues =
//       targetValues.length && targetValues.length >= 0
//         ? targetValues
//         : objectToDropdown(targetValues);

//     dispatch(
//       prepareFinalObject(
//         `${targetpath}.${nestedLevelScheama[nestedValues.length + 1]}`,
//         targetValues
//       )
//     );
//   }
// };

var getMdmsData = exports.getMdmsData = function () {
  var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(queryObject) {
    var response;
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return (0, _api.httpRequest)("post", "egov-mdms-service/v1/_get", "", queryObject);

          case 3:
            response = _context5.sent;
            return _context5.abrupt("return", response);

          case 7:
            _context5.prev = 7;
            _context5.t0 = _context5["catch"](0);

            console.log(_context5.t0);
            return _context5.abrupt("return", {});

          case 11:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, undefined, [[0, 7]]);
  }));

  return function getMdmsData(_x8) {
    return _ref6.apply(this, arguments);
  };
}();

var getDetailsFromProperty = exports.getDetailsFromProperty = function () {
  var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(state, dispatch) {
    var propertyId, cityId, tenantId, payload;
    return _regenerator2.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            propertyId = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Licenses[0].propertyId", "");
            cityId = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Licenses[0].tradeLicenseDetail.address.tenantId", "");
            tenantId = ifUserRoleExists("CITIZEN") ? cityId : localStorage.getItem("tenant-id");

            if (tenantId) {
              _context6.next = 7;
              break;
            }

            dispatch((0, _actions.toggleSnackbarAndSetText)(true, "Please select city to search by property id !!", "warning"));
            return _context6.abrupt("return");

          case 7:
            if (!propertyId) {
              _context6.next = 12;
              break;
            }

            _context6.next = 10;
            return (0, _api.httpRequest)("post", "/pt-services-v2/property/_search?tenantId=" + tenantId + "&ids=" + propertyId, "_search", [], {});

          case 10:
            payload = _context6.sent;

            if (payload && payload.Properties && payload.Properties.hasOwnProperty("length")) {
              if (payload.Properties.length === 0) {
                dispatch((0, _actions.toggleSnackbarAndSetText)(true, "Property is not found with this Property Id", "info"));
                dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.tradeLocationDetails.children.cardContent.children.tradeDetailsConatiner.children.tradeLocPropertyID", "props.value", ""));
              } else {
                dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.tradeLocationDetails.children.cardContent.children.tradeDetailsConatiner.children.tradeLocMohalla", "props.value", {
                  value: payload.Properties[0].address.locality.code,
                  label: payload.Properties[0].address.locality.name
                }));
                dispatch((0, _actions2.prepareFinalObject)("Licenses[0].tradeLicenseDetail.address", payload.Properties[0].address));
                dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.tradeLocationDetails.children.cardContent.children.tradeDetailsConatiner.children.tradeLocCity.children.cityDropdown", "props.value", payload.Properties[0].address.tenantId));
              }
            }

          case 12:
            _context6.next = 17;
            break;

          case 14:
            _context6.prev = 14;
            _context6.t0 = _context6["catch"](0);

            console.log(_context6.t0);

          case 17:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, undefined, [[0, 14]]);
  }));

  return function getDetailsFromProperty(_x9, _x10) {
    return _ref7.apply(this, arguments);
  };
}();

var getDetailsForOwner = exports.getDetailsForOwner = function () {
  var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(state, dispatch, fieldInfo) {
    var cardIndex, ownerNo, owners, currentNumber, numbers, payload, userInfo;
    return _regenerator2.default.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            cardIndex = fieldInfo && fieldInfo.index ? fieldInfo.index : "0";
            ownerNo = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Licenses[0].tradeLicenseDetail.owners[" + cardIndex + "].mobileNumber", "");
            owners = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Licenses[0].tradeLicenseDetail.owners", []);

            if (!(owners && owners.length > 1)) {
              _context7.next = 10;
              break;
            }

            currentNumber = owners[cardIndex].mobileNumber;
            numbers = owners.filter(function (item) {
              return currentNumber === item.mobileNumber;
            });

            if (!(numbers.length > 1)) {
              _context7.next = 10;
              break;
            }

            dispatch((0, _actions.toggleSnackbarAndSetText)(true, "Owner already added !", "error"));
            return _context7.abrupt("return");

          case 10:
            _context7.next = 12;
            return (0, _api.httpRequest)("post", "/user/_search?tenantId=pb", "_search", [], {
              tenantId: "pb",
              userName: "" + ownerNo
            });

          case 12:
            payload = _context7.sent;

            if (payload && payload.user && payload.user.hasOwnProperty("length")) {
              if (payload.user.length === 0) {
                dispatch((0, _actions.toggleSnackbarAndSetText)(true, "This mobile number is not registered !", "info"));
              } else {
                userInfo = payload.user && payload.user[0] && JSON.parse(JSON.stringify(payload.user[0]));

                if (userInfo && userInfo.createdDate) {
                  userInfo.createdDate = convertDateTimeToEpoch(userInfo.createdDate);
                  userInfo.lastModifiedDate = convertDateTimeToEpoch(userInfo.lastModifiedDate);
                  userInfo.pwdExpiryDate = convertDateTimeToEpoch(userInfo.pwdExpiryDate);
                }
                dispatch((0, _actions2.prepareFinalObject)("Licenses[0].tradeLicenseDetail.owners[" + cardIndex + "]", userInfo));
              }
            }
            _context7.next = 19;
            break;

          case 16:
            _context7.prev = 16;
            _context7.t0 = _context7["catch"](0);

            dispatch((0, _actions.toggleSnackbarAndSetText)(true, _context7.t0.message, "info"));

          case 19:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, undefined, [[0, 16]]);
  }));

  return function getDetailsForOwner(_x11, _x12, _x13) {
    return _ref8.apply(this, arguments);
  };
}();

// Get user data from uuid API call
var getUserDataFromUuid = exports.getUserDataFromUuid = function () {
  var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8(bodyObject) {
    var response;
    return _regenerator2.default.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            _context8.next = 3;
            return (0, _api.httpRequest)("post", "/user/_search", "", [], bodyObject);

          case 3:
            response = _context8.sent;
            return _context8.abrupt("return", response);

          case 7:
            _context8.prev = 7;
            _context8.t0 = _context8["catch"](0);

            console.log(_context8.t0);
            return _context8.abrupt("return", {});

          case 11:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, undefined, [[0, 7]]);
  }));

  return function getUserDataFromUuid(_x14) {
    return _ref9.apply(this, arguments);
  };
}();

var getStatementForDocType = function getStatementForDocType(docType) {
  switch (docType) {
    case "OWNERIDPROOF":
      return "Allowed documents are Aadhar Card / Voter ID Card / Driving License";
    case "OWNERSHIPPROOF":
      return "Allowed documents are Rent Deed / Lease Doc / Property Registry / General or Special Power of Attorney";
    default:
      return "";
  }
};

var prepareDocumentTypeObj = exports.prepareDocumentTypeObj = function prepareDocumentTypeObj(documents) {
  var documentsArr = documents.length > 0 ? documents.reduce(function (documentsArr, item, ind) {
    documentsArr.push({
      name: item,
      required: true,
      jsonPath: "Licenses[0].tradeLicenseDetail.applicationDocuments[" + ind + "]",
      statement: getStatementForDocType(item)
    });
    return documentsArr;
  }, []) : [];
  return documentsArr;
};

//Common functions for Estimate card

var getTaxValue = function getTaxValue(item) {
  return item ? item.debitAmount ? -Math.abs(item.debitAmount) : item.crAmountToBePaid ? item.crAmountToBePaid : 0 : 0;
};

var getToolTipInfo = function getToolTipInfo(taxHead, LicenseData) {
  switch (taxHead) {
    case "TL_ADHOC_PENALTY":
      return (0, _get2.default)(LicenseData, "tradeLicenseDetail.adhocPenaltyReason");
    case "TL_ADHOC_REBATE":
      return (0, _get2.default)(LicenseData, "tradeLicenseDetail.adhocExemptionReason");
    default:
      return "";
  }
};

var getEstimateData = function getEstimateData(Bill, getFromReceipt, LicenseData) {
  if (Bill && Bill.length) {
    var extraData = ["Rebate", "Penalty"].map(function (item) {
      return {
        name: {
          labelName: item,
          labelKey: item
        },
        value: null,
        info: getToolTipInfo(item, LicenseData) && {
          labelName: getToolTipInfo(item, LicenseData),
          labelKey: getToolTipInfo(item, LicenseData)
        }
      };
    });
    var billAccountDetails = Bill[0].billDetails[0].billAccountDetails;

    var transformedData = billAccountDetails.reduce(function (result, item) {
      if (getFromReceipt) {
        item.accountDescription && result.push({
          name: {
            labelName: item.accountDescription.split("-")[0],
            labelKey: item.accountDescription.split("-")[0]
          },
          value: getTaxValue(item),
          info: getToolTipInfo(item.accountDescription.split("-")[0], LicenseData) && {
            labelName: getToolTipInfo(item.accountDescription.split("-")[0], LicenseData),
            labelKey: getToolTipInfo(item.accountDescription.split("-")[0], LicenseData)
          }
        });
      } else {
        item.taxHeadCode && result.push({
          name: {
            labelName: item.taxHeadCode,
            labelKey: item.taxHeadCode
          },
          value: getTaxValue(item),
          info: getToolTipInfo(item.taxHeadCode, LicenseData) && {
            labelName: getToolTipInfo(item.taxHeadCode, LicenseData),
            labelKey: getToolTipInfo(item.taxHeadCode, LicenseData)
          }
        });
      }
      return result;
    }, []);
    return [].concat((0, _toConsumableArray3.default)(transformedData.filter(function (item) {
      return item.name.labelKey === "TL_TAX";
    })), (0, _toConsumableArray3.default)(transformedData.filter(function (item) {
      return item.name.labelKey !== "TL_TAX";
    })), (0, _toConsumableArray3.default)(extraData));
  }
};

var getBillingSlabData = function () {
  var _ref10 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9(dispatch, billingSlabIds, tenantId) {
    var _ref11, accesssoryBillingSlabIds, tradeTypeBillingSlabIds, accessoryUnit, tradeUnit, billingData, queryObject, response, tradeTotal, accessoriesTotal, finalData, accessoryData, tradeUnitData;

    return _regenerator2.default.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _ref11 = billingSlabIds || {}, accesssoryBillingSlabIds = _ref11.accesssoryBillingSlabIds, tradeTypeBillingSlabIds = _ref11.tradeTypeBillingSlabIds;

            if (!(accesssoryBillingSlabIds || tradeTypeBillingSlabIds)) {
              _context9.next = 18;
              break;
            }

            accessoryUnit = accesssoryBillingSlabIds && accesssoryBillingSlabIds.reduce(function (result, item) {
              result.push(item.split("|")[0]);
              return result;
            }, []);
            tradeUnit = tradeTypeBillingSlabIds && tradeTypeBillingSlabIds.reduce(function (result, item) {
              result.push(item.split("|")[0]);
              return result;
            }, []);
            billingData = tradeUnit && [].concat((0, _toConsumableArray3.default)(tradeUnit));

            accessoryUnit && (billingData = [].concat((0, _toConsumableArray3.default)(billingData), (0, _toConsumableArray3.default)(accessoryUnit)));
            queryObject = [{ key: "tenantId", value: tenantId }, { key: "ids", value: billingData && billingData.join(",") }];
            _context9.next = 9;
            return (0, _api.httpRequest)("post", "/tl-calculator/billingslab/_search", "", queryObject);

          case 9:
            response = _context9.sent;
            tradeTotal = 0;
            accessoriesTotal = 0;
            finalData = response && response.billingSlab.reduce(function (result, item) {
              if (item.tradeType) {
                tradeTotal = tradeTotal + item.rate;
                result.tradeUnitData.push({
                  rate: item.rate,
                  category: item.tradeType,
                  type: "trade"
                });
              } else {
                accessoriesTotal = accessoriesTotal + item.rate;
                result.accessoryData.push({
                  rate: item.rate,
                  category: item.accessoryCategory,
                  type: "accessories"
                });
              }
              return result;
            }, { tradeUnitData: [], accessoryData: [] });
            accessoryData = finalData.accessoryData, tradeUnitData = finalData.tradeUnitData;

            dispatch((0, _actions2.prepareFinalObject)("LicensesTemp[0].billingSlabData.tradeUnitData", tradeUnitData));
            dispatch((0, _actions2.prepareFinalObject)("LicensesTemp[0].billingSlabData.tradeTotal", tradeTotal));
            dispatch((0, _actions2.prepareFinalObject)("LicensesTemp[0].billingSlabData.accessoriesUnitData", accessoryData));
            dispatch((0, _actions2.prepareFinalObject)("LicensesTemp[0].billingSlabData.accessoriesTotal", accessoriesTotal));

          case 18:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, undefined);
  }));

  return function getBillingSlabData(_x15, _x16, _x17) {
    return _ref10.apply(this, arguments);
  };
}();

var createEstimateData = exports.createEstimateData = function () {
  var _ref12 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee10(LicenseData, jsonPath, dispatch) {
    var href = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    var getFromReceipt = arguments[4];
    var applicationNo, tenantId, businessService, queryObj, payload, estimateData, event;
    return _regenerator2.default.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            applicationNo = (0, _get2.default)(LicenseData, "applicationNumber") || (0, _commons.getQueryArg)(href, "applicationNumber");
            tenantId = (0, _get2.default)(LicenseData, "tenantId") || (0, _commons.getQueryArg)(href, "tenantId");
            businessService = "TL"; //Hardcoding Alert

            queryObj = [{ key: "tenantId", value: tenantId }, {
              key: "consumerCode",
              value: applicationNo
            }, {
              key: "businessService",
              value: businessService
            }];

            if (!getFromReceipt) {
              _context10.next = 10;
              break;
            }

            _context10.next = 7;
            return getReceipt(queryObj.filter(function (item) {
              return item.key !== "businessService";
            }));

          case 7:
            _context10.t0 = _context10.sent;
            _context10.next = 13;
            break;

          case 10:
            _context10.next = 12;
            return getBill(queryObj);

          case 12:
            _context10.t0 = _context10.sent;

          case 13:
            payload = _context10.t0;
            estimateData = payload ? getFromReceipt ? getEstimateData(payload.Receipt[0].Bill, getFromReceipt, LicenseData) : payload.billResponse && getEstimateData(payload.billResponse.Bill, false, LicenseData) : [];

            dispatch((0, _actions2.prepareFinalObject)(jsonPath, estimateData));
            payload.billingSlabIds && getBillingSlabData(dispatch, payload.billingSlabIds, tenantId);

            /** Waiting for estimate to load while downloading confirmation form */
            event = new CustomEvent("estimateLoaded", { detail: true });

            window.parent.document.dispatchEvent(event);
            /** END */

            return _context10.abrupt("return", payload);

          case 20:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10, undefined);
  }));

  return function createEstimateData(_x18, _x19, _x20) {
    return _ref12.apply(this, arguments);
  };
}();

var getCurrentFinancialYear = exports.getCurrentFinancialYear = function getCurrentFinancialYear() {
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

var validateFields = exports.validateFields = function validateFields(objectJsonPath, state, dispatch) {
  var screen = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "apply";

  var fields = (0, _get2.default)(state.screenConfiguration.screenConfig[screen], objectJsonPath, {});
  var isFormValid = true;
  for (var variable in fields) {
    if (fields.hasOwnProperty(variable)) {
      if (fields[variable] && fields[variable].props && (fields[variable].props.disabled === undefined || !fields[variable].props.disabled) && !(0, _utils2.validate)(screen, (0, _extends3.default)({}, fields[variable], {
        value: (0, _get2.default)(state.screenConfiguration.preparedFinalObject, fields[variable].jsonPath)
      }), dispatch, true)) {
        isFormValid = false;
      }
    }
  }
  return isFormValid;
};

var epochToYmdDate = exports.epochToYmdDate = function epochToYmdDate(et) {
  if (!et) return null;
  if (typeof et === "string") return et;
  var date = new Date(et);
  var formattedDate = date.toISOString().match(/(\d{4}\-\d{2}\-\d{2})/);
  return formattedDate[0];
};

var getTodaysDateInYMD = exports.getTodaysDateInYMD = function getTodaysDateInYMD() {
  var date = new Date();
  //date = date.valueOf();
  var month = date.getMonth() + 1;
  var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  date = date.getFullYear() + "-" + month + "-" + day;
  // date = epochToYmdDate(date);
  return date;
};

var getNextMonthDateInYMD = exports.getNextMonthDateInYMD = function getNextMonthDateInYMD() {
  //For getting date of same day but of next month
  var date = getTodaysDateInYMD();
  date = date.substring(0, 5) + (parseInt(date.substring(5, 7)) + 1) + date.substring(7, 10);
  return date;
};

var getFinancialYearDates = exports.getFinancialYearDates = function getFinancialYearDates(format, et) {
  /** Return the starting date and ending date (1st April to 31st March)
   *  of the financial year of the given date in ET. If no ET given then
   *  return the dates for the current financial year */
  var date = !et ? new Date() : new Date(et);
  var curMonth = date.getMonth();
  var financialDates = { startDate: "NA", endDate: "NA" };
  if (curMonth > 3) {
    switch (format) {
      case "dd/mm/yyyy":
        financialDates.startDate = "01/04/" + date.getFullYear().toString();
        financialDates.endDate = "31/03/" + (date.getFullYear() + 1).toString();
        break;
      case "yyyy-mm-dd":
        financialDates.startDate = date.getFullYear().toString() + "-04-01";
        financialDates.endDate = (date.getFullYear() + 1).toString() + "-03-31";
        break;
    }
  } else {
    switch (format) {
      case "dd/mm/yyyy":
        financialDates.startDate = "01/04/" + (date.getFullYear() - 1).toString();
        financialDates.endDate = "31/03/" + date.getFullYear().toString();
        break;
      case "yyyy-mm-dd":
        financialDates.startDate = (date.getFullYear() - 1).toString() + "-04-01";
        financialDates.endDate = date.getFullYear().toString() + "-03-31";
        break;
    }
  }
  return financialDates;
};

var getBaseURL = exports.getBaseURL = function getBaseURL() {
  if (process.env.REACT_APP_NAME !== "Citizen") {
    return "/egov-ui-framework/hrms";
  } else {
    return "/egov-ui-framework/tradelicense-citizen";
  }
};

var fetchBill = exports.fetchBill = function () {
  var _ref13 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee11(action, state, dispatch) {
    var queryObject, LicensesPayload, payload;
    return _regenerator2.default.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            //For Adhoc
            // Search License
            queryObject = [{ key: "tenantId", value: (0, _commons.getQueryArg)(window.location.href, "tenantId") }, {
              key: "applicationNumber",
              value: (0, _commons.getQueryArg)(window.location.href, "applicationNumber")
            }];
            _context11.next = 3;
            return getSearchResults(queryObject);

          case 3:
            LicensesPayload = _context11.sent;
            _context11.t0 = LicensesPayload && LicensesPayload.Licenses;

            if (!_context11.t0) {
              _context11.next = 9;
              break;
            }

            _context11.next = 8;
            return createEstimateData(LicensesPayload.Licenses[0], "LicensesTemp[0].estimateCardData", dispatch, window.location.href);

          case 8:
            _context11.t0 = _context11.sent;

          case 9:
            payload = _context11.t0;

            //set in redux to be used for adhoc
            LicensesPayload && LicensesPayload.Licenses && dispatch((0, _actions2.prepareFinalObject)("Licenses[0]", LicensesPayload.Licenses[0]));

            //initiate receipt object
            payload && payload.billResponse && dispatch((0, _actions2.prepareFinalObject)("ReceiptTemp[0].Bill[0]", payload.billResponse.Bill[0]));

            //set amount paid as total amount from bill
            payload && payload.billResponse && dispatch((0, _actions2.prepareFinalObject)("ReceiptTemp[0].Bill[0].billDetails[0].amountPaid", payload.billResponse.Bill[0].billDetails[0].totalAmount));

            //set total amount in instrument
            payload && payload.billResponse && dispatch((0, _actions2.prepareFinalObject)("ReceiptTemp[0].instrument.amount", payload.billResponse.Bill[0].billDetails[0].totalAmount));

            //Initially select instrument type as Cash
            dispatch((0, _actions2.prepareFinalObject)("ReceiptTemp[0].instrument.instrumentType.name", "Cash"));

            //set tenantId
            dispatch((0, _actions2.prepareFinalObject)("ReceiptTemp[0].tenantId", (0, _commons.getQueryArg)(window.location.href, "tenantId")));

            //set tenantId in instrument
            dispatch((0, _actions2.prepareFinalObject)("ReceiptTemp[0].instrument.tenantId", (0, _commons.getQueryArg)(window.location.href, "tenantId")));

          case 17:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11, undefined);
  }));

  return function fetchBill(_x23, _x24, _x25) {
    return _ref13.apply(this, arguments);
  };
}();

var setMultiOwnerForSV = exports.setMultiOwnerForSV = function setMultiOwnerForSV(action, isIndividual) {
  if (isIndividual) {
    (0, _set2.default)(action, "screenConfig.components.div.children.tradeReviewDetails.children.cardContent.children.reviewOwnerDetails.children.cardContent.children.multiOwner.visible", true);
    (0, _set2.default)(action, "screenConfig.components.div.children.tradeReviewDetails.children.cardContent.children.reviewOwnerDetails.children.cardContent.children.multiOwnerInstitutional.visible", false);
  } else {
    (0, _set2.default)(action, "screenConfig.components.div.children.tradeReviewDetails.children.cardContent.children.reviewOwnerDetails.children.cardContent.children.multiOwner.visible", false);
    (0, _set2.default)(action, "screenConfig.components.div.children.tradeReviewDetails.children.cardContent.children.reviewOwnerDetails.children.cardContent.children.multiOwnerInstitutional.visible", true);
  }
};

var setMultiOwnerForApply = exports.setMultiOwnerForApply = function setMultiOwnerForApply(state, isIndividual) {
  if (isIndividual) {
    (0, _set2.default)(state, "screenConfiguration.screenConfig.apply.components.div.children.formwizardFourthStep.children.tradeReviewDetails.children.cardContent.children.reviewOwnerDetails.children.cardContent.children.multiOwner.visible", true);
    (0, _set2.default)(state, "screenConfiguration.screenConfig.apply.components.div.children.formwizardFourthStep.children.tradeReviewDetails.children.cardContent.children.reviewOwnerDetails.children.cardContent.children.multiOwnerInstitutional.visible", false);
  } else {
    (0, _set2.default)(state, "screenConfiguration.screenConfig.apply.components.div.children.formwizardFourthStep.children.tradeReviewDetails.children.cardContent.children.reviewOwnerDetails.children.cardContent.children.multiOwner.visible", false);
    (0, _set2.default)(state, "screenConfiguration.screenConfig.apply.components.div.children.formwizardFourthStep.children.tradeReviewDetails.children.cardContent.children.reviewOwnerDetails.children.cardContent.children.multiOwnerInstitutional.visible", true);
  }
};

var setValidToFromVisibilityForSV = exports.setValidToFromVisibilityForSV = function setValidToFromVisibilityForSV(action, value) {
  if (value === "PERMANENT") {
    (0, _set2.default)(action, "screenConfig.components.div.children.tradeReviewDetails.children.cardContent.children.reviewTradeDetails.children.cardContent.children.viewOne.children.reviewToDate.visible", false);
    (0, _set2.default)(action, "screenConfig.components.div.children.tradeReviewDetails.children.cardContent.children.reviewTradeDetails.children.cardContent.children.viewOne.children.reviewFromDate.visible", false);
  } else {
    (0, _set2.default)(action, "screenConfig.components.div.children.tradeReviewDetails.children.cardContent.children.reviewTradeDetails.children.cardContent.children.viewOne.children.reviewToDate.visible", true);
    (0, _set2.default)(action, "screenConfig.components.div.children.tradeReviewDetails.children.cardContent.children.reviewTradeDetails.children.cardContent.children.viewOne.children.reviewFromDate.visible", true);
  }
};

var setValidToFromVisibilityForApply = exports.setValidToFromVisibilityForApply = function setValidToFromVisibilityForApply(state, value) {
  if (value === "PERMANENT") {
    (0, _set2.default)(state, "screenConfiguration.screenConfig.apply.components.div.children.formwizardFourthStep.children.tradeReviewDetails.children.cardContent.children.reviewTradeDetails.children.cardContent.children.viewOne.children.reviewToDate.visible", false);
    (0, _set2.default)(state, "screenConfiguration.screenConfig.apply.components.div.children.formwizardFourthStep.children.tradeReviewDetails.children.cardContent.children.reviewTradeDetails.children.cardContent.children.viewOne.children.reviewFromDate.visible", false);
  } else {
    (0, _set2.default)(state, "screenConfiguration.screenConfig.apply.components.div.children.formwizardFourthStep.children.tradeReviewDetails.children.cardContent.children.reviewTradeDetails.children.cardContent.children.viewOne.children.reviewToDate.visible", true);
    (0, _set2.default)(state, "screenConfiguration.screenConfig.apply.components.div.children.formwizardFourthStep.children.tradeReviewDetails.children.cardContent.children.reviewTradeDetails.children.cardContent.children.viewOne.children.reviewFromDate.visible", true);
  }
};

var ifUserRoleExists = exports.ifUserRoleExists = function ifUserRoleExists(role) {
  var userInfo = JSON.parse(localStorage.getItem("user-info"));
  var roles = (0, _get2.default)(userInfo, "roles");
  var roleCodes = roles ? roles.map(function (role) {
    return role.code;
  }) : [];
  if (roleCodes.indexOf(role) > -1) {
    return true;
  } else return false;
};

var getTransformedStatus = exports.getTransformedStatus = function getTransformedStatus(status) {
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

var updateDropDowns = exports.updateDropDowns = function () {
  var _ref14 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee12(payload, action, state, dispatch, queryValue) {
    var structType, tradeTypes, tradeTypeDropdownData, tradeSubTypes;
    return _regenerator2.default.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            structType = (0, _get2.default)(payload, "Licenses[0].tradeLicenseDetail.structureType");

            if (structType) {
              (0, _set2.default)(payload, "LicensesTemp[0].tradeLicenseDetail.structureType", structType.split(".")[0]);
              try {
                dispatch((0, _actions2.prepareFinalObject)("applyScreenMdmsData.common-masters.StructureSubTypeTransformed", (0, _get2.default)(state.screenConfiguration.preparedFinalObject.applyScreenMdmsData["common-masters"], "StructureType." + structType.split(".")[0], [])));

                payload && dispatch((0, _actions2.prepareFinalObject)("LicensesTemp[0].tradeLicenseDetail.structureType", payload.LicensesTemp[0].tradeLicenseDetail.structureType));
              } catch (e) {
                console.log(e);
              }
            }

            tradeTypes = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "applyScreenMdmsData.TradeLicense.TradeType", []);
            // debugger;

            tradeTypeDropdownData = tradeTypes && Object.keys(tradeTypes).map(function (item) {
              return { code: item, active: true };
            });

            tradeTypeDropdownData && dispatch((0, _actions2.prepareFinalObject)("applyScreenMdmsData.TradeLicense.TradeTypeTransformed", tradeTypeDropdownData));
            tradeSubTypes = (0, _get2.default)(payload, "Licenses[0].tradeLicenseDetail.tradeUnits");


            if (tradeSubTypes.length > 0) {
              try {
                tradeSubTypes.forEach(function (tradeSubType, i) {
                  var tradeCat = tradeSubType.tradeType.split(".")[0];
                  var tradeType = tradeSubType.tradeType.split(".")[1];
                  (0, _set2.default)(payload, "LicensesTemp.tradeUnits[" + i + "].tradeType", tradeCat);
                  (0, _set2.default)(payload, "LicensesTemp.tradeUnits[" + i + "].tradeSubType", tradeType);

                  dispatch((0, _actions2.prepareFinalObject)("applyScreenMdmsData.TradeLicense.TradeCategoryTransformed", objectToDropdown((0, _get2.default)(state.screenConfiguration.preparedFinalObject, "applyScreenMdmsData.TradeLicense.TradeType." + tradeCat, []))));

                  dispatch((0, _actions2.prepareFinalObject)("applyScreenMdmsData.TradeLicense.TradeSubCategoryTransformed", (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "applyScreenMdmsData.TradeLicense.TradeType." + tradeCat + "." + tradeType, [])));
                  payload && dispatch((0, _actions2.prepareFinalObject)("LicensesTemp.tradeUnits[" + i + "].tradeType", tradeCat));

                  payload && dispatch((0, _actions2.prepareFinalObject)("LicensesTemp.tradeUnits[" + i + "].tradeSubType", tradeType));
                });
              } catch (e) {
                console.log(e);
              }
            }
            setOwnerShipDropDownFieldChange(state, dispatch, payload);

          case 8:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12, undefined);
  }));

  return function updateDropDowns(_x26, _x27, _x28, _x29, _x30) {
    return _ref14.apply(this, arguments);
  };
}();

var getDocList = exports.getDocList = function getDocList(state, dispatch) {
  var tradeSubTypes = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Licenses[0].tradeLicenseDetail.tradeUnits");

  var tradeSubCategories = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "applyScreenMdmsData.TradeLicense.MdmsTradeType");
  var selectedTypes = [];
  tradeSubTypes.forEach(function (tradeSubType) {
    selectedTypes.push((0, _filter2.default)(tradeSubCategories, {
      code: tradeSubType.tradeType
    }));
  });

  // selectedTypes[0] &&
  //
  var applicationDocArray = [];

  selectedTypes.forEach(function (tradeSubTypeDoc) {
    applicationDocArray = [].concat((0, _toConsumableArray3.default)(applicationDocArray), (0, _toConsumableArray3.default)(tradeSubTypeDoc[0].applicationDocument));
  });
  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
  applicationDocArray = applicationDocArray.filter(onlyUnique);
  var applicationDocument = prepareDocumentTypeObj(applicationDocArray);
  dispatch((0, _actions2.prepareFinalObject)("LicensesTemp[0].applicationDocuments", applicationDocument));
};

var setOwnerShipDropDownFieldChange = exports.setOwnerShipDropDownFieldChange = function setOwnerShipDropDownFieldChange(state, dispatch, payload) {
  var tradeSubOwnershipCat = (0, _get2.default)(payload, "Licenses[0].tradeLicenseDetail.subOwnerShipCategory");
  var tradeOwnershipCat = "";
  if (tradeSubOwnershipCat) {
    tradeOwnershipCat = tradeSubOwnershipCat.split(".")[0];
  } else {
    tradeOwnershipCat = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "applyScreenMdmsData.common-masters.OwnerShipCategoryTransformed[0].code", "");
    tradeSubOwnershipCat = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "applyScreenMdmsData.common-masters.OwnerShipCategory." + tradeOwnershipCat + "[0].code", "");
    (0, _set2.default)(payload, "Licenses[0].tradeLicenseDetail.subOwnerShipCategory", tradeSubOwnershipCat);
    payload && dispatch((0, _actions2.prepareFinalObject)("Licenses[0].tradeLicenseDetail.subOwnerShipCategory", payload.Licenses[0].tradeLicenseDetail.subOwnerShipCategory));
  }

  (0, _set2.default)(payload, "LicensesTemp[0].tradeLicenseDetail.ownerShipCategory", tradeOwnershipCat);

  try {
    payload && dispatch((0, _actions2.prepareFinalObject)("LicensesTemp[0].tradeLicenseDetail.ownerShipCategory", payload.LicensesTemp[0].tradeLicenseDetail.ownerShipCategory));
    dispatch((0, _actions2.prepareFinalObject)("applyScreenMdmsData.common-masters.subOwnerShipCategoryTransformed", (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "applyScreenMdmsData.common-masters.OwnerShipCategory." + tradeOwnershipCat, [])));

    //handlefield for Type of OwnerShip while setting drop down values as beforeFieldChange won't be callled
    if (tradeOwnershipCat === "INDIVIDUAL") {
      dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardSecondStep.children.tradeOwnerDetails.children.cardContent.children.OwnerInfoCard", "visible", true));
      dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardSecondStep.children.tradeOwnerDetails.children.cardContent.children.ownerInfoInstitutional", "visible", false));
    } else {
      dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardSecondStep.children.tradeOwnerDetails.children.cardContent.children.OwnerInfoCard", "visible", false));
      dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardSecondStep.children.tradeOwnerDetails.children.cardContent.children.ownerInfoInstitutional", "visible", true));
    }

    //handlefield for type of sub ownership while setting drop down values as beforeFieldChange won't be callled

    if (tradeSubOwnershipCat === "INDIVIDUAL.SINGLEOWNER") {
      var ownerInfoCards = (0, _get2.default)(state.screenConfiguration.screenConfig.apply, //hardcoded to apply screen
      "components.div.children.formwizardSecondStep.children.tradeOwnerDetails.children.cardContent.children.OwnerInfoCard.props.items");
      dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardSecondStep.children.tradeOwnerDetails.children.cardContent.children.OwnerInfoCard", "props.hasAddItem", false));
      if (ownerInfoCards && ownerInfoCards.length > 1) {
        var singleCard = ownerInfoCards.slice(0, 1); //get the first element if multiple cards present

        dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardSecondStep.children.tradeOwnerDetails.children.cardContent.children.OwnerInfoCard", "props.items", singleCard));
        dispatch((0, _actions2.prepareFinalObject)("Licenses[0].tradeLicenseDetail.owners", (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Licenses[0].tradeLicenseDetail.owners").slice(0, 1)));
      }
    }

    if (tradeSubOwnershipCat === "INDIVIDUAL.MULTIPLEOWNERS") {
      dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardSecondStep.children.tradeOwnerDetails.children.cardContent.children.OwnerInfoCard", "props.hasAddItem", true));
    }
  } catch (e) {
    console.log(e);
  }
};

var showHideBreakupPopup = exports.showHideBreakupPopup = function showHideBreakupPopup(state, dispatch, screenKey) {
  var toggle = (0, _get2.default)(state.screenConfiguration.screenConfig[screenKey], "components.breakUpDialog.props.open", false);
  dispatch((0, _actions2.handleScreenConfigurationFieldChange)(screenKey, "components.breakUpDialog", "props.open", !toggle));
};
var getDialogButton = exports.getDialogButton = function getDialogButton(name, key, screenKey) {
  return {
    componentPath: "Button",
    props: {
      color: "primary",
      style: {}
    },
    children: {
      previousButtonLabel: (0, _utils.getLabel)({
        labelName: name,
        labelKey: key
      })
    },
    onClickDefination: {
      action: "condition",
      callBack: function callBack(state, dispatch) {
        showHideBreakupPopup(state, dispatch, screenKey);
      }
      //visible: false
    } };
};

var getAllBillingSlabs = function () {
  var _ref15 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee13(tenantId) {
    var payload;
    return _regenerator2.default.wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            _context13.next = 2;
            return (0, _api.httpRequest)("post", "/tl-calculator/billingslab/_search?tenantId=" + tenantId, "_search", [], {});

          case 2:
            payload = _context13.sent;
            return _context13.abrupt("return", payload);

          case 4:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13, undefined);
  }));

  return function getAllBillingSlabs(_x31) {
    return _ref15.apply(this, arguments);
  };
}();

var getAllDataFromBillingSlab = exports.getAllDataFromBillingSlab = function () {
  var _ref16 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee14(tenantId, dispatch) {
    var payload, processedData, accessories, structureTypes, licenseTypes;
    return _regenerator2.default.wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            _context14.next = 2;
            return getAllBillingSlabs(tenantId);

          case 2:
            payload = _context14.sent;
            processedData = payload.billingSlab && payload.billingSlab.reduce(function (acc, item) {
              var accessory = { active: true };
              var tradeType = { active: true };
              if (item.accessoryCategory && item.tradeType === null) {
                accessory.code = item.accessoryCategory;
                accessory.uom = item.uom;
                accessory.rate = item.rate;
                item.rate && item.rate > 0 && acc.accessories.push(accessory);
              } else if (item.accessoryCategory === null && item.tradeType) {
                tradeType.code = item.tradeType;
                tradeType.uom = item.uom;
                tradeType.structureType = item.structureType;
                tradeType.licenseType = item.licenseType;
                tradeType.rate = item.rate;
                !(0, _isUndefined2.default)(item.rate) && item.rate !== null && acc.tradeTypeData.push(tradeType);
              }
              return acc;
            }, { accessories: [], tradeTypeData: [] });
            accessories = getUniqueItemsFromArray(processedData.accessories, "code");
            structureTypes = getUniqueItemsFromArray(processedData.tradeTypeData, "structureType");

            structureTypes = commonTransform({
              StructureType: structureTypes.map(function (item) {
                return { code: item.structureType, active: true };
              })
            }, "StructureType");
            licenseTypes = getUniqueItemsFromArray(processedData.tradeTypeData, "licenseType");

            licenseTypes = licenseTypes.map(function (item) {
              return { code: item.licenseType, active: true };
            });
            dispatch((0, _actions2.prepareFinalObject)("applyScreenMdmsData.common-masters.StructureType", structureTypes.StructureType));
            dispatch((0, _actions2.prepareFinalObject)("applyScreenMdmsData.TradeLicense.AccessoriesCategory", accessories));
            dispatch((0, _actions2.prepareFinalObject)("applyScreenMdmsData.TradeLicense.licenseType", licenseTypes));
            dispatch((0, _actions2.prepareFinalObject)("applyScreenMdmsData.common-masters.StructureTypeTransformed", objectToDropdown(structureTypes.StructureType)));
            dispatch((0, _actions2.prepareFinalObject)("applyScreenMdmsData.TradeLicense.TradeType", processedData.tradeTypeData));

          case 14:
          case "end":
            return _context14.stop();
        }
      }
    }, _callee14, undefined);
  }));

  return function getAllDataFromBillingSlab(_x32, _x33) {
    return _ref16.apply(this, arguments);
  };
}();

var getUniqueItemsFromArray = exports.getUniqueItemsFromArray = function getUniqueItemsFromArray(data, identifier) {
  var uniqueArray = [];
  var map = new Map();
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var item = _step.value;

      if (!map.has(item[identifier])) {
        map.set(item[identifier], true); // set any value to Map
        uniqueArray.push(item);
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return uniqueArray;
};

var setFilteredTradeTypes = exports.setFilteredTradeTypes = function setFilteredTradeTypes(state, dispatch, licenseType, structureSubtype) {
  var tradeTypeBSlab = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.applyScreenMdmsData.TradeLicense.TradeType", []);
  var mdmsTradeTypes = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.applyScreenMdmsData.TradeLicense.MdmsTradeType", []);
  try {
    if (tradeTypeBSlab.length > 0 && mdmsTradeTypes.length > 0) {
      var mdmsTTTransformed = mdmsTradeTypes.reduce(function (acc, item) {
        item.code && (acc[item.code] = item);
        return acc;
      }, {});
      var tradeTypeList = [];
      tradeTypeBSlab.length > 0 && tradeTypeBSlab.forEach(function (item) {
        if (item.code && mdmsTTTransformed[item.code] && mdmsTTTransformed[item.code].applicationDocument) {
          tradeTypeList.push((0, _extends3.default)({}, item, {
            applicationDocument: mdmsTTTransformed[item.code].applicationDocument
          }));
        }
      });
      if (tradeTypeList && tradeTypeList.length > 0) {
        dispatch((0, _actions2.prepareFinalObject)("applyScreenMdmsData.TradeLicense.TradeType", tradeTypeList));
        var filteredList = tradeTypeList && tradeTypeList.length > 0 && tradeTypeList.filter(function (item) {
          if (item.licenseType === licenseType && item.structureType === structureSubtype) return true;
        });
        var tradeTypeTransformed = commonTransform({ TradeType: [].concat((0, _toConsumableArray3.default)(filteredList)) }, "TradeType");
        tradeTypeTransformed.TradeType && dispatch((0, _actions2.prepareFinalObject)("applyScreenMdmsData.TradeLicense.TradeType", tradeTypeTransformed.TradeType));
        return tradeTypeTransformed;
      }
    }
  } catch (e) {
    console.log(e);
  }
};

var showCityPicker = exports.showCityPicker = function showCityPicker(state, dispatch) {
  var toggle = (0, _get2.default)(state.screenConfiguration.screenConfig["home"], "components.cityPickerDialog.props.open", false);
  dispatch((0, _actions2.handleScreenConfigurationFieldChange)("home", "components.cityPickerDialog", "props.open", !toggle));
};

var applyForm = exports.applyForm = function applyForm(state, dispatch) {
  var tenantId = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "citiesByModule.citizenTenantId");

  var isTradeDetailsValid = validateFields("components.cityPickerDialog.children.dialogContent.children.popup.children.cityPicker.children", state, dispatch, "home");
  if (isTradeDetailsValid) {
    window.location.href = process.env.NODE_ENV === "development" ? "/egov-ui-framework/tradelicense-citizen/apply?tenantId=" + tenantId : "/hrms/egov-ui-framework/tradelicense-citizen/apply?tenantId=" + tenantId;
  }
};

var sortByEpoch = exports.sortByEpoch = function sortByEpoch(data, order) {
  if (order) {
    return data.sort(function (a, b) {
      return a[a.length - 1] - b[b.length - 1];
    });
  } else {
    return data.sort(function (a, b) {
      return b[b.length - 1] - a[a.length - 1];
    });
  }
};

var getEpochForDate = exports.getEpochForDate = function getEpochForDate(date) {
  var dateSplit = date.split("/");
  return new Date(dateSplit[2], dateSplit[1] - 1, dateSplit[0]).getTime();
};

// HRMS
var toggleDeactivateDialog = exports.toggleDeactivateDialog = function toggleDeactivateDialog(state, dispatch) {
  var toggle = (0, _get2.default)(state.screenConfiguration.screenConfig["view"], "components.deactivateEmployee.props.open", false);
  dispatch((0, _actions2.handleScreenConfigurationFieldChange)("view", "components.deactivateEmployee", "props.open", !toggle));
};