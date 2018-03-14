import React, { Component } from "react";
import { Icon, List, Image, Card } from "../../components";
import Facebook from "material-ui-community-icons/icons/facebook";
import Twitter from "material-ui-community-icons/icons/twitter";
import Currency from "material-ui-community-icons/icons/alert";
import logoMseva from "../../assets/images/Mseva logo.png";
import "./index.css";

const iconStyle = {
  width: "25px",
  height: "25px",
  padding: "0px",
  fill: "#f5a623",
};

const facebookStyle = {
  marginRight: 24,
  height: "50px",
  width: "50px",
  borderRadius: "50%",
  padding: "5px",
  background: "#00008B",
};

const twitterStyle = {
  marginRight: 24,
  height: "50px",
  width: "50px",
  borderRadius: "50%",
  padding: "5px",
  background: "#1E90FF",
};

class ContactUs extends Component {
  ListItems = {
    items: [
      {
        leftIcon: <Icon style={iconStyle} action="maps" name="place" />,
        primaryText: "eGovernments Foundation 18/2A, 2nd Floor, Ambalipura Village,Sarjapur Main Road, Bellandur Gate ,Bangalore - 560102",
        secondaryText: "Open Map",
      },
      {
        leftIcon: <Icon style={iconStyle} action="communication" name="call" />,
        primaryText: "080 71243544",
      },
      {
        leftIcon: <Icon style={iconStyle} action="device" name="access-time" />,
        primaryText: "Mon - Fri",
        secondaryText: "9.00 AM-6.00 PM",
      },
      {
        insetChildren: true,
        primaryText: "Sat",
        secondaryText: "9.00 AM-12 PM",
      },
      {
        leftIcon: <Icon style={iconStyle} action="communication" name="email" />,
        primaryText: "contact@egovernments.org",
      },
      {
        leftIcon: <Icon style={iconStyle} action="action" name="language" />,
        primaryText: "egovernmentsfoundation.com",
      },
    ],
  };
  render() {
    return (
      <Card
        className="contactus-main-cont"
        textChildren={
          <div>
            <Image className="mseva-logo" source={`${logoMseva}`} />
            <div className="contactus-list-container">
              <List items={this.ListItems.items} />
            </div>
            <div style={{ textAlign: "center" }}>
              <Twitter style={twitterStyle} color="ffffff" />
              <Facebook style={facebookStyle} color="ffffff" />
              <Currency style={facebookStyle} color="ffffff" />
            </div>
          </div>
        }
      />
    );
  }
}

export default ContactUs;
