import React, { Component } from "react";
import formHoc from "egov-ui-kit/hocs/form";
import LoginForm from "./components/LoginForm";
import { Banner } from "modules/common";
import { Screen } from "modules/common";

const LoginFormHOC = formHoc({ formKey: "login" })(LoginForm);

class Login extends Component {
  render() {
    return (
      <Banner>
        <LoginFormHOC />
      </Banner>
    );
  }
}

export default Login;
