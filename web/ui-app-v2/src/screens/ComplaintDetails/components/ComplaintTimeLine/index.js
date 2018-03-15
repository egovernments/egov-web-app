import React, { Component } from "react";
import { Card, TimeLine, List, Label,Icon } from "../../../../components";
import SubmittedIcon from "material-ui/svg-icons/content/send";
import TimeLineIcon from "material-ui/svg-icons/action/timeline";
import ReAssignedIcon from "material-ui/svg-icons/action/assignment-turned-in";
import RejectedIcon from "material-ui/svg-icons/navigation/close";
import Call from "material-ui/svg-icons/communication/call";
import "./index.css";

const timelineIconCommonStyle ={
  height: "38px",
  width: "38px",
  borderRadius: "50%",
  padding: "7px",
  marginLeft:"-7px",
}

const statusCommonIconStyle = {
  ...timelineIconCommonStyle,
  backgroundColor: "#ffffff",
  boxShadow: "0 2px 2px 0 rgba(0, 0, 0, 0.24), 0 0 2px 0 rgba(0, 0, 0, 0.12)",
  border: "solid 1px #f89a3f"
};

const statusResolvedIconStyle = {
  ...timelineIconCommonStyle,
  backgroundColor: "#22b25f",
  boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.22)",
  border: "solid 1px #22b25f"
};

const ReAssignedStyle = {
  // marginRight: 24,
  height: "38px",
  width: "38px",
  borderRadius: "50%",
  padding: "7px",
  background: "#2f80ed",
};

const galleryStyleTwo = {
  // marginRight: 24,
  height: "38px",
  width: "38px",
  borderRadius: "50%",
  padding: "7px",
  background: "#e74c3c",
};
const items = [
  {
    primaryText: <div className="dark-heading">COMLAINT TIMELINE</div>,
    leftIcon: <TimeLineIcon color="#969696" />,
  },
];

// const statusCommonIconStyle = {
//   marginRight: "10px",
//   height: "18px",
//   width: "18px",
// };

const StatusIcon =({status})=>{
  switch (status) {
    case "SUBMITTED":
        return <Icon action="custom" name="file-plus" style={statusCommonIconStyle} color={"#f5a623"} />;
    case "ASSIGNED":
        return <Icon action="custom" name="file-send" style={statusCommonIconStyle} color={"#f5a623"} />;
    case "REJECTED":
        return <Icon action="content" name="clear" style={statusCommonIconStyle} color={"#f5a623"} />;
    default:
        return <Icon action="action" name="done"style={statusResolvedIconStyle} color={"#FFFFFF"} />;
  }
}

