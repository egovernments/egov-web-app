import React, { Component } from "react";
import Screen from "../common/Screen";
import ImageUpload from "./components/ImageUpload";
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
    images: [{ imageSource: Potholes_1 }, { imageSource: Potholes_1 }],
    openUploadSlide: false,
  };

  handleLandmarkChange = (e, value) => {
    this.setState({ landmark: value });
  };

  handleDetailsChange = (e, value) => {
    this.setState({ additionalDetails: value });
  };

  removeImage = (e, index) => {
    let { images } = this.state;
    images.splice(index, 1);
    this.setState({ images });
    e.stopPropagation();
  };

  addImage = () => {
    this.setState({ openUploadSlide: true });
  };

  onClickAddPic = (isOpen) => {
    this.setState({ openUploadSlide: isOpen });
  };

  render() {
    return (
      <Screen>
        <div className="add-complaint-main-cont">
          <ImageUpload images={this.state.images} removeImage={this.removeImage} addImage={this.addImage} />
          <ComplaintTypeCard />
          <LocationDetailsCard landmark={this.state.landmark} locationDetails={this.state.locationDetails} onChange={this.handleLandmarkChange} />
          <AdditionalDetailsCard additionalDetails={this.state.additionalDetails} onChange={this.handleDetailsChange} />
          <div className="add-complaint-button-cont">
            <Button className="add-complaint-submit-button" label="SUBMIT COMPLAINT" fullWidth={true} primary={true} />
          </div>
          <div>
            {this.state.openUploadSlide && (
              <UploadDrawer
                openUploadSlide={this.state.openUploadSlide}
                galleryIcon={true}
                removeIcon={true}
                setProfilePic={this.setProfilePic}
                onClickAddPic={this.onClickAddPic}
              />
            )}
          </div>
        </div>
      </Screen>
    );
  }
}

export default AddComplaints;
