import React, { Component } from "react";
//App bar imports starts
import { AppBar, Drawer, List, ProfileSection, Image, ButtonGroup, Icon, Dialog, Label, Button } from "../../../components";
import profileImage from "../../../assets/people1.png";
import logoMseva from "../../../assets/images/logo_black.png";
import "./index.css";

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
  height: "30px",
  lineHeight: "30px",
  width: "28.48%",
  minWidth: "inherit",
  padding: 0,
};

const defaultLabelStyle = {
  textTransform: "none",
  fontWeight: "500",
  color: "#484848",
  verticalAlign: "initial",
  padding: 0,
};
/*Styles for language toggle ends */

const logoutButtonStyle = { width: "90px", height: "35px", lineHeight: "35px" };
const logoutContentStyle = { textAlign: "center", padding: "24px 20px" };

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
    logoutPopupOpen: false,
    value: "English",
  };

  listItemsPartOne = {
    items: [
      {
        primaryText: "Home",
        route: "/",
        leftIcon: <Icon action="action" name="home" />,
        style: {
          paddingBottom: "1px",
          paddingTop: "1px",
          borderLeft: "3px solid #00bbd3",
        },
      },
      {
        primaryText: "Profile",
        route: "/profile",
        leftIcon: <Icon action="social" name="person" />,
        style: {
          paddingBottom: "3px",
          paddingTop: "3px",
        },
      },
      {
        primaryText: "Language",
        route: "/language-selection",
        leftIcon: <Icon action="action" name="language" />,
        style: {
          borderBottom: "none",
        },
      },
    ],
  };

  listItemsPartTwo = {
    items: [
      {
        primaryText: "Contact Us",
        route: "/contact-us",
        leftIcon: <Icon action="communication" name="call" />,
        style: {
          paddingBottom: "8px",
          paddingTop: "8px",
        },
      },
      {
        primaryText: "How it Works",
        route: "/how-it-works",
        leftIcon: <Icon action="custom" name="help-circle" />,
        style: {
          paddingBottom: "2px",
          paddingTop: "2px",
        },
      },
      {
        primaryText: "Logout",
        route: "/logout",
        leftIcon: <Icon action="action" name="power-settings-new" />,
        style: {
          borderBottom: "none",
          borderLeft: "red",
        },
      },
    ],
  };

  onClick = (value) => {
    this.setState({ value });
  };

  handleItem = (item, index) => {

    let { route } = item;
    this.props.onLeftIconButtonClick();

    switch (route.slice(1)) {
      case "logout":
        this.setState({
          logoutPopupOpen: true,
        });
        break;
      case "language-selection":
        break;
      default:
        this.props.history.push(route);
        break;

    }
  };
  handleYes = () => {
    this.setState({
      logoutPopupOpen: false,
    });
  };
  handleNo = () => {
    this.setState({
      logoutPopupOpen: false,
    });
  };
  handleLogoutClose = () => {
    this.setState({
      logoutPopupOpen: false,
    });
  };

  render() {
    const { languageItems, value, logoutPopupOpen } = this.state;
    const { onClick } = this;
    const { onUpdateMenuStatus, toggleMenu, className, ...appBarProps } = this.props;

    return (
      <div>
        <AppBar className={className} {...appBarProps} />
        {/* Navigation Drawer */}
        <Drawer docked={false} width="85%" open={toggleMenu} onRequestChange={(open) => onUpdateMenuStatus(open)}>
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

          <div className="drawer-list-poweredBy-wrapper">
            <List
              onItemClick={this.handleItem}
              innerDivStyle={listInnerDivStyle}
              className="drawer-list-style"
              items={this.listItemsPartOne.items}
              listContainerStyle={{ background: "#ffffff" }}
              listItemStyle={{ borderBottom: "1px solid #e0e0e0" }}
            />

            <div className="drawer-button-toggle-container">
              <ButtonGroup
                items={languageItems}
                onClick={onClick}
                selected={value}
                defaultStyle={defaultStyle}
                defaultLabelStyle={defaultLabelStyle}
                selectedStyle={selectedStyle}
                selectedLabelStyle={selectedLabelStyle}
                multiple={false}
              />
            </div>

            <List
              onItemClick={this.handleItem}
              innerDivStyle={listInnerDivStyle}
              className="drawer-list-style"
              items={this.listItemsPartTwo.items}
              listContainerStyle={{ background: "#ffffff" }}
              listItemStyle={{ borderBottom: "1px solid #e0e0e0" }}
            />
            <div className="drawer-image-cont">
              <Image className="mseva-logo" source={`${logoMseva}`} />
            </div>
          </div>
        </Drawer>
        {/* Logout Section */}
        <Dialog
          open={logoutPopupOpen}
          children={[
            <div style={logoutContentStyle} key={"logout-popup"}>
              <div className="logout-label">
                <Label label={"Logout"} bold={true} color="#484848" fontSize="16px" labelStyle={{ marginBottom: "24px" }} />
                <Label label={"Are you sure you want to logout?"} labelStyle={{ marginBottom: "32px" }} />
              </div>
              <div className="logout-button">
                <Button
                  label={"NO"}
                  backgroundColor={"#969696"}
                  onClick={this.handleNo}
                  labelColor="#ffffff"
                  style={{ marginRight: "14px" }}
                  buttonStyle={logoutButtonStyle}
                />
                <Button label={"YES"} primary={true} onClick={this.handleYes} labelColor="#ffffff" buttonStyle={logoutButtonStyle} />
              </div>
            </div>,
          ]}
          handleClose={this.handleLogoutClose}
        />
      </div>
    );
  }
}

export default HeaderWithDrawer;
