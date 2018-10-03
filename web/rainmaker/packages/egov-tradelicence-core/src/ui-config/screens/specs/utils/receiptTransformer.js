import { getReceiptData, getSearchResults } from "../utils";

export const transformedReceiptData = async () => {
  let receiptQueryObject = [
    {
      key: "tenantId",
      value: "pb.amritsar"
    },
    {
      key: "consumerCode",
      value: "PT-107-001330:AS-2018-08-29-001426"
    }
  ];
  const receiptResponse = await getReceiptData(receiptQueryObject);

  let applicationQueryObject = [
    { key: "tenantId", value: "pb.amritsar" },
    { key: "applicationNumber", value: "PB-TL-2018-09-27-000004" }
  ];
  const applicationResponse = await getSearchResults(applicationQueryObject);

  let receiptBody = {};
  if (receiptResponse && applicationResponse) {
    receiptBody.receiptNumber =
      receiptResponse.Receipt[0].Bill[0].billDetails[0].receiptNumber;
    receiptBody.applicationNumber =
      applicationResponse.Licenses[0].applicationNumber;
    receiptBody.financialYear = applicationResponse.Licenses[0].financialYear;
    receiptBody.paymentDate = applicationResponse.Licenses[0].receiptDate;
    receiptBody.tradeName = applicationResponse.Licenses[0].tradeName;
    receiptBody.doorNo =
      applicationResponse.Licenses[0].tradeLicenseDetail.address.doorNo;
    receiptBody.buildingName =
      applicationResponse.Licenses[0].tradeLicenseDetail.address.buildingName;
    receiptBody.streetName =
      applicationResponse.Licenses[0].tradeLicenseDetail.address.street;
    receiptBody.locality =
      applicationResponse.Licenses[0].tradeLicenseDetail.address.locality.code;
    receiptBody.ownerName =
      applicationResponse.Licenses[0].tradeLicenseDetail.owners[0].name;
    receiptBody.mobileNo =
      applicationResponse.Licenses[0].tradeLicenseDetail.owners[0].mobileNumber;
    receiptBody.amountPaid =
      receiptResponse.Receipt[0].Bill[0].billDetails[0].amountPaid;
    receiptBody.totalAmount =
      receiptResponse.Receipt[0].Bill[0].billDetails[0].totalAmount;
    receiptBody.amountDue = receiptBody.totalAmount - receiptBody.amountPaid;
    receiptBody.paymentMode =
      receiptResponse.Receipt[0].instrument.instrumentType.name;
    receiptBody.transactionNumber =
      receiptResponse.Receipt[0].instrument.transactionNumber;
    receiptBody.bankName = receiptResponse.Receipt[0].instrument.bank.name;
    receiptBody.branchName = receiptResponse.Receipt[0].instrument.branchName;
  } else {
    return null;
  }
  return receiptBody;
};
