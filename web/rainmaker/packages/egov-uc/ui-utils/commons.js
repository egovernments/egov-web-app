"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findItemInArrayOfObject = exports.isFileValid = exports.getFileSize = exports.getImageUrlByFile = exports.applyTradeLicense = exports.getBoundaryData = exports.getSearchResults = exports.getLocaleLabelsforTL = exports.updateTradeDetails = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _api = require("./api");

var _utils = require("../ui-config/screens/specs/utils");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _store = require("../ui-redux/store");

var _store2 = _interopRequireDefault(_store);

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _set = require("lodash/set");

var _set2 = _interopRequireDefault(_set);

var _commons = require("egov-ui-framework/ui-utils/commons");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var updateTradeDetails = exports.updateTradeDetails = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(requestBody) {
    var payload;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return (0, _api.httpRequest)("post", "/tl-services/v1/_update", "", [], requestBody);

          case 3:
            payload = _context.sent;
            return _context.abrupt("return", payload);

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);

            _store2.default.dispatch((0, _actions.toggleSnackbar)(true, _context.t0.message, "error"));

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 7]]);
  }));

  return function updateTradeDetails(_x) {
    return _ref.apply(this, arguments);
  };
}();

var getLocaleLabelsforTL = exports.getLocaleLabelsforTL = function getLocaleLabelsforTL(label, labelKey, localizationLabels) {
  if (labelKey) {
    var translatedLabel = (0, _utils.getTranslatedLabel)(labelKey, localizationLabels);
    if (!translatedLabel || labelKey === translatedLabel) {
      return label;
    } else {
      return translatedLabel;
    }
  } else {
    return label;
  }
};

var getSearchResults = exports.getSearchResults = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(queryObject) {
    var response;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return (0, _api.httpRequest)("post", "collection-services/receipts/_search", "", queryObject);

          case 3:
            response = _context2.sent;
            return _context2.abrupt("return", response);

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);

            console.error(_context2.t0);
            _store2.default.dispatch((0, _actions.toggleSnackbar)(true, { labelName: _context2.t0.message, labelCode: _context2.t0.message }, "error"));

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[0, 7]]);
  }));

  return function getSearchResults(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

var setDocsForEditFlow = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(state, dispatch) {
    var applicationDocuments, uploadedDocuments, fileStoreIds, fileUrlPayload;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            applicationDocuments = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Licenses[0].tradeLicenseDetail.applicationDocuments", []);
            uploadedDocuments = {};
            fileStoreIds = applicationDocuments && applicationDocuments.map(function (item) {
              return item.fileStoreId;
            }).join(",");
            _context3.t0 = fileStoreIds;

            if (!_context3.t0) {
              _context3.next = 8;
              break;
            }

            _context3.next = 7;
            return (0, _commons.getFileUrlFromAPI)(fileStoreIds);

          case 7:
            _context3.t0 = _context3.sent;

          case 8:
            fileUrlPayload = _context3.t0;

            applicationDocuments && applicationDocuments.forEach(function (item, index) {
              uploadedDocuments[index] = [{
                fileName: fileUrlPayload && fileUrlPayload[item.fileStoreId] && decodeURIComponent(fileUrlPayload[item.fileStoreId].split(",")[0].split("?")[0].split("/").pop().slice(13)) || "Document - " + (index + 1),
                fileStoreId: item.fileStoreId,
                fileUrl: Object.values(fileUrlPayload)[index],
                documentType: item.documentType,
                tenantId: item.tenantId,
                id: item.id
              }];
            });
            dispatch((0, _actions.prepareFinalObject)("LicensesTemp[0].uploadedDocsInRedux", uploadedDocuments));

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function setDocsForEditFlow(_x3, _x4) {
    return _ref3.apply(this, arguments);
  };
}();

var getBoundaryData = exports.getBoundaryData = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(action, state, dispatch, queryObject, code, componentPath) {
    var payload, tenantId, mohallaData, data, messageObject;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return (0, _api.httpRequest)("post", "/egov-location/location/v11/boundarys/_search?hierarchyTypeCode=REVENUE&boundaryType=Locality", "_search", queryObject, {});

          case 3:
            payload = _context4.sent;
            tenantId = process.env.REACT_APP_NAME === "Employee" ? (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Licenses[0].tradeLicenseDetail.address.city") : (0, _commons.getQueryArg)(window.location.href, "tenantId");
            mohallaData = payload && payload.TenantBoundary[0] && payload.TenantBoundary[0].boundary && payload.TenantBoundary[0].boundary.reduce(function (result, item) {
              result.push((0, _extends3.default)({}, item, {
                name: tenantId.toUpperCase().replace(/[.]/g, "_") + "_REVENUE_" + item.code.toUpperCase().replace(/[._:-\s\/]/g, "_")
              }));
              return result;
            }, []);


            dispatch((0, _actions.prepareFinalObject)("applyScreenMdmsData.tenant.localities",
            // payload.TenantBoundary && payload.TenantBoundary[0].boundary,
            mohallaData));

            dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.tradeLocationDetails.children.cardContent.children.tradeDetailsConatiner.children.tradeLocMohalla", "props.suggestions", mohallaData));
            if (code) {
              data = payload.TenantBoundary[0].boundary;
              messageObject = data && data.find(function (item) {
                return item.code == code;
              });

              if (messageObject) dispatch((0, _actions.prepareFinalObject)("Licenses[0].tradeLicenseDetail.address.locality.name", messageObject.name));
            }
            _context4.next = 14;
            break;

          case 11:
            _context4.prev = 11;
            _context4.t0 = _context4["catch"](0);

            console.log(_context4.t0);

          case 14:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, undefined, [[0, 11]]);
  }));

  return function getBoundaryData(_x5, _x6, _x7, _x8, _x9, _x10) {
    return _ref4.apply(this, arguments);
  };
}();

