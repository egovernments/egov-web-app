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
import Header from "../Header";

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
    width: 280,
    height: 275,
    backgroundcolor: "#FFFFFF",
    border: "0.5",
    borderRadius: "6px",
    // z-index: 1;
    // transform: translate("-50% -50%"),
    textAlign: "center",
    whiteSpace: "normal",
    margin: "16px 0px",
    padding: "12px 8px 12px 8px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    fontSize: 14
  },
  icon: {
    borderRadius: "50%",
    color: "primary",
    padding: "10px"
  }
});
class Explore extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container spacing={5}>
          <Grid container item xs={3} className={classes.card}>
            <Card>
              <CardContent>
                <div
                  style={{
                    borderRadius: "100%",
                    backgroundColor: "#4A90E2",
                    height: "80px",
                    width: "80px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <BusinessIcon className={classes.icon} />
                </div>
                <Typography
                  className={classes.title}
                  color="#000000"
                  fontFamily="Montserrat"
                  gutterBottom
                >
                  Building Plan Approval
                </Typography>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  Apply Online
                </Typography>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  Access Anywhere
                </Typography>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  Ease of Payment
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid container item xs={3} className={classes.card}>
            <Card>
              {" "}
              <CardContent>
                <div
                  style={{
                    borderRadius: "100%",
                    backgroundColor: "#4A90E2",
                    height: "80px",
                    width: "80px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <HomeIcon className={classes.icon} />
                </div>
                <Typography
                  className={classes.title}
                  color="#000000"
                  fontFamily="Montserrat"
                  gutterBottom
                >
                  Building Plan Approval
                </Typography>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  Apply Online
                </Typography>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  Access Anywhere
                </Typography>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  Ease of Payment
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid container item xs={3} className={classes.card}>
            <Card>
              <CardContent>
                <div
                  style={{
                    borderRadius: "100%",
                    backgroundColor: "#4A90E2",
                    height: "80px",
                    width: "80px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <HomeIcon className={classes.icon} />
                </div>
                <Typography
                  className={classes.title}
                  color="#000000"
                  fontFamily="Montserrat"
                  gutterBottom
                >
                  Building Plan Approval
                </Typography>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  Apply Online
                </Typography>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  Access Anywhere
                </Typography>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  Ease of Payment
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid container item xs={3} className={classes.card}>
            <Card>
              <CardContent>
                <div
                  style={{
                    borderRadius: "100%",
                    backgroundColor: "#4A90E2",
                    height: "80px",
                    width: "80px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <BusinessIcon className={classes.icon} />
                </div>
                <Typography
                  className={classes.title}
                  color="#000000"
                  fontFamily="Montserrat"
                  gutterBottom
                >
                  Building Plan Approval
                </Typography>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  Apply Online
                </Typography>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  Access Anywhere
                </Typography>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  Ease of Payment
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Explore);
