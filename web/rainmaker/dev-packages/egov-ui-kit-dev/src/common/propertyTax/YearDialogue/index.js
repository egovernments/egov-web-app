import React, { Component } from "react";
import { Dialog } from "components";
import SingleButtonForm from "./components/SingleButtonForm";
import Label from "egov-ui-kit/utils/translationNode";
import formHoc from "egov-ui-kit/hocs/form";
import { resetFormWizard } from "egov-ui-kit/utils/PTCommon";
import { connect } from "react-redux";
import { fetchGeneralMDMSData } from "egov-ui-kit/redux/common/actions";
import { removeForm } from "egov-ui-kit/redux/form/actions";
import { toggleSpinner } from "egov-ui-kit/redux/common/actions";
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

const YearDialogueHOC = formHoc({ formKey: "financialYear", path: "PropertyTaxPay", isCoreConfiguration: true })(SingleButtonForm);

class YearDialog extends Component {
  componentDidMount = () => {
    const { fetchGeneralMDMSData, toggleSpinner } = this.props;
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
    toggleSpinner();
    fetchGeneralMDMSData(requestBody, "egf-master", ["FinancialYear"]);
    toggleSpinner();
  };

  resetForm = () => {
    const { form, removeForm } = this.props;
    resetFormWizard(form, removeForm);
  };

  render() {
    let { open, closeDialogue, getYearList, history, form, removeForm, urlToAppend } = this.props;
    console.log(urlToAppend);
    return getYearList ? (
      <Dialog
        open={open}
        children={[
          <div key={1}>
            <div className="dialogue-question">
              <Label label="PT_PROPERTY_TAX_WHICH_YEAR_QUESTIONS" fontSize="16px" color="#484848" />
            </div>
            <div className="year-range-botton-cont">
              {getYearList &&
                Object.values(getYearList).map((item, index) => (
                  <YearDialogueHOC
                    key={index}
                    label={item}
                    history={history}
                    resetFormWizard={() => resetFormWizard(form, removeForm)}
                    urlToAppend={urlToAppend}
                  />
                ))}
            </div>
          </div>,
        ]}
        bodyStyle={{ backgroundColor: "#ffffff" }}
        isClose={false}
        onRequestClose={closeDialogue}
        contentStyle={{ width: "20%" }}
      />
    ) : null;
  }
}

const mapStateToProps = (state) => {
  const { common, form } = state;
  const { generalMDMSDataById } = common;
  const FinancialYear = generalMDMSDataById && generalMDMSDataById.FinancialYear;
  const getYearList = FinancialYear && Object.keys(FinancialYear);
  return { getYearList, form };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchGeneralMDMSData: (requestBody, moduleName, masterName) => dispatch(fetchGeneralMDMSData(requestBody, moduleName, masterName)),
    removeForm: (formkey) => dispatch(removeForm(formkey)),
    toggleSpinner: () => dispatch(toggleSpinner()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(YearDialog);
