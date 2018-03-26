import React, { Component } from "react";
import { Label, Icon } from "../../../../../components";
import FloatingActionButton from "material-ui/FloatingActionButton";
import "./index.css";

class SuccessMessage extends Component {
  render() {
    const { successmessage } = this.props;
    return (
      <div className="success-message-container">
        <FloatingActionButton backgroundColor="#22b25f" style={{ marginBottom: "24px" }}>
          <Icon name={"check"} action={"navigation"} />
        </FloatingActionButton>
        <div className="success-message">
          <Label label={successmessage} fontSize="14px" labelStyle={{ paddingLeft: "8px" }} />
        </div>
      </div>
    );
  }
}

export default SuccessMessage;
