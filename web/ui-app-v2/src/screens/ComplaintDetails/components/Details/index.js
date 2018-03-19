import React, { Component } from "react";
import { Card, Label, Image, Icon } from "../../../../components";
import "./index.css";

import garbageOne from "../../../../assets/images/Garbage_3.jpg";
import garbageTwo from "../../../../assets/images/Garbage_4.jpg";
import garbageThree from "../../../../assets/images/Garbage_6.jpg";

const iconStyle = {
  marginRight: "13px",
  height: "18px",
  width: "18px",
};

class Details extends Component {
  render() {
    let { status } = this.props;
    return (
      <div>
        <Card
          textChildren={
            <div>
              <div className="rainmaker-displayInline">
                <Icon action="notification" name="sms-failed" color="#969696" />{" "}
                <Label label="Complaint Details" containerStyle={{ marginLeft: "13px" }} labelClassName="dark-heading" />
              </div>
              <div key={10} className="complaint-detail-full-width">
                <Label labelClassName="dark-heading rainmaker-big-font" label="Potholes on the road" />
                <div className="complaint-detail-detail-section-status row">
                  <Label className="col-xs-6 status-color" label="Complaint No." />
                  <Label labelStyle={{ color: "inherit" }} className="col-xs-6 status-result-color" label="25467895" />
                </div>
                <div className="complaint-detail-detail-section-status row">
                  <Label className="col-xs-6 status-color" label="Current Status" />
                  <Label className="col-xs-6 status-result-color" labelStyle={{ color: "inherit" }} label={status} />
                </div>
                <div className="complaint-detail-detail-section-status row">
                  <Label className="col-xs-6 status-color" label="Submission Date" />
                  <Label className="col-xs-6 status-result-color" label="11-Mar-18" labelStyle={{ color: "inherit" }} />
                </div>
                <div style={{ marginLeft: "16px", marginTop: "24px", marginBottom: "17px" }}>
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

                <div className="row">
                  <div className="col-xs-2">
                    <Icon action="maps" name="place" style={iconStyle} color={"#969696"} />
                  </div>
                  <div className="col-xs-10" style={{ paddingLeft: "0px",marginLeft: "-16.5px" }}>
                    <Label label={"Sector 32, 1 main, Amritsar"} className="status-result-color" labelStyle={{ color: "inherit" }} />
                  </div>
                </div>

                <div className="row" style={{ marginTop: "25px" }}>
                  <div className="col-xs-2">
                    <Icon action="editor" name="format-quote" style={iconStyle} color={"#969696"} />
                  </div>
                  <div className="col-xs-10" style={{ paddingLeft: "0px",marginLeft: "-16.5px" }}>
                    <Label
                      label={"Too much garbage lying on the road, its very dificult to cross the area."}
                      className="status-result-color"
                      labelStyle={{ color: "inherit" }}
                    />
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

//props types check yet to add
