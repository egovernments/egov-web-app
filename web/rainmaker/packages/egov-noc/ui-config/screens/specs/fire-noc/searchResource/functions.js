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

var _commons = require("../../../../../ui-utils/commons");

var _index = require("../../utils/index");

var _searchResults = require("./searchResults");

var _utils = require("../../utils");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var searchApiCall = exports.searchApiCall = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(state, dispatch) {
    var queryObject, searchScreenObject, isSearchBoxFirstRowValid, isSearchBoxSecondRowValid, key, response, data;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            showHideTable(false, dispatch);
            queryObject = [{
              key: "tenantId",
              value: (0, _localStorageUtils.getTenantId)()
              // { key: "limit", value: "10" },
              // { key: "offset", value: "0" }
            }];
            searchScreenObject = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "searchScreen", {});
            isSearchBoxFirstRowValid = (0, _utils.validateFields)("components.div.children.fireNOCApplication.children.cardContent.children.appNOCAndMobNumContainer.children", state, dispatch, "search");
            isSearchBoxSecondRowValid = (0, _utils.validateFields)("components.div.children.fireNOCApplication.children.cardContent.children.appStatusAndToFromDateContainer.children", state, dispatch, "search");

            if (isSearchBoxFirstRowValid && isSearchBoxSecondRowValid) {
              _context.next = 9;
              break;
            }

            dispatch((0, _actions.toggleSnackbar)(true, {
              labelName: "Please fill valid fields to start search",
              labelKey: "ERR_FILL_VALID_FIELDS"
            }, "warning"));
            _context.next = 32;
            break;

          case 9:
            if (!(Object.keys(searchScreenObject).length == 0 || Object.values(searchScreenObject).every(function (x) {
              return x === "";
            }))) {
              _context.next = 13;
              break;
            }

            dispatch((0, _actions.toggleSnackbar)(true, {
              labelName: "Please fill at least one field to start search",
              labelKey: "NOC_SEARCH_SELECT_AT_LEAST_ONE_TOAST_MESSAGE"
            }, "warning"));
            _context.next = 32;
            break;

          case 13:
            if (!((searchScreenObject["fromDate"] === undefined || searchScreenObject["fromDate"].length === 0) && searchScreenObject["toDate"] !== undefined && searchScreenObject["toDate"].length !== 0)) {
              _context.next = 17;
              break;
            }

            dispatch((0, _actions.toggleSnackbar)(true, { labelName: "Please fill From Date", labelKey: "ERR_FILL_FROM_DATE" }, "warning"));
            _context.next = 32;
            break;

          case 17:
            //  showHideProgress(true, dispatch);
            for (key in searchScreenObject) {
              if (searchScreenObject.hasOwnProperty(key) && searchScreenObject[key].trim() !== "") {
                if (key === "fromDate") {
                  queryObject.push({
                    key: key,
                    value: (0, _index.convertDateToEpoch)(searchScreenObject[key], "daystart")
                  });
                } else if (key === "toDate") {
                  queryObject.push({
                    key: key,
                    value: (0, _index.convertDateToEpoch)(searchScreenObject[key], "dayend")
                  });
                }
                // else if (key === "status") {
                //   queryObject.push({
                //     key: "action",
                //     value: searchScreenObject[key].trim()
                //   });
                // }
                else {
                    queryObject.push({ key: key, value: searchScreenObject[key].trim() });
                  }
              }
            }
            _context.prev = 18;
            _context.next = 21;
            return (0, _commons.getSearchResults)(queryObject);

          case 21:
            response = _context.sent;

            // const response = searchSampleResponse();
            data = response && (0, _get2.default)(response, "FireNOCs", []).map(function (item) {
              var _ref2;

              return _ref2 = {}, (0, _defineProperty3.default)(_ref2, (0, _get2.default)(_searchResults.textToLocalMapping, "Application No"), item.fireNOCDetails.applicationNumber || "-"), (0, _defineProperty3.default)(_ref2, (0, _get2.default)(_searchResults.textToLocalMapping, "NOC No"), item.fireNOCNumber || "-"), (0, _defineProperty3.default)(_ref2, (0, _get2.default)(_searchResults.textToLocalMapping, "NOC Type"), item.fireNOCDetails.fireNOCType || "-"), (0, _defineProperty3.default)(_ref2, (0, _get2.default)(_searchResults.textToLocalMapping, "Owner Name"), (0, _get2.default)(item, "fireNOCDetails.applicantDetails.owners[0].name") || "-"), (0, _defineProperty3.default)(_ref2, (0, _get2.default)(_searchResults.textToLocalMapping, "Application Date"), (0, _index.convertEpochToDate)(parseInt(item.fireNOCDetails.applicationDate)) || "-"), (0, _defineProperty3.default)(_ref2, "tenantId", item.tenantId), (0, _defineProperty3.default)(_ref2, (0, _get2.default)(_searchResults.textToLocalMapping, "Status"), (0, _get2.default)(_searchResults.textToLocalMapping, item.fireNOCDetails.status) || "-"), _ref2;
            });


            dispatch((0, _actions.handleScreenConfigurationFieldChange)("search", "components.div.children.searchResults", "props.data", data));
            dispatch((0, _actions.handleScreenConfigurationFieldChange)("search", "components.div.children.searchResults", "props.title", _searchResults.textToLocalMapping["Search Results for Fire-NOC Applications"] + "(" + response.FireNOCs.length + ")"));
            //showHideProgress(false, dispatch);
            showHideTable(true, dispatch);
            _context.next = 32;
            break;

          case 28:
            _context.prev = 28;
            _context.t0 = _context["catch"](18);

            //showHideProgress(false, dispatch);
            dispatch((0, _actions.toggleSnackbar)(true, { labelName: _context.t0.message, labelKey: _context.t0.message }, "error"));
            console.log(_context.t0);

          case 32:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined, [[18, 28]]);
  }));

  return function searchApiCall(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var showHideTable = function showHideTable(booleanHideOrShow, dispatch) {
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("search", "components.div.children.searchResults", "visible", booleanHideOrShow));
};