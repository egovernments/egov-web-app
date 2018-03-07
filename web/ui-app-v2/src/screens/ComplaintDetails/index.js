import React, { Component } from "react";
import Status from "./components/Status";
import Details from "./components/Details";
import ComplaintTimeLine from "./components/ComplaintTimeLine";
import Comments from "./components/Comments";

import "./index.css";

class ComplaintDetails extends Component {
  state = {
    status: {
      status:"PROGRESS",
      message:"Your application has been assigned to JR.INSPECTOR - J KUMAR & is under process",
      bgColor:"#f5a623"
      // status: "COMPLETED",
      // message: "THANK YOU for your Application!",
      // // message: (
      // //   <div>
      // //     <span>THANK YOU </span> <br /> <span>for your Application!</span>
      // //   </div>
      // // ),
      // bgColor: "#7ed321"
    },
    details:{
      status:"Assigned",
      complaint:"Overflow of bins",
      applicationNo:"1234566",
      description:"Sterilization is scheduled in March. We are doing our best to resolve your issue at this time",
      images:[{
        src:""
      },
      {
        src:""
      },
      {
        src:""
      }],
      location:"Sector 32, 1 main, Amritsar"
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
