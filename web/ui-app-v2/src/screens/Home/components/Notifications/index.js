import React, { Component } from "react";
import Card from "../../../../components/Card";
import Label from "../../../../components/Label";
import ThumbDown from "material-ui/svg-icons/action/thumb-down";
import ThumbUp from "material-ui/svg-icons/action/thumb-up";
import ActionHome from "material-ui/svg-icons/action/home";
import "./index.css";

class Notification extends Component {
  render() {
    const iconStyle = {
      marginRight: 24,
      height: "24px",
      width: "24px"
          };

    return (
      <div style={{paddingTop:'20px'}}>
        <Card
        card={{
          style:{
            backgroundColor:"#ffffff",
            paddingBottom:0
            }
        }}
        text={{
          style:{
             padding:0,
          }
        }}
        textChildren={
        <div className="wrapper">
        <div className="left" style={{background:'#73b332'}}>
        <ActionHome/>
        </div>
        <div className="right">
        <div>
        <span className="col-xs-12 notification-content" >
        Are there enough dustbins in your area?
        </span>
        </div>
        <br/>
        <div>
        <Label style={{display : "inline-block"}} className="notification-content-label" labelPosition="after" label="YES"  icon={<ThumbUp style={iconStyle} color={"#f5a623"}/>}  />
        <Label style={{display : "inline-block"}} className="notification-content-label" labelPosition="after" label="NO" icon={<ThumbDown style={iconStyle} color={"#f5a623"}/>}  />
        </div>
        </div>
        </div>
        }
        >
      </Card>
      </div>

  );
  }
}

export default Notification;
