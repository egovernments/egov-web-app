import React, { Component } from "react"
import { List } from "components"
import Label from "egov-ui-kit/utils/translationNode"
//import PastPaymentDetailsForm from "modules/citizen/PropertyTax/LinkPastPayments/PastPaymentDetailsForm"
//import XYZ from "modules/citizen/PropertyTax/LinkPastPayments/index"
import formHoc from "egov-ui-kit/hocs/form"
import Field from "egov-ui-kit/utils/field"
// import {
//   UsageInformationHOC,
//   PropertyAddressHOC,
//   OwnershipTypeHOC,
//   OwnerInfoHOC,
//   InstitutionHOC,
//   OwnerInformation,
//   InstitutionAuthorityHOC,
// } from "modules/citizen/PropertyTax/FormWizard/components/Forms";

const FormDetails = ({ item }) => {
  return (
  <div>
    {item.forms.map((form) => {
      const { title, comp: TransactionForm, className } = form
      return (
        <div className={className}>
          <span className="mode-title">{title}</span>
          <TransactionForm />
        </div>
      )
    })}
  </div>
)}


const getListItems = (items) => items.map((item, index) => {
  const TransactionForm = item.form
  return {
    primaryText: <Label label={item.primaryText} className="list-header" />,
    secondaryText: <Label label={item.secondaryText} />,
    route: item.route,
    nestedItems: [{
      secondaryText: <FormDetails item={item} />,
      disabled: true,
      listContainerStyle: { padding: 0 }
    }],
  }
})

class PaymentModes extends Component {
  render() {
    return (
      <div className="payment-modes">
        <div className="payment-modes-header">Choose mode of Payment</div>
        <List
          items={getListItems(this.props.paymentModeDetails)}
          primaryTogglesNestedList={true}
          onItemClick={(item, index) => {
          //  history && history.push(item.route);
          }}
        />
      </div>
    )
  }
}

export default PaymentModes
