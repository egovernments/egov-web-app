import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "../../../components";
import ImageUpload from "../../common/ImageUpload";
import Screen from "../../common/Screen";
import Question from "../../common/ReOpenComplaint/components/Question";
import TextArea from "../../common/ReOpenComplaint/components/TextArea";
import Label from "utils/translationNode";
import { handleFieldChange, submitForm, initForm } from "redux/form/actions";
import { fileUpload } from "redux/form/actions";
import "./index.css";

class ReOpenComplaint extends Component {
  constructor(props) {
    super(props);
    this.formConfig = require("config/forms/reopenComplaint").default;
  }
  componentDidMount() {
    console.log(this.props);
    this.props.initForm(this.formConfig);
  }
  state = {
    valueSelected: "",
  };

  options = [
    { value: "No work was done", label: <Label label="CS_REOPEN_OPTION_ONE" /> },
    { value: "Only partial work was done ", label: <Label label="CS_REOPEN_OPTION_TWO" /> },
    { value: "Employee did not turn up", label: <Label label="CS_REOPEN_OPTION_THREE" /> },
    { value: "No permanent solution", label: <Label label="CS_REOPEN_OPTION_FOUR" /> },
  ];

  handleComplaintSubmit = () => {
    this.props.submitForm(this.props.formKey);
    this.props.history.push("/citizen/complaint-submitted");
  };
  handleCommentChange = (e) => {
    this.props.handleFieldChange(this.props.formKey, "reopencomments", e.target.value);
  };
  handleOptionsChange = (event, value) => {
    this.setState({ valueSelected: value });
    this.props.handleFieldChange(this.props.formKey, "question", value);
  };
  getAllImageUrls = (images) => {
    console.log(images);
    let val = [];
    val.push(images[0]);
    console.log(this.props);
    this.props.handleFieldChange(this.props.formKey, "media", val);
  };

  render() {
    const { handleComplaintSubmit, handleCommentChange, handleOptionsChange, getAllImageUrls } = this;
    const { valueSelected } = this.state;
    return (
      <Screen className="reopencomplaint-field">
        <div className="reopencomplaint-question">
          <Question options={this.options} label="CS_REOPEN_COMPLAINT_WHY" handleChange={handleOptionsChange} valueSelected={valueSelected} />
        </div>
        <div className="reopencomplaint-upload-photo">
          <ImageUpload getAllImageUrls={getAllImageUrls} />
        </div>
        <div className="reopencomplaint-textArea">
          <TextArea onChange={handleCommentChange} />
        </div>
        <div className="col-lg-offset-2 col-md-offset-2 col-lg-8 col-md-8 reopencomplaint-button">
          <Button id="reopencomplaint-submit-action" primary={true} label="SUBMIT" fullWidth={true} onClick={handleComplaintSubmit} />
        </div>
      </Screen>
    );
  }
}
const mapStateToProps = (state) => {
  const formKey = "reopenComplaint";
  console.log(state.form[formKey]);
  const form = state.form[formKey] || {};
  // form: state.form;
  console.log(form);
  return { form, formKey };
};
const mapDispatchToProps = (dispatch) => {
  return {
    handleFieldChange: (formKey, fieldKey, value) => dispatch(handleFieldChange(formKey, fieldKey, value)),
    submitForm: (formKey) => dispatch(submitForm(formKey)),
    initForm: (form) => dispatch(initForm(form)),
    fileUpload: (formKey, fieldKey, file) => dispatch(fileUpload(formKey, fieldKey, file)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReOpenComplaint);
