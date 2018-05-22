import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "components";
import Screen from "modules/common/common/Screen";
import Label from "utils/translationNode";
import { fetchComplaints } from "redux/complaints/actions";
import { fileUpload } from "redux/form/actions";
import "./index.css";

class ReOpenComplaint extends Component {
  state = {
    valueSelected: "",
  };

  componentDidMount() {
    let { fetchComplaints, match } = this.props;
    fetchComplaints([{ key: "serviceRequestId", value: match.params.serviceRequestId }]);
  }

  options = [
    { value: "No work was done", label: <Label label="CS_REOPEN_OPTION_ONE" /> },
    { value: "Only partial work was done ", label: <Label label="CS_REOPEN_OPTION_TWO" /> },
    { value: "Employee did not turn up", label: <Label label="CS_REOPEN_OPTION_THREE" /> },
    { value: "No permanent solution", label: <Label label="CS_REOPEN_OPTION_FOUR" /> },
  ];
  commentsValue = {};
  handleComplaintSubmit = () => {
    const { formKey, submitForm } = this.props;
    submitForm(formKey);
  };
  handleCommentChange = (e, value) => {
    this.commentsValue.textVal = e.target.value;
    this.props.handleFieldChange(this.props.formKey, "textarea", value);
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
    const { handleComplaintSubmit, handleCommentChange, handleOptionsChange } = this;
    const { formKey, form, loading } = this.props;
    const { valueSelected } = this.state;
    const { fields, submit } = form;
    const submitprops = submit;
    let textarea;
    if (fields) {
      textarea = fields.textarea;
    }
    return (
      <Screen className="reopencomplaint-field" loading={loading}>
        {/* <div className="reopencomplaint-question">
          <Question options={this.options} label="CS_REOPEN_COMPLAINT_WHY" handleChange={handleOptionsChange} valueSelected={valueSelected} />
        </div>
        <div className="reopencomplaint-upload-photo">
          <ImageUpload module="rainmaker-pgr" formKey={formKey} fieldKey="media" />
        </div>
        <div className="reopencomplaint-textArea">
          <TextArea onChange={handleCommentChange} {...textarea} />
        </div>
        <div className="col-lg-offset-2 col-md-offset-2 col-lg-8 col-md-8 reopencomplaint-button">
          <Button {...submitprops} primary={true} fullWidth={true} onClick={handleComplaintSubmit} />
        </div> */}
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

export default connect(null, mapDispatchToProps)(ReOpenComplaint);
