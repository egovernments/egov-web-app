import React, { Component } from "react";
import Banner from "../../common/Banner";
import NewAndOldComplaints from "./components/NewAndOldComplaints";
import Notifications from "./components/Notifications";
import { connect } from "react-redux";
import { fetchComplaints } from "../../../redux/complaints/actions";
import "./index.css";
import { transformById } from "../../../utils/commons";
import { getDateFromEpoch, mapCompIDToName } from "../../../utils/commons";

class Home extends Component {
  componentDidMount = () => {
    let { fetchComplaints } = this.props;
    fetchComplaints([]);
  };

  render() {
    const { history, updates } = this.props;
    return (
      <Banner className="homepage-banner">
        <div className="col-lg-offset-2 col-md-offset-2 col-md-8 col-lg-8 home-page-content">
          <div className="row">
            <NewAndOldComplaints history={history} />
            <Notifications updates={updates} />
          </div>
        </div>
      </Banner>
    );
  }
}

const statusToMessageMapping = {
  new: "Opened",
  rejected: "Rejected",
  closed: "Closed",
  open: "Opened",
  "re-assign": "Re-assigned",
};

const displayDate = (rawData) => {
  let split = rawData.split("/");
  split.splice(split.length - 1, 1);
  return split.join("-");
};

const displayStatus = (status) => {
  return status ? statusToMessageMapping[status.toLowerCase()] : "";
};

const mapStateToProps = (state) => {
  const complaints = state.complaints || {};
  let updates = [];
  Object.keys(complaints.byId).forEach((complaintKey, index) => {
    let complaintObj = {};
    complaintObj.status = displayStatus(complaints.byId[complaintKey].status);
    complaintObj.title = mapCompIDToName(complaints.categoriesById, complaints.byId[complaintKey].serviceCode);
    complaintObj.date = getDateFromEpoch(complaints.byId[complaintKey].auditDetails.createdTime);
    updates.push(complaintObj);
  });
  return { updates };
};

const mapDispatchToProps = {
  fetchComplaints,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
