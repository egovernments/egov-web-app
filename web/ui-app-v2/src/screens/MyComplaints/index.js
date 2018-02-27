import React, { Component } from "react";
import Complaints from "./components/Complaints";


import FontIcon from "material-ui/FontIcon";
import IconLocationOn from "material-ui/svg-icons/communication/location-on";
import "./index.css";



class MyComplaints extends Component {
  state= {
    comaplaints:[
      {
        
      }
    ]
  }
  render() {
    let { complaints} = this.state;
    return (
      <div>
        <Complaints complaints={complaints}/>
      </div>
    );
  }
}

export default MyComplaints;
