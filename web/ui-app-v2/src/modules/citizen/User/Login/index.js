import React, { Component } from "react";
import { connect } from "react-redux";
import LoginForm from "./components/LoginForm";
import Banner from "modules/common/Banner";
import Screen from "modules/common/Screen";
import { handleFieldChange, initForm, submitForm } from "redux/form/actions";

class Login extends Component {
  constructor(props) {
    super(props);
    this.formConfig = require("config/forms/login").default;
  }

  componentDidMount() {
    this.props.initForm(this.formConfig);
  }

  submitForm = (formKey) => {
    try {
      if (typeof androidAppProxy !== "undefined") {
        window.androidAppProxy.requestSMS();
      }
    } catch (error) {}

    this.props.submitForm(formKey);
  };

  render() {
    const { form, handleFieldChange, loading } = this.props;
    const { submitForm, formConfig } = this;
    const { name: formKey } = formConfig;

    return (
      <Screen loading={loading}>
        <Banner className="col-lg-offset-2 col-md-offset-2 col-md-8 col-lg-8">
          <LoginForm form={form} submitForm={submitForm} formKey={formKey} onChange={handleFieldChange} />
        </Banner>
      </Screen>
    );
  }
}

const mapStateToProps = (state) => {
  const formKey = "login";
  const form = state.form[formKey] || {};
  const { loading } = state.form || false;
  return { form, loading };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleFieldChange: (formKey, fieldKey, value) => dispatch(handleFieldChange(formKey, fieldKey, value)),
    submitForm: (formKey) => dispatch(submitForm(formKey)),
    initForm: (form) => dispatch(initForm(form)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
