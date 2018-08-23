"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _pdfmake = require("pdfmake/build/pdfmake");

var _pdfmake2 = _interopRequireDefault(_pdfmake);

var _vfs_fonts = require("pdfmake/build/vfs_fonts");

var _vfs_fonts2 = _interopRequireDefault(_vfs_fonts);

var _pblogo = require("egov-ui-kit/assets/images/pblogo.png");

var _pblogo2 = _interopRequireDefault(_pblogo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_pdfmake2.default.vfs = _vfs_fonts2.default.pdfMake.vfs;

var generateReceipt = function generateReceipt(role, details, generalMDMSDataById, receiptImageUrl, isEmployeeReceipt) {
  var data = void 0;
  var owners = details.owners,
      address = details.address,
      propertyDetails = details.propertyDetails,
      tax = details.tax,
      taxNew = details.taxNew,
      receipts = details.receipts,
      header = details.header;

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

  var transform = function transform(value, masterName) {
    if (value) {
      return generalMDMSDataById && generalMDMSDataById[masterName] ? generalMDMSDataById[masterName][value].name : "";
    } else {
      return "NA";
    }
  };

  switch (role) {
    case "pt-reciept-citizen":
      // let floorData = propertyDetails[0].noOfFloors || 1;

      // data for floor details
      var getFloorDetails = function getFloorDetails() {
        var bodyData = [];
        var units = propertyDetails[0].units;

        var dataRow = [];
        if (units && units.length) {
          dataRow.push({ text: "Floor", style: "receipt-assess-table-header" });
          dataRow.push({ text: "Usage Type", style: "receipt-assess-table-header" });
          dataRow.push({ text: "Sub Usage Type", style: "receipt-assess-table-header" });
          dataRow.push({ text: "Occupancy", style: "receipt-assess-table-header" });
          dataRow.push({ text: "Built Area/Total Annual Rent", style: "receipt-assess-table-header" });
          bodyData.push(dataRow);
          units && units.map(function (unit) {
            dataRow = [];
            dataRow.push(transform(unit.floorNo, "Floor"));
            dataRow.push(transform(unit.usageCategoryMajor, "UsageCategoryMajor"));
            dataRow.push(transform(unit.usageCategorySubMinor, "UsageCategorySubMinor"));
            dataRow.push(transform(unit.occupancyType, "OccupancyType"));
            if (unit.occupancyType === "RENTED") {
              dataRow.push(unit.arv || "");
            } else {
              dataRow.push(unit.unitArea + " sq yards" || "");
            }

            bodyData.push(dataRow);
          });
          return bodyData;
        } else {
          return null;
        }
      };

      var borderKey = [true, true, false, true];
      var borderValue = [false, true, true, true];
      var receiptTableWidth = ["*", "*", "*", "*"];

      var getOwnerDetails = function getOwnerDetails(ownerArray, noOfColumns) {
        var transformedArray = ownerArray.map(function (item, index) {
          return [{
            text: "Owner " + (ownerArray.length > 1 ? index + 1 : "") + " Name",
            border: borderKey,
            style: "receipt-table-key"
          }, {
            text: item.name || "",
            border: borderValue
          }];
        });
        var flatArray = transformedArray.reduce(function (acc, val) {
          return acc.concat(val);
        }, []);

        var newArray = [];
        while (flatArray.length > 0) {
          newArray.push(flatArray.splice(0, noOfColumns));
        }return newArray;
      };

      data = {
        content: [{
          style: "pt-reciept-citizen-table",
          margin: [0, 0, 0, 18],
          table: {
            widths: [50, "*", 100],
            body: [[{
              image: receiptImageUrl || _pblogo2.default,
              width: 30,
              margin: [10, 10, 10, 10]
            }, {
              //stack is used here to give multiple sections one after another in same body
              stack: [{ text: header.header || "", style: "receipt-logo-header" }, {
                text: header.subheader + " " + (isEmployeeReceipt ? "(Employee Copy)" : "(Citizen Copy)") + " " || "",
                style: "receipt-logo-sub-header"
              }],
              alignment: "center",
              margin: [0, 5, 0, 0]
            }, {
              text: [{
                text: "Receipt No.: ",
                bold: true
              }, details.ReceiptNo || ""],
              margin: [10, 10, 10, 2]
            }]]
          },
          layout: tableborder
        }, {
          style: "receipt-header-details",
          columns: [{
            text: [{
              text: "Date: ",
              bold: true
            }, receipts.paymentDate || ""],

            alignment: "left"
          }, {
            text: [{
              text: "Contact Us: ",
              bold: true
            }, header.contact],
            alignment: "right"
          }]
        }, {
          style: "receipt-header-details",
          columns: [{
            text: [{
              text: "Assessment Year: ",
              bold: true
            }, propertyDetails[0].financialYear || ""],
            alignment: "left"
          }, {
            text: [{
              text: "Website: ",
              bold: true
            }, header.website],
            alignment: "right"
          }]
        }, {
          style: "pt-reciept-citizen-table",
          table: {
            body: [[{ text: "Existing Property ID:", border: borderKey, style: "receipt-table-key" }, { text: details.existingPropertyId || "NA", border: borderValue }, { text: "Property Tax Assessment ID:", border: borderKey, style: "receipt-table-key" }, { text: details.propertyId || "", border: borderValue }, //need to confirm this data
            { text: "Assessment No:", border: borderKey, style: "receipt-table-key" }, { text: propertyDetails[0].assessmentNumber || "", border: borderValue }]]
          },
          layout: tableborder
        }, { text: "PROPERTY ADDRESS", style: "pt-reciept-citizen-subheader" }, {
          style: "pt-reciept-citizen-table",
          table: {
            widths: receiptTableWidth,
            body: [[{ text: "House/Door No.:", border: borderKey, style: "receipt-table-key" }, { text: address.doorNo || "NA", border: borderValue }, { text: "Building/Colony Name.:", border: borderKey, style: "receipt-table-key" }, { text: address.buildingName || "NA", border: borderValue }], [{ text: "Street Name:", border: borderKey, style: "receipt-table-key" }, { text: address.street || "NA", border: borderValue }, { text: "Locality/Mohalla:", border: borderKey, style: "receipt-table-key" }, { text: address.locality.name || "NA", border: borderValue }]]
          },
          layout: tableborder
        }, { text: "ASSESSMENT INFORMATION", style: "pt-reciept-citizen-subheader" }, {
          style: "pt-reciept-citizen-table",
          table: {
            widths: receiptTableWidth,
            body: [[{ text: "Plot Size:", border: borderKey, style: "receipt-table-key" }, { text: propertyDetails[0].landArea + " sq yards" || "", border: borderValue }, { text: "Property Type:", border: borderKey, style: "receipt-table-key" }, {
              text: propertyDetails[0].propertySubType ? transform(propertyDetails[0].propertySubType, "PropertySubType") : transform(propertyDetails[0].propertyType, "PropertyType"),
              border: borderValue
            }]]
          },
          layout: tableborder
        }, getFloorDetails() && { text: "BUILT-UP AREA DETAILS", style: "pt-reciept-citizen-subheader" }, getFloorDetails() && {
          style: "receipt-assess-table",
          table: {
            widths: ["*", "*", "*", "*", "*"],
            body: getFloorDetails()
          },
          layout: tableborder
        }, { text: "OWNERSHIP INFORMATION", style: "pt-reciept-citizen-subheader" }, {
          style: "pt-reciept-citizen-table",
          table: {
            widths: receiptTableWidth,
            body: getOwnerDetails(owners, 4)
          },
          layout: tableborder
        }, { text: "PAYABLE AMOUNT", style: "pt-reciept-citizen-subheader" }, {
          style: "receipt-assess-table",
          table: {
            widths: taxNew && taxNew[0] && taxNew[0].map(function (item) {
              return "auto";
            }),

            body: taxNew
          },
          layout: tableborder
        }, { text: "PAYMENT INFORMATION", style: "pt-reciept-citizen-subheader" }, {
          style: "pt-reciept-citizen-table",
          table: {
            widths: ["auto", "auto", "auto", "auto"],
            body: [[{ text: "Total Amount Paid:", border: borderKey, style: "receipt-table-key" }, { text: receipts.AmountPaid || "", border: borderValue, style: "receipt-table-value" }, { text: "Pending Amount:", border: borderKey, style: "receipt-table-key" }, { text: receipts.pendingAmt || "", border: borderValue }], [{ text: "Payment Mode:", border: borderKey, style: "receipt-table-key" }, { text: receipts.payMode || "", border: borderValue },
            // { text: "Transaction ID:", border: borderKey, style: "receipt-table-key" },
            // { text: receipts.transactionId || "", border: borderValue },
            { text: "Bank Name:", border: borderKey, style: "receipt-table-key" }, { text: receipts.bankName || "", border: borderValue }], [{ text: "Transaction ID/ Cheque/ DD No.:", border: borderKey, style: "receipt-table-key" }, { text: receipts.transactionNo || "", border: borderValue },
            // { text: "Transaction ID:", border: borderKey, style: "receipt-table-key" },
            // { text: receipts.transactionId || "", border: borderValue },
            { text: "Transaction Date:", border: borderKey, style: "receipt-table-key" }, { text: receipts.transactionDate || "", border: borderValue }], [{ text: "G8 Receipt No:", border: borderKey, style: "receipt-table-key" }, { text: receipts.G8receiptNo || "NA", border: borderValue }, { text: "G8 Receipt Issue Date", border: borderKey, style: "receipt-table-key" }, { text: receipts.G8receiptDate || "NA", border: borderValue }]]
          },
          layout: tableborder
        }, { text: "Commissioner/EO", alignment: "right", color: "#484848", fontSize: 12, bold: true, margin: [0, 30, 0, 30] }, { text: "Note:", alignment: "left", style: "receipt-footer" }, {
          ol: [{ text: "Payment received by cheque/demand draft shall be subject to realization.", margin: [0, 0, 0, 5] }, { text: "This document is not a proof of Property Ownership.", margin: [0, 0, 0, 5] }, { text: "This is a computer generated document, hence requires no signature.", margin: [0, 0, 0, 5] }],
          alignment: "left",
          style: "receipt-footer"
        }],
        //define all the styles here
        styles: {
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
            fontSize: 16,
            bold: true,
            decoration: "underline",
            // decorationStyle: "solid",
            decorationColor: "#484848"
          },
          "receipt-logo-sub-header": {
            color: "#484848",
            fontSize: 13,
            decoration: "underline",
            // decorationStyle: "solid",
            decorationColor: "#484848"
          },
          "receipt-footer": {
            color: "#484848",
            fontSize: 8,
            margin: [0, 0, 0, 5]
          }
        }
      };

      break;
    default:
  }
  data && _pdfmake2.default.createPdf(data).download(details.ReceiptNo + ".pdf");
};

exports.default = generateReceipt;