import React, { Component } from "react";
import { Card, Icon, Label } from "../../../../components";
import "./index.css";

// currently the card is hardcoded, ideally should be driven by data
class Updates extends Component {
  updates = [
    {
      title: "Road & Footpath Damage",
      place: "Rajaji Nagar",
      status: "resolved",
    },
    {
      title: "Streetlight Repair",
      place: "Jakkasandra",
      status: "assigned",
    },
  ];

  renderUpdate = update => {
    const { title, place, status } = update;
    return (
      <Card
        textChildren={
          <div className="wrapper">
            {/* Left section*/}
            <div className="left update-icon">
              <Icon action="alert" name="add-alert" />
            </div>

            {/* right section*/}
            <div style={{ paddingRight: "0px" }} className="right">
              {/* Individual Rows; Row 1 */}
              <div>
                <Label color="#484848" bold={true} label={title} />
                <Label label={title} />
                <div style={{ marginTop: "10px" }}>
                  <Label containerStyle={{ display: "inline-block" }} label="Your complaint has been " />
                  <Label containerStyle={{ display: "inline-block", marginLeft: "4px", textTransform:"uppercase" }} color="#484848" label={status} />
                  {status === "resolved" ? <Label label="Please give us your feedback." /> : ""}
                </div>
              </div>
              {/* card footer */}
              <div style={{ marginTop: "10px", textAlign: "right" }}>
                <Label bold={true} color="#f5a623" containerStyle={{ display: "inline-block" }} label="TRACK" />
                <Label bold={true} color="#f5a623" containerStyle={{ display: "inline-block", marginLeft: "10px" }} label="FEEDBACK" />
              </div>
            </div>
            {/* End of right section */}
          </div>
        }
      />
    );
  };

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
                  <Label color="#484848" bold={true} label="Road & Footpath Damage" />
                  <Label label="Rajaji Nagar" />
                  <div style={{ marginTop: "10px" }}>
                    <Label containerStyle={{ display: "inline-block" }} label="Your complaint has been " />
                    <Label containerStyle={{ display: "inline-block", marginLeft: "4px" }} color="#484848" label=" RESOLVED." />
                    <Label label="Please give us your feedback." />
                  </div>
                </div>
                {/* card footer */}
                <div style={{ marginTop: "10px", textAlign: "right" }}>
                  <Label bold={true} color="#f5a623" containerStyle={{ display: "inline-block" }} label="TRACK" />
                  <Label bold={true} color="#f5a623" containerStyle={{ display: "inline-block", marginLeft: "10px" }} label="FEEDBACK" />
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
                  <Label color="#484848" bold={true} label="Streetlight Repair" />
                  <Label label="Jakkasandra" />
                  <div style={{ marginTop: "10px" }}>
                    <Label containerStyle={{ display: "inline-block" }} label="Your complaint has been" />
                    <Label containerStyle={{ display: "inline-block", marginLeft: "4px" }} color="#484848" label="ASSIGNED." />
                  </div>
                </div>
                {/* card footer */}
                <div style={{ marginTop: "10px", textAlign: "right" }}>
                  <Label bold={true} color="#f5a623" containerStyle={{ display: "inline-block" }} label="TRACK" />
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
