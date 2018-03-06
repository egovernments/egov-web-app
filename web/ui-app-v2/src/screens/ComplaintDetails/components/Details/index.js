import React, { Component } from "react";
import { List, Card, Label, Image } from "../../../../components";

import ContentInbox from "material-ui/svg-icons/content/inbox";
import ActionGrade from "material-ui/svg-icons/action/grade";
import ContentSend from "material-ui/svg-icons/content/send";
import ContentDrafts from "material-ui/svg-icons/content/drafts";
import ActionInfo from "material-ui/svg-icons/action/info";
import Location from "material-ui/svg-icons/maps/place";
import Avatar from "material-ui/Avatar";

import NewComplaint from "material-ui/svg-icons/notification/sms-failed";
import "./index.css";

import garbageOne from "../../../../assets/images/Garbage_3.jpg";
import garbageTwo from "../../../../assets/images/Garbage_4.jpg";
import garbageThree from "../../../../assets/images/Garbage_6.jpg";

const iconStyle = {
  marginRight: "10px",
  height: "15px",
  width: "11px",
};

const items = [
  {
    primaryText: (
      <div>
        {"COMPLAINT DETAILS"}
        <br />
        <div className="complaint-detail-detail-section container">
          <div className="complaint-detail-detail-section-status row">
            <Label className="col-xs-9 status-color" label="STATUS" />
            <Label className="col-xs-3 status-result-color" label="Assigned" />
          </div>
          <br />
          <div className="complaint-detail-detail-section-status row">
            <Label className="col-xs-9 status-color" label="COMPLAINT" />
            <Label className="col-xs-3 status-result-color" label="Overflowing of bins" />
          </div>
        </div>
      </div>
    ),
    leftIcon: <NewComplaint />,
    initiallyOpen: false,
    primaryTogglesNestedList: true,
    // open : true,
    // onNestedListToggle : () => {
    //   alert("Clicked")
    // },
    nestedItems: [
      {
        children: (
          <div key={10} className="complaint-detail-detail-section-expanded container">
            <div className="complaint-detail-detail-section-status row">
              <Label className="col-xs-6 status-color" label="APPLICATION NO" />
              <Label className="col-xs-6 status-result-color complaint-detail-detail-section-expanded-status-negative-margin" label="25467895" />
            </div>
            <br />
            <Label
              className="complaint-detail-detail-section-details"
              label="Too much garbage lying on the road, its very dificult to cross the area."
            />
            <br />
            <div style={{ marginLeft: "16px" }}>
              <div className="row">
                <div className="col-xs-4 complaint-detail-detail-section-padding-zero">
                  <Image
                    style={{
                      width: "97px",
                      height: "93px",
                    }}
                    source={garbageOne}
                  />
                </div>
                <div className="col-xs-4 complaint-detail-detail-section-padding-zero">
                  <Image
                    style={{
                      width: "97px",
                      height: "93px",
                    }}
                    source={garbageTwo}
                  />
                </div>
                <div className="col-xs-4 complaint-detail-detail-section-padding-zero">
                  <Image
                    style={{
                      width: "97px",
                      height: "93px",
                    }}
                    source={garbageThree}
                  />
                </div>
              </div>
            </div>
            <div className="complaint-detail-detail-section-location-section">
              <Location style={iconStyle} color={"#969696"} />
              <Label label={"Sector 32, 1 main, Amritsar"} />
            </div>
          </div>
        ),
      },
    ],
  },
];

class Details extends Component {
  render() {
    return (
      <div>
        <Card
          card={{
            style: {
              backgroundColor: "#fff",
              padding: "0px 0px 25px 0px",
            },
          }}
          textChildren={<List items={items} />}
        />
      </div>
    );
  }
}

export default Details;
