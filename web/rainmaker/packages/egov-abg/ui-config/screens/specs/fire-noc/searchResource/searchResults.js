"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchResults = exports.textToLocalMapping = undefined;

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _columns;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require("react-router-dom");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _utils = require("../../utils");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getLocalTextFromCode = function getLocalTextFromCode(localCode) {
  return JSON.parse((0, _localStorageUtils.getLocalization)("localization_en_IN")).find(function (item) {
    return item.code === localCode;
  });
};

var textToLocalMapping = exports.textToLocalMapping = {
  "Application No": (0, _get2.default)(getLocalTextFromCode("NOC_COMMON_TABLE_COL_APP_NO"), "message", "Application No"),
  "NOC No": (0, _get2.default)(getLocalTextFromCode("NOC_COMMON_TABLE_COL_NOC_NO"), "message", "NOC No"),
  "Building Name": (0, _get2.default)(getLocalTextFromCode("NOC_COMMON_TABLE_COL_TRD_NAME"), "message", "Building Name"),
  "Owner Name": (0, _get2.default)(getLocalTextFromCode("NOC_COMMON_TABLE_COL_OWN_NAME"), "message", "Owner Name"),
  "Application Date": (0, _get2.default)(getLocalTextFromCode("NOC_COMMON_TABLE_COL_APP_DATE"), "message", "Application Date"),
  Status: (0, _get2.default)(getLocalTextFromCode("NOC_COMMON_TABLE_COL_STATUS"), "message", "Status"),
  INITIATED: (0, _get2.default)(getLocalTextFromCode("NOC_INITIATED"), "message", "INITIATED"),
  APPLIED: (0, _get2.default)(getLocalTextFromCode("NOC_APPLIED"), "message", "APPLIED"),
  PAID: (0, _get2.default)(getLocalTextFromCode("WF_NEWNOC_PENDINGAPPROVAL"), "message", "PAID"),
  APPROVED: (0, _get2.default)(getLocalTextFromCode("NOC_APPROVED"), "message", "APPROVED"),
  REJECTED: (0, _get2.default)(getLocalTextFromCode("NOC_REJECTED"), "message", "REJECTED"),
  CANCELLED: (0, _get2.default)(getLocalTextFromCode("NOC_CANCELLED"), "message", "CANCELLED"),
  PENDINGAPPROVAL: (0, _get2.default)(getLocalTextFromCode("WF_NEWNOC_PENDINGAPPROVAL"), "message", "Pending for Approval"),
  PENDINGPAYMENT: (0, _get2.default)(getLocalTextFromCode("WF_NEWNOC_PENDINGPAYMENT"), "message", "Pending payment"),
  FIELDINSPECTION: (0, _get2.default)(getLocalTextFromCode("WF_NEWNOC_FIELDINSPECTION"), "message", "Pending for Field Inspection"),
  "Search Results for Fire NOC Applications": (0, _get2.default)(getLocalTextFromCode("NOC_HOME_SEARCH_RESULTS_TABLE_HEADING"), "message", "Search Results for Fire NOC Applications")
};

var searchResults = exports.searchResults = {
  uiFramework: "custom-molecules",
  // moduleName: "egov-tradelicence",
  componentPath: "Table",
  visible: false,
  props: {
    // data: [],
    columns: (_columns = {}, (0, _defineProperty3.default)(_columns, (0, _get2.default)(textToLocalMapping, "Application No"), {
      format: function format(rowData) {
        return _react2.default.createElement(
          _reactRouterDom.Link,
          { to: onRowClick(rowData) },
          _react2.default.createElement(
            "span",
            {
              style: {
                color: "#FE7A51"
              }
            },
            rowData[(0, _get2.default)(textToLocalMapping, "Application No")]
          )
        );
      }
    }), (0, _defineProperty3.default)(_columns, (0, _get2.default)(textToLocalMapping, "NOC No"), {}), (0, _defineProperty3.default)(_columns, (0, _get2.default)(textToLocalMapping, "Building Name"), {}), (0, _defineProperty3.default)(_columns, (0, _get2.default)(textToLocalMapping, "Owner Name"), {}), (0, _defineProperty3.default)(_columns, (0, _get2.default)(textToLocalMapping, "Application Date"), {}), (0, _defineProperty3.default)(_columns, (0, _get2.default)(textToLocalMapping, "Status"), {}), _columns),
    title: (0, _get2.default)(textToLocalMapping, "Search Results for Fire NOC Applications"),
    options: {
      filter: false,
      download: false,
      responsive: "stacked",
      selectableRows: false,
      hover: true,
      rowsPerPageOptions: [10, 15, 20]
    },
    customSortColumn: {
      column: "Application Date",
      sortingFn: function sortingFn(data, i, sortDateOrder) {
        var epochDates = data.reduce(function (acc, curr) {
          acc.push([].concat((0, _toConsumableArray3.default)(curr), [(0, _utils.getEpochForDate)(curr[4], "dayend")]));
          return acc;
        }, []);
        var order = sortDateOrder === "asc" ? true : false;
        var finalData = (0, _utils.sortByEpoch)(epochDates, !order).map(function (item) {
          item.pop();
          return item;
        });
        return { data: finalData, currentOrder: !order ? "asc" : "desc" };
      }
    }
  }
};

var onRowClick = function onRowClick(rowData) {
  switch (rowData[(0, _get2.default)(textToLocalMapping, "Status")]) {
    case (0, _get2.default)(textToLocalMapping, "APPLIED"):
    case (0, _get2.default)(textToLocalMapping, "PENDINGPAYMENT"):
      return "/fire-noc/search-preview?status=pending_payment&role=approver&applicationNumber=" + rowData[(0, _get2.default)(textToLocalMapping, "Application No")] + "&tenantId=" + rowData["tenantId"];
    case (0, _get2.default)(textToLocalMapping, "APPROVED"):
      return "/fire-noc/search-preview?status=approved&role=approver&applicationNumber=" + rowData[(0, _get2.default)(textToLocalMapping, "Application No")] + "&tenantId=" + rowData["tenantId"];

    case (0, _get2.default)(textToLocalMapping, "PAID"):
    case (0, _get2.default)(textToLocalMapping, "PENDINGAPPROVAL"):
    case (0, _get2.default)(textToLocalMapping, "FIELDINSPECTION"):
      return "/fire-noc/search-preview?status=pending_approval&role=approver&applicationNumber=" + rowData[(0, _get2.default)(textToLocalMapping, "Application No")] + "&tenantId=" + rowData["tenantId"];
    case (0, _get2.default)(textToLocalMapping, "CANCELLED"):
      return "/fire-noc/search-preview?status=cancelled&role=approver&applicationNumber=" + rowData[(0, _get2.default)(textToLocalMapping, "Application No")] + "&tenantId=" + rowData["tenantId"];
    case (0, _get2.default)(textToLocalMapping, "INITIATED"):
      return process.env.REACT_APP_SELF_RUNNING === "true" ? "/egov-ui-framework/fire-noc/taskDetails?applicationNumber=PB-TL-2019-01-24-001390&tenantId=pb.amritsar" : "/fire-noc/taskDetails?applicationNumber=PB-TL-2019-01-24-001390&tenantId=pb.amritsar";
    case (0, _get2.default)(textToLocalMapping, "REJECTED"):
      return "/fire-noc/search-preview?status=rejected&role=approver&applicationNumber=" + rowData[(0, _get2.default)(textToLocalMapping, "Application No")] + "&tenantId=" + rowData["tenantId"];
    default:
      return "/fire-noc/search";
  }
};