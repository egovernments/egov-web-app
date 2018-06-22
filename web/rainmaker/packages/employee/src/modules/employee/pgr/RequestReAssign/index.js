import React, { Component } from "react";
import { connect } from "react-redux";
import formHOC from "egov-ui-kit/hocs/form";
import { Screen } from "modules/common";
import RequestReassignForm from "./components/RequestReassignForm";
import { handleFieldChange } from "egov-ui-kit/redux/form/actions";
import { fetchComplaints } from "egov-ui-kit/redux/complaints/actions";
import Label from "egov-ui-kit/utils/translationNode";
import "./index.css";

const RequestReassignHOC = formHOC({ formKey: "requestReassign" })(RequestReassignForm);

class RequestReAssign extends Component {
  state = {
    valueSelected: "",
    commentValue: "",
  };

  componentDidMount() {
    let { fetchComplaints, match } = this.props;
    fetchComplaints([{ key: "serviceRequestId", value: match.params.serviceRequestId }]);
  }
  options = [
    { value: "Not my Department", label: <Label label="ES_REASSIGN_OPTION_ONE" /> },
    { value: "Not my Jurisdiction", label: <Label label="ES_REASSIGN_OPTION_TWO" /> },
    { value: "Absent or Leave", label: <Label label="ES_REASSIGN_OPTION_THREE" /> },
    { value: "Not a valid Complaint", label: <Label label="ES_REASSIGN_OPTION_FOUR" /> },
  ];

  commentsValue = {};

  handleCommentsChange = (e, value) => {
    this.commentsValue.textVal = value;
    this.setState({
      commentValue: e.target.value,
    });
    this.concatComments(this.commentsValue);
  };
  handleOptionsChange = (event, value) => {
    this.setState({ valueSelected: value });
    this.commentsValue.radioValue = value;
    this.concatComments(this.commentsValue);
  };
  concatComments = (val) => {
    let com1 = "";
    let com2 = "";
    if (val.radioValue) {
      com1 = val.radioValue + ";";
    }
    if (val.textVal) {
      com2 = val.textVal;
    }
    let concatvalue = com1 + com2;
    this.props.handleFieldChange("requestReassign", "comments", concatvalue);
  };

  render() {
    const { handleCommentsChange, handleOptionsChange } = this;
    const { valueSelected, commentValue } = this.state;

    return (
      <Screen className="background-white">
        <RequestReassignHOC
          options={this.options}
          ontextAreaChange={handleCommentsChange}
          handleOptionChange={handleOptionsChange}
          optionSelected={valueSelected}
          commentValue={commentValue}
        />
      </Screen>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleFieldChange: (formKey, fieldKey, value) => dispatch(handleFieldChange(formKey, fieldKey, value)),
    fetchComplaints: (criteria) => dispatch(fetchComplaints(criteria)),
  };
};

export default connect(
  null,
  mapDispatchToProps
)(RequestReAssign);
