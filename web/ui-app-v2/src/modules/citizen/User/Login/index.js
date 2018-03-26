import React, { Component } from "react";
import { connect } from "react-redux";
import Banner from "../../../common/Banner";
import LoginForm from "./components/LoginForm";
import { handleFieldChange, initForm, submitForm } from "../../../../redux/form/actions";

class Login extends Component {
  formConfig = {
    name: "login",
    fields: {
      phone: {
        id: "person-phone",
        jsonPath: "login.username",
        required: true,
        floatingLabelText: "Phone Number",
        hintText: "Enter Your Phone Number",
        pattern: "^([0-9])+$",
        errorMessage: "Please enter a valid phone number",
        value: "",
      },
    },
    saveUrl: "/user/oauth/token",
    navigation: "/citizen/user/otp",
    action: "token",
  };
  constructor(props) {
    super(props);
    this.formConfig = require("../../../../config/forms/login").default;
  }

  componentDidMount() {
    this.props.initForm(this.formConfig);
  }

  render() {
    const { form, handleFieldChange, submitForm } = this.props;
    const { name: formKey } = this.formConfig;

    return (
      <Banner className="col-lg-offset-2 col-md-offset-2 col-md-8 col-lg-8">
        <LoginForm form={form} submitForm={submitForm} formKey={formKey} onChange={handleFieldChange} />
      </Banner>
    );
  }
}

const mapStateToProps = (state) => {
  const formKey = "login";
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
