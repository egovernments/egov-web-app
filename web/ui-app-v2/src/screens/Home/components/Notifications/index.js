import React, { Component } from "react";
import { Card, Icon, Label } from "../../../../components";
import "./index.css";

class Notification extends Component {
  render() {
    const iconStyle = {
      marginRight: 24,
      height: "24px",
      width: "24px",
      fill: "#F5A623",
      borderRadius: "0%",
      padding: "0px",
    };

    return (
      <div>
        <Card
          textChildren={
            <div className="wrapper">
              <div className="left color-lime">
                <Icon action="action" name="home" />
              </div>
              <div className="right">
                <div>
                  <Label label="Are there enough dustbins in your area?" className="notification-content" />
                </div>
                <br />
                <div>
                  <Label className="notification-content-label" label="YES" icon={<Icon style={iconStyle} action="action" name="thumb-up" />} />
                  <Label className="notification-content-label" label="NO" icon={<Icon style={iconStyle} action="action" name="thumb-down" />} />
                </div>
              </div>
            </div>
          }
        />
      </div>
    );
  }
}

export default Notification;
