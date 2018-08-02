import React, { Component } from "react";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import axios from "axios";
import * as apiEndpoints from "../constants/ApiEndpoints";
import { AppBar } from "material-ui";
import { connect } from "react-redux";
import { loginUser, userLoginSuccess } from "./actions";
import { Redirect } from "react-router-dom";

class UserLogin extends Component {
  handleClick() {
    let { history } = this.props;
    if (this.state) {
      const username = this.state.username;
      const password = this.state.password;
      const usertype = "EMPLOYEE";
      this.props.loginUser(username, password, usertype, history);

      history.push("/file-uploader");
    }
  }

  render() {
    let { authenticated } = this.props;
    if (authenticated) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <center>
          <AppBar showMenuIconButton={false} title="Employee Uploader" />
          <TextField
            type="username"
            floatingLabelText="Username"
            onChange={(event, newValue) =>
              this.setState({ username: newValue })
            }
          />
          <br />
          <TextField
            type="password"
            floatingLabelText="Password"
            onChange={(event, newValue) =>
              this.setState({ password: newValue })
            }
          />
          <br />
          <RaisedButton
            label="Submit"
            primary={true}
            onClick={event => this.handleClick()}
          />
        </center>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authenticated: state.auth.authenticated,
  userInfo: state.auth.userInfo
});

const mapDispatchToProps = dispatch => ({
  loginUser: (username, password, usertype, history) =>
    dispatch(loginUser(username, password, usertype, history)),
  userLoginSuccess: () => dispatch(userLoginSuccess())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserLogin);
