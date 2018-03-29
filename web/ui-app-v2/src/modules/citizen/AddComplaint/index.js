import React, { Component } from "react";
import { connect } from "react-redux";
import Screen from "../../common/Screen";
import ImageUpload from "../../common/ImageUpload";
import ComplaintTypeCard from "./components/ComplaintType";
import LocationDetailsCard from "./components/LocationDetails";
import AdditionalDetailsCard from "./components/AdditionalDetails";
import { Button } from "../../../components";
import { handleFieldChange, submitForm, initForm } from "redux/form/actions";
import { fileUpload } from "redux/file/actions";

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
    landmark: "",
    locationDetails: "Sector 32, 1 main, Amritsar",
    openMap: false,
  };

  handleLandmarkChange = (e, value) => {
    this.setState({ landmark: value });
  };

  handleDetailsChange = (e, value) => {
    this.setState({ additionalDetails: value });
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

  getAllImageUrls = (images) => {
    console.log(images);
    this.props.fileUpload(this.props.formKey, "media", images[0]);
  };

  render() {
    const { navigateToComplaintType, submitComplaint, getAllImageUrls } = this;

    return (
      <Screen>
        <div className="add-complaint-main-cont">
          <ImageUpload getAllImageUrls={getAllImageUrls} />
          <ComplaintTypeCard
            complaintType={this.props.form.fields && this.props.form.fields.complaintType && this.props.form.fields.complaintType.value}
            onClick={navigateToComplaintType}
          />
          <LocationDetailsCard
            landmark={this.state.landmark}
            locationDetails={this.props.form.fields && this.props.form.fields.address && this.props.form.fields.address.value}
            onChange={this.handleLandmarkChange}
            locationOnClick={this.locationOnClick}
          />
          <AdditionalDetailsCard additionalDetails={this.state.additionalDetails} onChange={this.handleDetailsChange} />
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
  // form: state.form;
  return { form, formKey };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleFieldChange: (formKey, fieldKey, value) => dispatch(handleFieldChange(formKey, fieldKey, value)),
    submitForm: (formKey) => dispatch(submitForm(formKey)),
    initForm: (form) => dispatch(initForm(form)),
    fileUpload: (formKey, fieldKey, file) => dispatch(fileUpload(formKey, fieldKey, file)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddComplaints);
