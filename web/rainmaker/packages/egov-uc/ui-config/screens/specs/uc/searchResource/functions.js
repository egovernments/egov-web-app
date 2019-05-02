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
              value: JSON.parse((0, _localStorageUtils.getUserInfo)()).tenantId
            }, { key: "limit", value: "10" }, { key: "offset", value: "0" }];
            searchScreenObject = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "searchScreen", {});
            isSearchBoxFirstRowValid = (0, _utils.validateFields)("components.div.children.fireNOCApplication.children.cardContent.children.appNOCAndMobNumContainer.children", state, dispatch, "search");
            isSearchBoxSecondRowValid = (0, _utils.validateFields)("components.div.children.fireNOCApplication.children.cardContent.children.appStatusAndToFromDateContainer.children", state, dispatch, "search");


            if (!(isSearchBoxFirstRowValid && isSearchBoxSecondRowValid)) {
              dispatch((0, _actions.toggleSnackbar)(true, "Please fill valid fields to start search", "warning"));
            } else if (Object.keys(searchScreenObject).length == 0 || Object.values(searchScreenObject).every(function (x) {
              return x === "";
            })) {
              dispatch((0, _actions.toggleSnackbar)(true, {
                labelName: "Please fill at least one field to start search",
                labelKey: "NOC_SEARCH_SELECT_AT_LEAST_ONE_TOAST_MESSAGE"
              }, "warning"));
            } else if ((searchScreenObject["fromDate"] === undefined || searchScreenObject["fromDate"].length === 0) && searchScreenObject["toDate"] !== undefined && searchScreenObject["toDate"].length !== 0) {
              dispatch((0, _actions.toggleSnackbar)(true, "Please fill From Date", "warning"));
            } else {
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
                  } else {
                    queryObject.push({ key: key, value: searchScreenObject[key].trim() });
                  }
                }
              }

              //const response = await getSearchResults(queryObject);
              response = [{
                applicationNumber: "NOC-JLD-2018-09-8786",
                nocNumber: "NOC1234",
                BuildingName: "eGov",
                ownerName: "Nandhan",
                status: "INITIATED",
                applicationDate: 1554332357000
              }];

              try {
                data = response.map(function (item) {
                  var _ref2;

                  return _ref2 = {}, (0, _defineProperty3.default)(_ref2, (0, _get2.default)(_searchResults.textToLocalMapping, "Application No"), item.applicationNumber || "-"), (0, _defineProperty3.default)(_ref2, (0, _get2.default)(_searchResults.textToLocalMapping, "NOC No"), item.nocNumber || "-"), (0, _defineProperty3.default)(_ref2, (0, _get2.default)(_searchResults.textToLocalMapping, "Building Name"), item.BuildingName || "-"), (0, _defineProperty3.default)(_ref2, (0, _get2.default)(_searchResults.textToLocalMapping, "Owner Name"), item.ownerName || "-"), (0, _defineProperty3.default)(_ref2, (0, _get2.default)(_searchResults.textToLocalMapping, "Application Date"), (0, _index.convertEpochToDate)(item.applicationDate) || "-"), (0, _defineProperty3.default)(_ref2, "tenantId", item.tenantId), (0, _defineProperty3.default)(_ref2, (0, _get2.default)(_searchResults.textToLocalMapping, "Status"), (0, _get2.default)(_searchResults.textToLocalMapping, item.status) || "-"), _ref2;
                });


                dispatch((0, _actions.handleScreenConfigurationFieldChange)("search", "components.div.children.searchResults", "props.data", data));
                dispatch((0, _actions.handleScreenConfigurationFieldChange)("search", "components.div.children.searchResults", "props.title", _searchResults.textToLocalMapping["Search Results for Fire NOC Applications"] + " (" + response.length + ")"));
                //showHideProgress(false, dispatch);
                showHideTable(true, dispatch);
              } catch (error) {
                //showHideProgress(false, dispatch);
                dispatch((0, _actions.toggleSnackbar)(true, error.message, "error"));
                console.log(error);
              }
            }

          case 6:
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