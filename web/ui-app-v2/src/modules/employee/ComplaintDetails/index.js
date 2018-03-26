import React, { Component } from "react";
import Details from "../../common/complaintDetails/components/Details";
import ComplaintTimeLine from "../../common/complaintDetails/components/ComplaintTimeLine";
import Comments from "../../common/complaintDetails/components/Comments";
import Actions from "../../common/complaintDetails/components/ActionButton";
import Screen from "../../common/Screen";
import { withRouter } from "react-router-dom";

import "./index.css";

class ComplaintDetails extends Component {
  state = {
    status: {
      bgColor: "#f5a623",
      status: "Resolved",
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
    role: "",
    hasComments: true,
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
    } else if (this.props.location && this.props.location.search.split("=")[1] === "unassigned") {
      this.setState({
        status: {
          status: "Unassigned",
          message: "Jr.INSPECTOR - J KUMAR",
          bgColor: "#f5a623",
        },
        details: {
          ...details,
          status: "Unassigned",
        },
        role: "AO",
        hasComments: false,
      });
    } else if (this.props.location && this.props.location.search.split("=")[1] === "unassigned&reassign") {
      this.setState({
        status: {
          status: "Reassign",
          message: "Jr.INSPECTOR - J KUMAR",
          bgColor: "#f5a623",
        },
        details: {
          ...details,
          status: "Reassign",
        },
        role: "AO",
      });
    } else if (this.props.location && this.props.location.search.split("=")[1] === "assigned") {
      this.setState({
        status: {
          status: "Assign",
          message: "Jr.INSPECTOR - J KUMAR",
          bgColor: "#f5a623",
        },
        details: {
          ...details,
          status: "Assign",
        },
        role: "AO",
      });
    }
  }

  btnOneOnClick = () => {
    //Action for first button
  };
  btnTwoOnClick = () => {
    //Action for second button
  };

  render() {
    let btnOneLabel, btnTwoLabel;
    let { status, details, timeLine, comments, role, hasComments } = this.state;
    if (role === "AO" && status.status === "Unassigned") {
      btnOneLabel = "REJECT";
      btnTwoLabel = "ASSIGN";
    } else if (role === "AO" && status.status === "Reassign") {
      btnOneLabel = "REJECT";
      btnTwoLabel = "RE-ASSIGN";
    } else if (role === "AO" && status.status === "Assign") {
      btnOneLabel = "REQUEST RE-ASSIGN";
      btnTwoLabel = "MARK RESOLVED";
    }
    return (
      <Screen>
        <Details {...details} role={role} />
        <ComplaintTimeLine status={status.status} timeLine={timeLine} handleFeedbackOpen={this.handleFeedbackOpen} role={role} />
        <Comments comments={comments} hasComments={hasComments} />
        {role === "AO" && (
          <Actions btnOneLabel={btnOneLabel} btnOneOnClick={this.btnOneOnClick} btnTwoLabel={btnTwoLabel} btnTwoOnClick={this.btnTwoOnClick} />
        )}
      </Screen>
    );
  }
}

export default withRouter(ComplaintDetails);
