import React, { Component } from "react";
import { Image, TextField } from "../../../../components";
import Profile from "material-ui/svg-icons/social/person";
import Send from "material-ui/svg-icons/content/send";
import MaterialUITextField from "material-ui/TextField";

import "./index.css";

const profileStyle = {
  marginRight: 24,
  height: "38px",
  width: "38px",
  borderRadius: "50%",
  padding: "9px",
  background: "#f5a623",
};

const iconStyle = {
  marginLeft: "20px",
  height: "27px",
  width: "27px",
  transform: "rotate(-15deg)",
};

const textFieldStyle = {
  backgroundColor: "transparent",
  border: "none",
  height: "38px",
  fontSize: "14px",
};

class WriteComment extends Component {
  render() {
    return (
      <div className="container width-100-per">
        <br />
        <div className="write-complaint-profile-cont col-xs-2 col-md-1">
          <Profile style={profileStyle} color={"#FFFFFF"} />
        </div>
        <div className="col-xs-10 col-md-11 write-comment-align-ComplaintTimeLine">
          <MaterialUITextField
            hintText="Write your comments..."
            style={textFieldStyle}
            onChange={() => {
              console.log("test");
            }}
            className="write-complaint-chat-field"
            fullWidth={true}
            multiLine={true}
            underlineShow={false}
            hintStyle={{ bottom: "8px" }}
          />
          <Send style={iconStyle} color={"#9E9E9E"} />
        </div>
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
    );
  }
}

export default WriteComment;