var createOwnersBackup = function createOwnersBackup(dispatch, payload) {
  var owners = (0, _get2.default)(payload, "Licenses[0].tradeLicenseDetail.owners");
  owners && owners.length > 0 && dispatch((0, _actions.prepareFinalObject)("LicensesTemp[0].tradeLicenseDetail.owners", JSON.parse(JSON.stringify(owners))));
};

var getMultiUnits = function getMultiUnits(multiUnits) {
  var hasTradeType = false;
  var hasAccessoryType = false;

  var mergedUnits = multiUnits && multiUnits.reduce(function (result, item) {
    hasTradeType = item.hasOwnProperty("tradeType");
    hasAccessoryType = item.hasOwnProperty("accessoryCategory");
    if (item && item !== null && (hasTradeType || hasAccessoryType)) {
      if (item.hasOwnProperty("id")) {
        if (item.hasOwnProperty("active") && item.active) {
          if (item.hasOwnProperty("isDeleted") && !item.isDeleted) {
            (0, _set2.default)(item, "active", false);
            result.push(item);
          } else {
            result.push(item);
          }
        }
      } else {
        if (!item.hasOwnProperty("isDeleted")) {
          result.push(item);
        }
      }
    }
    return result;
  }, []);

  return mergedUnits;
};

// const getMultipleAccessories = licenses => {
//   let accessories = get(licenses, "tradeLicenseDetail.accessories");
//   let mergedAccessories =
//     accessories &&
//     accessories.reduce((result, item) => {
//       if (item && item !== null && item.hasOwnProperty("accessoryCategory")) {
//         if (item.hasOwnProperty("id")) {
//           if (item.hasOwnProperty("active") && item.active) {
//             if (item.hasOwnProperty("isDeleted") && !item.isDeleted) {
//               set(item, "active", false);
//               result.push(item);
//             } else {
//               result.push(item);
//             }
//           }
//         } else {
//           if (!item.hasOwnProperty("isDeleted")) {
//             result.push(item);
//           }
//         }
//       }
//       return result;
//     }, []);

//   return mergedAccessories;
// };

var getMultipleOwners = function getMultipleOwners(owners) {
  var mergedOwners = owners && owners.reduce(function (result, item) {
    if (item && item !== null && item.hasOwnProperty("mobileNumber")) {
      if (item.hasOwnProperty("active") && item.active) {
        if (item.hasOwnProperty("isDeleted") && !item.isDeleted) {
          (0, _set2.default)(item, "active", false);
          result.push(item);
        } else {
          result.push(item);
        }
      } else {
        if (!item.hasOwnProperty("isDeleted")) {
          result.push(item);
        }
      }
    }
    return result;
  }, []);

  return mergedOwners;
};

