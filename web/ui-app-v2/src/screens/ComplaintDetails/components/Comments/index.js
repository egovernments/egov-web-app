import React, { Component } from "react";
import { Card, List, Label, Icon } from "../../../../components";
import WriteComment from "../WriteComment";
import Avatar from "material-ui/Avatar";
import faceOne from "../../../../assets/images/faceOne.jpg";
import faceTwo from "../../../../assets/images/faceTwo.jpg";
import "./index.css";

const items = [
  {
    primaryText: <div className="dark-heading">COMMENTS</div>,
  },
];

const itemsOne = [
  {
    leftAvatar:<div> <Avatar src={faceOne} /></div>,
    primaryText: <div className="complaint-details-comments-section"><Label label="please sterilize the dogs in the area."/> <Label label="11-MAR-18"/> </div>
  }
];

// (
//  <div className="rainmaker-list-right-item-overide-style complaint-details-comments-section">
//    <Label labelStyle={{ color: "inherit" }} label="please sterilize the dogs in the area." />
//    <div className="complaint-detail-detail-section-location-section complaint-details-comments-section-comment-and-time-letterSpacing">
//      <Icon
//        action="device"
//        name="access-time"
//        color={"#969696"}
//        style={{ color: "#969696", fill: "currentColor", width: "18px", height: "18px", padding: 0, marginRight: "5px" }}
//      />
//      <Label style={{ color: "#969696", fontSize: "14px" }} label="2 minutes ago" />
//    </div>
//  </div>
// ),

const itemsTwo = [
  {
    primaryText:<div className="complaint-details-comments-section"> <Label label="Sterilization is scheduled in March. We are doing our best to resolve your issue at this time." /><Label label="11-MAR-18" /></div>,
    rightAvatar: <Avatar src={faceTwo} />,
  },
];

// (
//   <div className="rainmaker-list-right-item-overide-style complaint-details-comments-section">
//     <Label
//       labelStyle={{ color: "inherit" }}
//       label="Sterilization is scheduled in March. We are doing our best to resolve your issue at this time."
//     />
//     <div className="complaint-detail-detail-section-location-section complaint-details-comments-section-comment-and-time-letterSpacing">
//       <Icon
//         action="device"
//         name="access-time"
//         color={"#969696"}
//         style={{ color: "#969696", fill: "currentColor", width: "18px", height: "18px", padding: 0, marginRight: "5px" }}
//       />
//       <Label style={{ color: "#969696", fontSize: "14px" }} label="2 minutes ago" />
//     </div>
//   </div>
// ),

class Comments extends Component {
  render() {
    return (
      <div style={{ paddingBottom: "70px" }}>
        <Card
          card={{
            style: {
              backgroundColor: "#fff",
              padding: "0px",
            },
          }}
          textChildren={
            <div>
              <List items={items} />
              <List listItemStyle={{ marginBottom: "-12.5px" }} items={itemsOne} />
              <List listItemStyle={{ marginBottom: "-12.5px" }} items={itemsTwo} />
              <WriteComment />
            </div>
          }
        />
      </div>
    );
  }
}

export default Comments;

/*<div className="wrapper comment-section">
  <div className="left">
    <Image
      className="img-circle"
      style={{ borderRadius: "50%", width: "50px", height: "50px" }}
      source="http://via.placeholder.com/350x250"
    />
  </div>
  <div className="right"><Label label="please sterilize the dogs in the area."/></div>
</div>
<br />
<div className="wrapper comment-section">
  <div className="right"><Label label="Sterilization is scheduled in March. We are doing our best to resolve your issue at this time."/></div>
  <div className="left">
    <Image
      className="img-circle"
      style={{ borderRadius: "50%", width: "50px", height: "50px" }}
      source="http://via.placeholder.com/350x250"
    />
  </div>
</div>*/
