import React, { Component } from "react";
import {Image,TextField} from "../../../../components";
import Profile from "material-ui/svg-icons/social/person";
import Send from "material-ui/svg-icons/content/send";
import "./index.css"

const profileStyle = {
  marginRight: 24,
  height: "40px",
  width: "40px",
  borderRadius: "50%",
  padding: "9px",
  background: "#f5a623"
};

const iconStyle = {
  marginRight: 24,
  height: "65px",
  width: "65px"
};

class WriteComment extends Component {
  render() {
    return (
      <div>
        <div className="wrapper comment-section">
          {/*<div className="left">
              <Profile style={profileStyle} color={"#FFFFFF"} />
          </div>
          <div className="right write-comment-align-ComplaintTimeLine">
            <TextField
              id="complaint-details-comment-box"
              label="Test"
              isRequired={true}
              errorMessage="Please enter a valid Message"
              value="test Value"
              disabled={false}
              hide={false}
              className=""
              onChange={()=>{
                console.log("test")
              }}
            />
            <Send style={iconStyle} color={"#9E9E9E"} />
          </div>*/}
        </div>
    </div>)
  }
}

export default WriteComment;
