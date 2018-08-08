import React, { Component } from "react"
import Label from "egov-ui-kit/utils/translationNode"
import { ReceiptInformation, DemandDraftInformation } from "./forms"
import formHoc from "egov-ui-kit/hocs/form"
import { Card } from "components";

const ReceiptInformationHoc = formHoc({ formKey: "receiptInfo", copyName: "receiptInfo", path: "PropertyTaxPay" })(ReceiptInformation)

class ReceiptDetails extends Component {
  render() {
    return (
      <Card
        textChildren={
          <div className="receipt-details">
             <Label label="G8 Receipt Details" className="receipt-header" />
             <ReceiptInformationHoc />
          </div>
        }
      />
    )
  }
}

export default ReceiptDetails
