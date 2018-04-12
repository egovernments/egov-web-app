import React, { Component } from "react";
import { Button } from "../../../../../components";
import "./index.css";

class ActionButton extends Component {
  render() {
    let { btnOneLabel, btnOneOnClick, btnTwoLabel, btnTwoOnClick } = this.props;
    return (
      <div className="compalint-details-action-buttons">
        <Button
          label={btnOneLabel}
          onClick={btnOneOnClick}
          style={{ width: "45%", height: "38px", boxShadow: "none" }}
          id="actionOne"
          backgroundColor="#767676"
          labelColor="#ffffff"
          labelStyle={{ padding: 0 }}
          overlayStyle={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        />
        <Button
          label={btnTwoLabel}
          onClick={btnTwoOnClick}
          style={{ width: "45%", height: "38px", boxShadow: "none" }}
          id="actionTwo"
          labelStyle={{ padding: 0 }}
          overlayStyle={{ display: "flex", alignItems: "center", justifyContent: "center" }}
          backgroundColor="#00bbd3"
          labelColor="#ffffff"
        />
      </div>
    );
  }
}

export default ActionButton;
