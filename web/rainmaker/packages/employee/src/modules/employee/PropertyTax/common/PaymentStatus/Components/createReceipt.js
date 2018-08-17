import msevaLogo from "egov-ui-kit/assets/images/pblogo.png";
import { getDateFromEpoch } from "egov-ui-kit/utils/commons";
import get from "lodash/get";
import { getTranslatedLabel } from "egov-ui-kit/utils/commons";

const getTaxInfo = (billAccountDetails, totalAmount, localizationLabels) => {
  const taxArray = billAccountDetails.reduce(
    (result, current) => {
      current.accountDescription &&
        current.crAmountToBePaid != 0 &&
        result[0].push({ text: getTranslatedLabel(current.accountDescription.split("-")[0], localizationLabels) });
      current.accountDescription && current.crAmountToBePaid != 0 && result[1].push({ text: current.crAmountToBePaid });
      return result;
    },
    [[], []]
  );
  taxArray[0].push({ text: "Total" });
  taxArray[1].push({ text: totalAmount });
  return taxArray;
};

const createReceiptDetails = (property, propertyDetails, receiptDetails, localizationLabels) => {
  return {
    ReceiptNo: get(receiptDetails, "Bill[0].billDetails[0].receiptNumber"),
    header: {
      header: "AMRITSAR MUNICIPAL CORPORATION",
      subheader: "Property Tax Payment Receipt (Citizen Copy)",
      logo: msevaLogo,
    },
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
      G8receiptNo: receiptDetails && get(receiptDetails, "Receipt[0].Bill[0].billDetails[0].manualReceiptNumber"),
      G8receiptDate: receiptDetails && getDateFromEpoch(get(receiptDetails, "Receipt[0].Bill[0].billDetails[0].receiptDate")),
    },
    propertyDetails: [{ ...propertyDetails }],
    address: property.address,
    owners: propertyDetails.owners,
  };
};

export default createReceiptDetails;
