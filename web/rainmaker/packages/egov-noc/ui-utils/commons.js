"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setApplicationNumberBox = exports.furnishNocResponse = exports.prepareDocumentsUploadRedux = exports.prepareDocumentsUploadData = exports.createUpdateNocApplication = exports.getSearchResults = exports.findItemInArrayOfObject = exports.getLocaleLabelsforTL = undefined;

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _api = require("egov-ui-framework/ui-utils/api");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _jsonpath = require("jsonpath");

var _jsonpath2 = _interopRequireDefault(_jsonpath);

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _set = require("lodash/set");

var _set2 = _interopRequireDefault(_set);

var _store = require("ui-redux/store");

var _store2 = _interopRequireDefault(_store);

var _utils = require("../ui-config/screens/specs/utils");

var _utils2 = require("egov-ui-framework/ui-config/screens/specs/utils");

var _commons = require("egov-ui-framework/ui-utils/commons");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var findItemInArrayOfObject = exports.findItemInArrayOfObject = function findItemInArrayOfObject(arr, conditionCheckerFn) {
  for (var i = 0; i < arr.length; i++) {
    if (conditionCheckerFn(arr[i])) {
      return arr[i];
    }
  }
};

var getSearchResults = exports.getSearchResults = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(queryObject, dispatch) {
    var response;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return (0, _api.httpRequest)("post", "/firenoc-services/v1/_search", "", queryObject);

          case 3:
            response = _context.sent;
            return _context.abrupt("return", response);

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);

            _store2.default.dispatch((0, _actions.toggleSnackbar)(true, { labelName: _context.t0.message, labelKey: _context.t0.message }, "error"));
            throw _context.t0;

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 7]]);
  }));

  return function getSearchResults(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var createUpdateNocApplication = exports.createUpdateNocApplication = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(state, dispatch, status) {
    var nocId, method, payload, tenantId, reduxDocuments, buildings, ownerDocuments, otherDocuments, owners, response, fireNocData;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            nocId = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.FireNOCs[0].id");
            method = nocId ? "UPDATE" : "CREATE";
            _context2.prev = 2;
            payload = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "FireNOCs", []);
            tenantId = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "FireNOCs[0].fireNOCDetails.propertyDetails.address.city", (0, _localStorageUtils.getTenantId)());

            (0, _set2.default)(payload[0], "tenantId", tenantId);
            (0, _set2.default)(payload[0], "fireNOCDetails.action", status);

            // Get uploaded documents from redux
            reduxDocuments = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.documentsUploadRedux", {});
            buildings = (0, _get2.default)(payload, "[0].fireNOCDetails.buildings", []);

            buildings.forEach(function (building, index) {
              // GET UOMS FOR THE SELECTED BUILDING TYPE
              var requiredUoms = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.applyScreenMdmsData.firenoc.BuildingType", []).filter(function (buildingType) {
                return buildingType.code === building.usageType;
              });
              requiredUoms = (0, _get2.default)(requiredUoms, "[0].uom", []);
              // GET UNIQUE UOMS LIST INCLUDING THE DEFAULT
              var allUoms = [].concat((0, _toConsumableArray3.default)(new Set([].concat((0, _toConsumableArray3.default)(requiredUoms), ["NO_OF_FLOORS", "NO_OF_BASEMENTS", "PLOT_SIZE", "BUILTUP_AREA", "HEIGHT_OF_BUILDING"]))));
              var finalUoms = [];
              allUoms.forEach(function (uom) {
                var value = (0, _get2.default)(building.uomsMap, uom);
                value && finalUoms.push({
                  code: uom,
                  value: parseInt(value),
                  isActiveUom: requiredUoms.includes(uom) ? true : false,
                  active: true
                });
              });
              (0, _set2.default)(payload[0], "fireNOCDetails.buildings[" + index + "].uoms", finalUoms);

              // Set building documents
              var uploadedDocs = [];
              _jsonpath2.default.query(reduxDocuments, "$.*").forEach(function (doc) {
                if (doc.documents && doc.documents.length > 0) {
                  if (doc.documentSubCode && doc.documentSubCode.startsWith("BUILDING.BUILDING_PLAN")) {
                    if (doc.documentCode === building.name) {
                      uploadedDocs = [].concat((0, _toConsumableArray3.default)(uploadedDocs), [{
                        tenantId: tenantId,
                        documentType: doc.documentSubCode,
                        fileStoreId: doc.documents[0].fileStoreId
                      }]);
                    }
                  }
                }
              });
              (0, _set2.default)(payload[0], "fireNOCDetails.buildings[" + index + "].applicationDocuments", uploadedDocs);
            });

            // Set owners & other documents
            ownerDocuments = [];
            otherDocuments = [];

            _jsonpath2.default.query(reduxDocuments, "$.*").forEach(function (doc) {
              if (doc.documents && doc.documents.length > 0) {
                if (doc.documentType === "OWNER") {
                  ownerDocuments = [].concat((0, _toConsumableArray3.default)(ownerDocuments), [{
                    tenantId: tenantId,
                    documentType: doc.documentSubCode ? doc.documentSubCode : doc.documentCode,
                    fileStoreId: doc.documents[0].fileStoreId
                  }]);
                } else if (!doc.documentSubCode) {
                  // SKIP BUILDING PLAN DOCS
                  otherDocuments = [].concat((0, _toConsumableArray3.default)(otherDocuments), [{
                    tenantId: tenantId,
                    documentType: doc.documentCode,
                    fileStoreId: doc.documents[0].fileStoreId
                  }]);
                }
              }
            });

            (0, _set2.default)(payload[0], "fireNOCDetails.applicantDetails.additionalDetail.documents", ownerDocuments);
            (0, _set2.default)(payload[0], "fireNOCDetails.additionalDetail.documents", otherDocuments);

            // Set Channel and Financial Year
            (0, _set2.default)(payload[0], "fireNOCDetails.channel", "COUNTER");
            (0, _set2.default)(payload[0], "fireNOCDetails.financialYear", "2019-20");

            // Set Dates to Epoch
            owners = (0, _get2.default)(payload[0], "fireNOCDetails.applicantDetails.owners", []);

            owners.forEach(function (owner, index) {
              (0, _set2.default)(payload[0], "fireNOCDetails.applicantDetails.owners[" + index + "].dob", (0, _utils2.convertDateToEpoch)((0, _get2.default)(owner, "dob")));
            });

            response = void 0;

            if (!(method === "CREATE")) {
              _context2.next = 29;
              break;
            }

            _context2.next = 23;
            return (0, _api.httpRequest)("post", "/firenoc-services/v1/_create", "", [], { FireNOCs: payload });

          case 23:
            response = _context2.sent;

            response = furnishNocResponse(response);
            dispatch((0, _actions.prepareFinalObject)("FireNOCs", response.FireNOCs));
            setApplicationNumberBox(state, dispatch);
            _context2.next = 35;
            break;

          case 29:
            if (!(method === "UPDATE")) {
              _context2.next = 35;
              break;
            }

            _context2.next = 32;
            return (0, _api.httpRequest)("post", "/firenoc-services/v1/_update", "", [], { FireNOCs: payload });

          case 32:
            response = _context2.sent;

            response = furnishNocResponse(response);
            dispatch((0, _actions.prepareFinalObject)("FireNOCs", response.FireNOCs));

          case 35:
            return _context2.abrupt("return", { status: "success", message: response });

          case 38:
            _context2.prev = 38;
            _context2.t0 = _context2["catch"](2);

            dispatch((0, _actions.toggleSnackbar)(true, { labelName: _context2.t0.message }, "error"));

            // Revert the changed pfo in case of request failure
            fireNocData = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.FireNOCs", []);

            fireNocData = furnishNocResponse({ FireNOCs: fireNocData });
            dispatch((0, _actions.prepareFinalObject)("FireNOCs", fireNocData.FireNOCs));

            return _context2.abrupt("return", { status: "failure", message: _context2.t0 });

          case 45:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[2, 38]]);
  }));

  return function createUpdateNocApplication(_x3, _x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();

var prepareDocumentsUploadData = exports.prepareDocumentsUploadData = function prepareDocumentsUploadData(state, dispatch) {
  var documents = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.applyScreenMdmsData.firenoc.Documents", []);
  documents = documents.filter(function (item) {
    return item.active;
  });
  var documentsContract = [];
  var tempDoc = {};
  documents.forEach(function (doc) {
    var card = {};
    card["code"] = doc.documentType;
    card["title"] = doc.documentType;
    card["cards"] = [];
    tempDoc[doc.documentType] = card;
  });

  documents.forEach(function (doc) {
    // Handle the case for multiple muildings
    if (doc.code === "BUILDING.BUILDING_PLAN" && doc.hasMultipleRows && doc.options) {
      var buildingsData = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.FireNOCs[0].fireNOCDetails.buildings", []);

      buildingsData.forEach(function (building) {
        var card = {};
        card["name"] = building.name;
        card["code"] = doc.code;
        card["hasSubCards"] = true;
        card["subCards"] = [];
        doc.options.forEach(function (subDoc) {
          var subCard = {};
          subCard["name"] = subDoc.code;
          subCard["required"] = subDoc.required ? true : false;
          card.subCards.push(subCard);
        });
        tempDoc[doc.documentType].cards.push(card);
      });
    } else {
      var card = {};
      card["name"] = doc.code;
      card["code"] = doc.code;
      card["required"] = doc.required ? true : false;
      if (doc.hasDropdown && doc.dropdownData) {
        var dropdown = {};
        dropdown.label = "NOC_SELECT_DOC_DD_LABEL";
        dropdown.required = true;
        dropdown.menu = doc.dropdownData.filter(function (item) {
          return item.active;
        });
        dropdown.menu = dropdown.menu.map(function (item) {
          return { code: item.code, label: (0, _commons.getTransformedLocale)(item.code) };
        });
        card["dropdown"] = dropdown;
      }
      tempDoc[doc.documentType].cards.push(card);
    }
  });

  Object.keys(tempDoc).forEach(function (key) {
    documentsContract.push(tempDoc[key]);
  });

  dispatch((0, _actions.prepareFinalObject)("documentsContract", documentsContract));
};

var prepareDocumentsUploadRedux = exports.prepareDocumentsUploadRedux = function prepareDocumentsUploadRedux(state, dispatch) {
  var _props = undefined.props,
      documentsList = _props.documentsList,
      _props$documentsUploa = _props.documentsUploadRedux,
      documentsUploadRedux = _props$documentsUploa === undefined ? {} : _props$documentsUploa,
      prepareFinalObject = _props.prepareFinalObject;

  var index = 0;
  documentsList.forEach(function (docType) {
    docType.cards && docType.cards.forEach(function (card) {
      if (card.subCards) {
        card.subCards.forEach(function (subCard) {
          var oldDocType = (0, _get2.default)(documentsUploadRedux, "[" + index + "].documentType");
          var oldDocCode = (0, _get2.default)(documentsUploadRedux, "[" + index + "].documentCode");
          var oldDocSubCode = (0, _get2.default)(documentsUploadRedux, "[" + index + "].documentSubCode");
          if (oldDocType != docType.code || oldDocCode != card.name || oldDocSubCode != subCard.name) {
            documentsUploadRedux[index] = {
              documentType: docType.code,
              documentCode: card.name,
              documentSubCode: subCard.name
            };
          }
          index++;
        });
      } else {
        var oldDocType = (0, _get2.default)(documentsUploadRedux, "[" + index + "].documentType");
        var oldDocCode = (0, _get2.default)(documentsUploadRedux, "[" + index + "].documentCode");
        if (oldDocType != docType.code || oldDocCode != card.name) {
          documentsUploadRedux[index] = {
            documentType: docType.code,
            documentCode: card.name
          };
        }
      }
      index++;
    });
  });
  prepareFinalObject("documentsUploadRedux", documentsUploadRedux);
};

var furnishNocResponse = exports.furnishNocResponse = function furnishNocResponse(response) {
  // Handle applicant ownership dependent dropdowns
  var ownershipType = (0, _get2.default)(response, "FireNOCs[0].fireNOCDetails.applicantDetails.ownerShipType");
  (0, _set2.default)(response, "FireNOCs[0].fireNOCDetails.applicantDetails.ownerShipMajorType", ownershipType == undefined ? "SINGLE" : ownershipType.split(".")[0]);

  // Prepare UOMS and Usage Type Dropdowns in required format
  var buildings = (0, _get2.default)(response, "FireNOCs[0].fireNOCDetails.buildings", []);
  buildings.forEach(function (building, index) {
    var uoms = (0, _get2.default)(building, "uoms", []);
    var uomMap = {};
    uoms.forEach(function (uom) {
      uomMap[uom.code] = "" + uom.value;
    });
    (0, _set2.default)(response, "FireNOCs[0].fireNOCDetails.buildings[" + index + "].uomsMap", uomMap);

    var usageType = (0, _get2.default)(building, "usageType");
    (0, _set2.default)(response, "FireNOCs[0].fireNOCDetails.buildings[" + index + "].usageTypeMajor", usageType == undefined ? "" : usageType.split(".")[0]);
  });

  return response;
};

var setApplicationNumberBox = exports.setApplicationNumberBox = function setApplicationNumberBox(state, dispatch, applicationNo) {
  if (!applicationNo) {
    applicationNo = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.FireNOCs[0].fireNOCDetails.applicationNumber", null);
  }

  if (applicationNo) {
    dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.headerDiv.children.header.children.applicationNumber", "visible", true));
    dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.headerDiv.children.header.children.applicationNumber", "props.number", applicationNo));
  }
};