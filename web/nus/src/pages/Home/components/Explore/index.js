import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import BusinessIcon from "@material-ui/icons/Business";
import HomeIcon from "@material-ui/icons/Home";
//import Header from "../Header";
import PeopleIcon from "../../../../icon/account-alert";
import PipeIcon from "../../../../icon/pipe";
import WaterIcon from "../../../../icon/water-pump";
import WorkIcon from "@material-ui/icons/Work";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import Button from "@material-ui/core/Button";
//import WhatshotIcon from "@material-ui/icons/Whatshot";

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: "24px"
  },
  paper: {
    // padding: theme.spacing,
    // textAlign: "center",
    // color: theme.palette.text.secondary
  },
  card: {
    backgroundcolor: "#FFFFFF",
    //border: "0.5",
    //borderRadius: "5px",
    Width: "50px",
    //height: "64px",
    //whiteSpace: "normal",
    marginTop: "5px",
    //marginBottom: "16px",
    paddingLeft: "20px",
    paddingTop: "5px",
    paddingBottom: "-10px",
    cursor:"pointer"
    // display: "flex",
    // justifyContent: "left",
    // alignItems: "left"
  },
  title: {
    fontSize: 14,
    textAlign: "right"
  },
  tittleOne: {
    color: "#4A90E2",
    paddingleft: "10px",
    paddingBottom: "20px",
    paddingRight: "40px",
    borderLeft: "solid #4A90E2",
    // width: "4px",
    // height: "56px",
    margin: "0px 0px 5px 0px"
  },
  CardContent: {
    display: "flex",
    justifContent: "center",
    alignItems: "center"
  },

  icon: {
    //borderRadius: "50%",
    color: "#4A90E2",
    //display: "inline-block",
    textTransform: "none",
    //alignItems: "left"
    width: "24px",
    height: "24px"
  }
});

class Explore extends React.Component {
  getItemsEmployee = () => {
    const { classes } = this.props;
    return [
      {
        cardHeader: "Web/Mobile App",

        icon: (
          <img src="/assets/images/web-mobile.png" className={classes.icon} />
        )
      },
      {
        cardHeader: "Workflow",

        icon: <img src="/assets/images/workflow.png" className={classes.icon} />
      },

      {
        cardHeader: "Dashboards",

        icon: <EqualizerIcon className={classes.icon} />
      },
      {
        cardHeader: "Reports",

        icon: <img src="/assets/images/report.png" className={classes.icon} />
      }
    ];
  };

  getItemsCitizen = () => {
    const { classes } = this.props;
    return [
      {
        cardHeader: "Public Grievance",

        icon: <PeopleIcon className={classes.icon} />,
        link: "/assets/images/NUS_PGR_ProductSheet16Jul19.pdf"
      },
      {
        cardHeader: "Building Plan Approval",

        icon: <BusinessIcon className={classes.icon} />,
        link: "/assets/images/NUS_OBPS_Brochure.pdf"
      },
      {
        cardHeader: "Property Tax",
        icon: <HomeIcon className={classes.icon} />,
        link: "/assets/images/NUS_PT_ProductSheet16Jul19.pdf"
      },
      {
        cardHeader: "Water",

        icon: <WaterIcon className={classes.icon} />
      },
      {
        cardHeader: "Sewerage",
        icon: <PipeIcon className={classes.icon} />
      },
      {
        cardHeader: "Trade license",

        icon: <WorkIcon className={classes.icon} />,
        link: "/assets/images/NUS_TL_ProductSheet16Jul19.pdf"
      },
      {
        cardHeader: "Fire NOC",

        icon: <WhatshotIcon className={classes.icon} />
      },
      {
        cardHeader: "Dashboards",

        icon: <EqualizerIcon className={classes.icon} />
      }
    ];
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root} id="coreComponentsSection">
        <div className={classes.tittleOne}>
          <div
            style={{

              marginTop: "10px",
              marginLeft: "10px",
              // paddingBottom: "0px",
              paddingTop: "10px"
            }}
            className="sectionSubheader"
          >
            Explore
          </div>

          <div
            style={{

              marginTop: "10px",
              marginLeft: "10px"
              // marginBottom: "10px"
            }}
            className="sectionHeader"
          >
            Core Components
          </div>
        </div>
        <br />
        <Typography variant="h6" classes={{root:"centric-appl"}}>Citizen-Centric Applications</Typography>
        <Grid container spacing={8} className={classes.card}>
          {this.getItemsCitizen().map((item, key) => {
            return (
              <Grid key={key} item xs={12} sm={3} className={classes.card}>
                <Card className={classes.card} onClick={e => {
                  if (item.link) {
                    window.open(item.link, '_blank')
                  }
                }}>
                  <CardContent className={classes.CardContent}>
                    <div style={{ marginRight: "10px", marginLeft: "0px" }}>
                      {item.icon}
                    </div>

                    <Typography
                      className="componentText"
                      gutterBottom
                    >
                      {item.cardHeader}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
        <br />
        <Typography variant="h6" classes={{root:"centric-appl"}}>Employee-Centric Applications</Typography>
        <Grid container spacing={8} className={classes.card}>
          {this.getItemsEmployee().map((item, key) => {
            return (
              <Grid key={key} item xs={12} sm={3} className={classes.card}>
                <Card
                  className={classes.card}
                  onClick={e => {
                    if (item.link) {
                      window.open(item.link, '_blank')
                    }
                  }}
                >
                  <CardContent className={classes.CardContent}>
                    <div style={{ marginRight: "10px", marginLeft: "0px" }}>
                      {item.icon}
                    </div>

                    <Typography
                      className="componentText"
                      gutterBottom
                    >
                      {item.cardHeader}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
        {/*<div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
          <Button
            variant="outlined"
            className={classes.button}
            style={{
              border: "1px solid #4A90E2",

              borderRadius: "32px",
              width: "292px",
              height: "64px",
              // marginLeft: "450px",
              marginTop: "10px",
              cursor: "pointer"
            }}
          >
            Read More
          </Button>
        </div>*/}
      </div>
    );
  }
}

export default withStyles(styles)(Explore);
