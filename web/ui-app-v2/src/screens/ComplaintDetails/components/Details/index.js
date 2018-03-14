import React, { Component } from "react";
import { List, Card, Label, Image } from "../../../../components";
import Location from "material-ui/svg-icons/maps/place";
import FormateQuote from "material-ui/svg-icons/editor/format-quote";
import NewComplaint from "material-ui/svg-icons/notification/sms-failed";
import "./index.css";

import garbageOne from "../../../../assets/images/Garbage_3.jpg";
import garbageTwo from "../../../../assets/images/Garbage_4.jpg";
import garbageThree from "../../../../assets/images/Garbage_6.jpg";

const iconStyle = {
  marginRight: "10px",
  height: "18px",
  width: "18px",
};

const items = [
  {
    primaryText: <div className="dark-heading">COMPLAINT DETAILS</div>,
    leftIcon: <NewComplaint color="#969696" />,
    initiallyOpen: false,
    primaryTogglesNestedList: true,
  },
];

class Details extends Component {
  render() {
    let { status } = this.props;
    return (
      <div>
        <Card
          textChildren={
            <div>
              <Label label="Complaint Details" labelClassName="dark-heading" icon={<NewComplaint color="#969696" />}/>
              {/*<List items={items} />*/}
              <div key={10} className="complaint-detail-full-width">
                <Label className="dark-heading" labelStyle={{fontSize:"16px"}} label="Potholes on the road" />
                <div className="complaint-detail-detail-section-status row">
                  <Label className="col-xs-6 status-color" label="Complaint No." />
                  <Label labelStyle={{ color: "inherit" }} className="col-xs-6 status-result-color" label="25467895" />
                </div>
                <br />
                <div className="complaint-detail-detail-section-status row">
                  <Label className="col-xs-6 status-color" label="Current Status" />
                  <Label className="col-xs-6 status-result-color" labelStyle={{ color: "inherit" }} label={status} />
                </div>
                <br />
                <div className="complaint-detail-detail-section-status row">
                  <Label className="col-xs-6 status-color" label="Submission Date" />
                  <Label
                    className="col-xs-6 status-result-color"
                    label="11-Mar-18"
                    labelStyle={{ color: "inherit" }}
                  />
                </div>

                <div style={{ marginLeft: "16px",marginTop: "20px" }}>
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

                <div className="row" style={{ marginTop: "20px" }}>
                  <div className="col-xs-2">
                    <Location style={iconStyle} color={"#969696"}/>
                  </div>
                  <div className="col-xs-10" style={{ paddingLeft: "0px" }}>
                    <Label label={"Sector 32, 1 main, Amritsar"} className="status-result-color" labelStyle={{ color: "inherit" }}/>
                  </div>
                </div>

                <div className="row" style={{ marginTop: "20px" }}>
                  <div className="col-xs-2">
                    <FormateQuote style={iconStyle} color={"#969696"}/>
                  </div>
                  <div className="col-xs-10" style={{ paddingLeft: "0px" }}>
                    <Label label={"Too much garbage lying on the road, its very dificult to cross the area."} className="status-result-color" labelStyle={{ color: "inherit" }}/>
                  </div>
                </div>
              </div>
            </div>
          }
        />
      </div>
    );
  }
}

export default Details;
