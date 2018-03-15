import React, { Component } from "react";
//App bar imports starts
import { AppBar, Drawer, List, ProfileSection, Image, ButtonGroup } from "../../../components";
import ActionHome from "material-ui/svg-icons/action/home";
import Call from "material-ui/svg-icons/communication/call";
import Logout from "material-ui/svg-icons/action/power-settings-new";
import Language from "material-ui/svg-icons/action/language";
import Profile from "material-ui/svg-icons/social/person";
import Help from "../../../custom-icons/help-circle.js";
import profileImage from "../../../assets/people1.png";
import logoMseva from "../../../assets/images/Mseva logo.png";
import Logo from "../../../components/Logo";
import "./index.css";
//App bar imports ends

/*Styles for language toggle starts */

const listInnerDivStyle = {
  padding: "16px 0px 16px 60px",
};

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
  width: "40px",
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
  fontWeight: 900,
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
};

const _label_Name = "Jaswinder";
const _label_Location = "Amritsar";
const _label_emailId = "jaswinder@gmail.com";

const button = (items, onClick, selected) => {
  console.log("inside Button");
  return (
    <ButtonGroup
      items={items}
      onClick={onClick}
      selected={selected}
      defaultStyle={defaultStyle}
      defaultLabelStyle={defaultLabelStyle}
      selectedStyle={selectedStyle}
      selectedLabelStyle={selectedLabelStyle}
      multiple={false}
    />
  );
};

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
    value: "",
  };

  onClick = (value) => {
    console.log("---------" + value);
    this.setState({ value });
  };

  listItems = {
    items: [
      {
        primaryText: "Home",
        leftIcon: <ActionHome />,
        style: {
          paddingBottom: "1px",
          paddingTop: "1px",
        },
      },
      {
        primaryText: "Profile",
        leftIcon: <Profile />,
        style: {
          paddingBottom: "3px",
          paddingTop: "3px",
        },
      },
      {
        primaryText: "Language",
        leftIcon: <Language />,
        secondaryText: <div className="button-toggle-container">{button(this.state.languageItems, this.onClick, this.state.value)}</div>,
      },
      {
        primaryText: "Contact Us",
        leftIcon: <Call />,
        style: {
          paddingBottom: "8px",
          paddingTop: "8px",
        },
      },
      {
        primaryText: "How it Works",
        leftIcon: <Help action="custom" name="help-circle" />,
        style: {
          paddingBottom: "2px",
          paddingTop: "2px",
        },
      },
      {
        primaryText: "Logout",
        leftIcon: <Logout />,
      },
    ],
  };

  onClick = (value) => {
    this.setState({ value });
  };

  render() {
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

        <Drawer docked={false} width={360} open={toggleMenu} onRequestChange={(open) => onUpdateMenuStatus(open)}>
          <ProfileSection
            imgStyle={style}
            cardStyles={cardStyles}
            nameStyle={nameStyle}
            locationStyle={locationStyle}
            emailIdStyle={nameStyle}
            name={_label_Name}
            emailId={_label_emailId}
            location={_label_Location}
            iconStyle={iconStyle}
            imgSrc={profileImage}
          />
          <div className="headerWithDrawer-list-poweredBy-wrappr ">
            <List
              innerDivStyle={listInnerDivStyle}
              className="headerWithDrawer-list-style"
              items={this.listItems.items}
              listContainerStyle={{ background: "#ffffff" }}
              listItemStyle={{ borderBottom: "1px solid #e0e0e0" }}
            />
            <div style={{ marginTop: "43px" }}>
              <Logo />
            </div>
          </div>
        </Drawer>
      </div>
    );
  }
}

export default HeaderWithDrawer;
