import React, { Component } from "react";
import { Card, Icon } from "../../../../components";
import Label from "../../../../components/Label";
import "./index.css";
import "../../../../styles/app.css";

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
                  <span className="col-xs-12 notification-content">Are there enough dustbins in your area?</span>
                </div>
                <br />
                <div>
                  <Label
                    style={{ display: "inline-block" }}
                    className="notification-content-label"
                    labelPosition="after"
                    label="YES"
                    icon={<Icon style={iconStyle} action="action" name="thumb-up"/>}
                  />
                  <Label
                    style={{ display: "inline-block" }}
                    className="notification-content-label"
                    labelPosition="after"
                    label="NO"
                    icon={<Icon style={iconStyle} action="action" name="thumb-down"/>}
                  />
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
