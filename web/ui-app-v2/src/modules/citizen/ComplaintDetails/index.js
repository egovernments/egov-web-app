import React, { Component } from "react";
import { connect } from "react-redux";
import Details from "modules/common/complaintDetails/components/Details";
import ComplaintTimeLine from "modules/common/complaintDetails/components/ComplaintTimeLine";
import Comments from "modules/common/complaintDetails/components/Comments";
import Screen from "modules/common/Screen";
import { fetchComplaints } from "redux/complaints/actions";
import { getDateFromEpoch, mapCompIDToName, isImage,fetchImages } from "utils/commons";
import "./index.css";

class ComplaintDetails extends Component {
  componentDidMount() {
    let { fetchComplaints, match } = this.props;
    fetchComplaints([{ key: "serviceRequestId", value: match.params.serviceRequestId }]);
  }

  render() {
    let { complaint, timeLine } = this.props.transformedComplaint;

    let action;
    if (timeLine && timeLine[0]) {
      action = timeLine[0].action;
    }
    return (
      <Screen>
        {complaint && (
          <div>
            <Details {...complaint} action={action} />
            <ComplaintTimeLine
              status={complaint.status}
              timeLine={timeLine}
              feedback={complaint ? complaint.feedback : ""}
              rating={complaint ? complaint.rating : ""}
            />
            <Comments hasComments={true} />
          </div>
        )}
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
      complaint: mapCompIDToName(complaints.categoriesById, selectedComplaint.serviceCode),
      applicationNo: selectedComplaint.serviceRequestId,
      description: selectedComplaint.description,
      submittedDate: getDateFromEpoch(selectedComplaint.auditDetails.createdTime),
      address: selectedComplaint.address,
      images: fetchImages(selectedComplaint.actions).filter((imageSource) => isImage(imageSource)),
      feedback: selectedComplaint.feedback,
      rating: selectedComplaint.rating,
    };
    let timeLine = [];
    timeLine = selectedComplaint.actions.filter((action) => action.status && action.status);
    let transformedComplaint = {
      complaint: details,
      timeLine,
    };
    return { transformedComplaint };
  } else {
    return { transformedComplaint: {} };
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchComplaints: (criteria) => dispatch(fetchComplaints(criteria)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ComplaintDetails);
