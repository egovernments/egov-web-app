import React from "react";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
const styles = {
  card: {
    //maxWidth: 450
  },
  media: {
    height: 150
  },
  displayInline: {
    display: "inline"
  },
  subtitle: {
    color: "#4A90E2",
    padding: "10px 5px 10px 10px",
    borderLeft: "solid"
  }
};

const casestudyObj = [
  {
    title: "Andhra Impact",
    photoUrl: require("../../../../../src/img/secondGallery.jpg"),
    desc:
      "In 2015, the newly formed state of Andhra Pradesh, wanted to transform the quality of urban governance across all 110 ULBs",
    case: "Read case study",
    link:
      "http://nus.niua.org/wp-content/uploads/Andhra_Impact-sheet-VOL.02.pdf"
  },

  {
    title: "NUS Punjab",
    photoUrl: require("../../../../../src/img/secondGallery2.jpg"),
    desc:
      "Need for a statewide approach to transform urban governance and improve service delivery to citizens",
    case: "Read case study",
    link: "http://nus.niua.org/wp-content/uploads/Punjab_NUS.pdf"
  },

  {
    title: "Urban Governance - The Problem",
    desc:
      "City Government operates in a reactive or crisis mode and is besieged by the expectations of numerous stakeholders",
    case: "Read case study",
    photoUrl: require("../../../../../src/img/secondGallery3.jpg"),
    link: "http://nus.niua.org/wp-content/uploads/The-Problem.pdf"
  },

  {
    title: "NUS - The Solution",
    desc:
      "NUS is the Digital Infrastructure that state governments can leverage to build locally relevant solutions for all the ULBs",
    case: "Read case study",
    photoUrl: require("../../../../../src/img/secondGallery4.jpg"),
    link: "http://nus.niua.org/wp-content/uploads/NUS-The-Solution.pdf"
  }
];

const newsobj = [
  {
    title: "September 5th launch event",
    photoUrl: require("../../../../../src/img/gallery1.jpg"),
    desc: ""
  },

  {
    title: "Enrolment Workshop in Uttarakhand",
    photoUrl: require("../../../../../src/img/gallery2.jpg"),
    desc: ""
  },

  {
    title: "Enrolment Workshop in Himachal Pradesh",
    photoUrl: require("../../../../../src/img/gallery3.jpg"),
    desc: ""
  },

  {
    title: "NUS Launch event",
    desc: "",
    photoUrl: require("../../../../../src/img/gallery4.jpg")
  }
];

class WhatNew extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div style={{ margin: "24px" }}>
        <Grid container spacing="16">
          <Grid item xs={12} sm={6}>
            <div
              className={classes.subtitle}
              style={{
                fontSize: "16px",
                color: "#000000 - 60%"
              }}
            >
              Whats New
            </div>
            <div
              className={classes.subtitle}
              style={{
                fontSize: "34px",
                color: "#4A90E2",
                marginTop: "-21px"
              }}
            >
              News & Gallery
            </div>
            <Card className={classes.card} style={{ marginTop: "8px" }}>
              <CardContent>
                {newsobj.map((item, key) => {
                  return (
                    <Grid container>
                      <Grid item xs={12} sm={3}>
                        <img
                          src={item.photoUrl}
                          height="102px"
                          width="150px"
                          alt="watsnew"
                        />
                      </Grid>
                      <Grid item xs={12} sm={9}>
                        <div className="combine">
                          <div
                            style={{
                              color: "rgba(0, 0, 0, 0.87)",
                              fontSize: "16px",
                              fontWeight: "400",
                              marginLeft: "3px",
                              marginBottom: "5px"
                            }}
                          >
                            {item.title}
                          </div>

                          <div
                            style={{
                              fontSize: "14px",
                              color: "rgba(0, 0, 0, 0.6)",
                              fontWeight: "300",
                              marginLeft: "3px"
                            }}
                          >
                            {item.desc}
                          </div>
                        </div>
                      </Grid>
                    </Grid>
                  );
                })}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <div
              className={classes.subtitle}
              style={{
                fontSize: "16px",
                color: "#000000 - 60%"
              }}
            >
              Refer
            </div>
            <div
              className={classes.subtitle}
              style={{
                fontSize: "34px",
                color: "#4A90E2",
                marginTop: "-21px"
              }}
            >
              Case Studies
            </div>
            <Card className={classes.card} style={{ marginTop: "8px" }}>
              <CardContent>
                {casestudyObj.map((item, key) => {
                  return (
                    <Grid container>
                      <Grid item xs={12} sm={3}>
                        <img
                          src={item.photoUrl}
                          height="102px"
                          width="150px"
                          alt="watsnew"
                        />
                      </Grid>
                      <Grid item xs={12} sm={9}>
                        <div className="combine">
                          <div
                            style={{
                              color: "rgba(0, 0, 0, 0.87)",
                              fontSize: "16px",
                              fontWeight: "400",
                              marginLeft: "3px",
                              marginBottom: "5px"
                            }}
                          >
                            {item.title}
                          </div>

                          <div
                            style={{
                              fontSize: "14px",
                              color: "rgba(0, 0, 0, 0.6)",
                              fontWeight: "300",
                              marginLeft: "3px"
                            }}
                          >
                            {item.desc}
                          </div>
                          <a
                            href={item.link}
                            target="_blank"
                            style={{
                              color: "#4A90E2",
                              fontSize: "14px",
                              fontWeight: "500",
                              marginLeft: "3px"
                            }}
                          >
                            {item.case}
                          </a>
                        </div>
                      </Grid>
                    </Grid>
                  );
                })}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(WhatNew);
