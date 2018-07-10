import React, { Component } from "react";
import { connect } from "react-redux";
import { Banner } from "modules/common";
import NewAndOldComplaints from "./components/NewAndOldComplaints";
import Notifications from "./components/Notifications";
import { fetchComplaints } from "egov-ui-kit/redux/complaints/actions";
import { resetFiles } from "egov-ui-kit/redux/form/actions";
import { mapCompIDToName } from "egov-ui-kit/utils/commons";
import orderby from "lodash/orderBy";
import "./index.css";

class Home extends Component {
  componentDidMount = () => {
    const { fetchComplaints, resetFiles } = this.props;
    fetchComplaints([], false);
    if (this.props.form && this.props.form.complaint) {
      resetFiles("complaint");
    }
  };

  render() {
    const { updates, history } = this.props;
    return (
      <Banner className="homepage-banner banner-logo-home">
        <div className="home-page-cont">
          <div>
            <NewAndOldComplaints history={history} />
            <Notifications updates={updates} history={history} />
          </div>
        </div>
      </Banner>
    );
  }
}
const mapStateToProps = (state) => {
  const complaints = state.complaints || {};
  const { form } = state || {};
  let updates = [];
  Object.keys(complaints.byId).forEach((complaintKey, index) => {
    let complaintObj = {};
    let complaintactions = complaints.byId[complaintKey].actions && complaints.byId[complaintKey].actions.filter((complaint) => complaint.status);
    complaintObj.status = complaints.byId[complaintKey].status;
    complaintObj.action = complaintactions && complaintactions[0].action;
    complaintObj.title = mapCompIDToName(complaints.categoriesById, complaints.byId[complaintKey].serviceCode);
    complaintObj.date = complaints.byId[complaintKey].auditDetails.createdTime;
    complaintObj.number = complaintKey;
    updates.push(complaintObj);
  });
  var closedComplaints = orderby(updates.filter((complaint) => complaint.status && complaint.status.toLowerCase() === "closed"), ["date"], ["desc"]);
  var nonClosedComplaints = orderby(
    updates.filter((complaint) => complaint.status && complaint.status.toLowerCase() != "closed"),
    ["date"],
    ["desc"]
  );
  return { form, updates: [...nonClosedComplaints, ...closedComplaints] };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchComplaints: (criteria, hasUsers) => dispatch(fetchComplaints(criteria, hasUsers)),
    resetFiles: (formKey) => dispatch(resetFiles(formKey)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
