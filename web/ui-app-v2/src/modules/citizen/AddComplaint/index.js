import React, { Component } from "react";
import { connect } from "react-redux";
import Screen from "../../common/Screen";
import ImageUpload from "../../common/ImageUpload";
import ComplaintTypeCard from "./components/ComplaintType";
import LocationDetailsCard from "./components/LocationDetails";
import AdditionalDetailsCard from "./components/AdditionalDetails";
import { Button } from "../../../components";
import { handleFieldChange, submitForm, initForm } from "redux/form/actions";
import "./index.css";

class AddComplaints extends Component {
  constructor(props) {
    super(props);
    this.formConfig = require("config/forms/complaint").default;
  }

  componentDidMount() {
    this.props.initForm(this.formConfig);
  }

  state = {
    openMap: false,
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
    this.props.history.push("/citizen/complaint-submitted");
  };

  locationOnClick = () => {
    this.props.history.push(`/citizen/map?${this.props.formKey}`);
  };

  render() {
    const { navigateToComplaintType, submitComplaint, sendFile } = this;
    const { formKey, fileUpload } = this.props;
    const fields = this.props.form.fields || {};
    return (
      <Screen>
        <div className="add-complaint-main-cont">
          <ImageUpload module="pgr" formKey={formKey} fieldKey="media" />
          <ComplaintTypeCard complaintType={fields.complaintType} onClick={navigateToComplaintType} />
          <LocationDetailsCard
            landmark={fields.landmark}
            locationDetails={fields.address}
            onChange={this.handleLandmarkChange}
            locationOnClick={this.locationOnClick}
          />
          <AdditionalDetailsCard additionalDetails={fields.additionalDetails} onChange={this.handleDetailsChange} />
          <div className="col-lg-offset-2 col-md-offset-2 col-lg-8 col-md-8 add-complaint-button-cont">
            <Button
              id="addComplaint-submit-complaint"
              onClick={submitComplaint}
              className="add-complaint-submit-button"
              label="SUBMIT COMPLAINT"
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
  const form = state.form[formKey] || {};
  return { form, formKey };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleFieldChange: (formKey, fieldKey, value) => dispatch(handleFieldChange(formKey, fieldKey, value)),
    submitForm: (formKey) => dispatch(submitForm(formKey)),
    initForm: (form) => dispatch(initForm(form)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddComplaints);
