import React, { Component } from "react";
import { Button } from "../../../components";
import Screen from "../../common/Screen";
import SuccessMessage from "../../common/SuccessMessage/components/successmessage";
import "./index.css";
class ResolveSuccess extends Component {
  continueComplaintSubmit = () => {
    this.props.history.push("/citizen");
  };
  render() {
    return (
      <Screen>
        <SuccessMessage successmessage={"You have marked the complaint as Resolved successfully"} />
        <div className="resolvesuccess-button">
          <Button id="resolvesuccess-continue" primary={true} label="CONTINUE" fullWidth={true} onClick={this.continueComplaintSubmit} />
        </div>
      </Screen>
    );
  }
}

export default ResolveSuccess;
