import React, { Component } from "react";
import {Card} from "../../../../components";
import NewComplaint from "material-ui/svg-icons/notification/sms-failed";
import Complaint from "material-ui/svg-icons/alert/warning";
import Profile from "material-ui/svg-icons/social/person";
import "./index.css"


const newConplaintStyle = {
  marginRight: 24,
  height: "50px",
  width: "50px",
  borderRadius: "50%",
  padding: "12px",
  background: "#f5a623"
};

const profileStyle = {
  marginRight: 24,
  height: "50px",
  width: "50px",
  borderRadius: "50%",
  padding: "9px",
  background: "#73aacc"
};



class NewAndOldComplaints extends Component {
  render() {
    return (
      <Card
        card={{
          style:{
            backgroundColor:"#ffffff",
            position: "relative",
            width: "100%",
            top: "-20px"
          }
        }}
        textChildren={
          <div className="row newAndOldComplaints-content-section">
            <div className="col-xs-6">
                <NewComplaint style={newConplaintStyle}  color={"#ffffff"} /><br/>
                NEW COMPLAINT
            </div>
            <div className="col-xs-6">
              <Profile style={profileStyle} color={"#FFFFFF"} /><br/>
              OLD COMPLAINT
            </div>
          </div>
        }
      />
    )


  }
}

export default NewAndOldComplaints;
