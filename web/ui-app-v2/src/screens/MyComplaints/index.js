import React, { Component } from "react";
import Complaints from "./components/Complaints";
import FeedbackPopup from "./components/FeedbackPopup";
import { Icon, ImageModal } from "../../components";
import FloatingActionButton from "material-ui/FloatingActionButton";
import Garbage_1 from "../../assets/images/Garbage_1.jpg";
import Garbage_2 from "../../assets/images/Garbage_2.jpg";
import Garbage_3 from "../../assets/images/Garbage_3.jpg";
import Potholes_1 from "../../assets/images/Potholes_1.png";
import Potholes_2 from "../../assets/images/Potholes_2.jpg";
import Potholes_3 from "../../assets/images/Potholes_3.jpg";
import "./index.css";

class MyComplaints extends Component {
  state = {
    complaints: [
      {
        header: "Potholes",
        address: "#18/2A, Ambalipura village, Bellandur Gate",
        status: "REJECTED",
        images: [
          {
            source: Potholes_1,
          },
          {
            source: Potholes_2,
          },
          {
            source: Potholes_3,
          },
        ],
      },
      {
        header: "Potholes",
        address: "#18/2A, Ambalipura village, Bellandur Gate",
        status: "ASSIGNED",
        images: [
          {
            source: Potholes_1,
          },
          {
            source: Potholes_2,
          },
          {
            source: Potholes_3,
          },
        ],
      },
      {
        header: "Potholes",
        address: "#18/2A, Ambalipura village, Bellandur Gate",
        status: "OPEN",
        images: [
          {
            source: Potholes_1,
          },
          {
            source: Potholes_2,
          },
          {
            source: Potholes_3,
          },
        ],
      },
      {
        header: "Garbage",
        address: "#21, Jakkasandra, Kormangala",
        status: "CLOSE",
        images: [
          {
            source: Garbage_1,
          },
          {
            source: Garbage_2,
          },
          {
            source: Garbage_3,
          },
        ],
      },
      {
        header: "Streetlight not working",
        address: "#18/2A, Ambalipura village, Bellandur Gate",
        status: "OPEN",
        images: [
          {
            source: Potholes_1,
          },
          {
            source: Potholes_2,
          },
          {
            source: Potholes_3,
          },
        ],
      },
    ],
    source: "",
    feedbackPopup: false,
    checkboxOptions: [
      { value: "Services", label: "Services" },
      { value: "Resolution Time", label: "Resolution Time" },
      { value: "Quality of work", label: "Quality of work" },
      { value: "Others", label: "Others" },
    ],
  };

  imageOnClick = source => {
    this.setState({ source });
    // this.setState({ feedbackPopup: true });
  };

  handlePopupClose = () => {
    this.setState({ feedbackPopup: false });
  };

  onCloseClick = () => {
    this.setState({ source: "" });
  };

  render() {
    let { complaints, source } = this.state;
    return (
      <div className="complaints-main-container">
        <Complaints complaints={complaints} onClick={this.imageOnClick} />
        <ImageModal imageSource={source} hide={source ? false : true} onCloseClick={this.onCloseClick} />
        <FeedbackPopup open={this.state.feedbackPopup} checkboxOptions={this.state.checkboxOptions} handleClose={this.handlePopupClose} />
        <div className="floating-button-cont">
          <FloatingActionButton className="floating-button">
            <Icon action="content" name="add" />
          </FloatingActionButton>
        </div>
      </div>
    );
  }
}

export default MyComplaints;
