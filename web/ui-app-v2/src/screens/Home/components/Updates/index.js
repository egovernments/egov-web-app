import React, { Component } from "react";
import Card from "../../../../components/Card";
import Label from "../../../../components/Label";
import ActionHome from "material-ui/svg-icons/action/home";
import Location from "material-ui/svg-icons/maps/place";
import "./index.css"

class Updates extends Component {
  render() {
    return <div>

      <Card 
        textChildren={
         <div className = "wrapper">
          {/* Left section*/}
          <div className = "left" style = {{background : "#e74c3c"}}>
            <ActionHome color = "#ffffff"/>
          </div>
          
          {/* right section*/}
          <div className = "right">
            
            {/* Individual Rows; Row 1 */}
            <div>
              <Label label="ROAD CLOSED" />
              <p color = "#767676">5th cross, 1st Block Kormangala is closed for maintanance till 23rd Feb.We apologize for the inconvinience.
              </p>
            </div>

            {/* Individual Rows; Row 2 */}
            <div style = {{ textAlign : 'right' }} >
              <Location color = "#767676"/>
            </div>

          </div>
          {/* End of right section */}

        </div>

        }>


        </Card>
    </div>;
  }
}

export default Updates;