var applyTradeLicense = exports.applyTradeLicense = function () {
  var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(state, dispatch, activeIndex) {
    var queryObject, documents, owners, cityId, tenantId, BSqueryObject, currentFinancialYr, fY1, accessories, tradeUnits, action, isEditFlow, searchQueryObject, searchResponse, updatedtradeUnits, tradeTemp, _accessories, _tradeUnits, mergedTradeUnits, mergedAccessories, mergedOwners, response;

    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            queryObject = JSON.parse(JSON.stringify((0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Licenses", [])));
            documents = (0, _get2.default)(queryObject[0], "tradeLicenseDetail.applicationDocuments");

            (0, _set2.default)(queryObject[0], "validFrom", (0, _utils.convertDateToEpoch)(queryObject[0].validFrom, "dayend"));
            (0, _set2.default)(queryObject[0], "wfDocuments", documents);
            (0, _set2.default)(queryObject[0], "validTo", (0, _utils.convertDateToEpoch)(queryObject[0].validTo, "dayend"));
            if (queryObject[0] && queryObject[0].commencementDate) {
              queryObject[0].commencementDate = (0, _utils.convertDateToEpoch)(queryObject[0].commencementDate, "dayend");
            }
            owners = (0, _get2.default)(queryObject[0], "tradeLicenseDetail.owners");

            owners = owners && convertOwnerDobToEpoch(owners) || [];

            //set(queryObject[0], "tradeLicenseDetail.owners", getMultipleOwners(owners));
            cityId = (0, _get2.default)(queryObject[0], "tradeLicenseDetail.address.tenantId", "");
            tenantId = (0, _utils.ifUserRoleExists)("CITIZEN") ? cityId : (0, _localStorageUtils.getTenantId)();
            BSqueryObject = [{ key: "tenantId", value: tenantId }, { key: "businessService", value: "newTL" }];

            if (process.env.REACT_APP_NAME === "Citizen") {
              currentFinancialYr = (0, _utils.getCurrentFinancialYear)();
              //Changing the format of FY

              fY1 = currentFinancialYr.split("-")[1];

              fY1 = fY1.substring(2, 4);
              currentFinancialYr = currentFinancialYr.split("-")[0] + "-" + fY1;
              (0, _set2.default)(queryObject[0], "financialYear", currentFinancialYr);
              (0, _commons.setBusinessServiceDataToLocalStorage)(BSqueryObject, dispatch);
            }

            (0, _set2.default)(queryObject[0], "tenantId", tenantId);

            if (!queryObject[0].applicationNumber) {
              _context5.next = 39;
              break;
            }

            //call update

            accessories = (0, _get2.default)(queryObject[0], "tradeLicenseDetail.accessories");
            tradeUnits = (0, _get2.default)(queryObject[0], "tradeLicenseDetail.tradeUnits");

            (0, _set2.default)(queryObject[0], "tradeLicenseDetail.tradeUnits", getMultiUnits(tradeUnits));
            (0, _set2.default)(queryObject[0], "tradeLicenseDetail.accessories", getMultiUnits(accessories));
            (0, _set2.default)(queryObject[0], "tradeLicenseDetail.owners", getMultipleOwners(owners));

            action = "INITIATE";

            if (queryObject[0].tradeLicenseDetail && queryObject[0].tradeLicenseDetail.applicationDocuments) {
              if ((0, _commons.getQueryArg)(window.location.href, "action") === "edit") {
                // const removedDocs = get(
                //   state.screenConfiguration.preparedFinalObject,
                //   "LicensesTemp[0].removedDocs",
                //   []
                // );
                // set(queryObject[0], "tradeLicenseDetail.applicationDocuments", [
                //   ...get(
                //     state.screenConfiguration.prepareFinalObject,
                //     "Licenses[0].tradeLicenseDetail.applicationDocuments",
                //     []
                //   ),
                //   ...removedDocs
                // ]);
              } else if (activeIndex === 1) {
                alert("active index 1");

                (0, _set2.default)(queryObject[0], "tradeLicenseDetail.applicationDocuments", null);
              } else action = "APPLY";
            }
            // else if (
            //   queryObject[0].tradeLicenseDetail &&
            //   queryObject[0].tradeLicenseDetail.applicationDocuments &&
            //   activeIndex === 1
            // ) {
            // } else if (
            //   queryObject[0].tradeLicenseDetail &&
            //   queryObject[0].tradeLicenseDetail.applicationDocuments
            // ) {
            //   action = "APPLY";
            // }
            (0, _set2.default)(queryObject[0], "action", action);
            isEditFlow = (0, _commons.getQueryArg)(window.location.href, "action") === "edit";
            _context5.t0 = !isEditFlow;

            if (!_context5.t0) {
              _context5.next = 28;
              break;
            }

            _context5.next = 28;
            return (0, _api.httpRequest)("post", "/tl-services/v1/_update", "", [], {
              Licenses: queryObject
            });

          case 28:
            searchQueryObject = [{ key: "tenantId", value: queryObject[0].tenantId }, { key: "applicationNumber", value: queryObject[0].applicationNumber }];
            _context5.next = 31;
            return getSearchResults(searchQueryObject);

          case 31:
            searchResponse = _context5.sent;

            if (isEditFlow) {
              searchResponse = { Licenses: queryObject };
            } else {
              dispatch((0, _actions.prepareFinalObject)("Licenses", searchResponse.Licenses));
            }
            updatedtradeUnits = (0, _get2.default)(searchResponse, "Licenses[0].tradeLicenseDetail.tradeUnits");
            tradeTemp = updatedtradeUnits.map(function (item, index) {
              return {
                tradeSubType: item.tradeType.split(".")[1],
                tradeType: item.tradeType.split(".")[0]
              };
            });

            dispatch((0, _actions.prepareFinalObject)("LicensesTemp.tradeUnits", tradeTemp));
            createOwnersBackup(dispatch, searchResponse);
            _context5.next = 54;
            break;

          case 39:
            _accessories = (0, _get2.default)(queryObject[0], "tradeLicenseDetail.accessories");
            _tradeUnits = (0, _get2.default)(queryObject[0], "tradeLicenseDetail.tradeUnits");
            // let owners = get(queryObject[0], "tradeLicenseDetail.owners");

            mergedTradeUnits = _tradeUnits && _tradeUnits.filter(function (item) {
              return !item.hasOwnProperty("isDeleted");
            });
            mergedAccessories = _accessories && _accessories.filter(function (item) {
              return !item.hasOwnProperty("isDeleted");
            });
            mergedOwners = owners && owners.filter(function (item) {
              return !item.hasOwnProperty("isDeleted");
            });


            (0, _set2.default)(queryObject[0], "tradeLicenseDetail.tradeUnits", mergedTradeUnits);
            (0, _set2.default)(queryObject[0], "tradeLicenseDetail.accessories", mergedAccessories);
            (0, _set2.default)(queryObject[0], "tradeLicenseDetail.owners", mergedOwners);
            (0, _set2.default)(queryObject[0], "action", "INITIATE");
            //Emptying application docs to "INITIATE" form in case of search and fill from old TL Id.
            if (!queryObject[0].applicationNumber) (0, _set2.default)(queryObject[0], "tradeLicenseDetail.applicationDocuments", null);
            _context5.next = 51;
            return (0, _api.httpRequest)("post", "/tl-services/v1/_create", "", [], { Licenses: queryObject });

          case 51:
            response = _context5.sent;

            dispatch((0, _actions.prepareFinalObject)("Licenses", response.Licenses));
            createOwnersBackup(dispatch, response);

          case 54:
            /** Application no. box setting */
            setApplicationNumberBox(state, dispatch);
            return _context5.abrupt("return", true);

          case 58:
            _context5.prev = 58;
            _context5.t1 = _context5["catch"](0);

            dispatch((0, _actions.toggleSnackbar)(true, { labelName: _context5.t1.message }, "error"));
            console.log(_context5.t1);
            return _context5.abrupt("return", false);

          case 63:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, undefined, [[0, 58]]);
  }));

  return function applyTradeLicense(_x11, _x12, _x13) {
    return _ref5.apply(this, arguments);
  };
}();

