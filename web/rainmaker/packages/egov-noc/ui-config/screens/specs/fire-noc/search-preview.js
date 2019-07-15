"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _jsonpath = require("jsonpath");

var _jsonpath2 = _interopRequireDefault(_jsonpath);

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _set = require("lodash/set");

var _set2 = _interopRequireDefault(_set);

var _commons2 = require("../../../../ui-utils/commons");

var _applicantSummary = require("./summaryResource/applicantSummary");

var _documentsSummary = require("./summaryResource/documentsSummary");

var _estimateSummary = require("./summaryResource/estimateSummary");

var _nocSummary = require("./summaryResource/nocSummary");

var _propertySummary = require("./summaryResource/propertySummary");

var _index = require("../utils/index");

var _receiptTransformer = require("../utils/receiptTransformer");

var _actions2 = require("egov-ui-kit/redux/app/actions");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _receiptPdf = require("../utils/receiptPdf");

var _receiptPdf2 = _interopRequireDefault(_receiptPdf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var titlebar = (0, _utils.getCommonContainer)({
  header: (0, _utils.getCommonHeader)({
    labelName: "Task Details",
    labelKey: "NOC_TASK_DETAILS_HEADER"
  }),
  applicationNumber: {
    uiFramework: "custom-atoms-local",
    moduleName: "egov-noc",
    componentPath: "ApplicationNoContainer",
    props: {
      number: (0, _commons.getQueryArg)(window.location.href, "applicationNumber")
    }
  },
  downloadMenu: {
    uiFramework: "custom-atoms",
    componentPath: "MenuButton",
    props: {
      data: {
        label: "Download",
        leftIcon: "cloud_download",
        rightIcon: "arrow_drop_down",
        props: { variant: "outlined", style: { marginLeft: 10 } },
        menu: []
      }
    }
  },
  printMenu: {
    uiFramework: "custom-atoms",
    componentPath: "MenuButton",
    props: {
      data: {
        label: "Print",
        leftIcon: "print",
        rightIcon: "arrow_drop_down",
        props: { variant: "outlined", style: { marginLeft: 10 } },
        menu: []
      }
    }
  }
});

var prepareDocumentsView = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(state, dispatch) {
    var documentsPreview, firenoc, buildingDocuments, applicantDocuments, otherDocuments, allDocuments, fileStoreIds, fileUrls;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            documentsPreview = [];

            // Get all documents from response

            firenoc = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.FireNOCs[0]", {});
            buildingDocuments = _jsonpath2.default.query(firenoc, "$.fireNOCDetails.buildings.*.applicationDocuments.*");
            applicantDocuments = _jsonpath2.default.query(firenoc, "$.fireNOCDetails.applicantDetails.additionalDetail.documents.*");
            otherDocuments = _jsonpath2.default.query(firenoc, "$.fireNOCDetails.additionalDetail.documents.*");
            allDocuments = [].concat((0, _toConsumableArray3.default)(buildingDocuments), (0, _toConsumableArray3.default)(applicantDocuments), (0, _toConsumableArray3.default)(otherDocuments));


            allDocuments.forEach(function (doc) {
              documentsPreview.push({
                title: (0, _commons.getTransformedLocale)(doc.documentType),
                fileStoreId: doc.fileStoreId,
                linkText: "View"
              });
            });
            fileStoreIds = _jsonpath2.default.query(documentsPreview, "$.*.fileStoreId");

            if (!(fileStoreIds.length > 0)) {
              _context.next = 14;
              break;
            }

            _context.next = 11;
            return (0, _commons.getFileUrlFromAPI)(fileStoreIds);

          case 11:
            _context.t0 = _context.sent;
            _context.next = 15;
            break;

          case 14:
            _context.t0 = {};

          case 15:
            fileUrls = _context.t0;

            documentsPreview = documentsPreview.map(function (doc, index) {
              doc["link"] = fileUrls && fileUrls[doc.fileStoreId] && fileUrls[doc.fileStoreId].split(",")[0] || "";
              doc["name"] = fileUrls[doc.fileStoreId] && decodeURIComponent(fileUrls[doc.fileStoreId].split(",")[0].split("?")[0].split("/").pop().slice(13)) || "Document - " + (index + 1);
              return doc;
            });
            dispatch((0, _actions.prepareFinalObject)("documentsPreview", documentsPreview));

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function prepareDocumentsView(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var prepareUoms = function prepareUoms(state, dispatch) {
  var buildings = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.FireNOCs[0].fireNOCDetails.buildings", []);
  buildings.forEach(function (building, index) {
    var uoms = (0, _get2.default)(building, "uoms", []);
    var uomsMap = {};
    uoms.forEach(function (uom) {
      uomsMap[uom.code] = uom.value;
    });
    dispatch((0, _actions.prepareFinalObject)("FireNOCs[0].fireNOCDetails.buildings[" + index + "].uomsMap", uomsMap));
  });
};

// const prepareDocumentsUploadRedux = (state, dispatch) => {
//   dispatch(prepareFinalObject("documentsUploadRedux", documentsUploadRedux));
// };

var setDownloadMenu = function setDownloadMenu(state, dispatch) {
  /** MenuButton data based on status */
  var status = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.FireNOCs[0].fireNOCDetails.status");
  var downloadMenu = [];
  var printMenu = [];
  var certificateDownloadObject = {
    label: { labelName: "NOC Certificate", labelKey: "NOC_CERTIFICATE" },
    link: function link() {
      (0, _receiptPdf2.default)(state, dispatch, "certificate_download");
    },
    leftIcon: "book"
  };
  var certificatePrintObject = {
    label: { labelName: "NOC Certificate", labelKey: "NOC_CERTIFICATE" },
    link: function link() {
      (0, _receiptPdf2.default)(state, dispatch, "certificate_print");
    },
    leftIcon: "book"
  };
  var receiptDownloadObject = {
    label: { labelName: "Receipt", labelKey: "NOC_RECEIPT" },
    link: function link() {
      (0, _receiptPdf2.default)(state, dispatch, "receipt_download");
    },
    leftIcon: "receipt"
  };
  var receiptPrintObject = {
    label: { labelName: "Receipt", labelKey: "NOC_RECEIPT" },
    link: function link() {
      (0, _receiptPdf2.default)(state, dispatch, "receipt_print");
    },
    leftIcon: "receipt"
  };
  var applicationDownloadObject = {
    label: { labelName: "Application", labelKey: "NOC_APPLICATION" },
    link: function link() {
      (0, _receiptPdf2.default)(state, dispatch, "application_download");
    },
    leftIcon: "assignment"
  };
  var applicationPrintObject = {
    label: { labelName: "Application", labelKey: "NOC_APPLICATION" },
    link: function link() {
      (0, _receiptPdf2.default)(state, dispatch, "application_print");
    },
    leftIcon: "assignment"
  };
  switch (status) {
    case "APPROVED":
      downloadMenu = [certificateDownloadObject, receiptDownloadObject, applicationDownloadObject];
      printMenu = [certificatePrintObject, receiptPrintObject, applicationPrintObject];
      break;
    case "DOCUMENTVERIFY":
    case "FIELDINSPECTION":
      downloadMenu = [receiptDownloadObject, applicationDownloadObject];
      printMenu = [receiptPrintObject, applicationPrintObject];
      break;
    case "CANCELLED":
    case "REJECTED":
    case "PENDINGPAYMENT":
      downloadMenu = [applicationDownloadObject];
      printMenu = [applicationPrintObject];
      break;
    default:
      break;
  }
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("search-preview", "components.div.children.headerDiv.children.header.children.downloadMenu", "props.data.menu", downloadMenu));
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("search-preview", "components.div.children.headerDiv.children.header.children.printMenu", "props.data.menu", printMenu));
  /** END */
};

var setSearchResponse = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(state, dispatch, applicationNumber, tenantId) {
    var response;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _commons2.getSearchResults)([{
              key: "tenantId",
              value: tenantId
            }, { key: "applicationNumber", value: applicationNumber }]);

          case 2:
            response = _context2.sent;

            // const response = sampleSingleSearch();
            dispatch((0, _actions.prepareFinalObject)("FireNOCs", (0, _get2.default)(response, "FireNOCs", [])));
            prepareDocumentsView(state, dispatch);
            prepareUoms(state, dispatch);
            _context2.next = 8;
            return (0, _receiptTransformer.loadPdfGenerationData)(applicationNumber, tenantId);

          case 8:
            setDownloadMenu(state, dispatch);

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function setSearchResponse(_x3, _x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

var screenConfig = {
  uiFramework: "material-ui",
  name: "search-preview",
  beforeInitScreen: function beforeInitScreen(action, state, dispatch) {
    var applicationNumber = (0, _commons.getQueryArg)(window.location.href, "applicationNumber");
    var tenantId = (0, _commons.getQueryArg)(window.location.href, "tenantId");
    dispatch((0, _actions2.fetchLocalizationLabel)((0, _localStorageUtils.getLocale)(), tenantId, tenantId));
    (0, _index.searchBill)(dispatch, applicationNumber, tenantId);

    setSearchResponse(state, dispatch, applicationNumber, tenantId);

    // Hide edit buttons
    (0, _set2.default)(action, "screenConfig.components.div.children.body.children.cardContent.children.nocSummary.children.cardContent.children.header.children.editSection.visible", false);
    (0, _set2.default)(action, "screenConfig.components.div.children.body.children.cardContent.children.propertySummary.children.cardContent.children.header.children.editSection.visible", false);
    (0, _set2.default)(action, "screenConfig.components.div.children.body.children.cardContent.children.applicantSummary.children.cardContent.children.header.children.editSection.visible", false);
    (0, _set2.default)(action, "screenConfig.components.div.children.body.children.cardContent.children.documentsSummary.children.cardContent.children.header.children.editSection.visible", false);

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
            header: (0, _extends3.default)({
              gridDefination: {
                xs: 12,
                sm: 10
              }
            }, titlebar)
          }
        },
        taskStatus: {
          uiFramework: "custom-containers-local",
          componentPath: "WorkFlowContainer",
          moduleName: "egov-workflow",
          visible: process.env.REACT_APP_NAME === "Citizen" ? false : true,
          props: {
            dataPath: "FireNOCs",
            moduleName: "FIRENOC",
            updateUrl: "/firenoc-services/v1/_update"
          }
        },
        body: (0, _utils.getCommonCard)({
          estimateSummary: _estimateSummary.estimateSummary,
          nocSummary: _nocSummary.nocSummary,
          propertySummary: _propertySummary.propertySummary,
          applicantSummary: _applicantSummary.applicantSummary,
          documentsSummary: _documentsSummary.documentsSummary
        })
        // footer: footer
      }
    }
  }
};

exports.default = screenConfig;