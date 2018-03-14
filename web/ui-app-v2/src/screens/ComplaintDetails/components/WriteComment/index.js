import React, { Component } from "react";
import {List} from "../../../../components";
import Profile from "material-ui/svg-icons/social/person";
import Send from "material-ui/svg-icons/content/send";
import MaterialUITextField from "material-ui/TextField";
import Avatar from "material-ui/Avatar";
import faceOne from "../../../../assets/images/faceOne.jpg";

import "./index.css";

const profileStyle = {
  marginRight: 24,
  height: "38px",
  width: "38px",
  borderRadius: "50%",
  padding: "5px",
  background: "#f5a623",
};

const iconStyle = {
  marginLeft: "20px",
  height: "27px",
  width: "27px",
  transform: "rotate(-15deg)",
  marginBottom: "5px"
};

const textFieldStyle = {
  backgroundColor: "transparent",
  border: "none",
  height: "38px",
  fontSize: "14px",
};

const itemsOne = [
  {
    leftAvatar: <Avatar src={faceOne} />,
    primaryText: (
      <div className="write-comment-align-ComplaintTimeLine rainmaker-list-right-item-overide-style">
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
        <Send style={iconStyle} color={"#00bcd1"} />
      </div>
    ),
  },
];

class WriteComment extends Component {
  render() {
    return (<List items={itemsOne}/>);
  }
}

export default WriteComment;


/*<div className="container width-100-per">
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
    <Send style={iconStyle} color={"#00bcd1"} />
  </div>
  <div className="left">
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
    </div>
</div>*/
