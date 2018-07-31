import React, { Component } from "react";
import { Icon } from "components";
import PropertyAddress from "./components/PropertyAddress";
import AdditionalDetails from "./components/AdditionalDetails";
import AssessmentInfo from "./components/AssessmentInfo";
import OwnerInfo from "./components/OwnerInfo";
import PropertyTaxDetailsCard from "./components/PropertyTaxDetails";
import propertyAddressConfig from "./formConfigs/propertyAddress";
import { httpRequest } from "egov-ui-kit/utils/api";
import { connect } from "react-redux";
import { MDMS } from "egov-ui-kit/utils/endPoints";

import "./index.css";
const defaultIconStyle = {
  fill: "#767676",
  width: 18,
  height: 20,
  marginLeft: 26,
  marginRight: 10,
};

const PropAddressIcon = <Icon style={defaultIconStyle} color="#ffffff" action="action" name="home" />;
const AssessmentInfoIcon = <Icon style={defaultIconStyle} color="#ffffff" action="action" name="assessment" />;
const OwnerInfoIcon = <Icon style={defaultIconStyle} color="#ffffff" action="social" name="person" />;

class ReviewForm extends Component {
  state = {
    valueSelected: "",
    importantDates: {},
  };
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

  handleOptionsChange = (event, value) => {
    this.setState({ valueSelected: value });
  };

  editIcon = <Icon onClick={this.handleEdit} style={defaultIconStyle} color="#ffffff" action="image" name="edit" />;
  render() {
    let { handleOptionsChange } = this;
    let { valueSelected, importantDates } = this.state;
    let { updateIndex, stepZero, stepTwo, stepOne, estimationDetails } = this.props;
    console.log(estimationDetails);
    return (
      <div>
        <PropertyAddress
          // form={propertyAddressConfig}
          icon={PropAddressIcon}
          editIcon={
            <Icon
              onClick={() => {
                updateIndex(0);
              }}
              style={defaultIconStyle}
              color="#ffffff"
              action="image"
              name="edit"
            />
          }
          component={stepZero}
        />
        <AssessmentInfo
          icon={AssessmentInfoIcon}
          editIcon={
            <Icon
              onClick={() => {
                updateIndex(1);
              }}
              style={defaultIconStyle}
              color="#ffffff"
              action="image"
              name="edit"
            />
          }
          component={stepOne}
        />
        <OwnerInfo
          icon={OwnerInfoIcon}
          editIcon={
            <Icon
              onClick={() => {
                updateIndex(2);
              }}
              style={defaultIconStyle}
              color="#ffffff"
              action="image"
              name="edit"
            />
          }
          // form={propertyAddressConfig}
          component={stepTwo}
        />
        <PropertyTaxDetailsCard estimationDetails={CalculationCriteria} importantDates={importantDates} />
        <AdditionalDetails handleOptionChange={handleOptionsChange} optionSelected={valueSelected} />
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

const CalculationCriteria = [
  {
    serviceNumber: null,
    totalAmount: 0,
    taxAmount: 850,
    penalty: 0,
    exemption: 850,
    rebate: 0,
    fromDate: 1522540800000,
    toDate: 1554076799000,
    tenantId: "pb.patiala",
    taxHeadEstimates: [
      {
        taxHeadCode: "Property Tax (PT)",
        estimateAmount: 850,
        category: "TAX",
      },
      {
        taxHeadCode: "Fire Cess (5% of PT)",
        estimateAmount: 1,
        category: "EXEMPTION",
      },
      {
        taxHeadCode: "Penalty (20% of PT)",
        estimateAmount: 1,
        category: "EXEMPTION",
      },
      {
        taxHeadCode: "Interest (18% p.a. daily)",
        estimateAmount: 1,
        category: "EXEMPTION",
      },
    ],
  },
];
