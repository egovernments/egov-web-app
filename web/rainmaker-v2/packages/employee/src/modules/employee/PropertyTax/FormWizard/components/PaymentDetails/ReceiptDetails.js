import React, { Component } from "react"
import Label from "egov-ui-kit/utils/translationNode"
import { ReceiptInformation, DemandDraftInformation } from "./forms"
import formHoc from "egov-ui-kit/hocs/form"

const ReceiptInformationHoc = formHoc({ formKey: "receiptInfo", copyName: "receiptInfo", path: "PropertyTaxPay" })(ReceiptInformation)

class ReceiptDetails extends Component {
  render() {
    return (
      <div className="receipt-details">
         <Label label="G8 Receipt Details" className="receipt-header" />
         <ReceiptInformationHoc />
      </div>
    )
  }
}

export default ReceiptDetails
