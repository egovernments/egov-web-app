import React, { Component } from "react";
import { connect } from "react-redux";
import formHoc from "egov-ui-kit/hocs/form";
import { Screen } from "modules/common";
import { fetchComplaints } from "egov-ui-kit/redux/complaints/actions";
import { fileUpload } from "egov-ui-kit/redux/form/actions";
import ComplaintResolvedForm from "./components/ComplaintResolvedForm";
import "./index.css";

const ComplaintResolvedHOC = formHoc({ formKey: "complaintResolved" })(ComplaintResolvedForm);

class ComplaintResolved extends Component {
  componentDidMount() {
    let { fetchComplaints, match } = this.props;
    fetchComplaints([{ key: "serviceRequestId", value: match.params.serviceRequestId }]);
  }

  render() {
    return (
      <Screen className="complaint-resolved-main-container">
        <ComplaintResolvedHOC />
      </Screen>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fileUpload: (formKey, fieldKey, file) => dispatch(fileUpload(formKey, fieldKey, file)),
    fetchComplaints: (criteria) => dispatch(fetchComplaints(criteria)),
  };
};

export default connect(
  null,
  mapDispatchToProps
)(ComplaintResolved);
