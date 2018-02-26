import React, { Component } from "react";
import Card from "../../../../components/Card";
import Label from "../../../../components/Label";
import ThumbDown from "material-ui/svg-icons/action/thumb-down";
import ThumbUp from "material-ui/svg-icons/action/thumb-up";
import ActionHome from "material-ui/svg-icons/action/home";

class Notification extends Component {
  render() {
    const iconStyle = {
      marginRight: 24,
      height: "24px",
      width: "24px"
          };
    return (
      <div style={{'padding-top':'10px'}}>
        <Card
        card={{
          style:{
            backgroundColor:"#ffffff",
            }
        }}
        textChildren={
        <div className="row">
        <div className="col-xs-2" style={{background:'#73b332'}}>
        <ActionHome/>
        </div>
        <div className="col-xs-10">
        <div className="row">
        <span className="col-xs-12">
        Are there enough dustbins in your area?
        </span>
        </div>
        <div className="row">
        <Label labelPosition="after" label="YES"  icon={<ThumbUp style={iconStyle} color={"#f5a623"}/>} />
        <Label labelPosition="after" label="NO" icon={<ThumbDown style={iconStyle} color={"#f5a623"}/>} />
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
