import React, { Component } from "react";
import { Card, Icon, Label } from "../../../../components";
import "./index.css";

class NewAndOldComplaints extends Component {
  render() {
    return (
      <Card
        textChildren={
          <div className="row newAndOldComplaints-content-section">
            <div className="col-xs-6">
              <Icon style={{ background: "#f5a623" }} action="notification" name="sms-failed" />
              <Label label="NEW COMPLAINT" />
            </div>
            <div className="col-xs-6">
              <Icon style={{ background: "#73aacc" }} action="social" name="person" />
              <Label label="OLD COMPLAINT" />
            </div>
          </div>
        }
      />
    );
  }
}

export default NewAndOldComplaints;
