import React, { Component } from "react";
import { connect } from "react-redux";
import Screen from "../../common/Screen";
import ImageUpload from "../../common/ImageUpload";
import TrackLocation from "../../common/TrackLocation";
import ComplaintTypeCard from "./components/ComplaintType";
import LocationDetailsCard from "./components/LocationDetails";
import AdditionalDetailsCard from "./components/AdditionalDetails";
import mapPinIcon from "../../../assets/Location_pin.svg";
import { Button } from "../../../components";

import "./index.css";

const latLng = { lat: 12.9199988, lng: 77.67078 };

class AddComplaints extends Component {
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
  };

  navigateToComplaintType = () => {
    this.props.history.push("/citizen/complaint-type");
  };

  submitComplaint = () => {
    this.props.history.push("/citizen/complaint-submitted");
  };

  locationOnClick = () => {
    this.props.history.push("/citizen/map");
  };

  render() {
    const { navigateToComplaintType, submitComplaint } = this;

    const { complaintType } = this.props;
    return (
      <Screen>
        <div className="add-complaint-main-cont">
          <ImageUpload />
          <ComplaintTypeCard complaintType={complaintType} onClick={navigateToComplaintType} />
          <LocationDetailsCard
            landmark={this.state.landmark}
            locationDetails={this.state.locationDetails}
            onChange={this.handleLandmarkChange}
            locationOnClick={this.locationOnClick}
          />
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
