import React, { Component } from "react";
import { Button } from "../../../components";
import Screen from "../../common/Screen";
import Label from "utils/translationNode";
import SuccessMessage from "../../common/SuccessMessage/components/successmessage";
import "./index.css";

const statusContainerStyle = {
  display: "inline-block",
};

const nameContainerStyle = {
  display: "inline-block",
  marginLeft: "3px",
};

class ResolveSuccess extends Component {
  continueComplaintSubmit = () => {
    this.props.history.push("/employee/all-complaints");
  };
  render() {
    return (
      <div className="resolve-success-main-screen">
        <SuccessMessage
          successmessage="You have marked the complaint as"
          secondaryLabel="Resolved"
          tertiaryLabel="successfully"
          containerStyle={{ display: "inline-block" }}
        />
        <div className="resolve-success-continue">
          <Button id="resolve-success-continue" primary={true} label="CONTINUE" fullWidth={true} onClick={this.continueComplaintSubmit} />
        </div>
      </div>
    );
  }
}

export default ResolveSuccess;
