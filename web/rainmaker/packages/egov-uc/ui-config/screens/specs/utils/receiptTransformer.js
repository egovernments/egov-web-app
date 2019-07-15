"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadMdmsData = exports.loadReceiptData = exports.loadUlbLogo = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _store = require("../../../../ui-redux/store");

var _store2 = _interopRequireDefault(_store);

var _index = require("../utils/index");

var _utils = require("../utils");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _commons = require("egov-ui-framework/ui-utils/commons");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var localizationLabels = JSON.parse((0, _localStorageUtils.getLocalization)("localization_en_IN"));
var transfomedKeys = (0, _commons.transformById)(localizationLabels, "code");

var ifNotNull = function ifNotNull(value) {
  return !["", "NA", "null", null].includes(value);
};

var nullToNa = function nullToNa(value) {
  return ["", "NA", "null", null].includes(value) ? "None" : value;
};

var epochToDate = function epochToDate(et) {
  if (!et) return null;
  var date = new Date(Math.round(Number(et)));
  var formattedDate = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
  return formattedDate;
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
    _store2.default.dispatch((0, _actions.prepareFinalObject)("base64UlbLogo", canvas.toDataURL()));
    canvas = null;
  };
  img.src = "/pb-egov-assets/" + tenantid + "/logo.png";
};

var loadReceiptData = exports.loadReceiptData = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(response) {
    var data, fromDate, toDate, serviceCatLabel, serviceTypeLabel, serviceType, queryObj;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            data = {};

            if (!(response.Bill && response.Bill.length > 0)) {
              _context.next = 28;
              break;
            }

            data.receiptDate = epochToDate((0, _get2.default)(response, "Bill[0].billDetails[0].receiptDate"));
            fromDate = epochToDate((0, _get2.default)(response, "Bill[0].billDetails[0].fromPeriod"));
            toDate = epochToDate((0, _get2.default)(response, "Bill[0].billDetails[0].toPeriod"));

            data.taxPeriod = fromDate + " - " + toDate;
            data.consumerName = (0, _get2.default)(response, "Bill[0].payerName");
            data.mobileNumber = (0, _get2.default)(response, "Bill[0].mobileNumber");

            serviceCatLabel = (0, _commons.getTransformedLocale)((0, _get2.default)(response, "Bill[0].billDetails[0].businessService").split(".")[0]);

            data.serviceCategory = (0, _commons.getLocaleLabels)("", "BILLINGSERVICE_BUSINESSSERVICE_" + serviceCatLabel, transfomedKeys);

            serviceTypeLabel = (0, _commons.getTransformedLocale)((0, _get2.default)(response, "Bill[0].billDetails[0].businessService"));
            serviceType = (0, _commons.getLocaleLabels)("", "BILLINGSERVICE_BUSINESSSERVICE_" + serviceTypeLabel, transfomedKeys);

            data.serviceType = serviceType ? serviceType : "NA";
            data.amountPaid = (0, _get2.default)(response, "Bill[0].billDetails[0].amountPaid", 0);
            data.totalAmount = (0, _get2.default)(response, "Bill[0].billDetails[0].totalAmount", 0);
            data.amountDue = data.totalAmount - data.amountPaid;
            data.paymentMode = nullToNa((0, _get2.default)(response, "instrument.instrumentType.name", "NA"));
            data.receiptNumber = (0, _get2.default)(response, "Bill[0].billDetails[0].receiptNumber", null);
            data.g8ReceiptNo = nullToNa((0, _get2.default)(response, "Bill[0].billDetails[0].manualReceiptNumber", "None"));

            queryObj = [{
              key: "ids",
              value: (0, _get2.default)(response, "auditDetails.createdBy")
            }, {
              key: "tenantId",
              value: process.env.REACT_APP_NAME === "Employee" ? (0, _localStorageUtils.getTenantId)() : response.tenantId
            }];

            if (!((0, _get2.default)(response, "instrument.instrumentType.name") !== "Online")) {
              _context.next = 26;
              break;
            }

            _context.next = 23;
            return (0, _index.getEmployeeName)(queryObj);

          case 23:
            _context.t0 = _context.sent;
            _context.next = 27;
            break;

          case 26:
            _context.t0 = "NA";

          case 27:
            data.createdBy = _context.t0;

          case 28:
            return _context.abrupt("return", data);

          case 29:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function loadReceiptData(_x) {
    return _ref.apply(this, arguments);
  };
}();

var loadMdmsData = exports.loadMdmsData = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(tenantid) {
    var localStorageLabels, localizationLabels, data, queryObject, response, ulbData, ulbGrade, cityKey;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
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
            _context2.next = 6;
            return (0, _utils.getMdmsData)(queryObject);

          case 6:
            response = _context2.sent;


            if (response && response.MdmsRes && response.MdmsRes.tenant.tenants.length > 0) {
              ulbData = response.MdmsRes.tenant.tenants.find(function (item) {
                return item.code == tenantid;
              });
              /** START Corporation name generation logic */
              // let ulbGrade = get(ulbData, "city.ulbGrade", "NA");
              // let name = get(ulbData, "city.name", "NA");
              // if (ulbGrade) {
              //   if (ulbGrade === "NP") {
              //     data.corporationName = `${name.toUpperCase()} NAGAR PANCHAYAT`;
              //   } else if (ulbGrade === "Municipal Corporation") {
              //     data.corporationName = `${name.toUpperCase()} MUNICIPAL CORPORATION`;
              //   } else if (ulbGrade.includes("MC Class")) {
              //     data.corporationName = `${name.toUpperCase()} MUNICIPAL COUNCIL`;
              //   } else {
              //     data.corporationName = `${name.toUpperCase()} MUNICIPAL CORPORATION`;
              //   }
              // } else {
              //   data.corporationName = `${name.toUpperCase()} MUNICIPAL CORPORATION`;
              // }

              ulbGrade = (0, _get2.default)(ulbData, "city.ulbGrade", "NA") ? (0, _commons.getUlbGradeLabel)((0, _get2.default)(ulbData, "city.ulbGrade", "NA")) : "MUNICIPAL CORPORATION";
              cityKey = "TENANT_TENANTS_" + (0, _get2.default)(ulbData, "code", "NA").toUpperCase().replace(/[.]/g, "_");


              data.corporationName = (0, _commons.getTranslatedLabel)(cityKey, localizationLabels).toUpperCase() + " " + (0, _commons.getTranslatedLabel)(ulbGrade, localizationLabels).toUpperCase();

              /** END */
              data.corporationAddress = (0, _get2.default)(ulbData, "address", "NA");
              data.corporationContact = (0, _get2.default)(ulbData, "contactNumber", "NA");
              data.corporationWebsite = (0, _get2.default)(ulbData, "domainUrl", "NA");
              data.corporationEmail = (0, _get2.default)(ulbData, "emailId", "NA");
            }
            _store2.default.dispatch((0, _actions.prepareFinalObject)("mdmsDataForReceipt", data));

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function loadMdmsData(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

/** Data used for creation of receipt is generated and stored in local storage here */