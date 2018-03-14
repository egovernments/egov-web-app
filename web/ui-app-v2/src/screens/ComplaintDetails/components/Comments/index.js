import React, { Component } from "react";
import { Card, List, Label, Icon } from "../../../../components";
import Forum from "material-ui/svg-icons/communication/forum";
import WriteComment from "../WriteComment";
import Avatar from "material-ui/Avatar";
import faceOne from "../../../../assets/images/faceOne.jpg";
import faceTwo from "../../../../assets/images/faceTwo.jpg";
import "./index.css";


const itemsOne = [
  {
    leftAvatar:<div> <Avatar src={faceOne} /></div>,
    primaryText: <div className="complaint-details-comments-section"><Label containerStyle={{marginBottom:"8px"}} labelStyle={{color:"#464646"}} label="please sterilize the dogs in the area."/> <Label labelStyle={{fontSize:"12px"}} label="11-MAR-18"/> </div>
  }
];


const itemsTwo = [
  {
    primaryText:<div className="complaint-details-comments-section"> <Label containerStyle={{marginBottom:"8px"}} labelStyle={{color:"#464646"}} label="Sterilization is scheduled in March. We are doing our best to resolve your issue at this time." /><Label labelStyle={{fontSize:"12px"}} label="11-MAR-18" /></div>,
    rightAvatar: <Avatar src={faceTwo} />,
  },
];



class Comments extends Component {
  render() {
    return (
      <div>
        <Card
          textChildren={
            <div>
              <Label label="Comments" labelClassName="dark-heading" icon={<Forum color="#969696" />}/>
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
