import React from "react";
import digital from "../../../../assets/digital.png";
import smart from "../../../../assets/smart.png";
import indportal from "../../../../assets/india-portal.png";
import img3 from "../../../../assets/img3.png";
import RoomIcon from "@material-ui/icons/Room";
import CallIcon from "@material-ui/icons/Call";
import MailIcon from "@material-ui/icons/Mail";
import FacebookIcon from "../../../../icon/facebook";
import TwitterIcon from "../../../../icon/twitter";
import "./index.css";
export default class Footer extends React.Component {
  render() {
    return (
      <div style={{ backgroundColor: "#34495E" }}>
        <div className="container">
          <div className="footer-section">
            <div className="quick-links">QUICK LINKS</div>
            <div className="footer-div">MyGov</div>
            <div className="footer-div">E Office</div>
            <div className="footer-div">Digital india</div>
            <div className="footer-div">Right to Information Act</div>
            <div className="footer-div">eGazette</div>
            <div className="footer-div">URDPFI Guidelines</div>
          </div>
          <div className="footer-section">
            <div className="quick-links">GET IN TOUCH</div>
            <div className="footer-div1">
              <RoomIcon style={{ paddingRight: "0px", color: "white" }} />
              Ministry of Housing and Urban Affairs Maulana Azad Road, Nirman
              Bhawan, New Delhi-110011
            </div>
            <div className="footer-div1">
              <CallIcon style={{ paddingRight: "3px", color: "white" }} />
              011-23063266
            </div>
            <div className="footer-div1">
              <MailIcon style={{ paddingRight: "5px", color: "white" }} />
              contact@nus-nuia.org
            </div>
            <div style={{ padding: "10px 0", color: "white" }}>
              <FacebookIcon
                style={{ paddingRight: "5px", fontFamily: "Montserrat" }}
              />
              <TwitterIcon style={{ paddingRight: "5px", color: "white" }} />
            </div>
          </div>
          <div className="img-wrapper">
            <div className="imgcontent">
              <img className="ind" src={indportal} />
              <img className="ind" src={img3} />
            </div>
            <div className="imgonecontent">
              <img className="indo" src={digital} />
              <img className="smart" src={smart} />
            </div>
          </div>
          <div />
          <div />
        </div>
        <div className="copyright-2019-min">
          Copyright © 2019 Ministry of Housing and Urban Affairs, Govt. of
          India. All rights reserved
        </div>
      </div>
    );
  }
}
