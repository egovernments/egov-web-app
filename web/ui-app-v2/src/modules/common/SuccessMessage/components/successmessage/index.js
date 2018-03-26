import React, { Component } from "react";
import { Label, Icon } from "../../../../../components";
import FloatingActionButton from "material-ui/FloatingActionButton";
import "./index.css";

class SuccessMessage extends Component {
  render() {
    const { successmessage } = this.props;
    return (
      <div className="success-message-main-cont ">
        <div className="success-message-inner-cont">
          <div className="success-message-icon-cont">
            <FloatingActionButton className="floating-button" style={{ boxShadow: 0 }} backgroundColor={"#22b25f"}>
              <Icon action="navigation" name="check" />
            </FloatingActionButton>
          </div>
          <span className="thankyou-text">{successmessage}</span>
        </div>
      </div>
    );
  }
}

export default SuccessMessage;
