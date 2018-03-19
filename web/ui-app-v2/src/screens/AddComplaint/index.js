import React, { Component } from "react";
import Screen from "../common/Screen";
import ImageUpload from "../common/ImageUpload";
import ComplaintTypeCard from "./components/ComplaintType";
import LocationDetailsCard from "./components/LocationDetails";
import AdditionalDetailsCard from "./components/AdditionalDetails";
import { Button } from "../../components";
import "./index.css";

class AddComplaints extends Component {
  state = {
    landmark: "",
    locationDetails: "Sector 32, 1 main, Amritsar",
  };

  handleLandmarkChange = (e, value) => {
    this.setState({ landmark: value });
  };

  handleDetailsChange = (e, value) => {
    this.setState({ additionalDetails: value });
  };

  navigateToComplaintType = () => {
    this.props.history.push("/complaint-type");
  };


  submitComplaint = () => {
    this.props.history.push("/complaint-submitted");
  };

  render() {
    const { navigateToComplaintType, submitComplaint } = this;

    const { complaintType } = this.props;
    return (
      <Screen>
        <div className="add-complaint-main-cont">
          <ImageUpload />
          <ComplaintTypeCard complaintType={complaintType} onClick={navigateToComplaintType} />
          <LocationDetailsCard landmark={this.state.landmark} locationDetails={this.state.locationDetails} onChange={this.handleLandmarkChange} />
          <AdditionalDetailsCard additionalDetails={this.state.additionalDetails} onChange={this.handleDetailsChange} />
          <div className="add-complaint-button-cont">
            <Button onClick={submitComplaint} className="add-complaint-submit-button" label="SUBMIT COMPLAINT" fullWidth={true} primary={true} />
          </div>
        </div>
      </Screen>
    );
  }
}

export default AddComplaints;
