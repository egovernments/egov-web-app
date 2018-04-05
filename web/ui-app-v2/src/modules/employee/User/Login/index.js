import React, { Component } from "react";
import { connect } from "react-redux";
import Banner from "../../../common/Banner";
import LoginForm from "./components/LoginForm";
import { handleFieldChange, initForm, submitForm } from "redux/form/actions";

class Login extends Component {
  constructor(props) {
    super(props);
    this.formConfig = require("config/forms/employeeLogin").default;
  }

  componentDidMount() {
    this.props.initForm(this.formConfig);
  }

  handleForgotPasswdCLick = () => {
    this.props.history.push("/employee/user/forgot-password");
  };

  render() {
    const { form, handleFieldChange, submitForm } = this.props;
    const { name: formKey } = this.formConfig;
    const {handleForgotPasswdCLick} =this;

    return (
      <Banner className="col-lg-offset-2 col-md-offset-2 col-md-8 col-lg-8">
        <LoginForm form={form} submitForm={submitForm} formKey={formKey} onChange={handleFieldChange} onForgotPasswdCLick={handleForgotPasswdCLick}/>
      </Banner>
    );
  }
}

const mapStateToProps = (state) => {
  const formKey = "employeeLogin";
  const form = state.form[formKey] || {};
  return { form };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleFieldChange: (formKey, fieldKey, value) => dispatch(handleFieldChange(formKey, fieldKey, value)),
    submitForm: (formKey) => dispatch(submitForm(formKey)),
    initForm: (form) => dispatch(initForm(form)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
