import React, { Component } from "react"
import AmountDetails from "./AmountDetails"
import ReceiptDetails from "./ReceiptDetails"
import TaxBreakUp from "./TaxBreakUp"
import { MDMS } from "egov-ui-kit/utils/endPoints"
import { httpRequest } from "egov-ui-kit/utils/api"
import PaymentModes from "./PaymentModes"
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
import { CashInformation, ChequeInformation, DemandDraftInformation, CardInformation } from "./forms"
import AdditionalDetails from "modules/employee/PropertyTax/FormWizard/components/ReviewForm/components/AdditionalDetails"

const paymentModeDetails =  [
  {
    primaryText: "Cash",
    forms: [
      {
        title: "Payer Details",
        className: "payer-details",
        comp: formHoc({ formKey: "cashInfo", copyName: "cashInfo", path: "PropertyTaxPay" })(CashInformation)
      },
    ],
  },
  {
    primaryText: "Cheque",
    forms: [
      {
        title: "Payer Details",
        className: "payer-details",
        comp: formHoc({ formKey: "cashInfo", copyName: "cashInfo", path: "PropertyTaxPay" })(CashInformation)
      },
      {
        title: "Cheque Details",
        className: "cheque-details",
        comp: formHoc({ formKey: "chequeInfo", copyName: "chequeInfo", path: "PropertyTaxPay" })(ChequeInformation)
      }
    ],
  },
  {
    primaryText: "DD",
    forms: [
      {
        title: "Payer Details",
        className: "payer-details",
        comp: formHoc({ formKey: "cashInfo", copyName: "cashInfo", path: "PropertyTaxPay" })(CashInformation)
      },
      {
        title: "Demand Draft Details",
        className: "demand-details",
        comp: formHoc({ formKey: "demandInfo", copyName: "demandInfo", path: "PropertyTaxPay" })(DemandDraftInformation)
      }
    ],
  },
  {
    primaryText: "Credit/Debit",
    forms: [
      {
        title: "Payer Details",
        className: "payer-details",
        comp: formHoc({ formKey: "cashInfo", copyName: "cashInfo", path: "PropertyTaxPay" })(CashInformation)
      },
      {
        title: "Card Details",
        className: "card-details",
        comp: formHoc({ formKey: "cardInfo", copyName: "cardInfo", path: "PropertyTaxPay" })(CardInformation)
      },
    ],
  },
]

class PaymentDetails extends Component {

  state = {
    importantDates: {},
    paymentModeDetails,
    valueSelected: "",
  };

  componentDidMount() {
    this.getImportantDates();
  }

  handleOptionsChange = (event, value) => {
    this.setState({ valueSelected: value });
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
        const value =  "2018-19";
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

  render() {
    const { importantDates, paymentModeDetails, valueSelected } = this.state
    return (
      <div className="payment-details">
        <TaxBreakUp importantDates={importantDates} />
        <AdditionalDetails
          value={10000}
          onRadioButtonChange={this.onRadioButtonChange}
          handleOptionChange={this.handleOptionsChange}
          optionSelected={valueSelected}
        />
        <AmountDetails />
        <PaymentModes paymentModeDetails={paymentModeDetails} />
        <ReceiptDetails />
      </div>
    )
  }
}

export default PaymentDetails
