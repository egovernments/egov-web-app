import React, { Component } from "react";
import Status from "./components/Status";
import Details from "./components/Details";
import ComplaintTimeLine from "./components/ComplaintTimeLine";
import Comments from "./components/Comments";
import Screen from "../common/Screen";
import { withRouter } from "react-router-dom";

import "./index.css";

class ComplaintDetails extends Component {
  state = {
    status: {
      // status: "ASSIGNED",
      // message: "JR.INSPECTOR - J KUMAR",
      bgColor: "#f5a623",
      status: "REJECTED",
      // message: "THANK YOU for your Application!",
      // // message: (
      // //   <div>
      // //     <span>THANK YOU </span> <br /> <span>for your Application!</span>
      // //   </div>
      // // ),
      // bgColor: "#7ed321"
    },
    details: {
      status: "Rejected",
      complaint: "Overflow of bins",
      applicationNo: "1234566",
      description: "Sterilization is scheduled in March. We are doing our best to resolve your issue at this time",
      images: [
        {
          src: "",
        },
        {
          src: "",
        },
        {
          src: "",
        },
      ],
      location: "Sector 32, 1 main, Amritsar",
    },
  };

  componentDidMount() {
    let { details } = this.state;
    console.log(this.props);
    if (this.props.location && this.props.location.search.split("=")[1] == "assigned") {
      this.setState({
        status: {
          status: "ASSIGNED",
          message: "JR.INSPECTOR - J KUMAR",
          bgColor: "#f5a623",
        },
        details: {
          ...details,
          status: "Assigned",
        },
      });
    }
  }

  render() {
    let { status, details, timeLine, comments } = this.state;
    return (
      <Screen>
        {/*<Status {...status} />*/}
        <Details {...details} />
        <ComplaintTimeLine status={status.status} timeLine={timeLine} />
        <Comments comments={comments} />
      </Screen>
    );
  }
}

export default withRouter(ComplaintDetails);
