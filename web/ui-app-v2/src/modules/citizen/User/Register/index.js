import React, { Component } from "react";
import { connect } from "react-redux";
import Banner from "../../../common/Banner";
import RegisterForm from "../../../common/User/components/RegisterForm";
import { handleFieldChange, initForm } from "../../../../redux/actions/form";

class Register extends Component {
  state = {
    name: "",
    phoneNumber: "",
  };

  formKey = "register";
  formConfig = {
    name: {
      id: "person-name",
      required: true,
      floatingLabelText: "Name",
      hintText: "Enter Your Name",
      pattern: "^([A-z])+$",
      errorMessage: "Please enter a valid name",
    },
    city: {
      id: "person-city",
      required: true,
      floatingLabelText: "City",
      hintText: "Enter Your City",
    },
    phone: {
      id: "person-phone",
      required: true,
      floatingLabelText: "Phone Number",
      hintText: "Enter Your Phone Number",
      pattern: "^([0-9])+$",
      errorMessage: "Please enter a valid phone number",
    },
  };

  componentDidMount() {
    this.props.initForm(this.formKey, this.formConfig);
  }

  register = () => {
    this.props.history.push("/citizen/user/otp");
  };

  navigateToLogin = () => {
    this.props.history.push("/citizen/user/login");
  };

  onChange = (fieldKey, fieldValue, value) => {
    this.props.handleFieldChange(fieldKey, fieldValue, value);
  };

  render() {
    const { register, formConfig, formKey, onChange, navigateToLogin } = this;
    const { form } = this.props;

    return (
      <Banner className="col-lg-offset-2 col-md-offset-2 col-md-8 col-lg-8">
        <RegisterForm
          form={form}
          formKey={formKey}
          formConfig={formConfig}
          onChange={onChange}
          register={register}
          navigateToLogin={navigateToLogin}
        />
      </Banner>
    );
  }
}

const mapStateToProps = (state) => {
  const formKey = "register";
  const form = state.form[formKey] || {};
  return { form };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleFieldChange: (formKey, fieldKey, value) => dispatch(handleFieldChange(formKey, fieldKey, value)),
    initForm: (formKey, form) => dispatch(initForm(formKey, form)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
