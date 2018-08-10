import React, { Component } from "react";
import { List } from "components";
import Label from "egov-ui-kit/utils/translationNode";
//import PastPaymentDetailsForm from "modules/citizen/PropertyTax/LinkPastPayments/PastPaymentDetailsForm"
//import XYZ from "modules/citizen/PropertyTax/LinkPastPayments/index"
import formHoc from "egov-ui-kit/hocs/form";
import Field from "egov-ui-kit/utils/field";
import get from "lodash/get";
import { connect } from "react-redux";
import { Card, Icon } from "components";
import { removeForm } from "egov-ui-kit/redux/form/actions";
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
    <div className="payment-filled-details">
      {item.forms.map((form) => {
        const { title, comp: TransactionForm, className } = form;
        return (
          <div className={className}>
            <span className="mode-title">{title}</span>
            <TransactionForm />
          </div>
        );
      })}
    </div>
  );
};

const getListItems = (items) =>
  items.map((item, index) => {
    const TransactionForm = item.form;
    return {
      primaryText: <Label label={item.primaryText} className="list-header" />,
      secondaryText: <Label label={item.secondaryText} />,
      route: item.route,
      nestedItems: [
        {
          secondaryText: <FormDetails item={item} />,
          disabled: true,
          listContainerStyle: { padding: 0 },
        },
      ],
    };
  });

class PaymentModes extends Component {
  allFormkeys = ["demandInfo", "chequeInfo", "cardInfo", "cashInfo"];

  getPaymentDetails = () => {
    const { currentPaymentMode, paymentModeDetails, removeForm } = this.props;
    this.allFormkeys.forEach((item) => {
      removeForm(item);
    });
    const paymentData = paymentModeDetails.find((paymentMode) => paymentMode.primaryText.toLowerCase() === currentPaymentMode.toLowerCase());
    return FormDetails({ item: paymentData });
  };
  render() {
    const { PaymentModeSelector } = this.props;
    return (
      <Card
        textChildren={
          <div className="payment-modes">
            <div className="payment-mode-header-cont rainmaker-displayInline" style={{ padding: "0 0 0 16px" }}>
              <Icon name="credit-card" action="action" />
              <Label label="Choose mode of Payment" fontSize={16} bold={true} dark={true} containerStyle={{ marginLeft: 5 }} />
            </div>
            <PaymentModeSelector />
            {/*<List
              items={getListItems(this.props.paymentModeDetails)}
              primaryTogglesNestedList={true}
              listItemStyle={{ padding: "0px 20px", borderWidth: "10px 10px 0px" }}
              nestedListStyle={{ padding: "0px" }}
              innerDivStyle={{"border-bottom":"#e0e0e0 solid 1px"}}
              onItemClick={(item, index) => {
                //  history && history.push(item.route);
              }}
            />*/}
            {this.getPaymentDetails()}
          </div>
        }
      />
    );
  }
}

const mapStateToProps = (state) => {
  const currentPaymentMode = get(state, "form.paymentModes.fields.mode.value", "cash");
  return { currentPaymentMode };
};
const mapDispatchToProps = (dispatch) => {
  return {
    removeForm: (formKey) => dispatch(removeForm(formKey)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentModes);
