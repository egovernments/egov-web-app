import React, { Component } from "react";
import {Card,Icon} from "../../../../components";
import "./index.css"


class NewAndOldComplaints extends Component {
  render() {
    return (
      <Card
        textChildren={
          <div className="row newAndOldComplaints-content-section">
            <div className="col-xs-6">
                <Icon color="#FFFFFF" style={{background: "#f5a623"}}  action="notification" name="sms-failed" /><br/>
                NEW COMPLAINT
            </div>
            <div className="col-xs-6">
              <Icon style={{background: "#73aacc"}} color={"#FFFFFF"}  action="social" name="person" /><br/>
              OLD COMPLAINT
            </div>
          </div>
        }
      />
    )


  }
}

export default NewAndOldComplaints;
