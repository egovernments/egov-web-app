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
import "./index.css";
//import WhatshotIcon from "@material-ui/icons/Whatshot";

const styles = theme => ({
  root: {
    flexGrow: 1
  },

  card: {
    backgroundcolor: "#FFFFFF",
    Width: "50px",
    marginTop: "5px",
    paddingLeft: "20px",
    paddingTop: "5px",
    paddingBottom: "-10px",
    minHeight: "100px"
  },
  title: {
    fontSize: 14,
    textAlign: "right"
  },
  tittle1: {
    color: "#4A90E2",
    paddingleft: "10px",
    paddingBottom: "20px",
    paddingRight: "40px",
    borderRight: "solid",
    width: "4px",
    height: "56px",
    margin: "0px 0px 5px 0px"
  },
  CardContent: {
    display: "flex",
    justifContent: "center",
    alignItems: "center"
  },

  icon: {
    color: "#4A90E2",
    textTransform: "none"
  },
  button: {
    border: "1px solid #4a90e2",
    borderRadius: "32px",
    width: "292px",
    height: "64px",
    marginLeft: "450px",
    marginTop: "10px",
    cursor: "pointer"
  }
});

class Explore extends React.Component {
  getItems = () => {
    const { classes } = this.props;
    return [
      {
        cardHeader: "Public Grievance",

        icon: <PeopleIcon className={classes.icon} />
      },
      {
        cardHeader: "Building Plan Approval",

        icon: <BusinessIcon className={classes.icon} />
      },
      {
        cardHeader: "Property Tax",
        icon: <HomeIcon className={classes.icon} />
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

        icon: <WorkIcon className={classes.icon} />
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
      <div className={classes.root}>
        <div className={classes.tittle1}>
          <div className="heading">Explore</div>

          <div className="heads">Core Components</div>
        </div>

        <Grid container spacing={3} className={classes.card}>
          {this.getItems().map((item, key) => {
            return (
              <Grid key={key} item xs={6} sm={3} className={classes.card}>
                <Card className={classes.card}>
                  <CardContent className={classes.CardContent}>
                    <div style={{ marginRight: "10px", marginLeft: "0px" }}>
                      {item.icon}
                    </div>

                    <Typography
                      className={classes.title}
                      color="#000000"
                      fontFamily="Montserrat"
                      marginLeft="3px"
                      paddingLeft="2px"
                      gutterBottom
                    >
                      {item.cardHeader}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
          <Grid container>
            <Grid item xs={12} sm={4} md={6}>
              <div>
                <Button
                  variant="outlined"
                  style={{
                    marginLeft: window.innerWidth < 767 ? "30px" : "450px"
                  }}
                  className={classes.button}
                >
                  Read More
                </Button>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Explore);
