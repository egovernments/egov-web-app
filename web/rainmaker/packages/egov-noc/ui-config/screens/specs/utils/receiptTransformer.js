"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadPdfGenerationData = exports.loadUserNameData = exports.loadMdmsData = exports.loadReceiptData = exports.loadApplicationData = exports.loadUlbLogo = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _store = require("../../../../ui-redux/store");

var _store2 = _interopRequireDefault(_store);

var _utils = require("../utils");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _commons2 = require("../../../../ui-utils/commons");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ifNotNull = function ifNotNull(value) {
  return !["", "NA", "null", null].includes(value);
};

var nullToNa = function nullToNa(value) {
  return ["", "NA", "null", null].includes(value) ? "NA" : value;
};

var createAddress = function createAddress(doorNo, buildingName, street, locality, city) {
  var address = "";
  address += ifNotNull(doorNo) ? doorNo + ", " : "";
  address += ifNotNull(buildingName) ? buildingName + ", " : "";
  address += ifNotNull(street) ? street + ", " : "";
  address += locality + ", ";
  address += city;
  return address;
};

var epochToDate = function epochToDate(et) {
  if (!et) return null;
  var date = new Date(Math.round(Number(et)));
  var formattedDate = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
  return formattedDate;
};

var getMessageFromLocalization = function getMessageFromLocalization(code) {
  var messageObject = JSON.parse((0, _localStorageUtils.getLocalization)("localization_en_IN")).find(function (item) {
    return item.code == code;
  });
  return messageObject ? messageObject.message : code;
};

var loadUlbLogo = exports.loadUlbLogo = function loadUlbLogo(tenantid) {
  var img = new Image();
  img.crossOrigin = "Anonymous";
  img.onload = function () {
    var canvas = document.createElement("CANVAS");
    var ctx = canvas.getContext("2d");
    canvas.height = this.height;
    canvas.width = this.width;
    ctx.drawImage(this, 0, 0);
    _store2.default.dispatch((0, _actions.prepareFinalObject)("base64UlbLogoForPdf", canvas.toDataURL()));
    canvas = null;
  };
  img.src = "/pb-egov-assets/" + tenantid + "/logo.png";
};

