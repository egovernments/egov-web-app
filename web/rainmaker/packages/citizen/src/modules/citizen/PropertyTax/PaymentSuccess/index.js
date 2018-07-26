import React from "react";
import { Screen } from "modules/common";
import { Icon } from "components";
import PaymentStatus from "../common/PaymentStatus";
import msevaLogo from "egov-ui-kit/assets/images/pblogo.png";

const receiptDetails = {
  ReceiptNo: "PT03-067-03-117",
  TransactionID: "ZRN-647-98-756",
  AssessmentNo: "ZRN-453-98",
  payedDate: "24.04.18",
  OwnerName: "Harishikesh Anand",
  OldPropertyID: "PID-78-567",
  PropertyAddress: "EB-154, Maya Enclave Harinagar, KT Marg Amritsar - 53",
  PaymentTerm: "2017-18",
  PayableAmount: "1432.47",
  AmountPaid: "1432.47",
  AmountDue: "0.00",
  button1: "Link previous payments",
  button2: "Finish",
  oldPropertyId: "oldPropertyId",
  propertyId: "PB-PT-2018_07_19-000016",
  header: {
    header: "AMRITSAR MUNICIPAL CORPORATION",
    subheader: "Property Tax Payment Receipt (Citizen Copy)",
    logo: msevaLogo,
  },
  tax: {
    AmountPaid: "100",
    fireCess: "10",
    rebate: "10",
    total: "100",
  },
  receipts: {
    AmountPaid: "60",
    transactionId: "TR123",
    bankName: "ICICI",
    payMode: "Net Banking",
    pendingAmt: "40",
    paymentDate: "24/07/2018",
  },
  propertyDetails: [
    {
      noOfFloors: 2,
      landArea: 10,
      propertySubType: "INDEPENDENTBUILDING",
      financialYear: "2017-18",
      assessmentDate: 1531987969654,
      assessmentNumber: "PB-PT-2018_07_19-000019",
      documents: [
        {
          name: "aadhar",
          id: "12345",
        },
      ],
      units: [
        {
          floorNo: "1",
          occupancyType: "RENTED",
          usageCategoryDetail: "GROCERYSTORE",
          usageCategoryMajor: "NONRESIDENTIAL",
          usageCategoryMinor: "COMMERCIAL",
          usageCategorySubMinor: "RETAIL",
          unitArea: 10,
          arv: 100.1,
        },
        {
          floorNo: "2",
          occupancyType: "SELFOCCUPIED",
          usageCategoryDetail: "GROCERYSTORE",
          usageCategoryMajor: "NONRESIDENTIAL",
          usageCategoryMinor: "COMMERCIAL",
          usageCategorySubMinor: "RETAIL",
          unitArea: 90,
          arv: 200,
        },
      ],
    },
  ],
  address: {
    buildingName: "Springfield",
    city: "amritsar",
    locality: {
      code: "abc",
    },

    street: "Sarjapur Road",
    doorNo: "1/11",
  },
  owners: {
    mobileNumber: "9000000007",
    OwnershipType: "Individual",
    name: "testseven",
    ownerType: "WIDOW",

    correspondenceAddress: "bangalore",
  },
};

const buttons = {
  button1: "Link previous payments",
  button2: "Finish",
};

const successMessages = {
  Message1: "Thank you !",
  Message2: "Payment has been made successfully!",
};

const icon = <Icon action="navigation" name="check" />;

const PaymentSuccess = () => {
  return (
    <Screen>
      <PaymentStatus receiptDetails={receiptDetails} floatingButtonColor="#22b25f" icon={icon} messages={successMessages} buttons={buttons} />
    </Screen>
  );
};

export default PaymentSuccess;
