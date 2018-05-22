import React, { Component } from "react";
import { connect } from "react-redux";
import formHoc from "hocs/form";
import AddComplaintForm from "./components/AddComplaintForm";
import Screen from "modules/common/common/Screen";
import "./index.css";

const ComplaintFormHOC = formHoc(AddComplaintForm, "complaint");

class AddComplaints extends Component {
  render() {
    const { categories, localizationLabels } = this.props;
    return (
      <Screen>
        <ComplaintFormHOC categories={categories} localizationLabels={localizationLabels} />
      </Screen>
    );
  }
}

// can be optimized; subscribing to localization labels which is probably bad
const mapStateToProps = (state) => {
  const { localizationLabels } = state.app;
  const categories = state.complaints.categoriesById;
  const currentLocation = state.app.currentLocation || {};
  return { categories, localizationLabels, currentLocation };
};

export default connect(mapStateToProps)(AddComplaints);
