import React, { Component } from "react";
import { Card,Label } from "../../../../components";
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
  margin: "10%",
  height: "50px",
  width: "50px",
  borderRadius: "50%",
  padding: "12px",
  background: "#ffffff",
};

const StatusMessage = ({status,message}) => {
  switch (status) {
    case "ASSIGNED":
        return <Label label={message} />;
    default:
        return <div>
                  <Label labelStyle={{fontWeight: "bold",color:"#484848",fontStyle: "normal",fontStretch: "normal",lineHeight: "normal"}} label="THANK YOU"/> <Label label="for your Application!"/>
               </div>
  }
}

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
                <StatusMessage status={status} message={message}/>
              </div>
            </div>
          }
        />
      </div>
    );
  }
}

export default Status;
