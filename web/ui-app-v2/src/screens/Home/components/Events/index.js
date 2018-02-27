import React, { Component } from "react";
import {Card} from "../../../../components";
import ActionHome from "material-ui/svg-icons/action/home";
import Location from "material-ui/svg-icons/maps/place";
import Label from "../../../../components/Label";
import LocationIcon from "material-ui/svg-icons/maps/place";
import "./index.css";

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
          textChildren={
            <div className = "events wrapper">
              <div className = "left">
                <div className="date-range">
                  {this.state.dateRange}
                </div>
                <div className="month" style={{background:"#9b59b6"}}>
                  {this.state.month}
                </div>
              </div>
              <div className = "right">
                  <div>
                  {this.state.eventName}
                  </div>
                <div>
                  <LocationIcon/>
                  {this.state.location}
                </div>
                <div>
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
