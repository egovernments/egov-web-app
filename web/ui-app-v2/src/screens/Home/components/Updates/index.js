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
                <Icon action="alert" name="add-alert" />
              </div>

              {/* right section*/}
              <div style={{ paddingRight: "0px" }} className="right">
                {/* Individual Rows; Row 1 */}
                <div>
                  <Label color="#484848" bold={true} label="ROAD & FOOTPATH DAMAGE" />
                  <Label label="RAJAJI NAGAR" />
                  <div style={{ marginTop: "10px" }}>
                    <Label containerStyle={{ display: "inline-block" }} label="Your complaint has been " />
                    <Label containerStyle={{ display: "inline-block", marginLeft: "4px" }} color="#484848" label=" RESOLVED." />
                    <Label label="Please give us your feedback." />
                  </div>
                </div>
                {/* card footer */}
                <div style={{ marginTop: "10px", textAlign: "right" }}>
                  <Label color="#f5a623" containerStyle={{ display: "inline-block" }} label="TRACK" />
                  <Label color="#f5a623" containerStyle={{ display: "inline-block", marginLeft: "10px" }} label="FEEDBACK" />
                </div>
              </div>
              {/* End of right section */}
            </div>
          }
        />

        <Card
          textChildren={
            <div id="home-updates" className="wrapper">
              {/* Left section*/}
              <div className="left update-icon">
                <Icon action="alert" name="add-alert" />
              </div>

              {/* right section*/}
              <div style={{ paddingRight: "0px" }} className="right">
                {/* Individual Rows; Row 1 */}
                <div>
                  <Label color="#484848" bold={true} label="STREETLIGHT REPAIR" />
                  <Label label="JAKKASANDRA" />
                  <div style={{ marginTop: "10px" }}>
                    <Label containerStyle={{ display: "inline-block" }} label="Your complaint has been" />
                    <Label containerStyle={{ display: "inline-block", marginLeft: "4px" }} color="#484848" label="ASSIGNED." />
                  </div>
                </div>
                {/* card footer */}
                <div style={{ marginTop: "10px", textAlign: "right" }}>
                  <Label color="#f5a623" containerStyle={{ display: "inline-block" }} label="TRACK" />
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
