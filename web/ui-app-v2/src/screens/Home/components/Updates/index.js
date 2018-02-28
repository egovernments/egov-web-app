import React, { Component } from "react";
import { Card, Icon } from "../../../../components";
import Label from "../../../../components/Label";
import ActionHome from "material-ui/svg-icons/action/home";
import Location from "material-ui/svg-icons/maps/place";
import "./index.css";
import "../../../../styles/app.css";
//import "./styles/bootstrap-customized.css";

class Updates extends Component {
  render() {
   

    return (
      <div>
        <Card
          textChildren={
            <div className="wrapper">
              {/* Left section*/}
              <div className="left update-icon">
                <Icon action="action" name="home" />
              </div>

              {/* right section*/}
              <div className="right">
                {/* Individual Rows; Row 1 */}
                <div>
                  <Label label="ROAD CLOSED" />
                  <p className="color-grey">
                    5th cross, 1st Block Kormangala is closed for maintanance till 23rd Feb.We apologize for the inconvinience.
                  </p>
                </div>

                {/* Individual Rows; Row 2 */}
                <div style={{ textAlign: "right" }}>
                  <Icon action="maps" name="place" color = "#767676"/>
                </div>
              </div>
              {/* End of right section */}
            </div>
          }
        />
      </div>
    );
  }
}

export default Updates;
