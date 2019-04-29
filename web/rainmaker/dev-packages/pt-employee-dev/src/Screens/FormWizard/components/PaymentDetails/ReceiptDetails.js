import React, { Component } from "react";
import Label from "egov-ui-kit/utils/translationNode";
import { ReceiptInformation } from "./forms";
import formHoc from "egov-ui-kit/hocs/form";
import { Card, Icon } from "components";

const ReceiptInformationHoc = formHoc({
  formKey: "receiptInfo",
  copyName: "receiptInfo",
  path: "PropertyTaxPay"
})(ReceiptInformation);

class ReceiptDetails extends Component {
  render() {
    return (
      <Card
        textChildren={
          <div className="receipt-details">
            <div
              className="rainmaker-displayInline"
              style={{ paddingLeft: 4, alignItems: "center" }}
            >
              <Icon name="receipt" action="action" />
              <Label
                label="PT_G8_RECEIPT_LABEL"
                fontSize={16}
                bold={true}
                dark={true}
                containerStyle={{ marginLeft: 8 }}
              />
            </div>
            <ReceiptInformationHoc />
          </div>
        }
      />
    );
  }
}

export default ReceiptDetails;
