"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchApiCall = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _commons = require("../../../../..//ui-utils/commons");

var _actions2 = require("egov-ui-framework/ui-redux/app/actions");

var _searchResults = require("./searchResults");

var _utils = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var searchApiCall = exports.searchApiCall = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(state, dispatch) {
    var queryObject, searchScreenObject, isSearchFormValid, key, response, data;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            showHideTable(false, dispatch);
            queryObject = [{
              key: "tenantId",
              value: JSON.parse(localStorage.getItem("user-info")).tenantId
            }];
            searchScreenObject = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "searchScreen", {});
            isSearchFormValid = (0, _utils.validateFields)("components.div.children.searchForm.children.cardContent.children.searchFormContainer.children", state, dispatch, "search");

            if (isSearchFormValid) {
              _context.next = 8;
              break;
            }

            dispatch((0, _actions2.toggleSnackbarAndSetText)(true, "Please fill valid fields to start search", "warning"));
            _context.next = 17;
            break;

          case 8:
            if (!(Object.keys(searchScreenObject).length == 0 || Object.values(searchScreenObject).every(function (x) {
              return x === "";
            }))) {
              _context.next = 12;
              break;
            }

            dispatch((0, _actions2.toggleSnackbarAndSetText)(true, "Please fill at least one field to start search", "warning"));
            _context.next = 17;
            break;

          case 12:
            // Add selected search fields to queryobject
            for (key in searchScreenObject) {
              if (searchScreenObject.hasOwnProperty(key) && searchScreenObject[key].trim() !== "") {
                queryObject.push({ key: key, value: searchScreenObject[key].trim() });
              }
            }
            _context.next = 15;
            return (0, _commons.getSearchResults)(queryObject);

          case 15:
            response = _context.sent;

            // response = {
            //   Licenses: [
            //     {
            //       employeeID: "EMP-JAL-12345",
            //       name: "Ravinder Pal Singh",
            //       role: "Accountant",
            //       designation: "Junior Accountant",
            //       department: "Administration"
            //     },
            //     {
            //       employeeID: "EMP-JAL-1234",
            //       name: "Ravinder Pal Singh",
            //       role: "Accountant",
            //       designation: "Junior Accountant",
            //       department: "Administration"
            //     },
            //     {
            //       employeeID: "EMP-JAL-1234",
            //       name: "Ravinder Pal Singh",
            //       role: "Accountant",
            //       designation: "Junior Accountant",
            //       department: "Administration"
            //     },
            //     {
            //       employeeID: "EMP-JAL-1234",
            //       name: "Ravinder Pal Singh",
            //       role: "Accountant",
            //       designation: "Junior Accountant",
            //       department: "Administration"
            //     },
            //     {
            //       employeeID: "EMP-JAL-1234",
            //       name: "Ravinder Pal Singh",
            //       role: "Accountant",
            //       designation: "Junior Accountant",
            //       department: "Administration"
            //     },
            //     {
            //       employeeID: "EMP-JAL-1234",
            //       name: "Ravinder Pal Singh",
            //       role: "Accountant",
            //       designation: "Junior Accountant",
            //       department: "Administration"
            //     }
            //   ]
            // };
            try {
              data = response.Employees.map(function (item) {
                var _ref2;

                return _ref2 = {}, (0, _defineProperty3.default)(_ref2, (0, _get2.default)(_searchResults.textToLocalMapping, "Employee ID"), (0, _get2.default)(item, "code", "-") || "-"), (0, _defineProperty3.default)(_ref2, (0, _get2.default)(_searchResults.textToLocalMapping, "Name"), (0, _get2.default)(item, "user.name", "-") || "-"), (0, _defineProperty3.default)(_ref2, (0, _get2.default)(_searchResults.textToLocalMapping, "Role"), (0, _get2.default)(item, "user.roles[0].name", "-") || "-"), (0, _defineProperty3.default)(_ref2, (0, _get2.default)(_searchResults.textToLocalMapping, "Designation"), (0, _get2.default)(item, "assignments[0].designation", "-") || "-"), (0, _defineProperty3.default)(_ref2, (0, _get2.default)(_searchResults.textToLocalMapping, "Department"), (0, _get2.default)(item, "assignments[0].department", "-") || "-"), _ref2;
              });


              dispatch((0, _actions.handleScreenConfigurationFieldChange)("search", "components.div.children.searchResults", "props.data", data));
              dispatch((0, _actions.handleScreenConfigurationFieldChange)("search", "components.div.children.searchResults", "props.title", _searchResults.textToLocalMapping["Search Results for Employee"] + " (" + response.Employees.length + ")"));
              // showHideProgress(false, dispatch);
              showHideTable(true, dispatch);
            } catch (error) {
              // showHideProgress(false, dispatch);
              dispatch((0, _actions2.toggleSnackbarAndSetText)(true, error.message, "error"));
              console.log(error);
            }

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function searchApiCall(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
// const showHideProgress = (booleanHideOrShow, dispatch) => {
//   dispatch(
//     handleField(
//       "search",
//       "components.div.children.progressStatus",
//       "visible",
//       booleanHideOrShow
//     )
//   );
// };

var showHideTable = function showHideTable(booleanHideOrShow, dispatch) {
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("search", "components.div.children.searchResults", "visible", booleanHideOrShow));
};