var convertOwnerDobToEpoch = function convertOwnerDobToEpoch(owners) {
  var updatedOwners = owners && owners.map(function (owner) {
    return (0, _extends3.default)({}, owner, {
      dob: owner && owner !== null && (0, _utils.convertDateToEpoch)(owner.dob, "dayend")
    });
  }).filter(function (item) {
    return item && item !== null;
  });
  return updatedOwners;
};

var getImageUrlByFile = exports.getImageUrlByFile = function getImageUrlByFile(file) {
  return new Promise(function (resolve) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (e) {
      var fileurl = e.target.result;
      resolve(fileurl);
    };
  });
};

var getFileSize = exports.getFileSize = function getFileSize(file) {
  var size = parseFloat(file.size / 1024).toFixed(2);
  return size;
};

var isFileValid = exports.isFileValid = function isFileValid(file, acceptedFiles) {
  var mimeType = file["type"];
  return mimeType && acceptedFiles && acceptedFiles.indexOf(mimeType.split("/")[1]) > -1 || false;
};

var setApplicationNumberBox = function setApplicationNumberBox(state, dispatch) {
  var applicationNumber = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.Licenses[0].applicationNumber", null);
  if (applicationNumber) {
    dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.headerDiv.children.header.children.applicationNumber", "visible", true));
    dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.headerDiv.children.header.children.applicationNumber", "props.number", applicationNumber));
  }
};

var findItemInArrayOfObject = exports.findItemInArrayOfObject = function findItemInArrayOfObject(arr, conditionCheckerFn) {
  for (var i = 0; i < arr.length; i++) {
    if (conditionCheckerFn(arr[i])) {
      return arr[i];
    }
  }
};