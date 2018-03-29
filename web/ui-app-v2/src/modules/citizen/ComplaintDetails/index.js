import React, { Component } from "react";
import Details from "../../common/complaintDetails/components/Details";
import ComplaintTimeLine from "../../common/complaintDetails/components/ComplaintTimeLine";
import Comments from "../../common/complaintDetails/components/Comments";
import Screen from "../../common/Screen";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "./index.css";
import { fetchComplaints } from "../../../redux/complaints/actions";
import { getDateFromEpoch } from "../../../utils/commons";

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
  };

  componentDidMount() {
    let { fetchComplaints, match } = this.props;
    fetchComplaints([{ key: "serviceRequestId", value: match.params.serviceRequestId }]);
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
    let { complaint } = this.props.transformedComplaint;
    console.log(complaint);
    let { status, details, timeLine, comments } = this.state;
    return (
      <Screen>
        {complaint && <Details {...complaint} />}
        <ComplaintTimeLine status={status.status} timeLine={timeLine} handleFeedbackOpen={this.handleFeedbackOpen} />
        <Comments comments={comments} hasComments={true} />
      </Screen>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { complaints } = state;
  let selectedComplaint = complaints["byId"][decodeURIComponent(ownProps.match.params.serviceRequestId)];
  if (selectedComplaint) {
    let details = {
      status: selectedComplaint.status,
      complaint: selectedComplaint.serviceCode,
      applicationNo: selectedComplaint.serviceRequestId,
      description: selectedComplaint.description,
      submittedDate: getDateFromEpoch(selectedComplaint.auditDetails.createdTime),
      address: selectedComplaint.address,
      images: selectedComplaint.actions[0].media,
    };
    let transformedComplaint = {
      complaint: details,
    };
    return { transformedComplaint };
  } else {
    return { transformedComplaint: {} };
  }
};

const mapDispatchToProps = {
  fetchComplaints,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ComplaintDetails));
