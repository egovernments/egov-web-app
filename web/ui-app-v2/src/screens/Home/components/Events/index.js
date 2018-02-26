import React, { Component } from "react";
import {Card} from "../../../../components";
import ActionHome from "material-ui/svg-icons/action/home";
import Location from "material-ui/svg-icons/maps/place";
import Label from "../../../../components/Label";
import LocationIcon from "material-ui/svg-icons/maps/place";


class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dateRange: "16 - 27",
      month: "March",
      eventName:"Amrita Shergill Retrospective",
      location:"City Museum",
      timing:"9 AM to 5 AM"
    }
  }
  render() {
    return (
      <div className="home-page-content-card-margin" >
        <Card
          card={{
            style:{
              backgroundColor:"#ffffff",
            }
          }}
          text={{
          style:{
             paddingTop:0
          }
         }}
          textChildren={
            <div className = "row">
              <div className = "col-xs-3" style = {{background : "#8e44ad"}}>
                <div style={{height : "40px", color: "#ffffff"}}>
                  {this.state.dateRange}
                </div>
                <div style={{height : "40px", color: "#ffffff", backgroundColor:"#9b59b6"}}>
                  {this.state.month}
                </div>
              </div>
              <div className = "col-xs-9">
                  <div style={{marginBottom : "10px"}}>
                  {this.state.eventName}
                  </div>
                <div style={{marginBottom : "10px"}}>
                  <LocationIcon/>
                  {this.state.location}
                </div>
                <div style={{marginBottom : "10px"}}>
                  {this.state.timing}
                </div>
              </div>
            </div>
          }
        />
      </div>
    )
  }
}

export default Events;
