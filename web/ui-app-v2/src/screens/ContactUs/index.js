import React, { Component } from "react";
import { Icon, List, Image, Card, MapLocation } from "../../components";
import Logo from "../../assets/images/logo-black.png";
import Facebook from "../../custom-icons/facebook.js";
import Twitter from "../../custom-icons/twitter.js";
import pinIcon from "../../assets/Location_pin.svg";
import "./index.css";

const listInnerDivStyle = {
  padding: "0px 0px 0px 60px",
};

const listItemStyle = {
  padding: "8px 0px 8px 0px",
};

const iconStyle = {
  width: "20px",
  height: "20px",
  padding: "0px",
  fill: "#f5a623",
  top: "0px",
  margin: "0px 0px 0px 8px",
};

const facebookStyle = {
  height: "47.7px",
  width: "47.7px",
  borderRadius: "50%",
  padding: "5px",
  background: "#3b5998",
};

const twitterStyle = {
  marginRight: 32,
  height: "47.7px",
  width: "47.7px",
  borderRadius: "50%",
  padding: "5px",
  background: "#55acee",
};

const searchBoxStyles = {
  display: "none",
};

const location = { lat: 12.9199988, lng: 77.67078 };

class ContactUs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openMap: false,
    };
  }

  openMap = () => {
    this.setState({
      openMap: true,
    });
  };

  ListItems = {
    items: [
      {
        leftIcon: <Icon style={iconStyle} action="maps" name="place" />,
        primaryText: (
          <span>
            eGovernments Foundation <br />18/2A, Sarjapur Main Rd, Bellandur, Bengaluru <br />Karnataka 560102{" "}
          </span>
        ),
        secondaryText: (
          <div className="openMap" style={{ color: "#00bbd3" }} onClick={this.openMap}>
            Open Map
          </div>
        ),
        style: {
          paddingBottom: "8px",
          paddingTop: "8px",
        },
      },
      {
        leftIcon: <Icon style={iconStyle} action="communication" name="call" />,
        primaryText: "080 71243544",
        style: {
          paddingBottom: "8px",
          paddingTop: "8px",
        },
      },
      {
        leftIcon: <Icon style={iconStyle} action="device" name="access-time" />,
        primaryText: "Mon - Fri",
        secondaryText: "9.00 AM - 6.00 PM",
        style: {
          paddingBottom: "8px",
          paddingTop: "8px",
        },
      },
      {
        insetChildren: true,
        primaryText: "Sat",
        secondaryText: "9.00 AM - 12 PM",
        style: {
          paddingBottom: "5px",
          paddingTop: "8px",
        },
      },
      {
        leftIcon: <Icon style={iconStyle} action="communication" name="email" />,
        primaryText: "contact@egovernments.org",
        style: {
          paddingBottom: "8px",
          paddingTop: "8px",
        },
      },
      {
        leftIcon: <Icon style={iconStyle} action="action" name="language" />,
        primaryText: "egovernmentsfoundation.com",
        style: {
          paddingBottom: "8px",
          paddingTop: "8px",
        },
      },
    ],
  };
  render() {
    return (
      <div class="contactus-main-cont">
        <Card
          className="contactus-main-card"
          textChildren={
            <div>
              <Image className="mseva-logo-top" source={`${Logo}`} />
              <div className="contactus-list-container">
                <List onItemClick={this.openMap} innerDivStyle={listInnerDivStyle} items={this.ListItems.items} />
              </div>
              <div style={{ textAlign: "center", paddingBottom: "8px" }}>
                <Twitter style={twitterStyle} action="custom" name="facebook" color="ffffff" />
                <Facebook style={facebookStyle} action="custom" name="twitter" color="ffffff" />
              </div>
            </div>
          }
        />
        {this.state.openMap && <MapLocation currLoc={location} styles={searchBoxStyles} icon={pinIcon} hideTerrainBtn={true} />}
      </div>
    );
  }
}

export default ContactUs;
