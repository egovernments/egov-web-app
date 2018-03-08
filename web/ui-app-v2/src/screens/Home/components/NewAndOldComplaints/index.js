import React, { Component } from "react";
import { Card, Icon, Label } from "../../../../components";
import "./index.css";

const cardStyle = {
  style: {
    padding: "50px 16px 16px 16px",
  },
};

class NewAndOldComplaints extends Component {
  render() {
    return (
      <Card
        card={cardStyle}
        textChildren={
          <div className="row newAndOldComplaints-content-section">
            <div id="home-new-complaint" className="col-xs-6">
              <Icon style={{ background: "#f5a623" }} action="notification" name="sms-failed" />
              <Label containerStyle={{ marginTop: "10px" }} color="#484848" bold={true} label="NEW COMPLAINT" />
            </div>
            <div id="home-old-complaint" className="col-xs-6">
              <Icon style={{ background: "#73aacc" }} action="social" name="person" />
              <Label containerStyle={{ marginTop: "10px" }} color="#484848" bold={true} label="MY COMPLAINTS" />
            </div>
          </div>
        }
      />
    );
  }
}

export default NewAndOldComplaints;
