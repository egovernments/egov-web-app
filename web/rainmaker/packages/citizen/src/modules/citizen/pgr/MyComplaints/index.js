import React, { Component } from "react";
import { connect } from "react-redux";
import { Icon } from "components";
import { Complaints } from "modules/common";
import { Screen } from "modules/common";
import FloatingActionButton from "material-ui/FloatingActionButton";
import { fetchComplaints } from "egov-ui-kit/redux/complaints/actions";
import { resetFiles } from "egov-ui-kit/redux/form/actions";
import { displayLocalizedStatusMessage, transformComplaintForComponent } from "egov-ui-kit/utils/commons";
import orderby from "lodash/orderBy";
import isEqual from "lodash/isEqual";
import "./index.css";

class MyComplaints extends Component {
  componentDidMount = () => {
    let { fetchComplaints, resetFiles, transformedComplaints, renderCustomTitle } = this.props;
    const numberOfComplaints = transformedComplaints && transformedComplaints.length;
    fetchComplaints([]);
    if (this.props.form && this.props.form.complaint) {
      resetFiles("complaint");
    }
    renderCustomTitle(numberOfComplaints);
  };

  onComplaintClick = (complaintNo) => {
    this.props.history.push(`/complaint-details/${complaintNo}`);
  };

  componentWillReceiveProps = (nextProps) => {
    const { role, transformedComplaints, renderCustomTitle } = this.props;
    if (!isEqual(transformedComplaints, nextProps.transformedComplaints)) {
      const numberOfComplaints = nextProps.transformedComplaints && nextProps.transformedComplaints.length;
      renderCustomTitle(numberOfComplaints);
    }
  };

  render() {
    let { transformedComplaints, history, fetchSuccess } = this.props;
    let { onComplaintClick } = this;
    return (
      <Screen loading={!fetchSuccess} className="citizen-screen-bottom-padding-clear form-without-button-cont-generic">
        <div className="complaints-main-container clearfix">
          <Complaints
            onComplaintClick={onComplaintClick}
            complaints={transformedComplaints}
            onClick={this.imageOnClick}
            track={true}
            role={"citizen"}
            noComplaintMessage={"CS_MYCOMPLAINTS_NO_COMPLAINTS"}
          />

          <div className="floating-button-cont">
            <FloatingActionButton
              id="mycomplaints-add"
              onClick={(e) => {
                history.push("/add-complaint");
              }}
              className="floating-button"
              backgroundColor={"#fe7a51"}
            >
              <Icon action="content" name="add" />
            </FloatingActionButton>
          </div>
        </div>
      </Screen>
    );
  }
}

const displayStatus = (status = "", assignee, action) => {
  let statusObj = {};
  if (status.toLowerCase() == "closed" || status.toLowerCase() == "rejected" || status.toLowerCase() == "resolved") {
    statusObj.status = "CS_COMMON_CLOSED_UCASE";
  } else {
    statusObj.status = "CS_COMMON_OPEN_UCASE";
  }

  if (status) {
    if (status === "open" && action && action === "reopen") {
      statusObj.statusMessage = displayLocalizedStatusMessage("reopened");
    } else if (status === "assigned" && action && action === "reassign") {
      statusObj.statusMessage = displayLocalizedStatusMessage("reassigned");
    } else {
      statusObj.statusMessage = displayLocalizedStatusMessage(status);
    }
  }

  return statusObj;
};

const mapStateToProps = (state) => {
  const complaints = state.complaints || {};
  const { categoriesById } = complaints;
  const { common, form } = state;
  const { employeeById, citizenById } = common;
  const role = "citizen";
  const { loading, fetchSuccess } = complaints || false;
  const transformedComplaints = transformComplaintForComponent(complaints, role, employeeById, citizenById, categoriesById, displayStatus);
  var closedComplaints = orderby(transformedComplaints.filter((complaint) => complaint.complaintStatus === "CLOSED"), ["date"], ["desc"]);
  var nonClosedComplaints = orderby(transformedComplaints.filter((complaint) => complaint.complaintStatus !== "CLOSED"), ["date"], ["desc"]);
  return { form, complaints, transformedComplaints: [...nonClosedComplaints, ...closedComplaints], loading, fetchSuccess };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchComplaints: (criteria) => dispatch(fetchComplaints(criteria)),
    resetFiles: (formKey) => dispatch(resetFiles(formKey)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyComplaints);
