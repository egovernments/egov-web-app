import React, { Component } from "react";
import Complaints from "./components/Complaints";
import { Icon, ImageModal, Label } from "../../components";
import {withRouter} from "react-router-dom";
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
        header: "Potholes on the road",
        date: "18-Mar-18",
        status: "OPEN",
        assignee: "Dharmendra Pal",
        complaintNo: "ARN 180311-05",
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
        date: "18-Mar-18",
        status: "CLOSED",
        assignee: "Dharmendra Pal",
        complaintNo: "ARN 180311-05",
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
        header: "Potholes on the road",
        date: "18-Mar-18",
        status: "REJECTED",
        assignee: "Dharmendra Pal",
        complaintNo: "ARN 180311-05",
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
        date: "18-Mar-18",
        status: "CLOSED",
        assignee: "Dharmendra Pal",
        complaintNo: "ARN 180311-05",
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
      }
    ],
    source: "",
  };

  imageOnClick = (source) => {
    this.setState({ source });
  };

  onCloseClick = () => {
    this.setState({ source: "" });
  };

  render() {
    let { complaints, source } = this.state;
    let {history} =this.props;
    return (
      <div className="complaints-main-container">
        {complaints.length === 0 ? (
          <div className="no-complaints-message-cont">
            <Label
              label={"You haven’t logged any complaints yet. Start with one, make a change"}
              dark={true}
              fontSize={"16px"}
              labelStyle={{ letterSpacing: "0.7px" }}
            />
          </div>
        ) : (
          <div>
            <Complaints complaints={complaints} onClick={this.imageOnClick} />
            <ImageModal imageSource={source} hide={source ? false : true} onCloseClick={this.onCloseClick} />
          </div>
        )}
        <div className="floating-button-cont">
          <FloatingActionButton onClick={(e)=>{
            history.push("/add-complaint");
          }} className="floating-button">
            <Icon action="content" name="add" />
          </FloatingActionButton>
        </div>
      </div>
    );
  }
}

export default withRouter(MyComplaints);
