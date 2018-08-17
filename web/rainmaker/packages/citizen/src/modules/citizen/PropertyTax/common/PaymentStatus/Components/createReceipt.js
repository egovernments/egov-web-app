import msevaLogo from "egov-ui-kit/assets/images/pblogo.png";
import { getDateFromEpoch } from "egov-ui-kit/utils/commons";
import get from "lodash/get";
import { getTranslatedLabel } from "egov-ui-kit/utils/commons";

const getTaxInfo = (billAccountDetails, totalAmount, localizationLabels) => {
  const taxArray = billAccountDetails.reduce(
    (result, current) => {
      current.accountDescription && result[0].push({ text: getTranslatedLabel(current.accountDescription.split("-")[0], localizationLabels) });
      current.accountDescription && result[1].push({ text: current.crAmountToBePaid });
      return result;
    },
    [[], []]
  );
  taxArray[0].push({ text: "Total" });
  taxArray[1].push({ text: totalAmount });
  return taxArray;
};

const getBase64FromImageUrl = async (url) => {
  var img = new Image();
  var dataURL;
  img.setAttribute("crossOrigin", "anonymous");

  img.onload = await function() {
    var canvas = document.createElement("canvas");
    canvas.width = this.width;
    canvas.height = this.height;

    var ctx = canvas.getContext("2d");
    ctx.drawImage(this, 0, 0);

    dataURL = canvas.toDataURL("image/png");

    dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
  };
  console.log(dataURL);

  return dataURL;
};
const url = `https://s3.ap-south-1.amazonaws.com/pb-egov-assets/${property.tenantId}/logo.png`;
const getHeaderDetails = (property, cities) => {
  const propertyTenant = cities.filter((item) => item.code === property.tenantId);
  console.log(propertyTenant);
  return {
    header: `${propertyTenant[0].name} MUNICIPAL CORPORATION`,
    subheader: "Property Tax Payment Receipt (Citizen Copy)",
    logo: propertyTenant[0].imageId || msevaLogo,
    contact: propertyTenant[0].contactNumber,
    website: propertyTenant[0].domainUrl,
  };
};

const createReceiptDetails = (property, propertyDetails, receiptDetails, localizationLabels, cities) => {
  return {
    ReceiptNo: get(receiptDetails, "Bill[0].billDetails[0].receiptNumber"),
    header: getHeaderDetails(property, cities),
    taxNew:
      receiptDetails &&
      getTaxInfo(receiptDetails.Bill[0].billDetails[0].billAccountDetails, receiptDetails.Bill[0].billDetails[0].totalAmount, localizationLabels),
    tax: {
      AmountPaid: "100",
      fireCess: "10",
      rebate: "10",
      total: "100",
    },
    receipts: {
      AmountPaid: receiptDetails && get(receiptDetails, "Bill[0].billDetails[0].amountPaid"),
      transactionId: receiptDetails && get(receiptDetails, "Bill[0].billDetails[0].receiptNumber"),
      bankName: "AXIS",
      payMode: "Net Banking",
      pendingAmt:
        receiptDetails && get(receiptDetails, "Bill[0].billDetails[0].totalAmount") - get(receiptDetails, "Bill[0].billDetails[0].amountPaid"),
      paymentDate: receiptDetails && getDateFromEpoch(get(receiptDetails, "Bill[0].billDetails[0].receiptDate")),
      receiptNo: receiptDetails && get(receiptDetails, "Bill[0].billDetails[0].receiptNumber"),
    },
    propertyDetails: [{ ...propertyDetails }],
    address: property.address,
    owners: propertyDetails.owners,
    existingPropertyId: property.oldPropertyId,
    propertyId: property.propertyId,
  };
};

export default createReceiptDetails;
