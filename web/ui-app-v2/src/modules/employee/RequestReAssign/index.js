import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "../../../components";
import Screen from "../../common/Screen";
import Question from "../../common/ReOpenComplaint/components/Question";
import TextArea from "../../common/ReOpenComplaint/components/TextArea";
import Label from "utils/translationNode";
import { handleFieldChange, submitForm, initForm } from "redux/form/actions";
import { fetchComplaints } from "redux/complaints/actions";
import { fileUpload } from "redux/form/actions";
import "./index.css";

class RequestReAssign extends Component {
  state = {
    valueSelected: "",
  };

  constructor(props) {
    super(props);
    this.formConfig = require("config/forms/requestReassign").default;
  }
  componentDidMount() {
    let { fetchComplaints, match } = this.props;
    fetchComplaints([{ key: "serviceRequestId", value: match.params.serviceRequestId }]);
    this.props.initForm(this.formConfig);
  }

  options = [
    { value: "Not my Department", label: "Not my Department" },
    { value: "Not my Jurisdiction", label: "Not my Jurisdiction" },
    { value: "Absent or Leave", label: "Absent or Leave" },
    { value: "Not a valid Complaint", label: "Not a valid Complaint" },
  ];

  commentsValue = {};
  handleComplaintSubmit = () => {
    const { formKey, submitForm } = this.props;
    submitForm(formKey);
  };
  handleCommentsChange = (e, value) => {
    this.commentsValue.textVal = value;
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
    const { handleComplaintSubmit, handleCommentsChange, handleOptionsChange } = this;
    const { formKey, form } = this.props;
    const { valueSelected } = this.state;
    const { fields, submit } = form;
    const submitprops = submit;
    let textarea;
    if (fields) {
      textarea = fields.textarea;
    }
    return (
      <Screen className="request-reaasign-main-container">
        <div>
          <div className="request-reaasign-question">
            <Question
              options={this.options}
              label={"Why do you want this complaint to be Re-Assined?"}
              handleChange={handleOptionsChange}
              valueSelected={valueSelected}
            />
          </div>
          <div className="request-reaasign-textArea">
            <TextArea onChange={handleCommentsChange} {...textarea} />
          </div>
        </div>

        <div className="col-lg-offset-2 col-md-offset-2 col-lg-8 col-md-8 request-reaasign-button">
          <Button
            id="requestreassign-submit-action"
            primary={true}
            {...submitprops}
            primary={true}
            fullWidth={true}
            onClick={handleComplaintSubmit}
          />
        </div>
      </Screen>
    );
  }
}
const mapStateToProps = (state) => {
  const formKey = "requestReassign";
  const form = state.form[formKey] || {};
  return { form, formKey };
};
const mapDispatchToProps = (dispatch) => {
  return {
    handleFieldChange: (formKey, fieldKey, value) => dispatch(handleFieldChange(formKey, fieldKey, value)),
    submitForm: (formKey) => dispatch(submitForm(formKey)),
    initForm: (form) => dispatch(initForm(form)),
    fileUpload: (formKey, fieldKey, file) => dispatch(fileUpload(formKey, fieldKey, file)),
    fetchComplaints: (criteria) => dispatch(fetchComplaints(criteria)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RequestReAssign);
