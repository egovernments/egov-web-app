import React, { Component } from "react";
import Complaints from "./components/Complaints";

import FontIcon from "material-ui/FontIcon";
import IconLocationOn from "material-ui/svg-icons/communication/location-on";
import "./index.css";



class MyComplaints extends Component {
  state = {
    complaints:[
      {
        header: "Potholes",
        address: "#18/2A, Ambalipura village, Bellandur Gate",
        status: "OPEN",
        images:[
          {
            source: "https://placeimg.com/100/100/tech"
          },
          {
            source: "https://placeimg.com/100/100/tech"
          },
          {
            source: "https://placeimg.com/100/100/tech"
          },
        ]
      },
      {
        header: "Garbage",
        address: "#18/2A, Ambalipura village, Bellandur Gate",
        status: "OPEN",
        images:[
          {
            source: "https://placeimg.com/100/100/tech"
          },
          {
            source: "https://placeimg.com/100/100/tech"
          },
          {
            source: "https://placeimg.com/100/100/tech"
          },
        ]
      },
      {
        header: "Potholes",
        address: "#18/2A, Ambalipura village, Bellandur Gate",
        status: "OPEN",
        images:[
          {
            source: "https://placeimg.com/100/100/tech"
          },
          {
            source: "https://placeimg.com/100/100/tech"
          },
          {
            source: "https://placeimg.com/100/100/tech"
          },
        ]
      },
    ]
  }
  render() {
    let { complaints } = this.state;
    console.log(complaints);
    return (
      <div>
        <Complaints complaints={complaints}/>
      </div>
    );
  }
}

export default MyComplaints;
