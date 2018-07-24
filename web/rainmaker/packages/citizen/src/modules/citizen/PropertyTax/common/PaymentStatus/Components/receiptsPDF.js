import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
//import pdfConfig from "./pdfConfig";
import msevaLogo from "egov-ui-kit/assets/images/pblogo.png";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const generateReceipt = (role, details) => {
  let data;
  let { owners, address, propertyDetails, tax, receipts } = details;
  let tableborder = {
    hLineColor: function(i, node) {
      return "#979797";
    },
    vLineColor: function(i, node) {
      return "#979797";
    },
    hLineWidth: function(i, node) {
      return 0.5;
    },
    vLineWidth: function(i, node) {
      return 0.5;
    },
  };
  switch (role) {
    case "pt-reciept-citizen":
      let floorData = propertyDetails[0].noOfFloors || 1;
      // data for floor details
      let getFloorDetails = () => {
        let bodyData = [];
        let { units } = propertyDetails[0];
        let dataRow = [];
        dataRow.push({ text: "Floor", style: "receipt-assess-table-header" });
        dataRow.push({ text: "Usage Type", style: "receipt-assess-table-header" });
        dataRow.push({ text: "Sub Usage Type", style: "receipt-assess-table-header" });
        dataRow.push({ text: "Occupancy", style: "receipt-assess-table-header" });
        dataRow.push({ text: "Built Area/Total Annual Rent", style: "receipt-assess-table-header" });
        bodyData.push(dataRow);
        units &&
          units.map((unit) => {
            dataRow = [];
            dataRow.push(unit.floorNo || "-");
            dataRow.push(unit.usageCategoryMinor || unit.usageCategoryMajor || "");
            dataRow.push(unit.usageCategorySubMinor || "");
            dataRow.push(unit.occupancyType || "");
            if (unit.occupancyType === "RENTED") {
              dataRow.push(unit.arv || "");
            } else {
              dataRow.push(unit.unitArea || "");
            }

            bodyData.push(dataRow);
          });
        return bodyData;
      };

      data = {
        content: [
          {
            style: "pt-reciept-citizen-table",
            margin: [0, 0, 0, 18],
            table: {
              widths: [50, "*", 100],
              body: [
                [
                  {
                    image: msevaLogo,
                    width: 30,
                    margin: [10, 2, 10, 2],
                  },
                  { text: "AMRITSAR MUNICIPAL CORPORATION\nProperty Tax Payment Receipt (Citizen Copy)", alignment: "center", margin: [0, 10, 0, 0] },
                  { text: `Receipt No.:	${details.ReceiptNo}`, margin: [10, 10, 10, 2] },
                ],
              ],
            },
            layout: tableborder,
          },
          {
            style: "receipt-header-details",
            columns: [
              {
                text: `Date: ${receipts.paymentDate}` || ``,
                alignment: "left",
              },
              {
                width: "*",
                text: `Contact Us:${"080 - 09567743"}`,
                alignment: "right",
              },
            ],
          },
          {
            style: "receipt-header-details",
            columns: [
              {
                text: `Assessment Year: ${propertyDetails[0].financialYear || ""}`,
                alignment: "left",
              },
              {
                width: "*",
                text: "Visit Us:	www.pmidc.com",
                alignment: "right",
              },
            ],
          },
          {
            style: "pt-reciept-citizen-table",
            table: {
              // widths: ["*", "*", "*", "*", "*", "*"],
              body: [
                [
                  { text: "Receipt No:", border: [true, true, false, true] },
                  { text: details.ReceiptNo || "", border: [false, true, true, true] },
                  { text: "Property System ID:", border: [true, true, false, true] },
                  { text: details.propertyId || "", border: [false, true, true, true] }, //need to confirm this data
                  { text: "Assessment ID:", border: [true, true, false, true] },
                  { text: propertyDetails[0].assessmentNumber || "", border: [false, true, true, true] },
                ],
              ],
            },
            layout: tableborder,
          },
          { text: "PROPERTY ADDRESS", style: "pt-reciept-citizen-subheader" },
          {
            style: "pt-reciept-citizen-table",
            table: {
              widths: ["*", "*", "*", "*"],
              body: [
                [
                  { text: "House/Door No.:", border: [true, true, false, true] },
                  { text: address.doorNo || "", border: [false, true, true, true] },
                  { text: "Building/Colony Name.:", border: [true, true, false, true] },
                  { text: address.buildingName || "", border: [false, true, true, true] },
                ],
                [
                  { text: "Street Name:", border: [true, true, false, true] },
                  { text: address.street || "", border: [false, true, true, true] },
                  { text: "Locality/Mohalla:", border: [true, true, false, true] },
                  { text: address.locality.code || "", border: [false, true, true, true] },
                ],
              ],
            },
            layout: tableborder,
          },
          { text: "ASSESSMENT INFORMATION", style: "pt-reciept-citizen-subheader" },
          {
            style: "pt-reciept-citizen-table",
            table: {
              widths: ["*", "*", "*", "*"],
              body: [
                [
                  { text: "Plot Size:", border: [true, true, false, true] },
                  { text: propertyDetails[0].landArea || "", border: [false, true, true, true] },
                  { text: "Type of Building:", border: [true, true, false, true] },
                  { text: propertyDetails[0].propertySubType || "", border: [false, true, true, true] },
                ],
              ],
            },
            layout: tableborder,
          },
          {
            style: "receipt-assess-table",
            table: {
              widths: ["*", "*", "*", "*", "*"],
              body: getFloorDetails(),
            },
            layout: tableborder,
          },
          { text: "OWNERSHIP INFORMATION", style: "pt-reciept-citizen-subheader" },
          {
            style: "pt-reciept-citizen-table",
            table: {
              widths: ["*", "*", "*", "*"],
              body: [
                [
                  { text: "Owner/Company Name:", border: [true, true, false, true] },
                  { text: owners.name || "", border: [false, true, true, true] },
                  { text: "Type of Ownership:", border: [true, true, false, true] },
                  { text: owners.OwnershipType || "", border: [false, true, true, true] },
                ],
                [
                  { text: "Mobile No.:", border: [true, true, false, true] },
                  { text: owners.mobileNumber || "", border: [false, true, true, true] },
                  { text: "Owner Category:", border: [true, true, false, true] },
                  { text: owners.ownerType || "", border: [false, true, true, true] },
                ],
                [
                  { text: "Correspondence Address:", border: [true, true, false, true] },
                  { text: owners.correspondenceAddress || "", border: [false, true, true, true] },
                  { text: "Owner Category ID No.:", border: [true, true, false, true] },
                  { text: propertyDetails[0].documents[0].id || "", border: [false, true, true, true] },
                ],
              ],
            },
            layout: tableborder,
          },
          { text: "TAX CALCULATION", style: "pt-reciept-citizen-subheader" },
          {
            style: "pt-reciept-citizen-table",
            table: {
              widths: ["*", "*", "*", "*"],
              body: [
                [
                  { text: "Property Tax:", border: [true, true, false, true] },
                  { text: tax.AmountPaid || "", border: [false, true, true, true] },
                  { text: "Fire Cess (10%):", border: [true, true, false, true] },
                  { text: tax.fireCess || "", border: [false, true, true, true] },
                ],
                [
                  { text: "Rebate :", border: [true, true, false, true] },
                  { text: tax.rebate || "", border: [false, true, true, true] },
                  { text: "TOTAL:", border: [true, true, false, true] },
                  { text: tax.total || "", border: [false, true, true, true] },
                ],
              ],
            },
            layout: tableborder,
          },
          { text: "PAYMENT RECEIPT", style: "pt-reciept-citizen-subheader" },
          {
            style: "pt-reciept-citizen-table",
            table: {
              widths: ["*", "*", "*", "*"],
              body: [
                [
                  { text: "Total Amount Paid:", border: [true, true, false, true] },
                  { text: receipts.AmountPaid || "", border: [false, true, true, true] },
                  { text: "Payment Mode:", border: [true, true, false, true] },
                  { text: receipts.payMode || "", border: [false, true, true, true] },
                ],
                [
                  { text: "Transaction ID:", border: [true, true, false, true] },
                  { text: receipts.transactionId || "", border: [false, true, true, true] },
                  { text: "Bank Name:", border: [true, true, false, true] },
                  { text: receipts.bankName || "", border: [false, true, true, true] },
                ],
                [
                  { text: "Pending Amount:", border: [true, true, false, true] },
                  { text: receipts.pendingAmt || "", border: [false, true, true, true] },
                  { text: "", border: [true, true, false, true] },
                  { text: "", border: [false, true, true, true] },
                ],
              ],
            },
            layout: tableborder,
          },
        ],
        styles: {
          "pt-reciept-citizen-subheader": {
            fontSize: 10,
            bold: true,
            margin: [0, 16, 0, 8],
            color: "#484848",
          },
          "pt-reciept-citizen-table": {
            fontSize: 10,
            color: "#484848",
            lineColor: "red",
          },
          "receipt-assess-table": {
            fontSize: 10,
            color: "#484848",
            margin: [0, 8, 0, 0],
          },
          "receipt-assess-table-header": {
            bold: true,
            fillColor: "#D8D8D8",
            color: "#484848",
            lineColor: "red",
          },
          "receipt-header-details": {
            fontSize: 9,
            margin: [0, 0, 0, 8],
            // color: "484848",
          },
        },
      };

      break;
    default:
  }
  pdfMake.createPdf(data).download("citizenreceipt.pdf");
};

export default generateReceipt;
