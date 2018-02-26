import React, { Component } from "react";
import Card from "../../../../components/Card";
import Label from "../../../../components/Label";
import ActionHome from "material-ui/svg-icons/action/home";
import Location from "material-ui/svg-icons/maps/place";
import "./index.css"
//import "./styles/bootstrap-customized.css";

class Updates extends Component {
  render() {
    return <div>
      <Card card={{
          style:{
            backgroundColor:"#ffffff", 
          }
        }} textChildren={
         <div className = "row">
          <div className = "col-xs-2 update-icon" style = {{background : "#e74c3c"}}>
            <ActionHome color = "#ffffff"/>
          </div>
          <div className = "col-xs-10">
            <div className = "row" padding = "20px"> 
              <Label label="ROAD CLOSED" />
              <p  color = "#767676">5th cross, 1st Block Kormangala is closed for maintanance till 23rd Feb.We apologize for the inconvinience.
              </p >
            </div>
            <div className = "row "  style = {{ textAlign : 'right' }} >
              <Location color = "#767676"/>
            </div>
          </div>
        </div>
         
        }>
        
         
        </Card>
    </div>;
  }
}

export default Updates;
