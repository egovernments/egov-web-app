"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchResult = exports.textToLocalMapping = undefined;

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

var _recieptPdf = require("../../utils/recieptPdf");

var _commons = require("egov-ui-framework/ui-utils/commons");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getLocalTextFromCode = function getLocalTextFromCode(localCode) {
  return JSON.parse((0, _localStorageUtils.getLocalization)("localization_en_IN")).find(function (item) {
    return item.code === localCode;
  });
};

var textToLocalMapping = exports.textToLocalMapping = {
  "Receipt No.": (0, _commons.getLocaleLabels)("Receipt No", "UC_COMMON_TABLE_COL_RECEIPT_NO", (0, _commons.getTransformedLocalStorgaeLabels)()),
  "Payee Name": (0, _commons.getLocaleLabels)("Consumer Name", "UC_COMMON_TABLE_COL_PAYEE_NAME", (0, _commons.getTransformedLocalStorgaeLabels)()),
  "Service Type": (0, _commons.getLocaleLabels)("Service Category", "UC_SERVICE_TYPE_LABEL", (0, _commons.getTransformedLocalStorgaeLabels)()),
  Date: (0, _commons.getLocaleLabels)("Receipt Date", "UC_COMMON_TABLE_COL_DATE", (0, _commons.getTransformedLocalStorgaeLabels)()),
  "Amount[INR]": (0, _commons.getLocaleLabels)("Amount Paid[INR]", "UC_COMMON_TABLE_COL_AMOUNT", (0, _commons.getTransformedLocalStorgaeLabels)()),

  Status: (0, _commons.getLocaleLabels)("Status", "UC_COMMON_TABLE_COL_STATUS", (0, _commons.getTransformedLocalStorgaeLabels)())

  //Download button
};

var searchResult = exports.searchResult = {
  uiFramework: "custom-molecules",
  // moduleName: "egov-tradelicence",
  componentPath: "Table",
  visible: false,
  props: {
    // data: [],
    columns: (_columns = {}, (0, _defineProperty3.default)(_columns, (0, _get2.default)(textToLocalMapping, "Receipt No."), {
      format: function format(rowData) {
        return _react2.default.createElement(
          "span",
          {
            style: {
              color: "#FE7A51",
              cursor: "pointer",
              textDecoration: "underline"
            },
            onClick: function onClick() {
              return (0, _recieptPdf.generateCitizenReciept)(rowData);
            }
          },
          rowData[(0, _get2.default)(textToLocalMapping, "Receipt No.")]
        )
        // <span style="cursor:pointer">pointer</span>
        ;
      }
    }), (0, _defineProperty3.default)(_columns, (0, _get2.default)(textToLocalMapping, "Payee Name"), {}), (0, _defineProperty3.default)(_columns, (0, _get2.default)(textToLocalMapping, "Service Type"), {}), (0, _defineProperty3.default)(_columns, (0, _get2.default)(textToLocalMapping, "Date"), {}), (0, _defineProperty3.default)(_columns, (0, _get2.default)(textToLocalMapping, "Amount[INR]"), {}), (0, _defineProperty3.default)(_columns, (0, _get2.default)(textToLocalMapping, "Status"), {}), _columns),
    options: {
      filter: false,
      download: false,
      responsive: "stacked",
      selectableRows: false,
      hover: true,
      rowsPerPageOptions: [10, 15, 20]
    },
    customSortColumn: {
      column: "Date",
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
  switch (rowData[(0, _get2.default)(textToLocalMapping, "")]) {
    default:
      return "/uc-citizen/search";
  }
};