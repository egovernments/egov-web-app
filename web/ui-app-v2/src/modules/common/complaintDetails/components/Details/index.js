import React, { Component } from "react";
import { Card, Image, Icon } from "../../../../../components";
import Label from "utils/translationNode";
import "./index.css";

import garbageOne from "../../../../../assets/images/Garbage_3.jpg";
import garbageTwo from "../../../../../assets/images/Garbage_4.jpg";
import garbageThree from "../../../../../assets/images/Garbage_6.jpg";

const iconStyle = {
  marginRight: "13px",
  height: "18px",
  width: "18px",
};

const mapIconStyle = {
  marginRight: "7px",
  height: "12px",
  width: "14px",
  borderRadius: "50%",
};

class Details extends Component {
  redirectToMap = () => {
    //Redirect to Map
  };

  render() {
    let { status, complaint, applicationNo, description, submittedDate, address, images } = this.props;
    let icon = {};
    icon.name = "location";
    icon.style = {
      display: "block",
    };
    let statusKey = "";
    if (status.toLowerCase() == "open") {
      statusKey = `CS_COMMON_SUBMITTED`;
    } else {
      statusKey = `CS_COMMON_${status.toUpperCase()}`;
    }
    const titleKey =
      "SERVICEDEFS.SERVICENAME." +
      complaint
        .match(/\w+/g)
        .join("_")
        .toUpperCase();
    return (
      <div>
        <Card
          textChildren={
            <div>
              <div className="rainmaker-displayInline">
                <Icon action="notification" name="sms-failed" color="#969696" />{" "}
                <Label label="CS_COMPLAINT_DETAILS_COMPLAINT_DETAILS" containerStyle={{ marginLeft: "13px" }} labelClassName="dark-heading" />
              </div>
              <div key={10} className="complaint-detail-full-width">
                <Label labelClassName="dark-heading rainmaker-big-font" label={titleKey} />
                <div className="complaint-detail-detail-section-status row">
                  <Label className="col-xs-6 status-color" label="CS_COMMON_COMPLAINT_NO" />
                  <Label labelStyle={{ color: "inherit" }} className="col-xs-6 status-result-color" label={applicationNo} />
                </div>
                <div className="complaint-detail-detail-section-status row">
                  <Label className="col-xs-6 status-color" label="CS_COMPLAINT_DETAILS_CURRENT_STATUS" />
                  <Label className="col-xs-6 status-result-color" labelStyle={{ color: "inherit" }} label={statusKey} />
                </div>
                <div className="complaint-detail-detail-section-status row">
                  <Label className="col-xs-6 status-color" label="CS_COMPLAINT_DETAILS_SUBMISSION_DATE" />
                  <Label className="col-xs-6 status-result-color" label={submittedDate} labelStyle={{ color: "inherit" }} />
                </div>
                <div style={{ marginLeft: "16px", marginTop: "24px", marginBottom: "17px" }}>
                  <div className="row">
                    {this.props.role !== "AO" ? (
                      images &&
                      images.map((image, index) => {
                        return (
                          <div className="col-xs-4 complaint-detail-detail-section-padding-zero" key={index}>
                            <Image
                              style={{
                                width: "97px",
                                height: "93px",
                              }}
                              source={image}
                              onClick={() => this.props.onImageClick(image)}
                            />
                          </div>
                        );
                      })
                    ) : (
                      <div>
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
                    )}
                  </div>
                </div>

                <div className="row">
                  <div className="col-xs-2">
                    <Icon action="maps" name="place" style={iconStyle} color={"#969696"} />
                  </div>
                  <div className="col-xs-10" style={{ paddingLeft: "0px", marginLeft: "-16.5px" }}>
                    <Label label={address} className="status-result-color" labelStyle={{ color: "inherit" }} />
                  </div>
                  {this.props.role === "AO" && (
                    <div
                      className="complaint-details-timline-button complaint-map-btn"
                      onClick={(e) => {
                        this.redirectToMap();
                      }}
                    >
                      <Icon action="maps" name="place" style={mapIconStyle} color={"#ffffff"} />
                      MAP
                    </div>
                  )}
                </div>

                <div className="row" style={{ marginTop: "25px" }}>
                  <div className="col-xs-2">
                    <Icon action="editor" name="format-quote" style={iconStyle} color={"#969696"} />
                  </div>
                  <div className="col-xs-10" style={{ paddingLeft: "0px", marginLeft: "-16.5px" }}>
                    <Label label={description} className="status-result-color" labelStyle={{ color: "inherit" }} />
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
