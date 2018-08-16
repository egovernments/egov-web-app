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
            <div className="rainmaker-displayInline" style={{ paddingLeft: 4 }}>
              <Icon name="receipt" action="action" />
              <Label label="G8 Receipt Details" fontSize={16} bold={true} dark={true} containerStyle={{ marginLeft: 8, marginTop: 3 }} />
            </div>
            <ReceiptInformationHoc />
          </div>
        }
      />
    );
  }
}

export default ReceiptDetails;
