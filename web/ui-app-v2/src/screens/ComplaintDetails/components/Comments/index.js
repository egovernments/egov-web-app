import React, { Component } from "react";
import { Card, List, Label, Icon } from "../../../../components";
import WriteComment from "../WriteComment";
import Avatar from "material-ui/Avatar";
import faceOne from "../../../../assets/images/faceOne.jpg";
import faceTwo from "../../../../assets/images/faceTwo.jpg";
import "./index.css";

const itemsOne = [
  {
    leftAvatar: (
      <div>
        {" "}
        <Avatar size={33} src={faceOne} />
      </div>
    ),
    primaryText: (
      <div className="complaint-details-comments-section">
        <Label containerStyle={{ marginBottom: "8px" }} labelStyle={{ color: "#464646" }} label="please sterilize the dogs in the area." />{" "}
        <Label labelClassName="rainmaker-small-font" label="11-MAR-18" />{" "}
      </div>
    ),
  },
];

const itemsTwo = [
  {
    primaryText: (
      <div className="complaint-details-comments-section">
        {" "}
        <Label
          containerStyle={{ marginBottom: "8px" }}
          labelStyle={{ color: "#464646" }}
          label="Sterilization is scheduled in March. We are doing our best to resolve your issue at this time."
        />
        <Label labelClassName="rainmaker-small-font" label="11-MAR-18" />
      </div>
    ),
    rightAvatar: <Avatar size={33} src={faceTwo} />,
  },
];

class Comments extends Component {
  render() {
    return (
      <div>
        <Card
          style={{
            paddingBottom: "0px",
          }}
          textChildren={
            <div>
              <div className="rainmaker-displayInline">
                <Icon action="communication" name="forum" color="#969696" />{" "}
                <Label label="Comments" containerStyle={{ marginLeft: "13px" }} labelClassName="dark-heading" />
              </div>
              <List listItemStyle={{ marginBottom: "-8.5px" }} items={itemsOne} />
              <List listItemStyle={{ marginBottom: "-8.5px" }} items={itemsTwo} />
              <WriteComment />
            </div>
          }
        />
      </div>
    );
  }
}

export default Comments;

//props types check yet to add
