"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateCitizenReciept = exports.generateReciept = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _pdfmake = require("pdfmake/build/pdfmake");

var _pdfmake2 = _interopRequireDefault(_pdfmake);

var _vfs_fonts = require("pdfmake/build/vfs_fonts");

var _vfs_fonts2 = _interopRequireDefault(_vfs_fonts);

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _isEmpty = require("lodash/isEmpty");

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _store = require("../../../../ui-redux/store");

var _store2 = _interopRequireDefault(_store);

var _commons = require("egov-ui-framework/ui-utils/commons");

var _receiptTransformer = require("./receiptTransformer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_pdfmake2.default.vfs = _vfs_fonts2.default.pdfMake.vfs;

var receiptTableWidth = ["*", "*", "*", "*"];
var getCitizenReceipetData = function getCitizenReceipetData(transformedData) {
  var citizenRecieptData = {
    content: [{
      style: "tl-head",
      table: {
        widths: [100, "*", 18],
        body: [[{
          image: transformedData.ulbLogo,
          width: 60,
          height: 61.25,
          margin: [41, 12, 10, 10],
          border: [false, false, false, false]
        }, {
          stack: [{
            text: transformedData.corporationName,
            style: "receipt-logo-header"
          }, {
            text: "Payment Receipt",
            style: "receipt-logo-sub-header",
            margin: [0, 10, 0, 0]
          }],
          alignment: "left",
          border: [false, false, false, false],

          margin: [10, 23, 0, 0]
        }, {
          stack: [{
            text: "Receipt No",
            style: "receipt-logo-sub-header"
          }, {
            text: transformedData.receiptNumber,
            style: "receipt-logo-header",
            margin: [0, 10, 0, 0]
          }],
          alignment: "center",
          margin: [-250, 23, 0, 0]
        }]]
      },
      layout: {}
    }, {
      style: "pt-reciept-citizen-header",
      columns: [{
        text: [{
          text: "Receipt Date   ",
          bold: true
        }, {
          text: transformedData.receiptDate,
          bold: false
        }],
        alignment: "left"
      }, {
        text: [{
          text: "Contact No ",
          bold: true
        }, {
          text: "+91 27272828222",
          bold: false
        }],
        alignment: "right",
        margin: [100, 0, 0, 0]
      }]
    }, {
      style: "pt-reciept-citizen-header",
      columns: [{
        text: [{
          text: "Tax Period   ",
          bold: true
        }, {
          text: transformedData.taxPeriod,
          bold: false
        }],
        alignment: "left"
      }, {
        text: [{
          text: "Website ",
          bold: true
        }, {
          text: "www.pmidc.com",
          bold: false
        }],
        alignment: "right",
        margin: [100, 0, 0, 0]
      }]
    }, {
      text: "",
      style: "pt-reciept-citizen-subheader"
    }, {
      style: "pt-reciept-citizen-table",
      table: {
        widths: receiptTableWidth,

        body: [[{
          text: "Consumer Name",
          border: [true, true, false, true],
          style: "receipt-table-key"
        }, {
          text: transformedData.consumerName,
          border: [false, true, true, true]
        }, {
          text: "Mobile No.",
          border: [true, true, false, true],
          style: "receipt-table-key"
        }, {
          text: transformedData.mobileNumber,
          border: [false, true, true, true]
        }], [{
          text: "Service Category",
          border: [true, true, false, true],
          style: "receipt-table-key"
        }, {
          text: transformedData.serviceCategory,
          border: [false, true, true, true]
        }, {
          text: "Service Type",
          border: [true, true, false, true],
          style: "receipt-table-key"
        }, {
          text: transformedData.serviceType,
          border: [false, true, true, true]
        }], [{
          text: "Amount Paid",
          border: [true, true, false, true],
          style: "receipt-table-key"
        }, {
          text: transformedData.amountPaid,
          border: [false, true, true, true]
        }, {
          text: "Amount Due",
          border: [true, true, false, true],
          style: "receipt-table-key"
        }, {
          text: transformedData.amountDue,
          border: [false, true, true, true]
        }], [{
          text: "Payment Mode",
          border: [true, true, false, true],
          style: "receipt-table-key"
        }, {
          text: transformedData.paymentMode,
          border: [false, true, true, true]
        }, {
          text: "G8 Receipt No.",
          border: [true, true, false, true],
          style: "receipt-table-key"
        }, {
          text: transformedData.g8ReceiptNo,
          border: [false, true, true, true]
        }], [{
          text: "Created By",
          border: [true, true, false, true],
          style: "receipt-table-key"
        }, {
          text: transformedData.createdBy,
          border: [false, true, true, true]
        }, {
          text: "",
          border: [true, true, false, true],
          style: "receipt-table-key"
        }, {
          text: "",
          border: [false, true, true, true]
        }]]
      },
      layout: {}
    }, {
      text: "",
      style: "pt-reciept-citizen-subheader"
    }, {
      style: "pt-reciept-citizen-header",
      columns: [{
        text: [{
          text: "Commissioner/EO",
          bold: true
        }],
        alignment: "right"
      }]
    }],

    footer: [],

    styles: {
      "tl-head": {
        fillColor: "#F2F2F2",
        margin: [-70, -41, -81, 0]
      },
      "pt-reciept-citizen-header": {
        fontSize: 12,
        bold: true,
        margin: [-18, 8, 10, 0],
        color: "#484848"
      },
      "pt-reciept-citizen-subheader": {
        fontSize: 10,
        bold: true,
        margin: [-18, 16, 8, 15],
        color: "#484848"
      },
      "pt-reciept-citizen-table": {
        fontSize: 10,
        color: "#484848",
        margin: [-20, -2, -8, -8]
      },

      "receipt-header-details": {
        fontSize: 9,
        margin: [0, 0, 0, 8],
        color: "#484848"
      },
      "receipt-table-key": {
        color: "#484848",
        bold: true
      },
      "receipt-table-value": {
        color: "#484848"
      },
      "receipt-logo-header": {
        color: "#484848",
        fontFamily: "Roboto",
        fontSize: 16,
        bold: true,

        letterSpacing: 0.74
      },
      "receipt-logo-sub-header": {
        color: "#484848",
        fontFamily: "Roboto",
        fontSize: 13,
        letterSpacing: 0.6
      },
      "pt-reciept-citizen-footer": {
        color: "#484848",
        fontSize: 12,
        margin: [15, -5, 10, 5]
      },
      "receipt-footer": {
        color: "#484848",
        fontSize: 8,
        margin: [-6, 15, -15, -10]
      },
      "receipt-no": {
        color: "#484848",
        fontSize: 13,
        margin: []
      },
      "receipt-approver": {
        fontSize: 10,
        bold: true,
        margin: [-10, -60, 10, -8],
        color: "#484848"
      }
    }
  };
  return citizenRecieptData;
};

var getReceiptData = function getReceiptData(transformedData) {
  var receiptData = {
    content: [{
      style: "tl-head",
      table: {
        widths: [100, "*", 18],
        body: [[{
          image: transformedData.ulbLogo,
          width: 60,
          height: 61.25,
          margin: [41, 12, 10, 10],
          border: [false, false, false, false]
        }, {
          stack: [{
            text: transformedData.corporationName,
            style: "receipt-logo-header"
          }, {
            text: "Payment Receipt (Citizen Copy)",
            style: "receipt-logo-sub-header",
            margin: [0, 10, 0, 0]
          }],
          alignment: "left",
          border: [false, false, false, false],
          margin: [10, 23, 0, 0]
        }, {
          stack: [{
            text: "Receipt No",
            style: "receipt-logo-sub-header"
          }, {
            text: transformedData.receiptNumber,
            style: "receipt-logo-header",
            margin: [0, 10, 0, 0]
          }],
          alignment: "center",
          margin: [-250, 23, 0, 0]
        }]]
      },
      layout: {}
    }, {
      style: "pt-reciept-citizen-header",
      columns: [{
        text: [{
          text: "Receipt Date   ",
          bold: true
        }, {
          text: transformedData.receiptDate,
          bold: false
        }],
        alignment: "left"
      }, {
        text: [{
          text: "Contact No ",
          bold: true
        }, {
          text: "+91 27272828222",
          bold: false
        }],
        alignment: "right",
        margin: [100, 0, 0, 0]
      }]
    }, {
      style: "pt-reciept-citizen-header",
      columns: [{
        text: [{
          text: "Tax Period   ",
          bold: true
        }, {
          text: transformedData.taxPeriod,
          bold: false
        }],
        alignment: "left"
      }, {
        text: [{
          text: "Website ",
          bold: true
        }, {
          text: "www.pmidc.com",
          bold: false
        }],
        alignment: "right",
        margin: [100, 0, 0, 0]
      }]
    }, {
      text: "",
      style: "pt-reciept-citizen-subheader"
    }, {
      style: "pt-reciept-citizen-table",
      table: {
        widths: receiptTableWidth,

        body: [[{
          text: "Consumer Name",
          border: [true, true, false, true],
          style: "receipt-table-key"
        }, {
          text: transformedData.consumerName,
          border: [false, true, true, true]
        }, {
          text: "Mobile No.",
          border: [true, true, false, true],
          style: "receipt-table-key"
        }, {
          text: transformedData.mobileNumber,
          border: [false, true, true, true]
        }], [{
          text: "Service Category",
          border: [true, true, false, true],
          style: "receipt-table-key"
        }, {
          text: transformedData.serviceCategory,
          border: [false, true, true, true]
        }, {
          text: "Service Type",
          border: [true, true, false, true],
          style: "receipt-table-key"
        }, {
          text: transformedData.serviceType,
          border: [false, true, true, true]
        }], [{
          text: "Amount Paid",
          border: [true, true, false, true],
          style: "receipt-table-key"
        }, {
          text: transformedData.amountPaid,
          border: [false, true, true, true]
        }, {
          text: "Amount Due",
          border: [true, true, false, true],
          style: "receipt-table-key"
        }, {
          text: transformedData.amountDue,
          border: [false, true, true, true]
        }], [{
          text: "Payment Mode",
          border: [true, true, false, true],
          style: "receipt-table-key"
        }, {
          text: transformedData.paymentMode,
          border: [false, true, true, true]
        }, {
          text: "G8 Receipt No.",
          border: [true, true, false, true],
          style: "receipt-table-key"
        }, {
          text: transformedData.g8ReceiptNo,
          border: [false, true, true, true]
        }], [{
          text: "Created By",
          border: [true, true, false, true],
          style: "receipt-table-key"
        }, {
          text: transformedData.createdBy,
          border: [false, true, true, true]
        }, {
          text: "",
          border: [true, true, false, true],
          style: "receipt-table-key"
        }, {
          text: "",
          border: [false, true, true, true]
        }]]
      },
      layout: {}
    }, {
      text: "",
      style: "pt-reciept-citizen-subheader"
    }, {
      style: "pt-reciept-citizen-header",
      columns: [{
        text: [{
          text: "Commissioner/EO",
          bold: true
        }],
        alignment: "right"
      }]
    }, {
      text: " _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ ",
      style: "pt-reciept-citizen-subheader"
    }, {
      text: "",
      style: "pt-reciept-citizen-subheader"
    }, {
      text: "",
      style: "pt-reciept-citizen-subheader"
    },
    //Second part starts from here
    {
      style: "tl-head",
      table: {
        widths: [100, "*", 18],
        body: [[{
          image: transformedData.ulbLogo,
          width: 60,
          height: 61.25,
          margin: [41, 12, 10, 10],
          border: [false, false, false, false]
        }, {
          stack: [{
            text: transformedData.corporationName,
            style: "receipt-logo-header"
          }, {
            text: "Payment Receipt (Employee Copy)",
            style: "receipt-logo-sub-header",
            margin: [0, 10, 0, 0]
          }],
          alignment: "left",
          border: [false, false, false, false],
          margin: [10, 23, 0, 0]
        }, {
          stack: [{
            text: "Receipt No",
            style: "receipt-logo-sub-header"
          }, {
            text: transformedData.receiptNumber,
            style: "receipt-logo-header",
            margin: [0, 10, 0, 0]
          }],
          alignment: "center",
          margin: [-250, 23, 0, 0]
        }]]
      },
      layout: {}
    }, {
      style: "pt-reciept-citizen-header",
      columns: [{
        text: [{
          text: "Receipt Date   ",
          bold: true
        }, {
          text: transformedData.receiptDate,
          bold: false
        }],
        alignment: "left"
      }, {
        text: [{
          text: "Contact No ",
          bold: true
        }, {
          text: "+91 27272828222",
          bold: false
        }],
        alignment: "right",
        margin: [100, 0, 0, 0]
      }]
    }, {
      style: "pt-reciept-citizen-header",
      columns: [{
        text: [{
          text: "Tax Period   ",
          bold: true
        }, {
          text: transformedData.taxPeriod,
          bold: false
        }],
        alignment: "left"
      }, {
        text: [{
          text: "Website ",
          bold: true
        }, {
          text: "www.pmidc.com",
          bold: false
        }],
        alignment: "right",
        margin: [100, 0, 0, 0]
      }]
    }, {
      text: "",
      style: "pt-reciept-citizen-subheader"
    }, {
      style: "pt-reciept-citizen-table",
      table: {
        widths: receiptTableWidth,

        body: [[{
          text: "Consumer Name",
          border: [true, true, false, true],
          style: "receipt-table-key"
        }, {
          text: transformedData.consumerName,
          border: [false, true, true, true]
        }, {
          text: "Mobile No.",
          border: [true, true, false, true],
          style: "receipt-table-key"
        }, {
          text: transformedData.mobileNumber,
          border: [false, true, true, true]
        }], [{
          text: "Service Category",
          border: [true, true, false, true],
          style: "receipt-table-key"
        }, {
          text: transformedData.serviceCategory,
          border: [false, true, true, true]
        }, {
          text: "Service Type",
          border: [true, true, false, true],
          style: "receipt-table-key"
        }, {
          text: transformedData.serviceType,
          border: [false, true, true, true]
        }], [{
          text: "Amount Paid",
          border: [true, true, false, true],
          style: "receipt-table-key"
        }, {
          text: transformedData.amountPaid,
          border: [false, true, true, true]
        }, {
          text: "Amount Due",
          border: [true, true, false, true],
          style: "receipt-table-key"
        }, {
          text: transformedData.amountDue,
          border: [false, true, true, true]
        }], [{
          text: "Payment Mode",
          border: [true, true, false, true],
          style: "receipt-table-key"
        }, {
          text: transformedData.paymentMode,
          border: [false, true, true, true]
        }, {
          text: "G8 Receipt No.",
          border: [true, true, false, true],
          style: "receipt-table-key"
        }, {
          text: transformedData.g8ReceiptNo,
          border: [false, true, true, true]
        }], [{
          text: "Created By",
          border: [true, true, false, true],
          style: "receipt-table-key"
        }, {
          text: transformedData.createdBy,
          border: [false, true, true, true]
        }, {
          text: "",
          border: [true, true, false, true],
          style: "receipt-table-key"
        }, {
          text: "",
          border: [false, true, true, true]
        }]]
      },
      layout: {}
    }, {
      text: "",
      style: "pt-reciept-citizen-subheader"
    }, {
      style: "pt-reciept-citizen-header",
      columns: [{
        text: [{
          text: "Commissioner/EO",
          bold: true
        }],
        alignment: "right"
      }]
    }],

    footer: [],

    styles: {
      "tl-head": {
        fillColor: "#F2F2F2",
        margin: [-70, -41, -81, 0]
      },
      "pt-reciept-citizen-header": {
        fontSize: 12,
        bold: true,
        margin: [-18, 8, 10, 0],
        color: "#484848"
      },
      "pt-reciept-citizen-subheader": {
        fontSize: 10,
        bold: true,
        margin: [-18, 16, 8, 8],
        color: "#484848"
      },
      "pt-reciept-citizen-table": {
        fontSize: 10,
        color: "#484848",
        margin: [-20, -2, -8, -8]
      },

      "receipt-header-details": {
        fontSize: 9,
        margin: [0, 0, 0, 8],
        color: "#484848"
      },
      "receipt-table-key": {
        color: "#484848",
        bold: true
      },
      "receipt-table-value": {
        color: "#484848"
      },
      "receipt-logo-header": {
        color: "#484848",
        fontFamily: "Roboto",
        fontSize: 16,
        bold: true,

        letterSpacing: 0.74
      },
      "receipt-logo-sub-header": {
        color: "#484848",
        fontFamily: "Roboto",
        fontSize: 13,
        letterSpacing: 0.6
      },
      "pt-reciept-citizen-footer": {
        color: "#484848",
        fontSize: 12,
        margin: [15, -5, 10, 5]
      },
      "receipt-footer": {
        color: "#484848",
        fontSize: 8,
        margin: [-6, 15, -15, -10]
      },
      "receipt-no": {
        color: "#484848",
        fontSize: 13
      },
      "receipt-approver": {
        fontSize: 10,
        bold: true,
        margin: [-10, -60, 10, -8],
        color: "#484848"
      }
    }
  };
  return receiptData;
};

//Generates PDF for Employee Reciept
var generateReciept = exports.generateReciept = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(rowData) {
    var state, allReceipts, receipt_data, transformedData, tenant, data1, data2, finalTransformedData, data, _tenant, _data, _data2, _finalTransformedData;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            state = _store2.default.getState();
            allReceipts = (0, _get2.default)(state.screenConfiguration, "preparedFinalObject.receiptSearchResponse", {});
            receipt_data = {};
            transformedData = {};

            if (!(0, _commons.getQueryArg)(window.location.href, "receiptNumber")) {
              _context.next = 26;
              break;
            }

            if (!(allReceipts.Receipt && (0, _isEmpty2.default)(allReceipts.Receipt[0]))) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return");

          case 7:
            tenant = (0, _get2.default)(allReceipts.Receipt[0], "tenantId");

            (0, _receiptTransformer.loadUlbLogo)(tenant);
            _context.t1 = allReceipts.Receipt;

            if (!_context.t1) {
              _context.next = 14;
              break;
            }

            _context.next = 13;
            return (0, _receiptTransformer.loadReceiptData)(allReceipts.Receipt[0]);

          case 13:
            _context.t1 = _context.sent;

          case 14:
            _context.t0 = _context.t1;

            if (_context.t0) {
              _context.next = 17;
              break;
            }

            _context.t0 = {};

          case 17:
            transformedData = _context.t0;
            _context.next = 20;
            return (0, _receiptTransformer.loadMdmsData)(tenant);

          case 20:
            // data1 is for ULB logo from loadUlbLogo
            data1 = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "base64UlbLogo", {});

            // data2 is for corporation Name from loadMdmsData

            data2 = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "mdmsDataForReceipt", {});
            finalTransformedData = (0, _extends3.default)({}, transformedData, { //getreceiptData
              ulbLogo: data1 }, data2);

            receipt_data = !(0, _isEmpty2.default)(finalTransformedData) && getReceiptData(finalTransformedData);
            _context.next = 40;
            break;

          case 26:
            data = allReceipts.Receipt.find(function (item) {
              return (0, _get2.default)(item, "Bill[0].billDetails[0].receiptNumber", "") === rowData["Receipt No"];
            });

            if (!(0, _isEmpty2.default)(data)) {
              _context.next = 29;
              break;
            }

            return _context.abrupt("return");

          case 29:
            _tenant = (0, _get2.default)(allReceipts.Receipt[0], "tenantId");

            (0, _receiptTransformer.loadUlbLogo)(_tenant);
            _context.next = 33;
            return (0, _receiptTransformer.loadReceiptData)(data);

          case 33:
            transformedData = _context.sent;
            _context.next = 36;
            return (0, _receiptTransformer.loadMdmsData)(_tenant);

          case 36:

            // data1 is for ULB logo from loadUlbLogo
            _data = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "base64UlbLogo", {});

            // data2 is for corporation Name from loadMdmsData

            _data2 = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "mdmsDataForReceipt", {});
            _finalTransformedData = (0, _extends3.default)({}, transformedData, { //getreceiptData
              ulbLogo: _data }, _data2);

            receipt_data = !(0, _isEmpty2.default)(_finalTransformedData) && getReceiptData(_finalTransformedData);

          case 40:
            receipt_data && !(0, _isEmpty2.default)(transformedData) && _pdfmake2.default.createPdf(receipt_data).open();

          case 41:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function generateReciept(_x) {
    return _ref.apply(this, arguments);
  };
}();

