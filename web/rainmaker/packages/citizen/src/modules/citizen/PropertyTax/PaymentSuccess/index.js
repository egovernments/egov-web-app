import React from "react";
import { Screen } from "modules/common";
import { Icon } from "components";
import PaymentStatus from "../common/PaymentStatus";

const receiptDetails = {
  ReceiptNo: "PT03-067-03-117",
  TransactionID: "AB-879-67",
  payedDate: "24.04.18",
  OwnerName: "Harishikesh Anand",
  PropertyID: "PID-78-567",
  Property: "EB-154, Maya Enclave Harinagar, KT Marg Amritsar - 53",
  PaymentTerm: "2017-18",
  AmountPaid: "1432.47",
  button1: "Link previous payments",
  button2: "Finish",
};

const buttons = {
  button1: "Link previous payments",
  button2: "Finish",
};

const successMessages = {
  Message1: "Thank you !",
  Message2: "PT_RECEIPT_SUCCESS_MESSAGE",
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
