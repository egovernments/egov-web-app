import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import logo1 from "../../../../assets/logo1.png";
import urban from "../../../../assets/urban.png";
import SearchIcon from "@material-ui/icons/Search";
import "./index.css";
const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  app: {
    paddingLeft: "20px",
    paddingRight: "10px",
    display: "flex",
    flexDirection: "row",
    minWidth: "120px",
    justifyContent: "space-between"
  },
  appBarRoot: {
    backgroundColor: "#FFFFFF",
    color: "black"
  },

  appBarRoot1: {
    backgroundColor: "#F0F0F0",
    color: "black",
    flexDirection: "row"
  }
};

class Header extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar classes={{ root: classes.appBarRoot1 }} position="static">
          <Grid container>
            <Grid item xs={12} sm={4} md={6}>
              <div className="leftdiv">
                <div className="govt-name-parent">
                  <div>भारत सरकार</div>
                  <div>GOVERNMENT OF INDIA</div>
                </div>
                <div className="dept-name-parent">
                  <div>आवासन और शहरी कार्य मंत्रालय</div>
                  <div>Ministry Of Housing and Urban Affairs</div>
                </div>
              </div>
            </Grid>
            <Grid item xs={12} sm={4} md={6}>
              <div className="rightDiv">
                <Toolbar>
                  <div
                    className={classes.SearchIcon}
                    style={{ display: "flex" }}
                  >
                    <SearchIcon />

                    <div className={classes.app}>
                      <span>-A </span>

                      <span> A</span>

                      <span>+A</span>

                      <span>हिंदी </span>
                    </div>
                  </div>
                </Toolbar>
              </div>
            </Grid>
          </Grid>
        </AppBar>
        <AppBar classes={{ root: classes.appBarRoot }} position="static">
          <Toolbar>
            <img alt="logo1" src={logo1} width="162px" height="74px" />
            <Typography
              variant="h6"
              align="right"
              color="inherit"
              className={classes.grow}
            >
              <img alt="urban" src={urban} width="164px" height="74px" />
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(Header);
