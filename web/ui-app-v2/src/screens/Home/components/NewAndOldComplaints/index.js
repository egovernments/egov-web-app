import React, { Component } from "react";
import {Card} from "../../../../components";

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
          <div className="row">
            <div className="col-xs-6 text-center">
                NEW COMPLAINT
            </div>
            <div className="col-xs-6">
              OLD COMPLAINT
            </div>
          </div>
        }
      />
    )


  }
}

export default NewAndOldComplaints;
