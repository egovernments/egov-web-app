import msevaLogo from "egov-ui-kit/assets/images/pblogo.png";
import { getDateFromEpoch } from "egov-ui-kit/utils/commons";
import get from "lodash/get";
import { getTranslatedLabel } from "egov-ui-kit/utils/commons";
import { getCommaSeperatedAddress } from "egov-ui-kit/utils/commons";

const getTaxInfo = (billAccountDetails, totalAmount, localizationLabels) => {
  const headersFromAPI = billAccountDetails.map((item) => {
    return item.accountDescription && item.accountDescription.split("-")[0];
  });
  const headers = ["PT_TAX", "PT_FIRE_CESS", "PT_TIME_REBATE", "PT_TIME_INTEREST", "PT_TIME_REBATE", "PT_UNIT_USAGE_EXEMPTION", "PT_OWNER_EXEMPTION"];
  const transformedHeaders = headers.reduce((result, current) => {
    if (headersFromAPI.indexOf(current) > -1) {
      result.push(current);
    }
    return result;
  }, []);
  const taxArray = transformedHeaders.reduce(
    (result, current) => {
      result[0].push({ text: getTranslatedLabel(current, localizationLabels) });
      // result[0].push({ text: getTranslatedLabel(current.accountDescription.split("-")[0], localizationLabels) });
      const taxHeadContent = billAccountDetails.filter((item) => item.accountDescription && item.accountDescription.split("-")[0] === current);
      taxHeadContent && taxHeadContent[0] && result[1].push({ text: taxHeadContent[0].crAmountToBePaid || "0" });
      return result;
    },
    [[], []]
  );
  taxArray[0].push({ text: "Total" });
  taxArray[1].push({ text: totalAmount });
  return taxArray;
};

const getHeaderDetails = (property, cities) => {
  const propertyTenant = cities.filter((item) => item.code === property.tenantId);

  return {
    header: `${propertyTenant[0].name} MUNICIPAL CORPORATION`,
    subheader: "Property Tax Payment Receipt (Citizen Copy)",
    logo: msevaLogo,
    contact: propertyTenant[0].contactNumber,
    website: propertyTenant[0].domainUrl,
  };
};

const createReceiptDetails = (property, propertyDetails, receiptDetails, localizationLabels, cities, totalAmountToPay) => {
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
      AmountPaid: receiptDetails && get(receiptDetails, "Bill[0].billDetails[0].amountPaid").toString(),
      transactionId: receiptDetails && get(receiptDetails, "Bill[0].billDetails[0].receiptNumber"),
      bankName: "AXIS",
      payMode: "Net Banking",
      pendingAmt: receiptDetails && (totalAmountToPay - get(receiptDetails, "Bill[0].billDetails[0].amountPaid")).toString(),
      paymentDate: receiptDetails && getDateFromEpoch(get(receiptDetails, "Bill[0].billDetails[0].receiptDate")),
      receiptNo: receiptDetails && get(receiptDetails, "Bill[0].billDetails[0].receiptNumber"),
      transactionNo: receiptDetails && get(receiptDetails, "instrument.transactionNumber"),
      transactionDate: receiptDetails && get(receiptDetails, "instrument.transactionDate"),
      bankNameBranch: receiptDetails && `${get(receiptDetails, "instrument.bank.id")}, ${get(receiptDetails, "instrument.branchName")}`,
    },
    propertyDetails: [{ ...propertyDetails }],
    address: property.address,
    owners: propertyDetails.owners,
    existingPropertyId: property.oldPropertyId,
    propertyId: property.propertyId,
  };
};

const createReceiptUIInfo = (property, receiptDetails, cities, totalAmountToPay, success) => {
  const { owners: ownerDetails, financialYear } = property.propertyDetails[0];
  const ownerInfo = ownerDetails.map((item, index) => {
    return {
      key: `Owner${ownerDetails.length > 1 ? index + 1 : ""} name:`,
      value: item.name,
    };
  });
  return {
    propertyInfo: property && [
      ...ownerInfo,
      {
        key: "Existing Property ID:",
        value: property.oldPropertyId,
      },
      {
        key: "Property Tax Assessment ID:",
        value: property.propertyId,
      },
      {
        key: "Property Address:",
        value: getCommaSeperatedAddress(property.address, cities),
      },
    ],
    receiptInfo: [
      {
        key: "Assessment No.: ",
        value: receiptDetails && get(receiptDetails, success ? "Bill[0].billDetails[0].consumerCode" : "billDetails[0].consumerCode").split(":")[1],
      },
      {
        key: "Receipt No:",
        value: receiptDetails && get(receiptDetails, success ? "Bill[0].billDetails[0].receiptNumber" : "billDetails[0].receiptNumber"),
      },
      {
        key: "Payment Term:",
        value: financialYear,
      },
      {
        key: "Date:",
        value: receiptDetails && getDateFromEpoch(get(receiptDetails, success ? "Bill[0].billDetails[0].receiptDate" : "billDetails[0].billDate")),
      },
      {
        key: "Payable Amount:",
        value: totalAmountToPay ? totalAmountToPay.toString() : 0,
      },
      {
        key: "Amount Paid:",
        value: receiptDetails && success ? get(receiptDetails, "Bill[0].billDetails[0].amountPaid").toString() : "0",
      },
      {
        key: "Amount Due:",
        value: receiptDetails && (totalAmountToPay - (success ? get(receiptDetails, "Bill[0].billDetails[0].amountPaid") : 0)).toString(),
      },
    ],
  };
};

export { createReceiptUIInfo, createReceiptDetails };
