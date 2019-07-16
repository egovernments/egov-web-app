import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepConnector from "@material-ui/core/StepConnector";
import StepContent from "@material-ui/core/StepContent";
import Typography from "@material-ui/core/Typography";
import Hidden from "@material-ui/core/Hidden";
import CursorIcon from "../../../../../src/icon/Cursor";
import DocumentIcon from "../../../../icon/Document";
import ExpandIcon from "../../../../icon/Expand";
import NetworkIcon from "../../../../icon/Network";
import GPSIcon from "../../../../icon/Gps";

const styles = theme => ({
  root: {
    flexGrow: "1",
    padding: "24px"
  },
  completed: {
    display: "inline-block"
  },

  icon: {
    width: "53.11px",
    height: "69.66px",
    borderRadius: "50%",
    color: "#4A90E2"
  },
  tittleOne: {
    color: "#4A90E2",
    padding: "10px",
    borderLeft: "solid"
  },
  settperRoot: {
    backgroundColor: "inherit"
  },
  stepIcon: {
    background: "white",
    borderRadius: "50%",
    display: "flex",
    padding: "16px",
    width: "100px",
    height: "100px",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
    position: "relative"
  },
  stepIconNumber: {
    top: "3px",
    height: "30px",
    width: "30px",
    borderRadius: "50%",
    position: "absolute",
    backgroundColor: "#E0E0E0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    left: 0
  },
  stepConnector: {
    marginTop: "50px"
  },
  stepConnectorMobile: {
    marginLeft: "65px",
    marginTop: "10px"
  }
});

class How extends React.Component {
  newobj = () => {
    const { classes } = this.props;
    return [
      {
        header: "Initiate",
        subheader: "State On-Boarding",
        icon: <CursorIcon className={classes.icon} />
      },
      {
        header: "Define",
        subheader: "Current System/Process Study",
        icon: <GPSIcon className={classes.icon} />
      },

      {
        header: "Equip",
        subheader: "Product Fitment and Solution Design",
        icon: <DocumentIcon className={classes.icon} />
      },

      {
        header: "Adopt",
        subheader: "Develop and Deploy",
        icon: <NetworkIcon className={classes.icon} />
      },

      {
        header: "Leverages",
        subheader: "Rollout and Adoption review",
        icon: <ExpandIcon className={classes.icon} />
      }
    ];
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root} id="implementaionPlanSection">
        <div className={classes.tittleOne}>
          <div
            className="sectionSubheader"
          >
            How
          </div>
          <div
            className="sectionHeader"
          >
            Implementation Plan
          </div>
        </div>

        <div>
          <Hidden xsDown>
            <Stepper
              alternativeLabel
              nonLinear
              classes={{
                root: classes.settperRoot
              }}
              connector={
                <StepConnector classes={{ root: classes.stepConnector }} />
              }
            >
              {this.newobj().map((label, index) => {
                return (
                  // <div
                  // 	style={{
                  // 		backgroundColor: '#F0F0F0',
                  // 		display: 'flex',
                  // 		alignItems: 'center',
                  // 		justifyContent: 'center'
                  // 	}}
                  // >
                  <Step key={index} completed>
                    <StepLabel
                      icon={
                        <div className={classes.stepIcon}>
                          <div className={classes.stepIconNumber}>
                            {index + 1}
                          </div>
                          {label.icon}
                        </div>
                      }
                    >
                      <Typography variant="h6" classes={{root:"stepHeader"}}>{label.header}</Typography>
                      <Typography classes={{root:"stepSubheader"}}>{label.subheader}</Typography>
                    </StepLabel>
                  </Step>
                  // </div>
                );
              })}
            </Stepper>
          </Hidden>

          <Hidden smUp>
            <Stepper
              activeStep={-1}
              orientation="vertical"
              classes={{
                root: classes.settperRoot
              }}
              connector={
                <StepConnector classes={{ root: classes.stepConnectorMobile }} />
              }
            >
              {this.newobj().map((label, index) => {
                return (
                  <Step key={index}>
                    <StepLabel
                    icon={
                      <div className={classes.stepIcon}>
                        <div className={classes.stepIconNumber}>
                          {index + 1}
                        </div>
                        {label.icon}
                      </div>
                    }
                    >
                    <Typography variant="h6" classes={{root:"stepHeader"}}>{label.header}</Typography>
                    <Typography classes={{root:"stepSubheader"}}>{label.subheader}</Typography>
                    </StepLabel>
                  </Step>
                );
              })}
            </Stepper>
          </Hidden>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(How);

// <div
//   style={{
//     height: "100px",
//     width: "100px",
//     borderRadius: "50%",
//     position: "relative",
//     backgroundColor: "#ffffff",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center"
//   }}
// />
// <div
//   style={{
//     top: "18px",
//     left: "28px",
//     borderRadius: "50%",
//     position: "absolute",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center"
//   }}
// >
//   {label.icon}
// </div>
//
// <div
//   style={{
//     top: "3px",
//     height: "30px",
//     width: "30px",
//     borderRadius: "50%",
//     position: "absolute",
//     backgroundColor: "#E0E0E0",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center"
//   }}
// >
//   {index + 1}
// </div>
//
// <div
//   style={{
//     color: "#000000 - 87%",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     fontSize: "20px",
//     marginLeft: "-111px"
//   }}
// >
//   {label.header}
// </div>
// <div
//   style={{
//     color: "#000000 - 87%",
//     fontSize: "16px",
//     fontWeight: "400",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     marginLeft: "-105px"
//   }}
// >
//   {label.subheader}
// </div>
