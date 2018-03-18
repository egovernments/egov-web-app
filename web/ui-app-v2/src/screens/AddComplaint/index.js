import React, { Component } from "react";
import Screen from "../common/Screen";
import ImageUpload from "../common/ImageUpload";
import ComplaintTypeCard from "./components/ComplaintType";
import LocationDetailsCard from "./components/LocationDetails";
import AdditionalDetailsCard from "./components/AdditionalDetails";
import Potholes_1 from "../../assets/images/Potholes_1.png";
import { Button, UploadDrawer } from "../../components";

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

  render() {
    return (
      <Screen>
        <div className="add-complaint-main-cont">
          <ImageUpload />
          <ComplaintTypeCard />
          <LocationDetailsCard landmark={this.state.landmark} locationDetails={this.state.locationDetails} onChange={this.handleLandmarkChange} />
          <AdditionalDetailsCard additionalDetails={this.state.additionalDetails} onChange={this.handleDetailsChange} />
          <div className="add-complaint-button-cont">
            <Button className="add-complaint-submit-button" label="SUBMIT COMPLAINT" fullWidth={true} primary={true} />
          </div>
        </div>
      </Screen>
    );
  }
}

export default AddComplaints;
