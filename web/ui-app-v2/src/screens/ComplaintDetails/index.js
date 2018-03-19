import React, { Component } from "react";
import Details from "./components/Details";
import ComplaintTimeLine from "./components/ComplaintTimeLine";
import Comments from "./components/Comments";
import Screen from "../common/Screen";
import FeedbackPopup from "../common/FeedbackPopup";
import { withRouter } from "react-router-dom";

import "./index.css";

class ComplaintDetails extends Component {
  state = {
    status: {
      // status: "ASSIGNED",
      // message: "JR.INSPECTOR - J KUMAR",
      bgColor: "#f5a623",
      status: "Resolved",
      // message: "THANK YOU for your Application!",
      // // message: (
      // //   <div>
      // //     <span>THANK YOU </span> <br /> <span>for your Application!</span>
      // //   </div>
      // // ),
      // bgColor: "#7ed321"
    },
    details: {
      status: "Resolved",
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
    feedbackOpen: false,
    submitted: false,
    value: [],
  };

  handleFeedbackOpen = () => {
    this.setState({ feedbackOpen: true });
  };

  handleFeedbackClose = () => {
    this.setState({ feedbackOpen: false });
    this.setState({ submitted: false });
  };

  handleFeedbackSubmit = () => {
    this.setState({ submitted: true });
  };

  onCheck = (value) => {
    let valueArray = this.state.value.slice(0);
    if (valueArray.indexOf(value) > -1) {
      valueArray.splice(valueArray.indexOf(value), 1);
    } else {
      valueArray.push(value);
    }
    this.setState({ value: valueArray });
  };

  componentDidMount() {
    let { details } = this.state;
    if (this.props.location && this.props.location.search.split("=")[1] === "rejected") {
      this.setState({
        status: {
          status: "Rejected",
          message: "JR.INSPECTOR - J KUMAR",
          bgColor: "#f5a623",
        },
        details: {
          ...details,
          status: "Rejected",
        },
      });
    } else if (this.props.location && this.props.location.search.split("=")[1] == "filed") {
      this.setState({
        status: {
          status: "Submitted",
          message: "JR.INSPECTOR - J KUMAR",
          bgColor: "#f5a623",
        },
        details: {
          ...details,
          status: "Submitted",
        },
      });
    }
  }

  render() {
    let { status, details, timeLine, comments, feedbackOpen, submitted, value } = this.state;
    return (
      <Screen>
        <Details {...details} />
        <ComplaintTimeLine status={status.status} timeLine={timeLine} handleFeedbackOpen={this.handleFeedbackOpen} />
        <Comments comments={comments} />
        <FeedbackPopup
          open={feedbackOpen}
          submitted={submitted}
          selected={value}
          handleClose={this.handleFeedbackClose}
          onSubmit={this.handleFeedbackSubmit}
          onCheck={this.onCheck}
        />
      </Screen>
    );
  }
}

export default withRouter(ComplaintDetails);