class ComplaintTimeLine extends Component {
  render() {
    let { status } = this.props;
    let steps = [
      {
        style: {
          marginTop: "-10px",
        },
        props: {
          active: true,
        },
        labelProps: {
          icon: <StatusIcon status="RESOLVED"/>,
        },
        // labelChildren: "Select campaign settings 1",
        contentProps: {
          style: {
            marginTop: "-50px",
          },
        },
        contentChildren: (
          <div className="complaint-timeline-content-section">
            <Label labelStyle={{ color: "#484848" }} label="SUBMITTED" />
            <Label label="BBMP" />
          </div>
        ),
      },
      {
        props: {
          active: true,
        },
        labelProps: {
          icon: <StatusIcon status="ASSIGNED"/>,
        },
        contentProps: {
          style: {
            marginTop: "-50px",
          },
        },
        // labelChildren: "Select campaign settings 1",
        contentChildren: (
          <div className="complaint-timeline-content-section">
            <Label labelStyle={{ color: "#484848" }} label="RE-ASSIGNED" />
            <Label label="Department of Health & Sanitation" />
            <Label labelStyle={{ color: "#484848" }} label="SR.INSPECTOR KUMAR" />
            <Label label="is looking into your problem" />
            <div className="complaint-detail-detail-section-location-section">
              <Call style={statusCommonIconStyle} color={"#417505"} />
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
          icon: <StatusIcon status="ASSIGNED"/>,
        },
        contentProps: {
          style: {
            marginTop: "-50px",
          },
        },
        // labelChildren: "Select campaign settings 1",
        contentChildren: (
          <div className="complaint-timeline-content-section" style={{ border: "none" }}>
            <Label labelStyle={{ color: "#484848" }} label="REJECTED" />
            <Label label="Your Complaint is not valid." />
            <div
              className="complaint-details-timline-reopen-button"
              onClick={(e) => {
                console.log("clicked");
              }}
            >
              RE-OPEN
            </div>
          </div>
        ),
      },
      {
        props: {
          active: true,
        },
        labelProps: {
          icon: <StatusIcon status="REJECTED"/>,
        },
        contentProps: {
          style: {
            marginTop: "-50px",
          },
        },
        // labelChildren: "Select campaign settings 1",
        contentChildren: (
          <div className="complaint-timeline-content-section" style={{ border: "none" }}>
            <Label labelStyle={{ color: "#484848" }} label="REJECTED" />
            <Label label="Your Complaint is not valid." />
            <div
              className="complaint-details-timline-reopen-button"
              onClick={(e) => {
                console.log("clicked");
              }}
            >
              RE-OPEN
            </div>
          </div>
        ),
      },
      {
        props: {
          active: true,
        },
        labelProps: {
          icon: <StatusIcon status="SUBMITTED"/>,
        },
        contentProps: {
          style: {
            marginTop: "-50px",
          },
        },
        // labelChildren: "Select campaign settings 1",
        contentChildren: (
          <div className="complaint-timeline-content-section" style={{ border: "none" }}>
            <Label labelStyle={{ color: "#484848" }} label="REJECTED" />
            <Label label="Your Complaint is not valid." />
            <div
              className="complaint-details-timline-reopen-button"
              onClick={(e) => {
                console.log("clicked");
              }}
            >
              RE-OPEN
            </div>
          </div>
        ),
      }
    ];
    console.log(status);
    if (status === "ASSIGNED") {
      steps = [
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
                  <Label>
                    <div className="dark-color">JAN 21</div>
                  </Label>
                </div>
                <div className="right rightOverRide">
                  <SubmittedIcon style={statusCommonIconStyle} color={"#FFFFFF"} />
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
              <Label labelStyle={{ color: "#484848" }} label="SUBMITTED" />
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
                  <Label>
                    <div className="dark-color">JAN 25</div>
                  </Label>
                </div>
                <div className="right rightOverRide">
                  <ReAssignedIcon style={ReAssignedStyle} color={"#FFFFFF"} />
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
            <div className="complaint-timeline-content-section" style={{ border: "none" }}>
              <Label labelStyle={{ color: "#484848" }} label="RE-ASSIGNED" />
              <Label label="Department of Health & Sanitation" />
              <Label labelStyle={{ color: "#484848" }} label="SR.INSPECTOR KUMAR" />
              <Label label="is looking into your problem" />
              <div className="complaint-detail-detail-section-location-section">
                <Call style={statusCommonIconStyle} color={"#417505"} />
                <Label labelStyle={{ color: "#417505" }} label={"CALL"} />
              </div>
            </div>
          ),
        },
      ];
    }
    return (
      <div>
        <Card
          textChildren={
            <div>
              <Label label="Complaint Timeline" labelClassName="dark-heading" icon={<TimeLineIcon color="#969696" />}/>
              <div className="complaintTimeLineContainer">
                <TimeLine
                  stepperProps={{
                    orientation: "vertical"
                  }}
                  steps={steps}
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

// <div className="wrapper" style={{marginLeft: "-53px"}}><div style={{width: "60%"}} className="left">JAN 21</div><div style={{width: "40%"}} className="right"><ContentInbox style={statusCommonIconStyle} color={"#FFFFFF"}/></div></div>


// let steps = [
//   {
//     style: {
//       marginTop: "-10px",
//     },
//     props: {
//       active: true,
//     },
//     labelProps: {
//       icon: (
//         <div className="wrapper stepLabelAlignment">
//           <div className="left leftOverRide">
//             <Label>
//               <div className="dark-color">JAN 21</div>
//             </Label>
//           </div>
//           <div className="right rightOverRide">
//             <SubmittedIcon style={statusCommonIconStyle} color={"#FFFFFF"} />
//           </div>
//         </div>
//       ),
//     },
//     // labelChildren: "Select campaign settings 1",
//     contentProps: {
//       style: {
//         marginTop: "-50px",
//       },
//     },
//     contentChildren: (
//       <div className="complaint-timeline-content-section">
//         <Label labelStyle={{ color: "#484848" }} label="SUBMITTED" />
//         <Label label="BBMP" />
//       </div>
//     ),
//   },
//   {
//     props: {
//       active: true,
//     },
//     labelProps: {
//       icon: (
//         <div className="wrapper stepLabelAlignment">
//           <div className="left leftOverRide">
//             <Label>
//               <div className="dark-color">JAN 25</div>
//             </Label>
//           </div>
//           <div className="right rightOverRide">
//             <ReAssignedIcon style={ReAssignedStyle} color={"#FFFFFF"} />
//           </div>
//         </div>
//       ),
//     },
//     contentProps: {
//       style: {
//         marginTop: "-50px",
//       },
//     },
//     // labelChildren: "Select campaign settings 1",
//     contentChildren: (
//       <div className="complaint-timeline-content-section">
//         <Label labelStyle={{ color: "#484848" }} label="RE-ASSIGNED" />
//         <Label label="Department of Health & Sanitation" />
//         <Label labelStyle={{ color: "#484848" }} label="SR.INSPECTOR KUMAR" />
//         <Label label="is looking into your problem" />
//         <div className="complaint-detail-detail-section-location-section">
//           <Call style={statusCommonIconStyle} color={"#417505"} />
//           <Label labelStyle={{ color: "#417505" }} label={"CALL"} />
//         </div>
//       </div>
//     ),
//   },
//   {
//     props: {
//       active: true,
//     },
//     labelProps: {
//       icon: (
//         <div className="wrapper stepLabelAlignment">
//           <div className="left leftOverRide">
//             <Label>
//               <div className="dark-color">JAN 26</div>
//             </Label>
//           </div>
//           <div className="right rightOverRide">
//             <RejectedIcon style={galleryStyleTwo} color={"#FFFFFF"} />
//           </div>
//         </div>
//       ),
//     },
//     contentProps: {
//       style: {
//         marginTop: "-50px",
//       },
//     },
//     // labelChildren: "Select campaign settings 1",
//     contentChildren: (
//       <div className="complaint-timeline-content-section" style={{ border: "none" }}>
//         <Label labelStyle={{ color: "#484848" }} label="REJECTED" />
//         <Label label="Your Complaint is not valid." />
//         <div
//           className="complaint-details-timline-reopen-button"
//           onClick={(e) => {
//             console.log("clicked");
//           }}
//         >
//           RE-OPEN
//         </div>
//       </div>
//     ),
//   },
//   {
//     props: {
//       active: true,
//     },
//     labelProps: {
//       icon: (
//         <div className="wrapper stepLabelAlignment">
//           <div className="left leftOverRide">
//             <Label>
//               <div className="dark-color">JAN 26</div>
//             </Label>
//           </div>
//           <div className="right rightOverRide">
//             <RejectedIcon style={galleryStyleTwo} color={"#FFFFFF"} />
//           </div>
//         </div>
//       ),
//     },
//     contentProps: {
//       style: {
//         marginTop: "-50px",
//       },
//     },
//     // labelChildren: "Select campaign settings 1",
//     contentChildren: (
//       <div className="complaint-timeline-content-section" style={{ border: "none" }}>
//         <Label labelStyle={{ color: "#484848" }} label="REJECTED" />
//         <Label label="Your Complaint is not valid." />
//         <div
//           className="complaint-details-timline-reopen-button"
//           onClick={(e) => {
//             console.log("clicked");
//           }}
//         >
//           RE-OPEN
//         </div>
//       </div>
//     ),
//   }
// ];
