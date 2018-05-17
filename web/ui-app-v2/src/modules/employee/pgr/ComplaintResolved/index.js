import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "components";
import ImageUpload from "modules/common/common-components/ImageUpload";
import TextArea from "modules/common/pgr/ReOpenComplaint/components/TextArea";
import Screen from "modules/common/Screen";
import { handleFieldChange, submitForm, initForm } from "redux/form/actions";
import { fetchComplaints } from "redux/complaints/actions";
import { fileUpload } from "redux/form/actions";
import "./index.css";

class ComplaintResolved extends Component {
  constructor(props) {
    super(props);
    this.formConfig = require("config/forms/complaintResolved").default;
  }
  componentDidMount() {
    let { fetchComplaints, match } = this.props;
    fetchComplaints([{ key: "serviceRequestId", value: match.params.serviceRequestId }]);
    this.props.initForm(this.formConfig);
  }
  handleComplaintSubmit = () => {
    const { formKey, submitForm } = this.props;
    submitForm(formKey);
  };
  handleCommentChange = (e, value) => {
    this.props.handleFieldChange(this.props.formKey, "textarea", value);
  };

  render() {
    const { handleComplaintSubmit, handleCommentChange } = this;
    const { formKey, form, loading } = this.props;

    const { fields, submit } = form;
    const submitprops = submit;
    let textarea;
    if (fields) {
      textarea = fields.textarea;
    }

    return (
      <Screen className="complaint-resolved-main-container" loading={loading}>
        <div>
          <ImageUpload module="rainmaker-pgr" formKey={formKey} fieldKey="media" />
          <div style={{ padding: "24px 16px 350px 1px" }}>
            <TextArea onChange={handleCommentChange} {...textarea} />
          </div>
        </div>

        <div className="col-lg-offset-2 col-md-offset-2 col-lg-8 col-md-8 complaint-resolved-button-cont">
          <Button id={"complaint-resolved-mark-resolved"} {...submitprops} primary={true} fullWidth={true} onClick={handleComplaintSubmit} />
        </div>
      </Screen>
    );
  }
}
const mapStateToProps = (state) => {
  const formKey = "complaintResolved";
  const form = state.form[formKey] || {};
  const { loading } = form || false;
  return { form, formKey, loading };
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

export default connect(mapStateToProps, mapDispatchToProps)(ComplaintResolved);
