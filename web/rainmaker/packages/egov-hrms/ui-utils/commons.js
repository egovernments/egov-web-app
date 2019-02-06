"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findItemInArrayOfObject = exports.handleFileUpload = exports.acceptedFiles = exports.isFileValid = exports.getFileSize = exports.getImageUrlByFile = exports.applyTradeLicense = exports.getBoundaryData = exports.updatePFOforSearchResults = exports.updateEmployee = exports.createEmployee = exports.getSearchResults = exports.getFileUrlFromAPI = exports.getLocaleLabelsforTL = exports.updateTradeDetails = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _api = require("../ui-utils/api");

var _utils = require("../ui-config/screens/specs/utils");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _actions2 = require("egov-ui-framework/ui-redux/app/actions");

var _store = require("../ui-redux/store");

var _store2 = _interopRequireDefault(_store);

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _set = require("lodash/set");

var _set2 = _interopRequireDefault(_set);

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

            _store2.default.dispatch((0, _actions2.toggleSnackbarAndSetText)(true, _context.t0.message, "error"));
            throw _context.t0;

          case 11:
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

var getFileUrlFromAPI = exports.getFileUrlFromAPI = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(fileStoreId) {
    var queryObject, fileUrl;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            queryObject = [{ key: "tenantId", value: "pb" }, { key: "fileStoreIds", value: fileStoreId }];
            _context2.prev = 1;
            _context2.next = 4;
            return (0, _api.httpRequest)("get", "/filestore/v1/files/url", "", queryObject);

          case 4:
            fileUrl = _context2.sent;
            return _context2.abrupt("return", fileUrl);

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](1);

            console.log(_context2.t0);

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[1, 8]]);
  }));

  return function getFileUrlFromAPI(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

// HRMS Search API
var getSearchResults = exports.getSearchResults = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(queryObject) {
    var response;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return (0, _api.httpRequest)("post", "/egov-hrms/employees/_search", "", queryObject);

          case 3:
            response = _context3.sent;
            return _context3.abrupt("return", response);

          case 7:
            _context3.prev = 7;
            _context3.t0 = _context3["catch"](0);

            _store2.default.dispatch((0, _actions2.toggleSnackbarAndSetText)(true, _context3.t0.message, "error"));

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[0, 7]]);
  }));

  return function getSearchResults(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

// HRMS Search API
var createEmployee = exports.createEmployee = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(queryObject, payload) {
    var response;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return (0, _api.httpRequest)("post", "/egov-hrms/employees/_create", "", queryObject, { Employees: payload });

          case 3:
            response = _context4.sent;
            return _context4.abrupt("return", response);

          case 7:
            _context4.prev = 7;
            _context4.t0 = _context4["catch"](0);

            _store2.default.dispatch((0, _actions2.toggleSnackbarAndSetText)(true, _context4.t0.message, "error"));
            throw _context4.t0;

          case 11:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, undefined, [[0, 7]]);
  }));

  return function createEmployee(_x4, _x5) {
    return _ref4.apply(this, arguments);
  };
}();

// HRMS Update API
var updateEmployee = exports.updateEmployee = function () {
  var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(queryObject, payload) {
    var response;
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return (0, _api.httpRequest)("post", "/egov-hrms/employees/_update", "", queryObject, { Employees: payload });

          case 3:
            response = _context5.sent;
            return _context5.abrupt("return", response);

          case 7:
            _context5.prev = 7;
            _context5.t0 = _context5["catch"](0);

            _store2.default.dispatch((0, _actions2.toggleSnackbarAndSetText)(true, _context5.t0.message, "error"));
            throw _context5.t0;

          case 11:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, undefined, [[0, 7]]);
  }));

  return function updateEmployee(_x6, _x7) {
    return _ref5.apply(this, arguments);
  };
}();

var updatePFOforSearchResults = exports.updatePFOforSearchResults = function () {
  var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(action, state, dispatch, queryValue, queryValuePurpose, tenantId) {
    var queryObject, payload, licenseType, structureSubtype;
    return _regenerator2.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            queryObject = [{
              key: "tenantId",
              value: tenantId ? tenantId : localStorage.getItem("tenant-id")
            }, { key: "applicationNumber", value: queryValue }];
            _context6.next = 3;
            return getSearchResults(queryObject);

          case 3:
            payload = _context6.sent;

            if (payload) {
              dispatch((0, _actions.prepareFinalObject)("Licenses[0]", payload.Licenses[0]));
            }
            licenseType = payload && (0, _get2.default)(payload, "Licenses[0].licenseType");
            structureSubtype = payload && (0, _get2.default)(payload, "Licenses[0].tradeLicenseDetail.structureType");

            (0, _utils.setFilteredTradeTypes)(state, dispatch, licenseType, structureSubtype);
            (0, _utils.updateDropDowns)(payload, action, state, dispatch, queryValue);

            if (queryValuePurpose !== "cancel") {
              (0, _set2.default)(payload, (0, _utils.getSafetyNormsJson)(queryValuePurpose), "yes");
              (0, _set2.default)(payload, (0, _utils.getHygeneLevelJson)(queryValuePurpose), "yes");
              (0, _set2.default)(payload, (0, _utils.getLocalityHarmedJson)(queryValuePurpose), "No");
            }
            (0, _set2.default)(payload, (0, _utils.getCheckBoxJsonpath)(queryValuePurpose), true);

            setApplicationNumberBox(state, dispatch);
            // return action;

          case 12:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, undefined);
  }));

  return function updatePFOforSearchResults(_x8, _x9, _x10, _x11, _x12, _x13) {
    return _ref6.apply(this, arguments);
  };
}();

