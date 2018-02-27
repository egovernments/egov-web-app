import React, { Component } from "react";
import Status from "./components/Status";
import Details from "./components/Details";
import ComplaintTimeLine from "./components/ComplaintTimeLine";
import Comments from "./components/Comments";

import "./index.css";

class ComplaintDetails extends Component {
  state = {
    status: {
      // status:"PROCESS",
      // message:"Your application has been assigned to JR.INSPECTOR - J KUMAR & is under process",
      // bgColor:"#f5a623"
      status: "COMPLETED",
      message: (
        <div>
          <span>THANK YOU </span> <br /> <span>for your Application!</span>
        </div>
      ),
      bgColor: "#7ed321",
    },
  };
  render() {
    let { status, details, timeLine, comments } = this.state;
    return (
      <div className="col-lg-offset-2 col-md-offset-2 col-md-8 col-lg-8 zeroPadding">
        <Status {...status} />
        <Details {...details} />
        <ComplaintTimeLine timeLine={timeLine} />
        <Comments comments={comments} />
      </div>
    );
  }
}

export default ComplaintDetails;
