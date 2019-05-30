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
//import WhatshotIcon from "@material-ui/icons/Whatshot";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    // padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  card: {
    backgroundcolor: "#FFFFFF",
    border: "0.5",
    //borderRadius: "5px",
    minWidth: "280px",
    whiteSpace: "normal",
    marginTop: "10px",
    paddingLeft: "10px",
    paddingTop: "5px",
    // paddingBottom: "-10px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    fontSize: 14,
    textAlign: "center",
    paddingTop: "10px"
  },
  tittle1: {
    color: "#4A90E2",
    // paddingleft: "100px",
    paddingBottom: "20px",
    paddingRight: "25px",
    borderRight: "solid",
    width: "4px",
    height: "56px",
    margin: "0px 0px 5px 0px"
  },

  icon: {
    borderRadius: "50%",
    color: "white",
    display: "inline-block",
    textTransform: "none"
  }
});

class Explore extends React.Component {
  getItems = () => {
    const { classes } = this.props;
    return [
      {
        cardHeader: "Building Plan Approval",
        option1: "Apply Online",
        option2: "Access Anywhere",
        option3: "Ease of Payment",
        icon: <BusinessIcon className={classes.icon} />
      },
      {
        cardHeader: "Public Grievance",
        option1: "Apply Online",
        option2: "Access Anywhere",
        option3: "Ease of Payment",
        icon: <PeopleIcon className={classes.icon} />
      },
      {
        cardHeader: "Property Tax",
        option1: "Apply Online",
        option2: "Access Anywhere",
        option3: "Ease of Payment",
        icon: <HomeIcon className={classes.icon} />
      },
      {
        cardHeader: "Water",
        option1: "Apply Online",
        option2: "Access Anywhere",
        option3: "Ease of Payment",
        icon: <WaterIcon className={classes.icon} />
      },
      {
        cardHeader: "Sewerage",
        option1: "Apply Online",
        option2: "Access Anywhere",
        option3: "Ease of Payment",
        icon: <PipeIcon className={classes.icon} />
      },
      {
        cardHeader: "Trade license",
        option1: "Apply Online",
        option2: "Access Anywhere",
        option3: "Ease of Payment",
        icon: <WorkIcon className={classes.icon} />
      },
      {
        cardHeader: "Fire NOC",
        option1: "Apply Online",
        option2: "Access Anywhere",
        option3: "Ease of Payment",
        icon: <WhatshotIcon className={classes.icon} />
      },
      {
        cardHeader: "Dashboards",
        option1: "Apply Online",
        option2: "Access Anywhere",
        option3: "Ease of Payment",
        icon: <EqualizerIcon className={classes.icon} />
      }
    ];
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.tittle1}>
          <div
            style={{
              fontSize: "16px",
              color: "black",
              fontFamily: "Montserrat",
              width: "50px",
              height: "19px",
              textAlign: "left",
              paddingLeft: "40px",
              marginTop: "10px",
              marginLeft: "10px",
              // paddingBottom: "0px",
              paddingTop: "10px"
            }}
          >
            Explore
          </div>

          <div
            style={{
              fontSize: "34px",
              color: "#4A90E2",
              fontFamily: "Montserrat",
              width: "363px",
              height: "42px",
              paddingLeft: "40px",
              marginTop: "10px",
              marginLeft: "10px"
              // marginBottom: "10px"
            }}
          >
            Core Components
          </div>
        </div>

        <Grid container spacing={0} className={classes.card}>
          {this.getItems().map(item => {
            return (
              <Grid item xs={3} className={classes.card}>
                <Card className={classes.card}>
                  <CardContent>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                      }}
                    >
                      <div
                        style={{
                          borderRadius: "50%",
                          backgroundColor: "#4A90E2",
                          height: "80px",
                          width: "80px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center"
                        }}
                      >
                        {item.icon}
                      </div>
                    </div>

                    <Typography
                      className={classes.title}
                      color="#000000"
                      fontFamily="Montserrat"
                      gutterBottom
                    >
                      {item.cardHeader}
                    </Typography>
                    <Typography
                      className={classes.title}
                      color="textSecondary"
                      gutterBottom
                    >
                      {item.option1}
                    </Typography>
                    <Typography
                      className={classes.title}
                      color="textSecondary"
                      gutterBottom
                    >
                      {item.option2}
                    </Typography>
                    <Typography
                      className={classes.title}
                      color="textSecondary"
                      gutterBottom
                    >
                      {item.option3}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Explore);
