import React, { Component } from "react";
import {Card} from "../../../../components";
import Info from "material-ui/svg-icons/action/info";
import "./index.css";

const iconStyle = {
  margin:"10%",
  // marginRight: 24,
  height: "50px",
  width: "50px",
  // textAlign:"center"
};

const StatusIcon=({status})=> {
  switch (status) {
    case "PROCESS":
      return <Info style={iconStyle} color={"#ffffff"} />
    default:
      return <Info style={iconStyle} color={"#ffffff"} />

  }
}


class Status extends Component {

  render() {
    let {status,bgColor,message}=this.props;
    return (
      <div className="status">
      <Card
        card={{
          style:{
            backgroundColor:"#ffffff"
          }
        }}
        textChildren={
          <div className="wrapper">
            <div className="left" style={{backgroundColor:bgColor}}>
                  <StatusIcon status={status}/>
            </div>
            <div className="right" style={{textAlign:"center"}}>
                  {message}
            </div>
          </div>
        }
      />
    </div>);
  }
}

export default Status;
