import React, { Component } from "react";
import AmountDetails from "./AmountDetails";
import ReceiptDetails from "./ReceiptDetails";
import TaxBreakUp from "./TaxBreakUp";
import { MDMS } from "egov-ui-kit/utils/endPoints";
import { httpRequest } from "egov-ui-kit/utils/api";
import PaymentModes from "./PaymentModes";
import formHoc from "egov-ui-kit/hocs/form";
import Field from "egov-ui-kit/utils/field";
// import {
//   UsageInformationHOC,
//   PropertyAddressHOC,
//   OwnershipTypeHOC,
//   OwnerInfoHOC,
//   InstitutionHOC,
//   OwnerInformation,
//   InstitutionAuthorityHOC,
// } from "modules/citizen/PropertyTax/FormWizard/components/Forms";
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
    primaryText: "Credit/Debit",
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
    importantDates: {},
    paymentModeDetails,
    valueSelected: "",
    errorText: "",
    totalAmountToBePaid: 0,
  };

  componentDidMount() {
    this.getImportantDates();
  }

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

  onRadioButtonChange = (e) => {
    const inputValue = e.target.value;
    this.setState({ totalAmountTobePaid: inputValue });
  };

  getImportantDates = async () => {
    try {
      let ImpDatesResponse = await httpRequest(MDMS.GET.URL, MDMS.GET.ACTION, [], {
        MdmsCriteria: {
          tenantId: "pb",
          moduleDetails: [
            {
              moduleName: "PropertyTax",
              masterDetails: [
                {
                  name: "Rebate",
                },
                {
                  name: "Penalty",
                },
                {
                  name: "Interest",
                },
                {
                  name: "FireCess",
                },
              ],
            },
          ],
        },
      });
      if (ImpDatesResponse && ImpDatesResponse.MdmsRes.PropertyTax) {
        const { Interest, FireCess, Rebate, Penalty } = ImpDatesResponse.MdmsRes.PropertyTax;
        const value = "2018-19";
        const intrest = this.findCorrectDateObj(value, Interest);
        const fireCess = this.findCorrectDateObj(value, FireCess);
        const rebate = this.findCorrectDateObj(value, Rebate);
        const penalty = this.findCorrectDateObj(value, Penalty);
        this.setState({
          importantDates: {
            intrest,
            fireCess,
            rebate,
            penalty,
          },
        });
      }
    } catch (e) {
      alert(e);
    }
  };

  findCorrectDateObj = (financialYear, category) => {
    const categoryYear = category.reduce((categoryYear, item) => {
      const year = item.fromFY && item.fromFY.slice(0, 4);
      categoryYear.push(year);
      return categoryYear;
    }, []);
    const assessYear = financialYear && financialYear.slice(0, 4);
    let chosenDateObj = {};
    const index = categoryYear.indexOf(assessYear);
    if (index > -1) {
      chosenDateObj = category[index];
    } else {
      categoryYear.sort((a, b) => a > b);
      for (let i = 0; i < categoryYear.length; i++) {
        if (assessYear > categoryYear[i]) {
          chosenDateObj = category[i - 1];
          break;
        }
      }
    }
    return chosenDateObj;
  };

  onRadioButtonChange = (e) => {
    let { estimationDetails } = this.props;
    let { totalAmount } = (estimationDetails && estimationDetails[0]) || {};
    if (e.target.value === "Full_Amount") {
      this.setState({ totalAmountTobePaid: totalAmount, valueSelected: "Full_Amount" });
    } else {
      this.setState({ totalAmountTobePaid: 0, valueSelected: "Partial_Amount" });
    }
  };

  updateTotalAmount = (value, isFullPayment) => {
    this.setState({
      totalAmountToBePaid: value,
      isFullPayment,
    });
  };

  render() {
    const { importantDates, paymentModeDetails, valueSelected, estimationDetails, totalAmountTobePaid } = this.state;
    let { totalAmount } = (estimationDetails && estimationDetails[0]) || {};

    console.log(estimationDetails);
    return (
      <div className="payment-details">
        <TaxBreakUp estimationDetails={estimationDetails} importantDates={importantDates} />
        <AdditionalDetails
          value={valueSelected === "Partial_Amount" ? totalAmountTobePaid : totalAmount}
          onRadioButtonChange={this.onRadioButtonChange}
          handleFieldChange={this.handleOptionsChange}
          optionSelected={valueSelected}
          errorText={this.state.errorText}
          totalAmount={totalAmount && totalAmount}
          estimationDetails={estimationDetails}
        />
        <AmountDetails />
        <PaymentModes paymentModeDetails={paymentModeDetails} PaymentModeSelector={PaymentModeSelector} />
        <ReceiptDetails />
      </div>
    );
  }
}

export default PaymentDetails;
