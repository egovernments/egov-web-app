import React, { Component } from "react";
import { Card, Label } from "../../../../components";
import Info from "material-ui/svg-icons/action/info";
import Check from "material-ui/svg-icons/navigation/check";
import "./index.css";

const iconStyle = {
  margin: "10%",
  // marginRight: 24,
  height: "50px",
  width: "50px",

  // textAlign:"center"
};
const checkStyle = {
  margin: "16px",
  height: "50px",
  width: "50px",
  borderRadius: "50%",
  padding: "10.4px",
  background: "#ffffff",
};

const StatusMessage = ({ status, message }) => {
  switch (status) {
    case "ASSIGNED":
      return (
        <Label
          containerStyle={{ textAlign: "left" }}
          children={
            <div>
              Your application has been <span className="dark-color">ASSIGNED</span> to <span className="dark-color">{message}</span>
            </div>
          }
        />
      );
    default:
      return (
        <div style={{textAlign:"left"}}>
          <Label
          >
            Your application has been <span style={{ color: "#484848"}}>REJECTED</span>
          </Label>
        </div>
      );
  }
};

const StatusIcon = ({ status }) => {
  switch (status) {
    case "PROGRESS":
      return <Info style={iconStyle} color={"#ffffff"} />;
    case "COMPLETED":
      return <Check style={checkStyle} color={"#7ed321"} />;
    default:
      return <Info style={iconStyle} color={"#ffffff"} />;
  }
};

class Status extends Component {
  render() {
    let { status, bgColor, message } = this.props;
    return (
      <div className="status">
        <Card
          textChildren={
            <div className="wrapper">
              <div className="left" style={{ backgroundColor: bgColor }}>
                <StatusIcon status={status} />
              </div>
              <div className="right" style={{ textAlign: "center" }}>
                <StatusMessage status={status} message={message} />
              </div>
            </div>
          }
        />
      </div>
    );
  }
}

export default Status;
