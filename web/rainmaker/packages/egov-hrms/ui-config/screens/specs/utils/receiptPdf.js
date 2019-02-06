"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_pdfmake2.default.vfs = _vfs_fonts2.default.pdfMake.vfs;

var tableborder = {
  hLineColor: function hLineColor(i, node) {
    return "#979797";
  },
  vLineColor: function vLineColor(i, node) {
    return "#979797";
  },
  hLineWidth: function hLineWidth(i, node) {
    return 0.5;
  },
  vLineWidth: function vLineWidth(i, node) {
    return 0.5;
  }
};

var noborder = {
  hLineWidth: function hLineWidth(i, node) {
    return 0;
  },
  vLineWidth: function vLineWidth(i, node) {
    return 0;
  }
};

var borderKey = [true, true, false, true];
var borderValue = [false, true, true, true];
var receiptTableWidth = ["*", "*", "*", "*"];
var payableAmountTable = ["*", "*", "*", "*", "*", "*"];
var payableAmountBorderKey = [true, true, true, true, true, true, true];
var payableInfoTable3 = ["*", "*", "*"];
var accessoriesTable = ["24%", "76%"];

var getReceiptData = function getReceiptData(transformedData, ulbLogo) {
  var owners = transformedData.owners.map(function (owner) {
    return [{
      text: "Owner Name",
      border: [true, true, false, true],
      style: "receipt-table-key"
    }, { text: owner.name, border: [false, true, true, true] }, {
      text: "Mobile No.",
      border: [true, true, false, true],
      style: "receipt-table-key"
    }, { text: owner.mobile, border: [false, true, true, true] }];
  });
  var receiptData = {
    content: [{
      style: "tl-head",
      table: {
        widths: [50, "*", 100],
        body: [[{
          image: ulbLogo,
          width: 50,
          height: 61.25,
          margin: [41, 12, 10, 10]
        }, {
          //stack is used here to give multiple sections one after another in same body
          stack: [{
            text: transformedData.corporationName,
            style: "receipt-logo-header"
          }, {
            text: "Trade License Payment Receipt (Citizen Copy)",
            style: "receipt-logo-sub-header"
          }],
          alignment: "center",
          margin: [56, 23, 0, 0]
        }, {
          text: [{
            text: "Receipt No.\n " + transformedData.receiptNumber,
            bold: true,
            style: "receipt-no"
          }],
          alignment: "center",
          margin: [-50, 30, 0, 2]
        }]]
      },
      layout: noborder
    }, {
      style: "pt-reciept-citizen-header",
      columns: [{
        text: [{
          text: "Application No. ",
          bold: true
        }, {
          text: transformedData.applicationNumber,
          bold: false
        }],

        alignment: "left"
      }, {
        text: [{
          text: "Receipt No. ",
          bold: true
        }, {
          text: transformedData.receiptNumber,
          bold: false
        }],
        alignment: "right"
      }]
    }, {
      style: "pt-reciept-citizen-header",
      columns: [{
        text: [{
          text: "Financial Year ",
          bold: true
        }, {
          text: transformedData.financialYear,
          bold: false
        }],
        alignment: "left"
      }, {
        text: [{
          text: "Payment Date ",
          bold: true
        }, {
          text: transformedData.paymentDate,
          bold: false
        }],
        alignment: "right"
      }]
    }, { text: "TRADE DETAILS", style: "pt-reciept-citizen-subheader" }, {
      style: "pt-reciept-citizen-table",
      table: {
        widths: receiptTableWidth,
        body: [[{
          text: "Trade Name",
          border: borderKey,
          style: "receipt-table-key"
        }, { text: transformedData.tradeName, border: borderValue }, {
          text: "Trade Category",
          border: borderKey,
          style: "receipt-table-key"
        }, {
          text: transformedData.tradeCategory,
          border: borderValue
        }]]
      },
      layout: tableborder
    }, {
      style: "pt-reciept-citizen-table",
      table: {
        widths: accessoriesTable,
        body: [[{
          text: "Trade Type",
          border: [true, false, false, true],
          style: "receipt-table-key"
        }, {
          text: transformedData.tradeTypeReceipt,
          border: [false, false, true, true]
        }], [{
          text: "Accessories",
          border: borderKey,
          style: "receipt-table-key"
        }, {
          text: "(" + transformedData.accessories + ") " + transformedData.accessoriesList,
          border: borderValue
        }]]
      },
      layout: tableborder
    }, { text: "TRADE LOCATION DETAILS", style: "pt-reciept-citizen-subheader" }, {
      style: "pt-reciept-citizen-table",
      table: {
        widths: receiptTableWidth,
        body: [[{
          text: "House/Door No.",
          border: borderKey,
          style: "receipt-table-key"
        }, { text: transformedData.doorNo, border: borderValue }, {
          text: "Building/Colony Name.",
          border: borderKey,
          style: "receipt-table-key"
        }, {
          text: transformedData.buildingName,
          border: borderValue
        }], [{
          text: "Street Name",
          border: borderKey,
          style: "receipt-table-key"
        }, { text: transformedData.streetName, border: borderValue }, {
          text: "Locality/Mohalla",
          border: borderKey,
          style: "receipt-table-key"
        }, {
          text: transformedData.locality,
          border: borderValue
        }]]
      },
      layout: tableborder
    }, { text: "OWNERSHIP INFORMATION", style: "pt-reciept-citizen-subheader" }, {
      style: "pt-reciept-citizen-table",
      table: {
        widths: receiptTableWidth,
        body: owners
      },
      layout: tableborder
    }, { text: "PAYABLE AMOUNT", style: "pt-reciept-citizen-subheader" }, {
      style: "pt-reciept-citizen-table",
      table: {
        widths: payableAmountTable,
        body: [[{
          text: "Trade License Fee",
          border: payableAmountBorderKey,
          style: "receipt-table-key",
          alignment: "center"
        }, {
          text: "Penalty",
          border: payableAmountBorderKey,
          style: "receipt-table-key",
          alignment: "center"
        }, {
          text: "Rebate",
          border: payableAmountBorderKey,
          style: "receipt-table-key",
          alignment: "center"
        }, {
          text: "Adhoc Penalty",
          border: payableAmountBorderKey,
          style: "receipt-table-key",
          alignment: "center"
        }, {
          text: "Adhoc Rebate",
          border: payableAmountBorderKey,
          style: "receipt-table-key",
          alignment: "center"
        }, {
          text: "Total",
          border: payableAmountBorderKey,
          style: "receipt-table-key",
          alignment: "center"
        }], [{
          text: transformedData.tlFee,
          border: payableAmountBorderKey,
          style: "receipt-table-value",
          alignment: "center"
        }, {
          text: transformedData.tlPenalty,
          border: payableAmountBorderKey,
          style: "receipt-table-value",
          alignment: "center"
        }, {
          text: transformedData.tlRebate,
          border: payableAmountBorderKey,
          style: "receipt-table-value",
          alignment: "center"
        }, {
          text: transformedData.tlAdhocPenalty,
          border: payableAmountBorderKey,
          style: "receipt-table-value",
          alignment: "center"
        }, {
          text: transformedData.tlAdhocRebate,
          border: payableAmountBorderKey,
          style: "receipt-table-value",
          alignment: "center"
        }, {
          text: transformedData.totalAmount,
          border: payableAmountBorderKey,
          style: "receipt-table-value",
          alignment: "center"
        }]]
      },
      layout: tableborder
    }, { text: "PAYMENT INFORMATION", style: "pt-reciept-citizen-subheader" }, {
      style: "pt-reciept-citizen-table",
      table: {
        widths: receiptTableWidth,
        body: [[{
          text: "Total Amount Paid:",
          border: borderKey,
          style: "receipt-table-key"
        }, { text: transformedData.amountPaid, border: borderValue }, {
          text: "Amount Due:",
          border: borderKey,
          style: "receipt-table-key"
        }, {
          text: transformedData.amountDue,
          border: borderValue
        }]]
      },
      layout: tableborder
    }, {
      style: "pt-reciept-citizen-table",
      table: {
        widths: payableInfoTable3,
        body: [[{
          text: "Payment Mode",
          border: payableAmountBorderKey,
          style: "receipt-table-key",
          alignment: "center"
        }, {
          text: "Transaction ID/ Cheque/ DD No.",
          border: payableAmountBorderKey,
          style: "receipt-table-key",
          alignment: "center"
        }, {
          text: "Bank Name & Branch",
          border: payableAmountBorderKey,
          style: "receipt-table-key",
          alignment: "center"
        }], [{
          text: transformedData.paymentMode,
          border: payableAmountBorderKey,
          style: "receipt-table-value",
          alignment: "center"
        }, {
          text: transformedData.transactionNumber,
          border: payableAmountBorderKey,
          style: "receipt-table-value",
          alignment: "center"
        }, {
          text: transformedData.bankAndBranch,
          border: payableAmountBorderKey,
          style: "receipt-table-value",
          alignment: "center"
        }]]
      },
      layout: tableborder
    }, {
      style: "pt-reciept-citizen-table",
      table: {
        widths: receiptTableWidth,
        body: [[{
          text: "G8 Receipt No:",
          border: borderKey,
          style: "receipt-table-key"
        }, { text: transformedData.g8ReceiptNo, border: borderValue }, {
          text: "G8 Receipt Issue Date:",
          border: borderKey,
          style: "receipt-table-key"
        }, {
          text: transformedData.g8ReceiptDate,
          border: borderValue
        }]]
      },
      layout: tableborder
    }, {
      style: "receipt-approver",
      columns: [{
        text: [{
          text: "Generated by: ",
          bold: true
        }, {
          text: transformedData.auditorName,
          bold: false
        }],
        alignment: "left"
      }, {
        text: [{
          text: "Commissioner/EO",
          bold: true
        }],
        alignment: "right"
      }]
    }],
    footer: [{
      text: "Note:\n1. Payment received by cheque/demand draft shall be subject to realization.\n2. This document is not a proof of Property Ownership.\n3. This is a computer generated document, hence requires no signature.",
      style: "receipt-footer"
    }],
    styles: {
      "tl-head": {
        fillColor: "#F2F2F2",
        margin: [-41, -41, -41, 0]
      },
      "pt-reciept-citizen-header": {
        fontSize: 12,
        bold: true,
        margin: [0, 8, 0, 0], //left top right bottom
        color: "#484848"
      },
      "pt-reciept-citizen-subheader": {
        fontSize: 10,
        bold: true,
        margin: [0, 16, 0, 8], //left top right bottom
        color: "#484848"
      },
      "pt-reciept-citizen-table": {
        fontSize: 10,
        color: "#484848"
      },
      "receipt-assess-table": {
        fontSize: 10,
        color: "#484848",
        margin: [0, 8, 0, 0]
      },
      "receipt-assess-table-header": {
        bold: true,
        fillColor: "#D8D8D8",
        color: "#484848"
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
        letterSpacing: 1.6,
        margin: [0, 6, 0, 0]
      },
      "receipt-footer": {
        color: "#484848",
        fontSize: 8,
        margin: [30, -20, 0, 0]
      },
      "receipt-no": {
        color: "#484848",
        fontSize: 10
      },
      "receipt-approver": {
        fontSize: 10,
        bold: true,
        margin: [0, 60, 0, 8], //left top right bottom
        color: "#484848"
      }
    }
  };
  return receiptData;
};

