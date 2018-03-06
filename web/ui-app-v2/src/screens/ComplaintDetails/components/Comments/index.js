import React, { Component } from "react";
import { Card, List, Image, Label } from "../../../../components";
import WriteComment from "../WriteComment";
import ContentInbox from "material-ui/svg-icons/content/inbox";
import Avatar from 'material-ui/Avatar';

import "./index.css";




const items = [
  {
    primaryText: "COMMENTS",
  },
];

const itemsOne = [
  {
    leftAvatar: <Avatar
          src="http://via.placeholder.com/128x128"
        />,
    primaryText: (<Label label="please sterilize the dogs in the area."/>),
  },
];

const itemsTwo = [
  {
    primaryText: (<Label style={{
      marginRight:"20px"
    }} label="Sterilization is scheduled in March. We are doing our best to resolve your issue at this time.Sterilization is scheduled in March. We are doing our best to resolve your issue at this time."/>),
    rightAvatar: <Avatar
          src="http://via.placeholder.com/128x128"
        />,
  },
];

class Comments extends Component {
  render() {
    return (
      <div style={{ paddingBottom: "70px" }}>
        <Card
          card={{
            style:{
              backgroundColor: "#fff",
              padding:"0px",
              margin: "1px 0px"
            }
          }}
          textChildren={
            <div>
              <List items={items} />
              <List items={itemsOne} />
              <List items={itemsTwo} />
            {/*<div className="wrapper comment-section">
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
              </div>*/}
              <WriteComment />
            </div>
          }
        />
      </div>
    );
  }
}

export default Comments;
