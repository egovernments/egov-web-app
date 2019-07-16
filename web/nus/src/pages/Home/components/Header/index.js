import React from "react";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import logo1 from "../../../../assets/logo1.png";
import urban from "../../../../assets/urban.png";
import SearchIcon from "@material-ui/icons/Search";
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
    flexDirection: "row"
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
      <div className={classes.root} id="homeSection">
        {/*<AppBar classes={{ root: classes.appBarRoot1 }} position="static" >
          <Grid container>
            <Grid item xs={12} sm={6}>
              <div
                className="leftdiv"
                style={{
                  display: "flex",
                  // width: "1280px",
                  // height: "48px",
                  flexDirection: "row",
                  padding: "8px 50px"
                }}
              >
                <div
                  className="govt-name-parent"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    // padding: "50px 24px",
                    // paddingTop: "30px",
                    textAlign: "right",
                    fontSize: "14px"
                  }}
                >
                  <div>भारत सरकार</div>
                  <div>GOVERNMENT OF INDIA</div>
                </div>
                <div
                  className="dept-name-parent"
                  style={{
                    display: "flex  ",
                    flexDirection: "column",
                    // paddingTop: "30px",
                    marginLeft: "24px",
                    fontSize: "14px"
                  }}
                >
                  <div>आवासन और शहरी कार्य मंत्रालय</div>
                  <div>Ministry Of Housing and Urban Affairs</div>
                </div>
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <div
                className="rightDiv"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginLeft: "10px",
                  alignItems:"center",
                  justifyContent: "flex-end"
                  // padding: "8px"
                }}
              >
                <Toolbar>
                  <div
                    className={classes.SearchIcon}
                    style={{ display: "flex" }}
                  >
                    <SearchIcon />
                    <div
                      className={classes.app}
                      style={{
                        minWidth: "120px",
                        justifyContent: "space-between"
                      }}
                    >
                      <span>-A</span>
                      <span>A</span>

                      <span>+A</span>

                      <span>हिंदी </span>
                    </div>
                  </div>
                </Toolbar>
              </div>
            </Grid>
          </Grid>
        </AppBar>*/}
        <AppBar classes={{ root: classes.appBarRoot }} position="static">
          <Toolbar>
            <img alt="logo1" src="/assets/images/mohua-logo.jpg" width="162px" height="74px" />
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