var loadApplicationData = exports.loadApplicationData = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(applicationNumber, tenant) {
    var data, queryObject, response, buildings, owners;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            data = {};
            queryObject = [{ key: "tenantId", value: tenant }, { key: "applicationNumber", value: applicationNumber }];
            _context.next = 4;
            return (0, _commons2.getSearchResults)(queryObject);

          case 4:
            response = _context.sent;


            if (response && response.FireNOCs && response.FireNOCs.length > 0) {
              data.applicationNumber = nullToNa((0, _get2.default)(response, "FireNOCs[0].fireNOCDetails.applicationNumber", "NA"));
              data.applicationStatus = (0, _get2.default)(response, "FireNOCs[0].fireNOCDetails.status");
              data.applicationDate = nullToNa(epochToDate((0, _get2.default)(response, "FireNOCs[0].fireNOCDetails.applicationDate", "NA")));
              data.applicationMode = getMessageFromLocalization(nullToNa((0, _get2.default)(response, "FireNOCs[0].fireNOCDetails.channel", "NA")));
              data.nocType = nullToNa((0, _get2.default)(response, "FireNOCs[0].fireNOCDetails.fireNOCType", "NA"));
              data.provisionalNocNumber = nullToNa((0, _get2.default)(response, "FireNOCs[0].provisionFireNOCNumber", "NA"));
              data.fireStationId = nullToNa(getMessageFromLocalization("FIRENOC_FIRESTATIONS_" + (0, _commons.getTransformedLocale)((0, _get2.default)(response, "FireNOCs[0].fireNOCDetails.firestationId", "NA"))));

              // Certificate Data
              data.fireNOCNumber = nullToNa((0, _get2.default)(response, "FireNOCs[0].fireNOCNumber", "NA"));
              data.issuedDate = nullToNa(epochToDate((0, _get2.default)(response, "FireNOCs[0].fireNOCDetails.issuedDate", "NA")));
              data.validTo = nullToNa(epochToDate((0, _get2.default)(response, "FireNOCs[0].fireNOCDetails.validTo", "NA")));

              // Buildings Data
              data.propertyType = nullToNa((0, _get2.default)(response, "FireNOCs[0].fireNOCDetails.noOfBuildings", "NA"));
              buildings = (0, _get2.default)(response, "FireNOCs[0].fireNOCDetails.buildings", []);

              data.buildings = buildings.map(function (building) {
                var uoms = (0, _get2.default)(building, "uoms", []);
                var uomsObject = {};
                uoms.forEach(function (uom) {
                  uomsObject[uom.code] = uom.value;
                });
                return (0, _extends3.default)({
                  name: (0, _get2.default)(building, "name", "NA"),
                  usageType: getMessageFromLocalization("FIRENOC_BUILDINGTYPE_" + (0, _commons.getTransformedLocale)((0, _get2.default)(building, "usageType", "NA").split(".")[0])),
                  usageSubType: getMessageFromLocalization("FIRENOC_BUILDINGTYPE_" + (0, _commons.getTransformedLocale)((0, _get2.default)(building, "usageType", "NA")))
                }, uomsObject);
              });

              // Property Location
              data.propertyId = nullToNa((0, _get2.default)(response, "FireNOCs[0].fireNOCDetails.propertyDetails.propertyId", "NA"));
              data.city = nullToNa(getMessageFromLocalization("TENANT_TENANTS_" + (0, _commons.getTransformedLocale)((0, _get2.default)(response, "FireNOCs[0].fireNOCDetails.propertyDetails.address.city", "NA"))));
              data.door = nullToNa((0, _get2.default)(response, "FireNOCs[0].fireNOCDetails.propertyDetails.address.doorNo", "NA"));
              data.buildingName = nullToNa((0, _get2.default)(response, "FireNOCs[0].fireNOCDetails.propertyDetails.address.buildingName", "NA"));
              data.street = nullToNa((0, _get2.default)(response, "FireNOCs[0].fireNOCDetails.propertyDetails.address.street", "NA"));
              data.mohalla = nullToNa(getMessageFromLocalization("revenue.locality." + (0, _commons.getTransformedLocale)((0, _get2.default)(response, "FireNOCs[0].fireNOCDetails.propertyDetails.address.locality.code", "NA"))));
              data.pincode = nullToNa((0, _get2.default)(response, "FireNOCs[0].fireNOCDetails.propertyDetails.address.pincode", "NA"));
              data.gis = nullToNa((0, _get2.default)(response, "FireNOCs[0].fireNOCDetails.propertyDetails.address.locality.latitude", "NA"));
              data.address = createAddress(data.door, data.buildingName, data.street, data.mohalla, data.city);

              // Applicant Details
              owners = (0, _get2.default)(response, "FireNOCs[0].fireNOCDetails.applicantDetails.owners", []);

              data.owners = owners.map(function (owner) {
                return {
                  mobile: (0, _get2.default)(owner, "mobileNumber", "NA"),
                  name: (0, _get2.default)(owner, "name", "NA"),
                  gender: (0, _get2.default)(owner, "gender", "NA"),
                  fatherHusbandName: (0, _get2.default)(owner, "fatherOrHusbandName", "NA"),
                  dob: epochToDate((0, _get2.default)(owner, "dob", "NA")),
                  email: (0, _get2.default)(owner, "emailId", "NA"),
                  pan: (0, _get2.default)(owner, "pan", "NA"),
                  address: (0, _get2.default)(owner, "correspondenceAddress", "NA")
                };
              });

              // Documents

              // User Data
              loadUserNameData((0, _get2.default)(response, "FireNOCs[0].auditDetails.lastModifiedBy"));
            }
            _store2.default.dispatch((0, _actions.prepareFinalObject)("applicationDataForPdf", data));

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function loadApplicationData(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var loadReceiptData = exports.loadReceiptData = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(consumerCode, tenant) {
    var data, queryObject, response, nocAdhocPenalty, nocAdhocRebate;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            data = {};
            queryObject = [{
              key: "tenantId",
              value: tenant
            }, {
              key: "consumerCode",
              value: consumerCode
            }];
            _context2.next = 4;
            return (0, _utils.getReceiptData)(queryObject);

          case 4:
            response = _context2.sent;


            if (response && response.Receipt && response.Receipt.length > 0) {
              data.receiptNumber = nullToNa((0, _get2.default)(response, "Receipt[0].Bill[0].billDetails[0].receiptNumber", "NA"));
              data.amountPaid = (0, _get2.default)(response, "Receipt[0].Bill[0].billDetails[0].amountPaid", 0);
              data.totalAmount = (0, _get2.default)(response, "Receipt[0].Bill[0].billDetails[0].totalAmount", 0);
              data.amountDue = data.totalAmount - data.amountPaid;
              data.paymentMode = nullToNa((0, _get2.default)(response, "Receipt[0].instrument.instrumentType.name", "NA"));
              data.transactionNumber = nullToNa((0, _get2.default)(response, "Receipt[0].instrument.transactionNumber", "NA"));
              data.bankName = (0, _get2.default)(response, "Receipt[0].instrument.bank.name", "NA");
              data.branchName = (0, _get2.default)(response, "Receipt[0].instrument.branchName", null);
              data.bankAndBranch = nullToNa(data.bankName && data.branchName ? data.bankName + ", " + data.branchName : (0, _get2.default)(data, "bankName", "NA"));
              data.paymentDate = nullToNa(epochToDate((0, _get2.default)(response, "Receipt[0].Bill[0].billDetails[0].receiptDate", 0)));
              data.g8ReceiptNo = nullToNa((0, _get2.default)(response, "Receipt[0].Bill[0].billDetails[0].manualReceiptNumber", "NA"));
              data.g8ReceiptDate = nullToNa(epochToDate((0, _get2.default)(response, "Receipt[0].Bill[0].billDetails[0].manualReceiptDate", 0)));
              /** START NOC Fee, Adhoc Penalty/Rebate Calculation */
              nocAdhocPenalty = 0, nocAdhocRebate = 0;

              response.Receipt[0].Bill[0].billDetails[0].billAccountDetails.map(function (item) {
                var desc = item.taxHeadCode ? item.taxHeadCode : "";
                if (desc === "FIRENOC_FEES") {
                  data.nocFee = item.amount;
                } else if (desc === "NOC_ADHOC_PENALTY") {
                  data.nocAdhocPenalty = item.amount;
                } else if (desc === "NOC_ADHOC_REBATE") {
                  data.nocAdhocRebate = item.amount;
                } else if (desc === "FIRENOC_TAXES") {
                  data.nocTaxes = item.amount;
                }
              });
              data.nocPenaltyRebate = "NA";
              data.nocAdhocPenaltyRebate = nocAdhocPenalty - nocAdhocRebate;
              /** END */
            }
            _store2.default.dispatch((0, _actions.prepareFinalObject)("receiptDataForPdf", data));

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function loadReceiptData(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var loadMdmsData = exports.loadMdmsData = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(tenantid) {
    var localStorageLabels, localizationLabels, data, queryObject, response, ulbData, ulbGrade, cityKey;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            localStorageLabels = JSON.parse(window.localStorage.getItem("localization_" + (0, _localStorageUtils.getLocale)()));
            localizationLabels = (0, _commons.transformById)(localStorageLabels, "code");
            data = {};
            queryObject = [{
              key: "tenantId",
              value: "" + tenantid
            }, {
              key: "moduleName",
              value: "tenant"
            }, {
              key: "masterName",
              value: "tenants"
            }];
            _context3.next = 6;
            return (0, _utils.getMdmsData)(queryObject);

          case 6:
            response = _context3.sent;


            if (response && response.MdmsRes && response.MdmsRes.tenant.tenants.length > 0) {
              ulbData = response.MdmsRes.tenant.tenants.find(function (item) {
                return item.code == tenantid;
              });
              /** START Corporation name generation logic */

              ulbGrade = (0, _get2.default)(ulbData, "city.ulbGrade", "NA") ? (0, _commons.getUlbGradeLabel)((0, _get2.default)(ulbData, "city.ulbGrade", "NA")) : "MUNICIPAL CORPORATION";
              cityKey = "TENANT_TENANTS_" + (0, _get2.default)(ulbData, "code", "NA").toUpperCase().replace(/[.]/g, "_");


              data.corporationName = (0, _commons.getTranslatedLabel)(cityKey, localizationLabels).toUpperCase() + " " + (0, _commons.getTranslatedLabel)(ulbGrade, localizationLabels);

              /** END */
              data.corporationAddress = (0, _get2.default)(ulbData, "address", "NA");
              data.corporationContact = (0, _get2.default)(ulbData, "contactNumber", "NA");
              data.corporationWebsite = (0, _get2.default)(ulbData, "domainUrl", "NA");
              data.corporationEmail = (0, _get2.default)(ulbData, "emailId", "NA");
            }
            _store2.default.dispatch((0, _actions.prepareFinalObject)("mdmsDataForPdf", data));

          case 9:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function loadMdmsData(_x5) {
    return _ref3.apply(this, arguments);
  };
}();

var loadUserNameData = exports.loadUserNameData = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(uuid) {
    var data, bodyObject, response;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            data = {};
            bodyObject = {
              uuid: [uuid]
            };
            _context4.next = 4;
            return (0, _utils.getUserDataFromUuid)(bodyObject);

          case 4:
            response = _context4.sent;


            if (response && response.user && response.user.length > 0) {
              data.auditorName = (0, _get2.default)(response, "user[0].name", "NA");
            }
            _store2.default.dispatch((0, _actions.prepareFinalObject)("userDataForPdf", data));

          case 7:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function loadUserNameData(_x6) {
    return _ref4.apply(this, arguments);
  };
}();

/** Data used for creation of receipt is generated and stored in local storage here */
var loadPdfGenerationData = exports.loadPdfGenerationData = function loadPdfGenerationData(applicationNumber, tenant) {
  /** Logo loaded and stored in local storage in base64 */
  loadUlbLogo(tenant);
  loadApplicationData(applicationNumber, tenant); //PB-FN-2019-06-14-002241
  loadReceiptData(applicationNumber, tenant); //PB-FN-2019-06-14-002241
  loadMdmsData(tenant);
};