var getCertificateData = function getCertificateData(transformedData, ulbLogo) {
  var tlCertificateData = {
    content: [{
      table: {
        widths: ["*"],
        body: [[{
          stack: [{
            image: ulbLogo,
            width: 50,
            height: 61.25,
            alignment: "center"
          }, {
            text: transformedData.corporationName,
            style: "receipt-logo-header",
            margin: [0, 10, 0, 0]
          }, {
            text: transformedData.corporationAddress + "\nContact : " + transformedData.corporationContact + "\nWebsite : " + transformedData.corporationWebsite + "\nEmail : " + transformedData.corporationEmail,
            style: "receipt-logo-sub-text",
            margin: [0, 8, 0, 0]
          }, {
            text: "TRADE LICENSE CERTIFICATE",
            style: "receipt-logo-sub-header",
            margin: [0, 30, 0, 0]
          }],
          alignment: "center",
          margin: [0, 0, 0, 0]
        }]]
      },
      layout: noborder
    }, {
      style: "tl-certificate-data",
      columns: [{
        width: 160,
        text: "Trade License Number"
      }, {
        width: "*",
        text: transformedData.licenseNumber
      }]
    }, {
      style: "tl-certificate-data-2",
      columns: [{
        width: 160,
        text: "Application Number"
      }, {
        width: "*",
        text: transformedData.applicationNumber
      }]
    }, {
      style: "tl-certificate-data-2",
      columns: [{
        width: 160,
        text: "Receipt Number"
      }, {
        width: "*",
        text: transformedData.receiptNumber
      }]
    }, {
      style: "tl-certificate-data-2",
      columns: [{
        width: 160,
        text: "Financial Year"
      }, {
        width: "*",
        text: transformedData.financialYear
      }]
    }, {
      style: "tl-certificate-data",
      columns: [{
        width: 160,
        text: "Trade Name"
      }, {
        width: "*",
        text: transformedData.tradeName
      }]
    }, {
      style: "tl-certificate-data-2",
      columns: [{
        width: 160,
        text: "Trade Owner Name"
      }, {
        width: "*",
        text: transformedData.ownersList
      }]
    }, {
      style: "tl-certificate-data-2",
      columns: [{
        width: 160,
        text: "Trade Owner Contact"
      }, {
        width: "*",
        text: transformedData.owners[0].mobile
      }]
    }, {
      style: "tl-certificate-data-2",
      columns: [{
        width: 160,
        text: "Trade Address"
      }, {
        width: "*",
        text: transformedData.address
      }]
    }, {
      style: "tl-certificate-data-2",
      columns: [{
        width: 160,
        text: "Trade Type"
      }, {
        width: "*",
        text: transformedData.tradeTypeCertificate
      }]
    }, {
      style: "tl-certificate-data-2",
      columns: [{
        width: 160,
        text: "Accessories"
      }, {
        width: "*",
        text: "(" + transformedData.accessories + ") " + transformedData.accessoriesList
      }]
    }, {
      style: "tl-certificate-data-2",
      columns: [{
        width: 160,
        text: "Trade License Fee"
      }, {
        width: "*",
        text: "Rs. " + transformedData.totalAmount
      }]
    }, {
      style: "tl-certificate-data-2",
      columns: [{
        width: 160,
        text: "License Issue Date"
      }, {
        width: "*",
        text: transformedData.licenseIssueDate
      }]
    }, {
      style: "tl-certificate-data-2",
      columns: [{
        width: 160,
        text: "License Validity"
      }, {
        width: "*",
        text: transformedData.licenseValidity.startDate + " to " + transformedData.licenseValidity.endDate + " "
      }]
    }, {
      style: "tl-certificate-footer",
      columns: [{
        text: [{
          text: "Approved by: "
        }, {
          text: transformedData.auditorName
        }],
        alignment: "left"
      }, {
        text: [{
          text: "Commissioner/EO",
          bold: false
        }],
        alignment: "right"
      }]
    }],
    footer: [{
      text: "Disclaimer:\nThis license is not the proof of ownership.\nThis Trade License is issued under rule 10.39 of the Municipal Account Code 2017 with condition that the applicant shall obtain relevant NOC from concerned departments like Punjab Pollution control board / Fire Office /Health Department/ Excise Department/Deputy Commissioner (under Explosive Act) whichever applicable. The Municipal Council/Corporation reserves the right to cancel this Trade License for Breach of any condition in accordance with law.",
      style: "receipt-footer"
    }],
    //define all the styles here
    styles: {
      "pt-reciept-citizen-header": {
        fontSize: 14,
        margin: [0, 24, 0, 0], //left top right bottom
        color: "#1E1E1E"
      },
      "tl-certificate-data": {
        fontSize: 14,
        margin: [0, 40, 0, 0], //left top right bottom
        color: "#1E1E1E"
      },
      "tl-certificate-data-2": {
        fontSize: 14,
        margin: [0, 8, 0, 0], //left top right bottom
        color: "#1E1E1E"
      },
      "pt-reciept-citizen-subheader": {
        fontSize: 10,
        bold: true,
        margin: [0, 16, 0, 8], //left top right bottom
        color: "#484848"
      },
      "pt-reciept-citizen-table": {
        fontSize: 10,
        color: "#484848"
      },
      "receipt-assess-table": {
        fontSize: 10,
        color: "#484848",
        margin: [0, 8, 0, 0]
      },
      "receipt-assess-table-header": {
        bold: true,
        fillColor: "#D8D8D8",
        color: "#484848"
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
        color: "#1E1E1E",
        fontFamily: "Roboto",
        fontSize: 18,
        bold: true,
        letterSpacing: 0.74
      },
      "receipt-logo-sub-text": {
        color: "#656565",
        fontFamily: "Roboto",
        fontSize: 14,
        letterSpacing: 0.74
      },
      "receipt-logo-sub-header": {
        color: "#1E1E1E",
        fontFamily: "Roboto",
        fontSize: 16,
        letterSpacing: 1.6,
        bold: true
      },
      "receipt-footer": {
        color: "#484848",
        fontSize: 8,
        margin: [10, -15, 5, 5]
      },
      "receipt-no": {
        color: "#484848",
        fontSize: 10
      },
      "tl-certificate-footer": {
        fontSize: 14,
        margin: [0, 50, 0, 0], //left top right bottom
        color: "#1E1E1E"
      }
    }
  };
  return tlCertificateData;
};

