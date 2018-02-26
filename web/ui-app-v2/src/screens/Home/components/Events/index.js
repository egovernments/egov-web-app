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
          textChildren={
            <div className = "row">
              <div className = "col-xs-3" style = {{background : "#8e44ad"}}>
                <Label label={this.state.dateRange} style={{color: "#ffffff"}}/>
                <Label label={this.state.month} style={{color: "#ffffff", backgroundColor:"#9b59b6"}}/>
              </div>
              <div className = "col-xs-9">
                <Label label={this.state.eventName}/>
                <Label label={this.state.location} labelPosition="after" icon={<LocationIcon/>}/>
                <Label label={this.state.timing}  />
              </div>
            </div>
          }
        />
      </div>
    )
  }
}

export default Events;
