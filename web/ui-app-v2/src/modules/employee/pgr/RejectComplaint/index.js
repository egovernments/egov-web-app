import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "components";
import Screen from "modules/common/common/Screen";
import Question from "modules/common/pgr/ReOpenComplaint/components/Question";
import TextArea from "modules/common/pgr/ReOpenComplaint/components/TextArea";
import { handleFieldChange, submitForm, initForm } from "redux/form/actions";
import { fetchComplaints } from "redux/complaints/actions";
import Label from "utils/translationNode";
import "./index.css";

class RejectComplaint extends Component {
  state = {
    valueSelected: "",
  };

  constructor(props) {
    super(props);
    this.formConfig = require("config/forms/rejectComplaint").default;
  }
  componentDidMount() {
    let { fetchComplaints, match } = this.props;
    fetchComplaints([{ key: "serviceRequestId", value: match.params.serviceRequestId }]);
    this.props.initForm(this.formConfig);
  }

  options = [
    { value: "Not a valid complaint", label: <Label label="ES_REASSIGN_OPTION_ONE" /> },
    { value: "Out of operational scope", label: <Label label="ES_REJECT_OPTION_TWO" /> },
    { value: "Operation already underway", label: <Label label="ES_REJECT_OPTION_THREE" /> },
    { value: "Other", label: <Label label="ES_REJECT_OPTION_FOUR" /> },
  ];

  commentsValue = {};
  handleComplaintSubmit = () => {
    const { formKey, submitForm } = this.props;
    submitForm(formKey);
  };
  handleCommentsChange = (e) => {
    this.commentsValue.textVal = e.target.value;
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
    this.props.handleFieldChange(this.props.formKey, "comments", concatvalue);
  };

  render() {
    const { handleComplaintSubmit, handleCommentsChange, handleOptionsChange } = this;
    const { form, loading } = this.props;
    const { valueSelected } = this.state;
    const { fields, submit } = form;
    const submitprops = submit;
    let textarea;
    if (fields) {
      textarea = fields.textarea;
    }

    return (
      <Screen className="reject-complaint-main-container" loading={loading}>
        <div>
          <div className="reject-complaint-question">
            <Question
              options={this.options}
              label={"ES_REJECT_COMPLAINT_QUESTION"}
              handleChange={handleOptionsChange}
              valueSelected={valueSelected}
            />
          </div>
          <div className="reject-complaint-textArea">
            <TextArea onChange={handleCommentsChange} {...textarea} value={this.commentsValue.textVal} />
          </div>
        </div>

        <div className="col-lg-offset-2 col-md-offset-2 col-lg-8 col-md-8 reject-complaint-button">
          <Button id="rejectcomplaint-submit-action" primary={true} {...submitprops} fullWidth={true} onClick={handleComplaintSubmit} />
        </div>
      </Screen>
    );
  }
}
const mapStateToProps = (state) => {
  const formKey = "rejectComplaint";
  const form = state.form[formKey] || {};
  const { loading } = form || false;
  return { form, formKey, loading };
};
const mapDispatchToProps = (dispatch) => {
  return {
    handleFieldChange: (formKey, fieldKey, value) => dispatch(handleFieldChange(formKey, fieldKey, value)),
    submitForm: (formKey) => dispatch(submitForm(formKey)),
    initForm: (form) => dispatch(initForm(form)),
    fetchComplaints: (criteria) => dispatch(fetchComplaints(criteria)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RejectComplaint);
