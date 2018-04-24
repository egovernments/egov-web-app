import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "components";
import Screen from "modules/common/Screen";
import ImageUpload from "modules/common/ImageUpload";
import ComplaintTypeCard from "./components/ComplaintType";
import { getTenantForLatLng } from "utils/commons";
import LocationDetailsCard from "./components/LocationDetails";
import AdditionalDetailsCard from "./components/AdditionalDetails";
import { handleFieldChange, submitForm, initForm } from "redux/form/actions";
import "./index.css";

class AddComplaints extends Component {
  state = {
    openMap: false,
  };

  constructor(props) {
    super(props);
    this.formConfig = require("config/forms/complaint").default;
  }

  componentDidMount() {
    this.props.initForm(this.formConfig);
  }

  componentWillReceiveProps = (nextProps) => {
    const { form, handleFieldChange, formKey, currentLocation } = this.props;
    if (form.fields && form.fields.address && !form.fields.address.value && nextProps.currentLocation.lat) {
      handleFieldChange(formKey, "latitude", nextProps.currentLocation.lat);
      handleFieldChange(formKey, "longitude", nextProps.currentLocation.lng);
      handleFieldChange(formKey, "address", nextProps.currentLocation.address);
      getTenantForLatLng(currentLocation).then((tenantId) => this.props.handleFieldChange(this.props.formKey, "tenantId", tenantId));
    }
  };

  handleLandmarkChange = (e, value) => {
    this.props.handleFieldChange(this.props.formKey, "landmark", value);
  };

  handleDetailsChange = (e, value) => {
    this.props.handleFieldChange(this.props.formKey, "additionalDetails", value);
  };

  navigateToComplaintType = () => {
    this.props.history.push("/citizen/complaint-type");
  };

  submitComplaint = () => {
    this.props.submitForm(this.props.formKey);
  };

  locationOnClick = () => {
    this.props.history.push(`/citizen/map?${this.props.formKey}`);
  };

  render() {
    const { navigateToComplaintType, submitComplaint } = this;
    const { formKey, categories, loading } = this.props;
    const fields = this.props.form.fields || {};
    const submit = this.props.form.submit;

    return (
      <Screen loading={loading}>
        <div className="add-complaint-main-cont">
          <ImageUpload module="rainmaker-pgr" formKey={formKey} fieldKey="media" />
          <ComplaintTypeCard categories={categories} complaintType={fields.complaintType} onClick={navigateToComplaintType} />
          <LocationDetailsCard
            landmark={fields.landmark}
            locationDetails={fields.address}
            onChange={this.handleLandmarkChange}
            locationOnClick={this.locationOnClick}
          />
          <AdditionalDetailsCard additionalDetails={fields.additionalDetails} onChange={this.handleDetailsChange} />
          <div className="col-lg-offset-2 col-md-offset-2 col-lg-8 col-md-8 add-complaint-button-cont">
            <Button
              style={{ boxShadow: "0 2px 5px 0 rgba(100, 100, 100, 0.5), 0 2px 10px 0 rgba(167, 167, 167, 0.5)" }}
              {...submit}
              onClick={submitComplaint}
              className="add-complaint-submit-button"
              fullWidth={true}
              primary={true}
            />
          </div>
        </div>
      </Screen>
    );
  }
}

const mapStateToProps = (state) => {
  const formKey = "complaint";
  const categories = state.complaints.categoriesById;
  const form = state.form[formKey] || {};
  const { loading } = form || false;
  const currentLocation = state.app.currentLocation || {};
  return { form, categories, formKey, loading, currentLocation };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleFieldChange: (formKey, fieldKey, value) => dispatch(handleFieldChange(formKey, fieldKey, value)),
    submitForm: (formKey) => dispatch(submitForm(formKey)),
    initForm: (form) => dispatch(initForm(form)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddComplaints);
