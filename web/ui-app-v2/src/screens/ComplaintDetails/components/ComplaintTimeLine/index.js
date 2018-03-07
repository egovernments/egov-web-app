import React, { Component } from "react";
import { Card, TimeLine, List, Label } from "../../../../components";
import ContentInbox from "material-ui/svg-icons/content/inbox";
import Gallery from "material-ui/svg-icons/image/image";
import Location from "material-ui/svg-icons/maps/place";
import Call from "material-ui/svg-icons/communication/call";
import "./index.css"
// header={{
//   title:<div><ContentInbox/>COMPLAINT TIMELINE</div>
// }}

const cameraStyle = {
  marginRight: 24,
  height: "50px",
  width: "50px",
  borderRadius: "50%",
  padding: "12px",
  background: "#f5a623"
};

const galleryStyle = {
  marginRight: 24,
  height: "50px",
  width: "50px",
  borderRadius: "50%",
  padding: "12px",
  background: "#2f80ed"
};
const items = [
  {
    primaryText: "COMLAINT TIMELINE",
    leftIcon: <ContentInbox />,
  },
];

const iconStyle = {
  marginRight: "10px",
  height: "18px",
  width: "18px"
};

class ComplaintTimeLine extends Component {
  render() {
    return (
      <div>
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
            <div className="complaintTimeLineContainer">
              <TimeLine
                // divStyle={{ maxwidth: 380, maxheight: 400, margin: "auto" }}

                stepperProps={{
                  orientation: "vertical",
                }}
                steps={[
                  {
                    style:{
                      marginTop:"-10px"
                    },
                    props:{
                      active:true
                    },
                    labelProps: {
                      icon:(<div className="wrapper stepLabelAlignment"><div  className="left leftOverRide"><Label label="JAN 21"/></div><div className="right rightOverRide"><ContentInbox style={cameraStyle} color={"#FFFFFF"}/></div></div>)
                    },
                    // labelChildren: "Select campaign settings 1",
                    contentProps:{
                      style:{
                        marginTop:"-50px"
                      }
                    },
                    contentChildren: (
                      <div className="complaint-timeline-content-section">
                        <Label labelStyle={{color:"#484848",fontStyle: "normal",fontStretch: "normal",lineHeight: "normal"}} label="SUBMITTED"/>
                        <Label label="BBMP"/>
                      </div>
                    ),
                  },
                  {
                    props:{
                      active:true
                    },
                    labelProps: {
                      icon:(<div className="wrapper stepLabelAlignment"><div  className="left leftOverRide"><Label label="JAN 25"/></div><div className="right rightOverRide"><Gallery style={galleryStyle} color={"#FFFFFF"} /></div></div>)
                    },
                    contentProps:{
                      style:{
                        marginTop:"-50px"
                      }
                    },
                    // labelChildren: "Select campaign settings 1",
                    contentChildren: (
                      <div className="complaint-timeline-content-section">
                        <Label labelStyle={{color:"#484848",fontStyle: "normal",fontStretch: "normal",lineHeight: "normal"}} label="RE-ASSIGNED" />
                        <Label label="Department of Health & Sanitation"/>
                        <Label labelStyle={{color:"#484848",fontStyle: "normal",fontStretch: "normal",lineHeight: "normal"}} label="SR.INSPECTOR KUMAR" />
                        <Label label="is looking into your problem"/>
                        <div className="complaint-detail-detail-section-location-section"><Call style={iconStyle} color={"#417505"} /><Label labelStyle={{color:"#417505"}} label={"Call"}/></div>
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
