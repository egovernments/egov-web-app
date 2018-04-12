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
          style={{ width: "45%", height: "38px" }}
          id="actionOne"
          backgroundColor="#969696"
          labelColor="#ffffff"
        />
        <Button
          label={btnTwoLabel}
          onClick={btnTwoOnClick}
          style={{ width: "45%", height: "38px", boxShadow: "none" }}
          id="actionTwo"
          backgroundColor="#00bbd3"
          labelColor="#ffffff"
        />
      </div>
    );
  }
}

export default ActionButton;
