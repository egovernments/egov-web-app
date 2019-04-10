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
  "Property ID": (0, _get2.default)(getLocalTextFromCode("NOC_COMMON_TABLE_COL_APP_NO"), "message", "Property ID"),
  "Assessment No": (0, _get2.default)(getLocalTextFromCode("NOC_COMMON_TABLE_COL_NOC_NO"), "message", "Assessment No"),
  "Owner Name": (0, _get2.default)(getLocalTextFromCode("NOC_COMMON_TABLE_COL_OWN_NAME"), "message", "Owner Name"),
  "Date Created": (0, _get2.default)(getLocalTextFromCode("NOC_COMMON_TABLE_COL_APP_DATE"), "message", "Date Created")
  //Download button
};

var searchResults = exports.searchResults = {
  uiFramework: "custom-molecules",
  // moduleName: "egov-tradelicence",
  componentPath: "Table",
  visible: false,
  props: {
    // data: [],
    columns: (_columns = {}, (0, _defineProperty3.default)(_columns, (0, _get2.default)(textToLocalMapping, "Property ID"), {
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
            rowData[(0, _get2.default)(textToLocalMapping, "Property ID")]
          )
        );
      }
    }), (0, _defineProperty3.default)(_columns, (0, _get2.default)(textToLocalMapping, "Assessment No"), {}), (0, _defineProperty3.default)(_columns, (0, _get2.default)(textToLocalMapping, "Owner Name"), {}), (0, _defineProperty3.default)(_columns, (0, _get2.default)(textToLocalMapping, "Date Created"), {}), _columns),
    options: {
      filter: false,
      download: false,
      responsive: "stacked",
      selectableRows: false,
      hover: true,
      rowsPerPageOptions: [10, 15, 20]
    },
    customSortColumn: {
      column: "Date Created",
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
      return "/fire-noc/search";
  }
};