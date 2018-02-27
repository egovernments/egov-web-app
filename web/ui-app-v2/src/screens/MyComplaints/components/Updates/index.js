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
        }}
        text={{
          style:{
             paddingTop:0,
             paddingBottom:0
          }
         }}

          textChildren={
         <div className = "row row-body">
          <div className = "col-xs-4 col-md-2 update-icon left-side" style = {{background : "#e74c3c"}}>
            <ActionHome color = "#ffffff" style = {{padding : "50px 35px 50px 35px"}}/>
          </div>
          <div className = "col-xs-8 col-md-10" style = {{padding : "30px"}}>
            <div className = "row">
              <p>ROAD CLOSED </p>
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
