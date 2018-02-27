import React, { Component } from "react";
import { Card, List, Image } from "../../../../components";
import WriteComment from "../WriteComment";

import "./index.css";

const items = [
  {
    primaryText: "COMMENTS",
  },
];

class Comments extends Component {
  render() {
    return (
      <div style={{ paddingBottom: "70px" }}>
        <Card
          card={{
            style: {
              backgroundColor: "#ffffff",
            },
          }}
          textChildren={
            <div>
              <List items={items} />
              <div className="wrapper comment-section">
                <div className="left">
                  <Image
                    className="img-circle"
                    style={{ borderRadius: "50%", width: "50px", height: "50px" }}
                    source="http://via.placeholder.com/350x250"
                  />
                </div>
                <div className="right">please sterilize the dogs in the area.</div>
              </div>
              <br />
              <div className="wrapper comment-section">
                <div className="right">Sterilization is scheduled in March. We are doing our best to resolve your issue at this time.</div>
                <div className="left">
                  <Image
                    className="img-circle"
                    style={{ borderRadius: "50%", width: "50px", height: "50px" }}
                    source="http://via.placeholder.com/350x250"
                  />
                </div>
              </div>
              <WriteComment />
            </div>
          }
        />
      </div>
    );
  }
}

export default Comments;
