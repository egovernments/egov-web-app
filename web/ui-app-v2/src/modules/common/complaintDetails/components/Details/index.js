import React, { Component } from "react";
import { Card, Image, Icon, ImageModal, Button } from "components";
import Label from "utils/translationNode";
import "./index.css";

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
  state = {
    source: "",
    hideImageModal: true,
  };

  navigateToComplaintType = () => {
    this.props.history.push("/citizen/complaint-type");
  };

  onImageClick = (source, hideImageModal) => {
    let { history } = this.props;
    this.setState({ source });
    if (hideImageModal === false) {
      history.push(`${history.location.pathname}?modal=true`);
    } else if (hideImageModal === true) {
      history.goBack();
    }
  };

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.history.location.search === "?modal=true") {
      this.setState({ hideImageModal: false });
    } else {
      this.setState({ hideImageModal: true });
    }
  };

  render() {
    let { status, complaint, applicationNo, description, submittedDate, address, latitude, longitude, mapAction, images, action, role } = this.props;
    let icon = {};
    icon.name = "location";
    icon.style = {
      display: "block",
    };
    let statusKey = "";

    if (status) {
      if (status.toLowerCase() == "open") {
        if (action && action === "reopen") {
          statusKey = `CS_COMMON_REOPENED`;
        } else {
          statusKey = `CS_COMMON_SUBMITTED`;
        }
      } else if (status.toLowerCase() == "reassignrequested") {
        if (role) {
          statusKey = `CS_COMMON_${status.toUpperCase()}`;
        } else {
          statusKey = `CS_COMMON_CITIZEN_REQUEST_REASSIGN`;
        }
      } else {
        statusKey = `CS_COMMON_${status.toUpperCase()}`;
      }
    }

    const titleKey = complaint && "SERVICEDEFS." + complaint.toUpperCase();
    return (
      <div>
        <ImageModal imageSource={this.state.source} hide={this.state.hideImageModal} onCloseClick={() => this.onImageClick("", true)} />
        <Card
          textChildren={
            <div>
              <div className="rainmaker-displayInline">
                <Icon action="notification" name="sms-failed" color="#767676" />{" "}
                <Label label="CS_COMPLAINT_DETAILS_COMPLAINT_DETAILS" containerStyle={{ marginLeft: "13px" }} labelClassName="dark-heading" />
              </div>
              <div key={10} className="complaint-detail-full-width">
                <Label labelClassName="dark-heading rainmaker-big-font" label={titleKey} />
                {/* Dont delete !! */}
                {/* {role && role == "ao" ? (
                  <div className="rainmaker-displayInline">
                    <Label labelClassName="dark-heading rainmaker-big-font" label={titleKey} />
                    <div onClick={this.navigateToComplaintType}>
                      <Icon action="editor" name="mode-edit" style={{ height: 18, width: 18, marginLeft: 16 }} color="#767676" />
                    </div>
                  </div>
                ) : (
                  <Label labelClassName="dark-heading rainmaker-big-font" label={titleKey} />
                )} */}
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
                    {images &&
                      images.map((image, index) => {
                        return (
                          image && (
                            <div className="col-xs-4 complaint-detail-detail-section-padding-zero" key={index}>
                              <Image
                                style={{
                                  width: "97px",
                                  height: "93px",
                                }}
                                source={image}
                                onClick={() => this.onImageClick(image, false)}
                              />
                            </div>
                          )
                        );
                      })}
                  </div>
                </div>
                <div className="row">
                  <div className="col-xs-2">
                    <Icon action="maps" name="place" style={iconStyle} color={"#969696"} />
                  </div>
                  <div className="col-xs-8" style={{ paddingLeft: "0px", marginLeft: "-20px", paddingRight: 10 }}>
                    <Label label={address} className="status-result-color" labelStyle={{ color: "inherit" }} />
                  </div>
                </div>
                {/* {mapAction && (
                  <div
                    className="complaint-details-timline-button complaint-map-btn"
                    onClick={(e) => {
                      this.props.redirectToMap(true, { lat: latitude, lng: longitude });
                    }}
                  >
                    <Icon action="maps" name="place" style={mapIconStyle} color={"#ffffff"} />
                    MAP
                  </div>
                )} */}
                {mapAction && (
                  <Button
                    buttonLabel={true}
                    className="employee-complaint-summary-mapBtn"
                    primary={true}
                    label={<Label label={"ES_COMPLAINT_SUMMARY_MAP"} fonstSize="12px" color="#ffffff" />}
                    style={{
                      height: "auto",
                      lineHeight: "auto",
                      minWidth: "inherit",
                    }}
                    labelStyle={{
                      padding: "0 12px 0 0 ",
                      letterSpacing: "0.6px",
                      display: "inline-block",
                      height: "35px",
                      lineHeight: "35px",
                    }}
                    icon={<Icon action="maps" name="place" style={mapIconStyle} color={"#ffffff"} />}
                    onClick={(e) => {
                      this.props.redirectToMap(true, { lat: latitude, lng: longitude });
                    }}
                  />
                )}
                {description && (
                  <div className="row" style={{ marginTop: "25px" }}>
                    <div className="col-xs-2">
                      <Icon action="editor" name="format-quote" style={iconStyle} color={"#969696"} />
                    </div>
                    <div className="col-xs-10" style={{ paddingLeft: "0px", marginLeft: "-16.5px" }}>
                      <Label label={description} className="status-result-color" labelStyle={{ color: "inherit" }} />
                    </div>
                  </div>
                )}
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
