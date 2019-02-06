"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchResults = exports.textToLocalMapping = undefined;

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _columns;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require("react-router-dom");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getLocalTextFromCode = function getLocalTextFromCode(localCode) {
  return JSON.parse(localStorage.getItem("localization_en_IN")).find(function (item) {
    return item.code == localCode;
  });
};

var textToLocalMapping = exports.textToLocalMapping = {
  "Employee ID": (0, _get2.default)(getLocalTextFromCode("HR_COMMON_TABLE_COL_EMP_ID"), "message", "Employee ID"),
  Name: (0, _get2.default)(getLocalTextFromCode("HR_COMMON_TABLE_COL_NAME"), "message", "Name"),
  Role: (0, _get2.default)(getLocalTextFromCode("HR_COMMON_TABLE_COL_ROLE"), "message", "Role"),
  Designation: (0, _get2.default)(getLocalTextFromCode("HR_COMMON_TABLE_COL_DESG"), "message", "Designation"),
  Department: (0, _get2.default)(getLocalTextFromCode("HR_COMMON_TABLE_COL_DEPT"), "message", "Department"),
  "Search Results for Employee": (0, _get2.default)(getLocalTextFromCode("HR_HOME_SEARCH_RESULTS_TABLE_HEADING"), "message", "Search Results for Employee")
};

var selectToolbarStyle = {
  display: "flex",
  alignItems: "center",
  padding: "0 10px"
};

var searchResults = exports.searchResults = {
  uiFramework: "custom-molecules-local",
  componentPath: "Table",
  visible: false,
  props: {
    data: [],
    columns: (_columns = {}, (0, _defineProperty3.default)(_columns, (0, _get2.default)(textToLocalMapping, "Employee ID"), {
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
            rowData[(0, _get2.default)(textToLocalMapping, "Employee ID")]
          )
        );
      }
    }), (0, _defineProperty3.default)(_columns, (0, _get2.default)(textToLocalMapping, "Name"), {}), (0, _defineProperty3.default)(_columns, (0, _get2.default)(textToLocalMapping, "Role"), {}), (0, _defineProperty3.default)(_columns, (0, _get2.default)(textToLocalMapping, "Designation"), {}), (0, _defineProperty3.default)(_columns, (0, _get2.default)(textToLocalMapping, "Department"), {}), _columns),
    title: (0, _get2.default)(textToLocalMapping, "Search Results for Employee")
    // customSortColumn: {
    //   column: "Application Date",
    //   sortingFn: (data, i, sortDateOrder) => {
    //     const epochDates = data.reduce((acc, curr) => {
    //       acc.push([...curr, getEpochForDate(curr[4], "dayend")]);
    //       return acc;
    //     }, []);
    //     const order = sortDateOrder === "asc" ? true : false;
    //     const finalData = sortByEpoch(epochDates, !order).map(item => {
    //       item.pop();
    //       return item;
    //     });
    //     return { data: finalData, currentOrder: !order ? "asc" : "desc" };
    //   }
    // }
  }
};

var onRowClick = function onRowClick(rowData) {
  return "/egov-ui-framework/hrms/view?employeeID=" + rowData[(0, _get2.default)(textToLocalMapping, "Employee ID")];
};