var getBoundaryData = exports.getBoundaryData = function () {
  var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(action, state, dispatch, queryObject, code, componentPath) {
    var payload, data, messageObject;
    return _regenerator2.default.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            _context7.next = 3;
            return (0, _api.httpRequest)("post", "/egov-location/location/v11/boundarys/_search?hierarchyTypeCode=REVENUE&boundaryType=Locality", "_search", queryObject, {});

          case 3:
            payload = _context7.sent;


            dispatch((0, _actions.prepareFinalObject)("applyScreenMdmsData.tenant.localities", payload.TenantBoundary && payload.TenantBoundary[0].boundary));

            dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.tradeLocationDetails.children.cardContent.children.tradeDetailsConatiner.children.tradeLocMohalla", "props.suggestions", payload.TenantBoundary && payload.TenantBoundary[0].boundary));
            if (code) {
              data = payload.TenantBoundary[0].boundary;
              messageObject = data && data.find(function (item) {
                return item.code == code;
              });

              if (messageObject) dispatch((0, _actions.prepareFinalObject)("Licenses[0].tradeLicenseDetail.address.locality.name", messageObject.name));
            }
            _context7.next = 12;
            break;

          case 9:
            _context7.prev = 9;
            _context7.t0 = _context7["catch"](0);

            console.log(_context7.t0);

          case 12:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, undefined, [[0, 9]]);
  }));

  return function getBoundaryData(_x14, _x15, _x16, _x17, _x18, _x19) {
    return _ref7.apply(this, arguments);
  };
}();

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
  var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8(state, dispatch, activeIndex) {
    var queryObject, currentFinancialYr, fY1, owners, cityId, tenantId, accessories, tradeUnits, action, updateResponse, searchQueryObject, searchResponse, updatedtradeUnits, tradeTemp, _accessories, _tradeUnits, mergedTradeUnits, mergedAccessories, mergedOwners, response;

    return _regenerator2.default.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            queryObject = JSON.parse(JSON.stringify((0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Licenses", [])));
            currentFinancialYr = (0, _utils.getCurrentFinancialYear)();
            //Changing the format of FY

            fY1 = currentFinancialYr.split("-")[1];

            fY1 = fY1.substring(2, 4);
            currentFinancialYr = currentFinancialYr.split("-")[0] + "-" + fY1;
            (0, _set2.default)(queryObject[0], "financialYear", currentFinancialYr);
            (0, _set2.default)(queryObject[0], "validFrom", (0, _utils.convertDateToEpoch)(queryObject[0].validFrom, "dayend"));
            (0, _set2.default)(queryObject[0], "validTo", (0, _utils.convertDateToEpoch)(queryObject[0].validTo, "dayend"));
            if (queryObject[0] && queryObject[0].commencementDate) {
              queryObject[0].commencementDate = (0, _utils.convertDateToEpoch)(queryObject[0].commencementDate, "dayend");
            }
            owners = (0, _get2.default)(queryObject[0], "tradeLicenseDetail.owners");

            owners = owners && convertOwnerDobToEpoch(owners) || [];

            //set(queryObject[0], "tradeLicenseDetail.owners", getMultipleOwners(owners));
            cityId = (0, _get2.default)(queryObject[0], "tradeLicenseDetail.address.tenantId", "");
            tenantId = (0, _utils.ifUserRoleExists)("CITIZEN") ? cityId : localStorage.getItem("tenant-id");


            (0, _set2.default)(queryObject[0], "tenantId", tenantId);

            if (!queryObject[0].applicationNumber) {
              _context8.next = 37;
              break;
            }

            //call update
            accessories = (0, _get2.default)(queryObject[0], "tradeLicenseDetail.accessories");
            tradeUnits = (0, _get2.default)(queryObject[0], "tradeLicenseDetail.tradeUnits");

            (0, _set2.default)(queryObject[0], "tradeLicenseDetail.tradeUnits", getMultiUnits(tradeUnits));
            (0, _set2.default)(queryObject[0], "tradeLicenseDetail.accessories", getMultiUnits(accessories));
            (0, _set2.default)(queryObject[0], "tradeLicenseDetail.owners", getMultipleOwners(owners));

            action = "INITIATE";

            if (queryObject[0].tradeLicenseDetail && queryObject[0].tradeLicenseDetail.applicationDocuments && activeIndex === 1) {
              (0, _set2.default)(queryObject[0], "tradeLicenseDetail.applicationDocuments", null);
            } else if (queryObject[0].tradeLicenseDetail && queryObject[0].tradeLicenseDetail.applicationDocuments) {
              action = "APPLY";
            }
            (0, _set2.default)(queryObject[0], "action", action);
            _context8.next = 26;
            return (0, _api.httpRequest)("post", "/tl-services/v1/_update", "", [], { Licenses: queryObject });

          case 26:
            updateResponse = _context8.sent;
            searchQueryObject = [{ key: "tenantId", value: queryObject[0].tenantId }, { key: "applicationNumber", value: queryObject[0].applicationNumber }];
            _context8.next = 30;
            return getSearchResults(searchQueryObject);

          case 30:
            searchResponse = _context8.sent;

            dispatch((0, _actions.prepareFinalObject)("Licenses", searchResponse.Licenses));
            updatedtradeUnits = (0, _get2.default)(searchResponse, "Licenses[0].tradeLicenseDetail.tradeUnits");
            tradeTemp = updatedtradeUnits.map(function (item, index) {
              return {
                tradeSubType: item.tradeType.split(".")[1],
                tradeType: item.tradeType.split(".")[0]
              };
            });

            dispatch((0, _actions.prepareFinalObject)("LicensesTemp.tradeUnits", tradeTemp));
            _context8.next = 50;
            break;

          case 37:
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
            _context8.next = 48;
            return (0, _api.httpRequest)("post", "/tl-services/v1/_create", "", [], { Licenses: queryObject });

          case 48:
            response = _context8.sent;

            dispatch((0, _actions.prepareFinalObject)("Licenses", response.Licenses));

          case 50:
            /** Application no. box setting */
            setApplicationNumberBox(state, dispatch);
            return _context8.abrupt("return", true);

          case 54:
            _context8.prev = 54;
            _context8.t0 = _context8["catch"](0);

            dispatch((0, _actions2.toggleSnackbarAndSetText)(true, _context8.t0.message, "error"));
            console.log(_context8.t0);
            return _context8.abrupt("return", false);

          case 59:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, undefined, [[0, 54]]);
  }));

  return function applyTradeLicense(_x20, _x21, _x22) {
    return _ref8.apply(this, arguments);
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

var acceptedFiles = exports.acceptedFiles = function acceptedFiles(acceptedExt) {
  var splitExtByName = acceptedExt.split(",");
  var acceptedFileTypes = splitExtByName.reduce(function (result, curr) {
    if (curr.includes("image")) {
      result.push("image");
    } else {
      result.push(curr.split(".")[1]);
    }
    return result;
  }, []);
  return acceptedFileTypes;
};

var handleFileUpload = exports.handleFileUpload = function handleFileUpload(event, handleDocument, props) {
  var S3_BUCKET = {
    endPoint: "filestore/v1/files"
  };
  var uploadDocument = true;
  var inputProps = props.inputProps,
      maxFileSize = props.maxFileSize;

  var input = event.target;
  if (input.files && input.files.length > 0) {
    var files = input.files;
    Object.keys(files).forEach(function () {
      var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9(key, index) {
        var file, fileValid, isSizeValid, fileStoreId, _fileStoreId;

        return _regenerator2.default.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                file = files[key];
                fileValid = isFileValid(file, acceptedFiles(inputProps.accept));
                isSizeValid = getFileSize(file) <= maxFileSize;

                if (!fileValid) {
                  // store.dispatch(
                  //   toggleSnackbarAndSetText(
                  //     true,
                  //     `Only image or pdf files can be uploaded`,
                  //     "error"
                  //   )
                  // );
                  alert("Only image or pdf files can be uploaded");
                  uploadDocument = false;
                }
                if (!isSizeValid) {
                  // store.dispatch(
                  //   toggleSnackbarAndSetText(
                  //     true,
                  //     `Maximum file size can be ${Math.round(maxFileSize / 1000)} MB`,
                  //     "error"
                  //   )
                  // );
                  alert("Maximum file size can be " + Math.round(maxFileSize / 1000) + " MB");
                  uploadDocument = false;
                }

                if (!uploadDocument) {
                  _context9.next = 17;
                  break;
                }

                if (!file.type.match(/^image\//)) {
                  _context9.next = 13;
                  break;
                }

                _context9.next = 9;
                return (0, _api.uploadFile)(S3_BUCKET.endPoint, "TL", file, "pb");

              case 9:
                fileStoreId = _context9.sent;

                handleDocument(file, fileStoreId);
                _context9.next = 17;
                break;

              case 13:
                _context9.next = 15;
                return (0, _api.uploadFile)(S3_BUCKET.endPoint, "TL", file, "pb");

              case 15:
                _fileStoreId = _context9.sent;

                handleDocument(file, _fileStoreId);

              case 17:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, undefined);
      }));

      return function (_x23, _x24) {
        return _ref9.apply(this, arguments);
      };
    }());
  }
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