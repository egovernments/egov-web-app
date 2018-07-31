import React, { Component } from "react";
import { Dialog } from "components";
import SingleButtonForm from "./components/SingleButtonForm";
import formHoc from "egov-ui-kit/hocs/form";
import { connect } from "react-redux";
import { fetchGeneralMDMSData } from "egov-ui-kit/redux/common/actions";
import "./index.css";

// const getYearList = () => {
//   let today = new Date();
//   let month = today.getMonth() + 1;
//   let yearRange = [];
//   var counter = 0;
//   if (month <= 3) {
//     return getLastFiveYear(yearRange, today.getFullYear() - 1, counter);
//   } else {
//     return getLastFiveYear(yearRange, today.getFullYear(), counter);
//   }
// };

// const getLastFiveYear = (yearRange, currentYear, counter) => {
//   if (counter < 5) {
//     counter++;
//     yearRange.push(`${currentYear}-${currentYear + 1}`);
//     getLastFiveYear(yearRange, currentYear - 1, counter);
//   }
//   return yearRange;
// };

const YearDialogueHOC = formHoc({ formKey: "financialYear", path: "PropertyTaxPay" })(SingleButtonForm);

class YearDialog extends Component {
  componentDidMount = () => {
    const { fetchGeneralMDMSData } = this.props;
    const requestBody = {
      MdmsCriteria: {
        tenantId: "pb",
        moduleDetails: [
          {
            moduleName: "egf-master",
            masterDetails: [
              {
                name: "FinancialYear",
              },
            ],
          },
        ],
      },
    };
    fetchGeneralMDMSData(requestBody, "egf-master", ["FinancialYear"]);
  };

  render() {
    let { open, closeDialogue, getYearList } = this.props;
    return (
      <Dialog
        open={open}
        children={[
          <div key={1}>
            <div className="dialogue-question">Which year’s taxes would you like to pay? </div>
            <div className="year-range-botton-cont">
              {getYearList && Object.values(getYearList).map((item, index) => <YearDialogueHOC key={index} label={item} />)}
            </div>
          </div>,
        ]}
        bodyStyle={{ backgroundColor: "#ffffff" }}
        isClose={false}
        onRequestClose={closeDialogue}
        contentStyle={{ width: "20%" }}
      />
    );
  }
}

const mapStateToProps = (state) => {
  const { common } = state;
  const { generalMDMSDataById } = common;
  const FinancialYear = generalMDMSDataById && generalMDMSDataById.FinancialYear;
  const getYearList = FinancialYear && Object.keys(FinancialYear);
  console.log(getYearList);
  return { getYearList };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchGeneralMDMSData: (requestBody, moduleName, masterName) => dispatch(fetchGeneralMDMSData(requestBody, moduleName, masterName)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(YearDialog);
