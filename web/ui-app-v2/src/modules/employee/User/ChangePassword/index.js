import React, { Component } from "react";
import { connect } from "react-redux";
import Screen from "modules/common/common/Screen";
import PasswordForm from "./components/PasswordForm";
import { handleFieldChange, initForm, submitForm } from "redux/form/actions";
import { toggleSnackbarAndSetText } from "redux/app/actions";

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.formConfig = require("config/forms/employeeChangePassword").default;
  }

  componentDidMount() {
    this.props.initForm(this.formConfig);
  }

  submitChangePasswdForm = (formKey) => {
    const { form, submitForm, toggleSnackbarAndSetText } = this.props;
    const { newpassword, confirmnewpassword } = form && form.fields;
    if (newpassword.value === confirmnewpassword.value) {
      submitForm(formKey);
    } else {
      toggleSnackbarAndSetText(true, "Password do not match", true);
    }
  };

  render() {
    const { form, handleFieldChange, loading } = this.props;
    const { name: formKey } = this.formConfig;

    return (
      <Screen loading={loading} className="employee-change-passwd-screen">
        <div className="row">
          <PasswordForm form={form} submitChangePasswdForm={this.submitChangePasswdForm} formKey={formKey} onChange={handleFieldChange} />
        </div>
      </Screen>
    );
  }
}

const mapStateToProps = (state) => {
  const formKey = "employeeChangePassword";
  const form = state.form[formKey] || {};
  const { loading } = form || false;
  return { form, loading };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleFieldChange: (formKey, fieldKey, value) => dispatch(handleFieldChange(formKey, fieldKey, value)),
    submitForm: (formKey) => dispatch(submitForm(formKey)),
    initForm: (form) => dispatch(initForm(form)),
    toggleSnackbarAndSetText: (open, message, error) => dispatch(toggleSnackbarAndSetText(open, message, error)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
