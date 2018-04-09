import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "components";
import Screen from "modules/common/Screen";
import ImageUpload from "modules/common/ImageUpload";
import ComplaintTypeCard from "./components/ComplaintType";
import LocationDetailsCard from "./components/LocationDetails";
import AdditionalDetailsCard from "./components/AdditionalDetails";
import { handleFieldChange, submitForm, initForm } from "redux/form/actions";
import { setRoute } from "redux/app/actions";
import { getCurrentAddress } from "utils/commons";
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
    if (nextProps.form.fields && nextProps.form.fields.address && !nextProps.form.fields.address.value) {
      getCurrentAddress().then((currAddress) => {
        this.props.handleFieldChange(this.props.formKey, "address", currAddress.address);
        this.props.handleFieldChange(this.props.formKey, "latitude", currAddress.lat);
        this.props.handleFieldChange(this.props.formKey, "longitude", currAddress.lng);
      });
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
            <Button {...submit} onClick={submitComplaint} className="add-complaint-submit-button" fullWidth={true} primary={true} />
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
  const { loading } = state.form || false;
  return { form, categories, formKey, loading };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleFieldChange: (formKey, fieldKey, value) => dispatch(handleFieldChange(formKey, fieldKey, value)),
    submitForm: (formKey) => dispatch(submitForm(formKey)),
    initForm: (form) => dispatch(initForm(form)),
    setRoute: (route) => dispatch(setRoute(route)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddComplaints);
