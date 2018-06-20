import React from "react";
import { Screen } from "modules/common";
import { Icon } from "components";
import PaymentStatus from "../common/PaymentStatus";

const receiptDetails = {
  OwnerName: "Harishikesh Anand",
  PropertyID: "PID-78-567",
  Property: "EB-154, Maya Enclave Harinagar, KT Marg Amritsar - 53",
  PaymentTerm: "2017-18",
  PropertyTaxDue: "1432.47",
};

const buttons = {
  button2: "Retry",
};

const failureMessages = {
  Message1: "OOPS !",
  Message2: "PT_RECEIPT_FAILURE_MESSAGE",
};

const icon = <Icon action="navigation" name="close" />;

const PaymentSuccess = () => {
  return (
    <Screen>
      <PaymentStatus receiptDetails={receiptDetails} floatingButtonColor="#e74c3c" icon={icon} messages={failureMessages} buttons={buttons} />
    </Screen>
  );
};

export default PaymentSuccess;