var generateReceipt = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(state, dispatch, type) {
    var data1, data2, data3, data4, ulbLogo, transformedData, certificate_data, receipt_data;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            data1 = _lodash2.default.get(state.screenConfiguration.preparedFinalObject, "applicationDataForReceipt", {});
            data2 = _lodash2.default.get(state.screenConfiguration.preparedFinalObject, "receiptDataForReceipt", {});
            data3 = _lodash2.default.get(state.screenConfiguration.preparedFinalObject, "mdmsDataForReceipt", {});
            data4 = _lodash2.default.get(state.screenConfiguration.preparedFinalObject, "userDataForReceipt", {});
            ulbLogo = _lodash2.default.get(state.screenConfiguration.preparedFinalObject, "base64UlbLogo", "");

            if (!_lodash2.default.isEmpty(data1)) {
              _context.next = 10;
              break;
            }

            console.log("Error in application data");
            return _context.abrupt("return");

          case 10:
            if (!_lodash2.default.isEmpty(data2)) {
              _context.next = 15;
              break;
            }

            console.log("Error in receipt data");
            return _context.abrupt("return");

          case 15:
            if (!_lodash2.default.isEmpty(data3)) {
              _context.next = 20;
              break;
            }

            console.log("Error in mdms data");
            return _context.abrupt("return");

          case 20:
            if (!_lodash2.default.isEmpty(data4)) {
              _context.next = 25;
              break;
            }

            console.log("Error in auditor user data");
            return _context.abrupt("return");

          case 25:
            if (!_lodash2.default.isEmpty(ulbLogo)) {
              _context.next = 28;
              break;
            }

            console.log("Error in image data");
            return _context.abrupt("return");

          case 28:
            transformedData = (0, _extends3.default)({}, data1, data2, data3, data4);
            _context.t0 = type;
            _context.next = _context.t0 === "certificate_download" ? 32 : _context.t0 === "certificate_print" ? 35 : _context.t0 === "receipt_download" ? 38 : _context.t0 === "receipt_print" ? 41 : 44;
            break;

          case 32:
            certificate_data = getCertificateData(transformedData, ulbLogo);

            certificate_data && _pdfmake2.default.createPdf(certificate_data).download("tl_certificate.pdf");
            return _context.abrupt("break", 45);

          case 35:
            certificate_data = getCertificateData(transformedData, ulbLogo);
            certificate_data && _pdfmake2.default.createPdf(certificate_data).print();
            return _context.abrupt("break", 45);

          case 38:
            receipt_data = getReceiptData(transformedData, ulbLogo);

            receipt_data && _pdfmake2.default.createPdf(receipt_data).download("tl_receipt.pdf");
            return _context.abrupt("break", 45);

          case 41:
            receipt_data = getReceiptData(transformedData, ulbLogo);
            receipt_data && _pdfmake2.default.createPdf(receipt_data).print();
            return _context.abrupt("break", 45);

          case 44:
            return _context.abrupt("break", 45);

          case 45:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function generateReceipt(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.default = generateReceipt;