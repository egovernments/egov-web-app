import React from "react";
import digital from "../../../../assets/digital.png";
import smart from "../../../../assets/smart.png";
import indportal from "../../../../assets/india-portal.png";
import img3 from "../../../../assets/img3.png";
import RoomIcon from "@material-ui/icons/Room";
import CallIcon from "@material-ui/icons/Call";
import MailIcon from "@material-ui/icons/Mail";
import Grid from "@material-ui/core/Grid";
import FacebookIcon from "../../../../icon/facebook";
import TwitterIcon from "../../../../icon/twitter";
// import CallIcon from "@material-ui/icons/Call";
export default class Footer extends React.Component {
  render() {
    return (
      <div>
        <div
          style={{
            backgroundColor: "#34495E",
            padding: "24px 50px",
            color: "#FFFFFF"
          }}
        >
          <Grid container>
            <Grid item xs={12} sm={4}>
              <div style={{
                display:"flex",
                flexDirection:"column"
              }}>
                <div
                  style={{
                    color: "#ffffff",
                    fontWeight: "500",
                    fontFamily: "Montserrat-Medium",
                    fontSize: "16px",
                    lineHeight: "19px",
                    textAlign: "left",
                  }}
                >
                  QUICK LINKS
                </div>
                <a
                  style={{
                    padding: "10px 0",
                    fontSize: "14px",
                    color: "rgba(255, 255, 255, 0.7)",
                    fontFamily: "Montserrat",
                    lineHeight: "17px"
                  }}
                  href="http://mohua.gov.in/"
                  target="_blank"
                >
                  MOHUA
                </a>
                <a
                  style={{
                    padding: "10px 0",
                    fontSize: "14px",
                    color: "rgba(255, 255, 255, 0.7)",
                    fontFamily: "Montserrat",
                    lineHeight: "17px"
                  }}
                  href="http://www.niua.org/"
                  target="_blank"
                >
                  {" "}
                  NIUA
                </a>
                <a
                  style={{
                    padding: "10px 0",
                    fontSize: "14px",
                    color: "rgba(255, 255, 255, 0.7)",
                    fontFamily: "Montserrat",
                    lineHeight: "17px"
                  }}
                  href="https://www.digitalindia.gov.in/"
                  target="_blank"
                >
                  {" "}
                  Digital india
                </a>
              </div>
            </Grid>
            <Grid item xs={12} sm={4}>
              <div>
                <div
                style={{
                  color: "#ffffff",
                  fontWeight: "500",
                  fontFamily: "Montserrat-Medium",
                  fontSize: "16px",
                  lineHeight: "19px",
                  textAlign: "left",
                }}
                >
                  GET IN TOUCH
                </div>
                <div
                  style={{
                    padding: "10px 0",
                    fontSize: "14px",
                    fontFamily: "Montserrat",
                    display: "flex",
                    alignItems: "center",
                    width: "263px",
                    height: "60px",
                    color: "rgba(255, 255, 255, 0.7)",
                  }}
                >
                  <RoomIcon style={{ paddingRight: "5px",color: "white"  }} />
                  National Institute of Urban Affairs, 1st and 2nd Floor, Core
                  4B, India Habitat Centre, Lodhi Road, New Delhi, Delhi 110003
                </div>
                <div
                  style={{
                    padding: "10px 0",
                    fontSize: "14px",
                    fontFamily: "Montserrat",
                    display: "flex",
                    alignItems: "center",
                    width: "93px",
                    height: "17px",
                    color: "rgba(255, 255, 255, 0.7)",
                  }}
                >
                  <CallIcon style={{ paddingRight: "3px" ,color: "white" }} />
                  8286907575
                </div>
                <div
                  style={{
                    padding: "10px 0",
                    fontSize: "14px",
                    fontFamily: "Montserrat",
                    display: "flex",
                    alignItems: "center",
                    width: "154px",
                    height: "17px",
                    color: "rgba(255, 255, 255, 0.7)",
                  }}
                >
                  <MailIcon style={{ paddingRight: "5px",color: "white" }} />
                  nus@niua.org
                </div>
                <div style={{ padding: "10px 0" }}>
                  <FacebookIcon
                    style={{ paddingRight: "5px", fontFamily: "Montserrat" }}
                  />
                  <TwitterIcon style={{ paddingRight: "5px" }} />
                </div>
              </div>
            </Grid>
            <Grid item xs={12} sm={4}>
              <div>
                <div
                  style={{
                    display: "flex",
                    paddingTop: "30px",
                    paddingBottom: "15px",
                    justifyContent: "flex-end"
                  }}
                >
                  <img
                    style={{
                      width: "149px",
                      height: "36px",
                      marginRight: "20px"
                    }}
                    src={indportal}
                  />
                  <img style={{ width: "149px", height: "36px" }} src={img3} />
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end"
                  }}
                >
                  <img
                    style={{
                      width: "246px",
                      height: "118px",
                      marginRight: "10px"
                    }}
                    src={digital}
                  />
                  <img
                    style={{ width: "118px", height: "118px" }}
                    src="/assets/images/amrut logo.jpg"
                  />
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
        <div
          style={{
            backgroundColor: "#263748",
            padding: "10px",
            textAlign: "center",
            color: "rgba(255, 255, 255, 0.7)",
            fontSize: "14px",
            fontFamily: "Montserrat"
          }}
        >
          Copyright © 2019 Ministry of Housing and Urban Affairs, Govt. of
          India. All rights reserved
        </div>
      </div>
    );
  }
}