//Generates PDF for Citizen Reciept
var generateCitizenReciept = exports.generateCitizenReciept = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(rowData) {
    var state, allReceipts, citizenReceipt_data, data, tenant, transformedData, data1, data2, finalTransformedData;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            state = _store2.default.getState();
            allReceipts = (0, _get2.default)(state.screenConfiguration, "preparedFinalObject.receiptSearchResponse", {});
            citizenReceipt_data = {};
            data = allReceipts.Receipt.find(function (item) {
              return (0, _get2.default)(item, "Bill[0].billDetails[0].receiptNumber", "") === rowData["Receipt No"];
            });

            if (!(0, _isEmpty2.default)(data)) {
              _context2.next = 6;
              break;
            }

            return _context2.abrupt("return");

          case 6:
            tenant = (0, _get2.default)(allReceipts.Receipt[0], "tenantId");

            (0, _receiptTransformer.loadUlbLogo)(tenant);
            _context2.next = 10;
            return (0, _receiptTransformer.loadReceiptData)(data);

          case 10:
            transformedData = _context2.sent;
            _context2.next = 13;
            return (0, _receiptTransformer.loadMdmsData)(tenant);

          case 13:
            // data1 is for ULB logo from loadUlbLogo
            data1 = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "base64UlbLogo", {});

            // data2 is for corporation Name from loadMdmsData

            data2 = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "mdmsDataForReceipt", {});
            finalTransformedData = (0, _extends3.default)({}, transformedData, { //getreceiptData
              ulbLogo: data1 }, data2);

            citizenReceipt_data = !(0, _isEmpty2.default)(finalTransformedData) && getCitizenReceipetData(finalTransformedData);
            citizenReceipt_data && !(0, _isEmpty2.default)(transformedData) && _pdfmake2.default.createPdf(citizenReceipt_data).open();

          case 18:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function generateCitizenReciept(_x2) {
    return _ref2.apply(this, arguments);
  };
}();