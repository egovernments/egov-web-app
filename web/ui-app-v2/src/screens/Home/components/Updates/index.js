import React, { Component } from "react";
import { Card, Icon, Label } from "../../../../components";
import "./index.css";

class Updates extends Component {
  render() {
    return (
      <div>
        <Card
          textChildren={
            <div id="home-updates" className="wrapper">
              {/* Left section*/}
              <div className="left update-icon">
                <Icon action="action" name="home" />
              </div>

              {/* right section*/}
              <div style={{ paddingRight: "0px" }} className="right">
                {/* Individual Rows; Row 1 */}
                <div>
                  <Label color="black" bold={true} label="ROAD CLOSED" />
                  <Label
                    containerStyle={{ marginTop: "10px" }}
                    label="5th cross, 1st Block Kormangala is closed for maintanance till 23rd Feb.We apologize for the inconvinience."
                  />
                </div>

                {/* Individual Rows; Row 2 */}
                <div style={{ textAlign: "right" }}>
                  <Icon style={{ paddingRight: "0px" }} action="maps" name="place" color="#767676" />
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
