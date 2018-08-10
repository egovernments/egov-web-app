import React, { Component } from "react";
import Label from "egov-ui-kit/utils/translationNode";
import { ReceiptInformation, DemandDraftInformation } from "./forms";
import formHoc from "egov-ui-kit/hocs/form";
import { Card, Icon } from "components";

const ReceiptInformationHoc = formHoc({ formKey: "receiptInfo", copyName: "receiptInfo", path: "PropertyTaxPay" })(ReceiptInformation);

class ReceiptDetails extends Component {
  render() {
    return (
      <Card
        textChildren={
          <div className="receipt-details">
            <div className="payment-mode-header-cont rainmaker-displayInline">
              <Icon name="receipt" action="action" />
              <Label label="G8 Receipt Details" fontSize={16} bold={true} dark={true} containerStyle={{ marginLeft: 5 }} />
            </div>
            <ReceiptInformationHoc />
          </div>
        }
      />
    );
  }
}

export default ReceiptDetails;
