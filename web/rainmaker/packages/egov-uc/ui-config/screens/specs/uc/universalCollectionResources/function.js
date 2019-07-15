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

var _commons2 = require("egov-ui-framework/ui-utils/commons");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var localizationLabels = JSON.parse((0, _localStorageUtils.getLocalization)("localization_en_IN"));
var transfomedKeys = (0, _commons2.transformById)(localizationLabels, "code");
var tenantId = (0, _localStorageUtils.getTenantId)();

var searchApiCall = exports.searchApiCall = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(state, dispatch) {
    var queryObject, searchScreenObject, isSearchBoxFirstRowValid, key, responseFromAPI, Receipt, response, i, serviceTypeLabel, data;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            showHideTable(false, dispatch);

            queryObject = [{
              key: "tenantId",
              value: tenantId
            },
            // { key: "limit", value: "10" },
            { key: "offset", value: "0" }];
            searchScreenObject = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "searchScreen", {});
            isSearchBoxFirstRowValid = (0, _utils.validateFields)("components.div.children.UCSearchCard.children.cardContent.children.searchContainer.children", state, dispatch, "search");

            if (isSearchBoxFirstRowValid) {
              _context.next = 8;
              break;
            }

            dispatch((0, _actions.toggleSnackbar)(true, {
              labelName: "Please fill valid fields to start search",
              labelKey: "UC_SEARCH_SELECT_AT_LEAST_VALID_FIELD"
            }, "warning"));
            _context.next = 29;
            break;

          case 8:
            if (!(Object.keys(searchScreenObject).length == 0 || Object.values(searchScreenObject).every(function (x) {
              return x === "";
            }))) {
              _context.next = 12;
              break;
            }

            dispatch((0, _actions.toggleSnackbar)(true, {
              labelName: "Please fill at least one field to start search",
              labelKey: "UC_SEARCH_SELECT_AT_LEAST_ONE_TOAST_MESSAGE"
            }, "warning"));
            _context.next = 29;
            break;

          case 12:
            if (!((searchScreenObject["fromDate"] === undefined || searchScreenObject["fromDate"].length === 0) && searchScreenObject["toDate"] !== undefined && searchScreenObject["toDate"].length !== 0)) {
              _context.next = 16;
              break;
            }

            dispatch((0, _actions.toggleSnackbar)(true, "Please fill From Date", "warning"));
            _context.next = 29;
            break;

          case 16:
            //  showHideProgress(true, dispatch);
            for (key in searchScreenObject) {
              if (searchScreenObject.hasOwnProperty(key) && key === "businessCodes") {
                queryObject.push({ key: key, value: searchScreenObject[key] });
              } else if (searchScreenObject.hasOwnProperty(key) && searchScreenObject[key].trim() !== "") {
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
                } else {
                  queryObject.push({ key: key, value: searchScreenObject[key].trim() });
                }
              }
            }

            if (!(queryObject.length > 3)) {
              _context.next = 28;
              break;
            }

            _context.next = 20;
            return (0, _commons.getSearchResults)(queryObject);

          case 20:
            responseFromAPI = _context.sent;

            dispatch((0, _actions.prepareFinalObject)("receiptSearchResponse", responseFromAPI));
            Receipt = responseFromAPI && responseFromAPI.Receipt || [];
            response = [];

            for (i = 0; i < Receipt.length; i++) {
              serviceTypeLabel = (0, _commons2.getTransformedLocale)((0, _get2.default)(Receipt[i], "Bill[0].billDetails[0].businessService"));

              response[i] = {
                receiptNumber: (0, _get2.default)(Receipt[i], "receiptNumber"),
                payeeName: (0, _get2.default)(Receipt[i], "Bill[0].payerName"),
                serviceType: (0, _commons2.getLocaleLabels)("", "BILLINGSERVICE_BUSINESSSERVICE_" + serviceTypeLabel, transfomedKeys),
                date: Receipt[i].receiptDate,
                amount: Receipt[i].Bill[0].billDetails[0].amountPaid,
                status: Receipt[i].Bill[0].billDetails[0].status
              };
            }

            try {
              data = response.map(function (item) {
                var _ref2;

                return _ref2 = {}, (0, _defineProperty3.default)(_ref2, (0, _get2.default)(_searchResults.textToLocalMapping, "Receipt No."), item.receiptNumber || "-"), (0, _defineProperty3.default)(_ref2, (0, _get2.default)(_searchResults.textToLocalMapping, "Payee Name"), item.payeeName || "-"), (0, _defineProperty3.default)(_ref2, (0, _get2.default)(_searchResults.textToLocalMapping, "Service Type"), item.serviceType || "-"), (0, _defineProperty3.default)(_ref2, (0, _get2.default)(_searchResults.textToLocalMapping, "Date"), (0, _index.convertEpochToDate)(item.date) || "-"), (0, _defineProperty3.default)(_ref2, (0, _get2.default)(_searchResults.textToLocalMapping, "Amount[INR]"), item.amount || "-"), (0, _defineProperty3.default)(_ref2, (0, _get2.default)(_searchResults.textToLocalMapping, "Status"), item.status || "-"), (0, _defineProperty3.default)(_ref2, "tenantId", item.tenantId), _ref2;
              });

              dispatch((0, _actions.handleScreenConfigurationFieldChange)("search", "components.div.children.searchResults", "props.data", data));
              dispatch((0, _actions.handleScreenConfigurationFieldChange)("search", "components.div.children.searchResults", "props.title", "Search Results for Receipt (" + data.length + ")"));

              dispatch((0, _actions.handleScreenConfigurationFieldChange)("search", "components.div.children.searchResults"));
              showHideTable(true, dispatch);
            } catch (error) {
              dispatch((0, _actions.toggleSnackbar)(true, error.message, "error"));
              console.log(error);
            }
            _context.next = 29;
            break;

          case 28:
            dispatch((0, _actions.toggleSnackbar)(true, {
              labelName: "Please fill atleast one more field apart from service category !",
              labelKey: "ERR_FILL_ONE_MORE_SEARCH_FIELD"
            }, "warning"));

          case 29:
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

var showHideTable = function showHideTable(booleanHideOrShow, dispatch) {
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("search", "components.div.children.searchResults", "visible", booleanHideOrShow));
};