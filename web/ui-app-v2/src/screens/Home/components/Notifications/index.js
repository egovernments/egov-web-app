import React, { Component } from "react";
import Card from "../../../../components/Card";
import Label from "../../../../components/Label";
import ThumbDown from "material-ui/svg-icons/action/thumb-down";
import ThumbUp from "material-ui/svg-icons/action/thumb-up";
import ActionHome from "material-ui/svg-icons/action/home";
import "./index.css";
import "../../../../styles/app.css";

class Notification extends Component {
  render() {
    const iconStyle = {
      marginRight: 24,
      height: "24px",
      width: "24px",
      fill: "#F5A623",
    };

    return (
      <div>
        <Card
          textChildren={
            <div className="wrapper">
              <div className="left color-lime">
                <ActionHome className="color-white" />
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
                    icon={<ThumbUp style={iconStyle} />}
                  />
                  <Label
                    style={{ display: "inline-block" }}
                    className="notification-content-label"
                    labelPosition="after"
                    label="NO"
                    icon={<ThumbDown style={iconStyle} />}
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
