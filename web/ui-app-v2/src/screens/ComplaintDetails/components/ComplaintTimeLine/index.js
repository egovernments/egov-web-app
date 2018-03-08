import React, { Component } from "react";
import { Card, TimeLine, List, Label,Button } from "../../../../components";
import ContentInbox from "material-ui/svg-icons/content/inbox";
import Gallery from "material-ui/svg-icons/image/image";
import Location from "material-ui/svg-icons/maps/place";
import Call from "material-ui/svg-icons/communication/call";
import "./index.css";
// header={{
//   title:<div><ContentInbox/>COMPLAINT TIMELINE</div>
// }}

const cameraStyle = {
  marginRight: 24,
  height: "38px",
  width: "38px",
  borderRadius: "50%",
  padding: "10px",
  background: "#f5a623",
};

const galleryStyle = {
  marginRight: 24,
  height: "38px",
  width: "38px",
  borderRadius: "50%",
  padding: "10px",
  background: "#2f80ed",
};

const galleryStyleTwo = {
  marginRight: 24,
  height: "38px",
  width: "38px",
  borderRadius: "50%",
  padding: "10px",
  background: "#e74c3c",
};
const items = [
  {
    primaryText: <div className="dark-heading">COMLAINT TIMELINE</div>,
    leftIcon: <ContentInbox color="#969696"/>,
  },
];

const iconStyle = {
  marginRight: "10px",
  height: "18px",
  width: "18px",
};

class ComplaintTimeLine extends Component {
  render() {
    return (
      <div>
        <Card
          card={{
            style: {
              backgroundColor: "#fff",
              padding: "0px 0px 25px 0px"
            },
          }}
          textChildren={
            <div>
              <List items={items} />
              <div className="complaintTimeLineContainer">
                <TimeLine
                  // divStyle={{ maxwidth: 380, maxheight: 400, margin: "auto" }}

                  stepperProps={{
                    orientation: "vertical",
                  }}
                  steps={[
                    {
                      style: {
                        marginTop: "-10px",
                      },
                      props: {
                        active: true,
                      },
                      labelProps: {
                        icon: (
                          <div className="wrapper stepLabelAlignment">
                            <div className="left leftOverRide">
                              <Label><div className="dark-color">JAN 21</div></Label>
                            </div>
                            <div className="right rightOverRide">
                              <ContentInbox style={cameraStyle} color={"#FFFFFF"} />
                            </div>
                          </div>
                        ),
                      },
                      // labelChildren: "Select campaign settings 1",
                      contentProps: {
                        style: {
                          marginTop: "-50px",
                        },
                      },
                      contentChildren: (
                        <div className="complaint-timeline-content-section">
                          <Label
                            labelStyle={{ color: "#484848"}}
                            label="SUBMITTED"
                          />
                          <Label label="BBMP" />
                        </div>
                      ),
                    },
                    {
                      props: {
                        active: true,
                      },
                      labelProps: {
                        icon: (
                          <div className="wrapper stepLabelAlignment">
                            <div className="left leftOverRide">
                              <Label><div className="dark-color">JAN 25</div></Label>
                            </div>
                            <div className="right rightOverRide">
                              <Gallery style={galleryStyle} color={"#FFFFFF"} />
                            </div>
                          </div>
                        ),
                      },
                      contentProps: {
                        style: {
                          marginTop: "-50px",
                        },
                      },
                      // labelChildren: "Select campaign settings 1",
                      contentChildren: (
                        <div className="complaint-timeline-content-section">
                          <Label
                            labelStyle={{ color: "#484848"}}
                            label="RE-ASSIGNED"
                          />
                          <Label label="Department of Health & Sanitation" />
                          <Label
                            labelStyle={{ color: "#484848"}}
                            label="SR.INSPECTOR KUMAR"
                          />
                          <Label label="is looking into your problem" />
                          <div className="complaint-detail-detail-section-location-section">
                            <Call style={iconStyle} color={"#417505"} />
                            <Label labelStyle={{ color: "#417505" }} label={"CALL"} />
                          </div>
                        </div>
                      ),
                    },
                    {
                      props: {
                        active: true,
                      },
                      labelProps: {
                        icon: (
                          <div className="wrapper stepLabelAlignment">
                            <div className="left leftOverRide">
                              <Label><div className="dark-color">JAN 26</div></Label>
                            </div>
                            <div className="right rightOverRide">
                              <Gallery style={galleryStyleTwo} color={"#FFFFFF"} />
                            </div>
                          </div>
                        ),
                      },
                      contentProps: {
                        style: {
                          marginTop: "-50px",
                        },
                      },
                      // labelChildren: "Select campaign settings 1",
                      contentChildren: (
                        <div className="complaint-timeline-content-section" style={{border:"none"}}>
                          <Label
                            labelStyle={{ color: "#484848"}}
                            label="REJECTED"
                          />
                          <Label label="Your Complaint is not valid." />
                          <div className="complaint-details-timline-reopen-button"   onClick={(e)=>{console.log("clicked");}}>RE-OPEN</div>
                        </div>
                      ),
                    }
                  ]}
                />
              </div>
            </div>
          }
        />
      </div>
    );
  }
}

export default ComplaintTimeLine;

// <div className="wrapper" style={{marginLeft: "-53px"}}><div style={{width: "60%"}} className="left">JAN 21</div><div style={{width: "40%"}} className="right"><ContentInbox style={cameraStyle} color={"#FFFFFF"}/></div></div>
