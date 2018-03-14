import React, { Component } from "react";
//App bar imports starts
import { AppBar, Drawer, List, ProfileSection, PoweredBy, Image, ButtonGroup } from "../../../components";
import Badge from "material-ui/Badge";
import IconButton from "material-ui/IconButton";
import ActionHome from "material-ui/svg-icons/action/home";
import Call from "material-ui/svg-icons/communication/call";
import Logout from "material-ui/svg-icons/action/power-settings-new";
import Language from "material-ui/svg-icons/action/language";
import Profile from "material-ui/svg-icons/social/person";
import Help from "material-ui-community-icons/icons/help-circle";
import profileImage from "../../../assets/people1.png";
import poweredByLogo from "../../../assets/images/logo.png";
import logoMseva from "../../../assets/images/Mseva logo.png";
import "./index.css";
//App bar imports ends

/*Styles for language toggle starts */
const selectedLabelStyle = {
  color: "#ffffff",
};

const selectedStyle = {
  backgroundColor: "#00bcd1",
  border: "1px solid #00bcd1",
};

const defaultStyle = {
  border: "1px solid #484848",
  borderRadius: "1px",
  marginRight: "4.65%",
  height: "35px",
  lineHeight: "35px",
  width: "28.48%",
  padding: "0 16px",
};

const defaultLabelStyle = {
  textTransform: "none",
  fontWeight: "500",
  color: "#484848",
  verticalAlign: "initial",
  padding: 0,
};
/*Styles for language toggle ends */

const style = { borderRadius: "50%", width: 89, height: 88, margin: "0 auto" };
const cardStyles = {
  // width: '84.5%',
  height: "auto",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  margin: "0 auto",
  paddingTop: 30,
  paddingBottom: 30,
  backgroundColor: "#e0e0e0",
};
const nameStyle = {
  paddingTop: 10,
  fontFamily: "Roboto",
  fontSize: 7,
  fontWeight: 500,
  fontStyle: "normal",
  fontStretch: "normal",
  lineHeight: "normal",
  letterSpacing: 0.3,
  color: "#484848",
  padding: 0,
  textTransform: "none",
};
const iconStyle = {
  height: "18px",
  width: "18px",
  paddingTop: 12,
};

const locationStyle = {
  fontFamily: "Roboto",
  fontSize: 7,
  fontWeight: 500,
  // display: 'none'
};

const _label_Name = "Name";
const _label_Location = "Location";

class HeaderWithDrawer extends Component {
  state = {
    languageItems: [
      {
        label: "ENGLISH",
        value: "English",
      },
      {
        label: "हिंदी",
        value: "Hindi",
      },
      {
        label: "ਪੰਜਾਬੀ",
        value: "Marati",
      },
    ],
  };

  listItems = {
    items: [
      {
        primaryText: "Home",
        leftIcon: <ActionHome />,
      },
      {
        primaryText: "Profile",
        leftIcon: <Profile />,
      },
      {
        primaryText: "Language",
        leftIcon: <Language />,
        secondaryText: (
          <ButtonGroup
            items={this.state.languageItems}
            onClick={this.onClick}
            selected={this.state.value}
            defaultStyle={defaultStyle}
            defaultLabelStyle={defaultLabelStyle}
            selectedStyle={selectedStyle}
            selectedLabelStyle={selectedLabelStyle}
            multiple={false}
          />
        ),
      },
      {
        primaryText: "Contact Us",
        leftIcon: <Call />,
      },
      {
        primaryText: "How it Works",
        leftIcon: <Help />,
      },
      {
        primaryText: "Logout",
        leftIcon: <Logout />,
      },
    ],
  };

  onClick = value => {
    this.setState({ value });
  };

  render() {
    const { languageItems, value } = this.state;
    const { onClick } = this;
    let { onHandleToggleMenu, onUpdateMenuStatus, toggleMenu } = this.props;
    return (
      <div>
        <AppBar
          title={`Mseva/ Home`}
          onLeftIconButtonClick={onHandleToggleMenu}
          style={{
            overflowX: "hidden",
            width: "initial",
          }}
        />

        <Drawer docked={false} width={304} open={toggleMenu} onRequestChange={open => onUpdateMenuStatus(open)}>
          <ProfileSection
            imgStyle={style}
            cardStyles={cardStyles}
            nameStyle={nameStyle}
            locationStyle={locationStyle}
            name={_label_Name}
            location={_label_Location}
            iconStyle={iconStyle}
            imgSrc={profileImage}
          />
          <div className="headerWithDrawer-list-poweredBy-wrapper">
            <List items={this.listItems.items} listContainerStyle={{ background: "#ffffff" }} listItemStyle={{ borderBottom: "1px solid #e0e0e0" }} />
            <Image className="mseva-logo" source={`${logoMseva}`} />
          </div>
        </Drawer>
      </div>
    );
  }
}

export default HeaderWithDrawer;
