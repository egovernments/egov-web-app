import React, { Component } from "react";
import { connect } from "react-redux";
import Banner from "../../../common/Banner";
import LoginForm from "./components/LoginForm";
import { handleFieldChange, initForm } from "../../../../redux/form/actions";

class Login extends Component {
  formKey = "login";
  formConfig = {
    phone: {
      id: "person-phone",
      required: true,
      floatingLabelText: "Phone Number",
      hintText: "Enter Your Phone Number",
      pattern: "^([0-9])+$",
      errorMessage: "Please enter a valid phone number",
      value: "",
    },
  };

  login = () => {
    this.props.history.push("/citizen");
  };

  componentDidMount() {
    this.props.initForm(this.formKey, this.formConfig);
  }

  render() {
    const { login, formKey } = this;
    const { form, handleFieldChange } = this.props;

    return (
      <Banner className="col-lg-offset-2 col-md-offset-2 col-md-8 col-lg-8">
        <LoginForm login={login} form={form} formKey={formKey} onChange={handleFieldChange} />
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
    initForm: (formKey, form) => dispatch(initForm(formKey, form)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
