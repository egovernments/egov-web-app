import msevaLogo from "egov-ui-kit/assets/images/pblogo.png";
import { getDateFromEpoch } from "egov-ui-kit/utils/commons";
import get from "lodash/get";
import { getTranslatedLabel } from "egov-ui-kit/utils/commons";
import { getCommaSeperatedAddress } from "egov-ui-kit/utils/commons";

const getTaxInfo = (billAccountDetails, totalAmount, localizationLabels) => {
  const headersFromAPI = billAccountDetails.map((item) => {
    return item.accountDescription && item.accountDescription.split("-")[0];
  });
  const headers = [
    "PT_TAX",
    "PT_FIRE_CESS",
    "PT_CANCER_CESS",
    "PT_TIME_PENALTY",
    "PT_TIME_REBATE",
    "PT_TIME_INTEREST",
    "PT_UNIT_USAGE_EXEMPTION",
    "PT_OWNER_EXEMPTION",
    "PT_ADHOC_PENALTY",
    "PT_ADHOC_REBATE",
    "PT_ADVANCE_CARRYFORWARD",
    "PT_DECIMAL_CEILING",
    "PT_DECIMAL_CEILING_CREDIT",
    "PT_DECIMAL_CEILING_CREDIT_DEBIT",
    "PT_DECIMAL_CEILING_DEBIT",
  ];
  const negativeHeaders = [
    "PT_ADHOC_REBATE",
    "PT_ADVANCE_CARRYFORWARD",
    "PT_DECIMAL_CEILING_CREDIT_DEBIT",
    "PT_DECIMAL_CEILING_DEBIT",
    "PT_OWNER_EXEMPTION",
    "PT_TIME_REBATE",
    "PT_UNIT_USAGE_EXEMPTION",
  ];
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
      taxHeadContent &&
        taxHeadContent[0] &&
        result[1].push({
          text: taxHeadContent[0]
            ? taxHeadContent[0].debitAmount
              ? `-${taxHeadContent[0].debitAmount}`
              : taxHeadContent[0].crAmountToBePaid
                ? taxHeadContent[0].crAmountToBePaid
                : "0"
            : "NA",
        });
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
  const ulbGrade = get(propertyTenant[0], "city.ulbGrade");
  const name = get(propertyTenant[0], "name");
  return {
    header: getReceiptHeaderLabel(name, ulbGrade),
    subheader: "Property Tax Payment Receipt",
    logo: msevaLogo,
    contact: propertyTenant[0].contactNumber,
    website: propertyTenant[0].domainUrl,
  };
};

const getReceiptHeaderLabel = (name, ulbGrade) => {
  if (ulbGrade) {
    if (ulbGrade === "NP") {
      return `${name} Nagar Panchayat`;
    } else if (ulbGrade === "Municipal Corporation") {
      return `${name} Municipal Corporation`;
    } else if (ulbGrade.includes("MC Class")) {
      return `${name} Municipal Council`;
    } else {
      return `${name} Municipal Corporation`;
    }
  } else {
    return `${name} Municipal Corporation`;
  }
};

const createReceiptDetails = (property, propertyDetails, receiptDetails, localizationLabels, cities, totalAmountToPay, totalAmountPaid) => {
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
      bankName: receiptDetails && get(receiptDetails, "instrument.bank.name", "NA"),
      payMode: receiptDetails && get(receiptDetails, "instrument.instrumentType.name", "Net Banking"),
      pendingAmt: receiptDetails && (totalAmountToPay - totalAmountPaid).toString(),
      paymentDate: receiptDetails && getDateFromEpoch(get(receiptDetails, "Bill[0].billDetails[0].receiptDate")),
      receiptNo: receiptDetails && get(receiptDetails, "Bill[0].billDetails[0].receiptNumber"),
      transactionNo: receiptDetails && get(receiptDetails, "instrument.transactionNumber"),
      transactionDate: receiptDetails && getDateFromEpoch(get(receiptDetails, "instrument.transactionDateInput")),
      bankNameBranch: receiptDetails && `${get(receiptDetails, "instrument.bank.name")}, ${get(receiptDetails, "instrument.branchName")}`,
      G8receiptNo: receiptDetails && get(receiptDetails, "Bill[0].billDetails[0].manualReceiptNumber"),
      G8receiptDate:
        receiptDetails &&
        get(receiptDetails, "Bill[0].billDetails[0].manualReceiptDate") &&
        getDateFromEpoch(get(receiptDetails, "Bill[0].billDetails[0].manualReceiptDate")),
    },
    propertyDetails: [{ ...propertyDetails }],
    address: property.address,
    owners: propertyDetails.owners,
    existingPropertyId: property.oldPropertyId,
    propertyId: property.propertyId,
  };
};

const createReceiptUIInfo = (property, receiptDetails, cities, totalAmountToPay, success, totalAmountPaid) => {
  const amountDue = receiptDetails && (success ? totalAmountToPay - totalAmountPaid : amountToPay).toString();
  const amountToPay = receiptDetails && get(receiptDetails, success ? "Bill[0].billDetails[0].totalAmount" : "billDetails[0].totalAmount").toString();
  const { owners: ownerDetails, financialYear, institution, ownershipCategory } = property.propertyDetails[0];
  const isInstitution = ownershipCategory === "INSTITUTIONALPRIVATE" || ownershipCategory === "INSTITUTIONALGOVERNMENT";
  const ownerInfo = isInstitution
    ? [{ key: "Institution Name:", value: institution.name }, { key: "Authorized Person Name:", value: ownerDetails[0].name }]
    : ownerDetails.map((item, index) => {
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
        key: "Property Tax Unique ID:",
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
        value: receiptDetails && get(receiptDetails, success ? "Bill[0].billDetails[0].totalAmount" : "billDetails[0].totalAmount").toString(),
      },
      {
        key: "Amount Paid:",
        value: receiptDetails && success ? get(receiptDetails, "Bill[0].billDetails[0].amountPaid").toString() : "0",
      },
      {
        key: "Amount Due:",
        value: amountDue,
      },
    ],
  };
};

export { createReceiptUIInfo, createReceiptDetails };
