import React, { Component } from "react";
import { connect } from "react-redux";
import formHoc from "egov-ui-kit/hocs/form";
import AddComplaintForm from "./components/AddComplaintForm";
import { Screen } from "modules/common";
import "./index.css";

const ComplaintFormHOC = formHoc({ formKey: "complaint" })(AddComplaintForm);

class AddComplaints extends Component {
  render() {
    const { categories, localizationLabels } = this.props;
    return (
      <div className="csr-create-comp-main-screen">
        <ComplaintFormHOC categories={categories} localizationLabels={localizationLabels} history={this.props.history} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { localizationLabels } = state.app;
  const categories = state.complaints.categoriesById;
  return { categories, localizationLabels };
};

export default connect(mapStateToProps)(AddComplaints);
