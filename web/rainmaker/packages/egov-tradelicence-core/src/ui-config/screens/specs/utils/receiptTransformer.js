import { getReceiptData, getSearchResults } from "../utils";

const handleNull = value => {
  let response = value ? value : "";
  return response;
};

const createAddress = (doorNo, buildingName, street, locality) => {
  let address = "";
  address += doorNo !== "" ? doorNo + ", " : "";
  address += buildingName !== "" ? buildingName + ", " : "";
  address += street !== "" ? street + ", " : "";
  address += locality;
  return address;
};

export const loadUlbLogo = tenantid => {
  var img = new Image();
  img.crossOrigin = "Anonymous";
  img.onload = function() {
    var canvas = document.createElement("CANVAS");
    var ctx = canvas.getContext("2d");
    canvas.height = this.height;
    canvas.width = this.width;
    ctx.drawImage(this, 0, 0);
    localStorage.setItem("base64UlbLogo", canvas.toDataURL());
    canvas = null;
  };
  img.src = `https://s3.ap-south-1.amazonaws.com/pb-egov-assets/${tenantid}/logo.png`;
};

export const loadApplicationData = async applicationNumber => {
  let data = {};
  let applicationQueryObject = [
    { key: "tenantId", value: "pb.amritsar" },
    { key: "applicationNumber", value: applicationNumber }
  ];
  let response = await getSearchResults(applicationQueryObject);

  if (response && response.Licenses) {
    data.applicationNumber = handleNull(response.Licenses[0].applicationNumber);
    data.licenseNumber = handleNull(response.Licenses[0].licenseNumber);
    data.financialYear = handleNull(response.Licenses[0].financialYear);
    data.paymentDate = handleNull(response.Licenses[0].receiptDate);
    data.tradeName = handleNull(response.Licenses[0].tradeName);
    data.doorNo = handleNull(
      response.Licenses[0].tradeLicenseDetail.address.doorNo
    );
    data.buildingName = handleNull(
      response.Licenses[0].tradeLicenseDetail.address.buildingName
    );
    data.streetName = handleNull(
      response.Licenses[0].tradeLicenseDetail.address.street
    );
    data.locality = handleNull(
      response.Licenses[0].tradeLicenseDetail.address.locality.code
    );
    data.ownerName = handleNull(
      response.Licenses[0].tradeLicenseDetail.owners[0].name
    );
    data.mobileNo = handleNull(
      response.Licenses[0].tradeLicenseDetail.owners[0].mobileNumber
    );
    data.licenseIssueDate = handleNull(response.Licenses[0].issuedDate);
    data.licenseExpiryDate = handleNull(response.Licenses[0].validTo);
    data.tradeType = handleNull(
      response.Licenses[0].tradeLicenseDetail.tradeUnits[0].tradeType
    );
    data.address = createAddress(
      data.doorNo,
      data.buildingName,
      data.streetName,
      data.locality
    );
  }
  localStorage.setItem("applicationDataForReceipt", JSON.stringify(data));
};

export const loadReceiptData = async consumerCode => {
  let data = {};
  let receiptQueryObject = [
    {
      key: "tenantId",
      value: "pb.amritsar"
    },
    {
      key: "consumerCode",
      value: consumerCode
    }
  ];
  let response = await getReceiptData(receiptQueryObject);

  if (response && response.Receipt) {
    data.receiptNumber = handleNull(
      response.Receipt[0].Bill[0].billDetails[0].receiptNumber
    );
    data.amountPaid = handleNull(
      response.Receipt[0].Bill[0].billDetails[0].amountPaid
    );
    data.totalAmount = handleNull(
      response.Receipt[0].Bill[0].billDetails[0].totalAmount
    );
    data.amountDue = handleNull(data.totalAmount - data.amountPaid);
    data.paymentMode = handleNull(
      response.Receipt[0].instrument.instrumentType.name
    );
    data.transactionNumber = handleNull(
      response.Receipt[0].instrument.transactionNumber
    );
    data.bankName = handleNull(response.Receipt[0].instrument.bank.name);
    data.branchName = handleNull(response.Receipt[0].instrument.branchName);
  }
  localStorage.setItem("receiptDataForReceipt", JSON.stringify(data));
};
