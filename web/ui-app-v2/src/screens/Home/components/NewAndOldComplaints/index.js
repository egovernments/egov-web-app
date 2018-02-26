import React, { Component } from "react";
import {Card} from "../../../../components";
import NewComplaint from "material-ui/svg-icons/notification/sms-failed";
import Complaint from "material-ui/svg-icons/alert/warning";
import "./index.css"


const newConplaintStyle = {
  marginRight: 24,
  height: "24px",
  width: "24px",
  borderRadius: "50%",
  padding: "12px",
  background: "#f5a623"
};

const iconStyle = {
  marginRight: 24,
  height: "24px",
  width: "24px",
  borderRadius: "50%",
  padding: "12px",
  background: "#73aacc"
};



class NewAndOldComplaints extends Component {
  render() {
    return (
      <Card
        card={{
          style:{
            backgroundColor:"#ffffff",
            // position:"absolute",
            // width:"100%"
          }
        }}
        textChildren={
          <div className="row newAndOldComplaints-content-section">
            <div className="col-xs-6">
                <NewComplaint style={newConplaintStyle}  /><br/>
                NEW COMPLAINT
            </div>
            <div className="col-xs-6">
              <Complaint style={iconStyle} color={"#03A9F4"} /><br/>
              OLD COMPLAINT
            </div>
          </div>
        }
      />
    )


  }
}

export default NewAndOldComplaints;
