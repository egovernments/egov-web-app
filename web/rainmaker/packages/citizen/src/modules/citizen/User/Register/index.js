import React, { Component } from "react";
import formHoc from "egov-ui-kit/hocs/form";
import RegisterForm from "./components/RegisterForm";
import { Banner } from "modules/common";

const RegisterFormHOC = formHoc({ formKey: "register" })(RegisterForm);

class Register extends Component {
  render() {
    return (
      <Banner>
        <RegisterFormHOC />
      </Banner>
    );
  }
}

export default Register;
