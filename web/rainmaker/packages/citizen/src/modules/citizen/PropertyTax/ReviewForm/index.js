import React, { Component } from "react";
import { Icon } from "components";
import PropertyAddress from "./components/PropertyAddress";
import PaymentAmountDetails from "./components/PaymentAmountDetails";
import AssessmentInfo from "./components/AssessmentInfo";
import OwnerInfo from "./components/OwnerInfo";
import PropertyTaxDetailsCard from "./components/PropertyTaxDetails";
import { httpRequest } from "egov-ui-kit/utils/api";
import { connect } from "react-redux";
import { MDMS } from "egov-ui-kit/utils/endPoints";
import EditIcon from "./components/EditIcon";

import "./index.css";
const defaultIconStyle = {
  fill: "#767676",
  width: 22,
  height: 22,
  marginLeft: 15,
  marginRight: 10,
};

const PropAddressIcon = <Icon style={defaultIconStyle} color="#ffffff" action="action" name="home" />;
const AssessmentInfoIcon = <Icon style={defaultIconStyle} color="#ffffff" action="action" name="assignment" />;
const OwnerInfoIcon = <Icon style={defaultIconStyle} color="#ffffff" action="social" name="person" />;

class ReviewForm extends Component {
  state = {
    valueSelected: "Full_Amount",
    importantDates: {},
    totalAmountTobePaid: 0,
    errorText: "",
    pattern: false,
    minLength: 1,
    maxLength: 11,
  };

  // componentWillReceiveProps(nextProps) {
  //   let { estimationDetails: nextEstimationDetails } = nextProps;
  //   const { totalAmountToBePaid } = this.state
  //   const { totalAmount: nextTotalAmount } = this.props.estimationDetails[0] || 0
  //   if (totalAmountToBePaid !== nextTotalAmount && !isNaN(parseFloat(nextTotalAmount)) && isFinite(nextTotalAmount)) {
  //     this.setState({
  //       totalAmountTobePaid: nextTotalAmount,
  //     })
  //   }
  // }

  componentDidMount() {
    this.getImportantDates();
  }

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
        const { value } = this.props.financialYr;
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

  handleFieldChange = (event, value) => {
    let { totalAmount } = this.props.estimationDetails[0] || {};
    if (!isNaN(parseFloat(value)) && isFinite(value) && value > totalAmount) {
      this.setState({
        errorText: `amount should be numeric and can't be greater than ${totalAmount}`,
      });
    } else {
      this.setState({
        errorText: "",
      });
      this.props.updateTotalAmount(value, this.props.valueSelected === "Full_Amount");
    }
  };

  onRadioButtonChange = (e) => {
    let { estimationDetails } = this.props;
    let { totalAmount } = estimationDetails[0] || {};
    if (e.target.value === "Full_Amount") {
      this.setState({ totalAmountTobePaid: totalAmount, valueSelected: "Full_Amount" });
    } else {
      this.setState({ totalAmountTobePaid: 0, valueSelected: "Partial_Amount" });
    }
  };

  onEditButtonClick = (index) => {
    let { onTabClick } = this.props;
    onTabClick(index);
  };

  editIcon = <Icon onClick={this.handleEdit} style={defaultIconStyle} color="#ffffff" action="image" name="edit" />;
  render() {
    let { handleFieldChange, onRadioButtonChange, onEditButtonClick } = this;
    let { valueSelected, importantDates, pattern, errorText, minLength, maxLength } = this.state;
    let { onTabClick, stepZero, stepTwo, stepOne, estimationDetails, totalAmountTobePaid, isPartialPaymentInValid } = this.props;
    let { totalAmount } = estimationDetails[0] || {};
    return (
      <div>
        <PropertyAddress icon={PropAddressIcon} editIcon={<EditIcon onIconClick={() => onEditButtonClick(0)} />} component={stepZero} />
        <AssessmentInfo icon={AssessmentInfoIcon} editIcon={<EditIcon onIconClick={() => onEditButtonClick(1)} />} component={stepOne} />
        <OwnerInfo icon={OwnerInfoIcon} editIcon={<EditIcon onIconClick={() => onEditButtonClick(2)} />} component={stepTwo} />
        <PropertyTaxDetailsCard estimationDetails={estimationDetails} importantDates={importantDates} />
        {!isPartialPaymentInValid && <PaymentAmountDetails
          value={valueSelected === "Partial_Amount" ? totalAmountTobePaid : totalAmount}
          onRadioButtonChange={onRadioButtonChange}
          handleFieldChange={handleFieldChange}
          optionSelected={valueSelected}
          totalAmount={totalAmount && totalAmount}
          estimationDetails={estimationDetails}
          errorText={errorText}
        />}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setRoute: (route) => dispatch({ type: "SET_ROUTE", route }),
});
export default connect(
  null,
  mapDispatchToProps
)(ReviewForm);
