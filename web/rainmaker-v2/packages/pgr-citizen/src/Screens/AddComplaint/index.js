import React, { Component } from "react";
import { connect } from "react-redux";
import formHoc from "egov-ui-kit/hocs/form";
import AddComplaintForm from "./components/AddComplaintForm";
import { handleFieldChange } from "egov-ui-kit/redux/form/actions";
import { Screen } from "modules/common";
import "./index.css";

const ComplaintFormHOC = formHoc({ formKey: "complaint" })(AddComplaintForm);

class AddComplaints extends Component {
  componentWillReceiveProps = (nextProps) => {
    const { form, handleFieldChange } = this.props;
    if (form && !form.fields.address.value) {
      if (nextProps.currentLocation && nextProps.currentLocation.address) {
        const { lat, lng, address } = nextProps.currentLocation;
        handleFieldChange("complaint", "latitude", lat);
        handleFieldChange("complaint", "longitude", lng);
        handleFieldChange("complaint", "address", address);
      }
    }
  };

  render() {
    const { categories, localizationLabels } = this.props;
    return (
      <Screen>
        <ComplaintFormHOC categories={categories} localizationLabels={localizationLabels} />
      </Screen>
    );
  }
}

const mapStateToProps = (state) => {
  const { localizationLabels, currentLocation } = state.app;
  const form = state.form["complaint"];
  const categories = state.complaints.categoriesById;
  return { categories, form, localizationLabels, currentLocation };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleFieldChange: (formKey, fieldKey, value) => dispatch(handleFieldChange(formKey, fieldKey, value)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddComplaints);
