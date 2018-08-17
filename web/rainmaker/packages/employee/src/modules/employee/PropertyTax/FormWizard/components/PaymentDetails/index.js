import React, { Component } from "react";
import ReceiptDetails from "./ReceiptDetails";
import TaxBreakUp from "./TaxBreakUp";
import PaymentModes from "./PaymentModes";
import formHoc from "egov-ui-kit/hocs/form";
import { CashInformation, ChequeInformation, DemandDraftInformation, CardInformation, PaymentModeInformation } from "./forms";
import AdditionalDetails from "modules/employee/PropertyTax/FormWizard/components/ReviewForm/components/AdditionalDetails";

const PaymentModeSelector = formHoc({ formKey: "paymentModes" })(PaymentModeInformation);

const paymentModeDetails = [
  {
    primaryText: "Cash",
    forms: [
      {
        title: "Payer Details",
        className: "payer-details",
        comp: formHoc({ formKey: "cashInfo", copyName: "cashInfo", path: "PropertyTaxPay" })(CashInformation),
      },
    ],
  },
  {
    primaryText: "Cheque",
    forms: [
      {
        title: "Payer Details",
        className: "payer-details",
        comp: formHoc({ formKey: "cashInfo", copyName: "cashInfo", path: "PropertyTaxPay" })(CashInformation),
      },
      {
        title: "Cheque Details",
        className: "cheque-details",
        comp: formHoc({ formKey: "chequeInfo", copyName: "chequeInfo", path: "PropertyTaxPay" })(ChequeInformation),
      },
    ],
  },
  {
    primaryText: "DD",
    forms: [
      {
        title: "Payer Details",
        className: "payer-details",
        comp: formHoc({ formKey: "cashInfo", copyName: "cashInfo", path: "PropertyTaxPay" })(CashInformation),
      },
      {
        title: "Demand Draft Details",
        className: "demand-details",
        comp: formHoc({ formKey: "demandInfo", copyName: "demandInfo", path: "PropertyTaxPay" })(DemandDraftInformation),
      },
    ],
  },
  {
    primaryText: "Card",
    forms: [
      {
        title: "Payer Details",
        className: "payer-details",
        comp: formHoc({ formKey: "cashInfo", copyName: "cashInfo", path: "PropertyTaxPay" })(CashInformation),
      },
      {
        title: "Card Details",
        className: "card-details",
        comp: formHoc({ formKey: "cardInfo", copyName: "cardInfo", path: "PropertyTaxPay" })(CardInformation),
      },
    ],
  },
];

class PaymentDetails extends Component {
  state = {
    paymentModeDetails,
    valueSelected: "",
    errorText: "",
    totalAmountToBePaid: 0,
  };

  handleFieldChange = (event, value) => {
    let { estimationDetails, updateTotalAmount } = this.props;
    let { totalAmount } = (estimationDetails && estimationDetails[0]) || {};
    if (!isNaN(parseFloat(value)) && isFinite(value) && value > totalAmount) {
      this.setState({
        errorText: `amount should be numeric and can't be greater than ${totalAmount}`,
      });
    } else {
      this.setState({
        errorText: "",
      });
      updateTotalAmount && updateTotalAmount(value, this.state.valueSelected === "Full_Amount");
    }
  };

  // onRadioButtonChange = (e) => {
  //   const inputValue = e.target.value;
  //   this.setState({ totalAmountTobePaid: inputValue });
  // };

  onRadioButtonChange = (e) => {
    let { estimationDetails, updateTotalAmount } = this.props;
    let { totalAmount } = (estimationDetails && estimationDetails[0]) || {};
    if (e.target.value === "Full_Amount") {
      updateTotalAmount && updateTotalAmount(totalAmount, this.state.valueSelected === "Full_Amount");
      // this.setState({ totalAmountTobePaid: totalAmount, valueSelected: "Full_Amount" });
    } else {
      updateTotalAmount && updateTotalAmount(0, this.state.valueSelected === "Partial_Amount");
      // this.setState({ totalAmountTobePaid: 0, valueSelected: "Partial_Amount" });
    }
  };

  // updateTotalAmount = (value, isFullPayment) => {
  //   this.setState({
  //     totalAmountToBePaid: value,
  //     isFullPayment,
  //   });
  // };

  render() {
    const { paymentModeDetails, valueSelected, totalAmountTobePaid, errorText } = this.state;
    const { estimationDetails, importantDates } = this.props;
    let { totalAmount } = (estimationDetails && estimationDetails[0]) || {};
    return (
      <div className="payment-details">
        <TaxBreakUp estimationDetails={estimationDetails} importantDates={importantDates} />
        {totalAmount > 0 && (
          <AdditionalDetails
            value={this.props.totalAmountToBePaid}
            onRadioButtonChange={this.props.onRadioButtonChange}
            handleFieldChange={this.handleFieldChange}
            optionSelected={this.props.optionSelected}
            errorText={errorText}
            totalAmount={totalAmount && totalAmount}
            estimationDetails={estimationDetails}
          />
        )}
        {totalAmount > 0 && <PaymentModes paymentModeDetails={paymentModeDetails} PaymentModeSelector={PaymentModeSelector} />}
        <ReceiptDetails />
      </div>
    );
  }
}

export default PaymentDetails;
